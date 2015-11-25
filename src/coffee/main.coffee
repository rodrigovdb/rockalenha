$(document).ready ->
  $intro        = $('#intro')
  $menu         = $('#menu')
  headerTop     = $intro.offset().top + 10
  headerBottom  = headerTop + $intro.height() - 40

  width = $intro.width() - 20
  left  = $intro.offset().left

  $menu.css('left', left)
  $menu.width(width)
  $menu.hide()

  $(window).scroll ->
    scrollTop = $(window).scrollTop()

    if scrollTop >= headerBottom
      $menu.show()
    else
      $menu.hide()

    return
  return
