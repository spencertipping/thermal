// JQuery append() array fix | Spencer Tipping
// Licensed under the terms of the MIT source code license

// Motivation.
// jQuery's default append() implementation fails to accept a JavaScript array. This fix extends append() to take multiple arguments and allow arbitrarily nested arrays. (Also applies to
// prepend(), before(), and after().) Anything that inherits from Array will also work.

(function ($) {
  var replace = function (method_name) {
    var old_method = $.fn[method_name];

    $.fn[method_name] = function () {
      for (var i = 0, l = arguments.length, x; x = arguments[i], i < l; ++i)
        if (x !== null && x !== undefined)
          if (x instanceof Array) this[method_name].apply(this, Array.prototype.slice.call(x));
          else                    old_method.call(this, x);
      return this;
    };
  };

  replace('append');
  replace('prepend');
  replace('before');
  replace('after');
})(jQuery);

// Generated by SDoc 
