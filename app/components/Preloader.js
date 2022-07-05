import Component from 'classes/Component';

import GSAP from 'gsap';
import each from 'lodash/each';

import { split } from 'utils/text';

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        text: '.preloader__text',
        number: '.preloader__number',
        numberText: '.preloader__number__text',
        images: document.querySelectorAll('img'),
      },
    });

    split({
      element: this.elements.text,
      expressions: '<br>',
    });
    split({
      element: this.elements.text,
      expressions: '<br>',
    });

    this.elements.titleSpans = this.elements.text.querySelectorAll('span span');

    this.length = 0;

    this.createLoader();
  }

  createLoader() {
    if (this.elements.images.length) {
      each(this.elements.images, (element) => {
        element.onload = () => this.onAssetLoaded(true);
        element.src = element.getAttribute('data-src');
      });
    } else {
      this.onAssetLoaded(false);
    }
  }

  onAssetLoaded(hasImages) {
    this.length += 1;

    const percent = hasImages ? this.length / this.elements.images.length : 1;

    this.elements.numberText.innerHTML = `${Math.round(percent * 100)}%`;

    if (percent === 1) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline();

      this.animateOut.from(this.elements.titleSpans, {
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        y: '100%',
      });

      this.animateOut.to(this.element, {
        delay: 0.5,
      });

      this.animateOut.to(this.elements.titleSpans, {
        autoAlpha: 0,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        y: '-100%',
      });

      this.animateOut.to(
        this.elements.numberText,
        {
          autoAlpha: 0,
          duration: 1.5,
          ease: 'expo.out',

          y: '-100%',
        },
        '-=1.3'
      );

      this.animateOut.to(
        this.element,
        {
          duration: 1.5,
          scaleX: 0,
          ease: 'expo.out',
          transformOrigin: '0 100%',
        },
        '-=1.3'
      );

      this.animateOut.call(() => {
        this.emit('completed');
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}
