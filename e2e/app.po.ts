export class MyappPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('myapp-app h1')).getText();
  }
}
