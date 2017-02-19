var config = (function() {
  'use strict';

//настройки модулей приложения
var  settings = {
    categories: {
      categoriesUrl: 'http://504080.com/api/v1/services/categories',
      authToken: '2234aa6a4233351fe1bb8bf17e3f944ecbe8a3fa'
    }

  };

  function get(moduleName) {
    return settings[moduleName];
  }

  //возвращает публичные методы/члены модуля
  return {
    get: get
  };

})();
