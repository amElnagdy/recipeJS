// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
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
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/state.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setState = setState;
exports.state = void 0;
const state = {
  searchTerm: null,
  recipe: null,
  videos: null,
  video: null
};
exports.state = state;

function setState(toSet, newValue) {
  state[toSet] = newValue;
}
},{}],"src/recipeData.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchRecipe;

var _state = require("./state");

function fetchRecipe() {
  const API_KEY = `a78a3c4b083eb79d624c09e09fe86a77`;
  const AppID = `d010c74d`;
  const url = `https://api.edamam.com/search?q=${_state.state.searchTerm}&app_id=${AppID}&app_key=${API_KEY}&rom=0&to=1`;
  return fetch(url).then(res => res.json()).then(data => data.hits[0]).catch(err => console.log(err));
}
},{"./state":"src/state.js"}],"src/recipeVideos.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fetchVideo;

var _state = require("./state");

function fetchVideo() {
  const YT_API_KEY = `AIzaSyAGe_FTMQJMizv6xwYFLtW-beRGMidEzlE`;
  const type = `video`;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=3&key=${YT_API_KEY}&q=${_state.state.searchTerm}%20recipe`;
  return fetch(url).then(res => res.json()).then(data => data.items).catch(err => console.log(err));
}
},{"./state":"src/state.js"}],"node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"src/components/videoList/index.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"node_modules/parcel-bundler/src/builtins/css-loader.js"}],"src/components/videoList/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.videoList = videoList;
exports.init = init;
exports.removeVideos = removeVideos;
exports.playDefVideo = playDefVideo;

var _state = require("../../state");

require("./index.css");

function videoList() {
  const videos = _state.state.videos;
  let markup = `<div id="video-list" class="ui relaxed divided list">`;
  videos.forEach(video => {
    markup += `
	<div class="video-item item" data-id="${video.id.videoId}">
	<img class="ui image" src="${video.snippet.thumbnails.medium.url}" alt="${video.snippet.title}" />
	<div class="content">
	<div class="header">
	${video.snippet.title}
	</div>
</div>
</div>
	`;
  });
  markup += `</div>`;
  return markup;
}

function init() {
  const videos = Array.from(document.querySelectorAll(`#video-list .item`));
  videos.forEach(video => {
    video.addEventListener(`click`, openVideo);
  });
}

function openVideo(e) {
  e.preventDefault();
  const videoToPlayId = this.dataset.id;

  const videoToPlay = _state.state.videos.filter(video => videoToPlayId == video.id.videoId)[0];

  (0, _state.setState)(`video`, videoToPlay);
  let markup = `<div id="video-player">
<iframe width="600px" height="500px" src="https://www.youtube.com/embed/${videoToPlay.id.videoId}" /></div>`;
  markup += `
<div class="ui segment"><h2 class="ui header">${videoToPlay.snippet.title}</h2>
<p>${videoToPlay.snippet.description}</p></div>`;
  const container = document.querySelector(`#selected-video`);
  container.innerHTML = markup;
}

function removeVideos() {
  const videoPlayer = document.querySelector(`#video-player`);
  const videoList = document.querySelector(`#video-list`);
  if (videoList) videoList.remove();
  if (videoPlayer) videoPlayer.remove();
}

function playDefVideo() {
  const video = _state.state.video;
  let markup = `<div id="video-player">
<iframe width="600px" height="500px" src="https://www.youtube.com/embed/${video.id.videoId}" /></div>`;
  const container = document.querySelector(`#selected-video`);
  container.innerHTML = markup;
}
},{"../../state":"src/state.js","./index.css":"src/components/videoList/index.css"}],"src/components/recipeDisplay/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = singleRecipe;
exports.removePreviousRecipe = removePreviousRecipe;
exports.loadVideosClick = loadVideosClick;

var _state = require("../../state");

var _videoList = require("../videoList");

function singleRecipe() {
  const recipe = _state.state.recipe.recipe;
  let markup = `
<div id="recipe" class="ui items">
  <div class="item">
    <a class="ui small image">
      <img src="${recipe.image}" alt="${recipe.label}" />
    </a>
    <div class="content">
      <a class="header">${recipe.label}</a>
      <div class="description">
      <ul>`;
  const description = recipe.ingredientLines;
  description.forEach(des => markup += `<li>${des}</li>`);
  markup += `</ul>
      </div>
    </div>
  </div>
  <button class="load-videos ui button">Load Videos</button>
</div>
`;
  return markup;
}

function removePreviousRecipe() {
  const recipeContainer = document.querySelector(`#recipe`);
  if (recipeContainer) recipeContainer.remove();
}

function loadVideosClick() {
  const button = document.querySelector(`.load-videos`);
  button.addEventListener(`click`, loadVideos);
  button.addEventListener(`click`, _videoList.playDefVideo);
}

function loadVideos() {
  const videosDiv = document.querySelector(`.hidden`);
  videosDiv.classList.toggle(`hidden`);
}
},{"../../state":"src/state.js","../videoList":"src/components/videoList/index.js"}],"src/components/search/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = search;
exports.init = init;

var _state = require("../../state");

var _recipeData = _interopRequireDefault(require("../../recipeData"));

var _recipeVideos = _interopRequireDefault(require("../../recipeVideos"));

var _recipeDisplay = _interopRequireWildcard(require("../recipeDisplay"));

var _videoList = require("../videoList");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function search() {
  return `<div class="ui segment">
	<h1>Search for a Recipe</h1>
    <form name="search" id="search" class="ui form">
    <div class="field">
      <label for="search-field">Enter Search Term Below:</label>
      <input id="search-field" name="search" type="search" />
      </div>
      <input class="ui button" type="submit" id="submit" value="Search" />
    </form></div>`;
}

function init() {
  const search = document.querySelector(`#search`);
  search.addEventListener(`submit`, doSearch);
}

async function doSearch(e) {
  e.preventDefault();
  (0, _recipeDisplay.removePreviousRecipe)();
  (0, _videoList.removeVideos)();
  const term = document.querySelector(`#search-field`).value.toLowerCase();
  (0, _state.setState)(`searchTerm`, term);
  let [recipe, videos] = await Promise.all([(0, _recipeData.default)(), (0, _recipeVideos.default)()]);
  (0, _state.setState)(`recipe`, recipe);
  (0, _state.setState)(`videos`, videos);
  (0, _state.setState)(`video`, videos[0]); // Assign the first video to state.video
  //Display Recipe

  const markup = (0, _recipeDisplay.default)();
  document.querySelector(`#app`).insertAdjacentHTML(`beforeend`, markup);
  (0, _recipeDisplay.loadVideosClick)(); // Videos:

  const videoMarkup = (0, _videoList.videoList)();
  document.querySelector(`#videos`).insertAdjacentHTML(`beforeend`, videoMarkup);
  (0, _videoList.init)();
}
},{"../../state":"src/state.js","../../recipeData":"src/recipeData.js","../../recipeVideos":"src/recipeVideos.js","../recipeDisplay":"src/components/recipeDisplay/index.js","../videoList":"src/components/videoList/index.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _search = _interopRequireWildcard(require("./components/search"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function init() {
  let markup = (0, _search.default)();
  document.querySelector(`#app`).insertAdjacentHTML(`beforeend`, markup);
  (0, _search.init)();
}

init();
},{"./components/search":"src/components/search/index.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51719" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
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
        parents.push(k);
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

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map