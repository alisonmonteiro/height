function Height(opts) {
  'use strict';

  opts = opts || {};

  function checkOpts() {
    if (typeof opts.columns !== 'number' || typeof opts.listElem !== 'string') {
      throw new TypeError('`opts.columns` must be a `number` AND `opts.listElem` must be a `string`')
    }
  }

  function init() {
    var elements = document.querySelectorAll(opts.listElem)
    var maxHeight = 0;
    var rowElements = [];

    elements = Array.prototype.slice.call(elements)

    if (elements.length > 0) {
      for (var index = 0; index < elements.length; index++) {
        var toPosition = (index + opts.columns - 1);

        toPosition = (toPosition > elements.length)
          ? (elements.length - 1)
          : toPosition;

        rowElements = elements.slice(index, (toPosition + 1));

        maxHeight = getMaxHeight(rowElements);
        setElementsHeight(rowElements, maxHeight);

        index = toPosition;
      }
    }
  }

  function getMaxHeight(elements) {
    var style, heights = [];

    heights = elements.map(function(item) {
      style = window.getComputedStyle(item);

      if (heights.indexOf(parseInt(style.height)) !== 0)
        return parseInt(style.height);
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
