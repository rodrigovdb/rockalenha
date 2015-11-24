$(document).ready ->
  $menu         = $('#menu')
  headerTop     = $('#intro').offset().top + 10
  headerBottom  = headerTop + $('#intro').height() - 30

  $menu.hide()

  $(window).scroll ->
    scrollTop = $(window).scrollTop()

    if scrollTop >= headerBottom
      $menu.show()
    else
      $menu.hide()

    return
  return
