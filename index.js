var Height = function(opts) {
  'use strict';

  opts = opts || {};

  var getMaxHeight = function(elements, begin, end) {
    var style, heights = [];

    if (elements.length > 0) {
      for (var i = begin; i <= end; i++) {
        style = window.getComputedStyle(elements[i]);

        if (heights.indexOf(parseInt(style.height)) !== 0)
          heights.push(parseInt(style.height));
      }
    }

    return Math.max.apply(Math, heights);
  }

  var checkOpts = function() {
    if (typeof opts.columns !== 'number') {
      throw new TypeError('opts.columns must be a number.')
    }

    if (typeof opts.listElem !== 'string') {
      throw new TypeError('opts.listElem must be a string.')
    }
  }

  var init = function() {
    var elements, maxHeight = 0;

    elements = document.querySelectorAll(opts.listElem)

    if (elements.length > 0) {
      for (var count = 0; count < elements.length; count++) {
        var toPosition = (count + opts.columns - 1);

        if (toPosition > elements.length) {
          toPosition = (elements.length - 1)
        }

        maxHeight = getMaxHeight(elements, count, toPosition);

        for (var j = count; j <= toPosition; j++) {
          elements[j].style.height = maxHeight + 'px';
        }

        count = toPosition;
      }
    }
  }

  checkOpts();
  init();
};
