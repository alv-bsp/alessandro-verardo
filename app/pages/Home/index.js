import Page from 'classes/Page';


export default class Home extends Page {
  constructor() {
    super({
      id: 'homepage',
      element: '.homepage',
      elements: {
        wrapper: '.homepage .page__wrapper',
      },
    });
  }

  create() {
    super.create();
  }
}
