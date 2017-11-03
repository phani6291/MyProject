import { SchoFeatPage } from './app.po';

describe('scho-feat App', () => {
  let page: SchoFeatPage;

  beforeEach(() => {
    page = new SchoFeatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
