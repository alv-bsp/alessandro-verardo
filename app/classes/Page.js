import GSAP from 'gsap';
import each from 'lodash/each';
import map from 'lodash/map';

import AsyncLoad from 'classes/AsyncLoad';

export default class Page {
  constructor({ element, elements, id }) {
    this.selector = element;
    this.selectorChildren = { ...elements, preloaders: '[data-src]' };
    this.id = id;
  }

  create() {
    this.element = document.querySelector(this.selector);
    this.elements = {};

    each(this.selectorChildren, (el, key) => {
      if (
        el instanceof window.HTMLElement ||
        el instanceof window.NodeList ||
        Array.isArray(el)
      ) {
        this.elements[key] = el;
      } else {
        this.elements[key] = document.querySelectorAll(el);

        if (this.elements[key].length === 0) {
          this.elements[key] = null;
        } else if (this.elements[key] === 1) {
          this.elements[key] = document.querySelector(el);
        }
      }
    });

    this.createPreloader();
  }

  createPreloader() {
    this.preloaders = map(this.elements.preloaders, (element) => {
      return new AsyncLoad({ element });
    });
  }

  show() {
    return new Promise((resolve) => {
      this.animationIn = GSAP.timeline();

      this.animationIn.fromTo(
        this.element,
        {
          autoAlpha: 0,
        },
        {
          autoAlpha: 1,
        }
      );

      this.animationIn.call(() => {
        resolve();
      });
    });
  }

  hide() {
    return new Promise((resolve) => {
      GSAP.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }
}
