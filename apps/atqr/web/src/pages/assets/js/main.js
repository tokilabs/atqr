$(function() {
    "use strict";

    /*--
        preloader
    -----------------------------------*/
    $(window).on('load', function(event) {
        $('#preloader').delay(500).fadeOut(500);
    });

    /*--    
        Tabs
    -----------------------------------*/  
    const tabs = document.querySelectorAll('[data-tab-target]')
    const tabContents = document.querySelectorAll('.meeta-event-schedule-tab-pane')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget)
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('active')
            })
            tabs.forEach(tab => {
                tab.classList.remove('active')
            })
            tab.classList.add('active')
            target.classList.add('active')
        })
    })

    /*--
		Header Sticky
    -----------------------------------*/
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll <= 100) {
            $(".header-sticky").removeClass("sticky");
        } else{
            $(".header-sticky").addClass("sticky");
        }
	});

    /*--
        Search Js
    -----------------------------------*/
	var $searchWrap = $('.search-wrap');
	var $navSearch = $('.search-btn');
	var $searchClose = $('#search-close');

	$('.search-btn').on('click', function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: 'toggle' }, 500);
		$navSearch.add($searchClose).addClass("open");
	});

	$('.search-close').on('click', function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: 'toggle' }, 500);
		$navSearch.add($searchClose).removeClass("open");
	});

	function closeSearch() {
		$searchWrap.fadeOut(200);
		$navSearch.add($searchClose).removeClass("open");
	}

	$(document.body).on('click', function (e) {
		closeSearch();
	});

	$(".search-btn, .main-search-input").on('click', function (e) {
		e.stopPropagation();
	});



    /*--
		Menu Script
	-----------------------------------*/

    function menuScript() {

        $('.menu-toggle').on('click', function(){
            $('.mobile-menu').addClass('open')
            $('.overlay').addClass('open')
        });
        
        $('.menu-close').on('click', function(){
            $('.mobile-menu').removeClass('open')
            $('.overlay').removeClass('open')
        });
        
        $('.overlay').on('click', function(){
            $('.mobile-menu').removeClass('open')
            $('.overlay').removeClass('open')
        });
        
        /*Variables*/
        var $offCanvasNav = $('.offcanvas-menu'),
        $offCanvasNavSubMenu = $offCanvasNav.find('.sub-menu');

        /*Add Toggle Button With Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.parent().prepend('<span class="mobile-menu-expand"></span>');

        /*Close Off Canvas Sub Menu*/
        $offCanvasNavSubMenu.slideUp();

        /*Category Sub Menu Toggle*/
        $offCanvasNav.on('click', 'li a, li .mobile-menu-expand, li .menu-title', function(e) {
            var $this = $(this);
            if (($this.parent().attr('class').match(/\b(menu-item-has-children|has-children|has-sub-menu)\b/)) && ($this.attr('href') === '#' || $this.hasClass('mobile-menu-expand'))) {
                e.preventDefault();
                if ($this.siblings('ul:visible').length) {
                    $this.parent('li').removeClass('active-expand');
                    $this.siblings('ul').slideUp();
                } else {
                    $this.parent('li').addClass('active-expand');
                    $this.closest('li').siblings('li').find('ul:visible').slideUp();
                    $this.closest('li').siblings('li').removeClass('active-expand');
                    $this.siblings('ul').slideDown();
                }
            }
        });

        $( ".sub-menu" ).parent( "li" ).addClass( "menu-item-has-children" );
    }
    menuScript();

    
    
    
    /*--
        Countdown
    -----------------------------------*/
    function makeTimer($endDate, $this, $format) {
        var today = new Date();
        var BigDay = new Date($endDate),
          msPerDay = 24 * 60 * 60 * 1000,
          timeLeft = (BigDay.getTime() - today.getTime()),
          e_daysLeft = timeLeft / msPerDay,
          daysLeft = Math.floor(e_daysLeft),
          e_hrsLeft = (e_daysLeft - daysLeft) * 24,
          hrsLeft = Math.floor(e_hrsLeft),
          e_minsLeft = (e_hrsLeft - hrsLeft) * 60,
          minsLeft = Math.floor((e_hrsLeft - hrsLeft) * 60),
          e_secsLeft = (e_minsLeft - minsLeft) * 60,
          secsLeft = Math.floor((e_minsLeft - minsLeft) * 60);
    
        var yearsLeft = 0;
        var monthsLeft = 0
        var weeksLeft = 0;
    
        if ($format != 'short') {
          if (daysLeft > 365) {
            yearsLeft = Math.floor(daysLeft / 365);
            daysLeft = daysLeft % 365;
          }
    
          if (daysLeft > 30) {
            monthsLeft = Math.floor(daysLeft / 30);
            daysLeft = daysLeft % 30;
          }
          if (daysLeft > 7) {
            weeksLeft = Math.floor(daysLeft / 7);
            daysLeft = daysLeft % 7;
          }
        }
    
        var yearsLeft = yearsLeft < 10 ? "0" + yearsLeft : yearsLeft,
          monthsLeft = monthsLeft < 10 ? "0" + monthsLeft : monthsLeft,
          weeksLeft = weeksLeft < 10 ? "0" + weeksLeft : weeksLeft,
          daysLeft = daysLeft < 10 ? "0" + daysLeft : daysLeft,
          hrsLeft = hrsLeft < 10 ? "0" + hrsLeft : hrsLeft,
          minsLeft = minsLeft < 10 ? "0" + minsLeft : minsLeft,
          secsLeft = secsLeft < 10 ? "0" + secsLeft : secsLeft,
          yearsText = yearsLeft > 1 ? 'Years' : 'year',
          monthsText = monthsLeft > 1 ? 'Months' : 'month',
          weeksText = weeksLeft > 1 ? 'Weeks' : 'week',
          daysText = daysLeft > 1 ? 'Days' : 'day',
          hourText = hrsLeft > 1 ? 'Hours' : 'Hr',
          minsText = minsLeft > 1 ? 'Mints' : 'min',
          secText = secsLeft > 1 ? 'Secs' : 'sec';
    
        var $markup = {
          wrapper: $this.find('.countdown__item'),
          year: $this.find('.yearsLeft'),
          month: $this.find('.monthsLeft'),
          week: $this.find('.weeksLeft'),
          day: $this.find('.daysLeft'),
          hour: $this.find('.hoursLeft'),
          minute: $this.find('.minsLeft'),
          second: $this.find('.secsLeft'),
          yearTxt: $this.find('.yearsText'),
          monthTxt: $this.find('.monthsText'),
          weekTxt: $this.find('.weeksText'),
          dayTxt: $this.find('.daysText'),
          hourTxt: $this.find('.hoursText'),
          minTxt: $this.find('.minsText'),
          secTxt: $this.find('.secsText')
        }
    
        var elNumber = $markup.wrapper.length;
        $this.addClass('item-' + elNumber);
        $($markup.year).html(yearsLeft);
        $($markup.yearTxt).html(yearsText);
        $($markup.month).html(monthsLeft);
        $($markup.monthTxt).html(monthsText);
        $($markup.week).html(weeksLeft);
        $($markup.weekTxt).html(weeksText);
        $($markup.day).html(daysLeft);
        $($markup.dayTxt).html(daysText);
        $($markup.hour).html(hrsLeft);
        $($markup.hourTxt).html(hourText);
        $($markup.minute).html(minsLeft);
        $($markup.minTxt).html(minsText);
        $($markup.second).html(secsLeft);
        $($markup.secTxt).html(secText);
    }
    
    $('.countdown').each(function () {
        var $this = $(this);
        var $endDate = $(this).data('countdown');
        var $format = $(this).data('format');
        setInterval(function () {
          makeTimer($endDate, $this, $format);
        }, 0);
    });


    $('.meeta-event-accordion-title').click(function(e) {
            e.preventDefault();
        
        let $this = $(this);
        
        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('meeta-event-accordion-body').removeClass('show');
            $this.parent().parent().find('meeta-event-accordion-body').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
    });


   
    $(".meeta-event-accordion-item > .meeta-event-accordion-toggle").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
            $(this).siblings(".meeta-event-accordion-body").slideUp(200);
        } else {           
            $(".meeta-event-accordion-item > .meeta-event-accordion-toggle").removeClass("active");
            $(this).addClass("active");
            $(".meeta-event-accordion-body").slideUp(200);
            $(this).siblings(".meeta-event-accordion-body").slideDown(200);
        }
    });


    /*--
        Sponsor Active 02
    -----------------------------------*/
    var swiper = new Swiper(".meeta-sponsor-active .swiper", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".meeta-sponsor-active .swiper-button-next",
            prevEl: ".meeta-sponsor-active .swiper-button-prev",
        },
        breakpoints: {
            0: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            576: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 3,
            },
            992: {
              slidesPerView: 4,
            }            
        },
    });


    /*--
        Testimonial Active 02
    -----------------------------------*/
    var swiper = new Swiper(".meeta-testimonial-active .swiper", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 30,
        navigation: {
            nextEl: ".meeta-testimonial-active .swiper-button-next",
            prevEl: ".meeta-testimonial-active .swiper-button-prev",
        },
        breakpoints: {
            0: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 2,
            },
            1500: {
              slidesPerView: 3,
            },
        },
    });


    /*--
        Topics Active
    -----------------------------------*/
    var swiper = new Swiper(".meeta-topics-active .swiper", {
        slidesPerView: 3,
        loop: true,
        spaceBetween: 30,
        pagination: {
            el: ".meeta-topics-active .swiper-pagination",
            clickable: true,
        },
        breakpoints: {
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            }
        }
    });

     /*--
        Trending Active
    -----------------------------------*/
    var swiper = new Swiper(".meeta-trending-active .swiper", {
      slidesPerView: 4,
      loop: true,
      spaceBetween: 30,
      pagination: {
          el: ".meeta-trending-active .swiper-pagination",
          clickable: true,
      },
      breakpoints: {
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          992: {
            slidesPerView: 4,
          }
      }
    });

    /*--
      Project Active
	-----------------------------------*/
  var swiper = new Swiper('.event-project-active .swiper', {
    slidesPerView: 2,
    spaceBetween: 50,
    centeredSlides: true,
    loop: true,        
    grabCursor: true,
    pagination: {
      el: ".event-project-active .swiper-pagination",
      clickable: true,
  },
    breakpoints: {
        0: {
          slidesPerView: 1,
        },
        992: {
          slidesPerView: 2,
        },
      },
  });


    /*--    
      Counter Up
    -----------------------------------*/  

    $('.counter').counterUp({
        delay: 10,
        time: 1500,
    });

    /*--
		MagnificPopup video view 
	-----------------------------------*/	
    $('.popup-video').magnificPopup({
      type: 'iframe'
    });

    
    /*--
      Magnific Popup  
    -----------------------------------*/
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery:{
          enabled:true
        }
    });

     /*--
      nice select  
    -----------------------------------*/
	  $('select').niceSelect();

    
    /*--
        AOS
    -----------------------------------*/
    
    AOS.init({
      duration: 1200,
      once: true,
  });

    
    
    
});