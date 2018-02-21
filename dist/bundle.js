/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _render = __webpack_require__(1);

var _ClassicMaze = __webpack_require__(40);

var _ClassicMaze2 = _interopRequireDefault(_ClassicMaze);

var _PacmanEntity = __webpack_require__(41);

var _PacmanEntity2 = _interopRequireDefault(_PacmanEntity);

var _RedPhantom = __webpack_require__(8);

var _RedPhantom2 = _interopRequireDefault(_RedPhantom);

var _PinkPhantom = __webpack_require__(14);

var _PinkPhantom2 = _interopRequireDefault(_PinkPhantom);

var _BluePhantom = __webpack_require__(15);

var _BluePhantom2 = _interopRequireDefault(_BluePhantom);

var _OrangePhantom = __webpack_require__(16);

var _OrangePhantom2 = _interopRequireDefault(_OrangePhantom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mainGear = new _render.Gear({
    load: function load() {
        return {
            tiles: _render.Loader.loadTextureFromUrl(window.location.origin + '/assets/tileset.png')
        };
    },
    init: function init() {
        var _this = this;

        this.paused = false;
        this.pausedTime = 0;
        this.acumulateTime = 0;

        this.lives = 3;

        this.tileset = this.tiles.split(1, 8)[0];
        Pacman.GLOBALS.tileset = this.tileset;
        Pacman.GLOBALS.maze = _ClassicMaze2.default;
        this.sb = new _render.SpriteBatch(Pacman.context);
        this.gearStack.init();

        this.pauseGame(5);

        this.$subscribe('pacmanDead', function () {
            return _this.onPacmanDead();
        });
    },
    update: function update() {
        if (this.paused) {
            this.acumulateTime += Pacman.deltaTime;
            if (this.acumulateTime >= this.pausedTime) {
                this.paused = false;
                this.acumulateTime = 0;
            }
            return;
        }
        this.gearStack.update();
    },
    render: function render() {
        Pacman.context.fillRect(0, 0, 224, 288);
        this.sb.begin();
        _ClassicMaze2.default.render(this.sb);
        this.gearStack.render(this.sb);
        for (var i = 0; i < this.lives; i++) {
            this.sb.drawTexture(this.tileset[1], 16 + i * 16, 276);
        }
        this.sb.drawText("HIGH SCORE", "white", "8px Verdana", "center", 108, 8);
        this.sb.drawText(Pacman.GLOBALS.POINTS, "white", "8px Verdana", "center", 108, 16);
        this.sb.end();
    },

    methods: {
        pauseGame: function pauseGame(time) {
            this.paused = true;
            this.pausedTime = time;
            this.acumulateTime = 0;
        },
        onPacmanDead: function onPacmanDead() {
            _PacmanEntity2.default.softReset();
            _RedPhantom2.default.softReset();
            _PinkPhantom2.default.softReset();
            _BluePhantom2.default.softReset();
            _OrangePhantom2.default.softReset();
            this.lives--;
            this.pauseGame(5);
        }
    },
    gears: {
        PacmanEntity: _PacmanEntity2.default,
        RedPhantom: _RedPhantom2.default,
        PinkPhantom: _PinkPhantom2.default,
        BluePhantom: _BluePhantom2.default,
        OrangePhantom: _OrangePhantom2.default
    }
});

var Pacman = new _render.Game({ container_id: "pacman", width: 224, height: 288 }, mainGear);
Pacman.GLOBALS = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
    PacmanEntity: _PacmanEntity2.default,
    POINTS: 0
};

exports.default = Pacman;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _core = __webpack_require__(18);

Object.defineProperty(exports, 'Game', {
  enumerable: true,
  get: function get() {
    return _core.Game;
  }
});
Object.defineProperty(exports, 'Gear', {
  enumerable: true,
  get: function get() {
    return _core.Gear;
  }
});

var _graphics = __webpack_require__(29);

Object.defineProperty(exports, 'TextureRegion', {
  enumerable: true,
  get: function get() {
    return _graphics.TextureRegion;
  }
});
Object.defineProperty(exports, 'SpriteBatch', {
  enumerable: true,
  get: function get() {
    return _graphics.SpriteBatch;
  }
});
Object.defineProperty(exports, 'Animation', {
  enumerable: true,
  get: function get() {
    return _graphics.Animation;
  }
});
Object.defineProperty(exports, 'Camera', {
  enumerable: true,
  get: function get() {
    return _graphics.Camera;
  }
});

var _maths = __webpack_require__(12);

Object.defineProperty(exports, 'M3', {
  enumerable: true,
  get: function get() {
    return _maths.M3;
  }
});
Object.defineProperty(exports, 'Polygon', {
  enumerable: true,
  get: function get() {
    return _maths.Polygon;
  }
});
Object.defineProperty(exports, 'Rectangle', {
  enumerable: true,
  get: function get() {
    return _maths.Rectangle;
  }
});
Object.defineProperty(exports, 'Vector2D', {
  enumerable: true,
  get: function get() {
    return _maths.Vector2D;
  }
});

var _assetLoader = __webpack_require__(5);

Object.defineProperty(exports, 'Loader', {
  enumerable: true,
  get: function get() {
    return _assetLoader.Loader;
  }
});

var _input = __webpack_require__(35);

Object.defineProperty(exports, 'Keyboard', {
  enumerable: true,
  get: function get() {
    return _input.KeyboardInputManager;
  }
});
Object.defineProperty(exports, 'Mouse', {
  enumerable: true,
  get: function get() {
    return _input.MouseInputManager;
  }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EventEmiter = __webpack_require__(22);

Object.defineProperty(exports, 'EventEmiter', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_EventEmiter).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssetCache = new Map();

exports.AssetCache = AssetCache;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var M3 = {
	identity: function identity() {
		return [1, 0, 0, 0, 1, 0, 0, 0, 1];
	},
	multiply: function multiply(a, b) {
		var a00 = a[0 * 3 + 0];
		var a01 = a[0 * 3 + 1];
		var a02 = a[0 * 3 + 2];
		var a10 = a[1 * 3 + 0];
		var a11 = a[1 * 3 + 1];
		var a12 = a[1 * 3 + 2];
		var a20 = a[2 * 3 + 0];
		var a21 = a[2 * 3 + 1];
		var a22 = a[2 * 3 + 2];
		var b00 = b[0 * 3 + 0];
		var b01 = b[0 * 3 + 1];
		var b02 = b[0 * 3 + 2];
		var b10 = b[1 * 3 + 0];
		var b11 = b[1 * 3 + 1];
		var b12 = b[1 * 3 + 2];
		var b20 = b[2 * 3 + 0];
		var b21 = b[2 * 3 + 1];
		var b22 = b[2 * 3 + 2];
		return [b00 * a00 + b01 * a10 + b02 * a20, b00 * a01 + b01 * a11 + b02 * a21, b00 * a02 + b01 * a12 + b02 * a22, b10 * a00 + b11 * a10 + b12 * a20, b10 * a01 + b11 * a11 + b12 * a21, b10 * a02 + b11 * a12 + b12 * a22, b20 * a00 + b21 * a10 + b22 * a20, b20 * a01 + b21 * a11 + b22 * a21, b20 * a02 + b21 * a12 + b22 * a22];
	},
	translate: function translate(m, tx, ty) {
		var translation = [1, 0, 0, 0, 1, 0, tx, ty, 1];
		return this.multiply(m, translation);
	},
	rotate: function rotate(m, angle) {
		var rotation = [Math.cos(angle), Math.sin(angle), 0, -Math.sin(angle), Math.cos(angle), 0, 0, 0, 1];
		return this.multiply(m, rotation);
	},
	scale: function scale(m, sx, sy) {
		var scalation = [sx, 0, 0, 0, sy, 0, 0, 0, 1];
		return this.multiply(m, scalation);
	},
	toCanvas2dMatrix: function toCanvas2dMatrix(m) {
		return [m[0], m[1], m[3], m[4], m[6], m[7]];
	}
};

exports.default = M3;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _render = __webpack_require__(1);

var _Pacman = __webpack_require__(0);

var _Pacman2 = _interopRequireDefault(_Pacman);

var _Maze = __webpack_require__(7);

var _Maze2 = _interopRequireDefault(_Maze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Phantom = function Phantom(sprite, patrolPoint, spawnPoint, onHuntMode, onInJail) {
    return new _render.Gear({
        init: function init() {
            this.paused = false;
            this.pausedTime = 0;

            this.mode = 'Patrol';
            this.prevMode = 'Patrol';

            this.sprite = sprite;

            this.timeRefernce = 0;
            this.acumulateTime = 0;

            this.spawnPoint = spawnPoint;
            var spawn = this.spawnPoint();
            this.inJail = true;
            this.onInJail = onInJail;

            this.x = spawn.x;
            this.y = spawn.y;
            this.xRounded = spawn.x;
            this.yRounded = spawn.y;

            this.patrolPoint = patrolPoint;

            this.v = 3.5;

            this.direction = _Pacman2.default.GLOBALS.LEFT;
            this.nextDirection = _Pacman2.default.GLOBALS.LEFT;
            this.nextDirectionCalculated = false;

            this.onHuntModeCb = onHuntMode;
        },
        update: function update() {
            var _this = this;

            if (this.paused) {
                this.acumulateTime += _Pacman2.default.deltaTime;
                if (this.acumulateTime >= this.pausedTime) {
                    this.paused = false;
                    this.acumulateTime = 0;
                }
                return;
            }

            if (this.inJail) {
                this.onInJail(this);
                if (!this.inJail) {
                    this.$subscribe('enterPanic', function () {
                        _this.prevMode = _this.mode;
                        _this.mode = 'Panic';
                        _this.acumulateTime = 0;
                    });
                } else return;
            }

            var prevX = this.x;
            var prevY = this.y;

            var movement = this.v * _Pacman2.default.deltaTime;
            if (movement > 0.1) movement = 0.1;

            if (this.direction == _Pacman2.default.GLOBALS.UP) this.y -= movement;else if (this.direction == _Pacman2.default.GLOBALS.RIGHT) this.x += movement;else if (this.direction == _Pacman2.default.GLOBALS.DOWN) this.y += movement;else if (this.direction == _Pacman2.default.GLOBALS.LEFT) this.x -= movement;

            this.fixPosition();

            this.xRounded = Math.round(this.x * 10) / 10;
            this.yRounded = Math.round(this.y * 10) / 10;

            this.changeDirection();

            this.setMode();
        },
        render: function render(sb) {
            sb.drawTexture(_Pacman2.default.GLOBALS.tileset[this.sprite], this.xRounded * 8, this.yRounded * 8);
        },

        methods: {
            calculateDirection: function calculateDirection(targetPoint, _ref) {
                var i = _ref.i,
                    j = _ref.j;

                var allDirections = _Pacman2.default.GLOBALS.maze.intersections.get(JSON.stringify([i, j]));
                var index = allDirections.indexOf((this.direction + 2) % 4);
                var directions = index != -1 ? allDirections.filter(function (e) {
                    return e != allDirections[index];
                }) : allDirections;

                if (directions.lenght == 1) {
                    this.nextDirection = directions[0];
                    this.nextDirectionCalculated = true;
                } else {
                    var min = Number.MAX_VALUE;
                    var targetDirection = 0;
                    for (var n = 0; n < directions.length; n++) {
                        var direction = directions[n];
                        if (direction == _Pacman2.default.GLOBALS.UP) {
                            var distance = new _render.Vector2D(Math.floor(this.x), Math.floor(this.y) - 1, targetPoint.x, targetPoint.y).magnitude();
                            if (distance < min) {
                                min = distance;
                                targetDirection = direction;
                            }
                        } else if (direction == _Pacman2.default.GLOBALS.RIGHT) {
                            var _distance = new _render.Vector2D(Math.floor(this.x) + 1, Math.floor(this.y), targetPoint.x, targetPoint.y).magnitude();
                            if (_distance < min) {
                                min = _distance;
                                targetDirection = direction;
                            }
                        } else if (direction == _Pacman2.default.GLOBALS.DOWN) {
                            var _distance2 = new _render.Vector2D(Math.floor(this.x), Math.floor(this.y) + 1, targetPoint.x, targetPoint.y).magnitude();
                            if (_distance2 < min) {
                                min = _distance2;
                                targetDirection = direction;
                            }
                        } else if (direction == _Pacman2.default.GLOBALS.LEFT) {
                            var _distance3 = new _render.Vector2D(Math.floor(this.x) - 1, Math.floor(this.y), targetPoint.x, targetPoint.y).magnitude();
                            if (_distance3 < min) {
                                min = _distance3;
                                targetDirection = direction;
                            }
                        }
                    }
                    this.nextDirection = targetDirection;
                    this.nextDirectionCalculated = true;
                }
            },
            changeDirection: function changeDirection() {
                var _getTile = this.getTile(),
                    i = _getTile.i,
                    j = _getTile.j;

                if (!_Pacman2.default.GLOBALS.maze.intersections.has(JSON.stringify([i, j]))) {
                    this.nextDirectionCalculated = false;
                    return;
                }

                if (!this.nextDirectionCalculated) {
                    this['on' + this.mode + 'Mode']({ i: i, j: j });
                }

                if (this.nextDirection == _Pacman2.default.GLOBALS.UP && _Pacman2.default.GLOBALS.maze.layout[i - 1][j] > 0 && this.xRounded % 1 <= 0.1) {
                    this.x = Math.floor(this.x);
                    this.direction = this.nextDirection;
                } else if (this.nextDirection == _Pacman2.default.GLOBALS.RIGHT && _Pacman2.default.GLOBALS.maze.layout[i][j + 1] > 0 && this.yRounded % 1 <= 0.1) {
                    this.y = Math.floor(this.y);
                    this.direction = this.nextDirection;
                } else if (this.nextDirection == _Pacman2.default.GLOBALS.DOWN && _Pacman2.default.GLOBALS.maze.layout[i + 1][j] > 0 && this.xRounded % 1 <= 0.1) {
                    this.x = Math.floor(this.x);
                    this.direction = this.nextDirection;
                } else if (this.nextDirection == _Pacman2.default.GLOBALS.LEFT && _Pacman2.default.GLOBALS.maze.layout[i][j - 1] > 0 && this.yRounded % 1 <= 0.1) {
                    this.y = Math.floor(this.y);
                    this.direction = this.nextDirection;
                }
            },
            fixPosition: function fixPosition() {
                var _getTile2 = this.getTile(),
                    i = _getTile2.i,
                    j = _getTile2.j;

                if (this.direction == _Pacman2.default.GLOBALS.UP && _Pacman2.default.GLOBALS.maze.layout[i][j] == _Maze2.default.BLOCKS.WALL) this.y = Math.ceil(this.y);else if (this.direction == _Pacman2.default.GLOBALS.RIGHT && _Pacman2.default.GLOBALS.maze.layout[i][j + 1] == _Maze2.default.BLOCKS.WALL) this.x = Math.floor(this.x);else if (this.direction == _Pacman2.default.GLOBALS.DOWN && _Pacman2.default.GLOBALS.maze.layout[i + 1][j] == _Maze2.default.BLOCKS.WALL) this.y = Math.floor(this.y);else if (this.direction == _Pacman2.default.GLOBALS.LEFT && _Pacman2.default.GLOBALS.maze.layout[i][j] == _Maze2.default.BLOCKS.WALL) this.x = Math.ceil(this.x);

                if (this.x < -1) this.x = 28;
                if (this.x > 28) this.x = -1;
            },
            getTile: function getTile() {
                return { i: Math.floor(this.y - 3), j: Math.floor(this.x) };
            },
            onPatrolMode: function onPatrolMode(_ref2) {
                var i = _ref2.i,
                    j = _ref2.j;

                this.calculateDirection(this.patrolPoint, { i: i, j: j });
            },
            onPanicMode: function onPanicMode(_ref3) {
                var i = _ref3.i,
                    j = _ref3.j;

                var allDirections = _Pacman2.default.GLOBALS.maze.intersections.get(JSON.stringify([i, j]));
                this.nextDirection = allDirections[Math.floor(Math.random() * allDirections.length)];
                this.nextDirectionCalculated = true;
            },
            onHuntMode: function onHuntMode(_ref4) {
                var i = _ref4.i,
                    j = _ref4.j;

                this.onHuntModeCb(this, { i: i, j: j });
            },
            setMode: function setMode() {
                if (this.mode == 'Panic') {
                    this.acumulateTime += _Pacman2.default.deltaTime;
                    this.v = 1.5;
                    if (this.acumulateTime >= Phantom.PANIC_TIME) {
                        this.acumulateTime = 0;
                        this.mode = this.prevMode;
                        this.v = 3.5;
                    }
                }
                if (this.mode == 'Hunt' && Phantom.TIMES[this.timeRefernce] < 0) return;
                this.acumulateTime += _Pacman2.default.deltaTime;
                if (this.acumulateTime >= Phantom.TIMES[this.timeRefernce]) {
                    this.acumulateTime = 0;
                    this.timeRefernce++;
                    this.mode = this.mode == 'Patrol' ? 'Hunt' : 'Patrol';
                }
            },
            softReset: function softReset() {
                var spawn = this.spawnPoint();
                this.x = spawn.x;
                this.y = spawn.y;
                this.xRounded = spawn.x;
                this.yRounded = spawn.y;
                this.v = 3.5;

                this.direction = _Pacman2.default.GLOBALS.LEFT;
                this.nextDirection = _Pacman2.default.GLOBALS.LEFT;
                this.nextDirectionCalculated = false;
                this.inJail = true;
            },
            onPacmanCollision: function onPacmanCollision() {
                if (this.mode == 'Panic') {
                    this.acumulateTime = 0;
                    this.mode = this.prevMode;

                    _Pacman2.default.GLOBALS.POINTS += 100;

                    this.softReset();
                    this.pausePhantom(Phantom.AFTER_EAT_PAUSE);
                } else {
                    this.$emit('pacmanDead');
                }
            },
            pausePhantom: function pausePhantom(time) {
                this.paused = true;
                this.pausedTime = time;
                this.acumulateTime = 0;
            }
        }
    });
};

Phantom.TIMES = [7, 20, 7, 20, 5, 20, 5, -1];
Phantom.PANIC_TIME = 10;
Phantom.AFTER_EAT_PAUSE = 3;

exports.default = Phantom;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Loader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _TextureLoaders = __webpack_require__(20);

var textureLoaders = _interopRequireWildcard(_TextureLoaders);

var _SoundLoaders = __webpack_require__(23);

var soundLoaders = _interopRequireWildcard(_SoundLoaders);

var _AssetLoader = __webpack_require__(25);

var _AssetLoader2 = _interopRequireDefault(_AssetLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Loader = new _AssetLoader2.default(_extends({}, textureLoaders, soundLoaders));

exports.Loader = Loader;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mat = __webpack_require__(3);

var _Mat2 = _interopRequireDefault(_Mat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2D = function () {
  function Vector2D(x, y) {
    var xo = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var yo = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

    _classCallCheck(this, Vector2D);

    this.x = x - xo;
    this.y = y - yo;
  }

  _createClass(Vector2D, [{
    key: "transform",
    value: function transform(tranformationMatrix) {
      this.x = this.x * tranformationMatrix[0] + (this.y * tranformationMatrix[3] + tranformationMatrix[6]);
      this.y = this.x * tranformationMatrix[1] + (this.y * tranformationMatrix[4] + tranformationMatrix[7]);
    }
  }, {
    key: "translate",
    value: function translate(vector) {
      this.x += vector.x;
      this.y += vector.y;
    }
  }, {
    key: "setPosition",
    value: function setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: "rotate",
    value: function rotate(rotation) {
      var matrix = _Mat2.default.identity();
      matrix = _Mat2.default.rotate(matrix, rotation * (Math.PI / 180));
      this.transform(matrix);
    }
  }, {
    key: "sacale",
    value: function sacale(scaleX, scaleY) {
      var matrix = _Mat2.default.identity();
      matrix = _Mat2.default.scale(matrix, scaleX, scaleY);
      this.transform(matrix);
    }
  }, {
    key: "normal",
    value: function normal() {
      return new Vector2D(-this.y, this.x);
    }
  }, {
    key: "magnitude",
    value: function magnitude() {
      return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }
  }, {
    key: "projection",
    value: function projection(proyectionVector) {
      var proyectionVectorMagnitude = proyectionVector.magnitude();
      return this.x * (proyectionVector.x / proyectionVectorMagnitude) + this.y * (proyectionVector.y / proyectionVectorMagnitude);
    }
  }]);

  return Vector2D;
}();

exports.default = Vector2D;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Pacman = __webpack_require__(0);

var _Pacman2 = _interopRequireDefault(_Pacman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Maze = function () {
    function Maze(layout, intersections, pacmanSpawn, jailDoor) {
        _classCallCheck(this, Maze);

        this.layout = layout;
        this.intersections = new Map();
        this.balls_count = 0;
        this.pacmanSpawn = pacmanSpawn;
        this.jailDoor = jailDoor;

        for (var i = 0; i < this.layout.length; i++) {
            for (var j = 0; j < this.layout[i].length; j++) {
                if (this.layout[i][j] >= 2) this.balls_count++;
            }
        }

        this.balls_total = this.balls_count;

        for (var _i = 0; _i < intersections.length; _i++) {
            var point = intersections[_i][0];
            var directions = intersections[_i][1];

            if (directions == 'auto') {
                var _point = _slicedToArray(point, 2),
                    row = _point[0],
                    col = _point[1];

                directions = [];
                if (this.layout[row - 1][col] > 0) directions.push(0);
                if (this.layout[row][col + 1] > 0) directions.push(1);
                if (this.layout[row + 1][col] > 0) directions.push(2);
                if (this.layout[row][col - 1] > 0) directions.push(3);
            }

            this.intersections.set(JSON.stringify(point), directions);
        }
    }

    _createClass(Maze, [{
        key: 'consumeBall',
        value: function consumeBall(i, j) {
            var cell = this.layout[i][j];
            if (this.layout[i][j] >= 2) {
                this.layout[i][j] = 1;
                this.balls_count--;
                _Pacman2.default.GLOBALS.POINTS += 50;
                if (cell == 3) _Pacman2.default.GLOBALS.POINTS += 50;
            }
            return cell;
        }
    }, {
        key: 'render',
        value: function render(sb) {
            for (var i = 0; i < this.layout.length; i++) {
                for (var j = 0; j < this.layout[i].length; j++) {
                    if (this.layout[i][j] == 0) sb.drawTexture(_Pacman2.default.GLOBALS.tileset[0], j * 8, 24 + i * 8);else if (this.layout[i][j] == 2) sb.drawTexture(_Pacman2.default.GLOBALS.tileset[2], j * 8, 24 + i * 8);else if (this.layout[i][j] == 3) sb.drawTexture(_Pacman2.default.GLOBALS.tileset[3], j * 8, 24 + i * 8);
                }
            }
        }
    }]);

    return Maze;
}();

Maze.BLOCKS = {
    WALL: 0,
    EMPTY: 1,
    BALL: 2,
    SUPER_BALL: 3
};

exports.default = Maze;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Phantom = __webpack_require__(4);

var _Phantom2 = _interopRequireDefault(_Phantom);

var _Pacman = __webpack_require__(0);

var _Pacman2 = _interopRequireDefault(_Pacman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedPhantom = (0, _Phantom2.default)(4, { x: 25, y: 0 }, function () {
    return { x: _Pacman2.default.GLOBALS.maze.jailDoor.x, y: _Pacman2.default.GLOBALS.maze.jailDoor.y - 1 };
}, function (self, _ref) {
    var i = _ref.i,
        j = _ref.j;

    self.calculateDirection({ x: _Pacman2.default.GLOBALS.PacmanEntity.x, y: _Pacman2.default.GLOBALS.PacmanEntity.y }, { i: i, j: j });
}, function (self) {
    return self.inJail = false;
});

exports.default = RedPhantom;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TextureRegion = function () {
  function TextureRegion(texture, x, y, width, height) {
    _classCallCheck(this, TextureRegion);

    this.texture = texture;

    if (x === undefined) {
      x = 0;
      width = texture.width;
    }
    if (y === undefined) {
      y = 0;
      height = texture.height;
    }
    if (width === undefined) {
      width = x;
      x = 0;
    }
    if (height === undefined) {
      height = y;
      y = 0;
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  _createClass(TextureRegion, [{
    key: "split",
    value: function split() {
      var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
      var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      var rowHeight = this.height / rows;
      var colWidth = this.width / cols;
      var regions = new Array(rows);
      for (var i = 0; i < rows; i++) {
        regions[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
          regions[i][j] = new TextureRegion(this.texture, this.x + j * colWidth, this.y + i * rowHeight, colWidth, rowHeight);
        }
      }
      return regions;
    }
  }]);

  return TextureRegion;
}();

exports.default = TextureRegion;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(2);

var loadFromCache = function loadFromCache(src) {
  if (_utils.AssetCache.has(src)) return _utils.AssetCache.get(src);
  return false;
};

exports.default = loadFromCache;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var SoundContext = new AudioContext();
exports.default = SoundContext;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Mat = __webpack_require__(3);

Object.defineProperty(exports, 'M3', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Mat).default;
  }
});

var _Polygon = __webpack_require__(13);

Object.defineProperty(exports, 'Polygon', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Polygon).default;
  }
});

var _Rectangle = __webpack_require__(34);

Object.defineProperty(exports, 'Rectangle', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Rectangle).default;
  }
});

var _Vector2D = __webpack_require__(6);

Object.defineProperty(exports, 'Vector2D', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Vector2D).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Vector2D = __webpack_require__(6);

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Polygon = function () {
  function Polygon() {
    var vertexs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Polygon);

    this.vertexs = vertexs;
  }

  _createClass(Polygon, [{
    key: "transform",
    value: function transform(tranformationMatrix) {
      for (var i = 0; i < this.vertexs.length; i++) {
        this.vertexs[i].transform(tranformationMatrix);
      }
    }
  }, {
    key: "translate",
    value: function translate(vector) {
      for (var i = 0; i < this.vertexs.length; i++) {
        this.vertexs[i].x += vector.x;
        this.vertexs[i].y += vector.y;
      }
    }
  }, {
    key: "rotate",
    value: function rotate(rotation) {
      var matrix = M3.identity();
      matrix = M3.rotate(matrix, rotation * (Math.PI / 180));
      this.transform(matrix);
    }
  }, {
    key: "sacale",
    value: function sacale(scaleX, scaleY) {
      var matrix = M3.identity();
      matrix = M3.scale(matrix, scaleX, scaleY);
      this.transform(matrix);
    }
  }, {
    key: "getNormals",
    value: function getNormals() {
      var normals = new Array(this.vectexs.length);
      var lastVertex = this.vertexs[this.vertexs.length - 1];
      for (var i = 0; i < this.vertexs.length; i++) {
        normals[i] = new _Vector2D2.default(this.vertexs[i].x, this.vertexs[i].y, lastVertex.x, lastVertex.y).normal();
        lastVertex = this.vertexs[i];
      }
      return normals;
    }
  }, {
    key: "projection",
    value: function projection(vector) {
      var min = this.vertexs[0].projection(vector);
      var max = min;
      for (var i = 1; i < this.vertexs.length; i++) {
        var p = this.vertexs[i].projection(vector);
        if (p < min) min = p;else if (p > max) max = p;
      }
      return { min: min, max: max };
    }
  }, {
    key: "collides",
    value: function collides(polygon) {
      var thisNormals = this.getNormals();
      var polygonNormals = this.getNormals();

      for (var i = 0; i < thisNormals.length; i++) {
        var thisProjection = this.projection(thisNormals[i]);
        var polygonProjection = polygon.projection(thisNormals[i]);
        if (!(thisProjection.max >= polygonProjection.min && polygonProjection.max >= thisProjection.min)) return false;
      }

      for (var _i = 0; _i < polygonNormals.length; _i++) {
        var _thisProjection = this.projection(polygonNormals[_i]);
        var _polygonProjection = polygon.projection(polygonNormals[_i]);
        if (!(_thisProjection.max >= _polygonProjection.min && _polygonProjection.max >= _thisProjection.min)) return false;
      }

      return true;
    }
  }]);

  return Polygon;
}();

exports.default = Polygon;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Phantom = __webpack_require__(4);

var _Phantom2 = _interopRequireDefault(_Phantom);

var _Pacman = __webpack_require__(0);

var _Pacman2 = _interopRequireDefault(_Pacman);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PinkPhantom = (0, _Phantom2.default)(5, { x: 2, y: 0 }, function () {
    return { x: _Pacman2.default.GLOBALS.maze.jailDoor.x, y: _Pacman2.default.GLOBALS.maze.jailDoor.y + 2 };
}, function (self, _ref) {
    var i = _ref.i,
        j = _ref.j;

    var targePoint = { x: _Pacman2.default.GLOBALS.PacmanEntity.x, y: _Pacman2.default.GLOBALS.PacmanEntity.y };
    if (_Pacman2.default.GLOBALS.PacmanEntity.direction == _Pacman2.default.GLOBALS.UP) targePoint.y -= 4;else if (_Pacman2.default.GLOBALS.PacmanEntity.direction == _Pacman2.default.GLOBALS.RIGHT) targePoint.x += 4;else if (_Pacman2.default.GLOBALS.PacmanEntity.direction == _Pacman2.default.GLOBALS.DOWN) targePoint.y += 4;else if (_Pacman2.default.GLOBALS.PacmanEntity.direction == _Pacman2.default.GLOBALS.LEFT) targePoint.x -= 4;
    self.calculateDirection(targePoint, { i: i, j: j });
}, function (self) {
    var movement = self.v * _Pacman2.default.deltaTime;
    if (movement > 0.1) movement = 0.1;

    self.y -= movement;
    self.yRounded = Math.round(self.y * 10) / 10;

    if (Math.floor(self.y) == _Pacman2.default.GLOBALS.maze.jailDoor.y - 1 && self.yRounded % 1 <= 0.2) {
        self.y = _Pacman2.default.GLOBALS.maze.jailDoor.y - 1;
        self.yRounded = _Pacman2.default.GLOBALS.maze.jailDoor.y - 1;

        self.inJail = false;
    }
});

exports.default = PinkPhantom;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Phantom = __webpack_require__(4);

var _Phantom2 = _interopRequireDefault(_Phantom);

var _Pacman = __webpack_require__(0);

var _Pacman2 = _interopRequireDefault(_Pacman);

var _RedPhantom = __webpack_require__(8);

var _RedPhantom2 = _interopRequireDefault(_RedPhantom);

var _render = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BluePhantom = (0, _Phantom2.default)(6, { x: 27, y: 34 }, function () {
    return { x: _Pacman2.default.GLOBALS.maze.jailDoor.x - 2, y: _Pacman2.default.GLOBALS.maze.jailDoor.y + 2 };
}, function (self, _ref) {
    var i = _ref.i,
        j = _ref.j;

    var pacmanPosition = { x: Math.floor(_Pacman2.default.GLOBALS.PacmanEntity.x), y: Math.floor(_Pacman2.default.GLOBALS.PacmanEntity.y) };
    var vector = void 0;
    if (_Pacman2.default.GLOBALS.PacmanEntity.direction == _Pacman2.default.GLOBALS.UP) vector = new _render.Vector2D(pacmanPosition.x, pacmanPosition.y - 2, Math.floor(_RedPhantom2.default.x), Math.floor(_RedPhantom2.default.y));else if (_Pacman2.default.GLOBALS.PacmanEntity.direction == _Pacman2.default.GLOBALS.RIGHT) vector = new _render.Vector2D(pacmanPosition.x + 2, pacmanPosition.y, Math.floor(_RedPhantom2.default.x), Math.floor(_RedPhantom2.default.y));else if (_Pacman2.default.GLOBALS.PacmanEntity.direction == _Pacman2.default.GLOBALS.DOWN) vector = new _render.Vector2D(pacmanPosition.x, pacmanPosition.y + 2, Math.floor(_RedPhantom2.default.x), Math.floor(_RedPhantom2.default.y));else if (_Pacman2.default.GLOBALS.PacmanEntity.direction == _Pacman2.default.GLOBALS.LEFT) vector = new _render.Vector2D(pacmanPosition.x - 2, pacmanPosition.y, Math.floor(_RedPhantom2.default.x), Math.floor(_RedPhantom2.default.y));
    self.calculateDirection({ x: Math.floor(self.x) + vector.x * 2, y: Math.floor(self.y) + vector.y * 2 }, { i: i, j: j });
}, function (self) {
    if (_Pacman2.default.GLOBALS.maze.balls_total - _Pacman2.default.GLOBALS.maze.balls_count >= 30) {
        var movement = self.v * _Pacman2.default.deltaTime;
        if (movement > 0.1) movement = 0.1;

        if (self.x != _Pacman2.default.GLOBALS.maze.jailDoor.x) {
            self.x += movement;
            self.xRounded = Math.round(self.x * 10) / 10;

            if (self.x > _Pacman2.default.GLOBALS.maze.jailDoor.x - 0.1 && self.x < _Pacman2.default.GLOBALS.maze.jailDoor.x + 0.1) {
                self.x = _Pacman2.default.GLOBALS.maze.jailDoor.x;
                self.xRounded = _Pacman2.default.GLOBALS.maze.jailDoor.x;
            }
        } else {
            self.y -= movement;
            self.yRounded = Math.round(self.y * 10) / 10;

            if (Math.floor(self.y) == _Pacman2.default.GLOBALS.maze.jailDoor.y - 1 && self.yRounded % 1 <= 0.2) {
                self.y = _Pacman2.default.GLOBALS.maze.jailDoor.y - 1;
                self.yRounded = _Pacman2.default.GLOBALS.maze.jailDoor.y - 1;

                self.inJail = false;
            }
        }
    }
});

exports.default = BluePhantom;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Phantom = __webpack_require__(4);

var _Phantom2 = _interopRequireDefault(_Phantom);

var _Pacman = __webpack_require__(0);

var _Pacman2 = _interopRequireDefault(_Pacman);

var _render = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OrangePhantom = (0, _Phantom2.default)(7, { x: 0, y: 34 }, function () {
    return { x: _Pacman2.default.GLOBALS.maze.jailDoor.x + 2, y: _Pacman2.default.GLOBALS.maze.jailDoor.y + 2 };
}, function (self, _ref) {
    var i = _ref.i,
        j = _ref.j;

    var distance = new _render.Vector2D(Math.floor(self.x), Math.floor(self.y), Math.floor(_Pacman2.default.GLOBALS.PacmanEntity.x), Math.floor(_Pacman2.default.GLOBALS.PacmanEntity.y)).magnitude();
    if (distance < 8) self.calculateDirection(self.patrolPoint, { i: i, j: j });else self.calculateDirection({ x: _Pacman2.default.GLOBALS.PacmanEntity.x, y: _Pacman2.default.GLOBALS.PacmanEntity.y }, { i: i, j: j });
}, function (self) {
    if (_Pacman2.default.GLOBALS.maze.balls_total - _Pacman2.default.GLOBALS.maze.balls_count >= _Pacman2.default.GLOBALS.maze.balls_total / 3) {
        var movement = self.v * _Pacman2.default.deltaTime;
        if (movement > 0.1) movement = 0.1;

        if (self.x != _Pacman2.default.GLOBALS.maze.jailDoor.x) {
            self.x -= movement;
            self.xRounded = Math.round(self.x * 10) / 10;

            if (self.x > _Pacman2.default.GLOBALS.maze.jailDoor.x - 0.1 && self.x < _Pacman2.default.GLOBALS.maze.jailDoor.x + 0.1) {
                self.x = _Pacman2.default.GLOBALS.maze.jailDoor.x;
                self.xRounded = _Pacman2.default.GLOBALS.maze.jailDoor.x;
            }
        } else {
            self.y -= movement;
            self.yRounded = Math.round(self.y * 10) / 10;

            if (Math.floor(self.y) == _Pacman2.default.GLOBALS.maze.jailDoor.y - 1 && self.yRounded % 1 <= 0.2) {
                self.y = _Pacman2.default.GLOBALS.maze.jailDoor.y - 1;
                self.yRounded = _Pacman2.default.GLOBALS.maze.jailDoor.y - 1;

                self.inJail = false;
            }
        }
    }
});

exports.default = OrangePhantom;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Pacman = __webpack_require__(0);

var _Pacman2 = _interopRequireDefault(_Pacman);

