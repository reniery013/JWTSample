var myApp = angular.module('myApp', []);

myApp.controller('mainController', ['$scope', '$filter', '$http', '$window', function($scope, $filter, $http, $window) {
    
    $scope.username = '';
    $scope.password = '';
    $scope.token = '';
    
    $scope.login = function() {
        console.log($scope.username);

        $http.post('http://localhost:3000/login', { username: $scope.username })
            .success(function (response) {
                console.log(response);
                $window.localStorage.token = response.token;
                $scope.token = response.token;

            })
            .error(function (data, status) {

                console.log(data);

            });


    };
    
}]);
