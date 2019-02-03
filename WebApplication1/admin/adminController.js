(function () {
    "use strict";
    angular.module("adminEmployee")
    .controller("adminController", adminController)
    adminController.$inject = ["$scope","$state","commonService"];
    function adminController($scope,$state,commonService) {
        var vm = this;
        vm.isForm = false;
        $scope.imgUrl = "Images/default.jpg";
        vm.adminData = commonService.getAdminData();
        vm.selection = [];

        //Methods
        vm.addEditUser = addEditUser;
        vm.toggleSelection = toggleSelection;
        vm.submit = submit;
        vm.cancel = cancel;
        vm.logOut = logOut;
        

        activate();
        function activate() {
            vm.isForm = false;
            vm.Roles = [{ Id: '12', RoleName: 'Admin' }, { Id: '13', RoleName: 'Employee' }]
            vm.adminData = commonService.getAdminData();
        }
        function addEditUser(type) {
            vm.isForm = true; vm.isError = false; vm.errorMessage = null;
            if (type === 'Add') {
                vm.createObj = commonService.createAdmin();
                vm.createObj.Role = window.localStorage.getItem("Admin") === "true" ? vm.Roles[0].RoleName : vm.Roles[1].RoleName;
            } else {
                vm.createObj = vm.selection[0];
                vm.createObj.Dob = new Date(vm.createObj.Dob);
            }
            setTimeout(function () { document.getElementById('img').innerHTML = '<img src="' + $scope.imgUrl + '" alt="sa" />' }, 1000);
        }

        function toggleSelection(obj) {
            vm.selection = [];
            var idx = vm.selection.indexOf(obj);
            if (idx > -1) { vm.selection.splice(idx, 1); }
            else { vm.selection.push(obj); }
        }
        function submit() {
            vm.isError = false; vm.errorMessage = null;
            vm.isValidData = commonService.validateData('adminEmployee');
            if (vm.isValidData) {
                vm.isError = true; vm.errorMessage = vm.isValidData;
                return;
            }
            vm.adminData.push(vm.createObj);
            vm.isForm = false;
        }
        function cancel() { vm.selection = [];vm.isForm = false; }
        function logOut() {
            window.localStorage.clear();
            $state.go("/");
        }

        //Logic for DatepickerOpen
        $scope.datePicker = {
            adminDate: false
        };
        $scope.open = function ($event, opened) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.datePicker[opened] = $scope.datePicker[opened] === true ? false : true;
        };
        $scope.dateOptions = {
            format: "dd-MM-yyyy",
            'class': 'datepicker',
            showWeeks: 'false'
        };
        $scope.format = "dd-MM-yyyy"

    }
})();