var _render = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_Pacman2.default.fitCanvasToConatiner();
_Pacman2.default.addInputManagers(_render.Keyboard);
_Pacman2.default.start();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Game = __webpack_require__(19);

Object.defineProperty(exports, 'Game', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Game).default;
  }
});

var _Gear = __webpack_require__(27);

Object.defineProperty(exports, 'Gear', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Gear).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetLoader = __webpack_require__(5);

var _InputManager = __webpack_require__(26);

var _InputManager2 = _interopRequireDefault(_InputManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

/**
 * Default options for Game.
 */
var defaultOptions = {
  container_id: 'game-container',
  width: 960,
  height: 540

  /**
   * Main class of the frawerwork, define a Game.
   * 
   * @class
   */
};
var Game = function () {

  /**
   * Create a game.
   * 
   * @param {object} options - Options that define a game.
   * @param {Gear} coreGear - Main Gear module of a game.
   */
  function Game() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var coreGear = arguments[1];

    _classCallCheck(this, Game);

    var _defaultOptions$optio = _extends({}, defaultOptions, options),
        container_id = _defaultOptions$optio.container_id,
        width = _defaultOptions$optio.width,
        height = _defaultOptions$optio.height;

    /**
     * TODO
     */


    this.width = width;

    /**
     * TODO
     */
    this.height = height;

    /**
     * Game container defined at DOM.
     * 
     * @member {object} 
     */
    this.container = document.getElementById(container_id);

    this.setCanvas(container_id);

    /**
     * Defines the canvas inside the game container
     * 
     * @member {object}
     */
    this.canvas = document.getElementById(container_id + '-canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.canvas.style.outline = "none";
    this.canvas.setAttribute("tabindex", "1");

    /**
     * Manage the inputs of the Game
     * 
     * @member {InputManager}
     */
    this.input = new _InputManager2.default(this.canvas);

    /**
     * Defines the context of the canvas.
     * 
     * @member {object}
     */
    this.context = this.canvas.getContext('2d');

    /**
     * Defines if the Game is in fullScreen mode.
     * 
     * @member {boolean}
     */
    this.fullScreenActive = false;
    //game running
    this.running = false;
    //Game loop data
    this.delta = 0;
    this.then = 0;
    //bind game to loop function
    this.loop = this.loop.bind(this);
    //CoreGear
    this.coreGear = coreGear;
  }

  _createClass(Game, [{
    key: 'setCanvas',
    value: function setCanvas(container_id) {
      this.container.requestFullScreen = this.container.requestFullscreen || this.container.msRequestFullscreen || this.container.mozRequestFullScreen || this.container.webkitRequestFullscreen;

      document.exitFullScreen = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitCancelFullScreen;

      this.container.style.background = "#000000";
      this.container.style.position = "relative";
      this.container.style.display = "flex";
      this.container.style.alignItems = "center";
      this.container.style.justifyContent = "center";
      this.container.style.overflow = "hidden";
      this.container.style.width = "100%";
      this.container.style.height = "100%";

      this.container.innerHTML = '<canvas id="' + container_id + '-canvas"></canvas>';
    }
  }, {
    key: 'fitCanvasToConatiner',
    value: function fitCanvasToConatiner() {
      var _this = this;

      setTimeout(function () {
        var canvasProportions = _this.canvas.clientWidth / _this.canvas.clientHeight;
        var containerProportions = _this.container.clientWidth / _this.container.clientHeight;

        if (containerProportions > canvasProportions) {
          _this.canvas.style.width = "auto";
          _this.canvas.style.height = "100%";
        } else {
          _this.canvas.style.width = "100%";
          _this.canvas.style.height = "auto";
        }
      }, 0);
    }
  }, {
    key: 'resizeCanvas',
    value: function resizeCanvas(renderer) {
      var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 960;
      var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 540;
      var force = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

      if (!force && this.width == width && this.height == height) return;
      this.width = width;
      this.height = height;

      this.canvas.width = width;
      this.canvas.height = height;
    }
  }, {
    key: 'toggleFullScreen',
    value: function toggleFullScreen() {
      var activate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : !this.fullScreenActive;

      this.fullScreenActive = activate;

      if (activate) this.container.requestFullScreen();else document.exitFullScreen();

      setTimeout(this.fitCanvasToConatiner.bind(this), 300);
    }
  }, {
    key: 'loop',
    value: function loop() {
      var now = Date.now();
      this.delta = now - this.then;
      this.then = now;

      if (this.running) {
        this.input.update();
        this.coreGear.$update();
      }

      this.coreGear.$render();
      requestAnimationFrame(this.loop);
    }
  }, {
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.coreGear.$load();
      _assetLoader.Loader.$load(function () {
        _this2.coreGear.init();
        _this2.running = true;
        _this2.then = Date.now();
        requestAnimationFrame(_this2.loop);
      }.bind(this));
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.running = false;
    }
  }, {
    key: 'continue',
    value: function _continue() {
      this.then = Date.now();
      this.running = true;
    }
  }, {
    key: 'addInputManagers',
    value: function addInputManagers() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.input.addManagers([].concat(args));
    }
  }, {
    key: 'deltaTime',
    get: function get() {
      return this.delta / 1000;
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTextureFromFile = exports.loadTextureFromUrl = undefined;

var _Texture = __webpack_require__(21);

var _Texture2 = _interopRequireDefault(_Texture);

var _utils = __webpack_require__(2);

var _CacheLoader = __webpack_require__(10);

var _CacheLoader2 = _interopRequireDefault(_CacheLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadTextureFromUrl = function loadTextureFromUrl(url) {
  return new Promise(function (resolve, reject) {
    var cache = (0, _CacheLoader2.default)(url);
    if (cache) {
      resolve(cache);
      return;
    }

    var img = new Image();
    img.onload = function () {
      var result = new _Texture2.default(img);
      _utils.AssetCache.set(url, result);
      resolve(result);
    };
    if (new URL(url).origin !== window.location.origin) {
      img.crossOrigin = "";
    }
    img.src = url;
  });
};

var loadTextureFromFile = function loadTextureFromFile(file) {
  return new Promise(function (resolve, reject) {
    var cache = (0, _CacheLoader2.default)(file.name);
    if (cache) {
      resolve(cache);
      return;
    }

    var fr = new FileReader();
    var img = new Image();

    fr.onloadend = function () {
      img.src = fr.result;
    };
    img.onload = function () {
      var result = new _Texture2.default(img);
      _utils.AssetCache.set(file.name, result);
      resolve(result);
    };

    fr.readAsDataURL(file);
  });
};

exports.loadTextureFromUrl = loadTextureFromUrl;
exports.loadTextureFromFile = loadTextureFromFile;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _TextureRegion = __webpack_require__(9);

var _TextureRegion2 = _interopRequireDefault(_TextureRegion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Texture = function () {
	function Texture(image) {
		_classCallCheck(this, Texture);

		this.image = image;
		this.width = image.width;
		this.height = image.height;
	}

	_createClass(Texture, [{
		key: "split",
		value: function split() {
			var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
			var cols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

			var rowHeight = this.height / rows;
			var colWidth = this.width / cols;
			var regions = new Array(rows);
			for (var i = 0; i < rows; i++) {
				regions[i] = new Array(cols);
				for (var j = 0; j < cols; j++) {
					regions[i][j] = new _TextureRegion2.default(this, j * colWidth, i * rowHeight, colWidth, rowHeight);
				}
			}
			return regions;
		}
	}]);

	return Texture;
}();

exports.default = Texture;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EventEmiter = function () {
  function EventEmiter() {
    _classCallCheck(this, EventEmiter);

    this.subscriptions = new Map();
  }

  _createClass(EventEmiter, [{
    key: "subscribe",
    value: function subscribe(subscriptor, message, callback) {
      if (!this.subscriptions.has(message)) this.subscriptions.set(message, new Map());
      var msgSubs = this.subscriptions.get(message);
      msgSubs.set(subscriptor, callback);
    }
  }, {
    key: "unsubscribe",
    value: function unsubscribe(subscriptor, message) {
      if (!this.subscriptions.has(message)) return;
      var msgSubs = this.subscriptions.get(message);
      if (!msgSubs.has(subscriptor)) return;
      msgSubs.delete(subscriptor);
      if (msgSubs.size == 0) this.subscriptions.delete(message);
    }
  }, {
    key: "emit",
    value: function emit(message) {
      if (!this.subscriptions.has(message)) return;
      var msgSubs = this.subscriptions.get(message);

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = msgSubs.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var callback = _step.value;

          callback.apply(undefined, args);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }]);

  return EventEmiter;
}();

var emiter = new EventEmiter();

exports.default = emiter;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadSoundFromFile = exports.loadSoundFromUrl = undefined;

var _Sound = __webpack_require__(24);

var _Sound2 = _interopRequireDefault(_Sound);

var _SoundContext = __webpack_require__(11);

var _SoundContext2 = _interopRequireDefault(_SoundContext);

var _CacheLoader = __webpack_require__(10);

var _CacheLoader2 = _interopRequireDefault(_CacheLoader);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadSoundFromUrl = function loadSoundFromUrl(url) {
  return new Promise(function (resolve, reject) {
    var cache = (0, _CacheLoader2.default)(url);
    if (cache) {
      resolve(cache);
      return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
      return _SoundContext2.default.decodeAudioData(request.response, function (buffer) {
        var result = new _Sound2.default(buffer);
        _utils.AssetCache.set(url, result);
        return resolve(result);
      }, function (error) {
        return reject(error);
      });
    };

    request.send();
  });
};

var loadSoundFromFile = function loadSoundFromFile(file) {
  return new Promise(function (resolve, reject) {
    var cache = (0, _CacheLoader2.default)(file.name);
    if (cache) {
      resolve(cache);
      return;
    }

    var fr = new FileReader();

    fr.onloadend = function () {
      var buffer = fr.result;
      _SoundContext2.default.decodeAudioData(request.response, function (buffer) {
        var result = new _Sound2.default(buffer);
        _utils.AssetCache.set(file.name, result);
        return resolve(result);
      }, function (error) {
        return reject(error);
      });
    };

    fr.readAsArrayBuffer(file);
  });
};

exports.loadSoundFromUrl = loadSoundFromUrl;
exports.loadSoundFromFile = loadSoundFromFile;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _SoundContext = __webpack_require__(11);

var _SoundContext2 = _interopRequireDefault(_SoundContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sound = function () {
  function Sound(audioBuffer) {
    _classCallCheck(this, Sound);

    this.audioBuffer = audioBuffer;
    this.instances = {};
    this.idCounter = 0;
  }

  _createClass(Sound, [{
    key: "play",
    value: function play() {
      var _this = this;

      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var _time$volume$loop$opt = _extends({ time: 0, volume: 1, loop: false }, options),
          time = _time$volume$loop$opt.time,
          volume = _time$volume$loop$opt.volume,
          loop = _time$volume$loop$opt.loop;
      //Set id


      var id = this.idCounter++;

      //Create instance
      var source = _SoundContext2.default.createBufferSource();
      source.addEventListener("ended", function (e) {
        return delete _this.instances[id];
      });
      source.buffer = this.audioBuffer;

      //Set loop
      source.loop = loop;

      //Create GainNode for volume
      var gainNode = _SoundContext2.default.createGain();
      source.connect(gainNode);
      gainNode.gain.setTargetAtTime(volume, _SoundContext2.default.currentTime, 0.015);

      gainNode.connect(_SoundContext2.default.destination);
      source.start(time);

      this.instances[id] = { source: source, gainNode: gainNode };
      return id;
    }
  }, {
    key: "isSet",
    value: function isSet(id) {
      return Boolean(this.instances[id]);
    }
  }, {
    key: "stop",
    value: function stop(id) {
      if (!this.isSet(id)) return false;
      this.instances[id].source.stop(0);
      this.instances[id].source.noteOff(0);
      delete this.instances[id];
    }
  }, {
    key: "setvolume",
    value: function setvolume(id, volume) {
      if (!this.isSet(id)) return false;
      this.instances[id].gainNode.gain.setTargetAtTime(volume, _SoundContext2.default.currentTime, 0.015);
    }
  }]);

  return Sound;
}();

exports.default = Sound;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AssetLoader = function () {
  function AssetLoader(loaders) {
    _classCallCheck(this, AssetLoader);

    this.unLoadContent = [];
    this.loadContentReferences = [];
    this.addLoaders(loaders);
  }

  _createClass(AssetLoader, [{
    key: "addLoaders",
    value: function addLoaders(loaders) {
      var loaderEntries = Object.entries(loaders);
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = loaderEntries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          this[key] = value;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "$addLoadContent",
    value: function $addLoadContent(source, content) {
      this.unLoadContent = [].concat(_toConsumableArray(this.unLoadContent), _toConsumableArray(Object.values(content)));
      this.loadContentReferences = [].concat(_toConsumableArray(this.loadContentReferences), _toConsumableArray(Object.keys(content).map(function (key) {
        return [source, key];
      })));
    }
  }, {
    key: "$load",
    value: function $load() {
      var _this = this;

      var then = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
        return 0;
      };

      Promise.all(this.unLoadContent).then(function (values) {
        for (var i = 0; i < values.length; i++) {
          var source = _this.loadContentReferences[i][0];
          var key = _this.loadContentReferences[i][1];
          source[key] = values[i];
        }
        _this.unLoadContent = [];
        _this.loadContentReferences = [];
        then();
      });
    }
  }]);

  return AssetLoader;
}();

exports.default = AssetLoader;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var InputManager = function () {
  function InputManager(canvas) {
    _classCallCheck(this, InputManager);

    this.canvas = canvas;
    this._updateFunctions = [];
  }

  _createClass(InputManager, [{
    key: "update",
    value: function update() {
      for (var i = 0; i < this._updateFunctions.length; i++) {
        this._updateFunctions[i]();
      }
    }
  }, {
    key: "addManagers",
    value: function addManagers() {
      var managers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      var newUpdateFunctions = new Array(managers.length);

      for (var i = 0; i < managers.length; i++) {
        var methodList = Object.entries(managers[i].methods);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = methodList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _ref = _step.value;

            var _ref2 = _slicedToArray(_ref, 2);

            var key = _ref2[0];
            var value = _ref2[1];

            this[key] = value;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        managers[i].init.bind(this)();
        newUpdateFunctions[i] = managers[i].update.bind(this);
      }

      this._updateFunctions = [].concat(_toConsumableArray(this._updateFunctions), newUpdateFunctions);
    }
  }]);

  return InputManager;
}();

exports.default = InputManager;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetLoader = __webpack_require__(5);

var _utils = __webpack_require__(2);

var _GearStack = __webpack_require__(28);

var _GearStack2 = _interopRequireDefault(_GearStack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Gear = function () {
  function Gear() {
    var gear = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Gear);

    var _load$init$update$ren = _extends({ load: function load() {
        return {};
      }, init: function init() {}, update: function update() {}, render: function render() {}, gears: [], methods: {} }, gear),
        load = _load$init$update$ren.load,
        init = _load$init$update$ren.init,
        update = _load$init$update$ren.update,
        render = _load$init$update$ren.render,
        gears = _load$init$update$ren.gears,
        methods = _load$init$update$ren.methods;

    this.init = init;
    this.gearStack = new _GearStack2.default(this, gears);
    this.pause = false;
    this.active = true;
    this.update = update;
    this.render = render;
    this.load = load;

    var methodList = Object.entries(methods);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = methodList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var value = _ref2[1];

        this[key] = value;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  _createClass(Gear, [{
    key: '$load',
    value: function $load() {
      _assetLoader.Loader.$addLoadContent(this, this.load());
      this.gearStack.load();
    }
  }, {
    key: '$update',
    value: function $update() {
      if (!this.pause && this.active) this.update.apply(this, arguments);
    }
  }, {
    key: '$render',
    value: function $render() {
      if (this.active) this.render.apply(this, arguments);
    }
  }, {
    key: '$emit',
    value: function $emit(message) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      _utils.EventEmiter.emit.apply(_utils.EventEmiter, [message].concat(args));
    }
  }, {
    key: '$subscribe',
    value: function $subscribe(message, callback) {
      _utils.EventEmiter.subscribe(this, message, callback.bind(this));
    }
  }, {
    key: '$unsubscribe',
    value: function $unsubscribe(message) {
      _utils.EventEmiter.unsubscribe(this, message);
    }
  }]);

  return Gear;
}();

exports.default = Gear;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GearStack = function () {
  function GearStack(parent) {
    var stack = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, GearStack);

    var gears = Object.entries(stack);
    this.stack = new Array(gears.length);
    var i = 0;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = gears[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _ref = _step.value;

        var _ref2 = _slicedToArray(_ref, 2);

        var key = _ref2[0];
        var value = _ref2[1];

        parent[key] = value;
        this.stack[i] = value;
        i++;
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    this.pause = false;
    this.active = true;
  }

  _createClass(GearStack, [{
    key: "init",
    value: function init() {
      for (var _i = 0; _i < this.stack.length; _i++) {
        this.stack[_i].init();
      }
    }
  }, {
    key: "update",
    value: function update() {
      if (!this.pause && this.active) {
        for (var _i2 = 0; _i2 < this.stack.length; _i2++) {
          var _stack$_i;

          (_stack$_i = this.stack[_i2]).$update.apply(_stack$_i, arguments);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.active) {
        for (var _i3 = 0; _i3 < this.stack.length; _i3++) {
          var _stack$_i2;

          (_stack$_i2 = this.stack[_i3]).$render.apply(_stack$_i2, arguments);
        }
      }
    }
  }, {
    key: "load",
    value: function load() {
      for (var _i4 = 0; _i4 < this.stack.length; _i4++) {
        this.stack[_i4].$load();
      }
    }
  }]);

  return GearStack;
}();

exports.default = GearStack;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TextureRegion = __webpack_require__(9);

Object.defineProperty(exports, 'TextureRegion', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TextureRegion).default;
  }
});

var _SpriteBatch = __webpack_require__(30);

Object.defineProperty(exports, 'SpriteBatch', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SpriteBatch).default;
  }
});

var _Animation = __webpack_require__(32);

Object.defineProperty(exports, 'Animation', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Animation).default;
  }
});

var _Camera = __webpack_require__(33);

Object.defineProperty(exports, 'Camera', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Camera).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ImageBuffer = __webpack_require__(31);

var _ImageBuffer2 = _interopRequireDefault(_ImageBuffer);

var _Mat = __webpack_require__(3);

var _Mat2 = _interopRequireDefault(_Mat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SpriteBatch = function () {
  function SpriteBatch(context) {
    _classCallCheck(this, SpriteBatch);

    this.context = context;
    this.buffer = new _ImageBuffer2.default(context.canvas.width, context.canvas.height);
    this.drawing = false;
    this.projectionMatrix = _Mat2.default.identity();
  }

  _createClass(SpriteBatch, [{
    key: "begin",
    value: function begin() {
      if (this.drawing) throw "This batch is currenly drawing";
      this.drawing = true;
      this.buffer.clear();
    }
  }, {
    key: "drawTexture",
    value: function drawTexture(texture, srcX, srcY, srcWidth, srcHeight, dstX, dstY, dstWidth, dstHeight) {
      var srcRotation = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : 0;

      var _buffer$context;

      var offsetX = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : 0;
      var offsetY = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : 0;

      if (!this.drawing) throw "This batch is not begin to draw";
      this.buffer.context.save();
      if (dstX === undefined) {
        dstX = srcX;
        srcX = 0;
      }
      if (dstY === undefined) {
        dstY = srcY;
        srcY = 0;
      }
      if (srcWidth === undefined) {
        srcWidth = texture.width;
      }
      if (srcHeight === undefined) {
        srcHeight = texture.height;
      }
      if (dstWidth === undefined) {
        dstWidth = srcWidth;
        srcWidth = texture.width;
      }
      if (dstHeight === undefined) {
        dstHeight = srcHeight;
        srcHeight = texture.height;
      }
      if (texture.constructor.name == "TextureRegion") {
        srcX += texture.x;
        srcY += texture.y;
        texture = texture.texture;
      }

      var matrix = _Mat2.default.identity();

      // this matrix will translate our quad to dstX, dstY
      matrix = _Mat2.default.translate(matrix, dstX - dstWidth * offsetX, dstY - dstHeight * offsetY);

      matrix = _Mat2.default.translate(matrix, dstWidth * offsetX, dstHeight * offsetY);
      matrix = _Mat2.default.rotate(matrix, srcRotation * (Math.PI / 180));
      matrix = _Mat2.default.scale(matrix, dstWidth / srcWidth, dstHeight / srcHeight);
      matrix = _Mat2.default.translate(matrix, dstWidth * -offsetX, dstHeight * -offsetY);

      (_buffer$context = this.buffer.context).setTransform.apply(_buffer$context, _toConsumableArray(_Mat2.default.toCanvas2dMatrix(_Mat2.default.multiply(this.projectionMatrix, matrix))));

      this.buffer.context.drawImage(texture.image, srcX, srcY, srcWidth, srcHeight, 0, 0, srcWidth, srcHeight);

      this.buffer.context.restore();
    }
  }, {
    key: "drawText",
    value: function drawText(text, color, font, aling, srcX, srcY) {
      var _buffer$context2;

      if (!this.drawing) throw "This batch is not begin to draw";
      this.buffer.context.save();

      (_buffer$context2 = this.buffer.context).setTransform.apply(_buffer$context2, _toConsumableArray(_Mat2.default.toCanvas2dMatrix(this.projectionMatrix)));

      this.buffer.context.font = font;
      this.buffer.context.fillStyle = color;
      this.buffer.context.textAlign = aling;
      this.buffer.context.fillText(text, srcX, srcY);

      this.buffer.context.restore();
    }
  }, {
    key: "end",
    value: function end() {
      if (!this.drawing) throw "This batch is not begin to draw";
      this.drawing = false;
      this.context.drawImage(this.buffer.canvas, 0, 0);
    }
  }, {
    key: "setProjection",
    value: function setProjection(matrix) {
      this.projectionMatrix = matrix;
    }
  }, {
    key: "resetProjection",
    value: function resetProjection() {
      this.projectionMatrix = _Mat2.default.identity();
    }
  }]);

  return SpriteBatch;
}();

exports.default = SpriteBatch;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ImageBuffer = function () {
	function ImageBuffer(width, height) {
		_classCallCheck(this, ImageBuffer);

		this.canvas = document.createElement('canvas');
		this.canvas.width = width;
		this.canvas.height = height;
		this.context = this.canvas.getContext('2d');
	}

	_createClass(ImageBuffer, [{
		key: 'clear',
		value: function clear() {
			this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		}
	}]);

	return ImageBuffer;
}();

exports.default = ImageBuffer;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
  function Animation(frameTime, frames) {
    var playMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Animation);

    this.frameTime = frameTime;
    this.frames = frames;
    this.playMode = playMode;
    this.animationEnded = false;
    this._frame = this.playMode > 1 ? this.frames.length - 1 : 0;
    this._acumulateTime = 0;
  }

  _createClass(Animation, [{
    key: "getFrame",
    value: function getFrame(deltaTime) {
      if (this.animationEnded) return this.frames[this._frame];
      var framesElapses = Math.floor((this._acumulateTime + deltaTime) / this.frameTime);
      this._acumulateTime = this._acumulateTime + deltaTime - framesElapses * this.frameTime;
      this._nextFrame(framesElapses);
      return this.frames[this._frame];
    }
  }, {
    key: "_nextFrame",
    value: function _nextFrame(frameElapse) {
      this["_nextFrame" + this.playMode](frameElapse);
    }
  }, {
    key: "_nextFrame0",
    value: function _nextFrame0(frameElapse) {
      this._frame = Math.min(this._frame += frameElapse, this.frames.length - 1);
      if (this._frame == this.frames.length - 1) this.animationEnded = true;
    }
  }, {
    key: "_nextFrame1",
    value: function _nextFrame1(frameElapse) {
      this._frame = (this._frame + frameElapse) % this.frames.length;
    }
  }, {
    key: "_nextFrame2",
    value: function _nextFrame2(frameElapse) {
      this._frame = Math.max(this._frame -= frameElapse, 0);
      if (this._frame == 0) this.animationEnded = true;
    }
  }, {
    key: "_nextFrame3",
    value: function _nextFrame3(frameElapse) {
      this._frame = (this._frame - frameElapse).mod(this.frames.length);
    }
  }]);

  return Animation;
}();

Animation.PLAY_MODES = {
  NORMAL: 0,
  LOOP: 1,
  REVERSE: 2,
  LOOP_REVERSE: 3
};
exports.default = Animation;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Mat = __webpack_require__(3);

var _Mat2 = _interopRequireDefault(_Mat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
  function Camera(width, height) {
    _classCallCheck(this, Camera);

    this.x = 0;
    this.y = 0;
    this.width = width;
    this.height = height;
    this.zoom = 1;
    this.rotation = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.cameraMatrix = _Mat2.default.identity();
  }

  _createClass(Camera, [{
    key: 'translate',
    value: function translate(x, y) {
      this.x += x;
      this.y += y;
    }
  }, {
    key: 'setPosition',
    value: function setPosition(x, y) {
      this.x = x;
      this.y = y;
    }
  }, {
    key: 'rotate',
    value: function rotate(rotation) {
      this.rotation += rotation;
    }
  }, {
    key: 'setRotation',
    value: function setRotation(rotation) {
      this.rotation = rotation;
    }
  }, {
    key: 'setZoom',
    value: function setZoom(zoom) {
      this.zoom = zoom;
    }
  }, {
    key: 'setOffset',
    value: function setOffset(offsetX, offsetY) {
      this.offsetX = offsetX;
      this.offsetY = offsetY;
    }
  }, {
    key: 'update',
    value: function update() {
      var matrix = _Mat2.default.identity();
      matrix = _Mat2.default.translate(matrix, -(this.x - this.offsetX * this.width), -(this.y - this.offsetY * this.height));

      matrix = _Mat2.default.translate(matrix, this.width * this.offsetX, this.height * this.offsetY);
      matrix = _Mat2.default.rotate(matrix, this.rotation * (Math.PI / 180));
      matrix = _Mat2.default.scale(matrix, this.zoom, this.zoom);
      matrix = _Mat2.default.translate(matrix, this.width * -this.offsetX, this.height * -this.offsetY);

      this.cameraMatrix = matrix;
    }
  }]);

  return Camera;
}();

exports.default = Camera;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Polygon2 = __webpack_require__(13);

var _Polygon3 = _interopRequireDefault(_Polygon2);

var _Vector2D = __webpack_require__(6);

var _Vector2D2 = _interopRequireDefault(_Vector2D);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Rectangle = function (_Polygon) {
  _inherits(Rectangle, _Polygon);

  function Rectangle(x, y, width, height) {
    _classCallCheck(this, Rectangle);

    var _this = _possibleConstructorReturn(this, (Rectangle.__proto__ || Object.getPrototypeOf(Rectangle)).call(this, [new _Vector2D2.default(x, y), new _Vector2D2.default(x, y + height), new _Vector2D2.default(x + width, y + height), new _Vector2D2.default(x + width, y)]));

    _this.width = width;
    _this.height = height;
    return _this;
  }

  _createClass(Rectangle, [{
    key: "getNormals",
    value: function getNormals() {
      return [new _Vector2D2.default(this.vertexs[0].x, this.vertexs[0].y, this.vertexs[1].x, this.vertexs[1].y), new _Vector2D2.default(this.vertexs[1].x, this.vertexs[1].y, this.vertexs[2].x, this.vertexs[2].y)];
    }
  }]);

  return Rectangle;
}(_Polygon3.default);

exports.default = Rectangle;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _KeyboardInputManager = __webpack_require__(36);

Object.defineProperty(exports, "KeyboardInputManager", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_KeyboardInputManager).default;
  }
});

var _MouseInputManager = __webpack_require__(38);

Object.defineProperty(exports, "MouseInputManager", {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MouseInputManager).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _KeyboardKeys = __webpack_require__(37);

var _KeyboardKeys2 = _interopRequireDefault(_KeyboardKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeyboardInputManager = {
  KEYS: _KeyboardKeys2.default,
  init: function init() {
    var _this = this;

    this._keys = new Array(256);

    for (var i = 0; i < 256;) {
      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];

      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];

      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];

      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];
      this._keys[i++] = [false, false];
    }

    this.canvas.addEventListener("keydown", function (e) {
      return _this._keySet(e.keyCode, true);
    });
    this.canvas.addEventListener("keyup", function (e) {
      return _this._keySet(e.keyCode, false);
    });
  },
  update: function update() {
    for (var i = 0; i < 256;) {
      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];

      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];

      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];

      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];
      this._keys[i][0] = this._keys[i++][1];
    }
  },

  methods: {
    _keySet: function _keySet(keycode, value) {
      this._keys[keycode][1] = value;
    },
    isKeyJustPressed: function isKeyJustPressed(keycode) {
      return !this._keys[keycode][0] && this._keys[keycode][1];
    },
    isKeyDown: function isKeyDown(keycode) {
      return this._keys[keycode][0] && this._keys[keycode][1];
    }
  }
};

exports.default = KeyboardInputManager;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var KEYS = {

  DELETE: 8,
  ENTER: 13,
  SHIFT: 16,
  CONTROL: 17,
  ATL: 18,
  SPACEBAR: 32,

  LEFT_ARROW: 37,
  UP_ARROW: 38,
  RIGHT_ARROW: 39,
  DOWN_ARROW: 40,

  NUMBER_0: 48,
  NUMBER_1: 49,
  NUMBER_2: 50,
  NUMBER_3: 51,
  NUMBER_4: 52,
  NUMBER_5: 53,
  NUMBER_6: 54,
  NUMBER_7: 55,
  NUMBER_8: 56,
  NUMBER_9: 57,

  A: 65,
  B: 66,
  C: 67,
  D: 68,
  E: 69,
  F: 70,
  G: 71,
  H: 72,
  I: 73,
  J: 74,
  K: 75,
  L: 76,
  M: 77,
  N: 78,
  O: 79,
  P: 80,
  Q: 81,
  R: 82,
  S: 83,
  T: 84,
  U: 85,
  V: 86,
  W: 87,
  X: 88,
  Y: 89,
  Z: 90
};

exports.default = KEYS;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _maths = __webpack_require__(12);

var _MouseButtons = __webpack_require__(39);

var _MouseButtons2 = _interopRequireDefault(_MouseButtons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MouseInputManager = {
  BUTTONS: _MouseButtons2.default,
  init: function init() {
    var _this = this;

    this._mouseButtons = [[false, false], [false, false], [false, false]];
    this.mousePosition = new _maths.Vector2D(0, 0);

    this.canvas.addEventListener("mousedown", function (e) {
      return _this._clickSet(e.button, true);
    });
    this.canvas.addEventListener("mouseup", function (e) {
      return _this._clickSet(e.button, false);
    });
    this.canvas.addEventListener("mousemove", function (e) {
      return _this._mouseMove(e.pageX, e.pageY);
    });
    //TODO
    //this.canvas.addEventListener("wheel", e => this.mouseMove(e.pageX, e.pageY))
  },
  update: function update() {
    this._mouseButtons[0][0] = this._mouseButtons[0][1];
    this._mouseButtons[1][0] = this._mouseButtons[1][1];
    this._mouseButtons[2][0] = this._mouseButtons[2][1];
  },

  methods: {
    _mouseMove: function _mouseMove(x, y) {
      this.mousePosition.setPosition(Math.round((x - this.canvas.offsetLeft) * (this.canvas.width / this.canvas.offsetWidth)), Math.round((y - this.canvas.offsetTop) * (this.canvas.height / this.canvas.offsetHeight)));
    },
    _clickSet: function _clickSet(clickcode, value) {
      this._mouseButtons[clickcode][1] = value;
    },
    isJustClicked: function isJustClicked(clickcode) {
      return !this._mouseButtons[clickcode][0] && this._mouseButtons[clickcode][1];
    },
    isClicked: function isClicked(clickcode) {
      return this._mouseButtons[clickcode][0] && this._mouseButtons[clickcode][1];
    }
  }
};

exports.default = MouseInputManager;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var BUTTONS = {
  LEFT_CLICK: 0,
  CENTER_CLICK: 1,
  RIGHT_CLICK: 2
};

exports.default = BUTTONS;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Maze = __webpack_require__(7);

var _Maze2 = _interopRequireDefault(_Maze);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassicMaze = new _Maze2.default([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0], [0, 3, 0, 1, 1, 0, 2, 0, 1, 1, 1, 0, 2, 0, 0, 2, 0, 1, 1, 1, 0, 2, 0, 1, 1, 0, 3, 0], [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0], [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0], [0, 2, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0], [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 0, 2, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 2, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 2, 0, 0, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 2, 0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0], [1, 1, 1, 1, 1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 2, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 2, 0, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 1, 1, 1, 1, 1], [0, 0, 0, 0, 0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0, 0], [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0], [0, 2, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0], [0, 3, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 2, 1, 1, 2, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 3, 0], [0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0], [0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 2, 0, 0, 0], [0, 2, 2, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 0, 0, 2, 2, 2, 2, 2, 2, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0], [0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]], [[[1, 1], 'auto'], [[1, 6], 'auto'], [[1, 12], 'auto'], [[1, 15], 'auto'], [[1, 21], 'auto'], [[1, 26], 'auto'], [[5, 1], 'auto'], [[5, 6], 'auto'], [[5, 9], 'auto'], [[5, 12], 'auto'], [[5, 15], 'auto'], [[5, 18], 'auto'], [[5, 21], 'auto'], [[5, 26], 'auto'], [[8, 1], 'auto'], [[8, 6], 'auto'], [[8, 9], 'auto'], [[8, 12], 'auto'], [[8, 15], 'auto'], [[8, 18], 'auto'], [[8, 21], 'auto'], [[8, 26], 'auto'], [[11, 9], 'auto'], [[11, 12], [1, 3]], [[11, 15], [1, 3]], [[11, 18], 'auto'], [[14, 6], 'auto'], [[14, 9], 'auto'], [[14, 18], 'auto'], [[14, 21], 'auto'], [[17, 9], 'auto'], [[17, 18], 'auto'], [[20, 1], 'auto'], [[20, 6], 'auto'], [[20, 9], 'auto'], [[20, 12], 'auto'], [[20, 15], 'auto'], [[20, 18], 'auto'], [[20, 21], 'auto'], [[20, 26], 'auto'], [[23, 1], 'auto'], [[23, 3], 'auto'], [[23, 6], 'auto'], [[23, 9], 'auto'], [[23, 12], [1, 3]], [[23, 15], [1, 3]], [[23, 18], 'auto'], [[23, 21], 'auto'], [[23, 24], 'auto'], [[23, 26], 'auto'], [[26, 1], 'auto'], [[26, 3], 'auto'], [[26, 6], 'auto'], [[26, 9], 'auto'], [[26, 12], 'auto'], [[26, 15], 'auto'], [[26, 18], 'auto'], [[26, 21], 'auto'], [[26, 24], 'auto'], [[26, 26], 'auto'], [[29, 1], 'auto'], [[29, 12], 'auto'], [[29, 15], 'auto'], [[29, 26], 'auto']], { x: 13.5, y: 26 }, { x: 13.5, y: 15 });

exports.default = ClassicMaze;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _render = __webpack_require__(1);

var _Pacman = __webpack_require__(0);

var _Pacman2 = _interopRequireDefault(_Pacman);

var _Maze = __webpack_require__(7);

var _Maze2 = _interopRequireDefault(_Maze);

var _RedPhantom = __webpack_require__(8);

var _RedPhantom2 = _interopRequireDefault(_RedPhantom);

var _PinkPhantom = __webpack_require__(14);

var _PinkPhantom2 = _interopRequireDefault(_PinkPhantom);

var _BluePhantom = __webpack_require__(15);

var _BluePhantom2 = _interopRequireDefault(_BluePhantom);

var _OrangePhantom = __webpack_require__(16);

