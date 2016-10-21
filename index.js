(function (root, factory) {
  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS-like
    exports = module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define('Height', factory);
  } else {
    // Browser globals (root is window)
    root.Height = factory(root, document);
  }
})(typeof window === 'undefined' ? this : window, function (window, document) {
  'use strict';

  function Height(opts) {
    opts = opts || {};

    function checkOpts() {
      if (typeof opts.columns !== 'number' || typeof opts.listElem !== 'string') {
        throw new TypeError('`opts.columns` must be a `number` AND `opts.listElem` must be a `string`');
      }
    }

    function init() {
      var elements = document.querySelectorAll(opts.listElem);
      var maxHeight = 0;
      var rowElements = [];

      elements = Array.prototype.slice.call(elements);

      if (elements.length > 0) {
        for (var index = 0; index < elements.length; index++) {
          var toPosition = (index + opts.columns - 1);

          toPosition = (toPosition > elements.length) ?
            (elements.length - 1) :
            toPosition;

          rowElements = elements.slice(index, (toPosition + 1));

          maxHeight = getMaxHeight(rowElements);
          setElementsHeight(rowElements, maxHeight);

          index = toPosition;
        }
      }
    }

    function getMaxHeight(elements) {
      var style;
      var heights = [];

      heights = elements.map(function (item) {
        style = window.getComputedStyle(item);

        if (heights.indexOf(parseInt(style.height, 10)) !== 0) {
          return parseInt(style.height, 10);
        }
      });

      return Math.max.apply(Math, heights);
    }

    function setElementsHeight(elements, maxHeight) {
      for (var j = 0; j < elements.length; j++) {
        elements[j].style.height = maxHeight + 'px';
      }
    }

    checkOpts();
    init();
  }

  return Height;
});
