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
    vm.enquirySelected = {name: 'Select enquiry type'}; // Must be an object
    vm.enquiryIsValid = false;

    vm.showOtherInput = false;
    vm.otherIsValid = true;
    
    vm.formIsValid = false;       
    

    vm.formData = {
      enquiryType: vm.enquirySelected.name,
      other: '',
      name: '',
      email: '',
      subject: '',
      description: '',
      files: []
    };

    $scope.photoIsValid = true;
    $scope.attachments = [];
    
    vm.removePic = removePic;
    vm.changeEnquiry = changeEnquiry;
    vm.submitForm = submitForm;

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
          // modalService.showAlert(title, errDescription);
        });
    })();
    



    function removePic(previewItem) {  
      var indexToRemove = $scope.attachments.indexOf(previewItem);
      $scope.attachments.splice(indexToRemove, 1);
    }    

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
          modalService.showAlert(title, errDescription);
        });
    }
  }

  

}

})();