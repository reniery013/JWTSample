var myApp = angular.module('myApp', []);

myApp.controller('restrictedController', ['$scope', '$filter', '$http', '$window', function($scope, $filter, $http, $window) {
    
    $scope.username = '';
    $scope.password = '';
    $scope.token = '';
    $scope.restricted = true;
    $scope.message = '';
    
    $scope.getRestrictedMessage = function() {
        console.log($scope.username);

        if ($window.localStorage.token) {
            $http.get('http://localhost:3000/message', {
                headers: {'Authorization': 'Bearer ' + $window.localStorage.token}
            })
            .success(function (response) {
                console.log(response);
                $scope.message = response.message;
                $scope.token = response.token;
                $scope.restricted = false;

            })
            .error(function (data, status) {

                console.log(data);

            });
        }

    };

}]);
