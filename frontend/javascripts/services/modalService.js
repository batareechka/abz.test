(function() {
  'use strict';

  angular
    .module('denteez-app')
    .factory('ModalService', ModalService);

  ModalService.$inject = [
    '$mdDialog'
  ];

  function ModalService(mdDialog) {
    var alert;

    var service = {
      showAlert: showAlert
    };    

    return service;

     function showAlert(title, textContent) {
      alert = mdDialog.alert({
        title: title,
        textContent: textContent,
        ok: 'Close'
      });

      mdDialog
        .show( alert )
        .finally(function() {
          alert = undefined;
        });
    }
        
  }

})();