
	
	/*
		Autocomplete library largely based on the very nice Bloodhound library
		for the suggestion engine
		
		The local data that is loaded comes from the datums.js file.
		The default rendering mechanisme needs to know at least which key represents
			- the id of the datum
			- the 'title' of the datum

		Other keys are optionnals but are provided for convenient use. The structure picture/title/sutitle/pushedback
		matches all of the common scnearios. For more advanced templateing, tweak the source :) 

		Example usage to render a fully functionnal and resposive autocomplete input:
		_____________________________________
	
		...some html...

		<div class="wrapper">  <- the input will fill 100% of this, both height and width
		    <div aut <--- triggers the script, all dependencies are loaded asynchronously
			    placeholder="Chercher un film, une année..."
			    id="id"
			    title="name"
			    subtitle="age"
			    picture="url"
			    pushed="type"
		    ></div>
		</div>

		...some html....

		<script src="lib/aut/aut.js"></script> <!-- Autocomplete -->


		_____________________________________
		End example usage

	*/
	

	var Aut = (function(){

		var BH;
		var datums;
		var current_query;

		var bloodhound_url = "lib/aut/bloodhound.js";
		var datum_url      = "lib/aut/datums.js"

		function getAc(){

			var $ac = $('[aut]');
			return $ac;
		}

		function getInp(){
			return getAc().find('input');
		}


		function hasAttribute( $el, attr ){
			return  $el.attr( attr ) != "";
		}


		function layoutInput(){
			getAc().addClass("aut").append('<input>').find('input').attr('placeholder', getAc().attr('placeholder'));
		}


		function renderItem( opts ){

			var title = opts.title ? '<div class="aut-item-title">'+ opts.title +'</div>' : null;
			var subtitle, picture, pushed;

			if( !opts.title ){
				return console.warn("Unable to render datum without at least a title");
			}

			if( !opts.id ){
				return console.warn("Unable to render datum without at least an id");
			}


			if( opts.subtitle ){
				subtitle = '<div class="aut-item-subtitle">'+ opts.subtitle + '</div>';
			}

			if( opts.picture ){
				picture = '<div class="aut-item-picture-wrap"><div src="'+ opts.picture +'" class="aut-item-picture"></div></div>';
			}

			if( opts.pushed ){
				pushed = '<div class="aut-item-pushed">'+ opts.pushed +'</div>';
			}

			xtags = Array.isArray( opts.xtags ) ? opts.xtags : [ opts.xtags ]
			xtags = xtags.filter( Boolean );

			tags = xtags.map(function( x ){
				return "x--" + x;
			}).join(' ');

			return [	

				'<div class="aut-item '+ tags +'" data-id="'+ opts.id +'">',
					picture,
					'<div class="aut-body">',
						title,
						subtitle,
					'</div>',
					pushed,
				'</div>'

			].join('');

		}

		function renderResult( datum ){

			var data = {};
			[ "id", "title", "subtitle", "picture", "pushed" ].forEach(function( attr ){
				data[ attr ] = ( hasAttribute( getAc(), attr ) ) ? datum[ getAc().attr( attr ) ] : null;
			});

			data["subtitle"] += " ans déjà cette année";

			return renderItem( data );

		}
		function renderResult__Loading(){

		}
		function renderResult__Empty(){

			var suggestions =
				_.shuffle( _.map( datums, getAc().attr('title') ) )
				.map(function( sugg ){
					return '<span class="aut-item-sugg">'+ sugg +'</span>';
				})
				.slice( 0, 3 ).join(', ')

			return renderItem({
				id: "empty",
				xtags: "empty",
				title: "Aucun résultat pour cette recherche",
				subtitle: "Suggestion : " + suggestions + "...",
				picture: "empty.svg"
			})
		}
		function addResults( datums ){
			var $r = $( renderResults( datums ) ).hide();
			getAc().find('.aut-results').html( $r );
		}
		function renderResults( datums ){

			if( datums.length == 0 ){
				return renderResult__Empty();
			}

			return datums
				.sort(function( d1, d2 ){
					return ( d1.name > d2.name ) ? 1 : -1;
				})
				.map(function( datum ){
					return renderResult( datum )
				})
				.map(function( datum_strings ){
					var rgx = new RegExp( '>' + current_query, "i" );
					return datum_strings.replace( rgx, '><span class="aut-highlight">'+ current_query +'</span>');
				})
				.join('');
		}
		function showResults(){
			$('.aut-item').show();
		}
		function renderResultWrapper(){
			return '<div class="aut-results"></div>';
		}
		function addResultsWrapper(){
			if( getAc().find('.aut-results').length > 0 ) return;
			getAc().append( renderResultWrapper() );
		}
		function removeResultsWrapper(){
			getAc().find('.aut-results').remove();
		}
		function showResultsWrapper(){
			getAc().find('.aut-results').css({ display: 'flex' });
		}
		function hideResultsWrapper(){
			getAc().find('.aut-results').css({ display: 'none' });
		}
		function addResultsImage( datums ){

			$('.aut-item-picture').each(function( i, el ){
				if( !hasAttribute( $(el), 'src' ) ) return;
				$(el).css({
					'background-image': 'url('+ $(el).attr('src') +')'
				})
				.find('img').remove();
			});

		}

		function bindInput(){

			BH = new Bloodhound({
				local: datums,
				queryTokenizer: Bloodhound.tokenizers.whitespace,
				datumTokenizer: function( datum ){
					var tkn = [];
					[ "id", "title", "subtitle", "picture", "pushed" ].forEach(function( attr ){
						if ( hasAttribute( getAc(), attr ) ) {
							tkn.push( datum[ getAc().attr( attr ) ].trim().toLowerCase() );
						} 
					});
					return tkn;
				},
				identify: function( datum ){
					return datum.id
				}
			});

		}

		function displayResults( datums ){
			
			if( datums.length == 0 && current_query.length == 0 ){
				return removeResultsWrapper();
			}

			addResultsWrapper();
			addResults( datums );
			addResultsImage( datums );
			showResultsWrapper();
			showResults();

		}

		function handleSearchStarted(){

			current_query =  getAc().find('input').val();
			BH.search( current_query, displayResults );

		}

		function handleEvents(){

			$('body').on('keydown', '.aut input', _.throttle( handleSearchStarted , 200, { leading: false }));
			$('body').on('click', '.aut-item', function(){

				if( $(this).hasClass('x--empty') ) return;

				var $s = $( this );
				var id = $s.attr('data-id');

				var datum = _.find( datums, function( dtm ){
					return  dtm.id = id;
				});

				console.log( datum );

			});

			$('body').on('click', '.aut-item-sugg', function(){

				var $s = $( this );
				var tx = $s.text();

				getAc().find('input').val( tx );
				handleSearchStarted();

			});

		}

		function get(){
			return BH;
		}

		function init(){

			if( $('[aut]').length == 0 ){
				return console.warn("Unable to find autocomplete element");
			}

			if( !BH && typeof window.Bloodhound == "undefined" ){
				console.log("Loading Bloodhound");

				return $.getScript( bloodhound_url, function(){
					console.log("Bloodhound loaded");
					BH = window.Bloodhound;
					init();
				});
			}

			if( !datums ){
				console.log("Loading local data");

				return $.getScript( datum_url, function(){
					console.log("Local data loaded");
					datums = window.datums;
					init();
				});
			}

			layoutInput();
			bindInput();
			handleEvents();

		}

		init();

		return {
			init: init,
			get: get,
			hasAttribute: hasAttribute,
			renderResults: renderResults
		}


	})();