myApp.controller('userManagement', ['$http', 'apiOne', '$mdDialog', '$route','$mdMedia', '$scope', '$mdToast', '$timeout', '$q', '$log', 'FileUploader','$interval', function($http, apiOne,  $mdDialog, $route, $mdMedia, $scope, $mdToast, $timeout, $q, $log, FileUploader, $interval) {
    //.controller('dashboardController', dashboardController);

    /** @ngInject */
    //function dashboardController(api) {
    /*var $scope = $scope;*/




    /*var uploader2 = $scope.uploader2 = new FileUploader({

        url: 'http://testapi.prackr.com/tickets/upload/file?myToken='+$scope.token
    });
    uploader2.onAfterAddingFile = function(fileItem) {
        console.log(fileItem);
        $scope.url = fileItem.file.name;    
        var csvFile = csvJSON($scope.url);
        console.log("done");

    }*//*
    function callfunction(){
        console.log("hiii");
    }*//*
    function readTextFile(file)
    {
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4)
            {
                if(rawFile.status === 200 || rawFile.status == 0)
                {
                    var allText = rawFile.responseText;
                    csvJSON(allText);
                }
            }
        }
        rawFile.send(null);
    }*/
    $scope.abbb = function() {
        var fileInput = document.getElementById('fileInput');
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        
        fileInput.addEventListener('change', function(e) {
            var file = fileInput.files[0];
            var textType = /text.*/;

            if (file.type.match(textType)) {
                var reader = new FileReader();

                reader.onload = function(e) {
                    /*fileDisplayArea.value = reader.result;*/
                    $scope.csvJSON(reader.result);
                }

                reader.readAsText(file); 

                } else {
                    $scope.resultOfUpload = "File not supported!";
                }
            });
    }
    
    $scope.csvJSON = function(csv){

        /*console.log($scope.uploadedFile);

        var csv = $scope.uploadedFile;*/
        console.log(csv);

          var lines=csv.split("\n");

          var result = [];


          var headers=lines[0].split(",");

          for(var i=1;i<lines.length - 1;i++){

              var obj = {};
              var currentline=lines[i].split(",");

              for(var j=0;j<headers.length;j++){
                  obj[headers[j]] = currentline[j];
              }

              result.push(obj);

          }
          
          //return result; //JavaScript object
          console.log(result);
          var myData = {
            allData : angular.toJson(result)
          }
          console.log(myData);
          apiOne.saveFromCSV(myData)
            .then(function successCallback(response) {
                console.log(response);
            }, function errorCallback(response) {
                console.log(response);
            });

          // console.log(JSON.stringify(result)); //JSON


        }








    //code for redirecting user to login view in case of logout
    $scope.prackrToken = Cookies.get('prackrAuth');
    apiOne.getCurrentUser($scope.prackrToken)
        .then(function successCallback(response) {
            console.log(response.data.status);
            token = Cookies.get('prackrAuth');
            if (response.data.status == 403) {
                /*$scope.logout();*/
                if (token != null || token != '' || token != undefined) {
                    Cookies.remove('prackrAuth');
                    window.location = 'login-view.html';
                }
            }
        }, function errorCallback(response) {});

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
        { ticketName: "Account Opening", ticketId: "BkH0YQqal" },
        { ticketName: "Loan Enquiry", ticketId: "Sy4ecmcTx" },
        { ticketName: "Product Enquiry", ticketId: "HJ_-9mqpx" },
        { ticketName: "complaints", ticketId: "BkDf9m56x" },
        { ticketName: "Issue New Card", ticketId: "rJHX5X96x" },
        { ticketName: "Lost Card", ticketId: "SyTm9X9px" }
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


    //Toggle the add task section
    $scope.toggleAddTask = function() {
        $('.toggleDiv').toggle();
    }



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

                $scope.userName = $scope.userData.userName;

                $scope.usersName = $scope.userData.firstName + " " + $scope.userData.lastName;

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
        Cookies.set('type', 'atDesk');
        console.log("select function");
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/new-ticket.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                  modalData: ''
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };



    function DialogController($scope, $mdDialog, modalData) {
        $scope.modalData = modalData;
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


    //inbound call



    $scope.selectBranch = function(branchData) {

        if (branchData == '') {
            window.location.reload();
        } else {
            $scope.branchNameData = branchData;
            console.log($scope.branchNameData)
                ////console.log($scope.categoryFilter)
            $scope.branchNameData2 = {
                "attribute": "branch",
                "value": $scope.branchNameData
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

    //for showing user

    $scope.getAllUsers = function() {

            apiOne.getAllUser()
                .then(function successCallback(response) {
                    $scope.userDetails = response.data.data;

                    console.log($scope.userDetails);

                }, function errorCallback(response) {

                    console.log(response);

                });

        } //getUser end

    //calling show user function to get all users
    $scope.getAllUsers();

    //for deleting user

    $scope.deleteUser = function(userName) {

        apiOne.deleteOneUser(userName)
            .then(function successCallback(response) {

                console.log(response);
                $route.reload();

            }, function errorCallback(response) {

                console.log(response);

            });
    }


    //for add user dialogue

    $scope.addUser = function(ev) {
        $scope.departments = [];

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        console.log("in try dialogue");
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/team-view.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new(),
                locals: {
                  modalData: ''
                },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    //for adding user
    $scope.addUserToBase = function() {

        document.getElementById('sendInviteButton').disabled = true;
        var departmentData = angular.toJson($scope.departments);

        var myData = {
            email: $scope.emailAddress,
            mobileNumber: $scope.phoneNumber,
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            title: $scope.title,
            departmentData: departmentData,
            branch: $scope.selectedBranch.originalObject.branchId,
            level: $scope.level,
            userImageData: $scope.userImageData
        }
        $scope.userImageData = "";
        console.log(myData);

        apiOne.addUser(myData)
            .then(function successCallback(response) {
                $mdDialog.cancel();

                var pn = $scope.phoneNumber;
                var messageToUser = "Dear " + $scope.firstName + " " + $scope.lastName + ", You have been added as an agent at suco bank. You can set your password at https://prac.kr Thank You";
                var prackrToken = Cookies.get('prackrAuth');


                $scope.nameOfUser = $scope.firstName +" "+$scope.lastName;
                console.log($scope.nameOfUser);
                var mailData = {
                    to : $scope.emailAddress,
                    subject : "Account created at SUCO Bank",
                    name : $scope.nameOfUser,
                    email : $scope.emailAddress
                }
                console.log(mailData);
                apiOne.sendMailToUser(prackrToken, mailData)
                .then(function successCallback(response){
                    console.log(response);
                }, function errorCallback(){
                    console.log(response);
                });

                var myData = {
                    number: pn,
                    message: messageToUser
                };
                apiOne.sendSmsToUser(prackrToken, myData)
                .then(function successCallback(response) {

                    console.log("in sms success");
                    console.log(response.data.data);
                }, function errorCallback(response) {

                    console.log(response);

                });

               

                    console.log("$scope.userDetails");
                    console.log($scope.userDetails);
                    $mdToast.show(
                        $mdToast.simple()
                        .textContent("Invite Sent successfully")
                        .hideDelay(3000)
                    );
                    $scope.userDetails.push(response.data.data);
                    $route.reload();
                console.log("response is");
                console.log(response);

            }, function errorCallback(response) {

                console.log(response);

            });

    }

    //for open edit modal
    $scope.openEditModal = function(userName, ev) {
        apiOne.getOneUser(userName)
            .then(function successCallback(response) {

                console.log(response.data.data);
                $scope.userDetail = response.data.data;

                $scope.userNameDetail = $scope.userDetail.userName;
                $scope.firstName = $scope.userDetail.firstName;
                $scope.lastName = $scope.userDetail.lastName;
                $scope.phoneNumber = $scope.userDetail.mobileNumber;
                $scope.emailAddress = $scope.userDetail.email;
                $scope.title = $scope.userDetail.title;
                $scope.branchName = $scope.userDetail.branch;
                $scope.category = $scope.userDetail.category;
                $scope.level = $scope.userDetail.level;
                $scope.departments = $scope.userDetail.departments;
                if(lastUpdated[0] != undefined || lastUpdated[0] != null || lastUpdated[0] != ''){
                    $scope.lastUpdateTime = $scope.userDetail.lastUpdated[0].created;
                    $scope.lastUpdateBy = $scope.userDetail.lastUpdated[0].userName;
                }
                console.log($scope.userDetail.lastUpdated);
                var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;

                $mdDialog.show({
                        controller: DialogController,
                        templateUrl: 'views/team-edit.html',
                        parent: angular.element(document.body),
                        targetEvent: ev,
                        clickOutsideToClose: false,
                        fullscreen: useFullScreen,
                        scope: $scope.$new(),
                        locals: {
                          modalData: ''
                        },
                    })
                    .then(function(answer) {
                        $scope.status = 'You said the information was "' + answer + '".';
                    }, function() {
                        $scope.status = 'You cancelled the dialog.';
                    });

            }, function errorCallback(response) {

                console.log(response);

            });

    }

    //update users details
    $scope.updateUser = function() {

        var lastUpdateDetails = [];
        var lastUpdatedAt = { lastUpdatedAt: Date.now() };
        var lastUpdatedBy = { lastUpdatedBy: $scope.usersName };

        var lastUpdateDetail = {};
        var userName = $scope.userNameDetail;

        console.log(lastUpdateDetail);
        if ($scope.userImageData == null || $scope.userImageData == undefined || $scope.userImageData == '') {

        } else {
            var imageData = $scope.userImageData;
        }

        var departmentData = $scope.departments.toString();
        console.log(departmentData);
        var myData = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            title: $scope.title,
            departmentData: departmentData,
            branch: $scope.branchName,
            level: $scope.level,
            lastUpdated: lastUpdateDetail,
            userImageData: imageData
        }
        console.log(myData);

        apiOne.updateUser(myData, userName, $scope.prackrToken)
            .then(function successCallback(response) {
                $mdDialog.cancel();
                console.log(response);
            }, function errorCallback(response) {

                console.log(response);

            });
    }


    $scope.token = Cookies.get('prackrAuth');
    var uploader = $scope.uploader = new FileUploader({

        url: 'http://testapi.prackr.com/users/upload/file?myToken=' + $scope.token
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
        $scope.completeFilesIds = response.data._id;
    };
    uploader.onCompleteAll = function() {

        console.log("onCompleteAll");


        $scope.userImageData = $scope.completeFilesIds;

    };


    //add level modal open

    $scope.openLevel = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        /*$scope.items = ['Banana', 'Apple', 'Cherry', 'Orange'];*/
        $scope.selected = [];
        $scope.abc = [];
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/level-view.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new(),
                locals: {
                      modalData: ''
                    },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    //add level to database

    $scope.addNewLevel = function() {

        var levelName = $scope.levelName;
        var levelDescription = $scope.levelDescription;


        if ($scope.canUseWebApp == undefined || $scope.canUseWebApp == false) {
            var canUseWebApp = { attribute: "canUseWebApp", value: false };
        } else {
            var canUseWebApp = { attribute: "canUseWebApp", value: true };
        }

        if ($scope.canAddEditUsers == undefined || $scope.canAddEditUsers == false) {
            var canAddEditUsers = { attribute: "canAddEditUsers", value: false };
        } else {
            var canAddEditUsers = { attribute: "canAddEditUsers", value: true };
        }

        if ($scope.canAddEditStaffForms == undefined || $scope.canAddEditStaffForms == false) {
            var canAddEditStaffForms = { attribute: "canAddEditStaffForms", value: false };
        } else {
            var canAddEditStaffForms = { attribute: "canAddEditStaffForms", value: true };
        }

        if ($scope.canAddEditCustomerForms == undefined || $scope.canAddEditCustomerForms == false) {
            var canAddEditCustomerForms = { attribute: "canAddEditCustomerForms", value: false };
        } else {
            var canAddEditCustomerForms = { attribute: "canAddEditCustomerForms", value: true };
        }

        if ($scope.canAddEditTriggerForms == undefined || $scope.canAddEditTriggerForms == false) {
            var canAddEditTriggerForms = { attribute: "canAddEditTriggerForms", value: false };
        } else {
            var canAddEditTriggerForms = { attribute: "canAddEditTriggerForms", value: true };
        }

        if ($scope.canAddEditAutomation == undefined || $scope.canAddEditAutomation == false) {
            var canAddEditAutomation = { attribute: "canAddEditAutomation", value: false };
        } else {
            var canAddEditAutomation = { attribute: "canAddEditAutomation", value: true };
        }

        if ($scope.canViewTicketsOnly == undefined || $scope.canViewTicketsOnly == false) {
            var canViewTicketsOnly = { attribute: "canViewTicketsOnly", value: false };
        } else {
            var canViewTicketsOnly = { attribute: "canViewTicketsOnly", value: true };
        }

        if ($scope.canViewTicketsFromCalls == undefined || $scope.canViewTicketsFromCalls == false) {
            var canViewTicketsFromCalls = { attribute: "canViewTicketsFromCalls", value: false };
        } else {
            var canViewTicketsFromCalls = { attribute: "canViewTicketsFromCalls", value: true };
        }

        if ($scope.canTakeTicketsFromAtDesk == undefined || $scope.canTakeTicketsFromAtDesk == false) {
            var canTakeTicketsFromAtDesk = { attribute: "canTakeTicketsFromAtDesk", value: false };
        } else {
            var canTakeTicketsFromAtDesk = { attribute: "canTakeTicketsFromAtDesk", value: true };
        }

        if ($scope.canTakeTicketsFromSocialMedia == undefined || $scope.canTakeTicketsFromSocialMedia == false) {
            var canTakeTicketsFromSocialMedia = { attribute: "canTakeTicketsFromSocialMedia", value: false };
        } else {
            var canTakeTicketsFromSocialMedia = { attribute: "canTakeTicketsFromSocialMedia", value: true };
        }

        if ($scope.canTakeTicketsFromMobileApp == undefined || $scope.canTakeTicketsFromMobileApp == false) {
            var canTakeTicketsFromMobileApp = { attribute: "canTakeTicketsFromMobileApp", value: false };
        } else {
            var canTakeTicketsFromMobileApp = { attribute: "canTakeTicketsFromMobileApp", value: true };
        }

        if ($scope.canEditPersonalDetails == undefined || $scope.canEditPersonalDetails == false) {
            var canEditPersonalDetails = { attribute: "canEditPersonalDetails", value: false };
        } else {
            var canEditPersonalDetails = { attribute: "canEditPersonalDetails", value: true };
        }

        if ($scope.canEditContactInfo == undefined || $scope.canEditContactInfo == false) {
            var canEditContactInfo = { attribute: "canEditContactInfo", value: false };
        } else {
            var canEditContactInfo = { attribute: "canEditContactInfo", value: true };
        }

        if ($scope.canAccessInternalContactsOnly == undefined || $scope.canAccessInternalContactsOnly == false) {
            var canAccessInternalContactsOnly = { attribute: "canAccessInternalContactsOnly", value: false };
        } else {
            var canAccessInternalContactsOnly = { attribute: "canAccessInternalContactsOnly", value: true };
        }

        if ($scope.canAccessExternalContactsOnly == undefined || $scope.canAccessExternalContactsOnly == false) {
            var canAccessExternalContactsOnly = { attribute: "canAccessExternalContactsOnly", value: false };
        } else {
            var canAccessExternalContactsOnly = { attribute: "canAccessExternalContactsOnly", value: true };
        }

        if ($scope.canAddContact == undefined || $scope.canAddContact == false) {
            var canAddContact = { attribute: "canAddContact", value: false };
        } else {
            var canAddContact = { attribute: "canAddContact", value: true };
        }

        if ($scope.canEditContact == undefined || $scope.canEditContact == false) {
            var canEditContact = { attribute: "canEditContact", value: false };
        } else {
            var canEditContact = { attribute: "canEditContact", value: true };
        }

        if ($scope.canReadOnlyCampaigns == undefined || $scope.canReadOnlyCampaigns == false) {
            var canReadOnlyCampaigns = { attribute: "canReadOnlyCampaigns", value: false };
        } else {
            var canReadOnlyCampaigns = { attribute: "canReadOnlyCampaigns", value: true };
        }

        if ($scope.canAddEditCampaigns == undefined || $scope.canAddEditCampaigns == false) {
            var canAddEditCampaigns = { attribute: "canAddEditCampaigns", value: false };
        } else {
            var canAddEditCampaigns = { attribute: "canAddEditCampaigns", value: true };
        }

        if ($scope.canReadOnlyFAQTemplate == undefined || $scope.canReadOnlyFAQTemplate == false) {
            var canReadOnlyFAQTemplate = { attribute: "canReadOnlyFAQTemplate", value: false };
        } else {
            var canReadOnlyFAQTemplate = { attribute: "canReadOnlyFAQTemplate", value: true };
        }

        if ($scope.canAddEditFAQTemplate == undefined || $scope.canAddEditFAQTemplate == false) {
            var canAddEditFAQTemplate = { attribute: "canAddEditFAQTemplate", value: false };
        } else {
            var canAddEditFAQTemplate = { attribute: "canAddEditFAQTemplate", value: true };
        }

        if ($scope.canReadOnlyFiles == undefined || $scope.canReadOnlyFiles == false) {
            var canReadOnlyFiles = { attribute: "canReadOnlyFiles", value: false };
        } else {
            var canReadOnlyFiles = { attribute: "canReadOnlyFiles", value: true };
        }

        if ($scope.canAddEditFiles == undefined || $scope.canAddEditFiles == false) {
            var canAddEditFiles = { attribute: "canAddEditFiles", value: false };
        } else {
            var canAddEditFiles = { attribute: "canAddEditFiles", value: true };
        }

        if ($scope.canAccessReport == undefined || $scope.canAccessReport == false) {
            var canAccessReport = { attribute: "canAccessReport", value: false };
        } else {
            var canAccessReport = { attribute: "canAccessReport", value: true };
        }

        var arr = [];
        arr.push(canUseWebApp);
        arr.push(canAddEditUsers);
        arr.push(canAddEditStaffForms);
        arr.push(canAddEditCustomerForms);
        arr.push(canAddEditTriggerForms);
        arr.push(canAddEditAutomation);
        arr.push(canViewTicketsOnly);
        arr.push(canViewTicketsFromCalls);
        arr.push(canTakeTicketsFromAtDesk);
        arr.push(canTakeTicketsFromSocialMedia);
        arr.push(canTakeTicketsFromMobileApp);
        arr.push(canEditPersonalDetails);
        arr.push(canEditContactInfo);
        arr.push(canAccessInternalContactsOnly);
        arr.push(canAccessExternalContactsOnly);
        arr.push(canAddContact);
        arr.push(canEditContact);
        arr.push(canReadOnlyCampaigns);
        arr.push(canAddEditCampaigns);
        arr.push(canReadOnlyFAQTemplate);
        arr.push(canAddEditFAQTemplate);
        arr.push(canReadOnlyFiles);
        arr.push(canAddEditFiles);
        arr.push(canAccessReport);
        console.log("arr");
        console.log(arr);
        /*var levelPermissions = { permissions : JSON.stringify(arr)};*/
        var myData = {
            levelName: levelName,
            description: levelDescription,
            permissions: angular.toJson(arr)
        }
        console.log("myData");
        console.log(myData);
        apiOne.saveLevel(myData)
            .then(function successCallback(response) {
                $mdDialog.cancel();
                console.log("success response");
                console.log(response);
                $scope.levelDetail.push(response.data.data);
                console.log($scope.levelDetail);
                $route.reload();

            }, function errorCallback(response) {
                console.log("error response");
                console.log(response);
            });
    }


    //get add levels
    $scope.showLevel = function() {
        apiOne.showLevel()
            .then(function successCallback(response) {
                $scope.levelDetail = response.data.data;

                console.log($scope.levelDetail);

            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.showLevel();

    //EDIT LEVEL MODAL
    $scope.openEditLevel = function(ev, levelId){
        $scope.levelId = levelId
        apiOne.getOneLevelDetail(levelId)
        .then(function successCallBack(response){

            console.log(response);

            $scope.editButton = true;
            var levelDetails = response.data.data;

            $scope.levelName = levelDetails.levelName;
            $scope.levelDescription = levelDetails.description;
            $scope.canUseWebApp = levelDetails.permissions[0].value;
            $scope.canAddEditUsers = levelDetails.permissions[1].value;
            $scope.canAddEditStaffForms = levelDetails.permissions[2].value;
            $scope.canAddEditCustomerForms = levelDetails.permissions[3].value;
            $scope.canAddEditTriggerForms = levelDetails.permissions[4].value;
            $scope.canAddEditAutomation = levelDetails.permissions[5].value;
            $scope.canViewTicketsOnly = levelDetails.permissions[6].value;
            $scope.canViewTicketsFromCalls = levelDetails.permissions[7].value;
            $scope.canTakeTicketsFromAtDesk = levelDetails.permissions[8].value;
            $scope.canTakeTicketsFromSocialMedia = levelDetails.permissions[9].value;
            $scope.canTakeTicketsFromMobileApp = levelDetails.permissions[10].value;
            $scope.canEditPersonalDetails = levelDetails.permissions[11].value;
            $scope.canEditContactInfo = levelDetails.permissions[12].value;
            $scope.canAccessInternalContactsOnly = levelDetails.permissions[13].value;
            $scope.canAccessExternalContactsOnly = levelDetails.permissions[14].value;
            $scope.canAddContact = levelDetails.permissions[15].value;
            $scope.canEditContact = levelDetails.permissions[16].value;
            $scope.canReadOnlyCampaigns = levelDetails.permissions[17].value;
            $scope.canAddEditCampaigns = levelDetails.permissions[18].value;
            $scope.canReadOnlyFAQTemplate = levelDetails.permissions[19].value;
            $scope.canAddEditFAQTemplate = levelDetails.permissions[20].value;
            $scope.canReadOnlyFiles = levelDetails.permissions[21].value;
            $scope.canAddEditFiles = levelDetails.permissions[22].value;
            $scope.canAccessReport = levelDetails.permissions[23].value;

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
             $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/level-view.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new(),
                locals: {
                      modalData: ''
                    },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });


        }, function errorCallback(response){

            console.log(response);

        })
    }

    $scope.editLevel = function(levelId){
        var levelName = $scope.levelName;
        var levelDescription = $scope.levelDescription;


        if ($scope.canUseWebApp == undefined || $scope.canUseWebApp == false) {
            var canUseWebApp = { attribute: "canUseWebApp", value: false };
        } else {
            var canUseWebApp = { attribute: "canUseWebApp", value: true };
        }

        if ($scope.canAddEditUsers == undefined || $scope.canAddEditUsers == false) {
            var canAddEditUsers = { attribute: "canAddEditUsers", value: false };
        } else {
            var canAddEditUsers = { attribute: "canAddEditUsers", value: true };
        }

        if ($scope.canAddEditStaffForms == undefined || $scope.canAddEditStaffForms == false) {
            var canAddEditStaffForms = { attribute: "canAddEditStaffForms", value: false };
        } else {
            var canAddEditStaffForms = { attribute: "canAddEditStaffForms", value: true };
        }

        if ($scope.canAddEditCustomerForms == undefined || $scope.canAddEditCustomerForms == false) {
            var canAddEditCustomerForms = { attribute: "canAddEditCustomerForms", value: false };
        } else {
            var canAddEditCustomerForms = { attribute: "canAddEditCustomerForms", value: true };
        }

        if ($scope.canAddEditTriggerForms == undefined || $scope.canAddEditTriggerForms == false) {
            var canAddEditTriggerForms = { attribute: "canAddEditTriggerForms", value: false };
        } else {
            var canAddEditTriggerForms = { attribute: "canAddEditTriggerForms", value: true };
        }

        if ($scope.canAddEditAutomation == undefined || $scope.canAddEditAutomation == false) {
            var canAddEditAutomation = { attribute: "canAddEditAutomation", value: false };
        } else {
            var canAddEditAutomation = { attribute: "canAddEditAutomation", value: true };
        }

        if ($scope.canViewTicketsOnly == undefined || $scope.canViewTicketsOnly == false) {
            var canViewTicketsOnly = { attribute: "canViewTicketsOnly", value: false };
        } else {
            var canViewTicketsOnly = { attribute: "canViewTicketsOnly", value: true };
        }

        if ($scope.canViewTicketsFromCalls == undefined || $scope.canViewTicketsFromCalls == false) {
            var canViewTicketsFromCalls = { attribute: "canViewTicketsFromCalls", value: false };
        } else {
            var canViewTicketsFromCalls = { attribute: "canViewTicketsFromCalls", value: true };
        }

        if ($scope.canTakeTicketsFromAtDesk == undefined || $scope.canTakeTicketsFromAtDesk == false) {
            var canTakeTicketsFromAtDesk = { attribute: "canTakeTicketsFromAtDesk", value: false };
        } else {
            var canTakeTicketsFromAtDesk = { attribute: "canTakeTicketsFromAtDesk", value: true };
        }

        if ($scope.canTakeTicketsFromSocialMedia == undefined || $scope.canTakeTicketsFromSocialMedia == false) {
            var canTakeTicketsFromSocialMedia = { attribute: "canTakeTicketsFromSocialMedia", value: false };
        } else {
            var canTakeTicketsFromSocialMedia = { attribute: "canTakeTicketsFromSocialMedia", value: true };
        }

        if ($scope.canTakeTicketsFromMobileApp == undefined || $scope.canTakeTicketsFromMobileApp == false) {
            var canTakeTicketsFromMobileApp = { attribute: "canTakeTicketsFromMobileApp", value: false };
        } else {
            var canTakeTicketsFromMobileApp = { attribute: "canTakeTicketsFromMobileApp", value: true };
        }

        if ($scope.canEditPersonalDetails == undefined || $scope.canEditPersonalDetails == false) {
            var canEditPersonalDetails = { attribute: "canEditPersonalDetails", value: false };
        } else {
            var canEditPersonalDetails = { attribute: "canEditPersonalDetails", value: true };
        }

        if ($scope.canEditContactInfo == undefined || $scope.canEditContactInfo == false) {
            var canEditContactInfo = { attribute: "canEditContactInfo", value: false };
        } else {
            var canEditContactInfo = { attribute: "canEditContactInfo", value: true };
        }

        if ($scope.canAccessInternalContactsOnly == undefined || $scope.canAccessInternalContactsOnly == false) {
            var canAccessInternalContactsOnly = { attribute: "canAccessInternalContactsOnly", value: false };
        } else {
            var canAccessInternalContactsOnly = { attribute: "canAccessInternalContactsOnly", value: true };
        }

        if ($scope.canAccessExternalContactsOnly == undefined || $scope.canAccessExternalContactsOnly == false) {
            var canAccessExternalContactsOnly = { attribute: "canAccessExternalContactsOnly", value: false };
        } else {
            var canAccessExternalContactsOnly = { attribute: "canAccessExternalContactsOnly", value: true };
        }

        if ($scope.canAddContact == undefined || $scope.canAddContact == false) {
            var canAddContact = { attribute: "canAddContact", value: false };
        } else {
            var canAddContact = { attribute: "canAddContact", value: true };
        }

        if ($scope.canEditContact == undefined || $scope.canEditContact == false) {
            var canEditContact = { attribute: "canEditContact", value: false };
        } else {
            var canEditContact = { attribute: "canEditContact", value: true };
        }

        if ($scope.canReadOnlyCampaigns == undefined || $scope.canReadOnlyCampaigns == false) {
            var canReadOnlyCampaigns = { attribute: "canReadOnlyCampaigns", value: false };
        } else {
            var canReadOnlyCampaigns = { attribute: "canReadOnlyCampaigns", value: true };
        }

        if ($scope.canAddEditCampaigns == undefined || $scope.canAddEditCampaigns == false) {
            var canAddEditCampaigns = { attribute: "canAddEditCampaigns", value: false };
        } else {
            var canAddEditCampaigns = { attribute: "canAddEditCampaigns", value: true };
        }

        if ($scope.canReadOnlyFAQTemplate == undefined || $scope.canReadOnlyFAQTemplate == false) {
            var canReadOnlyFAQTemplate = { attribute: "canReadOnlyFAQTemplate", value: false };
        } else {
            var canReadOnlyFAQTemplate = { attribute: "canReadOnlyFAQTemplate", value: true };
        }

        if ($scope.canAddEditFAQTemplate == undefined || $scope.canAddEditFAQTemplate == false) {
            var canAddEditFAQTemplate = { attribute: "canAddEditFAQTemplate", value: false };
        } else {
            var canAddEditFAQTemplate = { attribute: "canAddEditFAQTemplate", value: true };
        }

        if ($scope.canReadOnlyFiles == undefined || $scope.canReadOnlyFiles == false) {
            var canReadOnlyFiles = { attribute: "canReadOnlyFiles", value: false };
        } else {
            var canReadOnlyFiles = { attribute: "canReadOnlyFiles", value: true };
        }

        if ($scope.canAddEditFiles == undefined || $scope.canAddEditFiles == false) {
            var canAddEditFiles = { attribute: "canAddEditFiles", value: false };
        } else {
            var canAddEditFiles = { attribute: "canAddEditFiles", value: true };
        }

        if ($scope.canAccessReport == undefined || $scope.canAccessReport == false) {
            var canAccessReport = { attribute: "canAccessReport", value: false };
        } else {
            var canAccessReport = { attribute: "canAccessReport", value: true };
        }

        var arr = [];
        arr.push(canUseWebApp);
        arr.push(canAddEditUsers);
        arr.push(canAddEditStaffForms);
        arr.push(canAddEditCustomerForms);
        arr.push(canAddEditTriggerForms);
        arr.push(canAddEditAutomation);
        arr.push(canViewTicketsOnly);
        arr.push(canViewTicketsFromCalls);
        arr.push(canTakeTicketsFromAtDesk);
        arr.push(canTakeTicketsFromSocialMedia);
        arr.push(canTakeTicketsFromMobileApp);
        arr.push(canEditPersonalDetails);
        arr.push(canEditContactInfo);
        arr.push(canAccessInternalContactsOnly);
        arr.push(canAccessExternalContactsOnly);
        arr.push(canAddContact);
        arr.push(canEditContact);
        arr.push(canReadOnlyCampaigns);
        arr.push(canAddEditCampaigns);
        arr.push(canReadOnlyFAQTemplate);
        arr.push(canAddEditFAQTemplate);
        arr.push(canReadOnlyFiles);
        arr.push(canAddEditFiles);
        arr.push(canAccessReport);
        console.log("arr");
        console.log(arr);
        /*var levelPermissions = { permissions : JSON.stringify(arr)};*/
        var myData = {
            levelName: levelName,
            description: levelDescription,
            permissions: angular.toJson(arr)
        }
        console.log("myData");
        console.log(myData);
        var prackrToken = Cookies.get('prackrAuth');
        apiOne.updateLevel(myData, levelId, prackrToken)
            .then(function successCallback(response) {
                $mdDialog.cancel();
                console.log("success response");
                console.log(response);
                $scope.levelDetail.push(response.data.data);
                console.log($scope.levelDetail);
                $route.reload();

            }, function errorCallback(response) {
                console.log("error response");
                console.log(response);
            });
    }
    //delete level modal
    
    $scope.deleteLevelGetDetail = function(levelId){

        apiOne.getUserOfLevel(levelId)
        .then(function successCallback(response){
            
            $scope.noOfUsers = response.data.data;
            
            console.log($scope.noOfUsers);

        }, function errorCallback(response) {

            console.log(response);

        });

    }

    $scope.deleteLevelModal = function(ev, levelId){
        $scope.levelId = levelId;
        console.log($scope.levelId);
        
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: function($scope, theScope){
                $scope.theScope = theScope;
            },
            templateUrl: 'views/delete-level-modal.html',
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: useFullScreen,
            locals: {
                theScope: $scope.levelId
            }
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }
    //delete level
    $scope.deleteLevel = function(levelId) {
        console.log(levelId);
        apiOne.deleteLevel(levelId)
            .then(function successCallback(response) {
                console.log(response);
                $mdDialog.cancel();
                $route.reload();

            }, function errorCallback(response) {

                console.log(response);

            });
    }

    //manage department


    //for manage department dialogue

    $scope.managementDialogue = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        console.log("in ");
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/manage-department-view.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                scope: $scope.$new(),
                locals: {
                      modalData: ''
                    },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };

    //get all departments
    $scope.getAllDepartments = function() {
        apiOne.getAllDepartment()
            .then(function successCallback(response) {
                console.log(response);
                $scope.allDepartments = response.data.data;

            }, function errorCallback(response) {

                console.log(response);

            });
    }
    $scope.getAllDepartments();

    //save department
    $scope.saveDepartment = function() {
        var departmentName = $scope.departmentName;
        var myData = {
            departmentName: departmentName,
            companyId: 'static'
        }
        apiOne.addDepartment(myData)
            .then(function successCallback(response) {
                console.log(response.data.data);
                $scope.allDepartments.push(response.data.data);
                $route.reload();

            }, function errorCallback(response) {

                console.log(response);

            });

    }

    // Delete Department Modal
    $scope.newFunction = function(departmentId){

        apiOne.getUserOfDepartment(departmentId)
        .then(function successCallback(response){
            
            $scope.noOfUsers = response.data.data;
            
            console.log($scope.noOfUsers);

        }, function errorCallback(response) {

            console.log(response);

        });

    }

    $scope.deleteDepartmentModal = function(ev, departmentId){
        $scope.departmentId = departmentId;
        console.log($scope.departmentId);
        
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: function($scope, theScope){
                $scope.theScope = theScope;
            },
            templateUrl: 'views/delete-department-modal.html',
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: useFullScreen,
            locals: {
                theScope: $scope.departmentId
            }
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }



    //delete department
    $scope.deleteDepartment = function(departmentId) {
        console.log("delete department");

        apiOne.deleteDepartment(departmentId)
            .then(function successCallback(response) {
                $mdDialog.cancel();
                console.log(response);
                $mdToast.show(
                        $mdToast.simple()
                        .textContent("Department delete successfully")
                        .hideDelay(3000)
                    );

            }, function errorCallback(response) {
                $mdDialog.cancel();
                console.log(response);
                $mdToast.show(
                        $mdToast.simple()
                        .textContent("Some error occurd")
                        .hideDelay(3000)
                    );
                console.log(response);

            });
    }


    $scope.readonly = false;
    $scope.selectedItem = null;
    $scope.searchText = null;
    $scope.querySearch = querySearch;
    $scope.callLoadFunction = loadVegetables();
    $scope.selectedVegetables = [];
    $scope.numberChips = [];
    $scope.numberChips2 = [];
    $scope.numberBuffer = '';

    /**
     * Search for vegetables.
     */
    function querySearch(query) {
        /*return $scope.allDepartmentsList;*/
        $scope.vegi = $scope.allDepartmentsList;
        return $scope.vegi.map(function(veg) {
            return veg;
        });
    }


    function loadVegetables() {
        apiOne.getAllDepartmentList()
            .then(function successCallback(response) {
                console.log(response.data.data);
                $scope.departmentList = [];
                $scope.allDepartmentsList = response.data.data;
                console.log($scope.allDepartmentsList);

                $scope.someFunction();


            }, function errorCallback(response) {

            });


    }
    $scope.someFunction = function() {
        $scope.vegi = $scope.allDepartmentsList;
        return $scope.vegi.map(function(veg) {
            console.log(veg.departmentId);
            console.log(veg.departmentName);
            /*veg._lowername = veg.name.toLowerCase();
            veg._lowertype = veg.type.toLowerCase();*/
            return veg;
        });

    }










    //branch functionality

    // show branch modal
    $scope.showBranchModal = function(ev) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'views/manage-branch-view.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: false,
                fullscreen: useFullScreen,
                locals: {
                      modalData: ''
                    },
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });

    };

    //get all branch
    $scope.getAllBranch = function() {
        apiOne.getAllBranches()
            .then(function successCallback(response) {
                console.log(response);
                $scope.allBranch = response.data.data;

            }, function errorCallback(response) {

                console.log(response);

            });
    }

    $scope.getAllBranch();
    //save branch
    $scope.submitBranch = function(){
        var branchName = $scope.branchName;
        var data = {
            branchName: branchName
        };
        apiOne.addBranch(data)
            .then(function successCallback(response) {
                console.log(response);
                $scope.allBranch.push(response.data.data);
                $route.reload();

            }, function errorCallback(response) {

                console.log(response);

            });
    }


    //open modal for delete branch
    $scope.deleteBranchGetDetail = function(branchId){

        $scope.noOfDepartment = 5;
        $scope.noOfUsers = 5;

        /*apiOne.getUserOfDepartment(departmentId)
        .then(function successCallback(response){
            
            $scope.noOfUsers = response.data.data;
            
            console.log($scope.noOfUsers);

        }, function errorCallback(response) {

            console.log(response);

        });*/


    }

    $scope.deleteBranchModal = function(ev, branchId){
        $scope.branchId = branchId;
        
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs') || $mdMedia('md') || $mdMedia('lg') || $mdMedia('xl')) && $scope.customFullscreen;
        $mdDialog.show({
            controller: function($scope, theScope){
                $scope.theScope = theScope;
            },
            templateUrl: 'views/delete-branch-modal.html',
            targetEvent: ev,
            clickOutsideToClose: false,
            fullscreen: useFullScreen,
            locals: {
                theScope: $scope.branchId
            }
        })
        .then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    }
    //delete Branch
    $scope.deleteBranch = function(branchId) {
        apiOne.deleteBranch(branchId)
            .then(function successCallback(response) {
                console.log(response);

                $mdDialog.cancel();

            }, function errorCallback(response) {

                console.log(response);

            });
    }



    //cancel function
    $scope.cancel = function() {
        $mdDialog.cancel();
    };

}]);
