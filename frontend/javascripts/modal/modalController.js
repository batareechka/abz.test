(function(){
  "use strict";

  angular
   .module('denteez-app')
   .controller('ModalController', ModalController);

  ModalController.$inject = [
    // '$scope',
    '$mdDialog',
    'ModalService'
  ];

  function ModalController(mdDialog, modalService) {
    var vm = this;    

    vm.showModal = modalService.showAlert;
    vm.showCustom = showCustom;


    function showCustom(ev) {
      mdDialog.show({
        // controller: DialogController,        
        templateUrl: '/modal/modal.html',
        // parent: angular.element(document.body),
        // targetEvent: ev,
        clickOutsideToClose:true
        // fullscreen: scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
    }

    function DialogController(vm, mdDialog) {
      vm.hide = function() {
        mdDialog.hide();
      };

      vm.cancel = function() {
        mdDialog.cancel();
      };

    }

  }
})();