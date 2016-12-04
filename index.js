(function (root, factory) {
  'use strict';

  if (typeof module === 'object' && typeof module.exports === 'object') {
    // CommonJS-like
    exports = module.exports = factory(root, document);
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

    function checkOptions() {
      if (typeof opts.columns !== 'number' || typeof opts.listElem !== 'string') {
        throw new TypeError('`opts.columns` must be a `number` AND `opts.listElem` must be a `string`');
      }
    }

    function init() {
      const selector = document.querySelectorAll(opts.listElem);
      const elements = Array.prototype.slice.call(selector);
      let maxHeight = 0;
      let rowElements = [];

      if (elements.length === 0) {
        throw new Error(`No elements found with by selector \`${opts.listElem}\``);
      }

      for (let index = 0; index < elements.length; index++) {
        let toPosition = (index + opts.columns - 1);

        toPosition = (toPosition > elements.length) ?
          (elements.length - 1) :
          toPosition;

        rowElements = elements.slice(index, (toPosition + 1));

        maxHeight = getMaxHeight(rowElements);
        setElementsHeight(rowElements, maxHeight);

        index = toPosition;
      }
    }

    function getMaxHeight(elements) {
      const heights = elements.map(item => {
        const style = window.getComputedStyle(item);

        return parseInt(style.height, 10);
      });

      return Math.max.apply(Math, heights);
    }

    function setElementsHeight(elements, height) {
      elements.map(element => element.style.height = `${height}px`);
    }

    checkOptions();
    init();
  }

  return Height;
});