var _OrangePhantom2 = _interopRequireDefault(_OrangePhantom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PacmanEntity = new _render.Gear({
    init: function init() {
        this.frame = _Pacman2.default.GLOBALS.tileset[1];

        this.x = _Pacman2.default.GLOBALS.maze.pacmanSpawn.x;
        this.y = _Pacman2.default.GLOBALS.maze.pacmanSpawn.y;
        this.xRounded = _Pacman2.default.GLOBALS.maze.pacmanSpawn.x;
        this.yRounded = _Pacman2.default.GLOBALS.maze.pacmanSpawn.y;

        this.v = 5;

        this.direction = _Pacman2.default.GLOBALS.LEFT;
        this.nextDirection = _Pacman2.default.GLOBALS.LEFT;
    },
    update: function update() {
        var prevX = this.x;
        var prevY = this.y;

        if (_Pacman2.default.input.isKeyDown(_render.Keyboard.KEYS.UP_ARROW)) this.nextDirection = _Pacman2.default.GLOBALS.UP;else if (_Pacman2.default.input.isKeyDown(_render.Keyboard.KEYS.DOWN_ARROW)) this.nextDirection = _Pacman2.default.GLOBALS.DOWN;else if (_Pacman2.default.input.isKeyDown(_render.Keyboard.KEYS.LEFT_ARROW)) this.nextDirection = _Pacman2.default.GLOBALS.LEFT;else if (_Pacman2.default.input.isKeyDown(_render.Keyboard.KEYS.RIGHT_ARROW)) this.nextDirection = _Pacman2.default.GLOBALS.RIGHT;

        this.updatePosition();

        this.checkEntityColision();
    },
    render: function render(sb) {
        sb.drawTexture(this.frame, this.xRounded * 8, this.yRounded * 8);
    },

    methods: {
        updatePosition: function updatePosition() {

            if ((this.direction + this.nextDirection) % 2 == 0) this.direction = this.nextDirection;

            var movement = this.v * _Pacman2.default.deltaTime;
            if (movement > 0.1) movement = 0.1;

            if (this.direction == _Pacman2.default.GLOBALS.UP) this.y -= movement;else if (this.direction == _Pacman2.default.GLOBALS.RIGHT) this.x += movement;else if (this.direction == _Pacman2.default.GLOBALS.DOWN) this.y += movement;else if (this.direction == _Pacman2.default.GLOBALS.LEFT) this.x -= movement;

            this.fixPosition();

            this.xRounded = Math.round(this.x * 10) / 10;
            this.yRounded = Math.round(this.y * 10) / 10;

            this.changeDirection();
        },
        changeDirection: function changeDirection() {
            var _getTile = this.getTile(),
                i = _getTile.i,
                j = _getTile.j;

            if (_Pacman2.default.GLOBALS.maze.consumeBall(i, j) == 3) this.$emit('enterPanic');

            if (this.direction == this.nextDirection) return;

            if (this.nextDirection == _Pacman2.default.GLOBALS.UP && _Pacman2.default.GLOBALS.maze.layout[i - 1][j] > 0 && this.xRounded % 1 <= 0.3) {
                this.x = Math.floor(this.x);
                this.direction = this.nextDirection;
            } else if (this.nextDirection == _Pacman2.default.GLOBALS.RIGHT && _Pacman2.default.GLOBALS.maze.layout[i][j + 1] > 0 && this.yRounded % 1 <= 0.3) {
                this.y = Math.floor(this.y);
                this.direction = this.nextDirection;
            } else if (this.nextDirection == _Pacman2.default.GLOBALS.DOWN && _Pacman2.default.GLOBALS.maze.layout[i + 1][j] > 0 && this.xRounded % 1 <= 0.3) {
                this.x = Math.floor(this.x);
                this.direction = this.nextDirection;
            } else if (this.nextDirection == _Pacman2.default.GLOBALS.LEFT && _Pacman2.default.GLOBALS.maze.layout[i][j - 1] > 0 && this.yRounded % 1 <= 0.3) {
                this.y = Math.floor(this.y);
                this.direction = this.nextDirection;
            }
        },
        fixPosition: function fixPosition() {
            var _getTile2 = this.getTile(),
                i = _getTile2.i,
                j = _getTile2.j;

            if (this.direction == _Pacman2.default.GLOBALS.UP && _Pacman2.default.GLOBALS.maze.layout[i][j] == _Maze2.default.BLOCKS.WALL) this.y = Math.ceil(this.y);else if (this.direction == _Pacman2.default.GLOBALS.RIGHT && _Pacman2.default.GLOBALS.maze.layout[i][j + 1] == _Maze2.default.BLOCKS.WALL) this.x = Math.floor(this.x);else if (this.direction == _Pacman2.default.GLOBALS.DOWN && _Pacman2.default.GLOBALS.maze.layout[i + 1][j] == _Maze2.default.BLOCKS.WALL) this.y = Math.floor(this.y);else if (this.direction == _Pacman2.default.GLOBALS.LEFT && _Pacman2.default.GLOBALS.maze.layout[i][j] == _Maze2.default.BLOCKS.WALL) this.x = Math.ceil(this.x);

            if (this.x < -1) this.x = 28;
            if (this.x > 28) this.x = -1;
        },
        getTile: function getTile() {
            return { i: Math.floor(this.y - 3), j: Math.floor(this.x) };
        },
        collides: function collides(entity) {
            if (this.x + 1 >= entity.x && entity.x + 1 >= this.x && this.y + 1 >= entity.y && entity.y + 1 >= this.y) return true;
            return false;
        },
        checkEntityColision: function checkEntityColision() {
            if (this.collides(_RedPhantom2.default)) _RedPhantom2.default.onPacmanCollision();
            if (this.collides(_PinkPhantom2.default)) _PinkPhantom2.default.onPacmanCollision();
            if (this.collides(_BluePhantom2.default)) _BluePhantom2.default.onPacmanCollision();
            if (this.collides(_OrangePhantom2.default)) _OrangePhantom2.default.onPacmanCollision();
        },
        softReset: function softReset() {
            this.x = _Pacman2.default.GLOBALS.maze.pacmanSpawn.x;
            this.y = _Pacman2.default.GLOBALS.maze.pacmanSpawn.y;
            this.xRounded = _Pacman2.default.GLOBALS.maze.pacmanSpawn.x;
            this.yRounded = _Pacman2.default.GLOBALS.maze.pacmanSpawn.y;

            this.direction = _Pacman2.default.GLOBALS.LEFT;
            this.nextDirection = _Pacman2.default.GLOBALS.LEFT;
        }
    }
});

exports.default = PacmanEntity;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMmQzNTJkZjU1YjUzYTUyZTk0MmYiLCJ3ZWJwYWNrOi8vLy4vc3JjL1BhY21hbi5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvdXRpbHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyL3NyYy9tYXRocy9NYXQzLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9QaGFudG9tLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvYXNzZXRMb2FkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyL3NyYy9tYXRocy9WZWN0b3IyRC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvbWF6ZS9NYXplLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9SZWRQaGFudG9tLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvZ3JhcGhpY3MvdGV4dHVyZS9UZXh0dXJlUmVnaW9uLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvYXNzZXRMb2FkZXIvQ2FjaGVMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyL3NyYy9zb3VuZC9Tb3VuZENvbnRleHQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyL3NyYy9tYXRocy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL21hdGhzL1BvbHlnb24uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VudGl0aWVzL1BpbmtQaGFudG9tLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9CbHVlUGhhbnRvbS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50aXRpZXMvT3JhbmdlUGhhbnRvbS5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL2NvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyL3NyYy9jb3JlL0dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyL3NyYy9hc3NldExvYWRlci9UZXh0dXJlTG9hZGVycy5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL2dyYXBoaWNzL3RleHR1cmUvVGV4dHVyZS5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL3V0aWxzL0V2ZW50RW1pdGVyLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvYXNzZXRMb2FkZXIvU291bmRMb2FkZXJzLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvc291bmQvU291bmQuanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyL3NyYy9hc3NldExvYWRlci9Bc3NldExvYWRlci5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL2lucHV0L0lucHV0TWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL2NvcmUvR2Vhci5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL2NvcmUvR2VhclN0YWNrLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvZ3JhcGhpY3MvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyL3NyYy9ncmFwaGljcy9TcHJpdGVCYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL2dyYXBoaWNzL0ltYWdlQnVmZmVyLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvZ3JhcGhpY3MvQW5pbWF0aW9uLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvZ3JhcGhpY3MvQ2FtZXJhLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvbWF0aHMvUmVjdGFuZ2xlLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvaW5wdXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcmVuZGVyL3NyYy9pbnB1dC9rZXlib2FyZC9LZXlib2FyZElucHV0TWFuYWdlci5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL2lucHV0L2tleWJvYXJkL0tleWJvYXJkS2V5cy5qcyIsIndlYnBhY2s6Ly8vLi9yZW5kZXIvc3JjL2lucHV0L21vdXNlL01vdXNlSW5wdXRNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3JlbmRlci9zcmMvaW5wdXQvbW91c2UvTW91c2VCdXR0b25zLmpzIiwid2VicGFjazovLy8uL3NyYy9tYXplL0NsYXNzaWNNYXplLmpzIiwid2VicGFjazovLy8uL3NyYy9lbnRpdGllcy9QYWNtYW5FbnRpdHkuanMiXSwibmFtZXMiOlsibWFpbkdlYXIiLCJsb2FkIiwidGlsZXMiLCJsb2FkVGV4dHVyZUZyb21VcmwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsImluaXQiLCJwYXVzZWQiLCJwYXVzZWRUaW1lIiwiYWN1bXVsYXRlVGltZSIsImxpdmVzIiwidGlsZXNldCIsInNwbGl0IiwiUGFjbWFuIiwiR0xPQkFMUyIsIm1hemUiLCJzYiIsImNvbnRleHQiLCJnZWFyU3RhY2siLCJwYXVzZUdhbWUiLCIkc3Vic2NyaWJlIiwib25QYWNtYW5EZWFkIiwidXBkYXRlIiwiZGVsdGFUaW1lIiwicmVuZGVyIiwiZmlsbFJlY3QiLCJiZWdpbiIsImkiLCJkcmF3VGV4dHVyZSIsImRyYXdUZXh0IiwiUE9JTlRTIiwiZW5kIiwibWV0aG9kcyIsInRpbWUiLCJzb2Z0UmVzZXQiLCJnZWFycyIsIlBhY21hbkVudGl0eSIsIlJlZFBoYW50b20iLCJQaW5rUGhhbnRvbSIsIkJsdWVQaGFudG9tIiwiT3JhbmdlUGhhbnRvbSIsImNvbnRhaW5lcl9pZCIsIndpZHRoIiwiaGVpZ2h0IiwiVVAiLCJSSUdIVCIsIkRPV04iLCJMRUZUIiwiR2FtZSIsIkdlYXIiLCJUZXh0dXJlUmVnaW9uIiwiU3ByaXRlQmF0Y2giLCJBbmltYXRpb24iLCJDYW1lcmEiLCJNMyIsIlBvbHlnb24iLCJSZWN0YW5nbGUiLCJWZWN0b3IyRCIsIkxvYWRlciIsIktleWJvYXJkSW5wdXRNYW5hZ2VyIiwiTW91c2VJbnB1dE1hbmFnZXIiLCJkZWZhdWx0IiwiQXNzZXRDYWNoZSIsIk1hcCIsImlkZW50aXR5IiwibXVsdGlwbHkiLCJhIiwiYiIsImEwMCIsImEwMSIsImEwMiIsImExMCIsImExMSIsImExMiIsImEyMCIsImEyMSIsImEyMiIsImIwMCIsImIwMSIsImIwMiIsImIxMCIsImIxMSIsImIxMiIsImIyMCIsImIyMSIsImIyMiIsInRyYW5zbGF0ZSIsIm0iLCJ0eCIsInR5IiwidHJhbnNsYXRpb24iLCJyb3RhdGUiLCJhbmdsZSIsInJvdGF0aW9uIiwiTWF0aCIsImNvcyIsInNpbiIsInNjYWxlIiwic3giLCJzeSIsInNjYWxhdGlvbiIsInRvQ2FudmFzMmRNYXRyaXgiLCJQaGFudG9tIiwic3ByaXRlIiwicGF0cm9sUG9pbnQiLCJzcGF3blBvaW50Iiwib25IdW50TW9kZSIsIm9uSW5KYWlsIiwibW9kZSIsInByZXZNb2RlIiwidGltZVJlZmVybmNlIiwic3Bhd24iLCJpbkphaWwiLCJ4IiwieSIsInhSb3VuZGVkIiwieVJvdW5kZWQiLCJ2IiwiZGlyZWN0aW9uIiwibmV4dERpcmVjdGlvbiIsIm5leHREaXJlY3Rpb25DYWxjdWxhdGVkIiwib25IdW50TW9kZUNiIiwicHJldlgiLCJwcmV2WSIsIm1vdmVtZW50IiwiZml4UG9zaXRpb24iLCJyb3VuZCIsImNoYW5nZURpcmVjdGlvbiIsInNldE1vZGUiLCJjYWxjdWxhdGVEaXJlY3Rpb24iLCJ0YXJnZXRQb2ludCIsImoiLCJhbGxEaXJlY3Rpb25zIiwiaW50ZXJzZWN0aW9ucyIsImdldCIsIkpTT04iLCJzdHJpbmdpZnkiLCJpbmRleCIsImluZGV4T2YiLCJkaXJlY3Rpb25zIiwiZmlsdGVyIiwiZSIsImxlbmdodCIsIm1pbiIsIk51bWJlciIsIk1BWF9WQUxVRSIsInRhcmdldERpcmVjdGlvbiIsIm4iLCJsZW5ndGgiLCJkaXN0YW5jZSIsImZsb29yIiwibWFnbml0dWRlIiwiZ2V0VGlsZSIsImhhcyIsImxheW91dCIsIkJMT0NLUyIsIldBTEwiLCJjZWlsIiwib25QYXRyb2xNb2RlIiwib25QYW5pY01vZGUiLCJyYW5kb20iLCJQQU5JQ19USU1FIiwiVElNRVMiLCJvblBhY21hbkNvbGxpc2lvbiIsInBhdXNlUGhhbnRvbSIsIkFGVEVSX0VBVF9QQVVTRSIsIiRlbWl0IiwidGV4dHVyZUxvYWRlcnMiLCJzb3VuZExvYWRlcnMiLCJ4byIsInlvIiwidHJhbmZvcm1hdGlvbk1hdHJpeCIsInZlY3RvciIsIm1hdHJpeCIsIlBJIiwidHJhbnNmb3JtIiwic2NhbGVYIiwic2NhbGVZIiwic3FydCIsInBvdyIsInByb3llY3Rpb25WZWN0b3IiLCJwcm95ZWN0aW9uVmVjdG9yTWFnbml0dWRlIiwiTWF6ZSIsInBhY21hblNwYXduIiwiamFpbERvb3IiLCJiYWxsc19jb3VudCIsImJhbGxzX3RvdGFsIiwicG9pbnQiLCJyb3ciLCJjb2wiLCJwdXNoIiwic2V0IiwiY2VsbCIsIkVNUFRZIiwiQkFMTCIsIlNVUEVSX0JBTEwiLCJzZWxmIiwidGV4dHVyZSIsInVuZGVmaW5lZCIsInJvd3MiLCJjb2xzIiwicm93SGVpZ2h0IiwiY29sV2lkdGgiLCJyZWdpb25zIiwiQXJyYXkiLCJsb2FkRnJvbUNhY2hlIiwic3JjIiwiQXVkaW9Db250ZXh0Iiwid2Via2l0QXVkaW9Db250ZXh0IiwiU291bmRDb250ZXh0IiwidmVydGV4cyIsIm5vcm1hbHMiLCJ2ZWN0ZXhzIiwibGFzdFZlcnRleCIsIm5vcm1hbCIsInByb2plY3Rpb24iLCJtYXgiLCJwIiwicG9seWdvbiIsInRoaXNOb3JtYWxzIiwiZ2V0Tm9ybWFscyIsInBvbHlnb25Ob3JtYWxzIiwidGhpc1Byb2plY3Rpb24iLCJwb2x5Z29uUHJvamVjdGlvbiIsInRhcmdlUG9pbnQiLCJwYWNtYW5Qb3NpdGlvbiIsImZpdENhbnZhc1RvQ29uYXRpbmVyIiwiYWRkSW5wdXRNYW5hZ2VycyIsInN0YXJ0IiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwid2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwibXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJkZWZhdWx0T3B0aW9ucyIsIm9wdGlvbnMiLCJjb3JlR2VhciIsImNvbnRhaW5lciIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzZXRDYW52YXMiLCJjYW52YXMiLCJzdHlsZSIsIm91dGxpbmUiLCJzZXRBdHRyaWJ1dGUiLCJpbnB1dCIsImdldENvbnRleHQiLCJmdWxsU2NyZWVuQWN0aXZlIiwicnVubmluZyIsImRlbHRhIiwidGhlbiIsImxvb3AiLCJiaW5kIiwicmVxdWVzdEZ1bGxTY3JlZW4iLCJyZXF1ZXN0RnVsbHNjcmVlbiIsIm1zUmVxdWVzdEZ1bGxzY3JlZW4iLCJtb3pSZXF1ZXN0RnVsbFNjcmVlbiIsIndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIiwiZXhpdEZ1bGxTY3JlZW4iLCJleGl0RnVsbHNjcmVlbiIsIm1zRXhpdEZ1bGxzY3JlZW4iLCJtb3pDYW5jZWxGdWxsU2NyZWVuIiwid2Via2l0Q2FuY2VsRnVsbFNjcmVlbiIsImJhY2tncm91bmQiLCJwb3NpdGlvbiIsImRpc3BsYXkiLCJhbGlnbkl0ZW1zIiwianVzdGlmeUNvbnRlbnQiLCJvdmVyZmxvdyIsImlubmVySFRNTCIsInNldFRpbWVvdXQiLCJjYW52YXNQcm9wb3J0aW9ucyIsImNsaWVudFdpZHRoIiwiY2xpZW50SGVpZ2h0IiwiY29udGFpbmVyUHJvcG9ydGlvbnMiLCJyZW5kZXJlciIsImZvcmNlIiwiYWN0aXZhdGUiLCJub3ciLCJEYXRlIiwiJHVwZGF0ZSIsIiRyZW5kZXIiLCIkbG9hZCIsImFyZ3MiLCJhZGRNYW5hZ2VycyIsInVybCIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwiY2FjaGUiLCJpbWciLCJJbWFnZSIsIm9ubG9hZCIsInJlc3VsdCIsIlVSTCIsImNyb3NzT3JpZ2luIiwibG9hZFRleHR1cmVGcm9tRmlsZSIsImZpbGUiLCJuYW1lIiwiZnIiLCJGaWxlUmVhZGVyIiwib25sb2FkZW5kIiwicmVhZEFzRGF0YVVSTCIsIlRleHR1cmUiLCJpbWFnZSIsIkV2ZW50RW1pdGVyIiwic3Vic2NyaXB0aW9ucyIsInN1YnNjcmlwdG9yIiwibWVzc2FnZSIsImNhbGxiYWNrIiwibXNnU3VicyIsImRlbGV0ZSIsInNpemUiLCJ2YWx1ZXMiLCJlbWl0ZXIiLCJsb2FkU291bmRGcm9tVXJsIiwicmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0Iiwib3BlbiIsInJlc3BvbnNlVHlwZSIsImRlY29kZUF1ZGlvRGF0YSIsInJlc3BvbnNlIiwiYnVmZmVyIiwiZXJyb3IiLCJzZW5kIiwibG9hZFNvdW5kRnJvbUZpbGUiLCJyZWFkQXNBcnJheUJ1ZmZlciIsIlNvdW5kIiwiYXVkaW9CdWZmZXIiLCJpbnN0YW5jZXMiLCJpZENvdW50ZXIiLCJ2b2x1bWUiLCJpZCIsInNvdXJjZSIsImNyZWF0ZUJ1ZmZlclNvdXJjZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJnYWluTm9kZSIsImNyZWF0ZUdhaW4iLCJjb25uZWN0IiwiZ2FpbiIsInNldFRhcmdldEF0VGltZSIsImN1cnJlbnRUaW1lIiwiZGVzdGluYXRpb24iLCJCb29sZWFuIiwiaXNTZXQiLCJzdG9wIiwibm90ZU9mZiIsIkFzc2V0TG9hZGVyIiwibG9hZGVycyIsInVuTG9hZENvbnRlbnQiLCJsb2FkQ29udGVudFJlZmVyZW5jZXMiLCJhZGRMb2FkZXJzIiwibG9hZGVyRW50cmllcyIsIk9iamVjdCIsImVudHJpZXMiLCJrZXkiLCJ2YWx1ZSIsImNvbnRlbnQiLCJrZXlzIiwibWFwIiwiYWxsIiwiSW5wdXRNYW5hZ2VyIiwiX3VwZGF0ZUZ1bmN0aW9ucyIsIm1hbmFnZXJzIiwibmV3VXBkYXRlRnVuY3Rpb25zIiwibWV0aG9kTGlzdCIsImdlYXIiLCJwYXVzZSIsImFjdGl2ZSIsIiRhZGRMb2FkQ29udGVudCIsImVtaXQiLCJzdWJzY3JpYmUiLCJ1bnN1YnNjcmliZSIsIkdlYXJTdGFjayIsInBhcmVudCIsInN0YWNrIiwiZHJhd2luZyIsInByb2plY3Rpb25NYXRyaXgiLCJjbGVhciIsInNyY1giLCJzcmNZIiwic3JjV2lkdGgiLCJzcmNIZWlnaHQiLCJkc3RYIiwiZHN0WSIsImRzdFdpZHRoIiwiZHN0SGVpZ2h0Iiwic3JjUm90YXRpb24iLCJvZmZzZXRYIiwib2Zmc2V0WSIsInNhdmUiLCJjb25zdHJ1Y3RvciIsInNldFRyYW5zZm9ybSIsImRyYXdJbWFnZSIsInJlc3RvcmUiLCJ0ZXh0IiwiY29sb3IiLCJmb250IiwiYWxpbmciLCJmaWxsU3R5bGUiLCJ0ZXh0QWxpZ24iLCJmaWxsVGV4dCIsIkltYWdlQnVmZmVyIiwiY3JlYXRlRWxlbWVudCIsImNsZWFyUmVjdCIsImZyYW1lVGltZSIsImZyYW1lcyIsInBsYXlNb2RlIiwiYW5pbWF0aW9uRW5kZWQiLCJfZnJhbWUiLCJfYWN1bXVsYXRlVGltZSIsImZyYW1lc0VsYXBzZXMiLCJfbmV4dEZyYW1lIiwiZnJhbWVFbGFwc2UiLCJtb2QiLCJQTEFZX01PREVTIiwiTk9STUFMIiwiTE9PUCIsIlJFVkVSU0UiLCJMT09QX1JFVkVSU0UiLCJ6b29tIiwiY2FtZXJhTWF0cml4IiwiS0VZUyIsIl9rZXlzIiwiX2tleVNldCIsImtleUNvZGUiLCJrZXljb2RlIiwiaXNLZXlKdXN0UHJlc3NlZCIsImlzS2V5RG93biIsIkRFTEVURSIsIkVOVEVSIiwiU0hJRlQiLCJDT05UUk9MIiwiQVRMIiwiU1BBQ0VCQVIiLCJMRUZUX0FSUk9XIiwiVVBfQVJST1ciLCJSSUdIVF9BUlJPVyIsIkRPV05fQVJST1ciLCJOVU1CRVJfMCIsIk5VTUJFUl8xIiwiTlVNQkVSXzIiLCJOVU1CRVJfMyIsIk5VTUJFUl80IiwiTlVNQkVSXzUiLCJOVU1CRVJfNiIsIk5VTUJFUl83IiwiTlVNQkVSXzgiLCJOVU1CRVJfOSIsIkEiLCJCIiwiQyIsIkQiLCJFIiwiRiIsIkciLCJIIiwiSSIsIkoiLCJLIiwiTCIsIk0iLCJOIiwiTyIsIlAiLCJRIiwiUiIsIlMiLCJUIiwiVSIsIlYiLCJXIiwiWCIsIlkiLCJaIiwiQlVUVE9OUyIsIl9tb3VzZUJ1dHRvbnMiLCJtb3VzZVBvc2l0aW9uIiwiX2NsaWNrU2V0IiwiYnV0dG9uIiwiX21vdXNlTW92ZSIsInBhZ2VYIiwicGFnZVkiLCJzZXRQb3NpdGlvbiIsIm9mZnNldExlZnQiLCJvZmZzZXRXaWR0aCIsIm9mZnNldFRvcCIsIm9mZnNldEhlaWdodCIsImNsaWNrY29kZSIsImlzSnVzdENsaWNrZWQiLCJpc0NsaWNrZWQiLCJMRUZUX0NMSUNLIiwiQ0VOVEVSX0NMSUNLIiwiUklHSFRfQ0xJQ0siLCJDbGFzc2ljTWF6ZSIsImZyYW1lIiwidXBkYXRlUG9zaXRpb24iLCJjaGVja0VudGl0eUNvbGlzaW9uIiwiY29uc3VtZUJhbGwiLCJjb2xsaWRlcyIsImVudGl0eSJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQzdEQTs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7OztBQUVBLElBQU1BLFdBQVcsaUJBQVM7QUFDdEJDLFFBRHNCLGtCQUNoQjtBQUNGLGVBQU87QUFDSEMsbUJBQU8sZUFBT0Msa0JBQVAsQ0FBNkJDLE9BQU9DLFFBQVAsQ0FBZ0JDLE1BQTdDO0FBREosU0FBUDtBQUdILEtBTHFCO0FBTXRCQyxRQU5zQixrQkFNaEI7QUFBQTs7QUFDRixhQUFLQyxNQUFMLEdBQWMsS0FBZDtBQUNBLGFBQUtDLFVBQUwsR0FBa0IsQ0FBbEI7QUFDQSxhQUFLQyxhQUFMLEdBQXFCLENBQXJCOztBQUVBLGFBQUtDLEtBQUwsR0FBYSxDQUFiOztBQUVBLGFBQUtD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akMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FESixFQUVJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FGSixFQUdJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FISixFQUlJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FKSixFQUtJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FMSixFQU1JLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FOSixFQU9JLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FQSixFQVFJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FSSixFQVNJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FUSixFQVVJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FWSixFQVdJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FYSixFQVlJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FaSixFQWFJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FiSixFQWNJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FkSixFQWVJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FmSixFQWdCSSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLEVBQW1DLENBQW5DLEVBQXFDLENBQXJDLEVBQXVDLENBQXZDLEVBQXlDLENBQXpDLEVBQTJDLENBQTNDLEVBQTZDLENBQTdDLEVBQStDLENBQS9DLEVBQWlELENBQWpELEVBQW1ELENBQW5ELEVBQXFELENBQXJELEVBQXVELENBQXZELENBaEJKLEVBaUJJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FqQkosRUFrQkksQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixFQUE2QixDQUE3QixFQUErQixDQUEvQixFQUFpQyxDQUFqQyxFQUFtQyxDQUFuQyxFQUFxQyxDQUFyQyxFQUF1QyxDQUF2QyxFQUF5QyxDQUF6QyxFQUEyQyxDQUEzQyxFQUE2QyxDQUE3QyxFQUErQyxDQUEvQyxFQUFpRCxDQUFqRCxFQUFtRCxDQUFuRCxFQUFxRCxDQUFyRCxFQUF1RCxDQUF2RCxDQWxCSixFQW1CSSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLEVBQW1DLENBQW5DLEVBQXFDLENBQXJDLEVBQXVDLENBQXZDLEVBQXlDLENBQXpDLEVBQTJDLENBQTNDLEVBQTZDLENBQTdDLEVBQStDLENBQS9DLEVBQWlELENBQWpELEVBQW1ELENBQW5ELEVBQXFELENBQXJELEVBQXVELENBQXZELENBbkJKLEVBb0JJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0FwQkosRUFxQkksQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixFQUE2QixDQUE3QixFQUErQixDQUEvQixFQUFpQyxDQUFqQyxFQUFtQyxDQUFuQyxFQUFxQyxDQUFyQyxFQUF1QyxDQUF2QyxFQUF5QyxDQUF6QyxFQUEyQyxDQUEzQyxFQUE2QyxDQUE3QyxFQUErQyxDQUEvQyxFQUFpRCxDQUFqRCxFQUFtRCxDQUFuRCxFQUFxRCxDQUFyRCxFQUF1RCxDQUF2RCxDQXJCSixFQXNCSSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLEVBQW1DLENBQW5DLEVBQXFDLENBQXJDLEVBQXVDLENBQXZDLEVBQXlDLENBQXpDLEVBQTJDLENBQTNDLEVBQTZDLENBQTdDLEVBQStDLENBQS9DLEVBQWlELENBQWpELEVBQW1ELENBQW5ELEVBQXFELENBQXJELEVBQXVELENBQXZELENBdEJKLEVBdUJJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0F2QkosRUF3QkksQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixFQUE2QixDQUE3QixFQUErQixDQUEvQixFQUFpQyxDQUFqQyxFQUFtQyxDQUFuQyxFQUFxQyxDQUFyQyxFQUF1QyxDQUF2QyxFQUF5QyxDQUF6QyxFQUEyQyxDQUEzQyxFQUE2QyxDQUE3QyxFQUErQyxDQUEvQyxFQUFpRCxDQUFqRCxFQUFtRCxDQUFuRCxFQUFxRCxDQUFyRCxFQUF1RCxDQUF2RCxDQXhCSixFQXlCSSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLEVBQW1DLENBQW5DLEVBQXFDLENBQXJDLEVBQXVDLENBQXZDLEVBQXlDLENBQXpDLEVBQTJDLENBQTNDLEVBQTZDLENBQTdDLEVBQStDLENBQS9DLEVBQWlELENBQWpELEVBQW1ELENBQW5ELEVBQXFELENBQXJELEVBQXVELENBQXZELENBekJKLEVBMEJJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0ExQkosRUEyQkksQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixFQUE2QixDQUE3QixFQUErQixDQUEvQixFQUFpQyxDQUFqQyxFQUFtQyxDQUFuQyxFQUFxQyxDQUFyQyxFQUF1QyxDQUF2QyxFQUF5QyxDQUF6QyxFQUEyQyxDQUEzQyxFQUE2QyxDQUE3QyxFQUErQyxDQUEvQyxFQUFpRCxDQUFqRCxFQUFtRCxDQUFuRCxFQUFxRCxDQUFyRCxFQUF1RCxDQUF2RCxDQTNCSixFQTRCSSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLEVBQW1DLENBQW5DLEVBQXFDLENBQXJDLEVBQXVDLENBQXZDLEVBQXlDLENBQXpDLEVBQTJDLENBQTNDLEVBQTZDLENBQTdDLEVBQStDLENBQS9DLEVBQWlELENBQWpELEVBQW1ELENBQW5ELEVBQXFELENBQXJELEVBQXVELENBQXZELENBNUJKLEVBNkJJLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxFQUFTLENBQVQsRUFBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsRUFBaUIsQ0FBakIsRUFBbUIsQ0FBbkIsRUFBcUIsQ0FBckIsRUFBdUIsQ0FBdkIsRUFBeUIsQ0FBekIsRUFBMkIsQ0FBM0IsRUFBNkIsQ0FBN0IsRUFBK0IsQ0FBL0IsRUFBaUMsQ0FBakMsRUFBbUMsQ0FBbkMsRUFBcUMsQ0FBckMsRUFBdUMsQ0FBdkMsRUFBeUMsQ0FBekMsRUFBMkMsQ0FBM0MsRUFBNkMsQ0FBN0MsRUFBK0MsQ0FBL0MsRUFBaUQsQ0FBakQsRUFBbUQsQ0FBbkQsRUFBcUQsQ0FBckQsRUFBdUQsQ0FBdkQsQ0E3QkosRUE4QkksQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLEVBQVMsQ0FBVCxFQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixFQUFpQixDQUFqQixFQUFtQixDQUFuQixFQUFxQixDQUFyQixFQUF1QixDQUF2QixFQUF5QixDQUF6QixFQUEyQixDQUEzQixFQUE2QixDQUE3QixFQUErQixDQUEvQixFQUFpQyxDQUFqQyxFQUFtQyxDQUFuQyxFQUFxQyxDQUFyQyxFQUF1QyxDQUF2QyxFQUF5QyxDQUF6QyxFQUEyQyxDQUEzQyxFQUE2QyxDQUE3QyxFQUErQyxDQUEvQyxFQUFpRCxDQUFqRCxFQUFtRCxDQUFuRCxFQUFxRCxDQUFyRCxFQUF1RCxDQUF2RCxDQTlCSixFQStCSSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxFQUFPLENBQVAsRUFBUyxDQUFULEVBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLEVBQWlCLENBQWpCLEVBQW1CLENBQW5CLEVBQXFCLENBQXJCLEVBQXVCLENBQXZCLEVBQXlCLENBQXpCLEVBQTJCLENBQTNCLEVBQTZCLENBQTdCLEVBQStCLENBQS9CLEVBQWlDLENBQWpDLEVBQW1DLENBQW5DLEVBQXFDLENBQXJDLEVBQXVDLENBQXZDLEVBQXlDLENBQXpDLEVBQTJDLENBQTNDLEVBQTZDLENBQTdDLEVBQStDLENBQS9DLEVBQWlELENBQWpELEVBQW1ELENBQW5ELEVBQXFELENBQXJELEVBQXVELENBQXZELENBL0JKLENBRGdCLEVBa0NoQixDQUNJLENBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFELEVBQVEsTUFBUixDQURKLEVBRUksQ0FBQyxDQUFDLENBQUQsRUFBRyxDQUFILENBQUQsRUFBUSxNQUFSLENBRkosRUFHSSxDQUFDLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBRCxFQUFTLE1BQVQsQ0FISixFQUlJLENBQUMsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUFELEVBQVMsTUFBVCxDQUpKLEVBS0ksQ0FBQyxDQUFDLENBQUQsRUFBRyxFQUFILENBQUQsRUFBUyxNQUFULENBTEosRUFNSSxDQUFDLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBRCxFQUFTLE1BQVQsQ0FOSixFQU9JLENBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFELEVBQVEsTUFBUixDQVBKLEVBUUksQ0FBQyxDQUFDLENBQUQsRUFBRyxDQUFILENBQUQsRUFBUSxNQUFSLENBUkosRUFTSSxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFRLE1BQVIsQ0FUSixFQVVJLENBQUMsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUFELEVBQVMsTUFBVCxDQVZKLEVBV0ksQ0FBQyxDQUFDLENBQUQsRUFBRyxFQUFILENBQUQsRUFBUyxNQUFULENBWEosRUFZSSxDQUFDLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBRCxFQUFTLE1BQVQsQ0FaSixFQWFJLENBQUMsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUFELEVBQVMsTUFBVCxDQWJKLEVBY0ksQ0FBQyxDQUFDLENBQUQsRUFBRyxFQUFILENBQUQsRUFBUyxNQUFULENBZEosRUFlSSxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFRLE1BQVIsQ0FmSixFQWdCSSxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFRLE1BQVIsQ0FoQkosRUFpQkksQ0FBQyxDQUFDLENBQUQsRUFBRyxDQUFILENBQUQsRUFBUSxNQUFSLENBakJKLEVBa0JJLENBQUMsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUFELEVBQVMsTUFBVCxDQWxCSixFQW1CSSxDQUFDLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBRCxFQUFTLE1BQVQsQ0FuQkosRUFvQkksQ0FBQyxDQUFDLENBQUQsRUFBRyxFQUFILENBQUQsRUFBUyxNQUFULENBcEJKLEVBcUJJLENBQUMsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUFELEVBQVMsTUFBVCxDQXJCSixFQXNCSSxDQUFDLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBRCxFQUFTLE1BQVQsQ0F0QkosRUF1QkksQ0FBQyxDQUFDLEVBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxNQUFULENBdkJKLEVBd0JJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFWLENBeEJKLEVBeUJJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFWLENBekJKLEVBMEJJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsTUFBVixDQTFCSixFQTJCSSxDQUFDLENBQUMsRUFBRCxFQUFJLENBQUosQ0FBRCxFQUFTLE1BQVQsQ0EzQkosRUE0QkksQ0FBQyxDQUFDLEVBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxNQUFULENBNUJKLEVBNkJJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsTUFBVixDQTdCSixFQThCSSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLE1BQVYsQ0E5QkosRUErQkksQ0FBQyxDQUFDLEVBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxNQUFULENBL0JKLEVBZ0NJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsTUFBVixDQWhDSixFQWlDSSxDQUFDLENBQUMsRUFBRCxFQUFJLENBQUosQ0FBRCxFQUFTLE1BQVQsQ0FqQ0osRUFrQ0ksQ0FBQyxDQUFDLEVBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxNQUFULENBbENKLEVBbUNJLENBQUMsQ0FBQyxFQUFELEVBQUksQ0FBSixDQUFELEVBQVMsTUFBVCxDQW5DSixFQW9DSSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLE1BQVYsQ0FwQ0osRUFxQ0ksQ0FBQyxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUQsRUFBVSxNQUFWLENBckNKLEVBc0NJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsTUFBVixDQXRDSixFQXVDSSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLE1BQVYsQ0F2Q0osRUF3Q0ksQ0FBQyxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUQsRUFBVSxNQUFWLENBeENKLEVBeUNJLENBQUMsQ0FBQyxFQUFELEVBQUksQ0FBSixDQUFELEVBQVMsTUFBVCxDQXpDSixFQTBDSSxDQUFDLENBQUMsRUFBRCxFQUFJLENBQUosQ0FBRCxFQUFTLE1BQVQsQ0ExQ0osRUEyQ0ksQ0FBQyxDQUFDLEVBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxNQUFULENBM0NKLEVBNENJLENBQUMsQ0FBQyxFQUFELEVBQUksQ0FBSixDQUFELEVBQVMsTUFBVCxDQTVDSixFQTZDSSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVixDQTdDSixFQThDSSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBVixDQTlDSixFQStDSSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLE1BQVYsQ0EvQ0osRUFnREksQ0FBQyxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUQsRUFBVSxNQUFWLENBaERKLEVBaURJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsTUFBVixDQWpESixFQWtESSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLE1BQVYsQ0FsREosRUFtREksQ0FBQyxDQUFDLEVBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxNQUFULENBbkRKLEVBb0RJLENBQUMsQ0FBQyxFQUFELEVBQUksQ0FBSixDQUFELEVBQVMsTUFBVCxDQXBESixFQXFESSxDQUFDLENBQUMsRUFBRCxFQUFJLENBQUosQ0FBRCxFQUFTLE1BQVQsQ0FyREosRUFzREksQ0FBQyxDQUFDLEVBQUQsRUFBSSxDQUFKLENBQUQsRUFBUyxNQUFULENBdERKLEVBdURJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsTUFBVixDQXZESixFQXdESSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLE1BQVYsQ0F4REosRUF5REksQ0FBQyxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUQsRUFBVSxNQUFWLENBekRKLEVBMERJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsTUFBVixDQTFESixFQTJESSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLE1BQVYsQ0EzREosRUE0REksQ0FBQyxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUQsRUFBVSxNQUFWLENBNURKLEVBNkRJLENBQUMsQ0FBQyxFQUFELEVBQUksQ0FBSixDQUFELEVBQVMsTUFBVCxDQTdESixFQThESSxDQUFDLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBRCxFQUFVLE1BQVYsQ0E5REosRUErREksQ0FBQyxDQUFDLEVBQUQsRUFBSSxFQUFKLENBQUQsRUFBVSxNQUFWLENBL0RKLEVBZ0VJLENBQUMsQ0FBQyxFQUFELEVBQUksRUFBSixDQUFELEVBQVUsTUFBVixDQWhFSixDQWxDZ0IsRUFvR2hCLEVBQUM1WCxHQUFHLElBQUosRUFBVUMsR0FBRyxFQUFiLEVBcEdnQixFQXFHaEIsRUFBQ0QsR0FBRyxJQUFKLEVBQVVDLEdBQUcsRUFBYixFQXJHZ0IsQ0FBcEI7O2tCQXdHZTJYLFc7Ozs7Ozs7Ozs7Ozs7QUMxR2Y7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNemMsZUFBZSxpQkFBUztBQUMxQjlCLFFBRDBCLGtCQUNwQjtBQUNGLGFBQUt3ZSxLQUFMLEdBQWEsaUJBQU9oZSxPQUFQLENBQWVILE9BQWYsQ0FBdUIsQ0FBdkIsQ0FBYjs7QUFFQSxhQUFLc0csQ0FBTCxHQUFTLGlCQUFPbkcsT0FBUCxDQUFlQyxJQUFmLENBQW9Cd0ssV0FBcEIsQ0FBZ0N0RSxDQUF6QztBQUNBLGFBQUtDLENBQUwsR0FBUyxpQkFBT3BHLE9BQVAsQ0FBZUMsSUFBZixDQUFvQndLLFdBQXBCLENBQWdDckUsQ0FBekM7QUFDQSxhQUFLQyxRQUFMLEdBQWdCLGlCQUFPckcsT0FBUCxDQUFlQyxJQUFmLENBQW9Cd0ssV0FBcEIsQ0FBZ0N0RSxDQUFoRDtBQUNBLGFBQUtHLFFBQUwsR0FBZ0IsaUJBQU90RyxPQUFQLENBQWVDLElBQWYsQ0FBb0J3SyxXQUFwQixDQUFnQ3JFLENBQWhEOztBQUVBLGFBQUtHLENBQUwsR0FBUyxDQUFUOztBQUVBLGFBQUtDLFNBQUwsR0FBaUIsaUJBQU94RyxPQUFQLENBQWVpQyxJQUFoQztBQUNBLGFBQUt3RSxhQUFMLEdBQXFCLGlCQUFPekcsT0FBUCxDQUFlaUMsSUFBcEM7QUFDSCxLQWJ5QjtBQWMxQnpCLFVBZDBCLG9CQWNsQjtBQUNKLFlBQU1vRyxRQUFRLEtBQUtULENBQW5CO0FBQ0EsWUFBTVUsUUFBUSxLQUFLVCxDQUFuQjs7QUFFQSxZQUFHLGlCQUFPa0ksS0FBUCxDQUFhdUwsU0FBYixDQUF1QixpQkFBU04sSUFBVCxDQUFjYyxRQUFyQyxDQUFILEVBQW1ELEtBQUs1VCxhQUFMLEdBQXFCLGlCQUFPekcsT0FBUCxDQUFlOEIsRUFBcEMsQ0FBbkQsS0FDSyxJQUFHLGlCQUFPd00sS0FBUCxDQUFhdUwsU0FBYixDQUF1QixpQkFBU04sSUFBVCxDQUFjZ0IsVUFBckMsQ0FBSCxFQUFxRCxLQUFLOVQsYUFBTCxHQUFxQixpQkFBT3pHLE9BQVAsQ0FBZWdDLElBQXBDLENBQXJELEtBQ0EsSUFBRyxpQkFBT3NNLEtBQVAsQ0FBYXVMLFNBQWIsQ0FBdUIsaUJBQVNOLElBQVQsQ0FBY2EsVUFBckMsQ0FBSCxFQUFxRCxLQUFLM1QsYUFBTCxHQUFxQixpQkFBT3pHLE9BQVAsQ0FBZWlDLElBQXBDLENBQXJELEtBQ0EsSUFBRyxpQkFBT3FNLEtBQVAsQ0FBYXVMLFNBQWIsQ0FBdUIsaUJBQVNOLElBQVQsQ0FBY2UsV0FBckMsQ0FBSCxFQUFzRCxLQUFLN1QsYUFBTCxHQUFxQixpQkFBT3pHLE9BQVAsQ0FBZStCLEtBQXBDOztBQUUzRCxhQUFLa2MsY0FBTDs7QUFFQSxhQUFLQyxtQkFBTDtBQUNILEtBMUJ5QjtBQTJCMUJ4ZCxVQTNCMEIsa0JBMkJuQlIsRUEzQm1CLEVBMkJoQjtBQUNOQSxXQUFHWSxXQUFILENBQWUsS0FBS2tkLEtBQXBCLEVBQTJCLEtBQUszWCxRQUFMLEdBQWMsQ0FBekMsRUFBNEMsS0FBS0MsUUFBTCxHQUFjLENBQTFEO0FBQ0gsS0E3QnlCOztBQThCMUJwRixhQUFRO0FBQ0orYyxzQkFESSw0QkFDWTs7QUFFWixnQkFBRyxDQUFDLEtBQUt6WCxTQUFMLEdBQWlCLEtBQUtDLGFBQXZCLElBQXNDLENBQXRDLElBQTJDLENBQTlDLEVBQWlELEtBQUtELFNBQUwsR0FBaUIsS0FBS0MsYUFBdEI7O0FBRWpELGdCQUFJSyxXQUFXLEtBQUtQLENBQUwsR0FBUyxpQkFBTzlGLFNBQS9CO0FBQ0EsZ0JBQUdxRyxXQUFXLEdBQWQsRUFBbUJBLFdBQVcsR0FBWDs7QUFFbkIsZ0JBQUcsS0FBS04sU0FBTCxJQUFrQixpQkFBT3hHLE9BQVAsQ0FBZThCLEVBQXBDLEVBQXdDLEtBQUtzRSxDQUFMLElBQVVVLFFBQVYsQ0FBeEMsS0FDSyxJQUFHLEtBQUtOLFNBQUwsSUFBa0IsaUJBQU94RyxPQUFQLENBQWUrQixLQUFwQyxFQUEyQyxLQUFLb0UsQ0FBTCxJQUFVVyxRQUFWLENBQTNDLEtBQ0EsSUFBRyxLQUFLTixTQUFMLElBQWtCLGlCQUFPeEcsT0FBUCxDQUFlZ0MsSUFBcEMsRUFBMEMsS0FBS29FLENBQUwsSUFBVVUsUUFBVixDQUExQyxLQUNBLElBQUcsS0FBS04sU0FBTCxJQUFrQixpQkFBT3hHLE9BQVAsQ0FBZWlDLElBQXBDLEVBQTBDLEtBQUtrRSxDQUFMLElBQVVXLFFBQVY7O0FBRS9DLGlCQUFLQyxXQUFMOztBQUVBLGlCQUFLVixRQUFMLEdBQWdCckIsS0FBS2dDLEtBQUwsQ0FBVyxLQUFLYixDQUFMLEdBQVMsRUFBcEIsSUFBMEIsRUFBMUM7QUFDQSxpQkFBS0csUUFBTCxHQUFnQnRCLEtBQUtnQyxLQUFMLENBQVcsS0FBS1osQ0FBTCxHQUFTLEVBQXBCLElBQTBCLEVBQTFDOztBQUVBLGlCQUFLYSxlQUFMO0FBQ0gsU0FuQkc7QUFvQkpBLHVCQXBCSSw2QkFvQmE7QUFBQSwyQkFDQyxLQUFLeUIsT0FBTCxFQUREO0FBQUEsZ0JBQ043SCxDQURNLFlBQ05BLENBRE07QUFBQSxnQkFDSndHLENBREksWUFDSkEsQ0FESTs7QUFHYixnQkFBRyxpQkFBT3JILE9BQVAsQ0FBZUMsSUFBZixDQUFvQmtlLFdBQXBCLENBQWdDdGQsQ0FBaEMsRUFBa0N3RyxDQUFsQyxLQUF3QyxDQUEzQyxFQUE4QyxLQUFLbUMsS0FBTCxDQUFXLFlBQVg7O0FBRTlDLGdCQUFHLEtBQUtoRCxTQUFMLElBQWtCLEtBQUtDLGFBQTFCLEVBQXlDOztBQUV6QyxnQkFBRyxLQUFLQSxhQUFMLElBQXNCLGlCQUFPekcsT0FBUCxDQUFlOEIsRUFBckMsSUFBMkMsaUJBQU85QixPQUFQLENBQWVDLElBQWYsQ0FBb0IySSxNQUFwQixDQUEyQi9ILElBQUUsQ0FBN0IsRUFBZ0N3RyxDQUFoQyxJQUFxQyxDQUFoRixJQUFxRixLQUFLaEIsUUFBTCxHQUFnQixDQUFoQixJQUFxQixHQUE3RyxFQUFpSDtBQUM3RyxxQkFBS0YsQ0FBTCxHQUFTbkIsS0FBS3dELEtBQUwsQ0FBVyxLQUFLckMsQ0FBaEIsQ0FBVDtBQUNBLHFCQUFLSyxTQUFMLEdBQWlCLEtBQUtDLGFBQXRCO0FBQ0gsYUFIRCxNQUlLLElBQUcsS0FBS0EsYUFBTCxJQUFzQixpQkFBT3pHLE9BQVAsQ0FBZStCLEtBQXJDLElBQThDLGlCQUFPL0IsT0FBUCxDQUFlQyxJQUFmLENBQW9CMkksTUFBcEIsQ0FBMkIvSCxDQUEzQixFQUE4QndHLElBQUUsQ0FBaEMsSUFBcUMsQ0FBbkYsSUFBd0YsS0FBS2YsUUFBTCxHQUFnQixDQUFoQixJQUFxQixHQUFoSCxFQUFvSDtBQUNySCxxQkFBS0YsQ0FBTCxHQUFTcEIsS0FBS3dELEtBQUwsQ0FBVyxLQUFLcEMsQ0FBaEIsQ0FBVDtBQUNBLHFCQUFLSSxTQUFMLEdBQWlCLEtBQUtDLGFBQXRCO0FBQ0gsYUFISSxNQUlBLElBQUcsS0FBS0EsYUFBTCxJQUFzQixpQkFBT3pHLE9BQVAsQ0FBZWdDLElBQXJDLElBQTZDLGlCQUFPaEMsT0FBUCxDQUFlQyxJQUFmLENBQW9CMkksTUFBcEIsQ0FBMkIvSCxJQUFFLENBQTdCLEVBQWdDd0csQ0FBaEMsSUFBcUMsQ0FBbEYsSUFBdUYsS0FBS2hCLFFBQUwsR0FBZ0IsQ0FBaEIsSUFBcUIsR0FBL0csRUFBbUg7QUFDcEgscUJBQUtGLENBQUwsR0FBU25CLEtBQUt3RCxLQUFMLENBQVcsS0FBS3JDLENBQWhCLENBQVQ7QUFDQSxxQkFBS0ssU0FBTCxHQUFpQixLQUFLQyxhQUF0QjtBQUNILGFBSEksTUFJQSxJQUFHLEtBQUtBLGFBQUwsSUFBc0IsaUJBQU96RyxPQUFQLENBQWVpQyxJQUFyQyxJQUE2QyxpQkFBT2pDLE9BQVAsQ0FBZUMsSUFBZixDQUFvQjJJLE1BQXBCLENBQTJCL0gsQ0FBM0IsRUFBOEJ3RyxJQUFFLENBQWhDLElBQXFDLENBQWxGLElBQXVGLEtBQUtmLFFBQUwsR0FBZ0IsQ0FBaEIsSUFBcUIsR0FBL0csRUFBbUg7QUFDcEgscUJBQUtGLENBQUwsR0FBU3BCLEtBQUt3RCxLQUFMLENBQVcsS0FBS3BDLENBQWhCLENBQVQ7QUFDQSxxQkFBS0ksU0FBTCxHQUFpQixLQUFLQyxhQUF0QjtBQUNIO0FBRUosU0E1Q0c7QUE2Q0pNLG1CQTdDSSx5QkE2Q1M7QUFBQSw0QkFDSyxLQUFLMkIsT0FBTCxFQURMO0FBQUEsZ0JBQ0Y3SCxDQURFLGFBQ0ZBLENBREU7QUFBQSxnQkFDQXdHLENBREEsYUFDQUEsQ0FEQTs7QUFHVCxnQkFBRyxLQUFLYixTQUFMLElBQWtCLGlCQUFPeEcsT0FBUCxDQUFlOEIsRUFBakMsSUFBdUMsaUJBQU85QixPQUFQLENBQWVDLElBQWYsQ0FBb0IySSxNQUFwQixDQUEyQi9ILENBQTNCLEVBQThCd0csQ0FBOUIsS0FBb0MsZUFBS3dCLE1BQUwsQ0FBWUMsSUFBMUYsRUFBZ0csS0FBSzFDLENBQUwsR0FBU3BCLEtBQUsrRCxJQUFMLENBQVUsS0FBSzNDLENBQWYsQ0FBVCxDQUFoRyxLQUNLLElBQUcsS0FBS0ksU0FBTCxJQUFrQixpQkFBT3hHLE9BQVAsQ0FBZStCLEtBQWpDLElBQTBDLGlCQUFPL0IsT0FBUCxDQUFlQyxJQUFmLENBQW9CMkksTUFBcEIsQ0FBMkIvSCxDQUEzQixFQUE4QndHLElBQUUsQ0FBaEMsS0FBc0MsZUFBS3dCLE1BQUwsQ0FBWUMsSUFBL0YsRUFBcUcsS0FBSzNDLENBQUwsR0FBU25CLEtBQUt3RCxLQUFMLENBQVcsS0FBS3JDLENBQWhCLENBQVQsQ0FBckcsS0FDQSxJQUFHLEtBQUtLLFNBQUwsSUFBa0IsaUJBQU94RyxPQUFQLENBQWVnQyxJQUFqQyxJQUF5QyxpQkFBT2hDLE9BQVAsQ0FBZUMsSUFBZixDQUFvQjJJLE1BQXBCLENBQTJCL0gsSUFBRSxDQUE3QixFQUFnQ3dHLENBQWhDLEtBQXNDLGVBQUt3QixNQUFMLENBQVlDLElBQTlGLEVBQW9HLEtBQUsxQyxDQUFMLEdBQVNwQixLQUFLd0QsS0FBTCxDQUFXLEtBQUtwQyxDQUFoQixDQUFULENBQXBHLEtBQ0EsSUFBRyxLQUFLSSxTQUFMLElBQWtCLGlCQUFPeEcsT0FBUCxDQUFlaUMsSUFBakMsSUFBeUMsaUJBQU9qQyxPQUFQLENBQWVDLElBQWYsQ0FBb0IySSxNQUFwQixDQUEyQi9ILENBQTNCLEVBQThCd0csQ0FBOUIsS0FBb0MsZUFBS3dCLE1BQUwsQ0FBWUMsSUFBNUYsRUFBa0csS0FBSzNDLENBQUwsR0FBU25CLEtBQUsrRCxJQUFMLENBQVUsS0FBSzVDLENBQWYsQ0FBVDs7QUFFdkcsZ0JBQUcsS0FBS0EsQ0FBTCxHQUFTLENBQUMsQ0FBYixFQUFnQixLQUFLQSxDQUFMLEdBQVMsRUFBVDtBQUNoQixnQkFBRyxLQUFLQSxDQUFMLEdBQVMsRUFBWixFQUFnQixLQUFLQSxDQUFMLEdBQVMsQ0FBQyxDQUFWO0FBQ25CLFNBdkRHO0FBd0RKdUMsZUF4REkscUJBd0RLO0FBQ0wsbUJBQU8sRUFBQzdILEdBQUVtRSxLQUFLd0QsS0FBTCxDQUFXLEtBQUtwQyxDQUFMLEdBQVMsQ0FBcEIsQ0FBSCxFQUEyQmlCLEdBQUdyQyxLQUFLd0QsS0FBTCxDQUFXLEtBQUtyQyxDQUFoQixDQUE5QixFQUFQO0FBQ0gsU0ExREc7QUEyREppWSxnQkEzREksb0JBMkRLQyxNQTNETCxFQTJEWTtBQUNaLGdCQUNLLEtBQUtsWSxDQUFMLEdBQVMsQ0FBVCxJQUFja1ksT0FBT2xZLENBQXJCLElBQTBCa1ksT0FBT2xZLENBQVAsR0FBVSxDQUFWLElBQWUsS0FBS0EsQ0FBL0MsSUFDQyxLQUFLQyxDQUFMLEdBQVMsQ0FBVCxJQUFjaVksT0FBT2pZLENBQXJCLElBQTBCaVksT0FBT2pZLENBQVAsR0FBVSxDQUFWLElBQWUsS0FBS0EsQ0FGbkQsRUFHRSxPQUFPLElBQVA7QUFDRixtQkFBTyxLQUFQO0FBQ0gsU0FqRUc7QUFrRUo4WCwyQkFsRUksaUNBa0VpQjtBQUNqQixnQkFBRyxLQUFLRSxRQUFMLHNCQUFILEVBQThCLHFCQUFXL1UsaUJBQVg7QUFDOUIsZ0JBQUcsS0FBSytVLFFBQUwsdUJBQUgsRUFBK0Isc0JBQVkvVSxpQkFBWjtBQUMvQixnQkFBRyxLQUFLK1UsUUFBTCx1QkFBSCxFQUErQixzQkFBWS9VLGlCQUFaO0FBQy9CLGdCQUFHLEtBQUsrVSxRQUFMLHlCQUFILEVBQWlDLHdCQUFjL1UsaUJBQWQ7QUFDcEMsU0F2RUc7QUF3RUpqSSxpQkF4RUksdUJBd0VPO0FBQ1AsaUJBQUsrRSxDQUFMLEdBQVMsaUJBQU9uRyxPQUFQLENBQWVDLElBQWYsQ0FBb0J3SyxXQUFwQixDQUFnQ3RFLENBQXpDO0FBQ0EsaUJBQUtDLENBQUwsR0FBUyxpQkFBT3BHLE9BQVAsQ0FBZUMsSUFBZixDQUFvQndLLFdBQXBCLENBQWdDckUsQ0FBekM7QUFDQSxpQkFBS0MsUUFBTCxHQUFnQixpQkFBT3JHLE9BQVAsQ0FBZUMsSUFBZixDQUFvQndLLFdBQXBCLENBQWdDdEUsQ0FBaEQ7QUFDQSxpQkFBS0csUUFBTCxHQUFnQixpQkFBT3RHLE9BQVAsQ0FBZUMsSUFBZixDQUFvQndLLFdBQXBCLENBQWdDckUsQ0FBaEQ7O0FBRUEsaUJBQUtJLFNBQUwsR0FBaUIsaUJBQU94RyxPQUFQLENBQWVpQyxJQUFoQztBQUNBLGlCQUFLd0UsYUFBTCxHQUFxQixpQkFBT3pHLE9BQVAsQ0FBZWlDLElBQXBDO0FBQ0g7QUFoRkc7QUE5QmtCLENBQVQsQ0FBckI7O2tCQWtIZVgsWSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxNyk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMmQzNTJkZjU1YjUzYTUyZTk0MmYiLCJpbXBvcnQgeyBHYW1lLCBHZWFyLCBMb2FkZXIsIFNwcml0ZUJhdGNoLCBLZXlib2FyZCB9IGZyb20gJy4uL3JlbmRlcidcclxuaW1wb3J0IENsYXNzaWNNYXplIGZyb20gJy4vbWF6ZS9DbGFzc2ljTWF6ZSdcclxuaW1wb3J0IFBhY21hbkVudGl0eSBmcm9tICcuL2VudGl0aWVzL1BhY21hbkVudGl0eSdcclxuaW1wb3J0IFJlZFBoYW50b20gZnJvbSAnLi9lbnRpdGllcy9SZWRQaGFudG9tJ1xyXG5pbXBvcnQgUGlua1BoYW50b20gZnJvbSAnLi9lbnRpdGllcy9QaW5rUGhhbnRvbSdcclxuaW1wb3J0IEJsdWVQaGFudG9tIGZyb20gJy4vZW50aXRpZXMvQmx1ZVBoYW50b20nXHJcbmltcG9ydCBPcmFuZ2VQaGFudG9tIGZyb20gJy4vZW50aXRpZXMvT3JhbmdlUGhhbnRvbSdcclxuXHJcbmNvbnN0IG1haW5HZWFyID0gbmV3IEdlYXIoe1xyXG4gICAgbG9hZCgpe1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHRpbGVzOiBMb2FkZXIubG9hZFRleHR1cmVGcm9tVXJsKGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2Fzc2V0cy90aWxlc2V0LnBuZ2ApXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGluaXQoKXtcclxuICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5wYXVzZWRUaW1lID0gMFxyXG4gICAgICAgIHRoaXMuYWN1bXVsYXRlVGltZSA9IDBcclxuXHJcbiAgICAgICAgdGhpcy5saXZlcyA9IDNcclxuXHJcbiAgICAgICAgdGhpcy50aWxlc2V0ID0gdGhpcy50aWxlcy5zcGxpdCgxLCA4KVswXVxyXG4gICAgICAgIFBhY21hbi5HTE9CQUxTLnRpbGVzZXQgPSB0aGlzLnRpbGVzZXRcclxuICAgICAgICBQYWNtYW4uR0xPQkFMUy5tYXplID0gQ2xhc3NpY01hemVcclxuICAgICAgICB0aGlzLnNiID0gbmV3IFNwcml0ZUJhdGNoKFBhY21hbi5jb250ZXh0KVxyXG4gICAgICAgIHRoaXMuZ2VhclN0YWNrLmluaXQoKVxyXG5cclxuICAgICAgICB0aGlzLnBhdXNlR2FtZSg1KVxyXG5cclxuICAgICAgICB0aGlzLiRzdWJzY3JpYmUoJ3BhY21hbkRlYWQnLCAoKSA9PiB0aGlzLm9uUGFjbWFuRGVhZCgpKVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMucGF1c2VkKXtcclxuICAgICAgICAgICAgdGhpcy5hY3VtdWxhdGVUaW1lICs9IFBhY21hbi5kZWx0YVRpbWVcclxuICAgICAgICAgICAgaWYodGhpcy5hY3VtdWxhdGVUaW1lID49IHRoaXMucGF1c2VkVGltZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdW11bGF0ZVRpbWUgPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ2VhclN0YWNrLnVwZGF0ZSgpXHJcbiAgICB9LFxyXG4gICAgcmVuZGVyKCl7XHJcbiAgICAgICAgUGFjbWFuLmNvbnRleHQuZmlsbFJlY3QoMCwwLDIyNCwyODgpXHJcbiAgICAgICAgdGhpcy5zYi5iZWdpbigpXHJcbiAgICAgICAgQ2xhc3NpY01hemUucmVuZGVyKHRoaXMuc2IpXHJcbiAgICAgICAgdGhpcy5nZWFyU3RhY2sucmVuZGVyKHRoaXMuc2IpXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxpdmVzOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5zYi5kcmF3VGV4dHVyZSh0aGlzLnRpbGVzZXRbMV0sIDE2ICsgKGkgKiAxNiksIDI3NilcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zYi5kcmF3VGV4dChcIkhJR0ggU0NPUkVcIiwgXCJ3aGl0ZVwiLCBcIjhweCBWZXJkYW5hXCIsIFwiY2VudGVyXCIsIDEwOCwgOClcclxuICAgICAgICB0aGlzLnNiLmRyYXdUZXh0KFBhY21hbi5HTE9CQUxTLlBPSU5UUywgXCJ3aGl0ZVwiLCBcIjhweCBWZXJkYW5hXCIsIFwiY2VudGVyXCIsIDEwOCwgMTYpXHJcbiAgICAgICAgdGhpcy5zYi5lbmQoKTtcclxuICAgIH0sXHJcbiAgICBtZXRob2RzOiB7XHJcbiAgICAgICAgcGF1c2VHYW1lKHRpbWUpe1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9IHRydWVcclxuICAgICAgICAgICAgdGhpcy5wYXVzZWRUaW1lID0gdGltZVxyXG4gICAgICAgICAgICB0aGlzLmFjdW11bGF0ZVRpbWUgPSAwXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblBhY21hbkRlYWQoKXtcclxuICAgICAgICAgICAgUGFjbWFuRW50aXR5LnNvZnRSZXNldCgpXHJcbiAgICAgICAgICAgIFJlZFBoYW50b20uc29mdFJlc2V0KClcclxuICAgICAgICAgICAgUGlua1BoYW50b20uc29mdFJlc2V0KClcclxuICAgICAgICAgICAgQmx1ZVBoYW50b20uc29mdFJlc2V0KClcclxuICAgICAgICAgICAgT3JhbmdlUGhhbnRvbS5zb2Z0UmVzZXQoKVxyXG4gICAgICAgICAgICB0aGlzLmxpdmVzLS1cclxuICAgICAgICAgICAgdGhpcy5wYXVzZUdhbWUoNSlcclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIGdlYXJzOiB7XHJcbiAgICAgICAgUGFjbWFuRW50aXR5LFxyXG4gICAgICAgIFJlZFBoYW50b20sXHJcbiAgICAgICAgUGlua1BoYW50b20sXHJcbiAgICAgICAgQmx1ZVBoYW50b20sXHJcbiAgICAgICAgT3JhbmdlUGhhbnRvbSxcclxuICAgIH1cclxufSlcclxuXHJcbmNvbnN0IFBhY21hbiA9IG5ldyBHYW1lKHtjb250YWluZXJfaWQ6XCJwYWNtYW5cIiwgd2lkdGg6IDIyNCwgaGVpZ2h0OiAyODh9LCBtYWluR2VhcilcclxuUGFjbWFuLkdMT0JBTFMgPSB7XHJcbiAgICBVUDogMCxcclxuICAgIFJJR0hUOiAxLFxyXG4gICAgRE9XTjogMixcclxuICAgIExFRlQ6IDMsXHJcbiAgICBQYWNtYW5FbnRpdHksXHJcbiAgICBQT0lOVFM6IDAsXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBhY21hblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9QYWNtYW4uanMiLCJleHBvcnQgeyBHYW1lLCBHZWFyIH0gZnJvbSAnLi9jb3JlJ1xyXG5leHBvcnQgeyBUZXh0dXJlUmVnaW9uLCBTcHJpdGVCYXRjaCwgQW5pbWF0aW9uLCBDYW1lcmEgfSBmcm9tICcuL2dyYXBoaWNzJ1xyXG5leHBvcnQgeyBNMywgUG9seWdvbiwgUmVjdGFuZ2xlLCBWZWN0b3IyRCB9IGZyb20gJy4vbWF0aHMnXHJcbmV4cG9ydCB7IExvYWRlciB9IGZyb20gJy4vYXNzZXRMb2FkZXInXHJcbmV4cG9ydCB7IEtleWJvYXJkSW5wdXRNYW5hZ2VyIGFzIEtleWJvYXJkLCBNb3VzZUlucHV0TWFuYWdlciBhcyBNb3VzZSB9IGZyb20gJy4vaW5wdXQnXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9pbmRleC5qcyIsImNvbnN0IEFzc2V0Q2FjaGUgPSBuZXcgTWFwKClcclxuXHJcbmV4cG9ydCB7IEFzc2V0Q2FjaGUgfVxyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEV2ZW50RW1pdGVyIH0gZnJvbSAnLi9FdmVudEVtaXRlcidcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL3V0aWxzL2luZGV4LmpzIiwiY29uc3QgTTMgPSB7XHJcblx0aWRlbnRpdHkoKSB7XHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHQxLCAwLCAwLFxyXG5cdFx0XHQwLCAxLCAwLFxyXG5cdFx0XHQwLCAwLCAxXHJcblx0XHRdXHJcblx0fSxcclxuXHRtdWx0aXBseShhLCBiKSB7XHJcblx0XHRjb25zdCBhMDAgPSBhWzAgKiAzICsgMF1cclxuXHRcdGNvbnN0IGEwMSA9IGFbMCAqIDMgKyAxXVxyXG5cdFx0Y29uc3QgYTAyID0gYVswICogMyArIDJdXHJcblx0XHRjb25zdCBhMTAgPSBhWzEgKiAzICsgMF1cclxuXHRcdGNvbnN0IGExMSA9IGFbMSAqIDMgKyAxXVxyXG5cdFx0Y29uc3QgYTEyID0gYVsxICogMyArIDJdXHJcblx0XHRjb25zdCBhMjAgPSBhWzIgKiAzICsgMF1cclxuXHRcdGNvbnN0IGEyMSA9IGFbMiAqIDMgKyAxXVxyXG5cdFx0Y29uc3QgYTIyID0gYVsyICogMyArIDJdXHJcblx0XHRjb25zdCBiMDAgPSBiWzAgKiAzICsgMF1cclxuXHRcdGNvbnN0IGIwMSA9IGJbMCAqIDMgKyAxXVxyXG5cdFx0Y29uc3QgYjAyID0gYlswICogMyArIDJdXHJcblx0XHRjb25zdCBiMTAgPSBiWzEgKiAzICsgMF1cclxuXHRcdGNvbnN0IGIxMSA9IGJbMSAqIDMgKyAxXVxyXG5cdFx0Y29uc3QgYjEyID0gYlsxICogMyArIDJdXHJcblx0XHRjb25zdCBiMjAgPSBiWzIgKiAzICsgMF1cclxuXHRcdGNvbnN0IGIyMSA9IGJbMiAqIDMgKyAxXVxyXG5cdFx0Y29uc3QgYjIyID0gYlsyICogMyArIDJdXHJcblx0XHRyZXR1cm4gW1xyXG5cdFx0XHRiMDAgKiBhMDAgKyBiMDEgKiBhMTAgKyBiMDIgKiBhMjAsXHJcblx0XHRcdGIwMCAqIGEwMSArIGIwMSAqIGExMSArIGIwMiAqIGEyMSxcclxuXHRcdFx0YjAwICogYTAyICsgYjAxICogYTEyICsgYjAyICogYTIyLFxyXG5cdFx0XHRiMTAgKiBhMDAgKyBiMTEgKiBhMTAgKyBiMTIgKiBhMjAsXHJcblx0XHRcdGIxMCAqIGEwMSArIGIxMSAqIGExMSArIGIxMiAqIGEyMSxcclxuXHRcdFx0YjEwICogYTAyICsgYjExICogYTEyICsgYjEyICogYTIyLFxyXG5cdFx0XHRiMjAgKiBhMDAgKyBiMjEgKiBhMTAgKyBiMjIgKiBhMjAsXHJcblx0XHRcdGIyMCAqIGEwMSArIGIyMSAqIGExMSArIGIyMiAqIGEyMSxcclxuXHRcdFx0YjIwICogYTAyICsgYjIxICogYTEyICsgYjIyICogYTIyLFxyXG5cdFx0XVxyXG5cdH0sXHJcblx0dHJhbnNsYXRlKG0sIHR4LCB0eSkge1xyXG5cdFx0Y29uc3QgdHJhbnNsYXRpb24gPSBbXHJcblx0XHRcdDEsIDAsIDAsXHJcblx0XHRcdDAsIDEsIDAsXHJcblx0XHRcdHR4LCB0eSwgMVxyXG5cdFx0XVxyXG5cdFx0cmV0dXJuIHRoaXMubXVsdGlwbHkobSwgdHJhbnNsYXRpb24pXHJcblx0fSxcclxuXHRyb3RhdGUobSwgYW5nbGUpIHtcclxuXHRcdGNvbnN0IHJvdGF0aW9uID0gW1xyXG5cdFx0XHRNYXRoLmNvcyhhbmdsZSksIE1hdGguc2luKGFuZ2xlKSwgMCxcclxuXHRcdFx0LU1hdGguc2luKGFuZ2xlKSwgTWF0aC5jb3MoYW5nbGUpLCAwLFxyXG5cdFx0XHQwLCAwLCAxXHJcblx0XHRdXHJcblx0XHRyZXR1cm4gdGhpcy5tdWx0aXBseShtLCByb3RhdGlvbilcclxuXHR9LFxyXG5cdHNjYWxlKG0sIHN4LCBzeSkge1xyXG5cdFx0Y29uc3Qgc2NhbGF0aW9uID0gW1xyXG5cdFx0XHRzeCwgMCwgMCxcclxuXHRcdFx0MCwgc3ksIDAsXHJcblx0XHRcdDAsIDAsIDFcclxuXHRcdF1cclxuXHRcdHJldHVybiB0aGlzLm11bHRpcGx5KG0sIHNjYWxhdGlvbilcclxuXHR9LFxyXG5cdHRvQ2FudmFzMmRNYXRyaXgobSkge1xyXG5cdFx0cmV0dXJuIFttWzBdLCBtWzFdLCBtWzNdLCBtWzRdLCBtWzZdLCBtWzddXVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTTNcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL21hdGhzL01hdDMuanMiLCJpbXBvcnQgeyBHZWFyLCBWZWN0b3IyRCwgU3ByaXRlQmF0Y2ggfSBmcm9tICcuLi8uLi9yZW5kZXInXHJcbmltcG9ydCBQYWNtYW4gZnJvbSAnLi4vUGFjbWFuJ1xyXG5pbXBvcnQgTWF6ZSBmcm9tICcuLi9tYXplL01hemUnXHJcblxyXG5jb25zdCBQaGFudG9tID0gKHNwcml0ZSwgcGF0cm9sUG9pbnQsIHNwYXduUG9pbnQsIG9uSHVudE1vZGUsIG9uSW5KYWlsKSA9PiBuZXcgR2Vhcih7XHJcbiAgICBpbml0KCl7XHJcbiAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMucGF1c2VkVGltZSA9IDBcclxuXHJcbiAgICAgICAgdGhpcy5tb2RlID0gJ1BhdHJvbCdcclxuICAgICAgICB0aGlzLnByZXZNb2RlID0gJ1BhdHJvbCdcclxuXHJcbiAgICAgICAgdGhpcy5zcHJpdGUgPSBzcHJpdGVcclxuXHJcbiAgICAgICAgdGhpcy50aW1lUmVmZXJuY2UgPSAwXHJcbiAgICAgICAgdGhpcy5hY3VtdWxhdGVUaW1lID0gMFxyXG5cclxuICAgICAgICB0aGlzLnNwYXduUG9pbnQgPSBzcGF3blBvaW50XHJcbiAgICAgICAgY29uc3Qgc3Bhd24gPSB0aGlzLnNwYXduUG9pbnQoKVxyXG4gICAgICAgIHRoaXMuaW5KYWlsID0gdHJ1ZVxyXG4gICAgICAgIHRoaXMub25JbkphaWwgPSBvbkluSmFpbFxyXG5cclxuICAgICAgICB0aGlzLnggPSBzcGF3bi54XHJcbiAgICAgICAgdGhpcy55ID0gc3Bhd24ueVxyXG4gICAgICAgIHRoaXMueFJvdW5kZWQgPSBzcGF3bi54XHJcbiAgICAgICAgdGhpcy55Um91bmRlZCA9IHNwYXduLnlcclxuXHJcbiAgICAgICAgdGhpcy5wYXRyb2xQb2ludCA9IHBhdHJvbFBvaW50XHJcblxyXG4gICAgICAgIHRoaXMudiA9IDMuNVxyXG5cclxuICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IFBhY21hbi5HTE9CQUxTLkxFRlRcclxuICAgICAgICB0aGlzLm5leHREaXJlY3Rpb24gPSBQYWNtYW4uR0xPQkFMUy5MRUZUXHJcbiAgICAgICAgdGhpcy5uZXh0RGlyZWN0aW9uQ2FsY3VsYXRlZCA9IGZhbHNlXHJcblxyXG4gICAgICAgIHRoaXMub25IdW50TW9kZUNiID0gb25IdW50TW9kZVxyXG4gICAgfSxcclxuICAgIHVwZGF0ZSgpe1xyXG4gICAgICAgIGlmKHRoaXMucGF1c2VkKXtcclxuICAgICAgICAgICAgdGhpcy5hY3VtdWxhdGVUaW1lICs9IFBhY21hbi5kZWx0YVRpbWVcclxuICAgICAgICAgICAgaWYodGhpcy5hY3VtdWxhdGVUaW1lID49IHRoaXMucGF1c2VkVGltZSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdW11bGF0ZVRpbWUgPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0aGlzLmluSmFpbCl7XHJcbiAgICAgICAgICAgIHRoaXMub25JbkphaWwodGhpcylcclxuICAgICAgICAgICAgaWYoIXRoaXMuaW5KYWlsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuJHN1YnNjcmliZSgnZW50ZXJQYW5pYycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZNb2RlID0gdGhpcy5tb2RlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gJ1BhbmljJ1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN1bXVsYXRlVGltZSA9IDBcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSByZXR1cm5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHByZXZYID0gdGhpcy54XHJcbiAgICAgICAgY29uc3QgcHJldlkgPSB0aGlzLnlcclxuXHJcbiAgICAgICAgbGV0IG1vdmVtZW50ID0gdGhpcy52ICogUGFjbWFuLmRlbHRhVGltZVxyXG4gICAgICAgIGlmKG1vdmVtZW50ID4gMC4xKSBtb3ZlbWVudCA9IDAuMVxyXG5cclxuICAgICAgICBpZih0aGlzLmRpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5VUCkgdGhpcy55IC09IG1vdmVtZW50XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmRpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5SSUdIVCkgdGhpcy54ICs9IG1vdmVtZW50XHJcbiAgICAgICAgZWxzZSBpZih0aGlzLmRpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5ET1dOKSB0aGlzLnkgKz0gbW92ZW1lbnRcclxuICAgICAgICBlbHNlIGlmKHRoaXMuZGlyZWN0aW9uID09IFBhY21hbi5HTE9CQUxTLkxFRlQpIHRoaXMueCAtPSBtb3ZlbWVudFxyXG5cclxuICAgICAgICB0aGlzLmZpeFBvc2l0aW9uKClcclxuXHJcbiAgICAgICAgdGhpcy54Um91bmRlZCA9IE1hdGgucm91bmQodGhpcy54ICogMTApIC8gMTBcclxuICAgICAgICB0aGlzLnlSb3VuZGVkID0gTWF0aC5yb3VuZCh0aGlzLnkgKiAxMCkgLyAxMFxyXG5cclxuICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpXHJcblxyXG4gICAgICAgIHRoaXMuc2V0TW9kZSgpXHJcbiAgICB9LFxyXG4gICAgcmVuZGVyKHNiKXtcclxuICAgICAgICBzYi5kcmF3VGV4dHVyZShQYWNtYW4uR0xPQkFMUy50aWxlc2V0W3RoaXMuc3ByaXRlXSwgdGhpcy54Um91bmRlZCo4LCB0aGlzLnlSb3VuZGVkKjgpXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczp7XHJcbiAgICAgICAgY2FsY3VsYXRlRGlyZWN0aW9uKHRhcmdldFBvaW50LCB7aSxqfSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbERpcmVjdGlvbnMgPSBQYWNtYW4uR0xPQkFMUy5tYXplLmludGVyc2VjdGlvbnMuZ2V0KEpTT04uc3RyaW5naWZ5KFtpLGpdKSlcclxuICAgICAgICAgICAgY29uc3QgaW5kZXggPSBhbGxEaXJlY3Rpb25zLmluZGV4T2YoKHRoaXMuZGlyZWN0aW9uICsgMiklNClcclxuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9ucyA9IChpbmRleCAhPSAtMSkgPyBhbGxEaXJlY3Rpb25zLmZpbHRlcihlID0+IGUgIT0gYWxsRGlyZWN0aW9uc1tpbmRleF0pIDogYWxsRGlyZWN0aW9uc1xyXG5cclxuICAgICAgICAgICAgaWYoZGlyZWN0aW9ucy5sZW5naHQgPT0gMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHREaXJlY3Rpb24gPSBkaXJlY3Rpb25zWzBdXHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHREaXJlY3Rpb25DYWxjdWxhdGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWluID0gTnVtYmVyLk1BWF9WQUxVRVxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldERpcmVjdGlvbiA9IDBcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG4gPSAwOyBuIDwgZGlyZWN0aW9ucy5sZW5ndGg7IG4rKykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGRpcmVjdGlvbnNbbl1cclxuICAgICAgICAgICAgICAgICAgICBpZihkaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuVVApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2UgPSAobmV3IFZlY3RvcjJEKE1hdGguZmxvb3IodGhpcy54KSwgTWF0aC5mbG9vcih0aGlzLnkpIC0gMSwgdGFyZ2V0UG9pbnQueCwgdGFyZ2V0UG9pbnQueSkpLm1hZ25pdHVkZSgpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGRpc3RhbmNlIDwgbWluKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbiA9IGRpc3RhbmNlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXREaXJlY3Rpb24gPSBkaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKGRpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5SSUdIVCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKG5ldyBWZWN0b3IyRChNYXRoLmZsb29yKHRoaXMueCkgKyAxLCBNYXRoLmZsb29yKHRoaXMueSksIHRhcmdldFBvaW50LngsIHRhcmdldFBvaW50LnkpKS5tYWduaXR1ZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaXN0YW5jZSA8IG1pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW4gPSBkaXN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGlyZWN0aW9uID0gZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihkaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuRE9XTil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKG5ldyBWZWN0b3IyRChNYXRoLmZsb29yKHRoaXMueCksIE1hdGguZmxvb3IodGhpcy55KSArIDEsIHRhcmdldFBvaW50LngsIHRhcmdldFBvaW50LnkpKS5tYWduaXR1ZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaXN0YW5jZSA8IG1pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW4gPSBkaXN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGlyZWN0aW9uID0gZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihkaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuTEVGVCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKG5ldyBWZWN0b3IyRChNYXRoLmZsb29yKHRoaXMueCkgLSAxLCBNYXRoLmZsb29yKHRoaXMueSksIHRhcmdldFBvaW50LngsIHRhcmdldFBvaW50LnkpKS5tYWduaXR1ZGUoKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkaXN0YW5jZSA8IG1pbil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW4gPSBkaXN0YW5jZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0RGlyZWN0aW9uID0gZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHREaXJlY3Rpb24gPSB0YXJnZXREaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dERpcmVjdGlvbkNhbGN1bGF0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNoYW5nZURpcmVjdGlvbigpe1xyXG4gICAgICAgICAgICBjb25zdCB7aSxqfSA9IHRoaXMuZ2V0VGlsZSgpXHJcblxyXG4gICAgICAgICAgICBpZighUGFjbWFuLkdMT0JBTFMubWF6ZS5pbnRlcnNlY3Rpb25zLmhhcyhKU09OLnN0cmluZ2lmeShbaSxqXSkpKXtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV4dERpcmVjdGlvbkNhbGN1bGF0ZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCF0aGlzLm5leHREaXJlY3Rpb25DYWxjdWxhdGVkKXtcclxuICAgICAgICAgICAgICAgIHRoaXNbYG9uJHt0aGlzLm1vZGV9TW9kZWBdKHtpLGp9KVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZih0aGlzLm5leHREaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuVVAgJiYgUGFjbWFuLkdMT0JBTFMubWF6ZS5sYXlvdXRbaS0xXVtqXSA+IDAgJiYgdGhpcy54Um91bmRlZCAlIDEgPD0gMC4xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IE1hdGguZmxvb3IodGhpcy54KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLm5leHREaXJlY3Rpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMubmV4dERpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5SSUdIVCAmJiBQYWNtYW4uR0xPQkFMUy5tYXplLmxheW91dFtpXVtqKzFdID4gMCAmJiB0aGlzLnlSb3VuZGVkICUgMSA8PSAwLjEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy55ID0gTWF0aC5mbG9vcih0aGlzLnkpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMubmV4dERpcmVjdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5uZXh0RGlyZWN0aW9uID09IFBhY21hbi5HTE9CQUxTLkRPV04gJiYgUGFjbWFuLkdMT0JBTFMubWF6ZS5sYXlvdXRbaSsxXVtqXSA+IDAgJiYgdGhpcy54Um91bmRlZCAlIDEgPD0gMC4xKXtcclxuICAgICAgICAgICAgICAgIHRoaXMueCA9IE1hdGguZmxvb3IodGhpcy54KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLm5leHREaXJlY3Rpb25cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIGlmKHRoaXMubmV4dERpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5MRUZUICYmIFBhY21hbi5HTE9CQUxTLm1hemUubGF5b3V0W2ldW2otMV0gPiAwICYmIHRoaXMueVJvdW5kZWQgJSAxIDw9IDAuMSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSBNYXRoLmZsb29yKHRoaXMueSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5uZXh0RGlyZWN0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpeFBvc2l0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHtpLGp9ID0gdGhpcy5nZXRUaWxlKClcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uID09IFBhY21hbi5HTE9CQUxTLlVQICYmIFBhY21hbi5HTE9CQUxTLm1hemUubGF5b3V0W2ldW2pdID09IE1hemUuQkxPQ0tTLldBTEwpIHRoaXMueSA9IE1hdGguY2VpbCh0aGlzLnkpXHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuUklHSFQgJiYgUGFjbWFuLkdMT0JBTFMubWF6ZS5sYXlvdXRbaV1baisxXSA9PSBNYXplLkJMT0NLUy5XQUxMKSB0aGlzLnggPSBNYXRoLmZsb29yKHRoaXMueClcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmRpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5ET1dOICYmIFBhY21hbi5HTE9CQUxTLm1hemUubGF5b3V0W2krMV1bal0gPT0gTWF6ZS5CTE9DS1MuV0FMTCkgdGhpcy55ID0gTWF0aC5mbG9vcih0aGlzLnkpXHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuTEVGVCAmJiBQYWNtYW4uR0xPQkFMUy5tYXplLmxheW91dFtpXVtqXSA9PSBNYXplLkJMT0NLUy5XQUxMKSB0aGlzLnggPSBNYXRoLmNlaWwodGhpcy54KVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy54IDwgLTEpIHRoaXMueCA9IDI4XHJcbiAgICAgICAgICAgIGlmKHRoaXMueCA+IDI4KSB0aGlzLnggPSAtMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VGlsZSgpe1xyXG4gICAgICAgICAgICByZXR1cm4ge2k6TWF0aC5mbG9vcih0aGlzLnkgLSAzKSwgajogTWF0aC5mbG9vcih0aGlzLngpfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25QYXRyb2xNb2RlKHtpLGp9KXtcclxuICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVEaXJlY3Rpb24odGhpcy5wYXRyb2xQb2ludCwge2ksan0pXHJcbiAgICAgICAgfSxcclxuICAgICAgICBvblBhbmljTW9kZSh7aSxqfSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbERpcmVjdGlvbnMgPSBQYWNtYW4uR0xPQkFMUy5tYXplLmludGVyc2VjdGlvbnMuZ2V0KEpTT04uc3RyaW5naWZ5KFtpLGpdKSlcclxuICAgICAgICAgICAgdGhpcy5uZXh0RGlyZWN0aW9uID0gYWxsRGlyZWN0aW9uc1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqYWxsRGlyZWN0aW9ucy5sZW5ndGgpXVxyXG4gICAgICAgICAgICB0aGlzLm5leHREaXJlY3Rpb25DYWxjdWxhdGVkID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25IdW50TW9kZSh7aSxqfSl7XHJcbiAgICAgICAgICAgIHRoaXMub25IdW50TW9kZUNiKHRoaXMsIHtpLGp9KVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc2V0TW9kZSgpe1xyXG4gICAgICAgICAgICBpZih0aGlzLm1vZGUgPT0gJ1BhbmljJyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFjdW11bGF0ZVRpbWUgKz0gUGFjbWFuLmRlbHRhVGltZVxyXG4gICAgICAgICAgICAgICAgdGhpcy52ID0gMS41XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmFjdW11bGF0ZVRpbWUgPj0gUGhhbnRvbS5QQU5JQ19USU1FKXtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFjdW11bGF0ZVRpbWUgPSAwXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gdGhpcy5wcmV2TW9kZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudiA9IDMuNVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHRoaXMubW9kZSA9PSAnSHVudCcgJiYgUGhhbnRvbS5USU1FU1t0aGlzLnRpbWVSZWZlcm5jZV0gPCAwKSByZXR1cm5cclxuICAgICAgICAgICAgdGhpcy5hY3VtdWxhdGVUaW1lICs9IFBhY21hbi5kZWx0YVRpbWVcclxuICAgICAgICAgICAgaWYodGhpcy5hY3VtdWxhdGVUaW1lID49IFBoYW50b20uVElNRVNbdGhpcy50aW1lUmVmZXJuY2VdKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWN1bXVsYXRlVGltZSA9IDBcclxuICAgICAgICAgICAgICAgIHRoaXMudGltZVJlZmVybmNlKytcclxuICAgICAgICAgICAgICAgIHRoaXMubW9kZSA9ICh0aGlzLm1vZGUgPT0gJ1BhdHJvbCcpID8gJ0h1bnQnIDogJ1BhdHJvbCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc29mdFJlc2V0KCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwYXduID0gdGhpcy5zcGF3blBvaW50KClcclxuICAgICAgICAgICAgdGhpcy54ID0gc3Bhd24ueFxyXG4gICAgICAgICAgICB0aGlzLnkgPSBzcGF3bi55XHJcbiAgICAgICAgICAgIHRoaXMueFJvdW5kZWQgPSBzcGF3bi54XHJcbiAgICAgICAgICAgIHRoaXMueVJvdW5kZWQgPSBzcGF3bi55XHJcbiAgICAgICAgICAgIHRoaXMudiA9IDMuNVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBQYWNtYW4uR0xPQkFMUy5MRUZUXHJcbiAgICAgICAgICAgIHRoaXMubmV4dERpcmVjdGlvbiA9IFBhY21hbi5HTE9CQUxTLkxFRlRcclxuICAgICAgICAgICAgdGhpcy5uZXh0RGlyZWN0aW9uQ2FsY3VsYXRlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHRoaXMuaW5KYWlsID0gdHJ1ZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgb25QYWNtYW5Db2xsaXNpb24oKXtcclxuICAgICAgICAgICAgaWYodGhpcy5tb2RlID09ICdQYW5pYycpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hY3VtdWxhdGVUaW1lID0gMFxyXG4gICAgICAgICAgICAgICAgdGhpcy5tb2RlID0gdGhpcy5wcmV2TW9kZVxyXG5cclxuICAgICAgICAgICAgICAgIFBhY21hbi5HTE9CQUxTLlBPSU5UUyArPSAxMDBcclxuXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNvZnRSZXNldCgpXHJcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlUGhhbnRvbShQaGFudG9tLkFGVEVSX0VBVF9QQVVTRSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncGFjbWFuRGVhZCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhdXNlUGhhbnRvbSh0aW1lKXtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIHRoaXMucGF1c2VkVGltZSA9IHRpbWVcclxuICAgICAgICAgICAgdGhpcy5hY3VtdWxhdGVUaW1lID0gMFxyXG4gICAgICAgIH0sXHJcbiAgICB9XHJcbn0pXHJcblxyXG5QaGFudG9tLlRJTUVTID0gWzcsIDIwLCA3LCAyMCwgNSwgMjAsIDUgLC0xXVxyXG5QaGFudG9tLlBBTklDX1RJTUUgPSAxMFxyXG5QaGFudG9tLkFGVEVSX0VBVF9QQVVTRSA9IDNcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBoYW50b21cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50aXRpZXMvUGhhbnRvbS5qcyIsImltcG9ydCAqIGFzIHRleHR1cmVMb2FkZXJzIGZyb20gJy4vVGV4dHVyZUxvYWRlcnMnXHJcbmltcG9ydCAqIGFzIHNvdW5kTG9hZGVycyBmcm9tICcuL1NvdW5kTG9hZGVycydcclxuaW1wb3J0IEFzc2V0TG9hZGVyIGZyb20gJy4vQXNzZXRMb2FkZXInXHJcblxyXG5jb25zdCBMb2FkZXIgPSBuZXcgQXNzZXRMb2FkZXIoey4uLnRleHR1cmVMb2FkZXJzLCAuLi5zb3VuZExvYWRlcnN9KVxyXG5cclxuZXhwb3J0IHtMb2FkZXJ9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9hc3NldExvYWRlci9pbmRleC5qcyIsImltcG9ydCBNMyBmcm9tIFwiLi9NYXQzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvcjJEe1xyXG4gIGNvbnN0cnVjdG9yKHgsIHksIHhvID0gMCwgeW89IDApe1xyXG4gICAgdGhpcy54ID0geCAtIHhvXHJcbiAgICB0aGlzLnkgPSB5IC0geW9cclxuICB9XHJcblxyXG4gIHRyYW5zZm9ybSh0cmFuZm9ybWF0aW9uTWF0cml4KXtcclxuICAgIHRoaXMueCA9ICh0aGlzLnggKiB0cmFuZm9ybWF0aW9uTWF0cml4WzBdKSArICh0aGlzLnkgKiB0cmFuZm9ybWF0aW9uTWF0cml4WzNdICsgdHJhbmZvcm1hdGlvbk1hdHJpeFs2XSlcclxuICAgIHRoaXMueSA9ICh0aGlzLnggKiB0cmFuZm9ybWF0aW9uTWF0cml4WzFdKSArICh0aGlzLnkgKiB0cmFuZm9ybWF0aW9uTWF0cml4WzRdICsgdHJhbmZvcm1hdGlvbk1hdHJpeFs3XSlcclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZSh2ZWN0b3Ipe1xyXG4gICAgdGhpcy54ICs9IHZlY3Rvci54XHJcbiAgICB0aGlzLnkgKz0gdmVjdG9yLnlcclxuICB9XHJcblxyXG4gIHNldFBvc2l0aW9uKHgsIHkpe1xyXG4gICAgdGhpcy54ID0geFxyXG4gICAgdGhpcy55ID0geVxyXG4gIH1cclxuXHJcbiAgcm90YXRlKHJvdGF0aW9uKXtcclxuICAgIGxldCBtYXRyaXggPSBNMy5pZGVudGl0eSgpXHJcbiAgICBtYXRyaXggPSBNMy5yb3RhdGUobWF0cml4LCByb3RhdGlvbiAqIChNYXRoLlBJLzE4MCkpXHJcbiAgICB0aGlzLnRyYW5zZm9ybShtYXRyaXgpXHJcbiAgfVxyXG5cclxuICBzYWNhbGUoc2NhbGVYLCBzY2FsZVkpe1xyXG4gICAgbGV0IG1hdHJpeCA9IE0zLmlkZW50aXR5KClcclxuICAgIG1hdHJpeCA9IE0zLnNjYWxlKG1hdHJpeCwgc2NhbGVYLCBzY2FsZVkpXHJcbiAgICB0aGlzLnRyYW5zZm9ybShtYXRyaXgpXHJcbiAgfVxyXG5cclxuICBub3JtYWwoKSB7XHJcbiAgICByZXR1cm4gbmV3IFZlY3RvcjJEKC10aGlzLnksIHRoaXMueClcclxuICB9XHJcblxyXG4gIG1hZ25pdHVkZSgpe1xyXG4gICAgcmV0dXJuIE1hdGguc3FydChNYXRoLnBvdyh0aGlzLngsIDIpICsgTWF0aC5wb3codGhpcy55LCAyKSlcclxuICB9XHJcbiAgXHJcbiAgcHJvamVjdGlvbihwcm95ZWN0aW9uVmVjdG9yKXtcclxuICAgIGNvbnN0IHByb3llY3Rpb25WZWN0b3JNYWduaXR1ZGUgPSBwcm95ZWN0aW9uVmVjdG9yLm1hZ25pdHVkZSgpXHJcbiAgICByZXR1cm4gKHRoaXMueCAqIChwcm95ZWN0aW9uVmVjdG9yLngvcHJveWVjdGlvblZlY3Rvck1hZ25pdHVkZSkpICsgKHRoaXMueSAqIChwcm95ZWN0aW9uVmVjdG9yLnkvcHJveWVjdGlvblZlY3Rvck1hZ25pdHVkZSkpXHJcbiAgfVxyXG5cclxufVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlbmRlci9zcmMvbWF0aHMvVmVjdG9yMkQuanMiLCJpbXBvcnQgUGFjbWFuIGZyb20gJy4uL1BhY21hbidcclxuXHJcbmNsYXNzIE1hemV7XHJcbiAgICBjb25zdHJ1Y3RvcihsYXlvdXQsIGludGVyc2VjdGlvbnMsIHBhY21hblNwYXduLCBqYWlsRG9vcil7XHJcbiAgICAgICAgdGhpcy5sYXlvdXQgPSBsYXlvdXRcclxuICAgICAgICB0aGlzLmludGVyc2VjdGlvbnMgPSBuZXcgTWFwKClcclxuICAgICAgICB0aGlzLmJhbGxzX2NvdW50ID0gMFxyXG4gICAgICAgIHRoaXMucGFjbWFuU3Bhd24gPSBwYWNtYW5TcGF3blxyXG4gICAgICAgIHRoaXMuamFpbERvb3IgPSBqYWlsRG9vclxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGF5b3V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5sYXlvdXRbaV0ubGVuZ3RoOyBqKyspIHtcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0W2ldW2pdID49IDIpIHRoaXMuYmFsbHNfY291bnQrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmJhbGxzX3RvdGFsID0gdGhpcy5iYWxsc19jb3VudFxyXG5cclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGludGVyc2VjdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY29uc3QgcG9pbnQgPSBpbnRlcnNlY3Rpb25zW2ldWzBdXHJcbiAgICAgICAgICAgIGxldCBkaXJlY3Rpb25zID0gaW50ZXJzZWN0aW9uc1tpXVsxXVxyXG5cclxuICAgICAgICAgICAgaWYoZGlyZWN0aW9ucyA9PSAnYXV0bycpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgW3JvdywgY29sXSA9IHBvaW50XHJcbiAgICAgICAgICAgICAgICBkaXJlY3Rpb25zID0gW11cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0W3Jvdy0xXVtjb2xdID4gMCkgZGlyZWN0aW9ucy5wdXNoKDApXHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxheW91dFtyb3ddW2NvbCsxXSA+IDApIGRpcmVjdGlvbnMucHVzaCgxKVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy5sYXlvdXRbcm93KzFdW2NvbF0gPiAwKSBkaXJlY3Rpb25zLnB1c2goMilcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMubGF5b3V0W3Jvd11bY29sLTFdID4gMCkgZGlyZWN0aW9ucy5wdXNoKDMpXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHRoaXMuaW50ZXJzZWN0aW9ucy5zZXQoSlNPTi5zdHJpbmdpZnkocG9pbnQpLCBkaXJlY3Rpb25zKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdW1lQmFsbChpLGope1xyXG4gICAgICAgIGNvbnN0IGNlbGwgPSB0aGlzLmxheW91dFtpXVtqXVxyXG4gICAgICAgIGlmKHRoaXMubGF5b3V0W2ldW2pdID49IDIpe1xyXG4gICAgICAgICAgICB0aGlzLmxheW91dFtpXVtqXSA9IDFcclxuICAgICAgICAgICAgdGhpcy5iYWxsc19jb3VudC0tXHJcbiAgICAgICAgICAgIFBhY21hbi5HTE9CQUxTLlBPSU5UUyArPSA1MFxyXG4gICAgICAgICAgICBpZihjZWxsID09IDMpIFBhY21hbi5HTE9CQUxTLlBPSU5UUyArPSA1MFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY2VsbFxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlcihzYil7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxheW91dC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubGF5b3V0W2ldLmxlbmd0aDsgaisrKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLmxheW91dFtpXVtqXT09MCkgc2IuZHJhd1RleHR1cmUoUGFjbWFuLkdMT0JBTFMudGlsZXNldFswXSwgaio4LCAyNCArIChpKjgpKVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmxheW91dFtpXVtqXT09Mikgc2IuZHJhd1RleHR1cmUoUGFjbWFuLkdMT0JBTFMudGlsZXNldFsyXSwgaio4LCAyNCArIChpKjgpKVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmxheW91dFtpXVtqXT09Mykgc2IuZHJhd1RleHR1cmUoUGFjbWFuLkdMT0JBTFMudGlsZXNldFszXSwgaio4LCAyNCArIChpKjgpKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5NYXplLkJMT0NLUyA9IHtcclxuICAgIFdBTEw6IDAsXHJcbiAgICBFTVBUWTogMSxcclxuICAgIEJBTEw6IDIsXHJcbiAgICBTVVBFUl9CQUxMOiAzXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1hemVcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvbWF6ZS9NYXplLmpzIiwiaW1wb3J0IFBoYW50b20gZnJvbSAnLi9QaGFudG9tJ1xyXG5pbXBvcnQgUGFjbWFuIGZyb20gJy4uL1BhY21hbidcclxuXHJcbmNvbnN0IFJlZFBoYW50b20gPSBQaGFudG9tKDQsIHt4OiAyNSx5OiAwfSwgKCkgPT4gKHt4OiBQYWNtYW4uR0xPQkFMUy5tYXplLmphaWxEb29yLngsIHk6IFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueSAtIDF9KSwgXHJcbiAgICAoc2VsZiwge2ksan0pID0+IHtcclxuICAgICAgICBzZWxmLmNhbGN1bGF0ZURpcmVjdGlvbih7eDogUGFjbWFuLkdMT0JBTFMuUGFjbWFuRW50aXR5LngsIHk6IFBhY21hbi5HTE9CQUxTLlBhY21hbkVudGl0eS55fSwge2ksan0pXHJcbiAgICB9LFxyXG4gICAgc2VsZiA9PiBzZWxmLmluSmFpbCA9IGZhbHNlXHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFJlZFBoYW50b21cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZW50aXRpZXMvUmVkUGhhbnRvbS5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHR1cmVSZWdpb257XHJcbiAgY29uc3RydWN0b3IodGV4dHVyZSwgeCwgeSwgd2lkdGgsIGhlaWdodCl7XHJcbiAgICB0aGlzLnRleHR1cmUgPSB0ZXh0dXJlXHJcblxyXG4gICAgaWYgKHggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICB4ID0gMFxyXG4gICAgICB3aWR0aCA9IHRleHR1cmUud2lkdGhcclxuICAgIH1cclxuICAgIGlmICh5ID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgeSA9IDBcclxuICAgICAgaGVpZ2h0ID0gdGV4dHVyZS5oZWlnaHRcclxuICAgIH1cclxuICAgIGlmICh3aWR0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHdpZHRoID0geFxyXG4gICAgICB4ID0gMFxyXG4gICAgfVxyXG4gICAgaWYgKGhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGhlaWdodCA9IHlcclxuICAgICAgeSA9IDBcclxuICAgIH1cclxuICAgIHRoaXMueCA9IHhcclxuICAgIHRoaXMueSA9IHlcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aFxyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcclxuICB9XHJcblxyXG4gIHNwbGl0KHJvd3MgPSAxLCBjb2xzID0gMSkge1xyXG5cdFx0Y29uc3Qgcm93SGVpZ2h0ID0gdGhpcy5oZWlnaHQvcm93c1xyXG5cdFx0Y29uc3QgY29sV2lkdGggPSB0aGlzLndpZHRoL2NvbHNcclxuXHRcdGxldCByZWdpb25zID0gbmV3IEFycmF5KHJvd3MpXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xyXG5cdFx0XHRyZWdpb25zW2ldID0gbmV3IEFycmF5KGNvbHMpXHJcblx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XHJcblx0XHRcdFx0cmVnaW9uc1tpXVtqXSA9IG5ldyBUZXh0dXJlUmVnaW9uKHRoaXMudGV4dHVyZSwgdGhpcy54ICsgKGogKiBjb2xXaWR0aCksIHRoaXMueSArIChpICogcm93SGVpZ2h0KSwgY29sV2lkdGgsIHJvd0hlaWdodClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlZ2lvbnNcclxuXHR9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL2dyYXBoaWNzL3RleHR1cmUvVGV4dHVyZVJlZ2lvbi5qcyIsImltcG9ydCB7IEFzc2V0Q2FjaGUgfSBmcm9tICcuLi91dGlscydcclxuXHJcbmNvbnN0IGxvYWRGcm9tQ2FjaGUgPSAoc3JjKSA9PiB7XHJcbiAgaWYgKEFzc2V0Q2FjaGUuaGFzKHNyYykpIHJldHVybiBBc3NldENhY2hlLmdldChzcmMpXHJcbiAgcmV0dXJuIGZhbHNlXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGxvYWRGcm9tQ2FjaGVcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL2Fzc2V0TG9hZGVyL0NhY2hlTG9hZGVyLmpzIiwid2luZG93LkF1ZGlvQ29udGV4dCA9IHdpbmRvdy5BdWRpb0NvbnRleHQgfHwgd2luZG93LndlYmtpdEF1ZGlvQ29udGV4dFxyXG5jb25zdCBTb3VuZENvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KClcclxuZXhwb3J0IGRlZmF1bHQgU291bmRDb250ZXh0XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9zb3VuZC9Tb3VuZENvbnRleHQuanMiLCJleHBvcnQgeyBkZWZhdWx0IGFzIE0zIH0gZnJvbSAnLi9NYXQzJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFBvbHlnb24gfSBmcm9tICcuL1BvbHlnb24nXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgUmVjdGFuZ2xlIH0gZnJvbSAnLi9SZWN0YW5nbGUnXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgVmVjdG9yMkQgfSBmcm9tICcuL1ZlY3RvcjJEJ1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlbmRlci9zcmMvbWF0aHMvaW5kZXguanMiLCJpbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vVmVjdG9yMkRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9seWdvbntcclxuICBjb25zdHJ1Y3Rvcih2ZXJ0ZXhzID0gW10pe1xyXG4gICAgdGhpcy52ZXJ0ZXhzID0gdmVydGV4c1xyXG4gIH1cclxuXHJcbiAgdHJhbnNmb3JtKHRyYW5mb3JtYXRpb25NYXRyaXgpe1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZlcnRleHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy52ZXJ0ZXhzW2ldLnRyYW5zZm9ybSh0cmFuZm9ybWF0aW9uTWF0cml4KVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdHJhbnNsYXRlKHZlY3Rvcil7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmVydGV4cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0aGlzLnZlcnRleHNbaV0ueCArPSB2ZWN0b3IueFxyXG4gICAgICB0aGlzLnZlcnRleHNbaV0ueSArPSB2ZWN0b3IueVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcm90YXRlKHJvdGF0aW9uKXtcclxuICAgIGxldCBtYXRyaXggPSBNMy5pZGVudGl0eSgpXHJcbiAgICBtYXRyaXggPSBNMy5yb3RhdGUobWF0cml4LCByb3RhdGlvbiAqIChNYXRoLlBJLzE4MCkpXHJcbiAgICB0aGlzLnRyYW5zZm9ybShtYXRyaXgpXHJcbiAgfVxyXG5cclxuICBzYWNhbGUoc2NhbGVYLCBzY2FsZVkpe1xyXG4gICAgbGV0IG1hdHJpeCA9IE0zLmlkZW50aXR5KClcclxuICAgIG1hdHJpeCA9IE0zLnNjYWxlKG1hdHJpeCwgc2NhbGVYLCBzY2FsZVkpXHJcbiAgICB0aGlzLnRyYW5zZm9ybShtYXRyaXgpXHJcbiAgfVxyXG5cclxuICBnZXROb3JtYWxzKCl7XHJcbiAgICBsZXQgbm9ybWFscyA9IG5ldyBBcnJheSh0aGlzLnZlY3RleHMubGVuZ3RoKVxyXG4gICAgbGV0IGxhc3RWZXJ0ZXggPSB0aGlzLnZlcnRleHNbdGhpcy52ZXJ0ZXhzLmxlbmd0aCAtIDFdXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudmVydGV4cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBub3JtYWxzW2ldID0gKG5ldyBWZWN0b3IyRCh0aGlzLnZlcnRleHNbaV0ueCwgdGhpcy52ZXJ0ZXhzW2ldLnksIGxhc3RWZXJ0ZXgueCwgbGFzdFZlcnRleC55KSkubm9ybWFsKClcclxuICAgICAgbGFzdFZlcnRleCA9IHRoaXMudmVydGV4c1tpXVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5vcm1hbHNcclxuICB9XHJcblxyXG4gIHByb2plY3Rpb24odmVjdG9yKXtcclxuICAgIGxldCBtaW4gPSB0aGlzLnZlcnRleHNbMF0ucHJvamVjdGlvbih2ZWN0b3IpXHJcbiAgICBsZXQgbWF4ID0gbWluXHJcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IHRoaXMudmVydGV4cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCBwID0gdGhpcy52ZXJ0ZXhzW2ldLnByb2plY3Rpb24odmVjdG9yKVxyXG4gICAgICBpZiAocCA8IG1pbikgbWluID0gcFxyXG4gICAgICBlbHNlIGlmIChwID4gbWF4KSBtYXggPSBwXHJcbiAgICB9XHJcbiAgICByZXR1cm4ge21pbiwgbWF4fVxyXG4gIH1cclxuXHJcbiAgY29sbGlkZXMocG9seWdvbil7XHJcbiAgICBjb25zdCB0aGlzTm9ybWFscyA9IHRoaXMuZ2V0Tm9ybWFscygpXHJcbiAgICBjb25zdCBwb2x5Z29uTm9ybWFscyA9IHRoaXMuZ2V0Tm9ybWFscygpXHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzTm9ybWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB0aGlzUHJvamVjdGlvbiA9IHRoaXMucHJvamVjdGlvbih0aGlzTm9ybWFsc1tpXSlcclxuICAgICAgY29uc3QgcG9seWdvblByb2plY3Rpb24gPSBwb2x5Z29uLnByb2plY3Rpb24odGhpc05vcm1hbHNbaV0pXHJcbiAgICAgIGlmKCEodGhpc1Byb2plY3Rpb24ubWF4ID49IHBvbHlnb25Qcm9qZWN0aW9uLm1pbiAmJiBwb2x5Z29uUHJvamVjdGlvbi5tYXggPj0gdGhpc1Byb2plY3Rpb24ubWluKSkgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2x5Z29uTm9ybWFscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBjb25zdCB0aGlzUHJvamVjdGlvbiA9IHRoaXMucHJvamVjdGlvbihwb2x5Z29uTm9ybWFsc1tpXSlcclxuICAgICAgY29uc3QgcG9seWdvblByb2plY3Rpb24gPSBwb2x5Z29uLnByb2plY3Rpb24ocG9seWdvbk5vcm1hbHNbaV0pXHJcbiAgICAgIGlmKCEodGhpc1Byb2plY3Rpb24ubWF4ID49IHBvbHlnb25Qcm9qZWN0aW9uLm1pbiAmJiBwb2x5Z29uUHJvamVjdGlvbi5tYXggPj0gdGhpc1Byb2plY3Rpb24ubWluKSkgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWVcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL21hdGhzL1BvbHlnb24uanMiLCJpbXBvcnQgUGhhbnRvbSBmcm9tICcuL1BoYW50b20nXHJcbmltcG9ydCBQYWNtYW4gZnJvbSAnLi4vUGFjbWFuJ1xyXG5cclxuY29uc3QgUGlua1BoYW50b20gPSBQaGFudG9tKDUsIHt4OiAyLHk6IDB9LCAoKSA9PiAoe3g6IFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueCwgeTogUGFjbWFuLkdMT0JBTFMubWF6ZS5qYWlsRG9vci55ICsgMn0pLCBcclxuICAgIChzZWxmLCB7aSxqfSkgPT4ge1xyXG4gICAgICAgIGxldCB0YXJnZVBvaW50ID0ge3g6IFBhY21hbi5HTE9CQUxTLlBhY21hbkVudGl0eS54LCB5OiBQYWNtYW4uR0xPQkFMUy5QYWNtYW5FbnRpdHkueX1cclxuICAgICAgICBpZihQYWNtYW4uR0xPQkFMUy5QYWNtYW5FbnRpdHkuZGlyZWN0aW9uID09IFBhY21hbi5HTE9CQUxTLlVQKSB0YXJnZVBvaW50LnkgLT0gNFxyXG4gICAgICAgIGVsc2UgaWYoUGFjbWFuLkdMT0JBTFMuUGFjbWFuRW50aXR5LmRpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5SSUdIVCkgdGFyZ2VQb2ludC54ICs9IDRcclxuICAgICAgICBlbHNlIGlmKFBhY21hbi5HTE9CQUxTLlBhY21hbkVudGl0eS5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuRE9XTikgdGFyZ2VQb2ludC55ICs9IDRcclxuICAgICAgICBlbHNlIGlmKFBhY21hbi5HTE9CQUxTLlBhY21hbkVudGl0eS5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuTEVGVCkgdGFyZ2VQb2ludC54IC09IDRcclxuICAgICAgICBzZWxmLmNhbGN1bGF0ZURpcmVjdGlvbih0YXJnZVBvaW50LCB7aSxqfSlcclxuICAgIH0sXHJcbiAgICBzZWxmID0+IHtcclxuICAgICAgICBsZXQgbW92ZW1lbnQgPSBzZWxmLnYgKiBQYWNtYW4uZGVsdGFUaW1lXHJcbiAgICAgICAgaWYobW92ZW1lbnQgPiAwLjEpIG1vdmVtZW50ID0gMC4xXHJcblxyXG4gICAgICAgIHNlbGYueSAtPSBtb3ZlbWVudFxyXG4gICAgICAgIHNlbGYueVJvdW5kZWQgPSBNYXRoLnJvdW5kKHNlbGYueSAqIDEwKSAvIDEwXHJcblxyXG4gICAgICAgIGlmKE1hdGguZmxvb3Ioc2VsZi55KSA9PSAoUGFjbWFuLkdMT0JBTFMubWF6ZS5qYWlsRG9vci55IC0gMSkgJiYgc2VsZi55Um91bmRlZCAlIDEgPD0gMC4yKSB7XHJcbiAgICAgICAgICAgIHNlbGYueSA9IFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueSAtIDFcclxuICAgICAgICAgICAgc2VsZi55Um91bmRlZCA9IFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueSAtIDFcclxuXHJcbiAgICAgICAgICAgIHNlbGYuaW5KYWlsID0gZmFsc2VcclxuICAgICAgICB9ICAgXHJcbiAgICB9XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFBpbmtQaGFudG9tXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudGl0aWVzL1BpbmtQaGFudG9tLmpzIiwiaW1wb3J0IFBoYW50b20gZnJvbSAnLi9QaGFudG9tJ1xyXG5pbXBvcnQgUGFjbWFuIGZyb20gJy4uL1BhY21hbidcclxuaW1wb3J0IFJlZFBoYW50b20gZnJvbSAnLi9SZWRQaGFudG9tJztcclxuaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tICcuLi8uLi9yZW5kZXInXHJcblxyXG5jb25zdCBCbHVlUGhhbnRvbSA9IFBoYW50b20oNiwge3g6IDI3LHk6IDM0fSwgKCkgPT4gKHt4OiBQYWNtYW4uR0xPQkFMUy5tYXplLmphaWxEb29yLnggLSAyLCB5OiBQYWNtYW4uR0xPQkFMUy5tYXplLmphaWxEb29yLnkgKyAyfSksIFxyXG4gICAgKHNlbGYsIHtpLGp9KSA9PiB7XHJcbiAgICAgICAgY29uc3QgcGFjbWFuUG9zaXRpb24gPSB7eDogTWF0aC5mbG9vcihQYWNtYW4uR0xPQkFMUy5QYWNtYW5FbnRpdHkueCksIHk6IE1hdGguZmxvb3IoUGFjbWFuLkdMT0JBTFMuUGFjbWFuRW50aXR5LnkpfVxyXG4gICAgICAgIGxldCB2ZWN0b3JcclxuICAgICAgICBpZihQYWNtYW4uR0xPQkFMUy5QYWNtYW5FbnRpdHkuZGlyZWN0aW9uID09IFBhY21hbi5HTE9CQUxTLlVQKSB2ZWN0b3IgPSBuZXcgVmVjdG9yMkQocGFjbWFuUG9zaXRpb24ueCwgcGFjbWFuUG9zaXRpb24ueSAtIDIsIE1hdGguZmxvb3IoUmVkUGhhbnRvbS54KSwgTWF0aC5mbG9vcihSZWRQaGFudG9tLnkpKVxyXG4gICAgICAgIGVsc2UgaWYoUGFjbWFuLkdMT0JBTFMuUGFjbWFuRW50aXR5LmRpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5SSUdIVCkgdmVjdG9yID0gbmV3IFZlY3RvcjJEKHBhY21hblBvc2l0aW9uLnggKyAyLCBwYWNtYW5Qb3NpdGlvbi55LCBNYXRoLmZsb29yKFJlZFBoYW50b20ueCksIE1hdGguZmxvb3IoUmVkUGhhbnRvbS55KSlcclxuICAgICAgICBlbHNlIGlmKFBhY21hbi5HTE9CQUxTLlBhY21hbkVudGl0eS5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuRE9XTikgdmVjdG9yID0gbmV3IFZlY3RvcjJEKHBhY21hblBvc2l0aW9uLngsIHBhY21hblBvc2l0aW9uLnkgKyAyLCBNYXRoLmZsb29yKFJlZFBoYW50b20ueCksIE1hdGguZmxvb3IoUmVkUGhhbnRvbS55KSlcclxuICAgICAgICBlbHNlIGlmKFBhY21hbi5HTE9CQUxTLlBhY21hbkVudGl0eS5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuTEVGVCkgdmVjdG9yID0gbmV3IFZlY3RvcjJEKHBhY21hblBvc2l0aW9uLnggLSAyLCBwYWNtYW5Qb3NpdGlvbi55LCBNYXRoLmZsb29yKFJlZFBoYW50b20ueCksIE1hdGguZmxvb3IoUmVkUGhhbnRvbS55KSlcclxuICAgICAgICBzZWxmLmNhbGN1bGF0ZURpcmVjdGlvbih7eDogTWF0aC5mbG9vcihzZWxmLngpICsgKHZlY3Rvci54ICogMiksIHk6IE1hdGguZmxvb3Ioc2VsZi55KSArICh2ZWN0b3IueSAqIDIpfSwge2ksan0pXHJcbiAgICB9LFxyXG4gICAgc2VsZiA9PiB7XHJcbiAgICAgICAgaWYoKFBhY21hbi5HTE9CQUxTLm1hemUuYmFsbHNfdG90YWwgLSBQYWNtYW4uR0xPQkFMUy5tYXplLmJhbGxzX2NvdW50KSA+PSAzMCl7XHJcbiAgICAgICAgICAgIGxldCBtb3ZlbWVudCA9IHNlbGYudiAqIFBhY21hbi5kZWx0YVRpbWVcclxuICAgICAgICAgICAgaWYobW92ZW1lbnQgPiAwLjEpIG1vdmVtZW50ID0gMC4xXHJcblxyXG4gICAgICAgICAgICBpZihzZWxmLnggIT0gUGFjbWFuLkdMT0JBTFMubWF6ZS5qYWlsRG9vci54KXtcclxuICAgICAgICAgICAgICAgIHNlbGYueCArPSBtb3ZlbWVudFxyXG4gICAgICAgICAgICAgICAgc2VsZi54Um91bmRlZCA9IE1hdGgucm91bmQoc2VsZi54ICogMTApIC8gMTBcclxuXHJcbiAgICAgICAgICAgICAgICBpZihzZWxmLnggPiAoUGFjbWFuLkdMT0JBTFMubWF6ZS5qYWlsRG9vci54IC0gMC4xKSAmJiBzZWxmLnggPCAoUGFjbWFuLkdMT0JBTFMubWF6ZS5qYWlsRG9vci54ICsgMC4xKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYueCA9IFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueFxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYueFJvdW5kZWQgPSBQYWNtYW4uR0xPQkFMUy5tYXplLmphaWxEb29yLnhcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNlbGYueSAtPSBtb3ZlbWVudFxyXG4gICAgICAgICAgICAgICAgc2VsZi55Um91bmRlZCA9IE1hdGgucm91bmQoc2VsZi55ICogMTApIC8gMTBcclxuXHJcbiAgICAgICAgICAgICAgICBpZihNYXRoLmZsb29yKHNlbGYueSkgPT0gKFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueSAtIDEpICYmIHNlbGYueVJvdW5kZWQgJSAxIDw9IDAuMikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYueSA9IFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueSAtIDFcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnlSb3VuZGVkID0gUGFjbWFuLkdMT0JBTFMubWF6ZS5qYWlsRG9vci55IC0gMVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWxmLmluSmFpbCA9IGZhbHNlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEJsdWVQaGFudG9tXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudGl0aWVzL0JsdWVQaGFudG9tLmpzIiwiaW1wb3J0IFBoYW50b20gZnJvbSAnLi9QaGFudG9tJ1xyXG5pbXBvcnQgUGFjbWFuIGZyb20gJy4uL1BhY21hbidcclxuaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tICcuLi8uLi9yZW5kZXInXHJcblxyXG5jb25zdCBPcmFuZ2VQaGFudG9tID0gUGhhbnRvbSg3LCB7eDogMCx5OiAzNH0sICgpID0+ICh7eDogUGFjbWFuLkdMT0JBTFMubWF6ZS5qYWlsRG9vci54ICsgMiwgeTogUGFjbWFuLkdMT0JBTFMubWF6ZS5qYWlsRG9vci55ICsgMn0pLCBcclxuICAgIChzZWxmLCB7aSxqfSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGRpc3RhbmNlID0gKG5ldyBWZWN0b3IyRChNYXRoLmZsb29yKHNlbGYueCksIE1hdGguZmxvb3Ioc2VsZi55KSwgTWF0aC5mbG9vcihQYWNtYW4uR0xPQkFMUy5QYWNtYW5FbnRpdHkueCksIE1hdGguZmxvb3IoUGFjbWFuLkdMT0JBTFMuUGFjbWFuRW50aXR5LnkpKSkubWFnbml0dWRlKClcclxuICAgICAgICBpZihkaXN0YW5jZSA8IDgpIHNlbGYuY2FsY3VsYXRlRGlyZWN0aW9uKHNlbGYucGF0cm9sUG9pbnQsIHtpLGp9KVxyXG4gICAgICAgIGVsc2Ugc2VsZi5jYWxjdWxhdGVEaXJlY3Rpb24oe3g6IFBhY21hbi5HTE9CQUxTLlBhY21hbkVudGl0eS54LCB5OiBQYWNtYW4uR0xPQkFMUy5QYWNtYW5FbnRpdHkueX0sIHtpLGp9KVxyXG4gICAgfSxcclxuICAgIHNlbGYgPT4ge1xyXG4gICAgICAgIGlmKChQYWNtYW4uR0xPQkFMUy5tYXplLmJhbGxzX3RvdGFsIC0gUGFjbWFuLkdMT0JBTFMubWF6ZS5iYWxsc19jb3VudCkgPj0gKFBhY21hbi5HTE9CQUxTLm1hemUuYmFsbHNfdG90YWwvMykpe1xyXG4gICAgICAgICAgICBsZXQgbW92ZW1lbnQgPSBzZWxmLnYgKiBQYWNtYW4uZGVsdGFUaW1lXHJcbiAgICAgICAgICAgIGlmKG1vdmVtZW50ID4gMC4xKSBtb3ZlbWVudCA9IDAuMVxyXG5cclxuICAgICAgICAgICAgaWYoc2VsZi54ICE9IFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueCl7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnggLT0gbW92ZW1lbnRcclxuICAgICAgICAgICAgICAgIHNlbGYueFJvdW5kZWQgPSBNYXRoLnJvdW5kKHNlbGYueCAqIDEwKSAvIDEwXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoc2VsZi54ID4gKFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueCAtIDAuMSkgJiYgc2VsZi54IDwgKFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueCArIDAuMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnggPSBQYWNtYW4uR0xPQkFMUy5tYXplLmphaWxEb29yLnhcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnhSb3VuZGVkID0gUGFjbWFuLkdMT0JBTFMubWF6ZS5qYWlsRG9vci54XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnkgLT0gbW92ZW1lbnRcclxuICAgICAgICAgICAgICAgIHNlbGYueVJvdW5kZWQgPSBNYXRoLnJvdW5kKHNlbGYueSAqIDEwKSAvIDEwXHJcblxyXG4gICAgICAgICAgICAgICAgaWYoTWF0aC5mbG9vcihzZWxmLnkpID09IChQYWNtYW4uR0xPQkFMUy5tYXplLmphaWxEb29yLnkgLSAxKSAmJiBzZWxmLnlSb3VuZGVkICUgMSA8PSAwLjIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxmLnkgPSBQYWNtYW4uR0xPQkFMUy5tYXplLmphaWxEb29yLnkgLSAxXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi55Um91bmRlZCA9IFBhY21hbi5HTE9CQUxTLm1hemUuamFpbERvb3IueSAtIDFcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5pbkphaWwgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4pXHJcblxyXG5leHBvcnQgZGVmYXVsdCBPcmFuZ2VQaGFudG9tXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudGl0aWVzL09yYW5nZVBoYW50b20uanMiLCJpbXBvcnQgUGFjbWFuIGZyb20gJy4vc3JjL1BhY21hbidcclxuaW1wb3J0IHsgR2FtZSwgR2VhciwgS2V5Ym9hcmQgfSBmcm9tICcuL3JlbmRlcidcclxuXHJcblBhY21hbi5maXRDYW52YXNUb0NvbmF0aW5lcigpXHJcblBhY21hbi5hZGRJbnB1dE1hbmFnZXJzKEtleWJvYXJkKVxyXG5QYWNtYW4uc3RhcnQoKVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2luZGV4LmpzIiwiZXhwb3J0IHsgZGVmYXVsdCBhcyBHYW1lIH0gZnJvbSAnLi9HYW1lJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIEdlYXIgfSBmcm9tICcuL0dlYXInXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9jb3JlL2luZGV4LmpzIiwiaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnLi4vYXNzZXRMb2FkZXInXHJcbmltcG9ydCBJbnB1dE1hbmFnZXIgZnJvbSAnLi4vaW5wdXQvSW5wdXRNYW5hZ2VyJ1xyXG5cclxuY29uc3QgcmVxdWVzdEFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXHJcblxyXG4vKipcclxuICogRGVmYXVsdCBvcHRpb25zIGZvciBHYW1lLlxyXG4gKi9cclxuY29uc3QgZGVmYXVsdE9wdGlvbnMgPSB7XHJcbiAgY29udGFpbmVyX2lkOiAnZ2FtZS1jb250YWluZXInLFxyXG4gIHdpZHRoOiA5NjAsXHJcbiAgaGVpZ2h0OiA1NDAsXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBNYWluIGNsYXNzIG9mIHRoZSBmcmF3ZXJ3b3JrLCBkZWZpbmUgYSBHYW1lLlxyXG4gKiBcclxuICogQGNsYXNzXHJcbiAqL1xyXG5jbGFzcyBHYW1lIHtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgZ2FtZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIE9wdGlvbnMgdGhhdCBkZWZpbmUgYSBnYW1lLlxyXG4gICAqIEBwYXJhbSB7R2Vhcn0gY29yZUdlYXIgLSBNYWluIEdlYXIgbW9kdWxlIG9mIGEgZ2FtZS5cclxuICAgKi9cclxuICBjb25zdHJ1Y3RvcihvcHRpb25zID0ge30sIGNvcmVHZWFyKXtcclxuICAgIFxyXG4gICAgY29uc3QgeyBjb250YWluZXJfaWQsIHdpZHRoLCBoZWlnaHQgfSA9IHsuLi5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9uc31cclxuXHJcbiAgICAvKipcclxuICAgICAqIFRPRE9cclxuICAgICAqL1xyXG4gICAgdGhpcy53aWR0aCA9IHdpZHRoXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUT0RPXHJcbiAgICAgKi9cclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogR2FtZSBjb250YWluZXIgZGVmaW5lZCBhdCBET00uXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXIge29iamVjdH0gXHJcbiAgICAgKi9cclxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVyX2lkKVxyXG5cclxuICAgIHRoaXMuc2V0Q2FudmFzKGNvbnRhaW5lcl9pZClcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGNhbnZhcyBpbnNpZGUgdGhlIGdhbWUgY29udGFpbmVyXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXIge29iamVjdH1cclxuICAgICAqL1xyXG4gICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtjb250YWluZXJfaWR9LWNhbnZhc2ApXHJcbiAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGhcclxuICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0XHJcbiAgICB0aGlzLmNhbnZhcy5zdHlsZS5vdXRsaW5lID0gXCJub25lXCJcclxuICAgIHRoaXMuY2FudmFzLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiMVwiKVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTWFuYWdlIHRoZSBpbnB1dHMgb2YgdGhlIEdhbWVcclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlciB7SW5wdXRNYW5hZ2VyfVxyXG4gICAgICovXHJcbiAgICB0aGlzLmlucHV0ID0gbmV3IElucHV0TWFuYWdlcih0aGlzLmNhbnZhcylcclxuXHJcbiAgICAvKipcclxuICAgICAqIERlZmluZXMgdGhlIGNvbnRleHQgb2YgdGhlIGNhbnZhcy5cclxuICAgICAqIFxyXG4gICAgICogQG1lbWJlciB7b2JqZWN0fVxyXG4gICAgICovXHJcbiAgICB0aGlzLmNvbnRleHQgPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXHJcbiAgICBcclxuICAgIC8qKlxyXG4gICAgICogRGVmaW5lcyBpZiB0aGUgR2FtZSBpcyBpbiBmdWxsU2NyZWVuIG1vZGUuXHJcbiAgICAgKiBcclxuICAgICAqIEBtZW1iZXIge2Jvb2xlYW59XHJcbiAgICAgKi9cclxuICAgIHRoaXMuZnVsbFNjcmVlbkFjdGl2ZSA9IGZhbHNlXHJcbiAgICAvL2dhbWUgcnVubmluZ1xyXG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2VcclxuICAgIC8vR2FtZSBsb29wIGRhdGFcclxuICAgIHRoaXMuZGVsdGEgPSAwXHJcbiAgICB0aGlzLnRoZW49IDBcclxuICAgIC8vYmluZCBnYW1lIHRvIGxvb3AgZnVuY3Rpb25cclxuICAgIHRoaXMubG9vcCA9IHRoaXMubG9vcC5iaW5kKHRoaXMpXHJcbiAgICAvL0NvcmVHZWFyXHJcbiAgICB0aGlzLmNvcmVHZWFyID0gY29yZUdlYXJcclxuICB9XHJcblxyXG4gIHNldENhbnZhcyhjb250YWluZXJfaWQpe1xyXG4gICAgdGhpcy5jb250YWluZXIucmVxdWVzdEZ1bGxTY3JlZW4gPSB0aGlzLmNvbnRhaW5lci5yZXF1ZXN0RnVsbHNjcmVlbiB8fCB0aGlzLmNvbnRhaW5lci5tc1JlcXVlc3RGdWxsc2NyZWVuIHx8IHRoaXMuY29udGFpbmVyLm1velJlcXVlc3RGdWxsU2NyZWVuIHx8IHRoaXMuY29udGFpbmVyLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuXHJcblxyXG4gICAgZG9jdW1lbnQuZXhpdEZ1bGxTY3JlZW4gPSBkb2N1bWVudC5leGl0RnVsbHNjcmVlbiB8fCBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuIHx8IGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4gfHwgZG9jdW1lbnQud2Via2l0Q2FuY2VsRnVsbFNjcmVlblxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmQgPSBcIiMwMDAwMDBcIlxyXG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCJcclxuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImZsZXhcIlxyXG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUuYWxpZ25JdGVtcyA9IFwiY2VudGVyXCJcclxuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gXCJjZW50ZXJcIlxyXG4gICAgdGhpcy5jb250YWluZXIuc3R5bGUub3ZlcmZsb3cgPSBcImhpZGRlblwiXHJcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiXHJcbiAgICB0aGlzLmNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIlxyXG5cclxuICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IGA8Y2FudmFzIGlkPVwiJHtjb250YWluZXJfaWR9LWNhbnZhc1wiPjwvY2FudmFzPmBcclxuICB9XHJcblxyXG4gIGZpdENhbnZhc1RvQ29uYXRpbmVyKCl7XHJcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgY29uc3QgY2FudmFzUHJvcG9ydGlvbnMgPSB0aGlzLmNhbnZhcy5jbGllbnRXaWR0aCAvIHRoaXMuY2FudmFzLmNsaWVudEhlaWdodFxyXG4gICAgICBjb25zdCBjb250YWluZXJQcm9wb3J0aW9ucyA9IHRoaXMuY29udGFpbmVyLmNsaWVudFdpZHRoIC8gdGhpcy5jb250YWluZXIuY2xpZW50SGVpZ2h0XHJcbiAgXHJcbiAgICAgIGlmKGNvbnRhaW5lclByb3BvcnRpb25zID4gY2FudmFzUHJvcG9ydGlvbnMpe1xyXG4gICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gXCJhdXRvXCJcclxuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcIjEwMCVcIlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuY2FudmFzLnN0eWxlLndpZHRoID0gXCIxMDAlXCJcclxuICAgICAgICB0aGlzLmNhbnZhcy5zdHlsZS5oZWlnaHQgPSBcImF1dG9cIlxyXG4gICAgICB9XHJcbiAgICB9LCAwKVxyXG4gIH1cclxuXHJcbiAgcmVzaXplQ2FudmFzKHJlbmRlcmVyLCB3aWR0aCA9IDk2MCwgaGVpZ2h0ID0gNTQwLCBmb3JjZSA9IGZhbHNlKXtcclxuICAgIGlmKCFmb3JjZSAmJiB0aGlzLndpZHRoID09IHdpZHRoICYmIHRoaXMuaGVpZ2h0ID09IGhlaWdodCkgcmV0dXJuXHJcbiAgICB0aGlzLndpZHRoID0gd2lkdGhcclxuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0XHJcblxyXG4gICAgdGhpcy5jYW52YXMud2lkdGggPSB3aWR0aFxyXG4gICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gaGVpZ2h0XHJcbiAgfVxyXG5cclxuICB0b2dnbGVGdWxsU2NyZWVuKGFjdGl2YXRlID0gIXRoaXMuZnVsbFNjcmVlbkFjdGl2ZSl7XHJcbiAgICB0aGlzLmZ1bGxTY3JlZW5BY3RpdmUgPSBhY3RpdmF0ZVxyXG5cclxuICAgIGlmKGFjdGl2YXRlKSB0aGlzLmNvbnRhaW5lci5yZXF1ZXN0RnVsbFNjcmVlbigpXHJcbiAgICBlbHNlIGRvY3VtZW50LmV4aXRGdWxsU2NyZWVuKClcclxuXHJcbiAgICBzZXRUaW1lb3V0KHRoaXMuZml0Q2FudmFzVG9Db25hdGluZXIuYmluZCh0aGlzKSwgMzAwKVxyXG4gIH1cclxuXHJcbiAgbG9vcCgpe1xyXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKVxyXG4gICAgdGhpcy5kZWx0YSA9IG5vdyAtIHRoaXMudGhlblxyXG4gICAgdGhpcy50aGVuID0gbm93XHJcbiAgICBcclxuICAgIGlmKHRoaXMucnVubmluZyl7XHJcbiAgICAgIHRoaXMuaW5wdXQudXBkYXRlKClcclxuICAgIFx0dGhpcy5jb3JlR2Vhci4kdXBkYXRlKClcclxuICAgIH1cclxuICAgIFxyXG4gICAgdGhpcy5jb3JlR2Vhci4kcmVuZGVyKClcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApXHJcbiAgfVxyXG5cclxuICBzdGFydCgpe1xyXG4gICAgdGhpcy5jb3JlR2Vhci4kbG9hZCgpXHJcbiAgICBMb2FkZXIuJGxvYWQoKCgpID0+IHtcclxuICAgICAgdGhpcy5jb3JlR2Vhci5pbml0KClcclxuICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxyXG4gICAgICB0aGlzLnRoZW4gPSBEYXRlLm5vdygpXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3ApXHJcbiAgICB9KS5iaW5kKHRoaXMpKVxyXG4gIH1cclxuXHJcbiAgcGF1c2UoKXtcclxuICAgIHRoaXMucnVubmluZyA9IGZhbHNlXHJcbiAgfVxyXG5cclxuICBjb250aW51ZSgpe1xyXG4gICAgdGhpcy50aGVuID0gRGF0ZS5ub3coKVxyXG4gICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgYWRkSW5wdXRNYW5hZ2VycyguLi5hcmdzKSB7XHJcbiAgICB0aGlzLmlucHV0LmFkZE1hbmFnZXJzKFsuLi5hcmdzXSlcclxuICB9XHJcblxyXG4gIGdldCBkZWx0YVRpbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5kZWx0YS8xMDAwXHJcbiAgfVxyXG5cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgR2FtZVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlbmRlci9zcmMvY29yZS9HYW1lLmpzIiwiaW1wb3J0IFRleHR1cmUgZnJvbSBcIi4uL2dyYXBoaWNzL3RleHR1cmUvVGV4dHVyZVwiXHJcbmltcG9ydCB7IEFzc2V0Q2FjaGUgfSBmcm9tICcuLi91dGlscydcclxuaW1wb3J0IGxvYWRGcm9tQ2FjaGUgZnJvbSAnLi9DYWNoZUxvYWRlcidcclxuXHJcbmNvbnN0IGxvYWRUZXh0dXJlRnJvbVVybCA9ICh1cmwpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICBjb25zdCBjYWNoZSA9IGxvYWRGcm9tQ2FjaGUodXJsKVxyXG4gIGlmKGNhY2hlKXtcclxuICAgIHJlc29sdmUoY2FjaGUpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGxldCBpbWcgPSBuZXcgSW1hZ2UoKVxyXG4gIGltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCByZXN1bHQgPSBuZXcgVGV4dHVyZShpbWcpXHJcbiAgICBBc3NldENhY2hlLnNldCh1cmwsIHJlc3VsdClcclxuICAgIHJlc29sdmUocmVzdWx0KVxyXG4gIH1cclxuICBpZiAoKG5ldyBVUkwodXJsKSkub3JpZ2luICE9PSB3aW5kb3cubG9jYXRpb24ub3JpZ2luKSB7XHJcbiAgICBpbWcuY3Jvc3NPcmlnaW4gPSBcIlwiXHJcbiAgfVxyXG4gIGltZy5zcmMgPSB1cmxcclxufSlcclxuXHJcbmNvbnN0IGxvYWRUZXh0dXJlRnJvbUZpbGUgPSAoZmlsZSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gIGNvbnN0IGNhY2hlID0gbG9hZEZyb21DYWNoZShmaWxlLm5hbWUpXHJcbiAgaWYoY2FjaGUpe1xyXG4gICAgcmVzb2x2ZShjYWNoZSlcclxuICAgIHJldHVyblxyXG4gIH1cclxuXHJcbiAgY29uc3QgZnIgPSBuZXcgRmlsZVJlYWRlcigpXHJcbiAgbGV0IGltZyA9IG5ldyBJbWFnZSgpXHJcblxyXG4gIGZyLm9ubG9hZGVuZCA9ICgpID0+IHtcclxuICAgIGltZy5zcmMgPSBmci5yZXN1bHRcclxuICB9XHJcbiAgaW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBUZXh0dXJlKGltZylcclxuICAgIEFzc2V0Q2FjaGUuc2V0KGZpbGUubmFtZSwgcmVzdWx0KVxyXG4gICAgcmVzb2x2ZShyZXN1bHQpXHJcbiAgfVxyXG5cclxuICBmci5yZWFkQXNEYXRhVVJMKGZpbGUpXHJcbn0pXHJcblxyXG5leHBvcnQgeyBsb2FkVGV4dHVyZUZyb21VcmwsIGxvYWRUZXh0dXJlRnJvbUZpbGUgfVxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlbmRlci9zcmMvYXNzZXRMb2FkZXIvVGV4dHVyZUxvYWRlcnMuanMiLCJpbXBvcnQgVGV4dHVyZVJlZ2lvbiBmcm9tIFwiLi9UZXh0dXJlUmVnaW9uXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRleHR1cmUge1xyXG5cdGNvbnN0cnVjdG9yKGltYWdlKSB7XHJcblx0XHR0aGlzLmltYWdlID0gaW1hZ2VcclxuXHRcdHRoaXMud2lkdGggPSBpbWFnZS53aWR0aFxyXG5cdFx0dGhpcy5oZWlnaHQgPSBpbWFnZS5oZWlnaHRcclxuXHR9XHJcblxyXG5cdHNwbGl0KHJvd3MgPSAxLCBjb2xzID0gMSkge1xyXG5cdFx0Y29uc3Qgcm93SGVpZ2h0ID0gdGhpcy5oZWlnaHQvcm93c1xyXG5cdFx0Y29uc3QgY29sV2lkdGggPSB0aGlzLndpZHRoL2NvbHNcclxuXHRcdGxldCByZWdpb25zID0gbmV3IEFycmF5KHJvd3MpXHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IHJvd3M7IGkrKykge1xyXG5cdFx0XHRyZWdpb25zW2ldID0gbmV3IEFycmF5KGNvbHMpXHJcblx0XHRcdGZvciAobGV0IGogPSAwOyBqIDwgY29sczsgaisrKSB7XHJcblx0XHRcdFx0cmVnaW9uc1tpXVtqXSA9IG5ldyBUZXh0dXJlUmVnaW9uKHRoaXMsIGogKiBjb2xXaWR0aCwgaSAqIHJvd0hlaWdodCwgY29sV2lkdGgsIHJvd0hlaWdodClcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlZ2lvbnNcclxuXHR9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9ncmFwaGljcy90ZXh0dXJlL1RleHR1cmUuanMiLCJjbGFzcyBFdmVudEVtaXRlcntcclxuICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgdGhpcy5zdWJzY3JpcHRpb25zID0gbmV3IE1hcCgpXHJcbiAgfVxyXG4gIHN1YnNjcmliZShzdWJzY3JpcHRvciwgbWVzc2FnZSwgY2FsbGJhY2spe1xyXG4gICAgaWYoIXRoaXMuc3Vic2NyaXB0aW9ucy5oYXMobWVzc2FnZSkpIHRoaXMuc3Vic2NyaXB0aW9ucy5zZXQobWVzc2FnZSwgbmV3IE1hcCgpKVxyXG4gICAgY29uc3QgbXNnU3VicyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5nZXQobWVzc2FnZSlcclxuICAgIG1zZ1N1YnMuc2V0KHN1YnNjcmlwdG9yLCBjYWxsYmFjaylcclxuICB9XHJcbiAgdW5zdWJzY3JpYmUoc3Vic2NyaXB0b3IsIG1lc3NhZ2Upe1xyXG4gICAgaWYoIXRoaXMuc3Vic2NyaXB0aW9ucy5oYXMobWVzc2FnZSkpIHJldHVyblxyXG4gICAgY29uc3QgbXNnU3VicyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5nZXQobWVzc2FnZSlcclxuICAgIGlmKCFtc2dTdWJzLmhhcyhzdWJzY3JpcHRvcikpIHJldHVyblxyXG4gICAgbXNnU3Vicy5kZWxldGUoc3Vic2NyaXB0b3IpXHJcbiAgICBpZihtc2dTdWJzLnNpemUgPT0gMCkgdGhpcy5zdWJzY3JpcHRpb25zLmRlbGV0ZShtZXNzYWdlKVxyXG4gIH1cclxuICBlbWl0KG1lc3NhZ2UsIC4uLmFyZ3Mpe1xyXG4gICAgaWYoIXRoaXMuc3Vic2NyaXB0aW9ucy5oYXMobWVzc2FnZSkpIHJldHVyblxyXG4gICAgY29uc3QgbXNnU3VicyA9IHRoaXMuc3Vic2NyaXB0aW9ucy5nZXQobWVzc2FnZSlcclxuICAgIGZvciAoY29uc3QgY2FsbGJhY2sgb2YgbXNnU3Vicy52YWx1ZXMoKSkge1xyXG4gICAgICBjYWxsYmFjayguLi5hcmdzKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuY29uc3QgZW1pdGVyID0gbmV3IEV2ZW50RW1pdGVyXHJcblxyXG5leHBvcnQgZGVmYXVsdCBlbWl0ZXJcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL3V0aWxzL0V2ZW50RW1pdGVyLmpzIiwiaW1wb3J0IFNvdW5kIGZyb20gJy4uL3NvdW5kL1NvdW5kJ1xyXG5pbXBvcnQgU291bmRDb250ZXh0IGZyb20gJy4uL3NvdW5kL1NvdW5kQ29udGV4dCdcclxuaW1wb3J0IGxvYWRGcm9tQ2FjaGUgZnJvbSAnLi9DYWNoZUxvYWRlcidcclxuaW1wb3J0IHsgQXNzZXRDYWNoZSB9IGZyb20gJy4uL3V0aWxzJ1xyXG5cclxuY29uc3QgbG9hZFNvdW5kRnJvbVVybCA9ICh1cmwpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICBjb25zdCBjYWNoZSA9IGxvYWRGcm9tQ2FjaGUodXJsKVxyXG4gIGlmKGNhY2hlKXtcclxuICAgIHJlc29sdmUoY2FjaGUpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGxldCByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcclxuICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCwgdHJ1ZSlcclxuICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9ICdhcnJheWJ1ZmZlcidcclxuXHJcbiAgcmVxdWVzdC5vbmxvYWQgPSAoKSA9PiBTb3VuZENvbnRleHQuZGVjb2RlQXVkaW9EYXRhKFxyXG4gICAgcmVxdWVzdC5yZXNwb25zZSxcclxuICAgIGJ1ZmZlciA9PiB7XHJcbiAgICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBTb3VuZChidWZmZXIpXHJcbiAgICAgIEFzc2V0Q2FjaGUuc2V0KHVybCwgcmVzdWx0KVxyXG4gICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpXHJcbiAgICB9LFxyXG4gICAgZXJyb3IgPT4gcmVqZWN0KGVycm9yKVxyXG4gIClcclxuXHJcbiAgcmVxdWVzdC5zZW5kKClcclxufSlcclxuXHJcbmNvbnN0IGxvYWRTb3VuZEZyb21GaWxlID0gKGZpbGUpID0+IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICBjb25zdCBjYWNoZSA9IGxvYWRGcm9tQ2FjaGUoZmlsZS5uYW1lKVxyXG4gIGlmKGNhY2hlKXtcclxuICAgIHJlc29sdmUoY2FjaGUpXHJcbiAgICByZXR1cm5cclxuICB9XHJcblxyXG4gIGNvbnN0IGZyID0gbmV3IEZpbGVSZWFkZXIoKVxyXG5cclxuICBmci5vbmxvYWRlbmQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBidWZmZXIgPSBmci5yZXN1bHRcclxuICAgIFNvdW5kQ29udGV4dC5kZWNvZGVBdWRpb0RhdGEoXHJcbiAgICAgIHJlcXVlc3QucmVzcG9uc2UsXHJcbiAgICAgIGJ1ZmZlciA9PiB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gbmV3IFNvdW5kKGJ1ZmZlcilcclxuICAgICAgICBBc3NldENhY2hlLnNldChmaWxlLm5hbWUsIHJlc3VsdClcclxuICAgICAgICByZXR1cm4gcmVzb2x2ZShyZXN1bHQpXHJcbiAgICAgIH0sXHJcbiAgICAgIGVycm9yID0+IHJlamVjdChlcnJvcilcclxuICAgIClcclxuICB9XHJcblxyXG4gIGZyLnJlYWRBc0FycmF5QnVmZmVyKGZpbGUpXHJcbn0pXHJcblxyXG5leHBvcnQgeyBsb2FkU291bmRGcm9tVXJsLCBsb2FkU291bmRGcm9tRmlsZSB9XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9hc3NldExvYWRlci9Tb3VuZExvYWRlcnMuanMiLCJpbXBvcnQgU291bmRDb250ZXh0IGZyb20gJy4vU291bmRDb250ZXh0J1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU291bmR7XHJcbiAgY29uc3RydWN0b3IoYXVkaW9CdWZmZXIpe1xyXG4gICAgdGhpcy5hdWRpb0J1ZmZlciA9IGF1ZGlvQnVmZmVyXHJcbiAgICB0aGlzLmluc3RhbmNlcyA9IHt9XHJcbiAgICB0aGlzLmlkQ291bnRlciA9IDBcclxuICB9XHJcbiAgXHJcbiAgcGxheShvcHRpb25zID0ge30pe1xyXG4gICAgY29uc3Qge3RpbWUsIHZvbHVtZSwgbG9vcH0gPSB7dGltZTogMCwgdm9sdW1lOiAxLCBsb29wOiBmYWxzZSwgLi4ub3B0aW9uc31cclxuICAgIC8vU2V0IGlkXHJcbiAgICBjb25zdCBpZCA9IHRoaXMuaWRDb3VudGVyKytcclxuXHJcbiAgICAvL0NyZWF0ZSBpbnN0YW5jZVxyXG4gICAgbGV0IHNvdXJjZSA9IFNvdW5kQ29udGV4dC5jcmVhdGVCdWZmZXJTb3VyY2UoKVxyXG4gICAgc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCBlID0+IGRlbGV0ZSB0aGlzLmluc3RhbmNlc1tpZF0pXHJcbiAgICBzb3VyY2UuYnVmZmVyID0gdGhpcy5hdWRpb0J1ZmZlclxyXG5cclxuICAgIC8vU2V0IGxvb3BcclxuICAgIHNvdXJjZS5sb29wID0gbG9vcFxyXG5cclxuICAgIC8vQ3JlYXRlIEdhaW5Ob2RlIGZvciB2b2x1bWVcclxuICAgIGxldCBnYWluTm9kZSA9IFNvdW5kQ29udGV4dC5jcmVhdGVHYWluKClcclxuICAgIHNvdXJjZS5jb25uZWN0KGdhaW5Ob2RlKVxyXG4gICAgZ2Fpbk5vZGUuZ2Fpbi5zZXRUYXJnZXRBdFRpbWUodm9sdW1lLCBTb3VuZENvbnRleHQuY3VycmVudFRpbWUsIDAuMDE1KVxyXG5cclxuICAgIGdhaW5Ob2RlLmNvbm5lY3QoU291bmRDb250ZXh0LmRlc3RpbmF0aW9uKVxyXG4gICAgc291cmNlLnN0YXJ0KHRpbWUpXHJcblxyXG5cclxuICAgIHRoaXMuaW5zdGFuY2VzW2lkXSA9IHtzb3VyY2UsIGdhaW5Ob2RlfVxyXG4gICAgcmV0dXJuIGlkXHJcbiAgfVxyXG5cclxuICBpc1NldChpZCl7XHJcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmluc3RhbmNlc1tpZF0pXHJcbiAgfVxyXG4gIFxyXG4gIHN0b3AoaWQpe1xyXG4gICAgaWYoIXRoaXMuaXNTZXQoaWQpKSByZXR1cm4gZmFsc2VcclxuICAgIHRoaXMuaW5zdGFuY2VzW2lkXS5zb3VyY2Uuc3RvcCgwKVxyXG4gICAgdGhpcy5pbnN0YW5jZXNbaWRdLnNvdXJjZS5ub3RlT2ZmKDApXHJcbiAgICBkZWxldGUgdGhpcy5pbnN0YW5jZXNbaWRdXHJcbiAgfVxyXG5cclxuICBzZXR2b2x1bWUoaWQsIHZvbHVtZSl7XHJcbiAgICBpZighdGhpcy5pc1NldChpZCkpIHJldHVybiBmYWxzZVxyXG4gICAgdGhpcy5pbnN0YW5jZXNbaWRdLmdhaW5Ob2RlLmdhaW4uc2V0VGFyZ2V0QXRUaW1lKHZvbHVtZSwgU291bmRDb250ZXh0LmN1cnJlbnRUaW1lLCAwLjAxNSlcclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL3NvdW5kL1NvdW5kLmpzIiwiY2xhc3MgQXNzZXRMb2FkZXJ7XHJcbiAgY29uc3RydWN0b3IobG9hZGVycyl7XHJcbiAgICB0aGlzLnVuTG9hZENvbnRlbnQgPSBbXVxyXG4gICAgdGhpcy5sb2FkQ29udGVudFJlZmVyZW5jZXMgPSBbXVxyXG4gICAgdGhpcy5hZGRMb2FkZXJzKGxvYWRlcnMpXHJcbiAgfVxyXG5cclxuICBhZGRMb2FkZXJzKGxvYWRlcnMpe1xyXG4gICAgY29uc3QgbG9hZGVyRW50cmllcyA9IE9iamVjdC5lbnRyaWVzKGxvYWRlcnMpXHJcbiAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgbG9hZGVyRW50cmllcyl7XHJcbiAgICAgIHRoaXNba2V5XSA9IHZhbHVlXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAkYWRkTG9hZENvbnRlbnQoc291cmNlLCBjb250ZW50KXtcclxuICAgIHRoaXMudW5Mb2FkQ29udGVudCA9IFsuLi50aGlzLnVuTG9hZENvbnRlbnQsIC4uLk9iamVjdC52YWx1ZXMoY29udGVudCldXHJcbiAgICB0aGlzLmxvYWRDb250ZW50UmVmZXJlbmNlcyA9IFsuLi50aGlzLmxvYWRDb250ZW50UmVmZXJlbmNlcywgLi4uT2JqZWN0LmtleXMoY29udGVudCkubWFwKGtleSA9PiBbc291cmNlLCBrZXldKV1cclxuICB9XHJcblxyXG4gICRsb2FkKHRoZW4gPSAoKSA9PiAwKXtcclxuICAgIFByb21pc2UuYWxsKHRoaXMudW5Mb2FkQ29udGVudClcclxuICAgICAgLnRoZW4odmFsdWVzID0+IHtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHZhbHVlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgY29uc3Qgc291cmNlID0gdGhpcy5sb2FkQ29udGVudFJlZmVyZW5jZXNbaV1bMF1cclxuICAgICAgICAgIGNvbnN0IGtleSA9IHRoaXMubG9hZENvbnRlbnRSZWZlcmVuY2VzW2ldWzFdXHJcbiAgICAgICAgICBzb3VyY2Vba2V5XSA9IHZhbHVlc1tpXVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVuTG9hZENvbnRlbnQgPSBbXVxyXG4gICAgICAgIHRoaXMubG9hZENvbnRlbnRSZWZlcmVuY2VzID0gW11cclxuICAgICAgICB0aGVuKClcclxuICAgICAgfSlcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFzc2V0TG9hZGVyXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9hc3NldExvYWRlci9Bc3NldExvYWRlci5qcyIsImNsYXNzIElucHV0TWFuYWdlciB7XHJcbiAgY29uc3RydWN0b3IoY2FudmFzKXtcclxuICAgIHRoaXMuY2FudmFzID0gY2FudmFzXHJcbiAgICB0aGlzLl91cGRhdGVGdW5jdGlvbnMgPSBbXVxyXG4gIH1cclxuICB1cGRhdGUoKXtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fdXBkYXRlRnVuY3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuX3VwZGF0ZUZ1bmN0aW9uc1tpXSgpXHJcbiAgICB9XHJcbiAgfVxyXG4gIGFkZE1hbmFnZXJzKG1hbmFnZXJzID0gW10pe1xyXG4gICAgbGV0ICBuZXdVcGRhdGVGdW5jdGlvbnMgPSBuZXcgQXJyYXkobWFuYWdlcnMubGVuZ3RoKVxyXG4gICAgXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1hbmFnZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IG1ldGhvZExpc3QgPSBPYmplY3QuZW50cmllcyhtYW5hZ2Vyc1tpXS5tZXRob2RzKVxyXG4gICAgICBmb3IgKGxldCBba2V5LCB2YWx1ZV0gb2YgbWV0aG9kTGlzdCl7XHJcbiAgICAgICAgdGhpc1trZXldID0gdmFsdWVcclxuICAgICAgfVxyXG4gICAgICAobWFuYWdlcnNbaV0uaW5pdC5iaW5kKHRoaXMpKSgpXHJcbiAgICAgIG5ld1VwZGF0ZUZ1bmN0aW9uc1tpXSA9IG1hbmFnZXJzW2ldLnVwZGF0ZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3VwZGF0ZUZ1bmN0aW9ucyA9IFsuLi50aGlzLl91cGRhdGVGdW5jdGlvbnMsIC4uLm5ld1VwZGF0ZUZ1bmN0aW9uc11cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IElucHV0TWFuYWdlclxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlbmRlci9zcmMvaW5wdXQvSW5wdXRNYW5hZ2VyLmpzIiwiaW1wb3J0IHsgTG9hZGVyIH0gZnJvbSAnLi4vYXNzZXRMb2FkZXInXHJcbmltcG9ydCB7IEV2ZW50RW1pdGVyIH0gZnJvbSAnLi4vdXRpbHMnXHJcbmltcG9ydCBHZWFyU3RhY2sgZnJvbSAnLi9HZWFyU3RhY2snXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHZWFye1xyXG4gIGNvbnN0cnVjdG9yKGdlYXIgPSB7fSl7XHJcbiAgICBjb25zdCB7bG9hZCwgaW5pdCwgdXBkYXRlLCByZW5kZXIsIGdlYXJzLCBtZXRob2RzfSA9IHtsb2FkOigpPT4oe30pLCBpbml0OigpID0+IHt9LCB1cGRhdGU6KCkgPT4ge30sIHJlbmRlcjooKSA9PiB7fSwgZ2VhcnM6W10sIG1ldGhvZHM6e30sIC4uLmdlYXJ9XHJcblxyXG4gICAgdGhpcy5pbml0ID0gaW5pdFxyXG4gICAgdGhpcy5nZWFyU3RhY2sgPSBuZXcgR2VhclN0YWNrKHRoaXMsIGdlYXJzKVxyXG4gICAgdGhpcy5wYXVzZSA9IGZhbHNlXHJcbiAgICB0aGlzLmFjdGl2ZSA9IHRydWVcclxuICAgIHRoaXMudXBkYXRlID0gdXBkYXRlXHJcbiAgICB0aGlzLnJlbmRlciA9IHJlbmRlclxyXG4gICAgdGhpcy5sb2FkID0gbG9hZFxyXG5cclxuICAgIGNvbnN0IG1ldGhvZExpc3QgPSBPYmplY3QuZW50cmllcyhtZXRob2RzKVxyXG4gICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIG1ldGhvZExpc3Qpe1xyXG4gICAgICB0aGlzW2tleV0gPSB2YWx1ZVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgJGxvYWQoKXtcclxuICAgIExvYWRlci4kYWRkTG9hZENvbnRlbnQodGhpcywgdGhpcy5sb2FkKCkpXHJcbiAgICB0aGlzLmdlYXJTdGFjay5sb2FkKClcclxuICB9XHJcblxyXG4gICR1cGRhdGUoLi4uYXJncyl7XHJcbiAgICBpZighdGhpcy5wYXVzZSAmJiB0aGlzLmFjdGl2ZSlcclxuICAgICAgdGhpcy51cGRhdGUoLi4uYXJncylcclxuICB9XHJcblxyXG4gICRyZW5kZXIoLi4uYXJncyl7XHJcbiAgICBpZih0aGlzLmFjdGl2ZSlcclxuICAgICAgdGhpcy5yZW5kZXIoLi4uYXJncylcclxuICB9XHJcblxyXG4gICRlbWl0KG1lc3NhZ2UsIC4uLmFyZ3Mpe1xyXG4gICAgRXZlbnRFbWl0ZXIuZW1pdChtZXNzYWdlLCAuLi5hcmdzKVxyXG4gIH1cclxuXHJcbiAgJHN1YnNjcmliZShtZXNzYWdlLCBjYWxsYmFjayl7XHJcbiAgICBFdmVudEVtaXRlci5zdWJzY3JpYmUodGhpcywgbWVzc2FnZSwgY2FsbGJhY2suYmluZCh0aGlzKSlcclxuICB9XHJcblxyXG4gICR1bnN1YnNjcmliZShtZXNzYWdlKXtcclxuICAgIEV2ZW50RW1pdGVyLnVuc3Vic2NyaWJlKHRoaXMsIG1lc3NhZ2UpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9jb3JlL0dlYXIuanMiLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBHZWFyU3RhY2t7XHJcbiAgY29uc3RydWN0b3IocGFyZW50LCBzdGFjayA9IHt9KXtcclxuICAgIGNvbnN0IGdlYXJzID0gT2JqZWN0LmVudHJpZXMoc3RhY2spXHJcbiAgICB0aGlzLnN0YWNrID0gbmV3IEFycmF5KGdlYXJzLmxlbmd0aClcclxuICAgIGxldCBpID0gMFxyXG4gICAgZm9yIChsZXQgW2tleSwgdmFsdWVdIG9mIGdlYXJzKXtcclxuICAgICAgcGFyZW50W2tleV0gPSB2YWx1ZVxyXG4gICAgICB0aGlzLnN0YWNrW2ldID0gdmFsdWVcclxuICAgICAgaSsrXHJcbiAgICB9XHJcbiAgICB0aGlzLnBhdXNlID0gZmFsc2VcclxuICAgIHRoaXMuYWN0aXZlID0gdHJ1ZVxyXG4gIH1cclxuXHJcbiAgaW5pdCgpe1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnN0YWNrLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRoaXMuc3RhY2tbaV0uaW5pdCgpXHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB1cGRhdGUoLi4uYXJncyl7XHJcbiAgICBpZighdGhpcy5wYXVzZSAmJiB0aGlzLmFjdGl2ZSl7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuc3RhY2tbaV0uJHVwZGF0ZSguLi5hcmdzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZW5kZXIoLi4uYXJncyl7XHJcbiAgICBpZih0aGlzLmFjdGl2ZSl7XHJcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGFjay5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHRoaXMuc3RhY2tbaV0uJHJlbmRlciguLi5hcmdzKVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBsb2FkKCl7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc3RhY2subGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGhpcy5zdGFja1tpXS4kbG9hZCgpXHJcbiAgICB9XHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9jb3JlL0dlYXJTdGFjay5qcyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgVGV4dHVyZVJlZ2lvbiB9IGZyb20gJy4vdGV4dHVyZS9UZXh0dXJlUmVnaW9uJ1xyXG5leHBvcnQgeyBkZWZhdWx0IGFzIFNwcml0ZUJhdGNoIH0gZnJvbSAnLi9TcHJpdGVCYXRjaCdcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBBbmltYXRpb24gfSBmcm9tICcuL0FuaW1hdGlvbidcclxuZXhwb3J0IHsgZGVmYXVsdCBhcyBDYW1lcmEgfSBmcm9tICcuL0NhbWVyYSdcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL2dyYXBoaWNzL2luZGV4LmpzIiwiaW1wb3J0IEltYWdlQnVmZmVyIGZyb20gXCIuL0ltYWdlQnVmZmVyXCJcclxuaW1wb3J0IE0zIGZyb20gXCIuLi9tYXRocy9NYXQzXCJcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZUJhdGNoIHtcclxuXHRjb25zdHJ1Y3Rvcihjb250ZXh0KSB7XHJcblx0XHR0aGlzLmNvbnRleHQgPSBjb250ZXh0XHJcbiAgICB0aGlzLmJ1ZmZlciA9IG5ldyBJbWFnZUJ1ZmZlcihjb250ZXh0LmNhbnZhcy53aWR0aCwgY29udGV4dC5jYW52YXMuaGVpZ2h0KVxyXG4gICAgdGhpcy5kcmF3aW5nID0gZmFsc2VcclxuICAgIHRoaXMucHJvamVjdGlvbk1hdHJpeCA9IE0zLmlkZW50aXR5KClcclxuXHR9XHJcblx0YmVnaW4oKXtcclxuXHRcdGlmKHRoaXMuZHJhd2luZylcclxuXHRcdFx0dGhyb3cgXCJUaGlzIGJhdGNoIGlzIGN1cnJlbmx5IGRyYXdpbmdcIlxyXG5cdFx0dGhpcy5kcmF3aW5nID0gdHJ1ZVxyXG5cdFx0dGhpcy5idWZmZXIuY2xlYXIoKVxyXG5cdH1cclxuXHRkcmF3VGV4dHVyZSh0ZXh0dXJlLCBzcmNYLCBzcmNZLCBzcmNXaWR0aCwgc3JjSGVpZ2h0LCBkc3RYLCBkc3RZLCBkc3RXaWR0aCwgZHN0SGVpZ2h0LCBzcmNSb3RhdGlvbiA9IDAsIG9mZnNldFggPSAwLCBvZmZzZXRZID0gMCl7XHJcblx0XHRpZighdGhpcy5kcmF3aW5nKVxyXG4gICAgICB0aHJvdyBcIlRoaXMgYmF0Y2ggaXMgbm90IGJlZ2luIHRvIGRyYXdcIlxyXG4gICAgdGhpcy5idWZmZXIuY29udGV4dC5zYXZlKClcclxuXHRcdGlmIChkc3RYID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZHN0WCA9IHNyY1hcclxuICAgICAgc3JjWCA9IDBcclxuICAgIH1cclxuICAgIGlmIChkc3RZID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZHN0WSA9IHNyY1lcclxuICAgICAgc3JjWSA9IDBcclxuICAgIH1cclxuICAgIGlmIChzcmNXaWR0aCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHNyY1dpZHRoID0gdGV4dHVyZS53aWR0aFxyXG4gICAgfVxyXG4gICAgaWYgKHNyY0hlaWdodCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHNyY0hlaWdodCA9IHRleHR1cmUuaGVpZ2h0XHJcbiAgICB9XHJcbiAgICBpZiAoZHN0V2lkdGggPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICBkc3RXaWR0aCA9IHNyY1dpZHRoXHJcbiAgICAgIHNyY1dpZHRoID0gdGV4dHVyZS53aWR0aFxyXG4gICAgfVxyXG4gICAgaWYgKGRzdEhlaWdodCA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIGRzdEhlaWdodCA9IHNyY0hlaWdodFxyXG4gICAgICBzcmNIZWlnaHQgPSB0ZXh0dXJlLmhlaWdodFxyXG4gICAgfVxyXG4gICAgaWYgKHRleHR1cmUuY29uc3RydWN0b3IubmFtZSA9PSBcIlRleHR1cmVSZWdpb25cIikge1xyXG4gICAgICBzcmNYICs9IHRleHR1cmUueFxyXG4gICAgICBzcmNZICs9IHRleHR1cmUueVxyXG4gICAgICB0ZXh0dXJlID0gdGV4dHVyZS50ZXh0dXJlXHJcbiAgICB9IFxyXG5cclxuICAgIGxldCBtYXRyaXggPSBNMy5pZGVudGl0eSgpXHJcblxyXG4gICAgLy8gdGhpcyBtYXRyaXggd2lsbCB0cmFuc2xhdGUgb3VyIHF1YWQgdG8gZHN0WCwgZHN0WVxyXG4gICAgbWF0cml4ID0gTTMudHJhbnNsYXRlKG1hdHJpeCwgZHN0WCAtIChkc3RXaWR0aCAqIG9mZnNldFgpLCBkc3RZIC0gKGRzdEhlaWdodCAqIG9mZnNldFkpKVxyXG5cclxuICAgIG1hdHJpeCA9IE0zLnRyYW5zbGF0ZShtYXRyaXgsIGRzdFdpZHRoICogb2Zmc2V0WCwgZHN0SGVpZ2h0ICogb2Zmc2V0WSlcclxuICAgIG1hdHJpeCA9IE0zLnJvdGF0ZShtYXRyaXgsIHNyY1JvdGF0aW9uICogKE1hdGguUEkvMTgwKSlcclxuICAgIG1hdHJpeCA9IE0zLnNjYWxlKG1hdHJpeCwgZHN0V2lkdGgvc3JjV2lkdGgsIGRzdEhlaWdodC9zcmNIZWlnaHQpXHJcbiAgICBtYXRyaXggPSBNMy50cmFuc2xhdGUobWF0cml4LCBkc3RXaWR0aCAqIC1vZmZzZXRYLCBkc3RIZWlnaHQgKiAtb2Zmc2V0WSlcclxuXHJcbiAgICB0aGlzLmJ1ZmZlci5jb250ZXh0LnNldFRyYW5zZm9ybSguLi5NMy50b0NhbnZhczJkTWF0cml4KE0zLm11bHRpcGx5KHRoaXMucHJvamVjdGlvbk1hdHJpeCwgbWF0cml4KSkpXHJcblxyXG4gICAgdGhpcy5idWZmZXIuY29udGV4dC5kcmF3SW1hZ2UodGV4dHVyZS5pbWFnZSwgc3JjWCwgc3JjWSwgc3JjV2lkdGgsIHNyY0hlaWdodCwgMCwgMCwgc3JjV2lkdGgsIHNyY0hlaWdodClcclxuXHJcbiAgICB0aGlzLmJ1ZmZlci5jb250ZXh0LnJlc3RvcmUoKVxyXG4gIH1cclxuICBkcmF3VGV4dCh0ZXh0LCBjb2xvciwgZm9udCwgYWxpbmcsIHNyY1gsIHNyY1kpe1xyXG4gICAgaWYoIXRoaXMuZHJhd2luZylcclxuICAgICAgdGhyb3cgXCJUaGlzIGJhdGNoIGlzIG5vdCBiZWdpbiB0byBkcmF3XCJcclxuICAgIHRoaXMuYnVmZmVyLmNvbnRleHQuc2F2ZSgpXHJcblxyXG4gICAgdGhpcy5idWZmZXIuY29udGV4dC5zZXRUcmFuc2Zvcm0oLi4uTTMudG9DYW52YXMyZE1hdHJpeCh0aGlzLnByb2plY3Rpb25NYXRyaXgpKVxyXG5cclxuICAgIHRoaXMuYnVmZmVyLmNvbnRleHQuZm9udCA9IGZvbnQ7XHJcbiAgICB0aGlzLmJ1ZmZlci5jb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yO1xyXG4gICAgdGhpcy5idWZmZXIuY29udGV4dC50ZXh0QWxpZ24gPSBhbGluZztcclxuICAgIHRoaXMuYnVmZmVyLmNvbnRleHQuZmlsbFRleHQodGV4dCwgc3JjWCwgc3JjWSk7XHJcblxyXG4gICAgdGhpcy5idWZmZXIuY29udGV4dC5yZXN0b3JlKClcclxuICB9XHJcblx0ZW5kKCl7XHJcblx0XHRpZighdGhpcy5kcmF3aW5nKVxyXG5cdFx0XHR0aHJvdyBcIlRoaXMgYmF0Y2ggaXMgbm90IGJlZ2luIHRvIGRyYXdcIlxyXG5cdFx0dGhpcy5kcmF3aW5nID0gZmFsc2VcclxuXHRcdHRoaXMuY29udGV4dC5kcmF3SW1hZ2UodGhpcy5idWZmZXIuY2FudmFzLCAwLCAwKVxyXG4gIH1cclxuICBzZXRQcm9qZWN0aW9uKG1hdHJpeCl7XHJcbiAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSBtYXRyaXhcclxuICB9XHJcbiAgcmVzZXRQcm9qZWN0aW9uKCl7XHJcbiAgICB0aGlzLnByb2plY3Rpb25NYXRyaXggPSBNMy5pZGVudGl0eSgpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9ncmFwaGljcy9TcHJpdGVCYXRjaC5qcyIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIEltYWdlQnVmZmVyICB7XHJcblx0Y29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCl7XHJcblx0XHR0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcblx0XHR0aGlzLmNhbnZhcy53aWR0aCA9IHdpZHRoXHJcblx0XHR0aGlzLmNhbnZhcy5oZWlnaHQgPSBoZWlnaHRcclxuXHRcdHRoaXMuY29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJylcclxuXHR9XHJcblx0Y2xlYXIoKXtcclxuXHRcdHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodClcclxuXHR9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL2dyYXBoaWNzL0ltYWdlQnVmZmVyLmpzIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQW5pbWF0aW9ue1xyXG5cclxuICBzdGF0aWMgUExBWV9NT0RFUyA9IHtcclxuICAgIE5PUk1BTDogMCxcclxuICAgIExPT1A6IDEsXHJcbiAgICBSRVZFUlNFOiAyLFxyXG4gICAgTE9PUF9SRVZFUlNFOiAzLFxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IoZnJhbWVUaW1lLCBmcmFtZXMsIHBsYXlNb2RlID0gMCl7XHJcbiAgICB0aGlzLmZyYW1lVGltZSA9IGZyYW1lVGltZVxyXG4gICAgdGhpcy5mcmFtZXMgPSBmcmFtZXNcclxuICAgIHRoaXMucGxheU1vZGUgPSBwbGF5TW9kZVxyXG4gICAgdGhpcy5hbmltYXRpb25FbmRlZCA9IGZhbHNlXHJcbiAgICB0aGlzLl9mcmFtZSA9IHRoaXMucGxheU1vZGUgPiAxID8gdGhpcy5mcmFtZXMubGVuZ3RoIC0gMSA6IDBcclxuICAgIHRoaXMuX2FjdW11bGF0ZVRpbWUgPSAwXHJcbiAgfVxyXG5cclxuICBnZXRGcmFtZShkZWx0YVRpbWUpe1xyXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9uRW5kZWQpIHJldHVybiB0aGlzLmZyYW1lc1t0aGlzLl9mcmFtZV1cclxuICAgIGNvbnN0IGZyYW1lc0VsYXBzZXMgPSBNYXRoLmZsb29yKCh0aGlzLl9hY3VtdWxhdGVUaW1lICsgZGVsdGFUaW1lKSAvIHRoaXMuZnJhbWVUaW1lKVxyXG4gICAgdGhpcy5fYWN1bXVsYXRlVGltZSA9ICh0aGlzLl9hY3VtdWxhdGVUaW1lICsgZGVsdGFUaW1lKSAtIChmcmFtZXNFbGFwc2VzICogdGhpcy5mcmFtZVRpbWUpXHJcbiAgICB0aGlzLl9uZXh0RnJhbWUoZnJhbWVzRWxhcHNlcylcclxuICAgIHJldHVybiB0aGlzLmZyYW1lc1t0aGlzLl9mcmFtZV1cclxuICB9XHJcblxyXG4gIF9uZXh0RnJhbWUoZnJhbWVFbGFwc2Upe1xyXG4gICAgdGhpc1tgX25leHRGcmFtZSR7dGhpcy5wbGF5TW9kZX1gXShmcmFtZUVsYXBzZSlcclxuICB9XHJcbiAgX25leHRGcmFtZTAoZnJhbWVFbGFwc2Upe1xyXG4gICAgdGhpcy5fZnJhbWUgPSBNYXRoLm1pbih0aGlzLl9mcmFtZSArPSBmcmFtZUVsYXBzZSwgdGhpcy5mcmFtZXMubGVuZ3RoIC0gMSlcclxuICAgIGlmICh0aGlzLl9mcmFtZSA9PSB0aGlzLmZyYW1lcy5sZW5ndGggLSAxKSB0aGlzLmFuaW1hdGlvbkVuZGVkID0gdHJ1ZVxyXG4gIH1cclxuICBfbmV4dEZyYW1lMShmcmFtZUVsYXBzZSl7XHJcbiAgICB0aGlzLl9mcmFtZSA9ICh0aGlzLl9mcmFtZSArIGZyYW1lRWxhcHNlKSAlIHRoaXMuZnJhbWVzLmxlbmd0aFxyXG4gIH1cclxuICBfbmV4dEZyYW1lMihmcmFtZUVsYXBzZSl7XHJcbiAgICB0aGlzLl9mcmFtZSA9IE1hdGgubWF4KHRoaXMuX2ZyYW1lIC09IGZyYW1lRWxhcHNlLCAwKVxyXG4gICAgaWYgKHRoaXMuX2ZyYW1lID09IDApIHRoaXMuYW5pbWF0aW9uRW5kZWQgPSB0cnVlXHJcbiAgfVxyXG4gIF9uZXh0RnJhbWUzKGZyYW1lRWxhcHNlKXtcclxuICAgIHRoaXMuX2ZyYW1lID0gKHRoaXMuX2ZyYW1lIC0gZnJhbWVFbGFwc2UpLm1vZCh0aGlzLmZyYW1lcy5sZW5ndGgpXHJcbiAgfVxyXG59XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9ncmFwaGljcy9BbmltYXRpb24uanMiLCJpbXBvcnQgTTMgZnJvbSAnLi4vbWF0aHMvTWF0MydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENhbWVyYXtcclxuICBjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0KXtcclxuICAgIHRoaXMueCA9IDBcclxuICAgIHRoaXMueSA9IDBcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aFxyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcclxuICAgIHRoaXMuem9vbSA9IDFcclxuICAgIHRoaXMucm90YXRpb24gPSAwXHJcbiAgICB0aGlzLm9mZnNldFggPSAwXHJcbiAgICB0aGlzLm9mZnNldFkgPSAwXHJcbiAgICB0aGlzLmNhbWVyYU1hdHJpeCA9IE0zLmlkZW50aXR5KClcclxuICB9XHJcblxyXG4gIHRyYW5zbGF0ZSh4LCB5KXtcclxuICAgIHRoaXMueCArPSB4XHJcbiAgICB0aGlzLnkgKz0geVxyXG4gIH1cclxuXHJcbiAgc2V0UG9zaXRpb24oeCwgeSl7XHJcbiAgICB0aGlzLnggPSB4XHJcbiAgICB0aGlzLnkgPSB5XHJcbiAgfVxyXG5cclxuICByb3RhdGUocm90YXRpb24pe1xyXG4gICAgdGhpcy5yb3RhdGlvbiArPSByb3RhdGlvblxyXG4gIH1cclxuXHJcbiAgc2V0Um90YXRpb24ocm90YXRpb24pe1xyXG4gICAgdGhpcy5yb3RhdGlvbiA9IHJvdGF0aW9uXHJcbiAgfVxyXG5cclxuICBzZXRab29tKHpvb20pe1xyXG4gICAgdGhpcy56b29tID0gem9vbVxyXG4gIH1cclxuXHJcbiAgc2V0T2Zmc2V0KG9mZnNldFgsIG9mZnNldFkpe1xyXG4gICAgdGhpcy5vZmZzZXRYID0gb2Zmc2V0WFxyXG4gICAgdGhpcy5vZmZzZXRZID0gb2Zmc2V0WVxyXG4gIH1cclxuXHJcbiAgdXBkYXRlKCl7XHJcbiAgICBsZXQgbWF0cml4ID0gTTMuaWRlbnRpdHkoKVxyXG4gICAgbWF0cml4ID0gTTMudHJhbnNsYXRlKG1hdHJpeCwgLSh0aGlzLnggLSAodGhpcy5vZmZzZXRYICogdGhpcy53aWR0aCkpLCAtKHRoaXMueSAtICh0aGlzLm9mZnNldFkgKiB0aGlzLmhlaWdodCkpKVxyXG5cclxuICAgIG1hdHJpeCA9IE0zLnRyYW5zbGF0ZShtYXRyaXgsIHRoaXMud2lkdGggKiB0aGlzLm9mZnNldFgsIHRoaXMuaGVpZ2h0ICogdGhpcy5vZmZzZXRZKVxyXG4gICAgbWF0cml4ID0gTTMucm90YXRlKG1hdHJpeCwgdGhpcy5yb3RhdGlvbiAqIChNYXRoLlBJLzE4MCkpXHJcbiAgICBtYXRyaXggPSBNMy5zY2FsZShtYXRyaXgsIHRoaXMuem9vbSwgdGhpcy56b29tKVxyXG4gICAgbWF0cml4ID0gTTMudHJhbnNsYXRlKG1hdHJpeCwgdGhpcy53aWR0aCAqIC10aGlzLm9mZnNldFgsIHRoaXMuaGVpZ2h0ICogLXRoaXMub2Zmc2V0WSlcclxuXHJcbiAgICB0aGlzLmNhbWVyYU1hdHJpeCA9IG1hdHJpeFxyXG4gIH1cclxuXHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL2dyYXBoaWNzL0NhbWVyYS5qcyIsImltcG9ydCBQb2x5Z29uIGZyb20gXCIuL1BvbHlnb25cIlxyXG5pbXBvcnQgVmVjdG9yMkQgZnJvbSBcIi4vVmVjdG9yMkRcIlxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgUG9seWdvbntcclxuICBjb25zdHJ1Y3Rvcih4LCB5LCB3aWR0aCwgaGVpZ2h0KXtcclxuICAgIHN1cGVyKFtuZXcgVmVjdG9yMkQoeCwgeSksIG5ldyBWZWN0b3IyRCh4LCB5ICsgaGVpZ2h0KSwgbmV3IFZlY3RvcjJEKHggKyB3aWR0aCwgeSArIGhlaWdodCksIG5ldyBWZWN0b3IyRCh4ICsgd2lkdGgsIHkpXSlcclxuICAgIHRoaXMud2lkdGggPSB3aWR0aFxyXG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcclxuICB9XHJcblxyXG4gIGdldE5vcm1hbHMoKXtcclxuICAgIHJldHVybiBbXHJcbiAgICAgIG5ldyBWZWN0b3IyRCh0aGlzLnZlcnRleHNbMF0ueCwgdGhpcy52ZXJ0ZXhzWzBdLnksIHRoaXMudmVydGV4c1sxXS54LCB0aGlzLnZlcnRleHNbMV0ueSksXHJcbiAgICAgIG5ldyBWZWN0b3IyRCh0aGlzLnZlcnRleHNbMV0ueCwgdGhpcy52ZXJ0ZXhzWzFdLnksIHRoaXMudmVydGV4c1syXS54LCB0aGlzLnZlcnRleHNbMl0ueSlcclxuICAgIF1cclxuICB9XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZW5kZXIvc3JjL21hdGhzL1JlY3RhbmdsZS5qcyIsImV4cG9ydCB7IGRlZmF1bHQgYXMgS2V5Ym9hcmRJbnB1dE1hbmFnZXIgfSBmcm9tIFwiLi9rZXlib2FyZC9LZXlib2FyZElucHV0TWFuYWdlclwiXHJcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW91c2VJbnB1dE1hbmFnZXIgfSBmcm9tIFwiLi9tb3VzZS9Nb3VzZUlucHV0TWFuYWdlclwiXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9pbnB1dC9pbmRleC5qcyIsImltcG9ydCBLRVlTIGZyb20gJy4vS2V5Ym9hcmRLZXlzJ1xyXG5cclxuY29uc3QgS2V5Ym9hcmRJbnB1dE1hbmFnZXIgPSB7XHJcbiAgS0VZUyxcclxuICBpbml0KCl7XHJcbiAgICB0aGlzLl9rZXlzID0gbmV3IEFycmF5KDI1NilcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI1NjsgKSB7XHJcbiAgICAgIHRoaXMuX2tleXNbaSsrXSA9IFtmYWxzZSwgZmFsc2VdXHJcbiAgICAgIHRoaXMuX2tleXNbaSsrXSA9IFtmYWxzZSwgZmFsc2VdXHJcbiAgICAgIHRoaXMuX2tleXNbaSsrXSA9IFtmYWxzZSwgZmFsc2VdXHJcbiAgICAgIHRoaXMuX2tleXNbaSsrXSA9IFtmYWxzZSwgZmFsc2VdXHJcblxyXG4gICAgICB0aGlzLl9rZXlzW2krK10gPSBbZmFsc2UsIGZhbHNlXVxyXG4gICAgICB0aGlzLl9rZXlzW2krK10gPSBbZmFsc2UsIGZhbHNlXVxyXG4gICAgICB0aGlzLl9rZXlzW2krK10gPSBbZmFsc2UsIGZhbHNlXVxyXG4gICAgICB0aGlzLl9rZXlzW2krK10gPSBbZmFsc2UsIGZhbHNlXVxyXG5cclxuICAgICAgdGhpcy5fa2V5c1tpKytdID0gW2ZhbHNlLCBmYWxzZV1cclxuICAgICAgdGhpcy5fa2V5c1tpKytdID0gW2ZhbHNlLCBmYWxzZV1cclxuICAgICAgdGhpcy5fa2V5c1tpKytdID0gW2ZhbHNlLCBmYWxzZV1cclxuICAgICAgdGhpcy5fa2V5c1tpKytdID0gW2ZhbHNlLCBmYWxzZV1cclxuXHJcbiAgICAgIHRoaXMuX2tleXNbaSsrXSA9IFtmYWxzZSwgZmFsc2VdXHJcbiAgICAgIHRoaXMuX2tleXNbaSsrXSA9IFtmYWxzZSwgZmFsc2VdXHJcbiAgICAgIHRoaXMuX2tleXNbaSsrXSA9IFtmYWxzZSwgZmFsc2VdXHJcbiAgICAgIHRoaXMuX2tleXNbaSsrXSA9IFtmYWxzZSwgZmFsc2VdXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZSA9PiB0aGlzLl9rZXlTZXQoZS5rZXlDb2RlLCB0cnVlKSlcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCBlID0+IHRoaXMuX2tleVNldChlLmtleUNvZGUsIGZhbHNlKSlcclxuICB9LFxyXG4gIHVwZGF0ZSgpe1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyNTY7ICkge1xyXG4gICAgICB0aGlzLl9rZXlzW2ldWzBdID0gdGhpcy5fa2V5c1tpKytdWzFdXHJcbiAgICAgIHRoaXMuX2tleXNbaV1bMF0gPSB0aGlzLl9rZXlzW2krK11bMV1cclxuICAgICAgdGhpcy5fa2V5c1tpXVswXSA9IHRoaXMuX2tleXNbaSsrXVsxXVxyXG4gICAgICB0aGlzLl9rZXlzW2ldWzBdID0gdGhpcy5fa2V5c1tpKytdWzFdXHJcblxyXG4gICAgICB0aGlzLl9rZXlzW2ldWzBdID0gdGhpcy5fa2V5c1tpKytdWzFdXHJcbiAgICAgIHRoaXMuX2tleXNbaV1bMF0gPSB0aGlzLl9rZXlzW2krK11bMV1cclxuICAgICAgdGhpcy5fa2V5c1tpXVswXSA9IHRoaXMuX2tleXNbaSsrXVsxXVxyXG4gICAgICB0aGlzLl9rZXlzW2ldWzBdID0gdGhpcy5fa2V5c1tpKytdWzFdXHJcblxyXG4gICAgICB0aGlzLl9rZXlzW2ldWzBdID0gdGhpcy5fa2V5c1tpKytdWzFdXHJcbiAgICAgIHRoaXMuX2tleXNbaV1bMF0gPSB0aGlzLl9rZXlzW2krK11bMV1cclxuICAgICAgdGhpcy5fa2V5c1tpXVswXSA9IHRoaXMuX2tleXNbaSsrXVsxXVxyXG4gICAgICB0aGlzLl9rZXlzW2ldWzBdID0gdGhpcy5fa2V5c1tpKytdWzFdXHJcblxyXG4gICAgICB0aGlzLl9rZXlzW2ldWzBdID0gdGhpcy5fa2V5c1tpKytdWzFdXHJcbiAgICAgIHRoaXMuX2tleXNbaV1bMF0gPSB0aGlzLl9rZXlzW2krK11bMV1cclxuICAgICAgdGhpcy5fa2V5c1tpXVswXSA9IHRoaXMuX2tleXNbaSsrXVsxXVxyXG4gICAgICB0aGlzLl9rZXlzW2ldWzBdID0gdGhpcy5fa2V5c1tpKytdWzFdXHJcbiAgICB9XHJcbiAgfSxcclxuICBtZXRob2RzOiB7XHJcbiAgICBfa2V5U2V0KGtleWNvZGUsIHZhbHVlKXtcclxuICAgICAgdGhpcy5fa2V5c1trZXljb2RlXVsxXSA9IHZhbHVlXHJcbiAgICB9LFxyXG4gICAgaXNLZXlKdXN0UHJlc3NlZChrZXljb2RlKXtcclxuICAgICAgcmV0dXJuICghdGhpcy5fa2V5c1trZXljb2RlXVswXSAmJiB0aGlzLl9rZXlzW2tleWNvZGVdWzFdKVxyXG4gICAgfSxcclxuICAgIGlzS2V5RG93bihrZXljb2RlKXtcclxuICAgICAgcmV0dXJuICh0aGlzLl9rZXlzW2tleWNvZGVdWzBdICYmIHRoaXMuX2tleXNba2V5Y29kZV1bMV0pXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBLZXlib2FyZElucHV0TWFuYWdlclxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlbmRlci9zcmMvaW5wdXQva2V5Ym9hcmQvS2V5Ym9hcmRJbnB1dE1hbmFnZXIuanMiLCJjb25zdCBLRVlTID0ge1xyXG5cclxuICBERUxFVEU6IDgsXHJcbiAgRU5URVI6MTMsXHJcbiAgU0hJRlQ6IDE2LFxyXG4gIENPTlRST0w6IDE3LFxyXG4gIEFUTDoxOCxcclxuICBTUEFDRUJBUjozMixcclxuXHJcbiAgTEVGVF9BUlJPVzogMzcsXHJcbiAgVVBfQVJST1c6IDM4LFxyXG4gIFJJR0hUX0FSUk9XOiAzOSxcclxuICBET1dOX0FSUk9XOiA0MCxcclxuXHJcbiAgTlVNQkVSXzA6IDQ4LFxyXG4gIE5VTUJFUl8xOiA0OSxcclxuICBOVU1CRVJfMjogNTAsXHJcbiAgTlVNQkVSXzM6IDUxLFxyXG4gIE5VTUJFUl80OiA1MixcclxuICBOVU1CRVJfNTogNTMsXHJcbiAgTlVNQkVSXzY6IDU0LFxyXG4gIE5VTUJFUl83OiA1NSxcclxuICBOVU1CRVJfODogNTYsXHJcbiAgTlVNQkVSXzk6IDU3LFxyXG5cclxuICBBOiA2NSxcclxuICBCOiA2NixcclxuICBDOiA2NyxcclxuICBEOiA2OCxcclxuICBFOiA2OSxcclxuICBGOiA3MCxcclxuICBHOiA3MSxcclxuICBIOiA3MixcclxuICBJOiA3MyxcclxuICBKOiA3NCxcclxuICBLOiA3NSxcclxuICBMOiA3NixcclxuICBNOiA3NyxcclxuICBOOiA3OCxcclxuICBPOiA3OSxcclxuICBQOiA4MCxcclxuICBROiA4MSxcclxuICBSOiA4MixcclxuICBTOiA4MyxcclxuICBUOiA4NCxcclxuICBVOiA4NSxcclxuICBWOiA4NixcclxuICBXOiA4NyxcclxuICBYOiA4OCxcclxuICBZOiA4OSxcclxuICBaOiA5MCxcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgS0VZU1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlbmRlci9zcmMvaW5wdXQva2V5Ym9hcmQvS2V5Ym9hcmRLZXlzLmpzIiwiaW1wb3J0IHsgVmVjdG9yMkQgfSBmcm9tICcuLi8uLi9tYXRocydcclxuaW1wb3J0IEJVVFRPTlMgZnJvbSAnLi9Nb3VzZUJ1dHRvbnMnXHJcblxyXG5jb25zdCBNb3VzZUlucHV0TWFuYWdlciA9IHtcclxuICBCVVRUT05TLFxyXG4gIGluaXQoKXtcclxuICAgIHRoaXMuX21vdXNlQnV0dG9ucyA9IFtcclxuICAgICAgW2ZhbHNlLCBmYWxzZV0sXHJcbiAgICAgIFtmYWxzZSwgZmFsc2VdLFxyXG4gICAgICBbZmFsc2UsIGZhbHNlXVxyXG4gICAgXVxyXG4gICAgdGhpcy5tb3VzZVBvc2l0aW9uID0gbmV3IFZlY3RvcjJEKDAsIDApXHJcblxyXG4gICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCBlID0+IHRoaXMuX2NsaWNrU2V0KGUuYnV0dG9uLCB0cnVlKSlcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXVwXCIsIGUgPT4gdGhpcy5fY2xpY2tTZXQoZS5idXR0b24sIGZhbHNlKSlcclxuICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgZSA9PiB0aGlzLl9tb3VzZU1vdmUoZS5wYWdlWCwgZS5wYWdlWSkpXHJcbiAgICAvL1RPRE9cclxuICAgIC8vdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcihcIndoZWVsXCIsIGUgPT4gdGhpcy5tb3VzZU1vdmUoZS5wYWdlWCwgZS5wYWdlWSkpXHJcbiAgfSxcclxuICB1cGRhdGUoKXtcclxuICAgIHRoaXMuX21vdXNlQnV0dG9uc1swXVswXSA9IHRoaXMuX21vdXNlQnV0dG9uc1swXVsxXVxyXG4gICAgdGhpcy5fbW91c2VCdXR0b25zWzFdWzBdID0gdGhpcy5fbW91c2VCdXR0b25zWzFdWzFdXHJcbiAgICB0aGlzLl9tb3VzZUJ1dHRvbnNbMl1bMF0gPSB0aGlzLl9tb3VzZUJ1dHRvbnNbMl1bMV1cclxuICB9LFxyXG4gIG1ldGhvZHM6e1xyXG4gICAgX21vdXNlTW92ZSh4LCB5KXtcclxuICAgICAgdGhpcy5tb3VzZVBvc2l0aW9uLnNldFBvc2l0aW9uKE1hdGgucm91bmQoKHggLSB0aGlzLmNhbnZhcy5vZmZzZXRMZWZ0KSAqICh0aGlzLmNhbnZhcy53aWR0aC90aGlzLmNhbnZhcy5vZmZzZXRXaWR0aCkpLCBNYXRoLnJvdW5kKCh5IC0gdGhpcy5jYW52YXMub2Zmc2V0VG9wKSAqICh0aGlzLmNhbnZhcy5oZWlnaHQvdGhpcy5jYW52YXMub2Zmc2V0SGVpZ2h0KSkpXHJcbiAgICB9LFxyXG4gICAgX2NsaWNrU2V0KGNsaWNrY29kZSwgdmFsdWUpe1xyXG4gICAgICB0aGlzLl9tb3VzZUJ1dHRvbnNbY2xpY2tjb2RlXVsxXSA9IHZhbHVlXHJcbiAgICB9LFxyXG4gICAgaXNKdXN0Q2xpY2tlZChjbGlja2NvZGUpe1xyXG4gICAgICByZXR1cm4gKCF0aGlzLl9tb3VzZUJ1dHRvbnNbY2xpY2tjb2RlXVswXSAmJiB0aGlzLl9tb3VzZUJ1dHRvbnNbY2xpY2tjb2RlXVsxXSlcclxuICAgIH0sXHJcbiAgICBpc0NsaWNrZWQoY2xpY2tjb2RlKXtcclxuICAgICAgcmV0dXJuICh0aGlzLl9tb3VzZUJ1dHRvbnNbY2xpY2tjb2RlXVswXSAmJiB0aGlzLl9tb3VzZUJ1dHRvbnNbY2xpY2tjb2RlXVsxXSlcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IE1vdXNlSW5wdXRNYW5hZ2VyXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcmVuZGVyL3NyYy9pbnB1dC9tb3VzZS9Nb3VzZUlucHV0TWFuYWdlci5qcyIsImNvbnN0IEJVVFRPTlMgPSB7XHJcbiAgTEVGVF9DTElDSzogMCxcclxuICBDRU5URVJfQ0xJQ0s6IDEsXHJcbiAgUklHSFRfQ0xJQ0s6IDJcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQlVUVE9OU1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3JlbmRlci9zcmMvaW5wdXQvbW91c2UvTW91c2VCdXR0b25zLmpzIiwiaW1wb3J0IE1hemUgZnJvbSBcIi4vTWF6ZVwiXHJcblxyXG5jb25zdCBDbGFzc2ljTWF6ZSA9IG5ldyBNYXplKFxyXG4gICAgW1xyXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuICAgICAgICBbMCwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwwLDAsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMF0sXHJcbiAgICAgICAgWzAsMiwwLDAsMCwwLDIsMCwwLDAsMCwwLDIsMCwwLDIsMCwwLDAsMCwwLDIsMCwwLDAsMCwyLDBdLFxyXG4gICAgICAgIFswLDMsMCwxLDEsMCwyLDAsMSwxLDEsMCwyLDAsMCwyLDAsMSwxLDEsMCwyLDAsMSwxLDAsMywwXSxcclxuICAgICAgICBbMCwyLDAsMCwwLDAsMiwwLDAsMCwwLDAsMiwwLDAsMiwwLDAsMCwwLDAsMiwwLDAsMCwwLDIsMF0sXHJcbiAgICAgICAgWzAsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDBdLFxyXG4gICAgICAgIFswLDIsMCwwLDAsMCwyLDAsMCwyLDAsMCwwLDAsMCwwLDAsMCwyLDAsMCwyLDAsMCwwLDAsMiwwXSxcclxuICAgICAgICBbMCwyLDAsMCwwLDAsMiwwLDAsMiwwLDAsMCwwLDAsMCwwLDAsMiwwLDAsMiwwLDAsMCwwLDIsMF0sXHJcbiAgICAgICAgWzAsMiwyLDIsMiwyLDIsMCwwLDIsMiwyLDIsMCwwLDIsMiwyLDIsMCwwLDIsMiwyLDIsMiwyLDBdLFxyXG4gICAgICAgIFswLDAsMCwwLDAsMCwyLDAsMCwwLDAsMCwxLDAsMCwxLDAsMCwwLDAsMCwyLDAsMCwwLDAsMCwwXSxcclxuICAgICAgICBbMSwxLDEsMSwxLDAsMiwwLDAsMCwwLDAsMSwwLDAsMSwwLDAsMCwwLDAsMiwwLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgWzEsMSwxLDEsMSwwLDIsMCwwLDEsMSwxLDEsMSwxLDEsMSwxLDEsMCwwLDIsMCwxLDEsMSwxLDFdLFxyXG4gICAgICAgIFsxLDEsMSwxLDEsMCwyLDAsMCwxLDAsMCwwLDEsMSwwLDAsMCwxLDAsMCwyLDAsMSwxLDEsMSwxXSxcclxuICAgICAgICBbMCwwLDAsMCwwLDAsMiwwLDAsMSwwLDEsMSwxLDEsMSwxLDAsMSwwLDAsMiwwLDAsMCwwLDAsMF0sXHJcbiAgICAgICAgWzEsMSwxLDEsMSwxLDIsMSwxLDEsMCwxLDEsMSwxLDEsMSwwLDEsMSwxLDIsMSwxLDEsMSwxLDFdLFxyXG4gICAgICAgIFswLDAsMCwwLDAsMCwyLDAsMCwxLDAsMSwxLDEsMSwxLDEsMCwxLDAsMCwyLDAsMCwwLDAsMCwwXSxcclxuICAgICAgICBbMSwxLDEsMSwxLDAsMiwwLDAsMSwwLDAsMCwwLDAsMCwwLDAsMSwwLDAsMiwwLDEsMSwxLDEsMV0sXHJcbiAgICAgICAgWzEsMSwxLDEsMSwwLDIsMCwwLDEsMSwxLDEsMSwxLDEsMSwxLDEsMCwwLDIsMCwxLDEsMSwxLDFdLFxyXG4gICAgICAgIFsxLDEsMSwxLDEsMCwyLDAsMCwxLDAsMCwwLDAsMCwwLDAsMCwxLDAsMCwyLDAsMSwxLDEsMSwxXSxcclxuICAgICAgICBbMCwwLDAsMCwwLDAsMiwwLDAsMSwwLDAsMCwwLDAsMCwwLDAsMSwwLDAsMiwwLDAsMCwwLDAsMF0sXHJcbiAgICAgICAgWzAsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMCwwLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDBdLFxyXG4gICAgICAgIFswLDIsMCwwLDAsMCwyLDAsMCwwLDAsMCwyLDAsMCwyLDAsMCwwLDAsMCwyLDAsMCwwLDAsMiwwXSxcclxuICAgICAgICBbMCwyLDAsMCwwLDAsMiwwLDAsMCwwLDAsMiwwLDAsMiwwLDAsMCwwLDAsMiwwLDAsMCwwLDIsMF0sXHJcbiAgICAgICAgWzAsMywyLDIsMCwwLDIsMiwyLDIsMiwyLDIsMSwxLDIsMiwyLDIsMiwyLDIsMCwwLDIsMiwzLDBdLFxyXG4gICAgICAgIFswLDAsMCwyLDAsMCwyLDAsMCwyLDAsMCwwLDAsMCwwLDAsMCwyLDAsMCwyLDAsMCwyLDAsMCwwXSxcclxuICAgICAgICBbMCwwLDAsMiwwLDAsMiwwLDAsMiwwLDAsMCwwLDAsMCwwLDAsMiwwLDAsMiwwLDAsMiwwLDAsMF0sXHJcbiAgICAgICAgWzAsMiwyLDIsMiwyLDIsMCwwLDIsMiwyLDIsMCwwLDIsMiwyLDIsMCwwLDIsMiwyLDIsMiwyLDBdLFxyXG4gICAgICAgIFswLDIsMCwwLDAsMCwwLDAsMCwwLDAsMCwyLDAsMCwyLDAsMCwwLDAsMCwwLDAsMCwwLDAsMiwwXSxcclxuICAgICAgICBbMCwyLDAsMCwwLDAsMCwwLDAsMCwwLDAsMiwwLDAsMiwwLDAsMCwwLDAsMCwwLDAsMCwwLDIsMF0sXHJcbiAgICAgICAgWzAsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDIsMiwyLDBdLFxyXG4gICAgICAgIFswLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwXSxcclxuICAgIF0sXHJcbiAgICBbXHJcbiAgICAgICAgW1sxLDFdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMSw2XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzEsMTJdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMSwxNV0sICdhdXRvJ10sXHJcbiAgICAgICAgW1sxLDIxXSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzEsMjZdLCAnYXV0byddLFxyXG4gICAgICAgIFtbNSwxXSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzUsNl0sICdhdXRvJ10sXHJcbiAgICAgICAgW1s1LDldLCAnYXV0byddLFxyXG4gICAgICAgIFtbNSwxMl0sICdhdXRvJ10sXHJcbiAgICAgICAgW1s1LDE1XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzUsMThdLCAnYXV0byddLFxyXG4gICAgICAgIFtbNSwyMV0sICdhdXRvJ10sXHJcbiAgICAgICAgW1s1LDI2XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzgsMV0sICdhdXRvJ10sXHJcbiAgICAgICAgW1s4LDZdLCAnYXV0byddLFxyXG4gICAgICAgIFtbOCw5XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzgsMTJdLCAnYXV0byddLFxyXG4gICAgICAgIFtbOCwxNV0sICdhdXRvJ10sXHJcbiAgICAgICAgW1s4LDE4XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzgsMjFdLCAnYXV0byddLFxyXG4gICAgICAgIFtbOCwyNl0sICdhdXRvJ10sXHJcbiAgICAgICAgW1sxMSw5XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzExLDEyXSwgWzEsM11dLFxyXG4gICAgICAgIFtbMTEsMTVdLCBbMSwzXV0sXHJcbiAgICAgICAgW1sxMSwxOF0sICdhdXRvJ10sXHJcbiAgICAgICAgW1sxNCw2XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzE0LDldLCAnYXV0byddLFxyXG4gICAgICAgIFtbMTQsMThdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMTQsMjFdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMTcsOV0sICdhdXRvJ10sXHJcbiAgICAgICAgW1sxNywxOF0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMCwxXSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzIwLDZdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMjAsOV0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMCwxMl0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMCwxNV0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMCwxOF0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMCwyMV0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMCwyNl0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMywxXSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzIzLDNdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMjMsNl0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMyw5XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzIzLDEyXSwgWzEsM11dLFxyXG4gICAgICAgIFtbMjMsMTVdLCBbMSwzXV0sXHJcbiAgICAgICAgW1syMywxOF0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMywyMV0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMywyNF0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syMywyNl0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syNiwxXSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzI2LDNdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMjYsNl0sICdhdXRvJ10sXHJcbiAgICAgICAgW1syNiw5XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzI2LDEyXSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzI2LDE1XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzI2LDE4XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzI2LDIxXSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzI2LDI0XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzI2LDI2XSwgJ2F1dG8nXSxcclxuICAgICAgICBbWzI5LDFdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMjksMTJdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMjksMTVdLCAnYXV0byddLFxyXG4gICAgICAgIFtbMjksMjZdLCAnYXV0byddLFxyXG4gICAgXSxcclxuICAgIHt4OiAxMy41LCB5OiAyNn0sXHJcbiAgICB7eDogMTMuNSwgeTogMTV9XHJcbilcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENsYXNzaWNNYXplXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL21hemUvQ2xhc3NpY01hemUuanMiLCJpbXBvcnQgeyBHZWFyLCBLZXlib2FyZCwgUmVjdGFuZ2xlIH0gZnJvbSAnLi4vLi4vcmVuZGVyJ1xyXG5pbXBvcnQgUGFjbWFuIGZyb20gJy4uL1BhY21hbidcclxuaW1wb3J0IE1hemUgZnJvbSAnLi4vbWF6ZS9NYXplJ1xyXG5pbXBvcnQgUmVkUGhhbnRvbSBmcm9tICcuL1JlZFBoYW50b20nO1xyXG5pbXBvcnQgUGlua1BoYW50b20gZnJvbSAnLi9QaW5rUGhhbnRvbSc7XHJcbmltcG9ydCBCbHVlUGhhbnRvbSBmcm9tICcuL0JsdWVQaGFudG9tJztcclxuaW1wb3J0IE9yYW5nZVBoYW50b20gZnJvbSAnLi9PcmFuZ2VQaGFudG9tJztcclxuXHJcbmNvbnN0IFBhY21hbkVudGl0eSA9IG5ldyBHZWFyKHtcclxuICAgIGluaXQoKXtcclxuICAgICAgICB0aGlzLmZyYW1lID0gUGFjbWFuLkdMT0JBTFMudGlsZXNldFsxXVxyXG5cclxuICAgICAgICB0aGlzLnggPSBQYWNtYW4uR0xPQkFMUy5tYXplLnBhY21hblNwYXduLnhcclxuICAgICAgICB0aGlzLnkgPSBQYWNtYW4uR0xPQkFMUy5tYXplLnBhY21hblNwYXduLnlcclxuICAgICAgICB0aGlzLnhSb3VuZGVkID0gUGFjbWFuLkdMT0JBTFMubWF6ZS5wYWNtYW5TcGF3bi54XHJcbiAgICAgICAgdGhpcy55Um91bmRlZCA9IFBhY21hbi5HTE9CQUxTLm1hemUucGFjbWFuU3Bhd24ueVxyXG5cclxuICAgICAgICB0aGlzLnYgPSA1XHJcblxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gUGFjbWFuLkdMT0JBTFMuTEVGVFxyXG4gICAgICAgIHRoaXMubmV4dERpcmVjdGlvbiA9IFBhY21hbi5HTE9CQUxTLkxFRlRcclxuICAgIH0sXHJcbiAgICB1cGRhdGUoKXtcclxuICAgICAgICBjb25zdCBwcmV2WCA9IHRoaXMueFxyXG4gICAgICAgIGNvbnN0IHByZXZZID0gdGhpcy55XHJcblxyXG4gICAgICAgIGlmKFBhY21hbi5pbnB1dC5pc0tleURvd24oS2V5Ym9hcmQuS0VZUy5VUF9BUlJPVykpIHRoaXMubmV4dERpcmVjdGlvbiA9IFBhY21hbi5HTE9CQUxTLlVQXHJcbiAgICAgICAgZWxzZSBpZihQYWNtYW4uaW5wdXQuaXNLZXlEb3duKEtleWJvYXJkLktFWVMuRE9XTl9BUlJPVykpIHRoaXMubmV4dERpcmVjdGlvbiA9IFBhY21hbi5HTE9CQUxTLkRPV05cclxuICAgICAgICBlbHNlIGlmKFBhY21hbi5pbnB1dC5pc0tleURvd24oS2V5Ym9hcmQuS0VZUy5MRUZUX0FSUk9XKSkgdGhpcy5uZXh0RGlyZWN0aW9uID0gUGFjbWFuLkdMT0JBTFMuTEVGVFxyXG4gICAgICAgIGVsc2UgaWYoUGFjbWFuLmlucHV0LmlzS2V5RG93bihLZXlib2FyZC5LRVlTLlJJR0hUX0FSUk9XKSkgdGhpcy5uZXh0RGlyZWN0aW9uID0gUGFjbWFuLkdMT0JBTFMuUklHSFRcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKClcclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmNoZWNrRW50aXR5Q29saXNpb24oKVxyXG4gICAgfSxcclxuICAgIHJlbmRlcihzYil7XHJcbiAgICAgICAgc2IuZHJhd1RleHR1cmUodGhpcy5mcmFtZSwgdGhpcy54Um91bmRlZCo4LCB0aGlzLnlSb3VuZGVkKjgpXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczp7XHJcbiAgICAgICAgdXBkYXRlUG9zaXRpb24oKXtcclxuXHJcbiAgICAgICAgICAgIGlmKCh0aGlzLmRpcmVjdGlvbiArIHRoaXMubmV4dERpcmVjdGlvbiklMiA9PSAwKSB0aGlzLmRpcmVjdGlvbiA9IHRoaXMubmV4dERpcmVjdGlvblxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgbGV0IG1vdmVtZW50ID0gdGhpcy52ICogUGFjbWFuLmRlbHRhVGltZVxyXG4gICAgICAgICAgICBpZihtb3ZlbWVudCA+IDAuMSkgbW92ZW1lbnQgPSAwLjFcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uID09IFBhY21hbi5HTE9CQUxTLlVQKSB0aGlzLnkgLT0gbW92ZW1lbnRcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmRpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5SSUdIVCkgdGhpcy54ICs9IG1vdmVtZW50XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuRE9XTikgdGhpcy55ICs9IG1vdmVtZW50XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuTEVGVCkgdGhpcy54IC09IG1vdmVtZW50XHJcblxyXG4gICAgICAgICAgICB0aGlzLmZpeFBvc2l0aW9uKClcclxuXHJcbiAgICAgICAgICAgIHRoaXMueFJvdW5kZWQgPSBNYXRoLnJvdW5kKHRoaXMueCAqIDEwKSAvIDEwXHJcbiAgICAgICAgICAgIHRoaXMueVJvdW5kZWQgPSBNYXRoLnJvdW5kKHRoaXMueSAqIDEwKSAvIDEwXHJcblxyXG4gICAgICAgICAgICB0aGlzLmNoYW5nZURpcmVjdGlvbigpXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGFuZ2VEaXJlY3Rpb24oKXtcclxuICAgICAgICAgICAgY29uc3Qge2ksan0gPSB0aGlzLmdldFRpbGUoKVxyXG5cclxuICAgICAgICAgICAgaWYoUGFjbWFuLkdMT0JBTFMubWF6ZS5jb25zdW1lQmFsbChpLGopID09IDMpIHRoaXMuJGVtaXQoJ2VudGVyUGFuaWMnKVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy5kaXJlY3Rpb24gPT0gdGhpcy5uZXh0RGlyZWN0aW9uKSByZXR1cm5cclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMubmV4dERpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5VUCAmJiBQYWNtYW4uR0xPQkFMUy5tYXplLmxheW91dFtpLTFdW2pdID4gMCAmJiB0aGlzLnhSb3VuZGVkICUgMSA8PSAwLjMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gTWF0aC5mbG9vcih0aGlzLngpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMubmV4dERpcmVjdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5uZXh0RGlyZWN0aW9uID09IFBhY21hbi5HTE9CQUxTLlJJR0hUICYmIFBhY21hbi5HTE9CQUxTLm1hemUubGF5b3V0W2ldW2orMV0gPiAwICYmIHRoaXMueVJvdW5kZWQgJSAxIDw9IDAuMyl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSBNYXRoLmZsb29yKHRoaXMueSlcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gdGhpcy5uZXh0RGlyZWN0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLm5leHREaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuRE9XTiAmJiBQYWNtYW4uR0xPQkFMUy5tYXplLmxheW91dFtpKzFdW2pdID4gMCAmJiB0aGlzLnhSb3VuZGVkICUgMSA8PSAwLjMpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gTWF0aC5mbG9vcih0aGlzLngpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IHRoaXMubmV4dERpcmVjdGlvblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5uZXh0RGlyZWN0aW9uID09IFBhY21hbi5HTE9CQUxTLkxFRlQgJiYgUGFjbWFuLkdMT0JBTFMubWF6ZS5sYXlvdXRbaV1bai0xXSA+IDAgJiYgdGhpcy55Um91bmRlZCAlIDEgPD0gMC4zKXtcclxuICAgICAgICAgICAgICAgIHRoaXMueSA9IE1hdGguZmxvb3IodGhpcy55KVxyXG4gICAgICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSB0aGlzLm5leHREaXJlY3Rpb25cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZpeFBvc2l0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnN0IHtpLGp9ID0gdGhpcy5nZXRUaWxlKClcclxuXHJcbiAgICAgICAgICAgIGlmKHRoaXMuZGlyZWN0aW9uID09IFBhY21hbi5HTE9CQUxTLlVQICYmIFBhY21hbi5HTE9CQUxTLm1hemUubGF5b3V0W2ldW2pdID09IE1hemUuQkxPQ0tTLldBTEwpIHRoaXMueSA9IE1hdGguY2VpbCh0aGlzLnkpXHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuUklHSFQgJiYgUGFjbWFuLkdMT0JBTFMubWF6ZS5sYXlvdXRbaV1baisxXSA9PSBNYXplLkJMT0NLUy5XQUxMKSB0aGlzLnggPSBNYXRoLmZsb29yKHRoaXMueClcclxuICAgICAgICAgICAgZWxzZSBpZih0aGlzLmRpcmVjdGlvbiA9PSBQYWNtYW4uR0xPQkFMUy5ET1dOICYmIFBhY21hbi5HTE9CQUxTLm1hemUubGF5b3V0W2krMV1bal0gPT0gTWF6ZS5CTE9DS1MuV0FMTCkgdGhpcy55ID0gTWF0aC5mbG9vcih0aGlzLnkpXHJcbiAgICAgICAgICAgIGVsc2UgaWYodGhpcy5kaXJlY3Rpb24gPT0gUGFjbWFuLkdMT0JBTFMuTEVGVCAmJiBQYWNtYW4uR0xPQkFMUy5tYXplLmxheW91dFtpXVtqXSA9PSBNYXplLkJMT0NLUy5XQUxMKSB0aGlzLnggPSBNYXRoLmNlaWwodGhpcy54KVxyXG5cclxuICAgICAgICAgICAgaWYodGhpcy54IDwgLTEpIHRoaXMueCA9IDI4XHJcbiAgICAgICAgICAgIGlmKHRoaXMueCA+IDI4KSB0aGlzLnggPSAtMVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0VGlsZSgpe1xyXG4gICAgICAgICAgICByZXR1cm4ge2k6TWF0aC5mbG9vcih0aGlzLnkgLSAzKSwgajogTWF0aC5mbG9vcih0aGlzLngpfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29sbGlkZXMoZW50aXR5KXtcclxuICAgICAgICAgICAgaWYoXHJcbiAgICAgICAgICAgICAgICAodGhpcy54ICsgMSA+PSBlbnRpdHkueCAmJiBlbnRpdHkueCArMSA+PSB0aGlzLngpICYmXHJcbiAgICAgICAgICAgICAgICAodGhpcy55ICsgMSA+PSBlbnRpdHkueSAmJiBlbnRpdHkueSArMSA+PSB0aGlzLnkpXHJcbiAgICAgICAgICAgICkgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjaGVja0VudGl0eUNvbGlzaW9uKCl7XHJcbiAgICAgICAgICAgIGlmKHRoaXMuY29sbGlkZXMoUmVkUGhhbnRvbSkpIFJlZFBoYW50b20ub25QYWNtYW5Db2xsaXNpb24oKVxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbGxpZGVzKFBpbmtQaGFudG9tKSkgUGlua1BoYW50b20ub25QYWNtYW5Db2xsaXNpb24oKVxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbGxpZGVzKEJsdWVQaGFudG9tKSkgQmx1ZVBoYW50b20ub25QYWNtYW5Db2xsaXNpb24oKVxyXG4gICAgICAgICAgICBpZih0aGlzLmNvbGxpZGVzKE9yYW5nZVBoYW50b20pKSBPcmFuZ2VQaGFudG9tLm9uUGFjbWFuQ29sbGlzaW9uKClcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNvZnRSZXNldCgpe1xyXG4gICAgICAgICAgICB0aGlzLnggPSBQYWNtYW4uR0xPQkFMUy5tYXplLnBhY21hblNwYXduLnhcclxuICAgICAgICAgICAgdGhpcy55ID0gUGFjbWFuLkdMT0JBTFMubWF6ZS5wYWNtYW5TcGF3bi55XHJcbiAgICAgICAgICAgIHRoaXMueFJvdW5kZWQgPSBQYWNtYW4uR0xPQkFMUy5tYXplLnBhY21hblNwYXduLnhcclxuICAgICAgICAgICAgdGhpcy55Um91bmRlZCA9IFBhY21hbi5HTE9CQUxTLm1hemUucGFjbWFuU3Bhd24ueVxyXG5cclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBQYWNtYW4uR0xPQkFMUy5MRUZUXHJcbiAgICAgICAgICAgIHRoaXMubmV4dERpcmVjdGlvbiA9IFBhY21hbi5HTE9CQUxTLkxFRlRcclxuICAgICAgICB9LFxyXG4gICAgfVxyXG59KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgUGFjbWFuRW50aXR5XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VudGl0aWVzL1BhY21hbkVudGl0eS5qcyJdLCJzb3VyY2VSb290IjoiIn0=