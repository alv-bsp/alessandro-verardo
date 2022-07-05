import Preloader from 'components/Preloader';

import Home from 'pages/Home';

import each from 'lodash/each';

class App {
  constructor() {
    this.createContent();

    this.createPreloader();
    this.createPages();

    this.addLinkListeners();
    this.addEventListeners();

    this.update();
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded.bind(this));
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  createPages() {
    this.pages = {
      home: new Home(),
    };

    this.page = this.pages[this.template];

    this.page.create();
  }

  onPreloaded() {
    this.onResize();

    this.preloader.destroy();

    this.page.show();
  }

  onPopState() {
    if (!this.popped) {
      this.onChange({
        url: window.location.pathname,
        push: false,
      });
    }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
    if (this.canvas) {
      this.canvas.onResize();
    }
  }

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }

    if (this.canvas && this.canvas.update) {
      this.canvas.update();
    }

    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  async onChange({ url, push = true }) {
    this.popped = push ? false : true;
    await this.page.hide();
    window.scrollTo(0, 0);
    const res = await window.fetch(url);

    if (res.status === 200) {
      const html = await res.text();

      const div = document.createElement('div');

      if (push) {
        window.history.pushState({}, '', url);
      }

      div.innerHTML = html;

      const divContent = div.querySelector('.content');
      this.content.innerHTML = divContent.innerHTML;

      this.template = divContent.getAttribute('data-template');
      this.content.setAttribute('data-template', this.template);

      this.navigation.onChange(this.template);

      this.page = this.pages[this.template];
      this.page.create();
      this.page.show();

      this.addEventListeners();
      this.addLinkListeners();
    } else {
      console.error(`response status: ${res.status}`);
    }
  }

  addEventListeners() {
    window.addEventListener('popstate', this.onPopState.bind(this));

    window.addEventListener('mousedown', this.onTouchDown.bind(this));
    window.addEventListener('touchstart', this.onTouchDown.bind(this));

    window.addEventListener('resize', this.onResize.bind(this));
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a');
    this.isRoot = location.pathname == '/';
    each(links, (link) => {
      let attrHref = link.getAttribute('href');
      const isScroll = link.href.indexOf('#') != -1;
      const isLocal = link.href.indexOf(window.location.origin) > -1;

      const isNotEmail = link.href.indexOf('mailto') === -1;
      const isNotPhone = link.href.indexOf('tel') === -1;
      if (isScroll && this.isRoot) {
        link.onclick = (event) => {
          attrHref = attrHref.replace('/', '');
          event.preventDefault();
          document.querySelector(attrHref).scrollIntoView({
            behavior: 'smooth',
          });
        };
      } else if (isScroll & !this.isRoot) {
        link.onclick = () => {
          // do nothing
        };
      } else if (isLocal & !isScroll) {
        link.onclick = (event) => {
          event.preventDefault();

          this.onChange({ url: link.href });
        };
      } else if (isNotEmail && isNotPhone && !isScroll) {
        link.rel = 'noopener';
        link.target = '_blank';
      }
    });
  }
}

new App();
