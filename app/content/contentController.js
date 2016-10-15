/**
 * Created by Loki.Luo on 2016/9/3.
 */
angular
    .module('test')
    .controller('contentController',["$scope",contentController]);
    function contentController($scope){
        var vm = this;
        //$scope.isShow = false;
        $scope.student = ['Tom', 'Jack',"Alice",'May','Thomas'];
    }

angular
    .module('test')
    .animation('.fadeOut',function(){
        return {
            enter:function(){console.log(

                "element  enter"
            )},
            leave:function(){
                console.log(
                    "element  leave"
                )
            },
            move:function(){
                console.log(
                    "element  move"
                )
            },
            addClass:function(){
                console.log(

                    "element  addClass"
                )
                jQuery(element).animate({opacity:0},3000);
            },
            removeClass:function(){
                console.log(

                    "element  removeClass"
                )
                jQuery(element).animate({opacity:1},3000);
            }
        }
    })