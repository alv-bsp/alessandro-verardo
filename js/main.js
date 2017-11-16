{
    // Helper vars and functions.
    const extend = function(a, b) {
        for (let key in b) {
            if (b.hasOwnProperty(key)) {
                a[key] = b[key];
            }
        }
        return a;
    };

    // from http://www.quirksmode.org/js/events_properties.html#position
    const getMousePos = function(ev) {
        let posx = 0;
        let posy = 0;
        if (!ev) ev = window.event;
        if (ev.pageX || ev.pageY) {
            posx = ev.pageX;
            posy = ev.pageY;
        } else if (ev.clientX || ev.clientY) {
            posx =
                ev.clientX +
                document.body.scrollLeft +
                document.documentElement.scrollLeft;
            posy =
                ev.clientY +
                document.body.scrollTop +
                document.documentElement.scrollTop;
        }
        return { x: posx, y: posy };
    };

    const TiltObj = function(el, options) {
        this.el = el;
        this.options = extend({}, this.options);
        extend(this.options, options);
        this.DOM = {};
        this.DOM.img = this.el.querySelector('.content__img');
        this.DOM.title = this.el.querySelector('.content__title');
        this._initEvents();
    };

    TiltObj.prototype.options = {
        movement: {
            img: { translation: { x: -40, y: -40 } },
            title: { translation: { x: 20, y: 20 } }
        }
    };

    TiltObj.prototype._initEvents = function() {
        this.mouseenterFn = ev => {
            anime.remove(this.DOM.img);
            anime.remove(this.DOM.title);
        };

        this.mousemoveFn = ev => {
            requestAnimationFrame(() => this._layout(ev));
        };

        this.mouseleaveFn = ev => {
            requestAnimationFrame(() => {
                anime({
                    targets: [this.DOM.img, this.DOM.title],
                    duration: 1500,
                    easing: 'easeOutElastic',
                    elasticity: 400,
                    translateX: 0,
                    translateY: 0
                });
            });
        };

        this.el.addEventListener('mousemove', this.mousemoveFn);
        this.el.addEventListener('mouseleave', this.mouseleaveFn);
        this.el.addEventListener('mouseenter', this.mouseenterFn);
    };

    TiltObj.prototype._layout = function(ev) {
        // Mouse position relative to the document.
        const mousepos = getMousePos(ev);
        // Document scrolls.
        const docScrolls = {
            left:
                document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        };
        const bounds = this.el.getBoundingClientRect();
        // Mouse position relative to the main element (this.DOM.el).
        const relmousepos = {
            x: mousepos.x - bounds.left - docScrolls.left,
            y: mousepos.y - bounds.top - docScrolls.top
        };

        // Movement settings for the animatable elements.
        const t = {
            img: this.options.movement.img.translation,
            title: this.options.movement.title.translation
        };

        const transforms = {
            img: {
                x:
                    (-1 * t.img.x - t.img.x) / bounds.width * relmousepos.x +
                    t.img.x,
                y:
                    (-1 * t.img.y - t.img.y) / bounds.height * relmousepos.y +
                    t.img.y
            },
            title: {
                x:
                    (-1 * t.title.x - t.title.x) /
                        bounds.width *
                        relmousepos.x +
                    t.title.x,
                y:
                    (-1 * t.title.y - t.title.y) /
                        bounds.height *
                        relmousepos.y +
                    t.title.y
            }
        };
        this.DOM.img.style.WebkitTransform = this.DOM.img.style.transform =
            'translateX(' +
            transforms.img.x +
            'px) translateY(' +
            transforms.img.y +
            'px)';
        this.DOM.title.style.WebkitTransform = this.DOM.title.style.transform =
            'translateX(' +
            transforms.title.x +
            'px) translateY(' +
            transforms.title.y +
            'px)';
    };

    const DOM = {};
    DOM.svg = document.querySelector('.morph');
    DOM.shapeEl = DOM.svg.querySelector('polygon');
    DOM.contentElems = Array.from(
        document.querySelectorAll('.content-animated-bg')
    );
    DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
    DOM.footer = document.querySelector('.end');
    const contentElemsTotal = DOM.contentElems.length;
    const shapes = [
        {
            points:
                '700,84.4 1047.1,685.6 352.9,685.6 352.9,685.6 352.9,685.6 352.9,685.6',
            scaleX: 0.8,
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
                '700,84.4 1047.1,685.6 352.9,685.6 352.9,685.6 352.9,685.6 352.9,685.6',
            scaleX: 0.8,
            scaleY: 0.9,
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
                '983.4,101.6 779,385 983.4,668.4 416.6,668.4 611,388 416.6,101.9',
            scaleX: 1,
            scaleY: 1,
            rotate: -45,
            tx: 150,
            ty: -50,
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
                '700,84.4 1047.1,685.6 352.9,685.6 352.9,685.6 352.9,685.6 352.9,685.6',
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
                '700,84.4 1047.1,685.6 352.9,685.6 352.9,685.6 352.9,685.6 352.9,685.6',
            scaleX: 0.55,
            scaleY: 0.6,
            rotate: 3600,
            tx: 0,
            ty: -50,
            loop: true,
            direction: 'alternate',
            fill: {
                color: 'none',
                duration: 50000,
                easing: 'linear'
            },
            animation: {
                points: {
                    duration: 50000,
                    easing: 'easeOutExpo'
                },
                svg: {
                    duration: 150000,
                    easing: 'easeOutExpo'
                }
            }
        },
        {
            points:
                '700,84.4 1047.1,685.6 352.9,685.6 352.9,685.6 352.9,685.6 352.9,685.6',
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

    const initShapeEl = function() {
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

    const createScrollWatchers = function() {
        DOM.contentElems.forEach((el, pos) => {
            const scrollElemToWatch = pos ? DOM.contentElems[pos] : DOM.footer;
            pos = pos ? pos : contentElemsTotal;
            const watcher = scrollMonitor.create(scrollElemToWatch, -350);

            watcher.enterViewport(function() {
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

            watcher.exitViewport(function() {
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

    var bodyEl = document.body,
        docElem = window.document.documentElement,
        win = { width: window.innerWidth, height: window.innerHeight },
        parallaxbg = document.querySelector('.parallax-bg__back--mover'),
        biocontainer = document.querySelector('#aboutbio');

    // from http://www.sberry.me/articles/javascript-event-throttling-debouncing
    function throttle(fn, delay) {
        var allowSample = true;

        return function(e) {
            if (allowSample) {
                allowSample = false;
                setTimeout(function() {
                    allowSample = true;
                }, delay);
                fn(e);
            }
        };
    }

    biocontainer.addEventListener(
        'mousemove',
        throttle(function(ev) {
            var xVal = -1 / (win.height / 2) * ev.clientY + 1,
                yVal = 1 / (win.width / 2) * ev.clientX - 1,
                transX = 20 / win.width * ev.clientX - 10,
                transY = 20 / win.height * ev.clientY - 10,
                transZ = 100 / win.height * ev.clientY - 50;
            console.log('LUL');
            parallaxbg.style.WebkitTransform =
                'perspective(1000px) translate3d(' +
                transX +
                'px,' +
                transY +
                'px,' +
                transZ +
                'px) rotate3d(' +
                xVal +
                ',' +
                yVal +
                ',0,2deg)';
            parallaxbg.style.transform =
                'perspective(1000px) translate3d(' +
                transX +
                'px,' +
                transY +
                'px,' +
                transZ +
                'px) rotate3d(' +
                xVal +
                ',' +
                yVal +
                ',0,2deg)';
        }, 100)
    );

    const init = function() {
        imagesLoaded(document.body, () => {
            initShapeEl();
            createScrollWatchers();
            Array.from(document.querySelectorAll('.content--layout')).forEach(
                el => new TiltObj(el)
            );
            // Remove loading class from body
            document.body.classList.remove('loading');
        });
    };

    init();
}
