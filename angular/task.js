console.log("call.js");
myApp.controller('taskController', ['$http', 'apiOne', '$mdDialog', '$mdMedia', '$scope', '$mdToast', '$timeout', '$q', '$log', 'FileUploader', function($http, apiOne, $mdDialog, $mdMedia, $scope, $mdToast, $timeout, $q, $log, FileUploader) {
    //.controller('dashboardController', dashboardController);

    /** @ngInject */
    //function dashboardController(api) {
    /*var $scope = $scope;*/

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
                    
                    /*Cookies.set('prackrAuth','nothing');
                }
                if(Cookies.get('prackrAuth') == 'nothing'){
                    Cookies.remove('prackrAuth');
                    if(window.location != 'login-view.html'){
                        window.location = 'login-view.html'
                    }*/
                           
                }
            }, function errorCallback(response) {

    }); 
        //mark ticket close
    $scope.markTicketClose = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        $scope.prackrToken = Cookies.get('prackrAuth');
        $scope.tId = Cookies.get('selectedTicketId');
        alert($scope.tId);
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
    //get ticket id for passing in add tasks
    $scope.setTicketId = function(ticketId) {
        console.log("hi");
        Cookies.set('selectedTicketId', ticketId);
    }

    /*$scope.getTicketId = function(){
        console.log("ticketId");
        console.log($scope.ticketId);
        return $scope.ticketId;
    }*/


    // Data
    //$scope.helloText = SampleData.data.helloText;
    $scope.token = Cookies.get('prackrAuth');
    var uploader = $scope.uploader = new FileUploader({

        url: 'http://testapi.prackr.com/tickets/upload/file?myToken=' + $scope.token
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

    //Complaints Type
    $scope.complaintsType = [
        { complaint: "ATM Issues" },
        { complaint: "IMPS Issues" },
        { complaint: "Complaint on Staff" },
        { complaint: "Fund Transfer Issues" },
    ];


    //Product Interested in

    $scope.productInterested = [
        { productName: "Bank Charges" },
        { productName: "Rate of interest" },
        { productName: "Fund transfer via RTGS & NEFT" },
        { productName: "Direct Benefit transfer" },
        { productName: "Cash transactions post 7.30PM" },
    ];

    //Reason for Loan
    $scope.reasonsForLoan = [
        { reason: "Agriculture Allied Activities Loan" },
        { reason: "Agriculture Allied Business loan" },
        { reason: "Agriculture Gold Loan" },
        { reason: "Business Gold Loan" },
        { reason: "Business Loan" },
        { reason: "Consumption Loan" },
        { reason: "Dhanya Laxmi Key loan" },
        { reason: "Education Loan" },
        { reason: "Gruha Vaibhava Loan" },
        { reason: "Mortgage Loans" },
        { reason: "Overdraft/Cash Credit Loans" },
        { reason: "Prime Gold Loan" },
        { reason: "Small Scale Industries loans" },
        { reason: "Site Purchase Loan" },
        { reason: "Suco Business Loan (Gold as security)" },
        { reason: "Used/pre-owned Vehicles 3 & 4 wheelers up to Rs.5 lakhs" },
        { reason: "Vehicle Loan up to Rs.2 lakhs" },
        { reason: "Vehicle loan more than Rs. 2lakhs, 4 wheelers" },
        { reason: "BILL/HUNDI DISCOUNTS" },
        { reason: "Cheque Discount( Govt Cheques and DDs)" },
        { reason: "Temporary Overdrawing" },
        { reason: "Loan on Fixed Deposit & Loan on Rd" },
    ];


    //annual income declaration
    $scope.annualIncome = [
        { incomeRange: "below 1 lakh annually" },
        { incomeRange: "above 1 lakh annually" },
        { incomeRange: "above 5 lakh annually" },
        { incomeRange: "above 10 lakh annually" },
        { incomeRange: "above 15 lakh annually" },
        { incomeRange: "above 20 lakh annually" },
        { incomeRange: "above 50 lakh annually" },
        { incomeRange: "above 1 crore annually" }
    ];


    //occupation declaration

    $scope.occupationData = [
        { occupationName: "Air Force" },
        { occupationName: "Business Person" },
        { occupationName: "Camera Man" },
        { occupationName: "Charity / Social Work" },
        { occupationName: "Chartered Accountant" },
        { occupationName: "College / University Teacher" },
        { occupationName: "Diplomat" },
        { occupationName: "Doctor" },
        { occupationName: "Engineer" },
        { occupationName: "Film Producer" },
        { occupationName: "Government Service" },
        { occupationName: "House Wife" },
        { occupationName: "Journalist" },
        { occupationName: "Labour" },
        { occupationName: "Lawyer" },
        { occupationName: "Media" },
        { occupationName: "Military" },
        { occupationName: "Missionary" },
        { occupationName: "Navy" },
        { occupationName: "News Broadcaster" },
        { occupationName: "Official" },
        { occupationName: "Others" },
        { occupationName: "Police" },
        { occupationName: "Press" },
        { occupationName: "Private Service" },
        { occupationName: "Publisher" },
        { occupationName: "Reporter" },
        { occupationName: "Researcher" },
        { occupationName: "Retired" },
        { occupationName: "Sea Man" },
        { occupationName: "Self-Employed / Freelancer" },
        { occupationName: "Student" },
        { occupationName: "Trader" },
        { occupationName: "TV Producer" },
        { occupationName: "Unemployed" },
        { occupationName: "UN Official" },
        { occupationName: "Worker" },
        { occupationName: "Writer" },
    ];

    //branch declaration

    $scope.branch = [
        { branchName: "Sindhanur" },
        { branchName: "Gangavathi" },
        { branchName: "Raichur" },
        { branchName: "Raichur Vasavi Nagar" },
        { branchName: "Koppa" },
        { branchName: "Bellary" },
        { branchName: "Bellary Royal circle" },
        { branchName: "Hospet" },
        { branchName: "Hubli" },
        { branchName: "Siruguppa" },
        { branchName: "Lingasur" },
        { branchName: "YADGIRI" },
        { branchName: "KESHWAPUR" },
        { branchName: "CHITRADURGA" },
        { branchName: "CHALLAKERE" },
        { branchName: "MANVI" },
        { branchName: "DHARWAD" },
        { branchName: "SHAHAPUR" }
    ];

    $scope.typeOfTicket = [
        {ticketName : "Account Opening", ticketId : "BkH0YQqal"},
        {ticketName : "Loan Enquiry", ticketId : "Sy4ecmcTx"},
        {ticketName : "Product Enquiry", ticketId : "HJ_-9mqpx"},
        {ticketName : "complaints", ticketId : "BkDf9m56x"},
        {ticketName : "Issue New Card", ticketId : "rJHX5X96x"},
        {ticketName : "Lost Card", ticketId : "SyTm9X9px"}
    ];

    //account type declaration


    $scope.accountType = [
        { name: "CURRENT ACCOUNTS" },
        { name: "SAVING ACCOUNTS" },
        { name: "RECURRING DEPOSITS / ACCOUNTS" },
        { name: "FIXED DEPOSITS / ACCOUNTS" }
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

            apiOne.getMyCallTickets(userToken)
                .then(function successCallback(response) {

                    $scope.myTickets = response.data.data;
                    console.log($scope.myTickets);
                }, function errorCallback(response) {

                    console.log(response);

                });


        }

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
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };
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
                fullscreen: useFullScreen
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };
    /*$scope.showAccountOpening = function(ev) {
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
                fullscreen: useFullScreen
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
        
    };*/

    // For Loan ENquiry Modal
    /*$scope.showLoanEnquiry = function(ev) {
        $mdDialog.cancel();
        $scope.ticketType = "loanEnquiry";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/loanEnquiry.html',
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

    };*/

    // For Product Enquiry Modal
    /*$scope.productEnquiry = function(ev) {
        $mdDialog.cancel();
        $scope.ticketType = "productEnquiry";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/productEnquiry.html',
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

    };*/
    // For Complaints & Suggestions Modal
    /*$scope.complaints = function(ev) {
        $mdDialog.cancel();
        $scope.ticketType = "complaints";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/complaints.html',
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

    };*/

    // For Issue New Card Modal
    /*$scope.issueNewCard = function(ev) {
        $mdDialog.cancel();
        $scope.ticketType = "issueNewCard";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/newCard.html',
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

    };*/

    // For Issue New Card Modal
    /*$scope.lostCard = function(ev) {
        $mdDialog.cancel();
        $scope.ticketType = "lostCard";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/lostCard.html',
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

    };*/


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

    /*$scope.accountOpeningData = function() {
        $mdToast.show(
            $mdToast.simple()
            .textContent("Ticket created successfully")
            .hideDelay(3000)
        );
        var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
        var firstName = { attribute: "firstName", value: $scope.firstName };
        var lastName = { attribute: "lastName", value: $scope.lastName };
        var city = { attribute: "city", value: $scope.city };
        var address = { attribute: "address", value: $scope.address };
        var occupation = { attribute: "occupation", value: $scope.occupation };
        var branch = { attribute: "branch", value: $scope.branch };
        var accountType = { attribute: "accountType", value: $scope.accountType };

        var arr = [];
        arr.push(mobileNumber);
        arr.push(firstName);
        arr.push(lastName);
        arr.push(city);
        arr.push(address);
        arr.push(occupation);
        arr.push(branch);
        arr.push(accountType);

        var userData = arr;

        var myData = {

            name: "Opening Account",
            ticketData: angular.toJson(userData),
            typeName: "accountOpening"

        }
        console.log(myData);

        var prackrToken = Cookies.get('prackrAuth');
        console.log(prackrToken);

        apiOne.createSingleTicket(myData, prackrToken)
            .then(function successCallback(response) {


                console.log("$scope is the response");
                console.log(response);
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });
    }
    $scope.loanEnquiryData = function() {
        $mdToast.show(
            $mdToast.simple()
            .textContent("Ticket created successfully")
            .hideDelay(3000)
        );
        var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
        var firstName = { attribute: "firstName", value: $scope.firstName };
        var lastName = { attribute: "lastName", value: $scope.lastName };
        var city = { attribute: "city", value: $scope.city };
        var address = { attribute: "address", value: $scope.address };
        var occupation = { attribute: "occupation", value: $scope.occupation };
        var annualIncome = { attribute: "annualIncome", value: $scope.annualIncome };
        var reasonForLoan = { attribute: "reasonForLoan", value: $scope.reasonForLoan };
        var loanAmount = { attribute: "loanAmount", value: $scope.loanAmount };
        var emiCapacity = { attribute: "emiCapacity", value: $scope.emiCapacity };

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

        var userData = arr;
        var myData = {

            name: "Loan Enquiry",
            ticketData: angular.toJson(userData),
            typeName: "loanEnquiry"

        }
        console.log(myData);

        var prackrToken = Cookies.get('prackrAuth');
        console.log(prackrToken);

        apiOne.createSingleTicket(myData, prackrToken)
            .then(function successCallback(response) {


                console.log("$scope is the response");
                console.log(response);
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.productEnquiryData = function() {
        $mdToast.show(
            $mdToast.simple()
            .textContent("Ticket created successfully")
            .hideDelay(3000)
        );
        var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
        var firstName = { attribute: "firstName", value: $scope.firstName };
        var lastName = { attribute: "lastName", value: $scope.lastName };
        var city = { attribute: "city", value: $scope.city };
        var address = { attribute: "address", value: $scope.address };
        var occupation = { attribute: "occupation", value: $scope.occupation };
        var interestsIn = { attribute: "interestsIn", value: $scope.interestsIn };
        var alternateContact = { attribute: "alternateContact", value: $scope.alternateContact };
        var notesTags = { attribute: "notesTags", value: $scope.notesTags };

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

        var userData = arr;
        var myData = {

            name: "Product Enquiry",
            ticketData: angular.toJson(userData),
            typeName: "productEnquiry"

        }
        console.log(myData);

        var prackrToken = Cookies.get('prackrAuth');
        console.log(prackrToken);

        apiOne.createSingleTicket(myData, prackrToken)
            .then(function successCallback(response) {


                console.log("$scope is the response");
                console.log(response);
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.complaintsData = function() {
        $mdToast.show(
            $mdToast.simple()
            .textContent("Ticket created successfully")
            .hideDelay(3000)
        );
        var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
        var firstName = { attribute: "firstName", value: $scope.firstName };
        var lastName = { attribute: "lastName", value: $scope.lastName };
        var city = { attribute: "city", value: $scope.city };
        var address = { attribute: "address", value: $scope.address };
        var occupation = { attribute: "occupation", value: $scope.occupation };
        var complaintType = { attribute: "complaintType", value: $scope.complaintType };
        var notesTags = { attribute: "notesTags", value: $scope.notesTags };
        var alternateContact = { attribute: "alternateContact", value: $scope.alternateContact };

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

        var userData = arr;
        var myData = {

            name: "Complaints",
            ticketData: angular.toJson(userData),
            typeName: "complaints"

        }
        console.log(myData);

        var prackrToken = Cookies.get('prackrAuth');
        console.log(prackrToken);

        apiOne.createSingleTicket(myData, prackrToken)
            .then(function successCallback(response) {


                console.log("$scope is the response");
                console.log(response);
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.newCardData = function() {
        $mdToast.show(
            $mdToast.simple()
            .textContent("Ticket created successfully")
            .hideDelay(3000)
        );
        var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
        var firstName = { attribute: "firstName", value: $scope.firstName };
        var lastName = { attribute: "lastName", value: $scope.lastName };
        var city = { attribute: "city", value: $scope.city };
        var address = { attribute: "address", value: $scope.address };
        var occupation = { attribute: "occupation", value: $scope.occupation };
        var accountNumber = { attribute: "accountNumber", value: $scope.accountNumber };
        var notesTags = { attribute: "notesTags", value: $scope.notesTags };
        var alternateContact = { attribute: "alternateContact", value: $scope.alternateContact };

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

        var userData = arr;
        var myData = {

            name: "Issue New Card",
            ticketData: angular.toJson(userData),
            typeName: "issueNewCard"

        }
        console.log(myData);

        var prackrToken = Cookies.get('prackrAuth');
        console.log(prackrToken);

        apiOne.createSingleTicket(myData, prackrToken)
            .then(function successCallback(response) {


                console.log("$scope is the response");
                console.log(response);
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.lostCardTicketData = function() {
            $mdToast.show(
                $mdToast.simple()
                .textContent("Ticket created successfully")
                .hideDelay(3000)
            );
            var mobileNumber = { attribute: "mobileNumber", value: $scope.mobileNumber };
            var firstName = { attribute: "firstName", value: $scope.firstName };
            var lastName = { attribute: "lastName", value: $scope.lastName };
            var city = { attribute: "city", value: $scope.city };
            var address = { attribute: "address", value: $scope.address };
            var occupation = { attribute: "occupation", value: $scope.occupation };
            var accountNumber = { attribute: "accountNumber", value: $scope.accountNumber };
            var motherMaidenName = { attribute: "motherMaidenName", value: $scope.motherMaidenName };
            var dob = { attribute: "dob", value: $scope.dob };
            var notesTags = { attribute: "notesTags", value: $scope.notesTags };
            var alternateContact = { attribute: "alternateContact", value: $scope.alternateContact };

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

            var userData = arr;
            var myData = {

                name: "Lost Card",
                ticketData: angular.toJson(userData),
                typeName: "lostCard"

            }
            console.log(myData);

            var prackrToken = Cookies.get('prackrAuth');
            console.log(prackrToken);

            apiOne.createSingleTicket(myData, prackrToken)
                .then(function successCallback(response) {


                    console.log("$scope is the response");
                    console.log(response);
                    //window.location = 'ticket-view?ticketId='+$scope.ticketId
                }, function errorCallback(response) {

                    console.log(response);

                });
        }*/
        //add atsk modal
    /*$scope.addTicketsTask = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/addTicketsTask.html',
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

    $scope.toggleAddTask = function() {
        $('.toggleDiv').toggle();
    };


    //cretat ticket
    $scope.createTicket = function() {
        var taskName = { attribute: "taskName", value: $scope.taskName };
        var agentName = { attribute: "agentName", value: $scope.agentName };
        var priority = { attribute: "priority", value: $scope.priority };
        var timeForAnswer = { attribute: "timeForAnswer", value: $scope.timeForAnswer };
        var note = { attribute: "note", value: $scope.enterNote };
        var initiateBy = { attribute: "initiateBy", value: $scope.initiateBy };
        var triggerParameter = { attribute: "triggerParameter", value: $scope.triggerParameter };
        var form = { attribute: "form", value: $scope.form };
        var message = { attribute: "message", value: $scope.enterMessage };
        var fileName = { attribute: "fileLink", value: $scope.fileName };

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

        var tasks = { tasks: angular.toJson(userData) }
        var selectedTicketId = Cookies.get('selectedTicketId');
        var prackrToken = Cookies.get('prackrAuth');


        apiOne.createSingleTask(tasks, selectedTicketId, prackrToken)
            .then(function successCallback(response) {

                $scope.fileName = "";
                console.log("$scope is the response");
                console.log(response.data.data);
                //window.location = 'ticket-view?ticketId='+$scope.ticketId
            }, function errorCallback(response) {

                console.log(response);

            });

    }*/


    /* Test for sockets begin */

  /*  $scope.socketData = function(data) {

        console.log(data);

        console.log("Hello world! Successful in calling this function from the script tag");

        $(function() {
            $("#dialog").dialog()
        });
    }

*/


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




    



    $scope.makeOutboundCall = function(ev,number) {
        $scope.outBoundCallUserNumber = number;
        console.log($scope.outBoundCallUserNumber);
        $scope.actionToCall = "Calling";
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/dialed-call.html',
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

//inbound call

$scope.socketData = function(data) {

        Cookies.set('type','call');
        
        console.log(data);

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
            $(function() {
                /*$("#dialog").dialog()*/
                $scope.openCallModal();
            });
        }
    }


    $scope.openCallModal = function(ev) {
        console.log("hell3");
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

     $scope.getCallByWeek = function(){

        $scope.ngDisabledValueForProgressBar = false;
        
        $scope.prackrToken = Cookies.get('prackrAuth');
        
        apiOne.getCallByWeek($scope.prackrToken)
            .then(function successCallback(response) {
                
                $scope.myTickets = response.data.data;

                $scope.ngDisabledValueForProgressBar = true;

            }, function errorCallback(response) {

                console.log(response);

            });
    }


    $scope.getCallByMonth = function(){

        $scope.ngDisabledValueForProgressBar = false;

        $scope.prackrToken = Cookies.get('prackrAuth');

        apiOne.getCallByMonth($scope.prackrToken)
            .then(function successCallback(response) {
                
                $scope.myTickets = response.data.data;

                $scope.ngDisabledValueForProgressBar = true;

            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.getCallByYear = function(){
        
        $scope.ngDisabledValueForProgressBar = false;

        $scope.prackrToken = Cookies.get('prackrAuth');
        
        apiOne.getCallByYear($scope.prackrToken)
            .then(function successCallback(response) {
        
               $scope.myTickets = response.data.data;

               $scope.ngDisabledValueForProgressBar = true;

            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.getCallLogsByWeek = function(){

        $scope.ngDisabledValueForProgressBar = false;

        $scope.prackrToken = Cookies.get('prackrAuth');
        
        apiOne.getCallLogsByWeek($scope.prackrToken)
            .then(function successCallback(response) {
        
                $scope.callDetails = response.data.data;

                $scope.ngDisabledValueForProgressBar = true;

            }, function errorCallback(response) {

                console.log(response);

            });
    }


    $scope.getCallLogsByMonth = function(){
        
        $scope.ngDisabledValueForProgressBar = false;

        $scope.prackrToken = Cookies.get('prackrAuth');
        
        apiOne.getCallLogsByWeek($scope.prackrToken)
            .then(function successCallback(response) {
        
                $scope.callDetails = response.data.data;

                $scope.ngDisabledValueForProgressBar = true;

            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.getCallLogsByYear = function(){
        
        $scope.ngDisabledValueForProgressBar = false;

        $scope.prackrToken = Cookies.get('prackrAuth');

        apiOne.getCallLogsByYear($scope.prackrToken)
            .then(function successCallback(response) {
               
               $scope.callDetails = response.data.data;

               $scope.ngDisabledValueForProgressBar = true;

            }, function errorCallback(response) {

                console.log(response);

            });
    }


    $scope.selectCallLogsByRange = function(dateRange){

        if(dateRange.includes("to")){

            $scope.ngDisabledValueForProgressBar = false;

            var range = dateRange.split(" to ");
            
            apiOne.selectCallLogsByRange($scope.prackrToken,range[0],range[1])
                .then(function successCallback(response) {
                
                    $scope.callDetails = response.data.data;

                    $scope.ngDisabledValueForProgressBar = true;

                }, function errorCallback(response) {

                    console.log(response);

            });

        }
    }

    $scope.selectCallTicketsByRange = function(dateRange){

        if(dateRange.includes("to")){

            $scope.ngDisabledValueForProgressBar = false;

            var range = dateRange.split(" to ");

            var startDateByRange = new Date(range[0]);

            var endDateByRange = new Date(range[1]);
            
            apiOne.getCallTicketByRange($scope.prackrToken,startDateByRange,endDateByRange)
                .then(function successCallback(response) {
            
                    $scope.myTickets = response.data.data;

                    $scope.ngDisabledValueForProgressBar = true;

                }, function errorCallback(response) {

                    console.log(response);

                });

        }
  }

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
        $scope.selectCallType = function(callTypeData) {

            if (callTypeData == '') {
                window.location.reload();
            } else {
                $scope.callTypeData = callTypeData;
                console.log($scope.callTypeData);
                
            }

        }


    //}

    //get call audio
    $scope.callForAudio = function(ticketId){

        $scope.callAudio = "hello";
        apiOne.callForAudioCall($scope.prackrToken,ticketId)
            .then(function successCallback(response) {
                
                console.log(response);

            }, function errorCallback(response) {
                console.log("error");
                console.log(response);
    }); 
    /*console.log(ticketId);*/
    }





}]);
