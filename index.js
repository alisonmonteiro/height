var Height = function(opts) {
  'use strict';

  opts = opts || {};

  var getMaxHeight = function(elements) {
    var style, heights = [];

    var heights = elements.map(function(item) {
      style = window.getComputedStyle(item);

      if (heights.indexOf(parseInt(style.height)) !== 0)
        return parseInt(style.height);
    });

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
    var elements = document.querySelectorAll(opts.listElem)
    var maxHeight = 0;
    var rowElements = [];

    elements = Array.prototype.slice.call(elements)

    if (elements.length > 0) {
      for (var count = 0; count < elements.length; count++) {
        var toPosition = (count + opts.columns - 1);

        toPosition = (toPosition > elements.length)
          ? (elements.length - 1)
          : toPosition;

        rowElements = elements.slice(count, (toPosition + 1));

        maxHeight = getMaxHeight(rowElements);
        setElementsHeight(rowElements, maxHeight);

        count = toPosition;
      }
    }
  }

  var setElementsHeight = function(elements, maxHeight) {
    for (var j = 0; j < elements.length; j++) {
      elements[j].style.height = maxHeight + 'px';
    }
  }

  checkOpts();
  init();
};
