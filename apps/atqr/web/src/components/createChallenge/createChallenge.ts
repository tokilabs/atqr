(function ($) {
  'use strict';

  // nav area
  const $nav = $('#nav');
  // const $navItem = $nav.find('.nav-item');
  const $mainNavItem = $nav.find('.nav-list-item');
  // const $subNavItem = $nav.find('.sub-nav-item');
  // const $content = $('#content');
  // const $contentSection = $content.find('.content-section');

  $('.nav-item .sub-nav').slideUp();
  $('.nav-item.active .sub-nav').slideDown();

  // For Nav Item
  $mainNavItem.on('click', function (e) {
    e.preventDefault();

    const $this = $(this);

    if (!$this.parent().hasClass('active')) {
      $this.siblings('.sub-nav').slideDown();
      $this
        .parent()
        .addClass('active')
        .siblings()
        .removeClass('active')
        .find('.sub-nav')
        .slideUp();
    } else {
      $this.siblings('.sub-nav').slideUp();
      $this.parent().removeClass('active').find('.sub-nav').slideUp();
    }
  });

  $('.sub-nav-item').click(function (e: { preventDefault: () => void }) {
    e.preventDefault();
    window.location = $(this).attr('href');
  });
});
