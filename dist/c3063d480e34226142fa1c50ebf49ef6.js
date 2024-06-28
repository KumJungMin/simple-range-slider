// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({6:[function(require,module,exports) {
"use strict";

var RangeSlider = /** @class */function () {
    function RangeSlider() {
        var _this = this;
        this.constants = {
            MAX_VALUE: this.getGlobalCssValue("--max-value"),
            MIN_VALUE: this.getGlobalCssValue("--min-value"),
            RANGE_STEP: this.getGlobalCssValue("--range-step"),
            HANDLE_SIZE: this.getGlobalCssValue("--handle-size"),
            get RANGE() {
                return this.MAX_VALUE - this.MIN_VALUE;
            }
        };
        this.elements = {
            progress: document.querySelector(".progress"),
            minRange: document.querySelector(".min-range"),
            maxRange: document.querySelector(".max-range"),
            handles: document.querySelectorAll(".handle")
        };
        this.elements.minRange.addEventListener("input", function (e) {
            _this.setStartValue(+e.target.value);
        });
        this.elements.maxRange.addEventListener("input", function (e) {
            _this.setEndValue(+e.target.value);
        });
    }
    RangeSlider.prototype.getGlobalCssValue = function (key) {
        var property = getComputedStyle(document.documentElement).getPropertyValue(key);
        return property ? parseFloat(property) : 0;
    };
    RangeSlider.prototype.init = function (_a) {
        var min = _a.min,
            max = _a.max;
        var _b = this.constants,
            MIN_VALUE = _b.MIN_VALUE,
            MAX_VALUE = _b.MAX_VALUE,
            RANGE_STEP = _b.RANGE_STEP;
        var _c = this.elements,
            minRange = _c.minRange,
            maxRange = _c.maxRange;
        minRange.min = maxRange.min = MIN_VALUE.toString();
        minRange.max = maxRange.max = MAX_VALUE.toString();
        minRange.step = maxRange.step = RANGE_STEP.toString();
        // Initialize values
        minRange.value = min.toString();
        maxRange.value = max.toString();
        this.setStartValue(min);
        this.setEndValue(max);
    };
    RangeSlider.prototype.setHandlePos = function (range, handle) {
        var _a = this.constants,
            MIN_VALUE = _a.MIN_VALUE,
            RANGE = _a.RANGE,
            HANDLE_SIZE = _a.HANDLE_SIZE;
        var percentage = (parseFloat(range.value) - MIN_VALUE) / RANGE;
        var offset = HANDLE_SIZE / 2 - HANDLE_SIZE * percentage;
        var left = "calc(" + percentage * 100 + "% + " + offset + "px)";
        handle.style.left = left;
    };
    RangeSlider.prototype.setStartValue = function (v) {
        var _a = this.elements,
            minRange = _a.minRange,
            maxRange = _a.maxRange,
            progress = _a.progress,
            handles = _a.handles;
        if (v >= +maxRange.value) {
            v = +maxRange.value - this.constants.RANGE_STEP;
            minRange.value = v.toString();
        }
        var value = this.getCurrStep(v) * this.constants.RANGE_STEP;
        progress.style.left = value / this.constants.RANGE * 100 + "%";
        this.setHandlePos(minRange, handles[0]);
    };
    RangeSlider.prototype.setEndValue = function (v) {
        var _a = this.elements,
            minRange = _a.minRange,
            maxRange = _a.maxRange,
            progress = _a.progress,
            handles = _a.handles;
        if (v <= +minRange.value) {
            v = +minRange.value + this.constants.RANGE_STEP;
            maxRange.value = v.toString();
        }
        var value = this.getCurrStep(v) * this.constants.RANGE_STEP;
        progress.style.right = 100 - value / this.constants.RANGE * 100 + "%";
        this.setHandlePos(maxRange, handles[1]);
    };
    RangeSlider.prototype.getCurrStep = function (v) {
        return (v - this.constants.MIN_VALUE) / this.constants.RANGE_STEP;
    };
    return RangeSlider;
}();
var slider = new RangeSlider();
slider.init({ min: 10, max: 150 });
},{}],13:[function(require,module,exports) {

var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '50330' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id);
  });
}
},{}]},{},[13,6])
//# sourceMappingURL=/dist/c3063d480e34226142fa1c50ebf49ef6.map