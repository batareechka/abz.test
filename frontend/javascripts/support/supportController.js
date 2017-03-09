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
    vm.picIsValid = true;
    vm.validateImg = validateImg;

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
    $scope.files = [];
    $scope.previews = [];
    $scope.attachments = [];
    

    vm.changeEnquiry = changeEnquiry;
    vm.submitForm = submitForm;
    vm.removePic = removePic;
    $scope.previewPhoto = previewPhoto;

    function previewPhoto(event) {
      var files = event.target.files;
      var file = files[files.length-1];

      vm.picIsValid = vm.validateImg(file);

      if (vm.picIsValid) {

        var reader = new FileReader();
        reader.onload = function(e) {
          $scope.$apply(function(){
            $scope.previews.push(e.target.result);
            $scope.attachments.push(
              {
                file: file,
                preview: e.target.result
              });
            $scope.photo = e.target.result;
          })
        }
        reader.readAsDataURL(file);
      }
  }
     
      

    function validateImg(file) {
      var _URL = window.URL || window.webkitURL;
      var imgW, imgH
      var resolutionIsValid = false;
      var sizeIsValid = file.size <= 5000000;

      var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
      var typeIsValid = '|jpg|jpeg|png|ipg|'.indexOf(type) !== -1;

      // var img = new Image();
      // img.src = _URL.createObjectURL(file); 

      // img.onload = function() {
      //   imgW = this.width;
      //   imgH = this.height;
      //   console.log(imgW + ' ' + imgH);
      //   resolutionIsValid = (imgW >= 300) && (imgH >= 300);
        
      // };   
      
      return sizeIsValid && typeIsValid;   
    }

    function removePic(previewItem) {    
     var indexToRemove = $scope.previews.indexOf(previewItem);
     $scope.previews.splice(indexToRemove, 1);
     $scope.files.splice(indexToRemove, 1);
     $scope.attachments.splice(indexToRemove, 1);

    // console.log($scope.files);
    // console.log($scope.previews);
    // console.log($scope.attachments);


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

      // initUploader();
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

      supportHttpService.sendEnquiry(vm.formData, $scope.files,
        function(response){
          var title, successMessage;
          title = response.status + ': ' + response.statusText;
          successMessage = response.data.data.message;
          modalService.showAlert(title, successMessage);
          vm.formData = {};
          form.$submitted = false;
          // console.log(vm.formData);
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