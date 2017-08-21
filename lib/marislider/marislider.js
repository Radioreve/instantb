/*
 Slider with bullets and text aside
 Auto-slide with extra delay on click
 Fully responsive

 Example usage
 ____________________________________

 <section class="marislider" autoslide>
 <div data-src="../img/mike/1.jpg">
 <p>De savoureux fruits et légumes frais transformés à la demande en smoothie !</p>
 </div>
 <div data-src="../img/mike/2.jpg">
 <p>De délicieuses animations qui vous feront oublier que la gourmandise est un vilain défaut !</p>
 </div>
 <div data-src="../img/mike/3.jpg">
 <p>Des animations originales qui transporteront vos convives en enfance le temps de votre événement ! </p>
 </div>
 <div data-src="../img/mike/4.jpg">
 <p>La qualité et le choix de nos boissons rendront vos réceptions festives et inoubliables !</p>
 </div>
 </section>

 ____________________________________
 End example usage
 */

var Marislider = (function () {

  _Marislider = {}

  function get(slider_id) {

    if (slider_id) {
      return _Marislider[slider_id]
    } else {
      return _Marislider
    }
  }

  function getMarisliderWrapper(slider_id) {
    return $('.marislider[data-slider-id="' + slider_id + '"]')
  }

  function setItems(slider_id) {

    var $w = getMarisliderWrapper(slider_id).append('<div class="marislider-wrap x--content"><div class="marislider-content"></div></div>')
    var $c = $w.find('.marislider-content')

    $w.find('[data-src]')
      .appendTo($c)
      .each(function (i, item) {
        $(item).addClass('marislider-item').attr('data-link', i + 1)

      })

  }

  function setPictures(slider_id) {

    var $w = getMarisliderWrapper(slider_id)

    $w
      .find('[data-src]')
      .each(function (i, el) {

        var $el = $(el)
        var src = $el.attr('data-src')

        if ($w.find('.marislider-pictures').length == 0) {
          $w.prepend('<div class="marislider-wrap x--pictures"><div class="marislider-pictures"></div></div>')
        }

        var $item = $('<div class="marislider-picture" data-link="' + (i + 1) + '"></div>')

        $item.appendTo('.marislider-pictures')
        $item.css({
          'background-image': 'url(' + src + ')',
          'background-size': 'cover',
          'background-position': 'center center'
        })

      })

  }

  function setEventHandlers(slider_id) {

    getMarisliderWrapper(slider_id).on('click', '.marislider-bullet', function () {

      var $s = $(this)
      var $w = $s.closest('.marislider')
      var link = $s.attr('data-link')

      get(slider_id).reset_timer = true
      get(slider_id).active_link = link

      activateSliderItem(link, slider_id)

    })

  }

  function setBullets(slider_id) {

    var $ms = getMarisliderWrapper(slider_id)
    var n = $ms.attr('n-active') ? $ms.attr('n-active') : $ms.find('[data-src]').length

    var bullets_content = ['<div class="marislider-bullets x--pictures">']
    var bullets_pictures = ['<div class="marislider-bullets x--pictures">']
    for (var i = 1; i <= n; i++) {
      var $bullet = '<div class="marislider-bullet" data-link="' + i + '"></div>'
      bullets_content.push($bullet)
      bullets_pictures.push($bullet)
    }
    $ms.find('.marislider-pictures').append(bullets_content.concat(['</div>']).join(''))
    $ms.find('.marislider-pictures').append(bullets_pictures.concat(['</div>']).join(''))

  }

  function init() {

    $('.marislider').each(function (i, marislider) {

      var slider_id = "ms-" + i
      $(marislider).attr('data-slider-id', slider_id)

      var d = $(marislider).attr('autoslide') != undefined ? 6000 : null
      var s = $(marislider).attr('centered') != undefined ? "centered" : "side";

      _Marislider[slider_id] = {
        delay: d,
        style: s,
        active_link: null,
        reset_timer: null,
        timers: []
      }

      setItems(slider_id)
      setPictures(slider_id)
      setBullets(slider_id)
      setEventHandlers(slider_id)
      activateSliderItem(1, slider_id)
      addOverlay(slider_id)
      addWave(slider_id)
    })
  }

  function addOverlay(slider_id) {
    var $w = getMarisliderWrapper(slider_id)
    $w.prepend('<div class="landing-img-overlay"></div>');
  }

  function addWave(slider_id) {
    var $w = getMarisliderWrapper(slider_id)
    $w.append('<div class="wave"><img src="img/wave_bottom.svg"></div>')
  }


  function activateSliderItem(link, slider_id) {

    var MS = get(slider_id)

    link = parseInt(link)

    if (!slider_id) {
      return console.warn('Cannot activate without slider_id')
    }
    if (!MS) {
      return console.warn('Unable to find the Marislider for id : ' + slider_id)
    }

    var $w = getMarisliderWrapper(slider_id)
    var delay = MS.delay || null

    if (!$w || $w.length == 0) {
      return console.warn('Cannot initialize slider without wrapper')
    }

    // The number '2' is because there are 2 wrappers : one for text bullets, and one for pictures!
    var $bullets = $w.find('.marislider-bullet')
    if ($bullets.length == 2) {
      $bullets.hide()
    }

    var $current_bullet = $w.find('.marislider-bullet.x--active')
    var $target_bullet = $w.find('.marislider-bullet[data-link="' + link + '"]')

    var $current_picture = $w.find('.marislider-picture.x--active')
    var $target_picture = $w.find('.marislider-picture[data-link="' + link + '"]')

    var $current_textitem = $w.find('.marislider-item.x--active')
    var $target_textitem = $w.find('.marislider-item[data-link="' + link + '"]')

    if ($target_bullet.length == 0) {
      return activateSliderItem(1, slider_id)
    }

    // All the ui is taken care of by the active classes (check the css)
    // Only the picture element have a special transtion
    if (!$current_bullet.is($target_bullet)) {

      $current_bullet.add($current_picture).add($current_textitem).removeClass('x--active')
      $target_bullet.add($target_picture).add($target_textitem).addClass('x--active')
      $current_picture.velocity({'opacity': [0, 1]}, {duration: 500})
      $target_picture.velocity({'opacity': [1, 0]}, {duration: 500})
      Emmy.t("marislider:show", {link: link});
    }

    if (delay) {
      clearTimeout(MS.timers[link])
      MS.timers[link] = setTimeout(function () {

        if (MS.reset_timer) {

          MS.timers.forEach(function (timer, i) {
            if (timer && i != link) {
              clearTimeout(timer)
            }
          })

          MS.reset_timer = false
          MS.delay += 10000
          activateSliderItem(MS.active_link, slider_id)
          return MS.delay -= 10000

        }

        activateSliderItem(link + 1, slider_id)

      }, delay)
    }
  }

  init()

  return {
    get: get,
    init: init,
    activateSliderItem: activateSliderItem
  }

})()

