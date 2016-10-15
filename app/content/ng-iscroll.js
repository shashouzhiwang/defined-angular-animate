/*!
Copyright (c) 2013 Brad Vernon <bradbury.vernon@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

angular.module('ng-iscroll', []).directive('ngIscroll', function ()
{
  return {
    replace: false,
    restrict: 'A',
    //scope:{
    //  pullDownActive:"&pullDownActive"
    //},
    link: function (scope, element, attr)
    {
      var pullDown = $(element).find('#pullDown');
      var pullUp = $(element).find('#pullUp');
      var pullDownHeight = pullDown.height();

      // default timeout
      var ngiScroll_timeout = 5;

      // default options
      var ngiScroll_opts = {
        vScrollbar:false,
        hScroll:false,
        fixedScrollbar:true,
        momentum:false,
        snap: false,
        hScrollbar: false,
        mouseWheel: true,
        click: false,
        tap: true,
        topOffset:pullDownHeight,
        onScrollMove: function(){
          //console.log(this.y);
          if(this.y > 5 && !pullDown.hasClass("flip")){
            pullDown.addClass("flip");
            //alert(pullDown.find('.pullDownLabel').length);
            pullDown.find('.pullDownLabel').html("释放加载。。。");
          }
          if(this.y < 5 && pullDown.hasClass('flip')){
            pullDown.removeClass("flip");
            pullDown.find('.pullDownLabel').html("下拉刷新...");
          }
          //console.log(this.maxScrollY - 5);
          if(this.y < (this.maxScrollY - 5) && !pullUp.hasClass('flip')){
            pullUp.addClass("flip");
            pullUp.find('.pullUpLabel').html("松手开始更新。。。");
          }
          if(this.y > (this.maxScrollY + 5) && pullUp.hasClass('flip')){
            pullUp.removeClass("flip");
            pullUp.find('.pullUpLabel').html("上拉加载更多。。。");
          }
        },
        onScrollEnd: function () {

          if (pullDown.hasClass('flip')) {
            pullDown.addClass('.loading');
            pullDown.find('.pullDownLabel').html("加载中...");
            scope.pullDownActive();
            //pullDownAction();
            //alert();
          }
          if (pullUp.hasClass('flip')) {
            pullUp.addClass('.loading');
            pullUp.find('.pullDownLabel').html("加载中...");
            //pullUpAction();
          }
        }
      };

      // scroll key /id
      var scroll_key = attr.ngIscroll;

      if (scroll_key === '') {
        scroll_key = attr.id;
      }

      if (scope.$parent.myScrollOptions) {
        for (var i in scope.$parent.myScrollOptions) {
          if(typeof(scope.$parent.myScrollOptions[i])!=="object"){
            ngiScroll_opts[i] = scope.$parent.myScrollOptions[i];
          } else if (i === scroll_key) {
            for (var k in scope.$parent.myScrollOptions[i]) {
              ngiScroll_opts[k] = scope.$parent.myScrollOptions[i][k];
            }
          }
        }
      }

      // iScroll initialize function
      function setScroll()
      {
        if (scope.$parent.myScroll === undefined) {
          scope.$parent.myScroll = [];
        }
        scope.$parent.myScroll[scroll_key] = new iScroll(element[0], ngiScroll_opts);
        console.log(scope.$parent.myScroll);
      }

      // new specific setting for setting timeout using: ng-iscroll-timeout='{val}'
      if (attr.ngIscrollDelay !== undefined) {
        ngiScroll_timeout = attr.ngIscrollDelay;
      }

      // watch for 'ng-iscroll' directive in html code
      scope.$watch(attr.ngIscroll, function ()
      {
        setTimeout(setScroll, ngiScroll_timeout);
      });

      // add ng-iscroll-refresher for watching dynamic content inside iscroll
      if(attr.ngIscrollRefresher !== undefined) {
        scope.$watch(attr.ngIscrollRefresher, function ()
        {
          if(scope.$parent.myScroll[scroll_key] !== undefined) scope.$parent.myScroll[scroll_key].refresh();
        });
      }

      // destroy the iscroll instance if we are moving away from a state to another
      // the DOM has changed and he only instance is not necessary any more
      scope.$on('$destroy', function () {
        scope.$parent.myScroll[scroll_key].destroy();
      });
    }
  };
});
