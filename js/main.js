{

    // Variables
    const DOM = {};
    DOM.svg = document.querySelector('.morph');
    DOM.shapeEl = DOM.svg.querySelector('polygon');
    DOM.contentElems = Array.from(
        document.querySelectorAll('.content-animated-bg')
    );
    DOM.footer = document.querySelector('.end');
    DOM.bio = document.querySelector('#bio');
    DOM.skillset = document.querySelector('#about');
    DOM.skillbars = document.querySelectorAll('.skill-box .meter>span');
    const contentElemsTotal = DOM.contentElems.length;
    const shapes = [
        {
            points:
                '700.5 38 1048 733 353 733',
            scaleX: 0.9,
            scaleY: 0.9,
            rotate: 0,
            tx: 0,
            ty: 0,
            loop: false,
            direction: 'alternate',
            fill: {
                color: 'none',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                points: {
                    duration: 500,
                    easing: 'easeOutExpo'
                },
                svg: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            }
        },
        {
            points:
                '700.5 38 1048 733 353 733',
            scaleX: 0.8,
            scaleY: 0.8,
            rotate: 180,
            tx: -300,
            ty: 100,
            loop: false,
            direction: 'alternate',
            fill: {
                color: 'none',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                points: {
                    duration: 500,
                    easing: 'easeOutExpo'
                },
                svg: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            }
        },
        {
            points:
                '700.5 38 1048 733 353 733',
            scaleX: 1,
            scaleY: 1,
            rotate: 360,
            tx: 250,
            ty: 20,
            loop: false,
            direction: 'alternate',
            fill: {
                color: 'none',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                points: {
                    duration: 500,
                    easing: 'easeOutExpo'
                },
                svg: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            }
        },
        {
            points:
                '700.5 38 1048 733 353 733',
            scaleX: 0.9,
            scaleY: 0.9,
            rotate: 540,
            tx: -200,
            ty: 0,
            loop: false,
            direction: 'alternate',
            fill: {
                color: 'none',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                points: {
                    duration: 500,
                    easing: 'easeOutExpo'
                },
                svg: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            }
        },
        {
            points:
                '700.5 12 43 733 53 733',
            scaleX: 0,
            scaleY: 0,
            rotate: 200,
            tx: 0,
            ty: 0,
            loop: false,
            direction: 'alternate',
            fill: {
                color: 'none',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                points: {
                    duration: 500,
                    easing: 'easeOutExpo'
                },
                svg: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            }
        },
        {
            points:
                '700.5 38 1048 733 353 733',
            scaleX: 0.6,
            scaleY: 0.6,
            rotate: 720,
            tx: 0,
            ty: -50,
            direction: 'alternate',
            fill: {
                color: 'none',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                points: {
                    duration: 5000,
                    easing: 'easeOutExpo'
                },
                svg: {
                    duration: 15000,
                    easing: 'easeOutExpo'
                }
            }
        },
        {
            points:
                '700.5 38 1048 733 353 733',
            scaleX: 0,
            scaleY: 0,
            rotate: 200,
            tx: 0,
            ty: 0,
            loop: false,
            direction: 'alternate',
            fill: {
                color: 'none',
                duration: 500,
                easing: 'linear'
            },
            animation: {
                points: {
                    duration: 500,
                    easing: 'easeOutExpo'
                },
                svg: {
                    duration: 1500,
                    easing: 'easeOutElastic'
                }
            }
        }
    ];
    let step;

    // Shape Init

    const initShapeEl = function () {
        anime.remove(DOM.svg);
        anime({
            targets: DOM.svg,
            duration: 1,
            easing: 'linear',
            loop: shapes[0].loop,
            direction: shapes[0].direction,
            scaleX: shapes[0].scaleX,
            scaleY: shapes[0].scaleY,
            translateX: shapes[0].tx + 'px',
            translateY: shapes[0].ty + 'px',
            rotate: shapes[0].rotate + 'deg'
        });
    };

    // Scroll Watchers

    const createScrollWatchers = function () {

        const biowatcher = scrollMonitor.create(DOM.bio);
        const skillwatcher = scrollMonitor.create(DOM.skillset, { top: -500 });

        biowatcher.enterViewport(function () {
            document.getElementById('alessandro-doodle').play();
        });

        biowatcher.exitViewport(function () {
            document.getElementById('alessandro-doodle').pause();
        });


        skillwatcher.enterViewport(function () {
            anime.remove(DOM.skillbars);
            anime({
                targets: DOM.skillbars,
                width: function (el) {
                    return el.getAttribute('data-percentage');
                },
                delay: function (el, i, l) {
                    return i * 100;
                }
            });
        });

        skillwatcher.exitViewport(function () {
            anime.remove(DOM.skillbars);
            anime({
                targets: DOM.skillbars,
                width: 0
            });
        });

        DOM.contentElems.forEach((el, pos) => {
            const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
            pos = pos ? pos : contentElemsTotal;
            const watcher = scrollMonitor.create(scrollElemToWatch, -350);

            watcher.enterViewport(function () {
                step = pos;
                anime.remove(DOM.shapeEl);
                anime({
                    targets: DOM.shapeEl,
                    duration: shapes[pos].animation.points.duration,
                    loop: shapes[pos].loop,
                    direction: shapes[pos].direction,
                    easing: shapes[pos].animation.points.easing,
                    elasticity: shapes[pos].animation.points.elasticity || 0,
                    points: shapes[pos].points,
                    fill: {
                        value: shapes[pos].fill.color,
                        duration: shapes[pos].fill.duration,
                        easing: shapes[pos].fill.easing
                    }
                });

                anime.remove(DOM.svg);
                anime({
                    targets: DOM.svg,
                    duration: shapes[pos].animation.svg.duration,
                    loop: shapes[pos].loop,
                    direction: shapes[pos].direction,
                    easing: shapes[pos].animation.svg.easing,
                    elasticity: shapes[pos].animation.svg.elasticity || 0,
                    scaleX: shapes[pos].scaleX,
                    scaleY: shapes[pos].scaleY,
                    translateX: shapes[pos].tx + 'px',
                    translateY: shapes[pos].ty + 'px',
                    rotate: shapes[pos].rotate + 'deg'
                });
            });

            watcher.exitViewport(function () {
                const idx = !watcher.isAboveViewport ? pos - 1 : pos + 1;

                if (idx <= contentElemsTotal && step !== idx) {
                    step = idx;
                    anime.remove(DOM.shapeEl);
                    anime({
                        targets: DOM.shapeEl,
                        duration: shapes[idx].animation.points.duration,
                        loop: shapes[pos].loop,
                        direction: shapes[pos].direction,
                        easing: shapes[idx].animation.points.easing,
                        elasticity:
                            shapes[idx].animation.points.elasticity || 0,
                        points: shapes[idx].points,
                        fill: {
                            value: shapes[idx].fill.color,
                            duration: shapes[idx].fill.duration,
                            easing: shapes[idx].fill.easing
                        }
                    });

                    anime.remove(DOM.svg);
                    anime({
                        targets: DOM.svg,
                        duration: shapes[idx].animation.svg.duration,
                        loop: shapes[pos].loop,
                        direction: shapes[pos].direction,
                        easing: shapes[idx].animation.svg.easing,
                        elasticity: shapes[idx].animation.svg.elasticity || 0,
                        scaleX: shapes[idx].scaleX,
                        scaleY: shapes[idx].scaleY,
                        translateX: shapes[idx].tx + 'px',
                        translateY: shapes[idx].ty + 'px',
                        rotate: shapes[idx].rotate + 'deg'
                    });
                }
            });

        });
    };

    // Initialization

    const init = function () {
        var svgAttributes = anime({
            targets: '#svgLoader polygon',
            points: '64 104.9849546 8.574 104.9849546 35.4419879 59.1565245 64 8.984954583 92.3275224 59.1565245 119.426 104.9849546',
            easing: 'easeInOutExpo',
            loop: true,
            direction: 'alternate'
        });
        imagesLoaded(document.body, () => {
            initShapeEl();
            createScrollWatchers();
            // Remove page loader
            setTimeout(function () {
                document.querySelector('.is-loading').classList.add('is-transparent');
                anime.remove('#svgLoader polygon');
            }, 1000);
            setTimeout(function () {
                document.querySelector('.is-loading').classList.add('is-hidden');
            }, 1500);
        });
    };

    init();
}
