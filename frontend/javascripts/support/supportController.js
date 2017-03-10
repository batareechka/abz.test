(function() {
  'use strict';

  angular.module('denteez-app')
    .controller('SupportController', SupportController);

  SupportController.$inject = [
    '$scope',
    'SupportHttpService',
    'ModalService'
  ];

  function SupportController($scope, supportHttpService, modalService) {
    var vm = this;

    vm.enquiryTypes = [];
    vm.enquiryIsValid = false;
    vm.otherIsValid = true;
    vm.showOtherInput = false;
    vm.formIsValid = false;
    vm.enquirySelected = {name: 'Select enquiry type'};
    $scope.photoIsValid = true;

    vm.formData = {
      enquiryType: vm.enquirySelected.name, // Must be an object
      other: '',
      name: '',
      email: '',
      subject: '',
      description: '',
      files: []
    };
    $scope.photo_file =[];
    $scope.attachments = [];
    

    vm.changeEnquiry = changeEnquiry;
    vm.submitForm = submitForm;
    vm.removePic = removePic;



    function removePic(previewItem) {  
      var indexToRemove = $scope.attachments.indexOf(previewItem);
      $scope.attachments.splice(indexToRemove, 1);
    }


    (function() {
      supportHttpService.getEnquiryType(
        function(response) {
          vm.enquiryTypes = response.data.data;
        },
        function(response) {
          var title, errDescription;
          console.log(response);
          // title = response.status + ': ' + response.statusText;
          // errDescription = response.data.error.description;
          // vm.isloading = false;
          // modalService.showAlert(title, errDescription);
        });
    })();

    function changeEnquiry() {

      if (vm.enquirySelected.name !== 'Select enquiry type') {
        vm.formData.enquiryType = vm.enquirySelected.name;
        vm.enquiryIsValid = true;    

        if (vm.formData.enquiryType === 'Other') {
          vm.showOtherInput = true;
          vm.otherIsValid = false;
        }
        else {
          vm.showOtherInput = false;
          vm.otherIsValid = true;
        }    
      }

    }

  function submitForm(form) {

    if (vm.showOtherInput && vm.formData.other)
      vm.otherIsValid = true;
    else
      vm.otherIsValid = false;

    if (form.$valid && !form.other.$error.required && vm.enquiryIsValid) {

      angular.forEach($scope.attachments, function(value, key) {
        console.log(value);
        vm.formData.files.push(value.file);
      });
      console.log('formData');
      console.log(vm.formData.files);

      supportHttpService.sendEnquiry(vm.formData,
        function(response){
          var title, successMessage;
          title = response.status + ': ' + response.statusText;
          successMessage = response.data.data.message;
          modalService.showAlert(title, successMessage);
          vm.formData = {};
          $scope.attachments.splice(0, $scope.attachments.length);
          form.$submitted = false;
        },
        function(response){
          console.log(response);
          var title, errDescription;

          title = response.status + ': ' + response.statusText;
          errDescription = response.data.error.description;
          // vm.isloading = false;
          modalService.showAlert(title, errDescription);
        });
    }
  }

  

}

})();