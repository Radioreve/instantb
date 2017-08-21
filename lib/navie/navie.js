/*
 Welcome to Navie, navigation made easy!
 Aims ot provide declarative way of having a fully-featured navigation bar

 - Mandatory fields : 'id', 'label', 'target'
 id -> used internally as a base identifier of the nav item
 label -> text that is deplayed. Can by replaced by an image when src is provided (logo usage)
 target -> target of the nav : regular anchor link when prefixed by '/', scrollTo to the selector otherwise
 when target equals 'sub', nav item is treated as a dropdown list. Multi dropdown not supported.

 Examplage usage
 _______________________________________

 <div nav layout="center" hover="underline" anim="sliding" opts="shrink">
 <div active label="Accueil" id="hello" target="/hello.html"></div>
 <div id="team" label="Equipe" target="/team.html"></div>
 <div id="logo" src="logo.png" label="Nightmatch" target="/index.html"></div>
 <div id="flowers" label="Fleurs" target="/fleurs.html"></div>
 <div id="services" label="Services" target="sub">
 <div id="space" label="Espace" target=".espace"></div>
 <div id="sun" label="Soleil" target=".sun"></div>
 </div>
 <div id="jeannette" label="Jeanette" target=".jeanette"></div>
 </div>

 _______________________________________
 End example usage

 */
