(function (window, React, ImageInput) {
  'use strict';

  // You should really be using browserify instead of global ImageInput

  document.addEventListener('DOMContentLoaded', function () {
    var container = document.querySelector('#imageinput-container');
    React.render(React.createElement(ImageInput, {
      multiple: true,
      onUpload: function (files) {
        alert('Hey! You uploaded ' + files.length + ' images!');
      }
    }, null), container);
  });

}(window, React, window.ImageInput));
