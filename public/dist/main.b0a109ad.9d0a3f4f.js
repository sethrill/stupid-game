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
})({"dist/main.b0a109ad.js":[function(require,module,exports) {
var define;
var global = arguments[3];
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = function (modules, cache, entry, globalName) {
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
        } // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.


        if (previousRequire) {
          return previousRequire(name, true);
        } // Try the node require function if it exists.


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

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
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
    var mainExports = newRequire(entry[entry.length - 1]); // CommonJS

    if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
      module.exports = mainExports; // RequireJS
    } else if (typeof define === "function" && define.amd) {
      define(function () {
        return mainExports;
      }); // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  } // Override the current require with this new one


  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
}({
  "src/CST.ts": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.CST = {
      SCENES: {
        LOAD: "LOAD",
        MENU: "MENU",
        LEVEL1: 'LEVEL1'
      }
    };
  }, {}],
  "src/scenes/LoadScene.ts": [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics(d, b);
      };

      return function (d, b) {
        _extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CST_1 = require("../CST");

    var LoadScene =
    /** @class */
    function (_super) {
      __extends(LoadScene, _super);

      function LoadScene() {
        return _super.call(this, {
          key: CST_1.CST.SCENES.LOAD
        }) || this;
      }

      LoadScene.prototype.preload = function () {
        var _this = this;

        this.load.image("title_bg", "./assets/images/space.jpg");
        this.load.image("level_bg", "./assets/images/space.png");
        this.load.image("player", "./assets/images/player.png");
        this.load.image("bullet", "./assets/images/bullet.png");
        this.load.image("title", "./assets/images/title.png");
        this.load.image("play", "./assets/images/play.png");
        this.load.image("options", "./assets/images/options.png");
        this.load.audio("title_music", "./assets/audio/8bit-orchestra.mp3");
        var loadingBar = this.add.graphics({
          fillStyle: {
            color: 0xffffff
          }
        });
        /*  for (let i = 0; i < 100; i++) {
             console.log(i)
         } */

        this.load.on("progress", function (percent) {
          loadingBar.fillRect(0, _this.game.renderer.height / 2, _this.game.renderer.width * percent, 50); //console.log(percent);
        });
        this.load.on("load", function (file) {//console.log(file.src);
        });
      };

      LoadScene.prototype.create = function () {
        //this.scene.add(CST.SCENES.MENU, MenuScene, false)
        this.scene.start(CST_1.CST.SCENES.MENU);
      };

      return LoadScene;
    }(Phaser.Scene);

    exports.LoadScene = LoadScene;
  }, {
    "../CST": "src/CST.ts"
  }],
  "src/scenes/MenuScene.ts": [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics(d, b);
      };

      return function (d, b) {
        _extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CST_1 = require("../CST");

    var MenuScene =
    /** @class */
    function (_super) {
      __extends(MenuScene, _super);

      function MenuScene() {
        return _super.call(this, {
          key: CST_1.CST.SCENES.MENU
        }) || this;
      }

      MenuScene.prototype.init = function () {};

      MenuScene.prototype.create = function () {
        var _this = this; //this.scene.start(CST.SCENES.MENU);
        //create background and add title + buttons


        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.20, "title").setDepth(1);
        this.add.image(0, 0, "title_bg").setOrigin(0).setDepth(0);
        var playButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'play').setDepth(1);
        var optionsButton = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2 + 50, 'options').setDepth(1); //create hover sprite near play button

        var hoverSprite = this.add.sprite(100, 100, "player");
        hoverSprite.setScale(0.7);
        hoverSprite.setVisible(false); //create audio

        /* this.sound.pauseOnBlur = false;
        this.sound.play("title_music", {
            loop: true
        });
        */
        //button interactivity

        playButton.setInteractive();
        optionsButton.setInteractive();
        playButton.on("pointerover", function () {
          hoverSprite.setVisible(true);
          hoverSprite.x = playButton.x - playButton.width;
          hoverSprite.y = playButton.y;
        });
        playButton.on("pointerout", function () {
          hoverSprite.setVisible(false);
        });
        playButton.on("pointerup", function () {
          _this.scene.start(CST_1.CST.SCENES.LEVEL1);
        });
        optionsButton.on("pointerover", function () {
          hoverSprite.setVisible(true);
          hoverSprite.x = optionsButton.x - optionsButton.width;
          hoverSprite.y = optionsButton.y;
        });
        optionsButton.on("pointerout", function () {
          hoverSprite.setVisible(false);
        });
        optionsButton.on("pointerup", function () {//this.scene.launch();
        });
      };

      return MenuScene;
    }(Phaser.Scene);

    exports.MenuScene = MenuScene;
  }, {
    "../CST": "src/CST.ts"
  }],
  "src/prefabs/Bullet.ts": [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics(d, b);
      };

      return function (d, b) {
        _extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Bullet =
    /** @class */
    function (_super) {
      __extends(Bullet, _super);

      function Bullet(scene, x, y) {
        var _this = _super.call(this, scene, x, y, 'bullet') || this;

        _this.speed = 1;
        _this.born = 0;
        _this.direction = 0;
        _this.xSpeed = 0;
        _this.ySpeed = 0;

        _this.setSize(12, 12);

        return _this;
      }

      Bullet.prototype.fire = function (shooter, target) {
        this.setPosition(shooter.x, shooter.y); // Initial position

        this.direction = Math.atan((target.x - this.x) / (target.y - this.y));
        console.log("bullet direction: ", this.direction); //some light randomness to the bullet angle

        this.direction += 1.55;
        this.direction += Math.random() / 10 + -(Math.random() / 10); // Calculate X and y velocity of bullet to moves it from shooter to target

        if (target.y >= this.y) {
          this.xSpeed = this.speed * Math.sin(this.direction);
          this.ySpeed = this.speed * Math.cos(this.direction);
        } else {
          this.xSpeed = -this.speed * Math.sin(this.direction);
          this.ySpeed = -this.speed * Math.cos(this.direction);
        }

        this.rotation = shooter.rotation; // angle bullet with shooters rotation

        this.born = 0;
      };

      Bullet.prototype.update = function (time, delta) {
        this.x += this.xSpeed * delta;
        this.y += this.ySpeed * delta;
        this.born += delta;

        if (this.born > 1500) {
          this.setActive(false);
          this.setVisible(false);
        }
      };

      return Bullet;
    }(Phaser.GameObjects.Image);

    exports.Bullet = Bullet;
  }, {}],
  "src/scenes/FirstLevelScene.ts": [function (require, module, exports) {
    "use strict";

    var __extends = this && this.__extends || function () {
      var _extendStatics = function extendStatics(d, b) {
        _extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function (d, b) {
          d.__proto__ = b;
        } || function (d, b) {
          for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
          }
        };

        return _extendStatics(d, b);
      };

      return function (d, b) {
        _extendStatics(d, b);

        function __() {
          this.constructor = d;
        }

        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var CST_1 = require("../CST");

    var Bullet_1 = require("../prefabs/Bullet");

    var FirstLevelScene =
    /** @class */
    function (_super) {
      __extends(FirstLevelScene, _super);

      function FirstLevelScene() {
        return _super.call(this, {
          key: CST_1.CST.SCENES.LEVEL1
        }) || this;
      }

      FirstLevelScene.prototype.create = function () {
        var _this = this;

        this.background = this.add.tileSprite(0, 0, this.game.renderer.width, this.game.renderer.height, "level_bg").setOrigin(0).setDepth(0);
        this.player = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height * 0.90, "player");
        this.player.setCollideWorldBounds(true);
        this.playerBullets = this.physics.add.group({
          classType: Bullet_1.Bullet,
          maxSize: 50,
          runChildUpdate: true
        });
        this.keyboard = this.input.keyboard.addKeys("w, a, d, s");
        this.input.on('pointerdown', function () {
          var bullet = _this.playerBullets.get();

          if (bullet) {
            bullet.setActive(true).setVisible(true);
            var velocity = new Phaser.Math.Vector2();

            _this.physics.velocityFromRotation(_this.player.rotation, 400, velocity);

            bullet.fire(_this.player, {
              x: velocity.x * 180 / Math.PI,
              y: velocity.y * 180 / Math.PI
            });
          }
        }, this);
      };

      FirstLevelScene.prototype.update = function () {
        this.background.tilePositionY -= 0.5;
        this.player.setVelocity(0);

        if (this.keyboard.a.isDown) {
          this.player.setVelocityX(-250);
        }

        if (this.keyboard.d.isDown) {
          this.player.setVelocityX(250);
        }

        if (this.keyboard.w.isDown) {
          this.player.setVelocityY(-250);
        }

        if (this.keyboard.s.isDown) {
          this.player.setVelocityY(250);
        }

        var angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.input.x, this.input.y); //rotation cannon

        this.player.setRotation(angle + Math.PI / 2);
      };

      return FirstLevelScene;
    }(Phaser.Scene);

    exports.FirstLevelScene = FirstLevelScene;
  }, {
    "../CST": "src/CST.ts",
    "../prefabs/Bullet": "src/prefabs/Bullet.ts"
  }],
  "src/main.ts": [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var LoadScene_1 = require("./scenes/LoadScene");

    var MenuScene_1 = require("./scenes/MenuScene");

    var FirstLevelScene_1 = require("./scenes/FirstLevelScene");
    /** @type {import("../typings/phaser")} */


    console.log("hi");
    var game = new Phaser.Game({
      width: 800,
      height: 600,
      scene: [LoadScene_1.LoadScene, MenuScene_1.MenuScene, FirstLevelScene_1.FirstLevelScene],
      physics: {
        default: "arcade"
      }
    });
  }, {
    "./scenes/LoadScene": "src/scenes/LoadScene.ts",
    "./scenes/MenuScene": "src/scenes/MenuScene.ts",
    "./scenes/FirstLevelScene": "src/scenes/FirstLevelScene.ts"
  }],
  "C:/Users/Alex/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js": [function (require, module, exports) {
    var global = arguments[3];
    var OVERLAY_ID = '__parcel__error__overlay__';
    var OldModule = module.bundle.Module;

    function Module(moduleName) {
      OldModule.call(this, moduleName);
      this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function accept(fn) {
          this._acceptCallbacks.push(fn || function () {});
        },
        dispose: function dispose(fn) {
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
      var ws = new WebSocket(protocol + '://' + hostname + ':' + "57699" + '/');

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
  }, {}]
}, {}, ["C:/Users/Alex/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js", "src/main.ts"], null);
},{}],"C:/Users/Alex/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57699" + '/');

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
},{}]},{},["C:/Users/Alex/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dist/main.b0a109ad.js"], null)
//# sourceMappingURL=/main.b0a109ad.9d0a3f4f.js.map