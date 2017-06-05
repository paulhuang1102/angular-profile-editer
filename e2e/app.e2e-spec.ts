import { EditorPage } from './app.po';

describe('editor App', () => {
  let page: EditorPage;

  beforeEach(() => {
    page = new EditorPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
