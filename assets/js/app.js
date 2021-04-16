$(function() {

    /* Nav toogle on mobile
    ============================================ */
    let navToogle = $('#navToogle');
    let nav = $('#nav');

    navToogle.on('click', { passive: true }, function(event) {
        event.preventDefault();

        $('body').toggleClass('show-nav');
        $(this).toggleClass('active');
        nav.toggleClass('show');

    });

    /* header class on scroll
    ============================================ */

    let intro = $('#intro');
    let introHeight = intro.innerHeight();

    let header = $('#header');
    let headerHeight = header.innerHeight();

    let scrollTop = $(window).scrollTop();

    // hide menu on mobile when we ratate phone

    $(window).on('resize', function() {
        // hide menu on mobile on click menu item
        $('body').removeClass('show-nav');
        navToogle.removeClass('active');
        nav.removeClass('show');
    });

    addClassOnHeaderScrolling(); // run function after upload site

    $(window).on('scroll resize', { passive: true }, function() {
        addClassOnHeaderScrolling(); // run function after scroll again
    });



    function addClassOnHeaderScrolling() {
        introHeight = intro.innerHeight();
        headerHeight = header.innerHeight();

        let scrollTop = $(this).scrollTop();

        if (scrollTop >= (introHeight - headerHeight)) {
            header.addClass('header--dark')
        } else {
            header.removeClass('header--dark')
        }
    }



    /* Smooth Scroll to sections
    ============================================ */

    $('[data-scroll]').on('click', { passive: true }, function(event) {
        event.preventDefault();

        let scrollElement = $(this).data('scroll'); // get attribute data-scroll
        let scrollPositionToElement = $(scrollElement).offset().top; // get value in pixels to bottom block by id

        // hide menu on mobile on click menu item
        $('body').removeClass('show-nav');
        navToogle.removeClass('active');
        nav.removeClass('show');

        $('html, body').animate({
            scrollTop: scrollPositionToElement - headerHeight
        }, 700);



        console.log(scrollElement, scrollPositionToElement);

    });


    /* Scrollspy
    ============================================ */

    let windowHeight = $(window).height();
    scrollSpy(scrollTop); // get global scroll in the start document

    $(window).on('scroll', { passive: true }, function() {
        scrollTop = $(this).scrollTop();
        scrollSpy(scrollTop); // run function and get local scroll after user again scroll
    })

    function scrollSpy(scrollTop) {

        $('[data-scrollspy]').each(function() {
            let $this = $(this);
            let sectionId = $this.data('scrollspy');
            let sectionOffset = $this.offset().top;

            sectionOffset = sectionOffset - (windowHeight * 0.33333);

            if (scrollTop >= sectionOffset) {
                $('#nav [data-scroll]').removeClass('active');
                $('#nav [data-scroll="' + sectionId + '"]').addClass('active');
            }

            if (scrollTop == 0) {
                $('#nav [data-scroll]').removeClass('active');
            }
        });
    }

    /* Modal
    ============================================ */
    $('[data-modal]').on('click', { passive: true }, function(event) {
        event.preventDefault();
        let modal = $(this).data('modal');

        $('body').addClass('no-scroll');
        $(modal).addClass('show');

        setTimeout(function() {
            $(modal).find('.modal__inner').css({
                'transform': 'scale(1)',
                'opacity': '1'
            });
        }, 150);
    });

    $('[data-modal-close]').on('click', { passive: true }, function(event) {
        event.preventDefault();
        let modal = $(this).parents('.modal');

        modalClose(modal);
    });

    $('.modal').on('click', { passive: true }, function() {
        let modal = $(this);
        modalClose(modal);
    });

    $('.modal__inner').on('click', { passive: true }, function(event) {
        event.stopPropagation();
    })


    function modalClose(modal) {
        $(modal).find('.modal__inner').css({
            'transform': 'scale(.5)',
            'opacity': '0'
        });

        setTimeout(function() {
            $('body').removeClass('no-scroll');
            modal.removeClass('show');
        }, 200);
    }



    // Slick Slider

    let introSlider = $('#introSlider');

    introSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 4000,
        fade: true,
        speed: 1000,
    });

    $('#introSliderPrev').on('click', { passive: true }, function() {
        introSlider.slick('slickPrev');
    });

    $('#introSliderNext').on('click', { passive: true }, function() {
        introSlider.slick('slickNext');
    });

    // Reviews slider

    let reviewsSlider = $('#reviewsSlider');

    reviewsSlider.slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 800,
    });







    // AOS.js https://michalsnik.github.io/aos/

    // You can also pass an optional settings object
    // below listed default settings
    AOS.init({
        // Global settings:
        disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
        startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
        initClassName: 'aos-init', // class applied after initialization
        animatedClassName: 'aos-animate', // class applied on animation
        useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
        disableMutationObserver: false, // disables automatic mutations' detections (advanced)
        debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
        throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)


        // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
        offset: 80, // offset (in px) from the original trigger point
        delay: 0, // values from 0 to 3000, with step 50ms
        duration: 700, // values from 0 to 3000, with step 50ms
        easing: 'ease', // default easing for AOS animations
        once: false, // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
        anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

    });

    let allert = $("body div[style^='margin']");
    let footAllert = $('div.cbalink');
    setTimeout(function() {
        allert.css({
            'display': 'none',
        }),
        footAllert.css({
            'display': 'none',
        });

    }, 10);

    //console.log(allert, footAllert);

});