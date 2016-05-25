/**Scroll animation - drawing
 * to hide labels "start", "end", "trigger"  - remove  .addIndicators(); in code
 *
 * */

$(window).on('beforeunload', function () {
    $(window).scrollTop(0);
});


/** code to reduce scroll speed */
function wheel(event) {
    var delta = 0;
    if (event.wheelDelta) {
        (delta = event.wheelDelta / 120);
    }
    else if (event.detail) {
        (delta = -event.detail / 3);
    }

    handle(delta);
    if (event.preventDefault) {
        (event.preventDefault());
    }
    event.returnValue = false;
}

function handle(delta) { // slow down scroll in window
    var time = 600;
    var distance = 190;

    $('html, body').stop().animate({
        scrollTop: $(window).scrollTop() - (distance * delta)
    }, time);
}
/** end of code to reduce scroll speed */



function getCenterElement() {
    var parts = $('.parts-class');
    for (var i = 0; i < parts.length; i++) {
        if ($(parts[i]).isOnScreen()) {
            return i++;
        }
    }
}

$.fn.isOnScreen = function () { // check if element is visible on screen (in viewport)
    var element = this.get(0);
    var bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
};

function scrollToElement(el, index) { // scroll to element (for menu)
    var me = this,
        element = me.$(el)[0];

    var idVisibleElement = getCenterElement(),
        scrollTime = Math.abs(index - idVisibleElement) * 1800; // time of scroll to element

    if (element) {
        var box1 = me.$('.svg-container')[0].getBoundingClientRect(),
            box2 = element.getBoundingClientRect();
        if (box2.top < box1.top || box2.bottom > box1.bottom) {
            me.$('body').animate({
                scrollTop: element.offsetTop - (box1.height - box2.height) / 2 - 200
            }, scrollTime);
        }
    }
}