var Navie = (function () {

  var _Navie;

  var window_width_to_resize = null;
  var window_height_to_shrink = 200;
  var window_height_to_reveal = 300;

  // check at parse-time ot help consummer knowing if he did a bad declaration
  var possible = {
    layout: ["left", "center", "right"],
    hover: ["underline", "custom"],
    opts: ["revealed", "shrink"]
  };

  function getNav() {
    var $n = $('[nav]');
    if ($n.length == 0) {
      throw "Unable to get the nav element";
    }
    return $n;
  }

  function get() {
    return _Navie;
  }

  function splitValues(opts) {
    return opts.split(' ').filter(Boolean)
  }

  function checkOptionValues() {
    ["layout", "hover", "opts"].forEach(function (attr) {

      if (hasAttribute(getNav(), attr)) {
        splitValues(getNav().attr(attr)).forEach(function (val) {
          if (possible[attr].indexOf(val) == -1) {
            throw "Unexpected option value (" + val + ") on attribute " + attr;
          }
        });
      }

    });
  }

  function checkOptionsXor() {
    ["layout", "hover"].forEach(function (attr) {

      if (hasAttribute(getNav(), attr)) {
        var values = getNav().attr(attr).trim().split(' ').filter(Boolean);
        var allowed = possible[attr];
        var i = _.intersection(values, allowed);

        if (i.length != 1) {
          throw "The attribute " + attr + " must contains one of : [" + allowed.join(', ') + ']';
        }
      }

    });
  }

  function parseArray(array, opts) {
    var type = null;
    if (!opts) return null;
    splitValues(opts).forEach(function (val) {
      if (!type && array.indexOf(val) != -1) {
        type = val;
      }
    });
    return type;
  }

  function hasAttribute($el, attr) {
    return !(typeof $el.attr(attr) == "undefined");
  }


  function parseSetup() {

    var parsed = {};
    var $n = getNav();

    checkOptionValues();
    checkOptionsXor();

    parsed.layout = parseArray(possible.layout, $n.attr('layout')) || "left";
    parsed.hover = parseArray(possible.hover, $n.attr('hover')) || "underline";
    parsed.active = $n.attr('active');

    if (hasAttribute($n, 'opts')) {
      $n.attr('opts').split(/\s+/i).forEach(function (opt) {
        parsed[opt] = true;
      });
    }

    return parsed;

  }

  function isLinkToNewPage(target) {

    return target[0] == "/";

  }

  function parseItems($root, depth) {

    depth = depth || 1;

    var items = [];

    $root.children()
      .each(function (i, nav) {

        var parsed = {};

        var $n = $(nav);
        var id = $n.attr('id');
        var tg = $n.attr('target');
        var lb = $n.attr('label');

        if (id == "title") {
          tg = "#";
        }

        if (!id) throw "Missing id for item " + i;
        if (!tg) throw "Missing target for item " + i;

        if (id == "logo") {
          if (depth != 1) {
            throw "Logo cannot be placed on a subnav item (depth is " + depth + ")";
          } else {
            parsed.logo = true;
            parsed.label = lb;
            parsed.src = hasAttribute($n, 'src') ? $n.attr('src') : null;
            parsed.noop = hasAttribute($n, 'noop') ? true : false;
          }
        } else if (id == "title") {
          parsed.title = true;
          parsed.label = lb;
        } else {
          if (!lb) throw "Missing label for item " + i;
          parsed.label = lb;
        }

        parsed.id = id;
        parsed.tg = tg;
        parsed.type = isLinkToNewPage(tg) ? "link" : "scroll";

        if (tg == "sub") {

          parsed.items = parseItems($n, depth + 1);
          parsed.navigate = function () {

            var $elem = getNavElem(id);
            $elem.toggleClass('x--open');
            getNav().find('.x--open')
              .not($elem)
              .removeClass('x--open');
          }

          if (hasAttribute($n, "noarrow")) {
            parsed.noarrow = true;
          } else {
            parsed.noarrow = false;
          }

        } else {

          parsed.navigate = function () {
            if (isLinkToNewPage(tg)) {
              $('<a id="navigo" href="' + tg + '"></a>').appendTo('body');
              $('#navigo')[0].click();
              // window.location = window.location.origin + tg;
            } else {
              $(tg).velocity('scroll', {
                duration: 1200,
                offset: -getNav().outerHeight(true),
                easing: "ease-in-out"
              });
            }
          }

        }

        get().ids = get().ids || [];
        get().ids.push(id);

        items.push(parsed);

      });

    return items;

  }

  function getNavItem(id, items, depth) {

    var item;
    items = items || get().items;
    depth = depth || 1;

    items.forEach(function (itm) {
      if (itm.id == id) {
        return item = itm;
      }
      if (itm.items) {
        var deep_item = getNavItem(id, itm.items, depth + 1);
        if (deep_item) {
          item = deep_item;
        }
      }
    });

    if (!item && depth == 1) {
      console.warn("Unable to retrieve item with id " + id);
    }

    return item;

  }

  function getNavElem(id) {

    var $elem = $('[nav-id="' + id + '"]');

    if ($elem.length == 0) {
      return console.warn("Unable to retrieve item element with id " + id);
    }

    return $elem;
  }

  function renderNavItem(id) {

    var nav_item = getNavItem(id);
    var x_sub = nav_item.tg == "sub" ? "x--sub" : "";
    return [

      '<li class="navie-item ' + x_sub + '" nav-id="' + id + '">',
      '<span>' + nav_item.label + '</span>',
      '</li>'

    ].join('');

  }

  function renderNavItems(items) {

    var html = [];

    items.forEach(function (itm) {

      if (itm.tg == "sub") {

        var navie_icon = '<div class="navie-icon"><img src="/lib/navie/down-arrow-bold.svg"></div>';
        html.push(renderNavItem(itm.id).replace('</span></li>', navie_icon));
        html.push('</span>')
        html.push(['<ul class="navie-sublist">', renderNavItems(itm.items), '</ul>'].join(''));
        html.push('</li>');

        if (itm.noarrow) {
          html = html.join('').replace("navie-icon", 'navie-icon none').split('');
        }

      } else {

        html.push(renderNavItem(itm.id));

      }

    });

    return html.join('');

  }

  function setLayout() {

    var $navie = getNav();

    $navie
      .addClass('navie')
      .addClass('x--' + get().layout)
      .children()
      .remove();


    $(['<ul class="navie-list">', renderNavItems(get().items), '</ul>'].join(''))
      .appendTo($navie);

  }

  function setLayoutResponsive() {

    var $navie = getNav();

    $navie
      .find('.navie-list')
      .append(['<div class="navie-menu">',
        '<span></span><span></span><span></span><span></span>',
        '</div>'].join(''));

  }

  function setHoverLayout() {

    get().ids.forEach(function (id) {

      var itm = getNavItem(id);
      var $nav = getNavElem(id);

      if (get().hover == "underline" && itm.tg != "sub" && itm.id != "title") {
        $nav
          .find('span')
          .append('<div class="navie-underline"></div>');
      }

    });

  }

  function setMode(mode) {

    var $nav = getNav();

    if (mode == "wide") {
      return $nav.removeClass('x--responsive x--open');
    }

    if (mode == "responsive") {
      return $nav.addClass('x--responsive').removeClass('x--open');
    }

    if (mode == "open") {
      return $nav.addClass('x--open x--responsive');
    }

  }

  function setActiveItem() {

    get().ids.forEach(function (id) {
      if (getNavItem(id).id == get().active) {
        getNavElem(id).addClass('x--active');
      }
    });
  }

  function setLogoItem() {

    get().ids.forEach(function (id) {
      var nav_item = getNavItem(id);
      if (nav_item.logo) {
        getNavElem(id).addClass('x--logo');
        if (nav_item.src) {
          getNavElem(id).html('<img src="' + nav_item.src + '">');
          if (!nav_item.noop) {
            getNavElem(id).find('img').css({width: $('.navie-item').width()});
          }
        }
      }
    });
  }

  function setTitleItem() {

    get().ids.forEach(function (id) {
      var nav_item = getNavItem(id);
      if (nav_item.title) {
        getNavElem(id).addClass("x--title");
        getNavElem(id).html('<span>' + nav_item.label + '</span>');
      }
    });

  }

  function setSublistItem() {
    get().ids.forEach(function (id) {
      if (getNavItem(id).tg == "sub") {

      }
    });
  }

  function handleNavClicked() {

    getNavItem($(this).attr('nav-id')).navigate();

  }

  function handleMenuClicked() {

    getNav().toggleClass('x--open');

  }

  function resize() {

    if ($(window).width() < window_width_to_resize) {
      setMode("responsive");
    } else {
      setMode("wide");
    }

  }

  function handleShrink() {

    if (!get().shrink)
      return;

    if ($(window).scrollTop() > window_height_to_shrink) {
      getNav().addClass('x--shrink');
    }
    if ($(window).scrollTop() < window_height_to_shrink) {
      getNav().removeClass('x--shrink');
    }

  }

  function handleRevealed() {

    var $w = $(window)
    var $n = getNav();
    var has_scrolled_enough = $w.scrollTop() > window_height_to_reveal;
    var has_been_marked = $n.hasClass('x--revealed');

    if (!get().revealed)
      return;

    if ($w.scrollTop() < window_height_to_reveal && !has_been_marked) {
      $n.hide();
      return;
    }

    var display_style = ($(window).width() < window_width_to_resize) ? "block" : "flex";

    if (!has_been_marked && has_scrolled_enough) {
      $n.addClass('x--revealed');
      var css_transition = $n.css('transition');
      $n.css({'transition': 'none'});
      $n.velocity('slideDownIn', {
        duration: 500, display: display_style, complete: function () {
          $n.css({'transition': css_transition});
          handleRevealed();
        }
      });
    }
    if ($n.hasClass('x--revealed') && !has_scrolled_enough) {
      var css_transition = $n.css('transition');
      $n.css({'transition': 'none'});
      $n.removeClass('x--revealed');
      $n.velocity('slideUpOut', {
        duration: 500, complete: function () {
          $n.css({'transition': css_transition});
          handleRevealed();
        }
      });
    }

  }

  function handleWindowScrolled() {

    handleShrink();
    handleRevealed();

  }

  function getWidthToResize() {

    var padding = 50;
    var $items = $('.navie-list').children('.navie-item');

    return $items.length * $items.first().outerWidth(true) + padding;

  }

  function setBreakpoint() {

    window_width_to_resize = getWidthToResize();

  }

  function handleWindowResized() {
    resize();
  }

  function handleDomEvents() {

    $(window).on('resize', _.throttle(handleWindowResized, 300));
    $(window).on('scroll', _.throttle(handleWindowScrolled, 300));
    $('body').on('click', '.navie-menu', handleMenuClicked);
    $('body').on('click', '.navie-item', handleNavClicked);

  }

  function init() {

    _Navie = parseSetup();
    _Navie.items = parseItems(getNav());

    setLayout();
    setLayoutResponsive();
    setHoverLayout();
    setActiveItem();
    setBreakpoint();
    setLogoItem();
    setTitleItem();
    handleDomEvents();

  }

  try {
    $(document).ready(function () {
      init();
      handleWindowResized();
      handleWindowScrolled();
      //console.log( get() );
    });
  } catch (err) {
    console.warn(err);
  }


  return {
    init: init,
    get: get,
    getNav: getNav,
    getNavElem: getNavElem,
    getNavItem: getNavItem,
    setLayout: setLayout,
    setMode: setMode,
    resize: resize,
    getWidthToResize: getWidthToResize
  }


})();
