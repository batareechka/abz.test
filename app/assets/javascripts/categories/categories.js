var categories = (function() {
  'use strict';

  var config;

  return {
    init: init
  };

  function init(moduleConfig) {
    config = moduleConfig;    

    getCategories();
  }

  function getCategories() {
    var $servicesList = $('.services-list'), 
        $preloader = $('#preloader'),
        $modal = $('.modal');    

      $.get({
        url: config.categoriesUrl,
        headers:  {
         'Authorization': config.authToken
        },
        timeout: 3000,
        complete: function () {   
          $preloader.addClass('hidden');     
        }
      })
        .done(function (response) {
          var serviceElements = $.map(response.data, function(category, index) {
            var serviceItem = $('<li class="service-item"></li>').html('<a href="#"></a>'),
                serviceLink = serviceItem.find('a').html('<div class="service-icon"><img></div><div class="service-name"><div>');
                
            serviceLink.find('.service-icon > img').attr('src', category.icon);
            serviceLink.find('.service-name').html(category.title);
            return serviceItem;
          });

          $servicesList.html(serviceElements);
          $servicesList.removeClass('hidden');
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
          $modal.find('.modal-header').html(jqXHR.status + ': ' + errorThrown);
          $modal.find('.modal-text').html(jqXHR.responseJSON.error.description);

          $modal.modal({
            modalClass: 'open',
            fadeDuration: 250,
            fadeDelay: 1.5
          });
        });
  }

})();
