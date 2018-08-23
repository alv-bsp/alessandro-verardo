// Variables
let DOM = {};
DOM.svg = document.querySelector('.morph');
DOM.shapeEl = DOM.svg.querySelector('polygon');
DOM.contentElems = Array.from(
    document.querySelectorAll('.content-animated-bg')
);
DOM.footer = document.querySelector('.end');
DOM.bio = document.querySelector('#bio');
DOM.skillset = document.querySelector('#about');
DOM.skillbars = document.querySelectorAll('.skill-box .meter>span');
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
        tx: -360,
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
        scaleX: 0.8,
        scaleY: 0.8,
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
        rotate: 180,
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
        rotate: -180,
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
        rotate: 360,
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
    }
];
let contentElemsTotal = DOM.contentElems.length;
let firstLoad = true;
let triangleReady = false;
let step;

const initVariables = function () {
    DOM.svg = document.querySelector('.morph');
    DOM.shapeEl = DOM.svg.querySelector('polygon');
    DOM.contentElems = Array.from(
        document.querySelectorAll('.content-animated-bg')
    );
    DOM.footer = document.querySelector('.end');
    DOM.bio = document.querySelector('#bio');
    DOM.skillset = document.querySelector('#about');
    DOM.skillbars = document.querySelectorAll('.skill-box .meter>span');
    contentElemsTotal = DOM.contentElems.length;
}

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

    var doodleanim = bodymovin.loadAnimation({
        container: document.getElementById('doodle'),
        renderer: 'svg',
        path: 'doodle.json'
    })

    biowatcher.enterViewport(function () {
        if (!triangleReady) {
            console.log('distruggi');
            biowatcher.destroy();
            skillwatcher.destroy();
        } else {
            doodleanim.goToAndPlay(1, true);
            console.log('yeee');
        }
    });


    biowatcher.exitViewport(function () {
        doodleanim.goToAndPlay(1, true);
        console.log('noo');
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
            if (!triangleReady) {
                watcher.destroy();
                console.log('destroyed');
            } else {
                // console.log(pos);
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
            }
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

// Helpers

const scrollToTop = function () {
    anime.remove(document.documentElement, document.body);
    anime({
        targets: [document.documentElement, document.body],
        scrollTop: 0,
        duration: 200,
        easing: 'easeInOutQuad'
    });
}

const createPreloader = function () {
    anime({
        targets: '#svgLoader polygon',
        points: '64 104.9849546 8.574 104.9849546 35.4419879 59.1565245 64 8.984954583 92.3275224 59.1565245 119.426 104.9849546',
        easing: 'easeInOutExpo',
        loop: true,
        direction: 'alternate'
    });
}

const removePreloader = function () {
    // Remove page loader
    setTimeout(function () {
        document.querySelector('.is-loading').classList.add('is-transparent');
        anime.remove('#svgLoader polygon');
    }, 1000);
    setTimeout(function () {
        document.querySelector('.is-loading').classList.add('is-hidden');
    }, 1500);
    firstLoad = false;
}

// Page transitions

const FadeTransition = Barba.BaseTransition.extend({
    start: function () {
        Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
    },
    fadeOut: function () {
        return new Promise((resolve, reject) => {
            anime({
                targets: this.oldContainer,
                translateY: [0, 40],
                opacity: "0",
                easing: "easeInOutQuint",
                duration: 250,
                delay: function (el, index) {
                    return index * 50;
                }, complete: () => { resolve(); }
            });
        });
    },
    fadeIn: function () {

        scrollToTop();
        // Junk Dealing and Animation Start
        var _this = this;
        this.newContainer.style.visibility = 'visible';
        this.newContainer.style.opacity = 0;

        this.oldContainer.classList.add('is-hidden');
        anime.remove(this.oldContainer);
        anime({
            targets: this.newContainer,
            // translateY: [-40, 0],
            opacity: "1",
            easing: "easeInOutQuint",
            duration: 400,
            delay: function (el, index) {
                return index * 50;
            },
            complete: () => { _this.done(); }
        });
    }

});

const MediumTransition = Barba.BaseTransition.extend({
    start: function () {
        Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
    },
    fadeOut: function () {
        console.log('we in');

        return new Promise((resolve, reject) => {
            anime({
                targets: this.oldContainer,
                opacity: "0",
                rotate: 360,
                easing: "easeInOutQuint",
                duration: 250,
                delay: function (el, index) {
                    return index * 50;
                }, complete: () => { resolve(); }
            });
        });
    },
    fadeIn: function () {

        scrollToTop();

        // Junk Dealing and Animation Start
        var _this = this;
        this.newContainer.style.visibility = 'visible';
        this.newContainer.style.opacity = 0;

        this.oldContainer.classList.add('is-hidden');
        anime.remove(this.oldContainer);
        anime({
            targets: this.newContainer,
            rotate: 360,
            opacity: "1",
            easing: "easeInOutQuint",
            duration: 400,
            delay: function (el, index) {
                return index * 50;
            },
            complete: () => { _this.done(); }
        });
    }

});


Barba.Pjax.getTransition = function () {
    var prev = Barba.HistoryManager.prevStatus();
    var current = Barba.HistoryManager.currentStatus();


    console.log(prev.namespace);
    console.log(current.namespace);
    if (prev.namespace === 'project' && current.namespace === 'project') {
        return MediumTransition;
    }
    return FadeTransition;

};

// Views

var Homepage = Barba.BaseView.extend({
    namespace: 'homepage',
    onEnter: function () {
        // The new Container is ready and attached to the DOM.
        // Create page loader
        if (firstLoad) { createPreloader() };

    },
    onEnterCompleted: function () {
        // The Transition has just finished.

        // init all variables again
        triangleReady = true;
        initVariables();

        // Init background animations
        imagesLoaded(document.body, () => {
            initShapeEl();
            createScrollWatchers();
        });

        if (firstLoad) { removePreloader(); }

    },
    onLeave: function () {
        // A new Transition toward a new page has just started.
        console.log('exited');
        triangleReady = false;
    },
    onLeaveCompleted: function () {
        // The Container has just been removed from the DOM.
    }
});

var Project = Barba.BaseView.extend({
    namespace: 'project',
    onEnter: function () {
        // The new Container is ready and attached to the DOM.


    },
    onEnterCompleted: function () {
        // The Transition has just finished.

    },
    onLeave: function () {
        // A new Transition toward a new page has just started.

    },
    onLeaveCompleted: function () {
        // The Container has just been removed from the DOM.
    }
});

// Init

Homepage.init();
Project.init();

document.addEventListener("DOMContentLoaded", function () {
    Barba.Pjax.start();
});