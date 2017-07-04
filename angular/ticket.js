console.log("ticket.js");
myApp.controller('ticketController', ['$http', 'apiOne', '$mdDialog', '$mdMedia', '$scope', '$mdToast', '$timeout', '$q', '$log','FileUploader','$route','$interval', function($http, apiOne, $mdDialog, $mdMedia, $scope, $mdToast, $timeout, $q, $log,FileUploader,$route,$interval) {
    //.controller('dashboardController', dashboardController);

    /** @ngInject */
    //function dashboardController(api) {
    /*var $scope = $scope;*/

    //get ticket id for passing in add tasks
    

    // setting default type of ticket at atDesk


    //code for redirecting user to login view in case of logout
      $scope.prackrToken = Cookies.get('prackrAuth');
        apiOne.getCurrentUser($scope.prackrToken)
            .then(function successCallback(response) {
                $scope.presentUserName = response.data.data.userName;
                token = Cookies.get('prackrAuth');
                if(response.data.status == 403){
                    /*$scope.logout();*/
                    if(token != null || token != '' || token != undefined){
                        Cookies.remove('prackrAuth');
                        window.location = 'login-view.html';
                    }
                    
                    /*Cookies.set('prackrAuth','nothing');
                }
                if(Cookies.get('prackrAuth') == 'nothing'){
                    Cookies.remove('prackrAuth');
                    if(window.location != 'login-view.html'){
                        window.location = 'login-view.html'
                    }*/
                           
                }
            }, function errorCallback(response) {

                console.log(response);

    }); 
  

    $scope.setTicketId = function(ticketId){
        console.log(Cookies.get('selectedTicketId'));
        if(Cookies.get('selectedTicketId') == '' || Cookies.get('selectedTicketId') == null || Cookies.get('selectedTicketId') == undefined){
            Cookies.set('selectedTicketId', ticketId);
            console.log("Cookies.get('selectedTicketId')");
            console.log(Cookies.get('selectedTicketId'));
        }
        else{
            Cookies.remove('selectedTicketId');
            console.log("Cookies");
            console.log(Cookies.get('selectedTicketId'));
        }
    }



    /*$scope.getTicketId = function(){
        console.log("ticketId");
        console.log($scope.ticketId);
        return $scope.ticketId;
    }*/

    

   /* console.log("checkbox");
    console.log($scope.checkBoxValue);*/
    // Data
    //$scope.helloText = SampleData.data.helloText;
    $scope.token = Cookies.get('prackrAuth');
    var uploader = $scope.uploader = new FileUploader({

        url: 'http://testapi.prackr.com/tickets/upload/file?myToken='+$scope.token
    });


    // FILTERS
    $scope.completeFilesIdsArray = [];
    $scope.ticketIdArray = [];

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/ , options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/ , filter, options) {
        
        console.log('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        
        console.log('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        
        console.log('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        
        console.log('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        
        console.log('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        
        console.log('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        
        console.log("onSuccessItem");
        console.log(response);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        
        console.log("onErrorItem");
        console.log(response);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        
        console.log("onCancelItem");
        console.log(response);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        
        console.log("onCompleteItem");
        console.log(response);
        $scope.completeFilesIdsArray.push(response.data._id);
    };
    uploader.onCompleteAll = function() {
        
        console.log("onCompleteAll");
        

        var data = {
               attachmentIds: $scope.completeFilesIdsArray,
           };

        apiOne.sendTicketAttachment(data)
            .then(function successCallback(response) {
                $scope.fileName = response.data.data;

            }, function errorCallback(response) {

                console.log(response);

            });


    };

    //Priority List
    $scope.priorityList = [
        {priorityName : "Low"},
        {priorityName : "Medium"},
        {priorityName : "High"},
        {priorityName : "Urgent"}
    ];



    //Complaints Type
    $scope.complaintsType = [
        {complaint : "ATM Issues"},
        {complaint : "IMPS Issues"},
        {complaint : "Complaint on Staff"},
        {complaint : "Fund Transfer Issues"},
    ];


    //Product Interested in

    $scope.productInterested = [
        {productName : "Bank Charges"},
        {productName : "Rate of interest"},
        {productName : "Fund transfer via RTGS & NEFT"},
        {productName : "Direct Benefit transfer"},
        {productName : "Cash transactions post 7.30PM"},
    ];

    //Reason for Loan
    $scope.reasonsForLoan = [
        {reason : "Agriculture Allied Activities Loan"},
        {reason : "Agriculture Allied Business loan"},
        {reason : "Agriculture Gold Loan"},
        {reason : "Business Gold Loan"},
        {reason : "Business Loan"},
        {reason : "Consumption Loan"},
        {reason : "Dhanya Laxmi Key loan"},
        {reason : "Education Loan"},
        {reason : "Gruha Vaibhava Loan"},
        {reason : "Mortgage Loans"},
        {reason : "Overdraft/Cash Credit Loans"},
        {reason : "Prime Gold Loan"},
        {reason : "Small Scale Industries loans"},
        {reason : "Site Purchase Loan"},
        {reason : "Suco Business Loan (Gold as security)"},
        {reason : "Used/pre-owned Vehicles 3 & 4 wheelers up to Rs.5 lakhs"},
        {reason : "Vehicle Loan up to Rs.2 lakhs"},
        {reason : "Vehicle loan more than Rs. 2lakhs, 4 wheelers"},
        {reason : "BILL/HUNDI DISCOUNTS"},
        {reason : "Cheque Discount( Govt Cheques and DDs)"},
        {reason : "Temporary Overdrawing"},
        {reason : "Loan on Fixed Deposit & Loan on Rd"},
    ];


    //annual income declaration
    $scope.annualIncome = [
        {incomeRange : "below 1 lakh annually"},
        {incomeRange : "above 1 lakh annually"},
        {incomeRange : "above 5 lakh annually"},
        {incomeRange : "above 10 lakh annually"},
        {incomeRange : "above 15 lakh annually"},
        {incomeRange : "above 20 lakh annually"},
        {incomeRange : "above 50 lakh annually"},
        {incomeRange : "above 1 crore annually"}
    ];


    //occupation declaration

    $scope.occupationData=[
        {occupationName : "Air Force"},
        {occupationName : "Business Person"},
        {occupationName : "Camera Man"},
        {occupationName : "Charity / Social Work"},
        {occupationName : "Chartered Accountant"},
        {occupationName : "College / University Teacher"},
        {occupationName : "Diplomat"},
        {occupationName : "Doctor"},
        {occupationName : "Engineer"},
        {occupationName : "Film Producer"},
        {occupationName : "Government Service"},
        {occupationName : "House Wife"},
        {occupationName : "Journalist"},
        {occupationName : "Labour"},
        {occupationName : "Lawyer"},
        {occupationName : "Media"},
        {occupationName : "Military"},
        {occupationName : "Missionary"},
        {occupationName : "Navy"},
        {occupationName : "News Broadcaster"},
        {occupationName : "Official"},
        {occupationName : "Others"},
        {occupationName : "Police"},
        {occupationName : "Press"},
        {occupationName : "Private Service"},
        {occupationName : "Publisher"},
        {occupationName : "Reporter"},
        {occupationName : "Researcher"},
        {occupationName : "Retired"},
        {occupationName : "Sea Man"},
        {occupationName : "Self-Employed / Freelancer"},
        {occupationName : "Student"},
        {occupationName : "Trader"},
        {occupationName : "TV Producer"},
        {occupationName : "Unemployed"},
        {occupationName : "UN Official"},
        {occupationName : "Worker"},
        {occupationName : "Writer"},
    ];

    //branch declaration

    $scope.branch_old=[
        {branchName : "Sindhanur"},
        {branchName : "Gangavathi"},
        {branchName : "Raichur"},
        {branchName : "Raichur Vasavi Nagar"},
        {branchName : "Koppa"},
        {branchName : "Bellary"},
        {branchName : "Bellary Royal circle"},
        {branchName : "Hospet"},
        {branchName : "Hubli"},
        {branchName : "Siruguppa"},
        {branchName : "Lingasur"},
        {branchName : "YADGIRI"},
        {branchName : "KESHWAPUR"},
        {branchName : "CHITRADURGA"},
        {branchName : "CHALLAKERE"},
        {branchName : "MANVI"},
        {branchName : "DHARWAD"},
        {branchName : "SHAHAPUR"}
    ];


    $scope.getAllBranch = function(){
        apiOne.getAllBranches()
        .then(function successCallback(response) {
            $scope.branch = response.data.data;

        }, function errorCallback(response) {

            console.log(response);

        });
    }
    $scope.getAllBranch();

    $scope.getAllDepartment = function(){
        apiOne.getAllDepartment()
        .then(function successCallback(response) {
            $scope.department = response.data.data;

        }, function errorCallback(response) {

            console.log(response);

        });
    }
    $scope.getAllDepartment();


    //account type declaration


    $scope.accountType = [
            {name: "CURRENT ACCOUNTS"},
            {name: "SAVING ACCOUNTS"},
            {name: "RECURRING DEPOSITS / ACCOUNTS"},
            {name: "FIXED DEPOSITS / ACCOUNTS"}
        ];

        // type of tickets

    $scope.typeOfTicket = [
        {ticketName : "Account Opening", ticketId : "BkH0YQqal"},
        {ticketName : "Loan Enquiry", ticketId : "Sy4ecmcTx"},
        {ticketName : "Product Enquiry", ticketId : "HJ_-9mqpx"},
        {ticketName : "complaints", ticketId : "BkDf9m56x"},
        {ticketName : "Issue New Card", ticketId : "rJHX5X96x"},
        {ticketName : "Lost Card", ticketId : "SyTm9X9px"}
    ];



    $scope.logout = function() {
        Cookies.remove('prackrAuth');
        window.location = 'login-view.html';
    }
    $scope.helloText2 = 'Hello world!';
    $scope.navbarDisplayParameter = 0;
    $scope.myTickets = [];
    $scope.allCities = [];
    //var baseUrl = 'http://localhost:8888/api/v1/tickets/all'
    console.log("executing jquery");

    $("#cityName").val("My City");

    console.log("executing jquery after");

    var options2 = {
        url: function(phrase) {
            console.log("length is shorter");
            if (phrase.length >= 2) {
                console.log("length is greater");
                return "http://testapi.prackr.com/states/search/cities?q=" + phrase;
            }
        },
        getValue: function(element) {
            console.log(" lenght is smaller ");
            return element.cityName;
        },
        template: {
            type: "description",
            fields: {
                description: function(element) {
                    return element.cityName;
                }
            }
        },
        list: {
            onClickEvent: function() {
                console.log("clicked");
                var singleCity = $("#cityName").getSelectedItemData();
                console.log(singleCity);
                $scope.foundCities = [singleCity];
                console.log($scope.foundCities.length);
                $scope.$apply();
            }
        },
        theme: "square"
    };
    $("#cityName").easyAutocomplete(options2);

    // CALCULATING DATE FROM GST FORMAT TO LOCAL FORMAT
    $scope.calculateDate = function(timeInGst) {
            var myDate = new Date(timeInGst);
            $scope.originalDate = myDate.toLocaleString();
            return $scope.originalDate;
        }
        // CALCULATING TIME FROM SECONDS TO MINUTE:SECONDS
    $scope.calculateTimeDuration = function(timeDuration) {
        $scope.minute = Math.floor(timeDuration / 60);
        $scope.seconds = Math.floor(timeDuration % 60);
        return $scope.minute + ":" + $scope.seconds;
    }

    //Toggle the add task section
    $scope.toggleAddTask = function() {
        $('.toggleDiv').toggle();
    }

    //get all call details
    $scope.getCallDetails = function(userToken) {
        apiOne.getCallLogs(userToken)
            .then(function successCallback(response) {
                $scope.callDetails = response.data.data;
                console.log($scope.callDetails);
                console.log("$scope.callDetails");

                console.log($scope.callDetails);

            }, function errorCallback(response) {

                console.log(response);

            });


    }

    //calling getCallDetails to get all tickets
    $scope.prackrToken = Cookies.get('prackrAuth');
    console.log($scope.prackrToken);

    $scope.getCallDetails($scope.prackrToken);






    //load all tickets
    $scope.loadMyTickets = function(userToken) {

            apiOne.getMyDeskTickets(userToken)
                .then(function successCallback(response) {

                    $scope.myTickets = response.data.data;
                    console.log($scope.myTickets);
                    
                }, function errorCallback(response) {

                    console.log(response);

                });


        }
        //calling loadMyTickets to get all tickets
    $scope.loadMyTickets($scope.prackrToken);


    $scope.sideBarDisplay = function(value) {
        $scope.navbarDisplayParameter = value;
        console.log($scope.navbarDisplayParameter);
    }
    $scope.loadCurrentUser = function() {

        $scope.prackrToken = Cookies.get('prackrAuth');
        var userToken = $scope.prackrToken

        apiOne.getCurrentUser($scope.prackrToken)
            .then(function successCallback(response) {

                $scope.userData = response.data.data;

                $scope.agentNumber = $scope.userData.mobileNumber;
                
                console.log($scope.agentNumber);

                $scope.loadMyTickets(userToken);
            }, function errorCallback(response) {

                console.log(response);

            });

    }

    $scope.loadCurrentUser();

    $scope.getParameterByName = function(name) {
            name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
            var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
                results = regex.exec(location.search);
            return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
        } // end get parameters

    $scope.viewSingleTicket = function() {

        $scope.ticketId = $scope.getParameterByName('ticketId');

        apiOne.getSingleTicket($scope.ticketId)
            .then(function successCallback(response) {

                $scope.singleTicket = response.data.data
            }, function errorCallback(response) {

                console.log(response);

            });

    }


    //added for next functionality in tab


    $scope.max = 1;
    $scope.selectedIndex = 0;
    $scope.nextTab = function() {
        if($scope.allowNextTab == 1){
            var index = ($scope.selectedIndex == $scope.max) ? $mdDialog.cancel() : $scope.selectedIndex + 1;
            $scope.selectedIndex = index;
        }
    };
    $scope.preTab = function() {
        var index = ($scope.selectedIndex == 0) ? 0 : $scope.selectedIndex - 1;
        $scope.selectedIndex = index;
    };

    //added for account Opening

    $scope.status = '  ';
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');


    //for create ticket

    $scope.selectTicketType = function(ev) {
        Cookies.set('type','atDesk');
        console.log("select function");
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/new-ticket.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new(),
                locals: {
                          typeOfTicketIs: $scope.typeOfTicketIs
                        },
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
                    fullscreen: useFullScreen,
                    scope: $scope.$new(),
                    locals: {
                          typeOfTicketIs: $scope.typeOfTicketIs
                        },
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });

        };



    //switch from loan enquiry to account opening
    $scope.openAccountOpening= function(ev){
        $mdDialog.cancel();
        $scope.showAccountOpening(ev);
    }


    //switch from account opening to loan enquiry
    $scope.openLoanEnquiry= function(ev){
        $mdDialog.cancel();
        $scope.showLoanEnquiry(ev);
    }

    $scope.init = function(){
        console.log($scope.typeOfTicketIs);
        $scope.firstName = $scope.typeOfTicketIs[1].firstName;
        $scope.lastName = $scope.typeOfTicketIs[2].lastName;
        $scope.address = $scope.typeOfTicketIs[3].address;
    }


    //showing account opening
    $scope.showAccountOpening = function(ev) {
        $scope.firstName = " ";
        $scope.lastName = " ";
        $scope.addressDetail = " ";
        $scope.arrayToSendToModal = [];
        console.log($scope.callerData);
        if($scope.callerData == '' || $scope.callerData == null || $scope.callerData == undefined){
            console.log("not data");
            $scope.functionAccountOpening(ev);
        }
        else{
            $scope.tenDigitNumber = $scope.callerData.customerNumber.replace("+91","");
            var numberData = {
                mobileNumber : $scope.tenDigitNumber
            }
            apiOne.getCaller(numberData)
            .then(function successCallback(response) {
                console.log(response);
                console.log(response.data.error);
                console.log(response.data.data.customerName);
                if(response.data.error == false || response.data.error == null ){
                    if(response.data.data.responseMessage == 'The given Mobile No is not registered'){
                        console.log("in response message");
                    }
                    else{
                        $scope.customerDetailsName = response.data.data.customerName;
                        $scope.nameArray = $scope.customerDetailsName.split(".");
                        console.log($scope.nameArray);
                        $scope.firstName = $scope.nameArray[0];
                        console.log($scope.firstName);
                        $scope.lastName = $scope.nameArray[1];
                        console.log($scope.lastName);
                        $scope.addressDetail = response.data.data.custAddress;
                        console.log($scope.addressDetail);
                        console.log($scope);
                        $scope.arrayToSendToModal = [];
                        $scope.typeOfTicketIs = 'ticket';
                        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                        var firstNameDetails = {firstName : $scope.firstName};
                        var lastNameDetails = {lastName : $scope.lastName};
                        var addressDetails = {address : $scope.addressDetail};
                        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                        $scope.arrayToSendToModal.push(firstNameDetails);
                        $scope.arrayToSendToModal.push(lastNameDetails);
                        $scope.arrayToSendToModal.push(addressDetails);
                        $scope.ticketIdCreated = "";
                        console.log($scope.arrayToSendToModal);
                        $scope.functionAccountOpening(ev);
                    }
                }
                else{
                    $scope.typeOfTicketIs = 'ticket';
                    var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                    var firstNameDetails = {firstName : $scope.firstName};
                    var lastNameDetails = {lastName : $scope.lastName};
                    var addressDetails = {address : $scope.addressDetail};
                    $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                    $scope.arrayToSendToModal.push(firstNameDetails);
                    $scope.arrayToSendToModal.push(lastNameDetails);
                    $scope.arrayToSendToModal.push(addressDetails);
                    $scope.ticketIdCreated = "";
                    console.log($scope.arrayToSendToModal);
                    $scope.functionAccountOpening(ev);
                }
                 
            }, function errorCallback(response) {

            });
        }
        

        /*$scope.arrayToSendToModal = [];
        $scope.typeOfTicketIs = 'ticket';
        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
        var firstNameDetails = {firstName : $scope.firstName};
        var lastNameDetails = {lastName : $scope.lastName};
        var addressDetails = {address : $scope.addressDetail};
        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
        $scope.arrayToSendToModal.push(firstNameDetails);
        $scope.arrayToSendToModal.push(lastNameDetails);
        $scope.arrayToSendToModal.push(addressDetails);
        $scope.ticketIdCreated = "";
        console.log($scope.arrayToSendToModal);*/
        
        /*           
            $scope.$watch(function() {
              return $mdMedia('xs') || $mdMedia('sm');
            }, function(wantsFullScreen) {
              $scope.customFullscreen = (wantsFullScreen === true);
            });
        */
    };
    $scope.functionAccountOpening = function(ev){
        $mdDialog.cancel();
        $scope.tyticketTypee = "accountOpening";
        $scope.typeName = "accountOpening";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/accountOpening.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                  typeOfTicketIs:  $scope.arrayToSendToModal
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    // For Loan ENquiry Modal
    
    $scope.showLoanEnquiry = function(ev) {
        $scope.firstName = " ";
        $scope.lastName = " ";
        $scope.addressDetail = " ";
        $scope.arrayToSendToModal = [];
        console.log($scope.callerData);
        if($scope.callerData == '' || $scope.callerData == null || $scope.callerData == undefined){
            console.log("not data");
            $scope.functionLoanEnquiry(ev);
        }
        else{
            $scope.tenDigitNumber = $scope.callerData.customerNumber.replace("+91","");
            var numberData = {
                mobileNumber : $scope.tenDigitNumber
            }
            apiOne.getCaller(numberData)
            .then(function successCallback(response) {
                console.log(response);
                console.log(response.data.error);
                console.log(response.data.data.customerName);
                if(response.data.error == false || response.data.error == null ){
                    if(response.data.data.responseMessage == 'The given Mobile No is not registered'){
                        $scope.typeOfTicketIs = 'ticket';
                        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                        var firstNameDetails = {firstName : $scope.firstName};
                        var lastNameDetails = {lastName : $scope.lastName};
                        var addressDetails = {address : $scope.addressDetail};
                        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                        $scope.arrayToSendToModal.push(firstNameDetails);
                        $scope.arrayToSendToModal.push(lastNameDetails);
                        $scope.arrayToSendToModal.push(addressDetails);
                        $scope.ticketIdCreated = "";
                        console.log($scope.arrayToSendToModal);
                        $scope.functionLoanEnquiry(ev);
                    }
                    else{
                        $scope.customerDetailsName = response.data.data.customerName;
                        $scope.nameArray = $scope.customerDetailsName.split(".");
                        console.log($scope.nameArray);
                        $scope.firstName = $scope.nameArray[0];
                        console.log($scope.firstName);
                        $scope.lastName = $scope.nameArray[1];
                        console.log($scope.lastName);
                        $scope.addressDetail = response.data.data.custAddress;
                        console.log($scope.addressDetail);
                        console.log($scope);
                        $scope.typeOfTicketIs = 'ticket';
                        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                        var firstNameDetails = {firstName : $scope.firstName};
                        var lastNameDetails = {lastName : $scope.lastName};
                        var addressDetails = {address : $scope.addressDetail};
                        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                        $scope.arrayToSendToModal.push(firstNameDetails);
                        $scope.arrayToSendToModal.push(lastNameDetails);
                        $scope.arrayToSendToModal.push(addressDetails);
                        $scope.ticketIdCreated = "";
                        console.log($scope.arrayToSendToModal);
                        $scope.functionLoanEnquiry(ev);
                    }
                }
                else{
                    /*$scope.typeOfTicketIs = 'ticket';
                    var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                    var firstNameDetails = {firstName : $scope.firstName};
                    var lastNameDetails = {lastName : $scope.lastName};
                    var addressDetails = {address : $scope.addressDetail};
                    $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                    $scope.arrayToSendToModal.push(firstNameDetails);
                    $scope.arrayToSendToModal.push(lastNameDetails);
                    $scope.arrayToSendToModal.push(addressDetails);
                    $scope.ticketIdCreated = "";
                    console.log($scope.arrayToSendToModal);
                    $scope.functionLoanEnquiry(ev);*/
                }
                

            }, function errorCallback(response) {

            });
        }   

    }
    $scope.functionLoanEnquiry = function(ev){
        $mdDialog.cancel();
        $scope.ticketType = "loanEnquiry";
        $scope.typeName = "loanEnquiry";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        console.log($scope.arrayToSendToModal);
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/loanEnquiry.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                  typeOfTicketIs: $scope.arrayToSendToModal
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        }

    // For Product Enquiry Modal
    $scope.productEnquiry = function(ev) {
        $scope.firstName = " ";
        $scope.lastName = " ";
        $scope.addressDetail = " ";
        $scope.arrayToSendToModal = [];
        console.log($scope.callerData);
        if($scope.callerData == '' || $scope.callerData == null || $scope.callerData == undefined){
            console.log("not data");
            $scope.functionProductEnquiry(ev);
        }
        else{
            $scope.tenDigitNumber = $scope.callerData.customerNumber.replace("+91","");
            var numberData = {
                mobileNumber : $scope.tenDigitNumber
            }
            apiOne.getCaller(numberData)
            .then(function successCallback(response) {
                console.log(response);
                console.log(response.data.error);
                console.log(response.data.data.customerName);
                if(response.data.error == false || response.data.error == null ){
                    if(response.data.data.responseMessage == 'The given Mobile No is not registered'){
                        console.log("in response message");
                    }
                    else{
                        $scope.customerDetailsName = response.data.data.customerName;
                        $scope.nameArray = $scope.customerDetailsName.split(".");
                        console.log($scope.nameArray);
                        $scope.firstName = $scope.nameArray[0];
                        console.log($scope.firstName);
                        $scope.lastName = $scope.nameArray[1];
                        console.log($scope.lastName);
                        $scope.addressDetail = response.data.data.custAddress;
                        console.log($scope.addressDetail);
                        console.log($scope);
                        $scope.arrayToSendToModal = [];
                        $scope.typeOfTicketIs = 'ticket';
                        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                        var firstNameDetails = {firstName : $scope.firstName};
                        var lastNameDetails = {lastName : $scope.lastName};
                        var addressDetails = {address : $scope.addressDetail};
                        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                        $scope.arrayToSendToModal.push(firstNameDetails);
                        $scope.arrayToSendToModal.push(lastNameDetails);
                        $scope.arrayToSendToModal.push(addressDetails);
                        $scope.ticketIdCreated = "";
                        console.log($scope.arrayToSendToModal);
                        $scope.functionProductEnquiry(ev);
                    }
                }
                else{
                    $scope.typeOfTicketIs = 'ticket';
                    var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                    var firstNameDetails = {firstName : $scope.firstName};
                    var lastNameDetails = {lastName : $scope.lastName};
                    var addressDetails = {address : $scope.addressDetail};
                    $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                    $scope.arrayToSendToModal.push(firstNameDetails);
                    $scope.arrayToSendToModal.push(lastNameDetails);
                    $scope.arrayToSendToModal.push(addressDetails);
                    $scope.ticketIdCreated = "";
                    console.log($scope.arrayToSendToModal);
                    $scope.functionProductEnquiry(ev);
                }
                

            }, function errorCallback(response) {

            });
        }
        

        /*$scope.arrayToSendToModal = [];
        $scope.typeOfTicketIs = 'ticket';
        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
        var firstNameDetails = {firstName : $scope.firstName};
        var lastNameDetails = {lastName : $scope.lastName};
        var addressDetails = {address : $scope.addressDetail};
        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
        $scope.arrayToSendToModal.push(firstNameDetails);
        $scope.arrayToSendToModal.push(lastNameDetails);
        $scope.arrayToSendToModal.push(addressDetails);
        $scope.ticketIdCreated = "";
        console.log($scope.arrayToSendToModal);*/
        

    };
    $scope.functionProductEnquiry = function(ev){
        $mdDialog.cancel();
        $scope.ticketType = "productEnquiry";
        $scope.typeName = "productEnquiry";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/productEnquiry.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                  typeOfTicketIs:  $scope.arrayToSendToModal
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    }
    // For Complaints & Suggestions Modal
    $scope.complaints = function(ev) {
        $scope.firstName = " ";
        $scope.lastName = " ";
        $scope.addressDetail = " ";
        $scope.arrayToSendToModal = [];
        console.log($scope.callerData);
        if($scope.callerData == '' || $scope.callerData == null || $scope.callerData == undefined){
            console.log("not data");
            $scope.functionComplaints(ev);
        }
        else{
            $scope.tenDigitNumber = $scope.callerData.customerNumber.replace("+91","");
            var numberData = {
                mobileNumber : $scope.tenDigitNumber
            }
            apiOne.getCaller(numberData)
            .then(function successCallback(response) {
                console.log(response);
                console.log(response.data.error);
                console.log(response.data.data.customerName);
                if(response.data.error == false || response.data.error == null ){
                    if(response.data.data.responseMessage == 'The given Mobile No is not registered'){
                        console.log("in response message");
                    }
                    else{
                        $scope.customerDetailsName = response.data.data.customerName;
                        $scope.nameArray = $scope.customerDetailsName.split(".");
                        console.log($scope.nameArray);
                        $scope.firstName = $scope.nameArray[0];
                        console.log($scope.firstName);
                        $scope.lastName = $scope.nameArray[1];
                        console.log($scope.lastName);
                        $scope.addressDetail = response.data.data.custAddress;
                        console.log($scope.addressDetail);
                        console.log($scope);
                        $scope.arrayToSendToModal = [];
                        $scope.typeOfTicketIs = 'ticket';
                        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                        var firstNameDetails = {firstName : $scope.firstName};
                        var lastNameDetails = {lastName : $scope.lastName};
                        var addressDetails = {address : $scope.addressDetail};
                        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                        $scope.arrayToSendToModal.push(firstNameDetails);
                        $scope.arrayToSendToModal.push(lastNameDetails);
                        $scope.arrayToSendToModal.push(addressDetails);
                        $scope.ticketIdCreated = "";
                        console.log($scope.arrayToSendToModal);
                        $scope.functionComplaints(ev);
                    }
                }
                else{
                    $scope.typeOfTicketIs = 'ticket';
                    var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                    var firstNameDetails = {firstName : $scope.firstName};
                    var lastNameDetails = {lastName : $scope.lastName};
                    var addressDetails = {address : $scope.addressDetail};
                    $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                    $scope.arrayToSendToModal.push(firstNameDetails);
                    $scope.arrayToSendToModal.push(lastNameDetails);
                    $scope.arrayToSendToModal.push(addressDetails);
                    $scope.ticketIdCreated = "";
                    console.log($scope.arrayToSendToModal);
                    $scope.functionComplaints(ev);
                }
                

            }, function errorCallback(response) {

            });
        }
        

        /*$scope.arrayToSendToModal = [];
        $scope.typeOfTicketIs = 'ticket';
        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
        var firstNameDetails = {firstName : $scope.firstName};
        var lastNameDetails = {lastName : $scope.lastName};
        var addressDetails = {address : $scope.addressDetail};
        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
        $scope.arrayToSendToModal.push(firstNameDetails);
        $scope.arrayToSendToModal.push(lastNameDetails);
        $scope.arrayToSendToModal.push(addressDetails);
        $scope.ticketIdCreated = "";
        console.log($scope.arrayToSendToModal);*/
        

    };
    $scope.functionComplaints = function(ev){
        $mdDialog.cancel();
        $scope.ticketType = "complaints";
        $scope.typeName = "complaints";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/complaints.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                  typeOfTicketIs:  $scope.arrayToSendToModal
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    }
    // For Issue New Card Modal
    $scope.issueNewCard = function(ev) {
        $scope.firstName = " ";
        $scope.lastName = " ";
        $scope.addressDetail = " ";
        $scope.arrayToSendToModal = [];
        console.log($scope.callerData);
        if($scope.callerData == '' || $scope.callerData == null || $scope.callerData == undefined){
            console.log("not data");
            $scope.functionIssueNewCard(ev);
        }
        else{
            $scope.tenDigitNumber = $scope.callerData.customerNumber.replace("+91","");
            var numberData = {
                mobileNumber : $scope.tenDigitNumber
            }
            apiOne.getCaller(numberData)
            .then(function successCallback(response) {
                console.log(response);
                console.log(response.data.error);
                console.log(response.data.data.customerName);
                if(response.data.error == false || response.data.error == null ){
                    if(response.data.data.responseMessage == 'The given Mobile No is not registered'){
                        console.log("in response message");
                    }
                    else{
                        $scope.customerDetailsName = response.data.data.customerName;
                        $scope.nameArray = $scope.customerDetailsName.split(".");
                        console.log($scope.nameArray);
                        $scope.firstName = $scope.nameArray[0];
                        console.log($scope.firstName);
                        $scope.lastName = $scope.nameArray[1];
                        console.log($scope.lastName);
                        $scope.addressDetail = response.data.data.custAddress;
                        console.log($scope.addressDetail);
                        console.log($scope);
                        $scope.arrayToSendToModal = [];
                        $scope.typeOfTicketIs = 'ticket';
                        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                        var firstNameDetails = {firstName : $scope.firstName};
                        var lastNameDetails = {lastName : $scope.lastName};
                        var addressDetails = {address : $scope.addressDetail};
                        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                        $scope.arrayToSendToModal.push(firstNameDetails);
                        $scope.arrayToSendToModal.push(lastNameDetails);
                        $scope.arrayToSendToModal.push(addressDetails);
                        $scope.ticketIdCreated = "";
                        console.log($scope.arrayToSendToModal);
                        $scope.functionIssueNewCard(ev);
                    }
                }
                else{
                    $scope.typeOfTicketIs = 'ticket';
                    var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                    var firstNameDetails = {firstName : $scope.firstName};
                    var lastNameDetails = {lastName : $scope.lastName};
                    var addressDetails = {address : $scope.addressDetail};
                    $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                    $scope.arrayToSendToModal.push(firstNameDetails);
                    $scope.arrayToSendToModal.push(lastNameDetails);
                    $scope.arrayToSendToModal.push(addressDetails);
                    $scope.ticketIdCreated = "";
                    console.log($scope.arrayToSendToModal);
                    $scope.functionIssueNewCard(ev);
                }
                

            }, function errorCallback(response) {

            });
        }
        

        /*$scope.arrayToSendToModal = [];
        $scope.typeOfTicketIs = 'ticket';
        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
        var firstNameDetails = {firstName : $scope.firstName};
        var lastNameDetails = {lastName : $scope.lastName};
        var addressDetails = {address : $scope.addressDetail};
        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
        $scope.arrayToSendToModal.push(firstNameDetails);
        $scope.arrayToSendToModal.push(lastNameDetails);
        $scope.arrayToSendToModal.push(addressDetails);
        $scope.ticketIdCreated = "";
        console.log($scope.arrayToSendToModal);*/
        

    };
    $scope.functionIssueNewCard  = function(ev){
        $mdDialog.cancel();
        $scope.ticketType = "issueNewCard";
        $scope.typeName = "issueNewCard";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/newCard.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                  typeOfTicketIs:  $scope.arrayToSendToModal
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    }
    // For Issue New Card Modal
    $scope.lostCard = function(ev) {
        $scope.firstName = " ";
        $scope.lastName = " ";
        $scope.addressDetail = " ";
        $scope.arrayToSendToModal = [];
        console.log($scope.callerData);
        if($scope.callerData == '' || $scope.callerData == null || $scope.callerData == undefined){
            console.log("not data");
            $scope.functionLostCard(ev);
        }
        else{
            $scope.tenDigitNumber = $scope.callerData.customerNumber.replace("+91","");
            var numberData = {
                mobileNumber : $scope.tenDigitNumber
            }
            apiOne.getCaller(numberData)
            .then(function successCallback(response) {
                console.log(response);
                console.log(response.data.error);
                console.log(response.data.data.customerName);
                if(response.data.error == false || response.data.error == null ){
                    if(response.data.data.responseMessage == 'The given Mobile No is not registered'){
                        console.log("in response message");
                    }
                    else{
                        $scope.customerDetailsName = response.data.data.customerName;
                        $scope.nameArray = $scope.customerDetailsName.split(".");
                        console.log($scope.nameArray);
                        $scope.firstName = $scope.nameArray[0];
                        console.log($scope.firstName);
                        $scope.lastName = $scope.nameArray[1];
                        console.log($scope.lastName);
                        $scope.addressDetail = response.data.data.custAddress;
                        console.log($scope.addressDetail);
                        console.log($scope);
                        $scope.arrayToSendToModal = [];
                        $scope.typeOfTicketIs = 'ticket';
                        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                        var firstNameDetails = {firstName : $scope.firstName};
                        var lastNameDetails = {lastName : $scope.lastName};
                        var addressDetails = {address : $scope.addressDetail};
                        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                        $scope.arrayToSendToModal.push(firstNameDetails);
                        $scope.arrayToSendToModal.push(lastNameDetails);
                        $scope.arrayToSendToModal.push(addressDetails);
                        $scope.ticketIdCreated = "";
                        console.log($scope.arrayToSendToModal);
                        $scope.functionLostCard(ev);
                    }
                }
                else{
                    $scope.typeOfTicketIs = 'ticket';
                    var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                    var firstNameDetails = {firstName : $scope.firstName};
                    var lastNameDetails = {lastName : $scope.lastName};
                    var addressDetails = {address : $scope.addressDetail};
                    $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                    $scope.arrayToSendToModal.push(firstNameDetails);
                    $scope.arrayToSendToModal.push(lastNameDetails);
                    $scope.arrayToSendToModal.push(addressDetails);
                    $scope.ticketIdCreated = "";
                    console.log($scope.arrayToSendToModal);
                    $scope.functionLostCard(ev);
                }
                

            }, function errorCallback(response) {

            });
        }
        

        
        /*$scope.typeOfTicketIs = 'ticket';
        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
        var firstNameDetails = {firstName : $scope.firstName};
        var lastNameDetails = {lastName : $scope.lastName};
        var addressDetails = {address : $scope.addressDetail};
        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
        $scope.arrayToSendToModal.push(firstNameDetails);
        $scope.arrayToSendToModal.push(lastNameDetails);
        $scope.arrayToSendToModal.push(addressDetails);
        $scope.ticketIdCreated = "";
        console.log($scope.arrayToSendToModal);
        console.log($scope.arrayToSendToModal);*/
        

    };
    $scope.functionLostCard = function(ev){
        $mdDialog.cancel();
        $scope.ticketType = "lostCard";
        $scope.typeName = "lostCard";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/lostCard.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                  typeOfTicketIs:  $scope.arrayToSendToModal
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    }

    function DialogController($scope, $mdDialog,typeOfTicketIs) {
        $scope.typeOfTicketIs = typeOfTicketIs;
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
            $scope.ticketIdCreated == "" 
            Cookies.remove('numberSet');
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
    $scope.getCustomerDetails = function(){
        var numberData = {
                mobileNumber : $scope.mobileNumber
            }
            apiOne.getCaller(numberData)
            .then(function successCallback(response) {
                console.log(response);
                console.log(response.data.error);
                console.log(response.data.data.customerName);
                if(response.data.error == false || response.data.error == null ){
                    if(response.data.data.responseMessage == 'The given Mobile No is not registered'){
                        /*$scope.firstName = 'Shweta';
                        $scope.lastName = 'Sharma';
                        $scope.address = 'Alwar';*/
                    }
                    else{
                        $scope.customerDetailsName = response.data.data.customerName;
                        $scope.nameArray = $scope.customerDetailsName.split(".");
                        $scope.firstName = $scope.nameArray[0];
                        $scope.lastName = $scope.nameArray[1];
                        $scope.address = response.data.data.custAddress;
                        
                    }
                }
                else{
                    
                    
                }
                

            }, function errorCallback(response) {

            });
    }
    $scope.accountOpeningData = function() {
        console.log($scope.selectedCity);
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == ""){
        
            if($scope.mobileNumber == "" || $scope.mobileNumber == undefined || $scope.mobileNumber == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Mobile Number Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.firstName == "" || $scope.firstName == undefined || $scope.firstName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("First Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.lastName == "" || $scope.lastName == undefined || $scope.lastName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedCity.title == "" || $scope.selectedCity.title == undefined || $scope.selectedCity.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("City Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedOccupation.title == "" || $scope.selectedOccupation.title == undefined || $scope.selectedOccupation.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Occupation Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedBranch.title == "" || $scope.selectedBranch.title == undefined || $scope.selectedBranch.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Occupation Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedAccount.title == "" || $scope.selectedAccount.title == undefined || $scope.selectedAccount.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Occupation Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            
            else{
               $scope.allowNextTab = 1;
               $scope.nextTab();
               console.log($scope.selectedBranch);
            var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
            var firstName = { attribute: "firstName", value: $scope.firstName };
            var lastName = { attribute: "lastName", value: $scope.lastName };
            var city = { attribute: "city", value: $scope.selectedCity.title };
            var address = { attribute: "address", value: $scope.address };
            var occupation = { attribute: "occupation", value: $scope.selectedOccupation.title };
            var branch = { attribute: "branch", value: $scope.selectedBranch.originalObject.branchId};
            var accountType = { attribute: "accountType", value: $scope.selectedAccount.title };
            var callBackTime = { attribute: "callBackTime", value: $scope.hours+':'+$scope.minutes + ' '+$scope.timeSelector};

            var arr = [];
            arr.push(mobileNumber);
            arr.push(firstName);
            arr.push(lastName);
            arr.push(city);
            arr.push(address);
            arr.push(occupation);
            arr.push(branch);
            arr.push(accountType);
            arr.push(callBackTime);

            console.log(arr);

            var userData = arr;
            var typeOfTicket = Cookies.get('type');
                var myData = {

                    name: "Account Opening",
                    ticketData: angular.toJson(userData),
                    typeName: "accountOpening",
                    type : typeOfTicket

                }
            console.log(myData);

            var prackrToken = Cookies.get('prackrAuth');
            console.log(prackrToken);

            apiOne.createSingleTicket(myData, prackrToken)
                .then(function successCallback(response) {
                    if(response.status == 200){
                         $mdToast.show(
                            $mdToast.simple()
                            .textContent("Ticket created successfully")
                            .hideDelay(3000)
                        );
                    $scope.myTickets.push(response.data.data);
                    $route.reload();
                    console.log($scope.myTickets);
                    }
                    var callLogType = Cookies.get('type');
                    if(callLogType == 'call'){
                        $scope.ticketIdForCallLog = response.data.data.ticketId;
                        console.log($scope.ticketIdForCallLog);
                        /*added on 27/may*/
                         $scope.myData1 = {
                            ticketId : response.data.data.ticketId,
                            typeName : myData.name
                        };
                         apiOne.addAudioToTicket(myData1, prackrToken)
                        .then(function successCallback(response) {
                                console.log(response);

                        }, function errorCallback(response) {

                            console.log(response);

                        });


                         /*addition end*/
                    }

                    console.log("$scope is the response");
                    console.log(response.data.data);
                    $scope.ticketIdCreated = response.data.data.ticketId;
                    
                    $scope.accountOpeningText ="Thank you for calling SUCO BANK , your ticket ID is "+$scope.ticketIdCreated+", You can track your Account Opening status at https://prac.kr .Your account will be opened within 48 hours.";


                }, function errorCallback(response) {

                    console.log(response);

                });
            }
        }
    }
    $scope.sendAccountOpeningMessage = function(){
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == "" ){
            $mdToast.show(
            $mdToast.simple()
            .textContent("sms not send")
            .hideDelay(3000)
        );
        }
        else{
            console.log("in sending sms");
            var prackrToken = Cookies.get('prackrAuth');
            var myData = {
                number: $scope.mobileNumber,
                message: $scope.accountOpeningText
            };
            apiOne.sendSmsToUser(prackrToken, myData)
                .then(function successCallback(response) {

                    console.log("in sms success");
                    console.log(response.data.data);
                    //window.location = 'ticket-view?ticketId='+$scope.ticketId
                }, function errorCallback(response) {

                    console.log(response);

                });
        }
    }
    $scope.loanEnquiryData = function() {
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == ""){
            if($scope.mobileNumber == "" || $scope.mobileNumber == undefined || $scope.mobileNumber == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Mobile Number Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.firstName == "" || $scope.firstName == undefined || $scope.firstName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("First Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.lastName == "" || $scope.lastName == undefined || $scope.lastName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedCity.title == "" || $scope.selectedCity.title == undefined || $scope.selectedCity.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("City Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedOccupation.title == "" || $scope.selectedOccupation.title == undefined || $scope.selectedOccupation.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Occupation Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedAnnualIncome.title == "" || $scope.selectedAnnualIncome.title == undefined || $scope.selectedAnnualIncome.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Annual Income Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedReasonForLoan.title == "" || $scope.selectedReasonForLoan.title == undefined || $scope.selectedReasonForLoan.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Reason for loan Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.loanAmount == "" || $scope.loanAmount == undefined || $scope.loanAmount == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Loan amount Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.emiCapacity == "" || $scope.emiCapacity == undefined || $scope.emiCapacity == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("EMI capacity not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else{
                $scope.allowNextTab = 1;
                $scope.nextTab();
                var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
                var firstName = { attribute: "firstName", value: $scope.firstName };
                var lastName = { attribute: "lastName", value: $scope.lastName };
                var city = { attribute: "city", value: $scope.selectedCity.title };
                var address = { attribute: "address", value: $scope.address };
                var occupation = { attribute: "occupation", value: $scope.selectedOccupation.title };
                var annualIncome = { attribute: "annualIncome", value: $scope.selectedAnnualIncome.title };
                var reasonForLoan = { attribute: "reasonForLoan", value: $scope.selectedReasonForLoan.title };
                var loanAmount = { attribute: "loanAmount", value: $scope.loanAmount };
                var emiCapacity = { attribute: "emiCapacity", value: $scope.emiCapacity };
                var callBackTime = { attribute: "callBackTime", value: $scope.hours+':'+$scope.minutes + ' '+$scope.timeSelector };

                var arr = [];
                arr.push(mobileNumber);
                arr.push(firstName);
                arr.push(lastName);
                arr.push(city);
                arr.push(address);
                arr.push(occupation);
                arr.push(annualIncome);
                arr.push(reasonForLoan);
                arr.push(loanAmount);
                arr.push(emiCapacity);
                arr.push(callBackTime);

                var userData = arr;
                var typeOfTicket = Cookies.get('type');
                var myData = {

                    name: "Loan Enquiry",
                    ticketData: angular.toJson(userData),
                    typeName: "loanEnquiry",
                    type : typeOfTicket

                }

                console.log(myData);
                Cookies.remove('type');

                var prackrToken = Cookies.get('prackrAuth');
                console.log(prackrToken);

                apiOne.createSingleTicket(myData, prackrToken)
                    .then(function successCallback(response) {
                        if(response.status == 200){
                         $mdToast.show(
                            $mdToast.simple()
                            .textContent("Ticket created successfully")
                            .hideDelay(3000)
                        );
                         $scope.myTickets.push(response.data.data);
                         console.log(response.data.data.ticketId);

                         var callLogType = Cookies.get('type');
                            if(callLogType == 'call'){
                                $scope.ticketIdForCallLog = response.data.data.ticketId;
                                console.log($scope.ticketIdForCallLog);
                                /*added on 27/may*/
                                 $scope.myData1 = {
                                    ticketId : response.data.data.ticketId,
                                    typeName : myData.name
                                };
                                 apiOne.addAudioToTicket($scope.myData1, prackrToken)
                                .then(function successCallback(response) {
                                        console.log(response);

                                }, function errorCallback(response) {

                                    console.log(response);

                                });


                                 /*addition end*/

                            }
                         /*added on 27/may*/
                         /*$scope.myData1 = {
                            ticketId : response.data.data.ticketId,
                            typeName : myData.name
                        };
                         apiOne.addAudioToTicket(myData1, prackrToken)
                        .then(function successCallback(response) {
                                console.log(response);

                        }, function errorCallback(response) {

                            console.log(response);

                        });*/


                         /*addition end*/



                         $route.reload();
                        console.log($scope.myTickets);
                        var callLogType = Cookies.get('type');
                        if(callLogType == 'call'){
                            $scope.ticketIdForCallLog = response.data.data.ticketId;
                            console.log($scope.ticketIdForCallLog);
                        }

                    }


                        console.log("$scope is the response");
                        console.log(response);
                        $scope.ticketIdCreated = response.data.data.ticketId;
                        $scope.loanEnquiryText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+", You can track your Loan enquiry at https://prac.kr .Our staff will get back to you at earliest.";
                        //window.location = 'ticket-view?ticketId='+$scope.ticketId
                    }, function errorCallback(response) {

                        console.log(response);

                    });
                }
            }
        }
        $scope.sendLoanEnquiryMessage = function(){
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == "" ){
            $mdToast.show(
            $mdToast.simple()
            .textContent("sms not send")
            .hideDelay(3000)
        );
        }
        else{
            console.log("in sending sms");
            var prackrToken = Cookies.get('prackrAuth');
            var myData = {
                number: $scope.mobileNumber,
                message: $scope.loanEnquiryText
            };
            apiOne.sendSmsToUser(prackrToken, myData)
                .then(function successCallback(response) {

                    console.log("in sms success");
                    console.log(response.data.data);
                    //window.location = 'ticket-view?ticketId='+$scope.ticketId
                }, function errorCallback(response) {

                    console.log(response);

                });
        }
    }
    $scope.productEnquiryData = function() {
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == ""){
            if($scope.mobileNumber == "" || $scope.mobileNumber == undefined || $scope.mobileNumber == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Mobile Number Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.firstName == "" || $scope.firstName == undefined || $scope.firstName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("First Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.lastName == "" || $scope.lastName == undefined || $scope.lastName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedCity.title == "" || $scope.selectedCity.title == undefined || $scope.selectedCity.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("City Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedProductInterested.title == "" || $scope.selectedProductInterested.title == undefined || $scope.selectedProductInterested.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Product Interested Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else{
                $scope.allowNextTab = 1;
                $scope.nextTab();
                var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
                var firstName = { attribute: "firstName", value: $scope.firstName };
                var lastName = { attribute: "lastName", value: $scope.lastName };
                var city = { attribute: "city", value: $scope.selectedCity.title };
                var address = { attribute: "address", value: $scope.address };
                var occupation = { attribute: "occupation", value: $scope.selectedOccupation.title };
                var interestsIn = { attribute: "interestsIn", value: $scope.selectedProductInterested.title };
                var alternateContact = { attribute: "alternateContact", value: $scope.alternateContact };
                var notesTags = { attribute: "notesTags", value: $scope.notesTags };
                var callBackTime = { attribute: "callBackTime", value: $scope.hours+':'+$scope.minutes + ' '+$scope.timeSelector };

                var arr = [];
                arr.push(mobileNumber);
                arr.push(firstName);
                arr.push(lastName);
                arr.push(city);
                arr.push(address);
                arr.push(occupation);
                arr.push(interestsIn);
                arr.push(alternateContact);
                arr.push(notesTags);
                arr.push(callBackTime);

                var userData = arr;
                var typeOfTicket = Cookies.get('type');
                var myData = {

                    name: "Product Enquiry",
                    ticketData: angular.toJson(userData),
                    typeName: "productEnquiry",
                    type : typeOfTicket

                }
                console.log(myData);

                var prackrToken = Cookies.get('prackrAuth');
                console.log(prackrToken);

                apiOne.createSingleTicket(myData, prackrToken)
                    .then(function successCallback(response) {
                        if(response.status == 200){
                         $mdToast.show(
                            $mdToast.simple()
                            .textContent("Ticket created successfully")
                            .hideDelay(3000)
                        );
                         $scope.myTickets.push(response.data.data);
                         $route.reload();
                        console.log($scope.myTickets);
                        /*var callLogType = Cookies.get('type');
                        if(callLogType == 'call'){
                            $scope.ticketIdForCallLog = response.data.data.ticketId;
                            console.log($scope.ticketIdForCallLog);
                        }*/
                        var callLogType = Cookies.get('type');
                            if(callLogType == 'call'){
                                $scope.ticketIdForCallLog = response.data.data.ticketId;
                                console.log($scope.ticketIdForCallLog);
                                /*added on 27/may*/
                                 $scope.myData1 = {
                                    ticketId : response.data.data.ticketId,
                                    typeName : myData.name
                                };
                                 apiOne.addAudioToTicket($scope.myData1, prackrToken)
                                .then(function successCallback(response) {
                                        console.log(response);

                                }, function errorCallback(response) {

                                    console.log(response);

                                });


                                 /*addition end*/

                            }
                    }


                        console.log("$scope is the response");
                        console.log(response);
                        $scope.ticketIdCreated = response.data.data.ticketId;
                        $scope.productEnquiryText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+", You can track your enquiry details at https://prac.kr.";
                        //window.location = 'ticket-view?ticketId='+$scope.ticketId
                    }, function errorCallback(response) {

                        console.log(response);

                    });
                }
            }
    }
    $scope.sendProductEnquiryMessage = function(){
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == "" ){
            $mdToast.show(
            $mdToast.simple()
            .textContent("sms not send")
            .hideDelay(3000)
        );
        }
        else{
            console.log("in sending sms");
            var prackrToken = Cookies.get('prackrAuth');
            var myData = {
                number: $scope.mobileNumber,
                message: $scope.productEnquiryText
            };
            apiOne.sendSmsToUser(prackrToken, myData)
                .then(function successCallback(response) {

                    console.log("in sms success");
                    console.log(response.data.data);
                    //window.location = 'ticket-view?ticketId='+$scope.ticketId
                }, function errorCallback(response) {

                    console.log(response);

                });
        }
    }
    $scope.complaintsData = function() {
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == ""){
            if($scope.mobileNumber == "" || $scope.mobileNumber == undefined || $scope.mobileNumber == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Mobile Number Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.firstName == "" || $scope.firstName == undefined || $scope.firstName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("First Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.lastName == "" || $scope.lastName == undefined || $scope.lastName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedCity.title == "" || $scope.selectedCity.title == undefined || $scope.selectedCity.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("City Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedOccupation.title == "" || $scope.selectedOccupation.title == undefined || $scope.selectedOccupation.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Occupation Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedComplaint.title == "" || $scope.selectedComplaint.title == undefined || $scope.selectedComplaint.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Complaint Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else{
                $scope.allowNextTab = 1;
                $scope.nextTab();
                var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
                var firstName = { attribute: "firstName", value: $scope.firstName };
                var lastName = { attribute: "lastName", value: $scope.lastName };
                var city = { attribute: "city", value: $scope.selectedCity.title };
                var address = { attribute: "address", value: $scope.address };
                var occupation = { attribute: "occupation", value: $scope.selectedOccupation.title };
                var complaintType = { attribute: "complaintType", value: $scope.selectedComplaint.title };
                var notesTags = { attribute: "notesTags", value: $scope.notesTags };
                var alternateContact = { attribute: "alternateContact", value: $scope.alternateContact };
                var callBackTime = { attribute: "callBackTime", value: $scope.hours+':'+$scope.minutes + ' '+$scope.timeSelector };

                var arr = [];
                arr.push(mobileNumber);
                arr.push(firstName);
                arr.push(lastName);
                arr.push(city);
                arr.push(address);
                arr.push(occupation);
                arr.push(complaintType);
                arr.push(notesTags);
                arr.push(alternateContact);
                arr.push(callBackTime);

                var userData = arr;
                var typeOfTicket = Cookies.get('type');
                var myData = {

                    name: "Complaints and Suggestions",
                    ticketData: angular.toJson(userData),
                    typeName: "complaints",
                    type : typeOfTicket

                }
                console.log(myData);

                var prackrToken = Cookies.get('prackrAuth');
                console.log(prackrToken);

                apiOne.createSingleTicket(myData, prackrToken)
                    .then(function successCallback(response) {
                        if(response.status == 200){
                         $mdToast.show(
                            $mdToast.simple()
                            .textContent("Ticket created successfully")
                            .hideDelay(3000)
                        );
                         $scope.myTickets.push(response.data.data);
                         $route.reload();
                        console.log($scope.myTickets);
                        /*var callLogType = Cookies.get('type');
                        if(callLogType == 'call'){
                            $scope.ticketIdForCallLog = response.data.data.ticketId;
                            console.log($scope.ticketIdForCallLog);
                        }*/
                        var callLogType = Cookies.get('type');
                            if(callLogType == 'call'){
                                $scope.ticketIdForCallLog = response.data.data.ticketId;
                                console.log($scope.ticketIdForCallLog);
                                /*added on 27/may*/
                                 $scope.myData1 = {
                                    ticketId : response.data.data.ticketId,
                                    typeName : myData.name
                                };
                                 apiOne.addAudioToTicket($scope.myData1, prackrToken)
                                .then(function successCallback(response) {
                                        console.log(response);

                                }, function errorCallback(response) {

                                    console.log(response);

                                });


                                 /*addition end*/

                            }
                    }


                        console.log("$scope is the response");
                        console.log(response);
                        $scope.ticketIdCreated = response.data.data.ticketId;
                        $scope.complaintText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+", You can track your complaint or suggestions at https://prac.kr";           
                        //window.location = 'ticket-view?ticketId='+$scope.ticketId
                    }, function errorCallback(response) {

                        console.log(response);

                });
            }
        }
    }

    $scope.sendComplaintsMessage = function(){
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == "" ){
            $mdToast.show(
            $mdToast.simple()
            .textContent("sms not send")
            .hideDelay(3000)
        );
        }
        else{
            console.log("in sending sms");
            var prackrToken = Cookies.get('prackrAuth');
            var myData = {
                number: $scope.mobileNumber,
                message: $scope.complaintText
            };
            apiOne.sendSmsToUser(prackrToken, myData)
                .then(function successCallback(response) {

                    console.log("in sms success");
                    console.log(response.data.data);
                    //window.location = 'ticket-view?ticketId='+$scope.ticketId
                }, function errorCallback(response) {

                    console.log(response);

                });
        }
    }
    $scope.newCardData = function() {
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == ""){
            if($scope.mobileNumber == "" || $scope.mobileNumber == undefined || $scope.mobileNumber == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Mobile Number Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.firstName == "" || $scope.firstName == undefined || $scope.firstName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("First Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.lastName == "" || $scope.lastName == undefined || $scope.lastName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedCity.title == "" || $scope.selectedCity.title == undefined || $scope.selectedCity.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("City Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedOccupation.title == "" || $scope.selectedOccupation.title == undefined || $scope.selectedOccupation.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Occupation Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else{
                $scope.allowNextTab = 1;
                $scope.nextTab();
                var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
                var firstName = { attribute: "firstName", value: $scope.firstName };
                var lastName = { attribute: "lastName", value: $scope.lastName };
                var city = { attribute: "city", value: $scope.selectedCity.title };
                var address = { attribute: "address", value: $scope.address };
                var occupation = { attribute: "occupation", value: $scope.selectedOccupation.title };
                var accountNumber = { attribute: "accountNumber", value: $scope.accountNumber };
                var notesTags = { attribute: "notesTags", value: $scope.notesTags };
                var alternateContact = { attribute: "alternateContact", value: $scope.alternateContact };
                var callBackTime = { attribute: "callBackTime", value: $scope.hours+':'+$scope.minutes + ' '+$scope.timeSelector };

                var arr = [];
                arr.push(mobileNumber);
                arr.push(firstName);
                arr.push(lastName);
                arr.push(city);
                arr.push(address);
                arr.push(occupation);
                arr.push(accountNumber);
                arr.push(notesTags);
                arr.push(alternateContact);
                arr.push(callBackTime);

                var userData = arr;
                var typeOfTicket = Cookies.get('type');
                var myData = {

                    name: "Issue New Card",
                    ticketData: angular.toJson(userData),
                    typeName: "issueNewCard",
                    type : typeOfTicket

                }
                console.log(myData);

                var prackrToken = Cookies.get('prackrAuth');
                console.log(prackrToken);

                apiOne.createSingleTicket(myData, prackrToken)
                    .then(function successCallback(response) {

                        if(response.status == 200){
                         $mdToast.show(
                            $mdToast.simple()
                            .textContent("Ticket created successfully")
                            .hideDelay(3000)
                        );
                         $scope.myTickets.push(response.data.data);
                         $route.reload();
                        console.log($scope.myTickets);
                        /*var callLogType = Cookies.get('type');
                        if(callLogType == 'call'){
                            $scope.ticketIdForCallLog = response.data.data.ticketId;
                            console.log($scope.ticketIdForCallLog);
                        }*/
                        var callLogType = Cookies.get('type');
                            if(callLogType == 'call'){
                                $scope.ticketIdForCallLog = response.data.data.ticketId;
                                console.log($scope.ticketIdForCallLog);
                                /*added on 27/may*/
                                 $scope.myData1 = {
                                    ticketId : response.data.data.ticketId,
                                    typeName : myData.name
                                };
                                 apiOne.addAudioToTicket($scope.myData1, prackrToken)
                                .then(function successCallback(response) {
                                        console.log(response);

                                }, function errorCallback(response) {

                                    console.log(response);

                                });


                                 /*addition end*/

                            }
                    }

                        console.log("$scope is the response");
                        console.log(response);
                        $scope.ticketIdCreated = response.data.data.ticketId;
                        $scope.newCardText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+", You can track your New Card Status at https://prac.kr"
                        //window.location = 'ticket-view?ticketId='+$scope.ticketId
                    }, function errorCallback(response) {

                        console.log(response);

                    });
                }
            }
    }
    $scope.sendNewCardMessage = function(){
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == "" ){
            $mdToast.show(
            $mdToast.simple()
            .textContent("sms not send")
            .hideDelay(3000)
        );
        }
        else{
            console.log("in sending sms");
            var prackrToken = Cookies.get('prackrAuth');
            var myData = {
                number: $scope.mobileNumber,
                message: $scope.newCardText
            };
            apiOne.sendSmsToUser(prackrToken, myData)
                .then(function successCallback(response) {

                    console.log("in sms success");
                    console.log(response.data.data);
                    //window.location = 'ticket-view?ticketId='+$scope.ticketId
                }, function errorCallback(response) {

                    console.log(response);

                });
        }
    }
    $scope.lostCardTicketData = function() {
            if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == ""){
            if($scope.mobileNumber == "" || $scope.mobileNumber == undefined || $scope.mobileNumber == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Mobile Number Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.firstName == "" || $scope.firstName == undefined || $scope.firstName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("First Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.lastName == "" || $scope.lastName == undefined || $scope.lastName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedCity.title == "" || $scope.selectedCity.title == undefined || $scope.selectedCity.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("City Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.selectedOccupation.title == "" || $scope.selectedOccupation.title == undefined || $scope.selectedOccupation.title == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Occupation Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.accountNumber == "" || $scope.accountNumber == undefined || $scope.accountNumber == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.motherMaidenName == "" || $scope.motherMaidenName == undefined || $scope.motherMaidenName == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.dob == "" || $scope.dob == undefined || $scope.dob == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.notesTags == "" || $scope.notesTags == undefined || $scope.notesTags == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else if($scope.alternateContact == "" || $scope.alternateContact == undefined || $scope.alternateContact == null){
                $mdToast.show(
                $mdToast.simple()
                .textContent("Last Name Can not be Empty")
                .hideDelay(3000)
            );
                $scope.allowNextTab = 0;
                return false;
            }
            else{
                $scope.allowNextTab = 1;
                $scope.nextTab();
                var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
                var firstName = { attribute: "firstName", value: $scope.firstName };
                var lastName = { attribute: "lastName", value: $scope.lastName };
                var city = { attribute: "city", value: $scope.selectedCity.title };
                var address = { attribute: "address", value: $scope.address };
                var occupation = { attribute: "occupation", value: $scope.selectedOccupation.title };
                var accountNumber = { attribute: "accountNumber", value: $scope.accountNumber };
                var motherMaidenName = { attribute: "motherMaidenName", value: $scope.motherMaidenName };
                var dob = { attribute: "dob", value: $scope.dob };
                var notesTags = { attribute: "notesTags", value: $scope.notesTags };
                var alternateContact = { attribute: "alternateContact", value: $scope.alternateContact };
                var callBackTime = { attribute: "callBackTime", value: $scope.hours+':'+$scope.minutes + ' '+$scope.timeSelector };

                var arr = [];
                arr.push(mobileNumber);
                arr.push(firstName);
                arr.push(lastName);
                arr.push(city);
                arr.push(address);
                arr.push(occupation);
                arr.push(accountNumber);
                arr.push(motherMaidenName);
                arr.push(dob);
                arr.push(notesTags);
                arr.push(alternateContact);
                arr.push(callBackTime);

                var userData = arr;
                var typeOfTicket = Cookies.get('type');
                var myData = {

                    name: "Lost/Block Card",
                    ticketData: angular.toJson(userData),
                    typeName: "lostCard",
                    type : typeOfTicket

                }
                console.log(myData);

                var prackrToken = Cookies.get('prackrAuth');
                console.log(prackrToken);

                apiOne.createSingleTicket(myData, prackrToken)
                    .then(function successCallback(response) {
                        if(response.status == 200){
                         $mdToast.show(
                            $mdToast.simple()
                            .textContent("Ticket created successfully")
                            .hideDelay(3000)
                        );
                         $scope.myTickets.push(response.data.data);
                         $route.reload();
                        console.log($scope.myTickets);
                        /*var callLogType = Cookies.get('type');
                        if(callLogType == 'call'){
                            $scope.ticketIdForCallLog = response.data.data.ticketId;
                            console.log($scope.ticketIdForCallLog);
                        }*/
                        var callLogType = Cookies.get('type');
                            if(callLogType == 'call'){
                                $scope.ticketIdForCallLog = response.data.data.ticketId;
                                console.log($scope.ticketIdForCallLog);
                                /*added on 27/may*/
                                 $scope.myData1 = {
                                    ticketId : response.data.data.ticketId,
                                    typeName : myData.name
                                };
                                 apiOne.addAudioToTicket($scope.myData1, prackrToken)
                                .then(function successCallback(response) {
                                        console.log(response);

                                }, function errorCallback(response) {

                                    console.log(response);

                                });


                                 /*addition end*/

                            }
                    }


                        console.log("$scope is the response");
                        console.log(response);
                        $scope.ticketIdCreated = response.data.data.ticketId;
                        $scope.lostCardText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+". You can track your Card Block Status at https://prac.kr";
                        //window.location = 'ticket-view?ticketId='+$scope.ticketId
                    }, function errorCallback(response) {

                        console.log(response);

                    });
            }
        }
    }

    $scope.sendLostCardMessage = function(){
        if($scope.ticketIdCreated == undefined || $scope.ticketIdCreated == "" ){
            $mdToast.show(
            $mdToast.simple()
            .textContent("sms not send")
            .hideDelay(3000)
        );
        }
        else{
            console.log("in sending sms");
            var prackrToken = Cookies.get('prackrAuth');
            var myData = {
                number: $scope.mobileNumber,
                message: $scope.lostCardText
            };
            apiOne.sendSmsToUser(prackrToken, myData)
                .then(function successCallback(response) {

                    console.log("in sms success");
                    console.log(response.data.data);
                    //window.location = 'ticket-view?ticketId='+$scope.ticketId
                }, function errorCallback(response) {

                    console.log(response);

                });
        }
    }


    //previous task modal

    /*$scope.addTicketsTask = function(ev,passedTicketIs,ticketsType) {
        Cookies.set('nowticketId',passedTicketIs);
        var prackrToken = Cookies.get('prackrAuth');
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        apiOne.showAllTasks(passedTicketIs, prackrToken)
            .then(function successCallback(response) {
                $scope.ticketsType = ticketsType;
                console.log($scope.ticketsType);
                $scope.editTicketData = response.data.data;
                console.log($scope.editTicketData);
            }, function errorCallback(response) {

                console.log(response);

            });
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/addTicketsTask.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new(),
                locals: {
                  typeOfTicketIs: prackrToken
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };*/
        //add task modal

    $scope.addTicketsTask = function(ev,passedTicketIs,ticketsType) {
        Cookies.set('nowticketId',passedTicketIs);
        var prackrToken = Cookies.get('prackrAuth');
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        apiOne.showAllTasks(passedTicketIs, prackrToken)
            .then(function successCallback(response) {
                $scope.ticketsType = ticketsType;
                console.log($scope.ticketsType);
                $scope.editTicketData = response.data.data;
                /*for(x in $scope.editTicketData){*/
                    console.log($scope.editTicketData[0].taskData);
                    console.log(JSON.parse($scope.editTicketData[1].taskData));
                    console.log(JSON.parse($scope.editTicketData[2].taskData));

                /*}*/
                console.log($scope.editTicketData);
            }, function errorCallback(response) {

                console.log(response);

            });
            $scope.disabledRadioButton1 = true;
            $scope.disabledRadioButton2 = true;
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/addTicketsTask.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new(),
                locals: {
                  typeOfTicketIs: prackrToken
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };

    $scope.selectInputType = function(){
        console.log($scope.selectedAssignType1);
        if($scope.selectedAssignType1 == "assignAgents"){
            $scope.disabledRadioButton1 = false;
            $scope.disabledRadioButton2 = true;
        }
        if($scope.selectedAssignType1 == "branchAndDepartment"){
            $scope.disabledRadioButton1 = true;
            $scope.disabledRadioButton2 = false;
        }
    }


        //mark ticket close
    $scope.markTicketClose = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        $scope.prackrToken = Cookies.get('prackrAuth');
        $scope.tId = Cookies.get('selectedTicketId');
        /*alert($scope.tId);*/
        if($scope.tId == '' || $scope.tId ==null || $scope.tId == undefined){
            $mdToast.show(
                $mdToast.simple()
                .textContent("Please Select a ticket")
                .hideDelay(3000)
            );
        }
        else{
            apiOne.markClose($scope.tId,$scope.prackrToken)
            .then(function successCallback(response) {

                $scope.fileName = "";
                console.log("$scope is the response");
                console.log(response.data.data);
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });
        }

    }; 
        //ticket delete
    $scope.deleteTicket = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        $scope.prackrToken = Cookies.get('prackrAuth');
        $scope.tId = Cookies.get('selectedTicketId');
        if($scope.tId == '' || $scope.tId ==null || $scope.tId == undefined){
            $mdToast.show(
                $mdToast.simple()
                .textContent("Please Select a ticket")
                .hideDelay(3000)
            );
        }
        else{
            apiOne.deleteMarkTicket($scope.tId,$scope.prackrToken)
            .then(function successCallback(response) {

                $scope.fileName = "";
                console.log("$scope is the response");
                console.log(response.data.data);
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });
        }

    };     
    //edit task modal
    $scope.editTicketsTask = function(ev,nowticketId) {
        Cookies.set('nowticketId',nowticketId);
        var prackrToken = Cookies.get('prackrAuth');
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        apiOne.showAllTasks(nowticketId, prackrToken)
            .then(function successCallback(response) {

                $scope.fileName = "";
                console.log("$scope is the response");
                console.log(response.data.data);
                $scope.editTicketData = response.data.data;
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/addTicketsTask.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new(),
                locals: {
                          typeOfTicketIs: $scope.typeOfTicketIs
                        },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };

    $scope.toggleAddTask = function() {
        $scope.updateTask = 0;
        $scope.taskName = '';
        $scope.agentName = '';
        $scope.priority = '';
        $scope.timeForAnswer = '';
        $scope.enterNote = '';
        $scope.initiateBy = '';
        $scope.triggerParameter = '';
        $scope.form = '';
        $scope.enterMessage = '';
        $('.toggleDiv').toggle();
    };


    //cretat ticket previous
    // $scope.createTicket = function(){
        
    //     $scope.nowTicketId2 = Cookies.get('nowticketId');
    //     Cookies.remove('nowticketId');
    //     var taskName = { attribute: "taskName", value: $scope.taskName };
    //     var agentName = { attribute: "agentName", value: $scope.agentName.title };
    //     var priority = { attribute: "priority", value: $scope.priority};
    //     var timeForAnswer = { attribute: "timeForAnswer", value: $scope.timeForAnswer };
    //     var note = { attribute: "note", value: $scope.enterNote };
    //     var initiateBy = { attribute: "initiateBy", value: $scope.initiateBy };
    //     var triggerParameter = { attribute: "triggerParameter", value: $scope.triggerParameter };
    //     var form = { attribute: "form", value: $scope.form };
    //     var message = { attribute: "message", value: $scope.enterMessage };
    //     var fileName = {attribute: "fileLink", value:$scope.fileName};

    //     var arr = [];
    //     arr.push(taskName);
    //     arr.push(agentName);
    //     arr.push(priority);
    //     arr.push(timeForAnswer);
    //     arr.push(note);
    //     arr.push(initiateBy);
    //     arr.push(triggerParameter);
    //     arr.push(form);
    //     arr.push(message);
    //     arr.push(fileName);

    //     var userData = arr;

    //     var tasks ={ tasks : angular.toJson(userData) }
    //     var prackrToken = Cookies.get('prackrAuth');
        
    //     $scope.myData = {
    
    //         ticketId : $scope.nowTicketId2,
    //         taskData: angular.toJson(arr)
    //     };
    //     console.log("myData");
    //     console.log($scope.myData);

    //     apiOne.createSingleTask($scope.myData, prackrToken)
    //         .then(function successCallback(response) {

    //             $scope.fileName = "";
    //             console.log("$scope is the response");
    //             var submitedTaskData = response.data.data;
    //             $scope.createdTaskId = submitedTaskData.taskId;
    //             if($scope.agentName == null || $scope.agentName == '' || $scope.agentName == undefined){
            
    //                 }
    //                 else if(($scope.presentUserName != $scope.agentName.originalObject.agentUserName) && ($scope.agentName.originalObject !=undefined)){
    //                     var tempAgentName = $scope.agentName.originalObject.agentUserName;
    //                     console.log(tempAgentName);
    //                     $scope.taskData = {
    //                         userName : tempAgentName,
    //                         ticketId : $scope.nowTicketId2,
    //                         taskId : $scope.createdTaskId
    //                     }
    //                     apiOne.assignTaskToAgent($scope.taskData, prackrToken)
    //                     .then(function successCallback(response) {

    //                         console.log("$scope is the response");
    //                         console.log(response);
    //                         //window.location = 'ticket-view?ticketId='+$scope.ticketId
    //                     }, function errorCallback(response) {

    //                         console.log(response);

    //                     });
    //                 }
    //             //window.location = 'ticket-view?ticketId='+$scope.ticketId
    //         }, function errorCallback(response) {


    //         });
    // }

    //create Ticket
    $scope.createTicket = function(){
        
        $scope.nowTicketId2 = Cookies.get('nowticketId');
        Cookies.remove('nowticketId');
        console.log($scope.agentName.title);
        var taskName = { attribute: "taskName", value: $scope.taskName };
        var gamePoint = { attribute: "gamePoint", value: $scope.gamePoint };
        var agentName = { attribute: "agentName", value: $scope.agentName.title };
        var branchId = { attribute: "branchId", value: $scope.selectedBranch.originalObject.branchId };
        var departmentId = { attribute: "departmentId", value: $scope.selectedDepartment.originalObject.departmentId };
        var priority = { attribute: "priority", value: $scope.priority};
        var timeForAnswer = { attribute: "timeForAnswer", value: $scope.timeForAnswer };
        var note = { attribute: "note", value: $scope.enterNote };
        var initiateBy = { attribute: "initiateBy", value: $scope.initiateBy };
        var triggerParameter = { attribute: "triggerParameter", value: $scope.triggerParameter };
        var form = { attribute: "form", value: $scope.form };
        var message = { attribute: "message", value: $scope.enterMessage };
        var escalatedTo = { attribute: "escalatedTo", value: $scope.escalatedTo };
        var askFor = { attribute: "askFor", value: $scope.askFor };
        var sendSmsToCustomer = { attribute: "sendSmsToCustomer", value: $scope.sendSmsToCustomer };
        var fileName = {attribute: "fileLink", value:angular.toJson($scope.completeFilesIdsArray)};

        var arr = [];
        arr.push(taskName);
        arr.push(gamePoint);
        arr.push(agentName);
        arr.push(branchId);
        arr.push(departmentId);
        arr.push(priority);
        arr.push(timeForAnswer);
        arr.push(note);
        arr.push(initiateBy);
        arr.push(triggerParameter);
        arr.push(form);
        arr.push(escalatedTo);
        arr.push(askFor);
        arr.push(sendSmsToCustomer);
        arr.push(message);
        arr.push(fileName);

        var userData = arr;

        var tasks ={ tasks : angular.toJson(userData) }
        var prackrToken = Cookies.get('prackrAuth');
        
        $scope.myData = {
    
            ticketId : $scope.nowTicketId2,
            taskData: angular.toJson(arr)
        };
        console.log("myData");
        console.log($scope.myData);
        if($scope.agentName.title == '' || $scope.agentName.title == null || $scope.agentName.title ==undefined){
            console.log("true");
            apiOne.createSingleTask2($scope.myData, prackrToken)
            .then(function successCallback(response) {

                // $scope.fileName = "";
                // console.log("$scope is the response");
                // var submitedTaskData = response.data.data;
                // $scope.createdTaskId = submitedTaskData.taskId;



                // if($scope.agentName == null || $scope.agentName == '' || $scope.agentName == undefined){
            
                //     }
                //     else if(($scope.presentUserName != $scope.agentName.originalObject.agentUserName) && ($scope.agentName.originalObject !=undefined)){
                //         var tempAgentName = $scope.agentName.originalObject.agentUserName;
                //         console.log(tempAgentName);
                //         $scope.taskData = {
                //             userName : tempAgentName,
                //             ticketId : $scope.nowTicketId2,
                //             taskId : $scope.createdTaskId
                //         }
                //         apiOne.assignTaskToAgent($scope.taskData, prackrToken)
                //         .then(function successCallback(response) {

                //             console.log("$scope is the response");
                //             console.log(response);
                //             //window.location = 'ticket-view?ticketId='+$scope.ticketId
                //         }, function errorCallback(response) {

                //             console.log(response);

                //         });
                //     }

                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {


            });
        }
        else{
            console.log("still pending");
        }
        
    }


    $scope.updateTask = 0;
    $scope.editTaskByAgent = function(taskId){
        $scope.taskId = taskId;
        $scope.updateTask = 1;
        var prackrToken = Cookies.get('prackrAuth');
        apiOne.getTaskDetail(taskId, prackrToken)
            .then(function successCallback(response) {
                console.log("$scope is the response");
                console.log(response.data.data.taskData);
                for(x in response.data.data.taskData){
                    console.log(response.data.data.taskData[x]);
                    if(response.data.data.taskData[x].attribute == 'taskName'){
                        $scope.taskName = response.data.data.taskData[x].value;
                    }
                    if(response.data.data.taskData[x].attribute == 'agentName'){
                        $scope.agentName = response.data.data.taskData[x].value;
                    }
                    if(response.data.data.taskData[x].attribute == 'priority'){
                        $scope.priority = response.data.data.taskData[x].value;
                    }
                    if(response.data.data.taskData[x].attribute == 'timeForAnswer'){
                        $scope.timeForAnswer = response.data.data.taskData[x].value;
                    }
                    if(response.data.data.taskData[x].attribute == 'note'){
                        $scope.enterNote = response.data.data.taskData[x].value;
                    }
                    if(response.data.data.taskData[x].attribute == 'initiateBy'){
                        $scope.initiateBy = response.data.data.taskData[x].value;
                    }
                    if(response.data.data.taskData[x].attribute == 'triggerParameter'){
                        $scope.triggerParameter = response.data.data.taskData[x].value;
                    }
                    if(response.data.data.taskData[x].attribute == 'form'){
                        $scope.form = response.data.data.taskData[x].value;
                    }
                    if(response.data.data.taskData[x].attribute == 'message'){
                        $scope.enterMessage = response.data.data.taskData[x].value;
                    }
                }
                $('.toggleDiv').toggle();
            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.editAutoTaskByAgent = function(taskName,taskPriority){
        var prackrToken = Cookies.get('prackrAuth');
        $scope.taskName = taskName;
        $scope.agentName = taskPriority;
        $('.toggleDiv').toggle();
            
    }


    $scope.updateTicket = function(){
        var taskName = { attribute: "taskName", value: $scope.taskName };
        var agentName = { attribute: "agentName", value: $scope.agentName };
        var priority = { attribute: "priority", value: $scope.priority };
        var timeForAnswer = { attribute: "timeForAnswer", value: $scope.timeForAnswer };
        var note = { attribute: "note", value: $scope.enterNote };
        var initiateBy = { attribute: "initiateBy", value: $scope.initiateBy };
        var triggerParameter = { attribute: "triggerParameter", value: $scope.triggerParameter };
        var form = { attribute: "form", value: $scope.form };
        var message = { attribute: "message", value: $scope.enterMessage };
        var fileName = {attribute: "fileLink", value:$scope.fileName};

        var arr = [];
        arr.push(taskName);
        arr.push(agentName);
        arr.push(priority);
        arr.push(timeForAnswer);
        arr.push(note);
        arr.push(initiateBy);
        arr.push(triggerParameter);
        arr.push(form);
        arr.push(message);
        arr.push(fileName);

        var userData = arr;

        var tasks ={ tasks : angular.toJson(userData) }
        var prackrToken = Cookies.get('prackrAuth');
        
        $scope.myData = {
    
            taskData: angular.toJson(arr)
        };
        console.log("myData");
        console.log($scope.myData);

        apiOne.updateSingleTask($scope.myData, prackrToken, $scope.taskId)
            .then(function successCallback(response) {

                $scope.fileName = "";
                console.log("$scope is the response");
                console.log(response.data.data);
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });

    }
    //accountOpeningText setting

        $scope.accountOpeningText ="Thank you for calling SUCO BANK , your ticket ID is "+$scope.ticketIdCreated+", You can track your Account Opening status at https://prac.kr .Your account will be opened within 48 hours.";

    //loan enquery text setting

        $scope.loanEnquiryText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+", You can track your Loan enquiry at https://prac.kr .Our staff will get back to you at earliest.";

    // product enquiry & info text setting

        $scope.productEnquiryText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+", You can track your enquiry details at https://prac.kr.";      
    
    // complaints text setting

        $scope.complaintText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+", You can track your complaint or suggestions at https://prac.kr";           

    //new card text setting

        $scope.newCardText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+", You can track your New Card Status at https://prac.kr"
    
    //lost card text setting

        $scope.lostCardText = "Thank you for calling SUCO BANK, your ticket ID is "+$scope.ticketIdCreated+". You can track your Card Block Status at https://prac.kr";






        $scope.selectBranch = function(branchData) {

            if (branchData == '') {
                window.location.reload();
            } else {
                $scope.branchNameData = branchData;
                console.log($scope.branchNameData)
                ////console.log($scope.categoryFilter)
                $scope.branchNameData2 = {
                    "attribute" : "branch",
                    "value"    : $scope.branchNameData
                }
            }

        }

        $scope.selectFor = function(forData) {

            if (forData == '') {
                window.location.reload();
            } else {
                $scope.forData = forData;
                console.log($scope.forData)
                
            }

        }

        $scope.selectDepartment = function(forData) {

            if (forData == '') {
                window.location.reload();
            } else {
                $scope.forData = forData;
                console.log($scope.forData)
                
            }

        }
/*

        $scope.selectAgent = function() {
            $scope.assignToData = $scope.assignToFilter;
            if ($scope.assignToData == '') {
                window.location.reload();
            } else {
                $scope.forData = forData;
                console.log($scope.forData)
                
            }

        }
*/  


        //close modal 
        $scope.closeModal = function(ev){
            $mdDialog.cancel();
        }



        $scope.selectStatus = function(statusData) {
            $scope.assignToData = $scope.assignToFilter;
            if (statusData == '') {
                window.location.reload();
            } else {
                $scope.statusData = statusData;
                console.log($scope.forData)
                
            }

        }

        // socket data
//inbound call

$scope.socketData = function(data) {
        alert('in socket');

        Cookies.set('type','call');

        $scope.ticketIdForCallLog = "";
        
        console.log(data);

        $scope.pa2 = 0;

        $scope.callerData = data;
        
        var callingAction = data.action;
        
        var callingPurpose = callingAction.split("_");

        var currentAgentNumber = data.agentNumber;

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

        /*var action1 = data.action

        action1 = action1.split("_");

        var action = action1.join(" ");

        //var action = action1;

        console.log("Hello world! Successful in calling this function from the script tag");

        //$("#dialog").html('<p>From : <span style="font-weight:600;">'+data.customerNumber+'</span><br/>For : <span style="font-weight:600;">'+action+'</span></p>');*/

        console.log("Hello world! Successful in calling this function from the script tag");

        //$("#dialog").html('<p>This is the default dialog which is useful for displaying information. The dialog window can be moved, resized and closed with the icon.</p>')

        if(currentAgentNumber == $scope.agentNumber){
            alert("in if condition");
            $(function() {
                /*$("#dialog").dialog()*/
               $scope.openCallModal(ev);
                /*$scope.openCallModal();*/
            });
        }
    }


    $scope.openCallModal = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        console.log("hell");
         alert("hell hell hell");
                $scope.firstName = "shweta";
                $scope.arrayToSendToModal = [];
                
                apiOne.getCaller($scope.callerData.customerNumber)
                .then(function successCallback(response) {
                    console.log(response);
                    console.log(response.data.error);
                    console.log(response.data.data.customerName);
                    if(response.data.error == false || response.data.error == null ){
                        if(response.data.data.responseMessage == 'The given Mobile No is not registered'){
                            console.log("in response message");
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
                            $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                            $scope.arrayToSendToModal.push(firstNameDetails);
                            $scope.ticketIdCreated = "";
                            console.log($scope.arrayToSendToModal);
                            $scope.openCallModal();
                        }
                    }
                    else{
                        $scope.typeOfTicketIs = 'ticket';
                        var typeOfTicketIsHere = {ticketTypeHere : $scope.typeOfTicketIs};
                        var firstNameDetails = {firstName : $scope.firstName};
                        var lastNameDetails = {lastName : $scope.lastName};
                        var addressDetails = {address : $scope.addressDetail};
                        $scope.arrayToSendToModal.push(typeOfTicketIsHere);
                        $scope.arrayToSendToModal.push(firstNameDetails);
                        $scope.arrayToSendToModal.push(lastNameDetails);
                        $scope.arrayToSendToModal.push(addressDetails);
                        $scope.ticketIdCreated = "";
                        console.log($scope.arrayToSendToModal);
                        $scope.openCallModal();
                    }
                    

                }, function errorCallback(response) {

                });
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/outbound-call.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new(),
                locals: {
                          typeOfTicketIs: $scope.arrayToSendToModal
                        },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };

    $scope.initOutboundCall = function(){
        console.log("type of tickets is ");
        console.log($scope.typeOfTicketIs);
        $scope.firstName = $scope.typeOfTicketIs[1].firstName;
    }

    $scope.getByWeek = function(){

        $scope.ngDisabledValueForProgressBar = false;
        
        $scope.prackrToken = Cookies.get('prackrAuth');
        console.log("week");
        
        apiOne.getTicketByWeek($scope.prackrToken)
            .then(function successCallback(response) {
                $scope.myTickets = response.data.data;

                $scope.ngDisabledValueForProgressBar = true;

            }, function errorCallback(response) {

                console.log(response);

            });
    }


    $scope.getByMonth = function(){
        
        $scope.ngDisabledValueForProgressBar = false;
        
        $scope.prackrToken = Cookies.get('prackrAuth');
        
        apiOne.getTicketByMonth($scope.prackrToken)
            .then(function successCallback(response) {
                
                $scope.myTickets = response.data.data;

                $scope.ngDisabledValueForProgressBar = true;

            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.getByYear = function(){
        
        $scope.ngDisabledValueForProgressBar = false;
        
        $scope.prackrToken = Cookies.get('prackrAuth');
        
        apiOne.getTicketByYear($scope.prackrToken)
            .then(function successCallback(response) {
                
                $scope.myTickets = response.data.data;

                $scope.ngDisabledValueForProgressBar = true;

            }, function errorCallback(response) {

                console.log(response);

            });
    }
    //}

  $scope.selectDeskTicketsByRange = function(dateRange){
        
        if(dateRange.includes("to")){
            
            var range = dateRange.split(" to ");

            $scope.ngDisabledValueForProgressBar = false;

            var startDateByRange = new Date(range[0]);

            var endDateByRange = new Date(range[1]);
        
            apiOne.getDeskTicketByRange($scope.prackrToken,startDateByRange,endDateByRange)
                .then(function successCallback(response) {

                    $scope.myTickets = response.data.data;

                    $scope.ngDisabledValueForProgressBar = true;
                    
                }, function errorCallback(response) {

                    console.log(response);

            });
        }
  }


    $scope.saveNote = function(){
        if($scope.noteText == undefined || $scope.noteText == "" ){
            $mdToast.show(
            $mdToast.simple()
            .textContent("Add Note Value")
            .hideDelay(3000)
        );
        }
        else{
            var number = Cookies.get('numberSet');
            Cookies.remove('numberSet');
            console.log("in saving note");
            var prackrToken = Cookies.get('prackrAuth');
            var myData = {
                mobileNumber: number,
                noteTitle: $scope.typeOfTicketIs,
                noteBody: $scope.noteText
            };
            console.log(myData);
            apiOne.saveNote(prackrToken, myData)
                .then(function successCallback(response) {

                    console.log("in save note success");
                    console.log(response.data.data);
                }, function errorCallback(response) {

                    console.log(response);

            });
        }
    }

    //outbound call by agent

    $scope.outboundCallByAgent = function(ev){

        var number = $scope.phoneNumberToBeCalled;
        
        var checkIfNumberIsRight = (/^\d{10}$/.test(number));

        console.log("Number : " + $scope.phoneNumberToBeCalled);

        $scope.noteTitle2 = $scope.noteTitle;

        var action = $scope.callTypeByAgent;

        $scope.typeOfTicketIs = 'call';

        console.log($scope.typeOfTicketIs);

        if(!checkIfNumberIsRight){
            $mdToast.show(
                $mdToast.simple()
                .textContent("Enter a valid number")
                .hideDelay(3000)
            );
        }
        else if(action == null || action == '' || action == undefined){
            $mdToast.show(
                $mdToast.simple()
                .textContent("Please Select an action")
                .hideDelay(3000)
            );
        }
        else{

        Cookies.set('type','call');

            if(action == 'accountOpening'){
                $scope.templateUrlIs = 'views/accountOpening.html';
            }
            else if(action == 'loanEnquiry'){
                $scope.templateUrlIs = 'views/loanEnquiry.html';
            }
            else if(action == 'productEnquiry'){
                $scope.templateUrlIs = 'views/productEnquiry.html';
            }
            else if(action == 'complaints'){
                $scope.templateUrlIs = 'views/complaints.html';
            }
            else if(action == 'issueNewCard'){
                $scope.templateUrlIs = 'views/newCard.html';
            }
            else if(action == 'lostCard'){
                $scope.templateUrlIs = 'views/lostCard.html';
            }
            else if(action == 'others'){
                $scope.templateUrlIs = '';
            }

            if($scope.templateUrlIs != ''){
                $scope.numberToBeCalled = number;

                console.log($scope.numberToBeCalled);
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

                $mdDialog.cancel();
                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: $scope.templateUrlIs,
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: useFullScreen,
                        locals: {
                          typeOfTicketIs: $scope.typeOfTicketIs
                        },
                        
                    })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                        
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });
                    var myData = {

                        number: number
                    }

                var token = Cookies.get('prackrAuth');

                apiOne.makeOutboundCall(token, myData)
                    .then(function successCallback(response) {

                        console.log(response);
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent("Call Placed Successfully...")
                            .hideDelay(3000)
                        );
                    }, function errorCallback(response) {

                        console.log(response);
                        $mdToast.show(
                            $mdToast.simple()
                            .textContent("Some error occured, Please try your action again after some time")
                            .hideDelay(3000)
                        );

                    });
            }
            else{
            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

            $scope.numberToBeCalled = number;

            $mdDialog.cancel();
            $mdDialog.show({
                    controller: DialogController,
                    templateUrl: 'views/create-note.html',
                    parent: angular.element(document.body),
                    targetEvent: ev,
                    clickOutsideToClose: false,
                    fullscreen: useFullScreen,
                    locals: {
                      typeOfTicketIs: $scope.noteTitle2
                    },
                    
                })
                .then(function(answer) {
                    $scope.status = 'You said the information was "' + answer + '".';
                    
                }, function() {
                    $scope.status = 'You cancelled the dialog.';
                });
                var myData = {

                    number: number
                }

            var token = Cookies.get('prackrAuth');
            Cookies.set('numberSet',number);
            apiOne.makeOutboundCall(token, myData)
                .then(function successCallback(response) {

                    console.log(response);
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent("Call Placed Successfully...")
                        .hideDelay(3000)
                    );
                }, function errorCallback(response) {

                    console.log(response);
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent("Some error occured, Please try your action again after some time")
                        .hideDelay(3000)
                    );

                });
            }
        
        }

    }


    $scope.agentsList = function(){

        $scope.agentsNameList = [];

        apiOne.getAgentsList()
            .then(function successCallback(response) {

               var apiData = response.data.data;

               console.log(apiData);
               
               for(x in apiData){
               
                    $scope.allAgentName = apiData[x].firstName + " " + apiData[x].lastName; 
               
                    var createdObject = {agentName : $scope.allAgentName , agentUserName : apiData[x].userName};
                    
                    $scope.agentsNameList.push(createdObject);
               
               }
            
            console.log($scope.agentsNameList);
        
        }, function errorCallback(response) {

        }); 

    }
    
    $scope.agentsList();

    //progress linear on closed tickets page
    var j= 0, counter = 0;

    $scope.mode = 'determinate';
    $scope.activated = false;
    $scope.determinateValue = 100;
    $scope.determinateValue2 = 100;

    $scope.showList = [ ];

    /**
     * Turn off or on the 5 themed loaders
     */
    $scope.toggleActivation = function() {
        if ( !$scope.activated ) $scope.showList = [ ];
        if (  $scope.activated ) {
          j = counter = 0;
          $scope.determinateValue = 100;
        }
    };

    $interval(function() {
      $scope.determinateValue += 1;
      $scope.determinateValue2 += 1.5;

      if ($scope.determinateValue > 100) $scope.determinateValue = 100;

        // Incrementally start animation the five (5) Indeterminate,
        // themed progress circular bars

        if ( (j < 2) && !$scope.showList[j] && $scope.activated ) {
          $scope.showList[j] = false;
        }
        if ( counter++ % 4 === 0 ) j++;

        // Show the indicator in the "Used within Containers" after 200ms delay
        if ( j == 2 ) $scope.contained = "determinate";

    }, 100, 0, false);

    $interval(function() {
      $scope.mode = ($scope.mode == 'determinate' ? 'determinate' : 'determinate');
    }, 7200, 0, false);
    //progress linear end






    //hours
    $scope.hoursArray = [];
    for(i=1;i<=12;i++){
        $scope.hoursArray.push(i);
    }
    //minute
    $scope.minuteArray = [];
    for(i=0;i<60;i++){
        $scope.minuteArray.push(i);
    }

    $scope.rejectCall = function(){
        $mdDialog.cancel();
    }
    /*$scope.rejectCall = function(){

        apiOne.rejectCall($scope.prackrToken)
            .then(function successCallback(response) {
                console.log("success");
                console.log(response);

            }, function errorCallback(response) {
                console.log("error");
                console.log(response);
        }); 

    $scope.ticketIdForCallLog = "";

    $mdDialog.cancel();

    }*/
    var callFlag = false;
    $scope.pa2 = 0;
    $scope.actionToCall = "Dialing";
    var URL = "https://konnect.knowlarity.com:8100/update-stream/259c4122-f85c-42e3-97f6-e6b02e9e9a34/konnect"
    var source = new EventSource(URL);
    source.onmessage = function (event) {

        var data = JSON.parse(event.data);
        console.log(data);
        console.log(data.event_type);
        if(data.event_type=='HANGUP' && callFlag == false){
            callFlag = true;
            $scope.pa2 = '1';
            console.log("hanged up by user");
            $mdDialog.cancel();

        }
        if(data.event_type=='AGENT_CALL'){
            /*$scope.pa2 = 'AGENT_CALL';*/
            $scope.actionToCall = "Calling";
            /*$scope.$watch('actionToCall', function() {
                alert('hey, actionToCall has changed!');
            });*/
        }
        if(data.event_type=='BRIDGE'){
            $scope.pa2 = '1';
            $scope.actionToCall = "In Progress";
            //$scope.actionToCall = "Reject";
            /*$scope.$watch('actionToCall', function() {
                alert('hey, actionToCall has changed!');
            });*/
        }
        if(data.event_type=='HANGUP'){
            $scope.pa2 = '1';
            $scope.actionToCall = "HANGUP";
            console.log("hang up by shweta");
            /*$scope.$watch('actionToCall', function() {
                alert('hey, actionToCall has changed!');
            });*/
        }
        console.log($scope.actionToCall);
        /*console.log('Received an event .......');*/
        /*if(data.event_type == 'HANGUP'){
            
            var ticketIdForCall = {
                'ticketId' : $scope.ticketIdForCallLog,
                'typeName' : $scope.typeName
            };
            apiOne.rejectCall($scope.prackrToken,ticketIdForCall)
            .then(function successCallback(response) {
                console.log("success");
                console.log(response);

            }, function errorCallback(response) {
                console.log("error");
                console.log(response);
        });
            
        }*/
    }
}]);
