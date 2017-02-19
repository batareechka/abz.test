//= require ./config/config.js
//= require ./categories/categories.js

$(function() {
  'use strict';

  // если модуль config не загрузился, то останавливать приложение
  if (typeof config === 'undefined') {
    return;
  }

  // если загружен модуль categories, то инициализируем его
  if (typeof categories !== 'underfined') {
    categories.init(config.get('categories'));
  };

});