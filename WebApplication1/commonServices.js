(function () {
    "use strict";
    angular.module('adminEmployee', [])
    .factory("commonService", commonService)
    function commonService() {
        var Services = {
            getAdminData: getAdminData,
            createAdmin: createAdmin,
            validateData: validateData,
            setValidationMessages: setValidationMessages
        }
         
        return Services;
        function getAdminData() {
            return[
            { Id:"1",Name: "Roy", Role: "Admin", Dob: "30-08-1845", Address: "",Password:null },
            { Id: "2", Name: "Marley", Role: "Admin", Dob: "01-011-1920", Address: "", Password: null },
            { Id: "3", Name: "John", Role: "Admin", Dob: "02-01-1994", Address: "", Password: null },
            { Id: "4", Name: "Stane", Role: "Admin", Dob: "14-04-1478", Address: "", Password: null }
            ]
        }
        function createAdmin() {
            return { Id: "", Name: null, Role: null, Dob: null, Address: null };
        }
        function setValidationMessages(title) {
            var Messages = {
                Name: 'Name Required',
                DOB: "Date of Birth Required",
                Address: "Address Required",
                Password:"Password Required"
            }
            return Messages[title];
        }
        function validateData(Id) {
            var _inputFields; var message;
            function isValidDate(value) {
                var date=/^(?=\d)(?:(?:31(?!.(?:0?[2469]|11))|(?:30|29)(?!.0?2)|29(?=.0?2.(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00)))(?:\x20|$))|(?:2[0-8]|1\d|0?[1-9]))([-.\/])(?:1[012]|0?[1-9])\1(?:1[6-9]|[2-9]\d)?\d\d(?:(?=\x20\d)\x20|$))?(((0?[1-9]|1[012])(:[0-5]\d){0,2}(\x20[AP]M))|([01]\d|2[0-3])(:[0-5]\d){1,2})?$/;
                if (date.test(value)===false) { return "Invalid Date"; }
            }
            $("#" + Id).each(function () {
                _inputFields = $(this).find(':input'); 
            });
            for (var index = 0; index <= _inputFields.length - 1; index++) {
                if (_inputFields[index].type != "file") {
                    if (_inputFields[index].title === "DOB") {
                        message = isValidDate(_inputFields[index].value);
                        return message;
                    }
                    if (!_inputFields[index].value) {
                        message = setValidationMessages(_inputFields[index].title);
                        return message;
                    }
                }
            }
        }


        //Api call with Authentication
        //function getCall() {
        //    var url = "https://jsonplaceholder.typicode.com/users";
        //    return $http.get(url, {
        //        headers: {
        //            "Content-Type": "application/json",
        //            "Authorization": "YOUR TOKEN"
        //        }
        //    });
        //}
    }

})();