window.onload = function () {

    if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = wheel;

    /* Default initialization*/
    $('.menu').on('click', function () {
        $('.menu-select').toggle('hidden');
    });

    $('.menu-select a').on('click', function (e) { //initialize scroll to part (menu)
        var index = e.target.id;
        $('.menu-select').toggle('hidden');
        scrollToElement('#part' + index, index - 0);
    });

    function preparePath(arrayPathes) {
        arrayPathes.each(function () {
            var len = $(this).get(0).getTotalLength() + 100;
            $(this).css({"stroke-dasharray": len, "stroke-dashoffset": len});
        });
    }

    function createDefaultScene(el, tween) {
        var scene = new ScrollMagic.Scene({
            triggerElement: el,
            duration: 300, // length of scroll
            tweenChanges: true

        })
            .setTween(tween)
            .addIndicators();
        return scene;
    }

    var controller = new ScrollMagic.Controller(),
        scene0, scene1, scene2, scene3, scene4, scene5, scene6, scene7, scene8, scene9,
        duration = 3.0, fastDuration = 1.2;

    /* End of default initialization*/


    /** Start animation */

    /* First animation */

    var $initialFace = $($("#sample_svg #pic-1")[0]).find("path");
    preparePath($initialFace);

    var tween0 = new TimelineMax()
        .add(TweenMax.to($initialFace, duration, {stroke: "#000000", strokeDashoffset: 0, ease: Linear.easeNone}));
    scene0 = createDefaultScene("#part1", tween0).addTo(controller);


    /* Second animation */

    var $tshortPaths1 = $($("#sample_svg #pic-2")[0]).find("path");
    preparePath($tshortPaths1);
    var tween1 = new TimelineMax()
        .add(TweenMax.to($tshortPaths1, duration, {stroke: "#000000", strokeDashoffset: 0, ease: Linear.easeNone}));

    scene1 = createDefaultScene("#part2", tween1)
        .addTo(controller);


    /* Third animation */

    var $mousePaths2 = $($("#sample_svg #pic-3-mouse")[0]).find("path"),
        $zLetters = $("#sample_svg .z-letter");
    preparePath($mousePaths2);
    preparePath($zLetters);

    var tween2 = new TimelineMax()
        .add([
            TweenMax.to($zLetters, fastDuration, {stroke: "none", strokeDashoffset: 0, ease: Linear.easeNone}),
            TweenMax.to($mousePaths2, fastDuration, {
                stroke: "#000000",
                strokeDashoffset: 0,
                ease: Linear.easeNone
            })]);

    scene2 = createDefaultScene("#part3", tween2)
        .addTo(controller);


    /* Fourth animation */

    var $sampleSvgPaths3 = $($("#sample_svg #pic-4-glasses")[0]).find("path"),
        $glassesFillPart = $("#sample_svg .glasses-part");
    preparePath($sampleSvgPaths3);
    preparePath($glassesFillPart);

    var tween3 = new TimelineMax()
        .add([TweenMax.to($sampleSvgPaths3, fastDuration, {
            strokeDashoffset: 0,
            stroke: "#000000",
            ease: Linear.easeNone
        }),
            TweenMax.to($glassesFillPart, fastDuration, {
                strokeDashoffset: 0,
                ease: Linear.easeNone,
                stroke: "#000000",
                "fill": "#000000"
            })]);

    scene3 = createDefaultScene("#part4", tween3)
        .addTo(controller);


    /* Fifth animation */

    var $sampleSvgPaths4 = $($("#sample_svg #pic-5-second-hat")[0]).find("path"),
        $fillHat = $("#pic-5-second-hat .hat-fill"),
        $fillHatWhite = $("#pic-5-second-hat .white-fill"),
        $glassesRemove = $($("#sample_svg #pic-4-glasses")[0]).find("path");
    preparePath($sampleSvgPaths4);
    preparePath($fillHat);
    preparePath($fillHatWhite);
    preparePath($glassesRemove);

    var tween4 = new TimelineMax()
        .to([$glassesRemove], 0.2, {visibility: 'hidden'})
        .add([
            TweenMax.to($fillHat, 0.2, {fill: "#000000", strokeDashoffset: 0, ease: Linear.easeNone}),
            TweenMax.to($fillHatWhite, 0.2, {fill: "#ffffff", strokeDashoffset: 0, ease: Linear.easeNone}),
            TweenMax.to($sampleSvgPaths4, duration, {stroke: "#000000", strokeDashoffset: 0, ease: Linear.easeNone})])

    scene4 = createDefaultScene("#part5", tween4)
        .addTo(controller);


    /* Sixth animation */

    var $sampleSvgPaths5 = $($("#sample_svg #pic-6-pencils")[0]).find("path");
    preparePath($sampleSvgPaths5);

    var tween5 = new TimelineMax()
        .add(TweenMax.to($sampleSvgPaths5, duration, {stroke: "#000000", strokeDashoffset: 0, ease: Linear.easeNone}));

    scene5 = createDefaultScene("#part6", tween5)
        .addTo(controller);


    /* Seventh animation */

    var title = $($('#vivien')[0]).find('path'),
        $removePencils = $($("#sample_svg #pic-6-pencils")[0]).find("path");

    preparePath($removePencils);
    preparePath(title);

    var tween6 = new TimelineMax()
        .to(title, 0.2, {visibility: 'visible'})
        .add(
            TweenMax.to($removePencils, duration, {stroke: "none", strokeDashoffset: 0, ease: Linear.easeNone})
           );

    scene6 = createDefaultScene("#part7", tween6)
        .addTo(controller);


    /* Eight animation */
    var $sampleSvgPaths7 = $($("#sample_svg #pic-8-second-cap")[0]).find("path"),
        $fillHat2White = $("#pic-8-second-cap .white-fill"),
        $fillHat2 = $("#pic-8-second-cap #hat-fill");
    preparePath($sampleSvgPaths7);
    preparePath($fillHat2White);
    preparePath($fillHat2);

    var tween7 = new TimelineMax()
        .add([
            TweenMax.to($fillHat2, 0.2, {fill: "#000000", strokeDashoffset: 0, ease: Linear.easeNone}),
            TweenMax.to($fillHat2White, 0.2, {fill: "#ffffff", strokeDashoffset: 0, ease: Linear.easeNone}),
            TweenMax.to($sampleSvgPaths7, duration, {stroke: "#000000", strokeDashoffset: 0, ease: Linear.easeNone})]);

    scene7 = createDefaultScene("#part8", tween7)
        .addTo(controller);


    /* Nineth animation */

    var $sampleSvgPaths8 = $($("#sample_svg #pic-9-tie")[0]).find("path"),
        $tiePartsPaths = $("#sample_svg .tie-part"),
        $mouseRemove = $($("#sample_svg #pic-3-mouse")[0]).find("path"),
        $hatRemove = $($("#sample_svg #pic-5-second-hat")[0]).find("path"),
        $capRemove = $($("#sample_svg #pic-8-second-cap")[0]).find("path");


    preparePath($sampleSvgPaths8);
    preparePath($tiePartsPaths);
    preparePath($mouseRemove);
    preparePath($hatRemove);
    preparePath($capRemove);

    var tween8 = new TimelineMax()
        .to([$tshortPaths1, $mouseRemove, $capRemove, $hatRemove], 0.2, {visibility: 'hidden'})
        .add([
            TweenMax.to($sampleSvgPaths8, duration, {stroke: "#000000", strokeDashoffset: 0, ease: Linear.easeNone}),
            TweenMax.to($tiePartsPaths, duration, {fill: "#000000", strokeDashoffset: 0, ease: Linear.easeNone})]);

    scene8 = createDefaultScene("#part9", tween8)
        .addTo(controller);
};


