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
})({"js/juego.js":[function(require,module,exports) {
document.addEventListener("DOMContentLoaded", function () {
  var arriba = ["frame0", "frame1", "frame2", "frame1"];
  var abajo = ["frame6", "frame7", "frame8", "frame7"];
  var izquierda = ["frame9", "frame10", "frame11", "frame10"];
  var derecha = ["frame3", "frame4", "frame5", "frame4"];
  var frames = abajo;
  var velocidadMovimiento = 3;
  var movimiento = {
    arriba: false,
    abajo: false,
    izquierda: false,
    derecha: false
  };
  var frame_actual = 0;
  var distanciaProximidad = 50;
  function animar() {
    personaje.className = frames[frame_actual];
    frame_actual = (frame_actual + 1) % frames.length;
  }
  function moverPersonaje() {
    if (movimiento.arriba) {
      frames = arriba;
      var newPosition = parseInt(getComputedStyle(personaje).top) - velocidadMovimiento;
      var imageElement = document.getElementById("background");
      var imageTop = parseInt(getComputedStyle(imageElement).top);
      var Limit_Element = document.getElementById("limitante");
      var imageTop_Element = parseInt(getComputedStyle(Limit_Element).top);
      if (newPosition >= imageTop_Element) {
        personaje.style.top = newPosition + "px";
      }
    }
    if (movimiento.abajo) {
      frames = abajo;
      var _newPosition = parseInt(getComputedStyle(personaje).top) + velocidadMovimiento;
      var _imageElement = document.getElementById("background");
      var imageBottom = parseInt(getComputedStyle(_imageElement).top) + parseInt(getComputedStyle(_imageElement).height) - parseInt(getComputedStyle(personaje).height);
      if (_newPosition <= imageBottom) {
        personaje.style.top = _newPosition + "px";
      }
    }
    if (movimiento.izquierda) {
      frames = izquierda;
      var _newPosition2 = parseInt(getComputedStyle(personaje).left) - velocidadMovimiento;
      var _imageElement2 = document.getElementById("background");
      var imageLeft = parseInt(getComputedStyle(_imageElement2).left);
      if (_newPosition2 >= imageLeft) {
        personaje.style.left = _newPosition2 + "px";
      }
    }
    if (movimiento.derecha) {
      frames = derecha;
      var _newPosition3 = parseInt(getComputedStyle(personaje).left) + velocidadMovimiento;
      var _imageElement3 = document.getElementById("background");
      var imageRight = parseInt(getComputedStyle(_imageElement3).left) + parseInt(getComputedStyle(_imageElement3).width) - parseInt(getComputedStyle(personaje).width);
      if (_newPosition3 <= imageRight) {
        personaje.style.left = _newPosition3 + "px";
      }
    }
    requestAnimationFrame(moverPersonaje);
  }

  // Inicializar elementos
  personaje = document.getElementById("personaje");
  Imagen_1 = document.getElementById("Imagen_1");
  Imagen_2 = document.getElementById("Imagen_2");
  Imagen_3 = document.getElementById("Imagen_3");
  Imagen_4 = document.getElementById("Imagen_4");
  popUp_1 = document.querySelector(".pop-up_1");
  popUp_2 = document.querySelector(".pop-up_2");
  popUp_3 = document.querySelector(".pop-up_3");
  popUp_4 = document.querySelector(".pop-up_4");
  moverPersonaje();
  document.addEventListener("keydown", function (event) {
    switch (event.key) {
      case "ArrowUp":
        movimiento.arriba = true;
        break;
      case "ArrowDown":
        movimiento.abajo = true;
        break;
      case "ArrowLeft":
        movimiento.izquierda = true;
        break;
      case "ArrowRight":
        movimiento.derecha = true;
        break;
      case "i":
        window.location.href = 'INVENTARIO_PC.html';
        break;
      case "I":
        window.location.href = 'INVENTARIO_PC.html';
        break;
      case "m":
        window.location.href = 'MAPA_PC.html';
        break;
      case "M":
        window.location.href = 'MAPA_PC.html';
        break;
    }
  });
  document.addEventListener("keyup", function (event) {
    switch (event.key) {
      case "ArrowUp":
        movimiento.arriba = false;
        break;
      case "ArrowDown":
        movimiento.abajo = false;
        break;
      case "ArrowLeft":
        movimiento.izquierda = false;
        break;
      case "ArrowRight":
        movimiento.derecha = false;
        break;
    }
  });
  setInterval(animar, 100);
  var PopUp_1_Visible = false;
  var PopUp_2_Visible = false;
  var PopUp_3_Visible = false;
  var PopUp_4_Visible = false;
  var distancia_Imagen_1;
  var distancia_Imagen_2;
  var distancia_Imagen_3;
  var distancia_Imagen_4;
  function togglePopUp() {
    console.log("En efecto se hizo.");
    var personajeRect = personaje.getBoundingClientRect();
    var Rect_1 = Imagen_1.getBoundingClientRect();
    var Rect_2 = Imagen_2.getBoundingClientRect();
    var Rect_3 = Imagen_3.getBoundingClientRect();
    var Rect_4 = Imagen_4.getBoundingClientRect();
    var centroImagen = function centroImagen(rect) {
      return {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    };
    var Imagen_1_pos = centroImagen(Rect_1);
    var Imagen_2_pos = centroImagen(Rect_2);
    var Imagen_3_pos = centroImagen(Rect_3);
    var Imagen_4_pos = centroImagen(Rect_4);
    distancia_Imagen_1 = calcularDistancia(personajeRect, Imagen_1_pos);
    distancia_Imagen_2 = calcularDistancia(personajeRect, Imagen_2_pos);
    distancia_Imagen_3 = calcularDistancia(personajeRect, Imagen_3_pos);
    distancia_Imagen_4 = calcularDistancia(personajeRect, Imagen_4_pos);

    //console.log("Distancia a Segunda Imagen:", distancia_Imagen_1);
    //console.log("Distancia a Tercera Imagen:", distancia_Imagen_2);

    if (distancia_Imagen_1 <= distanciaProximidad) {
      PopUp_1_Visible = !PopUp_1_Visible;
      togglePopUpVisible(popUp_1, PopUp_1_Visible);
    } else {
      PopUp_1_Visible = false;
      togglePopUpVisible(popUp_1, false);
    }
    if (distancia_Imagen_2 <= distanciaProximidad) {
      PopUp_2_Visible = !PopUp_2_Visible;
      togglePopUpVisible(popUp_2, PopUp_2_Visible);
    } else {
      PopUp_2_Visible = false;
      togglePopUpVisible(popUp_2, false);
    }
    if (distancia_Imagen_3 <= distanciaProximidad) {
      PopUp_3_Visible = !PopUp_3_Visible;
      togglePopUpVisible(popUp_3, PopUp_3_Visible);
    } else {
      PopUp_3_Visible = false;
      togglePopUpVisible(popUp_3, false);
    }
    if (distancia_Imagen_4 <= distanciaProximidad) {
      PopUp_4_Visible = !PopUp_4_Visible;
      togglePopUpVisible(popUp_4, PopUp_4_Visible);
    } else {
      PopUp_4_Visible = false;
      togglePopUpVisible(popUp_4, false);
    }
  }
  function calcularDistancia(rect, punto) {
    var centerX1 = rect.x + rect.width / 2;
    var centerY1 = rect.y + rect.height / 2;
    return Math.sqrt(Math.pow(centerX1 - punto.x, 2) + Math.pow(centerY1 - punto.y, 2));
  }
  function togglePopUpVisible(popUpElement, isVisible) {
    if (isVisible) {
      popUpElement.style.display = "block";
    } else {
      popUpElement.style.display = "none";
    }
  }
  var buttonToShowPopUp = document.getElementById("showPopUpButton");
  buttonToShowPopUp.addEventListener("click", togglePopUp);
  document.addEventListener("keydown", function (event) {
    if (event.key === "e") {
      togglePopUp();
    }
  });
});
},{}],"../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64586" + '/');
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
      });

      // Enable HMR for CSS by default.
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
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
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
},{}]},{},["../../../../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/juego.js"], null)
//# sourceMappingURL=juego.a5a2de27.js.map