console.log("dashboard.js");
myApp.controller('dashboardController', ['$http', 'apiOne', '$mdDialog', '$mdMedia', '$scope', '$mdToast', function($http, apiOne, $mdDialog, $mdMedia, $scope, $mdToast) {
    //.controller('DashboardController', DashboardController);

    /** @ngInject */
    //function DashboardController(api) {
    var vm = this;

    // Data


    
    
    //$scope.helloText = SampleData.data.helloText;
    $scope.helloText2 = 'Hello world!';
    $scope.ngDisabledValueForProgressBar = true;

    $scope.current = 40;
    $scope.max = 100;

    $scope.color = "{{ ($scope.current / $scope.max < 0.5) ? '#ff8080' : '#45ccce' }}"

    //var baseUrl = 'http://localhost:8888/api/v1/tickets/all'

    // Methods functionality
    $scope.searchField = [
            {name: "dashboard"},
            {name: "tickets"},
            {name: "call"},
            {name: "track"}
        ];

    $(document).ready(function(){
        $('.selectedPage').on('change',function(){
            console.log($scope);
            /*console.log($scope[selectedPage]);*/
            console.log($scope.selectedPage);
            window.location.href = '#/'+$scope.selectedPage.title;
        });


});


    $scope.mdIsLockedOpenTab = $mdMedia('gt-sm');
    $scope.bodyEl = angular.element('body');
        $scope.folded = false;
        $scope.msScrollOptions = {
            suppressScrollX: true
        };

        // Methods
        $scope.toggleMsNavigationFolded = toggleMsNavigationFolded;

        //////////

        /**
         * Toggle folded status
         */
        function toggleMsNavigationFolded()
        {
            $scope.mdIsLockedOpenTab = $mdMedia('gt-lg');

            console.log("in folded scope");
            $scope.folded = !$scope.folded;
            msNavigationService.toggleFolded();
        }
        // Close the mobile menu on $stateChangeSuccess
        $scope.$on('$stateChangeSuccess', function ()
        {
            $scope.bodyEl.removeClass('ms-navigation-horizontal-mobile-menu-active');
        });

        $scope.stateChangeSuccessEvent = $scope.$on('$stateChangeSuccess', function ()
        {
            $timeout(function ()
            {
                $scope.loadingProgress = false;
            });
        });
        

    $(document).ready(function(){
        $scope.readySplash = true;
        console.log($scope.readySplash );
    });

    $scope.logout = function() {
        console.log("hellooooo");
        Cookies.remove('prackrAuth');
        window.location = 'login-view.html';
    }

    $scope.loadCurrentUser = function() {

        $scope.prackrToken = Cookies.get('prackrAuth');
        console.log($scope.prackrToken);
        apiOne.getCurrentUser($scope.prackrToken)
            .then(function successCallback(response) {
                console.log(response);

                $scope.userData = response.data.data;
                console.log("response data")
                console.log(Cookies.get('prackrAuth'));
                console.log(response.data.status);
                token = Cookies.get('prackrAuth');
                if(response.data.status == 403){
                    /*$scope.logout();*/
                    if(token != null || token != '' || token != undefined){
                        Cookies.remove('prackrAuth');
                        window.location = 'login-view.html';
                    }
                    
                }
                $scope.userInfo = response.data;
                $scope.agentNumber = $scope.userData.mobileNumber;
                console.log($scope.agentNumber);
                $scope.userLoginTime = $scope.userData.sessionCreated;
                $scope.userLoginTime2 = $scope.userData.newTime;
                console.log("loginTime : " + $scope.userLoginTime);
                $scope.userLevelId = $scope.userData.levelId;

                if($scope.userLevelId == undefined || $scope.userLevelId == null || $scope.userLevelId == ''){

                } else{
                    $scope.getLevelPermission($scope.userLevelId);
                }

            }, function errorCallback(response) {

            });

    }


    $scope.loadCurrentUser();

    $scope.getLevelPermission = function(levelId){
        apiOne.getLevelPermission(levelId)
        .then(function successCallback(response) {
            var responseData = response.data.data;
            $scope.permissions = responseData.permissions;
            $scope.canUseWebAppPermission = $scope.permissions[0].value;
            $scope.canAddEditUsersPermission = $scope.permissions[1].value;
            $scope.canAddEditStaffFormsPermission = $scope.permissions[2].value;
            $scope.canAddEditCustomerFormsPermission = $scope.permissions[3].value;
            $scope.canAddEditTriggerFormsPermission = $scope.permissions[4].value;
            $scope.canAddEditAutomationPermission = $scope.permissions[5].value;
            $scope.canViewTicketsOnlyPermission = $scope.permissions[6].value;
            $scope.canViewTicketsFromCallsPermission = $scope.permissions[7].value;
            $scope.canTakeTicketsFromAtDeskPermission = $scope.permissions[8].value;
            $scope.canTakeTicketsFromSocialMediaPermission = $scope.permissions[9].value;
            $scope.canTakeTicketsFromMobileAppPermission = $scope.permissions[10].value;
            
            //not shown in view
            $scope.canEditPersonalDetailsPermission = $scope.permissions[11].value;
            
            $scope.canEditContactInfoPermission = $scope.permissions[12].value;
            $scope.canAccessInternalContactsOnlyPermission = $scope.permissions[13].value;
            $scope.canAccessExternalContactsOnlyPermission = $scope.permissions[14].value;
            $scope.canAddContactPermission = $scope.permissions[15].value;
            $scope.canEditContactPermission = $scope.permissions[16].value;
            $scope.canReadOnlyCampaignsPermission = $scope.permissions[17].value;
            $scope.canAddEditCampaignsPermission = $scope.permissions[18].value;
            $scope.canReadOnlyFAQTemplatePermission = $scope.permissions[19].value;
            $scope.canAddEditFAQTemplatePermission = $scope.permissions[20].value;
            $scope.canReadOnlyFilesPermission = $scope.permissions[21].value;
            $scope.canAddEditFilesPermission = $scope.permissions[22].value;
            $scope.canAccessReportPermission = $scope.permissions[23].value;

        }, function errorCallback(response) {

            console.log(response);

        });
    }


    
    //moment js for live time diffrence
    var datetime = null,
    date = null;
    var thn = $scope.userLoginTime2;
    

    var update = function () {

        date = (moment.utc(moment(new Date()).diff(moment($scope.userLoginTime,"YYYY-MM-DD HH:mm")))).subtract('330','m');
        datetime.html(date.format('HH:mm'));
    };

    $(document).ready(function(){
        datetime = $('#datetime')
        update();
        setInterval(update, 1000);
    });


    $scope.topDirections = ['left', 'up'];
    $scope.bottomDirections = ['down', 'right'];
    $scope.isOpen = false;
    $scope.availableModes = ['md-fling', 'md-scale'];
    $scope.selectedMode = 'md-scale';
    $scope.availableDirections = ['up', 'down', 'left', 'right'];
    $scope.selectedDirection = 'up';

    $scope.max = 1;
    $scope.selectedIndex = 0;
    $scope.nextTab = function() {
        var index = ($scope.selectedIndex == $scope.max) ? $mdDialog.cancel() : $scope.selectedIndex + 1;
        $scope.selectedIndex = index;
    };
    $scope.preTab = function() {
        var index = ($scope.selectedIndex == 0) ? 0 : $scope.selectedIndex - 1;
        $scope.selectedIndex = index;
    };

    //added for account Opening

    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    //for try
        //for try 1 
            $scope.tryDialogue1 = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
            console.log("in try dialogue");
            $mdDialog.show(
                {
                    controller: DialogController,
                    templateUrl: 'views/closed-tickets.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };
        //for try 2
            $scope.tryDialogue2 = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
            console.log("in try dialogue");
            $mdDialog.show(
                {
                    controller: DialogController,
                    templateUrl: 'views/level-view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };
        //for try 3
            $scope.tryDialogue3 = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
            console.log("in try dialogue");
            $mdDialog.show(
                {
                    controller: DialogController,
                    templateUrl: 'views/tasks-overlay-view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };
        //for try 4
            $scope.tryDialogue4 = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
            console.log("in try dialogue");
            $mdDialog.show(
                {
                    controller: DialogController,
                    templateUrl: 'views/team-view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };
        //for try 5
            $scope.tryDialogue5 = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
            console.log("in try dialogue");
            $mdDialog.show(
                {
                    controller: DialogController,
                    templateUrl: 'views/recurring-task-view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };
        //for try 6
            $scope.tryDialogue6 = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
            console.log("in try dialogue 6");
            $mdDialog.show(
                {
                    controller: DialogController,
                    templateUrl: 'views/manage-department-view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };
        //for try 7
            $scope.tryDialogue7 = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
            console.log("in try dialogue 7");
            $mdDialog.show(
                {
                    controller: DialogController,
                    templateUrl: 'views/manage-branch-view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };
        //for try 8
            $scope.tryDialogue8 = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
            console.log("in try dialogue 8");
            $mdDialog.show(
                {
                    controller: DialogController,
                    templateUrl: 'views/import-xls-view.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };





    //for create ticket

    $scope.selectTicketType = function(ev) {
        Cookies.set('type','atDesk');
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show(
            {
                controller: DialogController,
                templateUrl: 'views/new-ticket.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };


    //showing modal for outbound call
        $scope.showOutboundCallingIcon = function(ev) {
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'views/agent-outbound-call.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };


    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
    
    $scope.toggleAddTask = function() {
        $('.toggleDiv').toggle();
    }



    //showing toast on App API Click
    $scope.appApi = function(){
        $mdToast.show(
            $mdToast.simple()
            .textContent("Not Implemented Yet")
            .hideDelay(3000)
        );
    }
    //showing toast on Email API Click
    $scope.emailApi = function(){
        $mdToast.show(
            $mdToast.simple()
            .textContent("Not Implemented Yet")
            .hideDelay(3000)
        );
    }
    //showing toast on Social API Click
    $scope.socialApi = function(){
        $mdToast.show(
            $mdToast.simple()
            .textContent("Not Implemented Yet")
            .hideDelay(3000)
        );
    }
    //showing toast on Chat API Click
    $scope.chatApi = function(){
        $mdToast.show(
            $mdToast.simple()
            .textContent("Not Implemented Yet")
            .hideDelay(3000)
        );
    }

    //call controlling

    $scope.socketData = function(data) {

        Cookies.set('type','call');
        
        console.log(data);

        $scope.callerData = data;
        
        var callingAction = data.action;
        
        var callingPurpose = callingAction.split("_");

        var currentAgentNumber = data.agentNumber;

        console.log(currentAgentNumber);

        var callPurpose = callingPurpose[1];
        if(callingPurpose[2] != null || callingPurpose[2] != undefined){
            callPurpose += "_";
            callPurpose += callingPurpose[2];
        }

        if(callingPurpose[3] != null || callingPurpose[3] != undefined){
            callPurpose += "_";
            callPurpose += callingPurpose[3];
        }
            
            console.log(callPurpose);
            
            if(callPurpose == 'loan'){
            
                $scope.purposeForCalling = 'Loan Enquiry';
            
                $scope.callRespectiveAction = 'showLoanEnquiry($event)';
            
            }
             if(callPurpose == 'debit_lost_card'){
            
                $scope.purposeForCalling = 'Lost Debit Card';
            
                $scope.callRespectiveAction = 'lostCard($event)';
            
            }
             if(callPurpose == 'debit_new_card'){
            
                $scope.purposeForCalling = 'New Debit Card';
            
                $scope.callRespectiveAction = 'issueNewCard($event)';
            
            }
             if(callPurpose == 'Product'){
            
                $scope.purposeForCalling = 'Product Enquiry';
            
                $scope.callRespectiveAction = 'productEnquiry($event)';
            
            }
             if(callPurpose == 'Complaints'){
            
                $scope.purposeForCalling = 'Complaints and Suggestions';
            
                $scope.callRespectiveAction = 'complaints($event)';
            
            }

        if(currentAgentNumber == $scope.agentNumber){
            $(function() {
            
                $scope.openCallModal();
            });
        }

    }

    
    $scope.prackrToken = Cookies.get('prackrAuth');
    
    apiOne.getTicketByMonth($scope.prackrToken)
        .then(function successCallback(response) {
            
            $scope.myTickets = response.data.data;
            if($scope.myTickets == null){
               $scope.countDeskTicket = 0; 
            }
            else{
                $scope.countDeskTicket = $scope.myTickets.length;
                console.log($scope.countDeskTicket);
            }

        }, function errorCallback(response) {

            console.log(response);

        });
    apiOne.getCallByMonth($scope.prackrToken)
        .then(function successCallback(response) {
            console.log(response);
            $scope.myTickets = response.data.data;
            if($scope.myTickets == null){
               $scope.countCallTicket = 0; 
            }
            else{
                $scope.countCallTicket = $scope.myTickets.length;
                console.log($scope.countCallTicket);
                console.log($scope.countDeskTicket);
            }
            $scope.totalMonthTickets = Number($scope.countDeskTicket) + Number($scope.countCallTicket);
            console.log($scope.totalMonthTickets);
        }, function errorCallback(response) {

            console.log(response);

        });

    

    $scope.openCallModal = function(ev) {

        $scope.tenDigitNumber = $scope.callerData.customerNumber.replace("+91","");
        var numberData = {
            mobileNumber : $scope.tenDigitNumber
        }
        $scope.firstName = " ";
        $scope.arrayToSendToModal = [];
            apiOne.getCaller(numberData)
            .then(function successCallback(response) {
                
                console.log(response);
                    console.log(response.data.error);
                    console.log(response.data.data.customerName);
                    if(response.data.error == false || response.data.error == null ){
                        if(response.data.data.responseMessage == 'The given Mobile No is not registered'){
                            $scope.typeOfTicketIs = 'ticket';
                            $scope.customerInformation = $scope.callerData.customerNumber;
                            var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                            var firstNameDetails = {firstName : $scope.firstName};
                            var lastNameDetails = {lastName : $scope.lastName};
                            var addressDetails = {address : $scope.addressDetail};
                            $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                            $scope.arrayToSendToModal.push(firstNameDetails);
                            $scope.ticketIdCreated = "";
                            console.log($scope.arrayToSendToModal); 
                        }
                        else{
                            $scope.customerDetailsName = response.data.data.customerName;
                            $scope.nameArray = $scope.customerDetailsName.split(".");
                            console.log($scope.nameArray);
                            $scope.firstName = $scope.nameArray[0];
                            console.log($scope.firstName);
                            $scope.arrayToSendToModal = [];
                            $scope.typeOfTicketIs = 'ticket';
                            var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                            var firstNameDetails = {firstName : $scope.firstName};
                            $scope.customerInformation = $scope.firstName;
                            $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                            $scope.arrayToSendToModal.push(firstNameDetails);
                            $scope.ticketIdCreated = "";
                            console.log($scope.arrayToSendToModal);
                        }
                    }
                    else{
                        $scope.typeOfTicketIs = 'ticket';
                        $scope.customerInformation = $scope.callerData.customerNumber;
                        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                        var firstNameDetails = {firstName : $scope.firstName};
                        var lastNameDetails = {lastName : $scope.lastName};
                        var addressDetails = {address : $scope.addressDetail};
                        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                        $scope.arrayToSendToModal.push(firstNameDetails);
                        $scope.ticketIdCreated = "";
                        console.log($scope.arrayToSendToModal);
                    }

            }, function errorCallback(response) {
               
            });

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/outbound-call.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new()
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };
    

    $scope.showLeftSideBar = function(){
        $('#vertical-navigation').removeClass('md-closed ms-scroll ng-scope ng-isolate-scope _md ps-container ps-theme-default md-default-theme ng-animate md-locked-open-remove md-locked-open-remove-active');
    }


}]);
