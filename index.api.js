myApp.factory('apiOne',  function($http) {

    var apis = {};
    var baseUrl = 'http://testapi.prackr.com';
    apis.getAllTickets = function() {
        console.log("success!")
        return $http.get(baseUrl + '/tickets/all');
    }

    apis.login = function(loginData) {
        console.log("success in reaching login function!");
        return $http.post(baseUrl + '/users/login/manual', loginData);
    }

    apis.getCurrentUser = function(token) {
        return $http.get(baseUrl + '/users/miniinfo?myToken=' + token, token);
    }

    apis.getMyTickets = function(token) {
        /*return $http.get(baseUrl + '/tickets/my/open/tickets?myToken=' + token);*/
        return $http.get(baseUrl + '/tickets/my/tickets?myToken=' + token);
    }

    apis.getMyDeskTickets = function(token) {
        return $http.get(baseUrl + '/tickets/my/desk/tickets?myToken=' + token);
    }

    apis.getTicketByWeek = function(token){
        return $http.get(baseUrl + '/tickets/desk/by/week?myToken=' + token);
    }
    
    apis.getTicketByMonth = function(token){
        console.log("getTicketByMonth");
        console.log(token);
        return $http.get(baseUrl + '/tickets/desk/by/month?myToken=' + token);
    }

    apis.getTicketByYear = function(token){
        return $http.get(baseUrl + '/tickets/desk/by/year?myToken=' + token);
    }

    apis.getDeskTicketByRange = function(token,startDate,endDate){
        return $http.get(baseUrl + '/tickets/desk/by/' + startDate + '/' + endDate + '?myToken=' + token);
    }

    apis.getMyCallTickets = function(token) {
        return $http.get(baseUrl + '/tickets/my/call/tickets?myToken=' + token);
    }

    apis.getCallByWeek = function(token){
        return $http.get(baseUrl + '/tickets/call/by/week?myToken=' + token);
    }
    
    apis.getCallByMonth = function(token){
        console.log("getTicketByMonth");
        console.log(token);
        return $http.get(baseUrl + '/tickets/call/by/month?myToken=' + token);
    }

    apis.getCallByYear = function(token){
        return $http.get(baseUrl + '/tickets/call/by/year?myToken=' + token);
    }

    apis.getCallTicketByRange = function(token,startDate,endDate){
        return $http.get(baseUrl + '/tickets/call/by/' + startDate + '/' + endDate + '?myToken=' + token);
    }


    apis.getCallLogsByWeek = function(token){
        return $http.get(baseUrl + '/calls/get/my/callLogs/by/week?myToken=' + token);
    }
    
    apis.getCallLogsByMonth = function(token){
        return $http.get(baseUrl + '/calls/get/my/callLogs/by/month?myToken=' + token);
    }

    apis.getCallLogsByYear = function(token){
        return $http.get(baseUrl + '/calls/get/my/callLogs/by/year?myToken=' + token);
    }

    apis.selectCallLogsByRange = function(token,startDate,endDate){
        return $http.get(baseUrl + '/calls/get/my/callLogs/by/' + startDate + '/' + endDate + '?myToken=' + token);
    }

    apis.getSingleTicket = function(ticketId) {
        return $http.get(baseUrl + '/tickets/by/ticketId/' + ticketId, ticketId);
    }

    apis.deleteSingleTicket = function(ticketId) {
        return $http.post(baseUrl + '/tickets/remove/by/ticketId/' + ticketId);
    }

    apis.createSingleTicket = function(ticketData, token) {
        return $http.post(baseUrl + '/tickets/create?myToken=' + token, ticketData);
    }

    apis.editSingleTicket = function(ticketData, ticketId, token) {
        return $http.post(baseUrl + '/tickets/edit/by/user/' + ticketId + '?myToken=' + token, ticketData);
    }

    apis.getCallLogs = function(token) {
        return $http.get(baseUrl+'/tickets/my/callLogs?myToken=' + token);
    }

    apis.sendTicketAttachment = function(ticketAttachmentData) {
        console.log("success in reaching sendTicketAttachment function!");
        var ticketId = Cookies.get('selectedTicketId');
        console.log(ticketId);
        console.log(ticketAttachmentData);

        return $http.post(baseUrl + '/tickets/'+ticketId + '/save/files',ticketAttachmentData);
    }
    apis.createSingleTask = function(myData, token) {
        return $http.post(baseUrl + '/tasks/create?myToken=' + token, myData);
    }
    apis.sendSmsToUser = function(token, myData) {
        return $http.post(baseUrl + '/tickets/send/sms?myToken=' + token, myData);
    }
    apis.makeOutboundCall = function(token, myData){
        return $http.post(baseUrl+'/calls/make/call?myToken='+token, myData);
    }
    apis.markClose = function(ticketId,token){
        return $http.post(baseUrl + '/tickets/mark/close/' + ticketId + '?myToken=' + token);
    }
    apis.deleteMarkTicket = function(ticketId,token){
        return $http.post(baseUrl + '/tickets/remove/by/ticketId/' + ticketId + '?myToken=' + token);
    }
    apis.showAllTasks = function(ticketId,token){
        return $http.get(baseUrl+'/tasks/by/ticketId/'+ ticketId +'?myToken=' + token);
    }
    apis.getTaskDetail = function(taskId, token){
        return $http.get(baseUrl + '/tasks/by/taskId/'+ taskId +'?myToken=' + token);
    }
    apis.updateSingleTask = function(myData, token, taskId){
        return $http.post(baseUrl + '/tasks/edit/by/user/' + taskId + '?myToken=' + token, myData); 
    }
    apis.getAgentsList = function(){
        return $http.get(baseUrl + '/users/get/agents/list'); 
    }
    apis.assignTaskToAgent = function(myData,token){
        return $http.post(baseUrl + '/tickets/assign/task/to/agent?myToken=' + token, myData); 
    }
    apis.callForAudio = function(token,ticketId){
        console.log("in call api");
        return $http.get(baseUrl + '/tickets/calllog/by/ticketId/' + ticketId + '?myToken=' + token); 
    }
    /*apis.rejectCall = function(token,ticketIdForCallLog){
        return $http.get(baseUrl + '/tickets/update/calllog/on/reject?myToken=' + token);
    }*/
    apis.rejectCall = function(token,ticketIdForCallLog){
        return $http.post(baseUrl + '/tickets/update/calllog?myToken=' + token,ticketIdForCallLog);
    }
    apis.saveNote = function(token,myData){
        return $http.post(baseUrl + '/notes/create?myToken=' + token,myData);
    }
    apis.getCaller = function(numberData){
        console.log(numberData);
        return $http.post('http://api.prackr.com/customers/get/customer/info/new',numberData);
    }
    apis.loadClosedTickets = function(token){
        return $http.get(baseUrl + '/tickets/my/closed/tickets'+ token);
    }

    apis.addAudioToTicket = function(myData,token){
        return $http.post(baseUrl + '/tickets/update/calllog?myToken=' + token,myData);
    }




    //user part apis
    apis.addUser = function(myData){
        return $http.post(baseUrl + '/users/create/newUser',myData);
    }
    apis.getAllUser = function(){
        return $http.get(baseUrl + '/users/allUsers');
    }
    apis.deleteOneUser = function(userName){
        return $http.post(baseUrl + '/users/removeUser/by/userName/' + userName);
    }
    apis.getOneUser = function(userName){
        return $http.get(baseUrl + '/users/find/by/userName/' + userName);
    }
    apis.updateUser = function(myData,userName,myToken){
        return $http.post(baseUrl + '/users/update/user/by/'+ userName + '?myToken='+myToken, myData);
    }
    apis.sentUserAttachment = function(userAttachmentData,currentUser) {
        return $http.post(baseUrl + '/tickets/'+ currentUser + '/save/files',userAttachmentData);
    }
    apis.saveLevel = function(myData){
        return $http.post(baseUrl + '/levels/create/new/level', myData);
    }
    apis.getUserOfLevel = function(level){
        return $http.get(baseUrl + '/users/all/users/one/level/' + level);
    }
    apis.showLevel = function(){
        return $http.get(baseUrl + '/levels/all/active/levels');
    }
    apis.getOneLevelDetail = function(levelId){
        return $http.get(baseUrl + '/levels/find/by/levelId/' + levelId);
    }
    apis.updateLevel = function(myData, levelId, myToken){
        return $http.post(baseUrl + '/levels/update/level/by/levelId/' + levelId + '?myToken='+myToken, myData);
    }
    apis.deleteLevel = function(levelId){
        return $http.post(baseUrl + '/levels/remove/by/levelId/' + levelId );
    }
    apis.addDepartment = function(myData){
        return $http.post(baseUrl + '/departments/create', myData);
    }
    apis.getAllDepartment = function(){
        return $http.get(baseUrl + '/departments/all/active');
    }
    apis.getUserOfDepartment = function(department){
        return $http.get(baseUrl + '/users/all/users/one/department/' + department);
    }
    apis.deleteDepartment = function(departmentId){
        return $http.post(baseUrl + '/departments/remove/by/departmentId/' + departmentId);
    }
    apis.getAllDepartmentList = function(){
        return $http.get(baseUrl + '/departments/list');
    }


    apis.getLevelPermission = function(levelId){
        return $http.get(baseUrl + '/levels/find/by/levelId/' + levelId);
    }



    //branch related apis
    apis.getAllBranches = function(){
        return $http.get(baseUrl + '/branch/all/active');
    }
    apis.addBranch = function(myData){
        return $http.post(baseUrl + '/branch/create', myData);
    }
    apis.deleteBranch = function(branchId){
        return $http.post(baseUrl + '/branch/remove/by/branchId/' + branchId);
    }

    //new add task
    apis.createSingleTask2 = function(myData, token) {
        return $http.post(baseUrl + '/tasks/create/assign?myToken=' + token, myData);
    }


    apis.saveFromCSV = function(myData){
        return $http.post(baseUrl + '/users/save/from/csv', myData);
    }


    apis.sendMailToUser = function(token, myData) {
        console.log(myData);
        return $http.post(baseUrl + '/users/send/mail?myToken=' + token, myData);
    }

    var api = {};

    return apis;
});
