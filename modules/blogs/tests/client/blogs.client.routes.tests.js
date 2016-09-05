(function () {
  'use strict';

  describe('Blogs Route Tests', function () {
    // Initialize global variables
    var $scope,
      BlogsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _BlogsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      BlogsService = _BlogsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('blogs');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/blogs');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          BlogsController,
          mockBlog;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('blogs.view');
          $templateCache.put('modules/blogs/client/views/view-blog.client.view.html', '');

          // create mock Blog
          mockBlog = new BlogsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Blog Name'
          });

          //Initialize Controller
          BlogsController = $controller('BlogsController as vm', {
            $scope: $scope,
            blogResolve: mockBlog
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:blogId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.blogResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            blogId: 1
          })).toEqual('/blogs/1');
        }));

        it('should attach an Blog to the controller scope', function () {
          expect($scope.vm.blog._id).toBe(mockBlog._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/blogs/client/views/view-blog.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          BlogsController,
          mockBlog;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('blogs.create');
          $templateCache.put('modules/blogs/client/views/form-blog.client.view.html', '');

          // create mock Blog
          mockBlog = new BlogsService();

          //Initialize Controller
          BlogsController = $controller('BlogsController as vm', {
            $scope: $scope,
            blogResolve: mockBlog
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.blogResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/blogs/create');
        }));

        it('should attach an Blog to the controller scope', function () {
          expect($scope.vm.blog._id).toBe(mockBlog._id);
          expect($scope.vm.blog._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/blogs/client/views/form-blog.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          BlogsController,
          mockBlog;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('blogs.edit');
          $templateCache.put('modules/blogs/client/views/form-blog.client.view.html', '');

          // create mock Blog
          mockBlog = new BlogsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Blog Name'
          });

          //Initialize Controller
          BlogsController = $controller('BlogsController as vm', {
            $scope: $scope,
            blogResolve: mockBlog
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:blogId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.blogResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            blogId: 1
          })).toEqual('/blogs/1/edit');
        }));

        it('should attach an Blog to the controller scope', function () {
          expect($scope.vm.blog._id).toBe(mockBlog._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/blogs/client/views/form-blog.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
