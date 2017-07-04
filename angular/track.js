myApp.controller('trackController', ['$http', 'apiOne', '$scope', function($http, apiOne, $scope) {
    //.controller('DashboardController', DashboardController);


    //code for redirecting user to login view in case of logout
      $scope.prackrToken = Cookies.get('prackrAuth');
        apiOne.getCurrentUser($scope.prackrToken)
            .then(function successCallback(response) {
                console.log(response.data.status);
                token = Cookies.get('prackrAuth');
                if(response.data.status == 403){
                    /*$scope.logout();*/
                    if(token != null || token != '' || token != undefined){
                        Cookies.remove('prackrAuth');
                        window.location = 'login-view.html';
                    }
                }
            }, function errorCallback(response) {

    }); 

    //load all tickets
    $scope.loadMyTickets = function(userToken) {

        apiOne.getMyTickets(userToken)
            .then(function successCallback(response) {

                $scope.myTickets = response.data.data;
                console.log("ticket data" );
                console.log(response.data.data);
            }, function errorCallback(response) {

                console.log(response);

            });


    }

    $scope.prackrToken = Cookies.get('prackrAuth');
    console.log($scope.prackrToken);

    $scope.loadMyTickets($scope.prackrToken);

    $scope.loadCurrentUser = function() {

        $scope.prackrToken = Cookies.get('prackrAuth');
        console.log($scope.prackrToken);

        apiOne.getCurrentUser($scope.prackrToken)
            .then(function successCallback(response) {

                $scope.userData = response.data.data;
                console.log($scope.userData);
                console.log(response.data.status);
                console.log(response.status);

                $scope.agentNumber = $scope.userData.mobileNumber;
                
                console.log($scope.agentNumber);

                console.log(response);
            }, function errorCallback(response) {

                console.log(response);

            });

    }

    $scope.loadCurrentUser();

    $scope.logout = function() {
        Cookies.remove('prackrAuth');
        window.location = 'login-view.html';
    }
    

}]);
