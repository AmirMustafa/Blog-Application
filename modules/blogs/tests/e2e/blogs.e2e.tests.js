'use strict';

describe('Blogs E2E Tests:', function () {
  describe('Test Blogs page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/blogs');
      expect(element.all(by.repeater('blog in blogs')).count()).toEqual(0);
    });
  });
});
