/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/main.js":
/*!******************************!*\
  !*** ./resources/js/main.js ***!
  \******************************/
/***/ (() => {

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var _wp$components = wp.components,
  PanelBody = _wp$components.PanelBody,
  PanelRow = _wp$components.PanelRow,
  TextControl = _wp$components.TextControl,
  Popover = _wp$components.Popover,
  Button = _wp$components.Button,
  CheckboxControl = _wp$components.CheckboxControl,
  withSpokenMessages = _wp$components.withSpokenMessages;
var _wp$i18n = wp.i18n,
  __ = _wp$i18n.__,
  _x = _wp$i18n._x;
var _window$wp$richText = window.wp.richText,
  registerFormatType = _window$wp$richText.registerFormatType,
  getActiveFormat = _window$wp$richText.getActiveFormat,
  applyFormat = _window$wp$richText.applyFormat,
  toggleFormat = _window$wp$richText.toggleFormat,
  removeFormat = _window$wp$richText.removeFormat;
var _wp$element = wp.element,
  Fragment = _wp$element.Fragment,
  Component = _wp$element.Component;
var _window$wp$editor = window.wp.editor,
  InspectorControls = _window$wp$editor.InspectorControls,
  BlockControls = _window$wp$editor.BlockControls,
  MediaUpload = _window$wp$editor.MediaUpload,
  RichText = _window$wp$editor.RichText,
  AlignmentToolbar = _window$wp$editor.AlignmentToolbar,
  PanelColorSettings = _window$wp$editor.PanelColorSettings,
  RichTextToolbarButton = _window$wp$editor.RichTextToolbarButton;
registerFormatType('mtm/link', {
  title: __('Datalayer Link', 'metronet-tag-manager'),
  tagName: 'a',
  attributes: {
    url: 'href',
    title: 'title',
    id: 'id',
    "class": 'class',
    target: 'target',
    onclick: 'onclick',
    data_param: 'data-param',
    data_value: 'data-value'
  },
  className: 'mtm-dl-link',
  edit: withSpokenMessages( /*#__PURE__*/function (_Component) {
    _inherits(MTMDLEdit, _Component);
    var _super = _createSuper(MTMDLEdit);
    function MTMDLEdit() {
      var _this;
      _classCallCheck(this, MTMDLEdit);
      _this = _super.apply(this, arguments);
      _defineProperty(_assertThisInitialized(_this), "onClick", function () {
        if (_this.props.isActive) {
          _this.props.onChange(removeFormat(_this.props.value, 'mtm/link'));
          return;
        }
        if (_this.props.value.start == _this.props.value.end && !_this.props.isActive) {
          _this.setState({
            modal: false
          });
          return;
        }
        var url = '';
        var title = '';
        var id = '';
        var classname = '';
        var dlparameter = '';
        var dlvalue = '';
        if (_this.state.modal == false || _this.props.isActive) {
          var format = getActiveFormat(_this.props.value, 'mtm/link');
          if (undefined != format) {
            url = format.attributes.url;
            title = format.attributes.title;
            id = format.attributes.id;
            classname = format.attributes["class"];
            dlparameter = format.attributes.data_param;
            dlvalue = format.attributes.data_value;
          }
          _this.setState({
            modal: true,
            url: url,
            title: title,
            id: id,
            classname: classname,
            dlparameter: dlparameter,
            dlvalue: dlvalue
          });
        } else {
          _this.setState({
            modal: false,
            url: url,
            title: title,
            id: id,
            classname: classname,
            dlparameter: dlparameter,
            dlvalue: dlvalue
          });
        }
      });
      _defineProperty(_assertThisInitialized(_this), "onURLChange", function (text) {
        _this.setState({
          url: text
        });
      });
      _defineProperty(_assertThisInitialized(_this), "onTitleChange", function (text) {
        _this.setState({
          title: text
        });
      });
      _defineProperty(_assertThisInitialized(_this), "onCancel", function () {
        _this.setState({
          modal: false
        });
      });
      _defineProperty(_assertThisInitialized(_this), "onSave", function () {
        _this.props.onChange(applyFormat(_this.props.value, {
          type: 'mtm/link',
          attributes: {
            url: _this.state.url,
            title: _this.state.title,
            id: _this.state.id,
            "class": _this.state.classname,
            target: 'none' == _this.state.target ? '' : _this.state.target,
            data_param: _this.state.dlparameter,
            data_value: _this.state.dlvalue,
            onclick: "dataLayer.push({'".concat(_this.state.dlparameter, "':'").concat(_this.state.dlvalue, "'})")
          }
        }));
      });
      _defineProperty(_assertThisInitialized(_this), "onIDChange", function (text) {
        _this.setState({
          id: text
        });
      });
      _defineProperty(_assertThisInitialized(_this), "onClassChange", function (text) {
        _this.setState({
          classname: text
        });
      });
      _defineProperty(_assertThisInitialized(_this), "onTargetChange", function (checked) {
        if (checked) {
          _this.setState({
            target: '_blank'
          });
        } else {
          _this.setState({
            target: 'none'
          });
        }
      });
      _defineProperty(_assertThisInitialized(_this), "onDLParameterChange", function (text) {
        _this.setState({
          dlparameter: text
        });
      });
      _defineProperty(_assertThisInitialized(_this), "onDLValueChange", function (text) {
        _this.setState({
          dlvalue: text
        });
      });
      _defineProperty(_assertThisInitialized(_this), "onEdit", function () {
        var format = getActiveFormat(_this.props.value, 'mtm/link');
        if (undefined !== format) {
          var url = format.attributes.url != _this.state.url && '' == _this.state.url ? format.attributes.url : _this.state.url;
          var title = format.attributes.title != _this.state.title && '' == _this.state.title ? format.attributes.title : _this.state.title;
          var classname = format.attributes["class"] != _this.state.classname && '' == _this.state.classname ? format.attributes["class"] : _this.state.classname;
          var id = format.attributes.id != _this.state.id && '' == _this.state.id ? format.attributes.id : _this.state.id;
          var target = format.attributes.target != _this.state.target && '' == _this.state.target ? format.attributes.target : _this.state.target;
          var dlparameter = format.attributes.data_param != _this.state.dlparameter && '' == _this.state.dlparameter ? format.attributes.data_param : _this.state.dlparameter;
          var dlvalue = format.attributes.data_value != _this.state.dlvalue && '' == _this.state.dlvalue ? format.attributes.data_value : _this.state.dlvalue;
          _this.setState = {
            url: url,
            title: title,
            classname: classname,
            id: id,
            target: target,
            dlparameter: dlparameter,
            dlvalue: dlvalue
          };
          _this.props.onChange(applyFormat(_this.props.value, {
            type: 'mtm/link',
            attributes: {
              url: url,
              title: title,
              id: id,
              "class": classname,
              target: 'none' == target ? '' : target,
              data_value: dlvalue,
              data_param: dlparameter,
              onclick: "dataLayer.push({'".concat(dlparameter, "':'").concat(dlvalue, "'})")
            }
          }));
        }
      });
      _defineProperty(_assertThisInitialized(_this), "onRemove", function () {
        _this.props.onChange(removeFormat(_this.props.value, 'mtm/link'));
        _this.setState({
          modal: false
        });
        return;
      });
      _this.state = {
        modal: false,
        url: '',
        title: '',
        id: '',
        classname: '',
        target: '',
        dlparameter: '',
        dlvalue: ''
      };
      return _this;
    }
    _createClass(MTMDLEdit, [{
      key: "render",
      value: function render() {
        var _this2 = this;
        var isActive = this.props.isActive;
        var format = getActiveFormat(this.props.value, 'mtm/link');
        var renderModal = false;
        if (this.state.modal && this.props.value.start != this.props.value.end || isActive && undefined !== format) {
          renderModal = true;
        } else {
          renderModal = false;
        }
        var url = '';
        var title = '';
        var classname = '';
        var id = '';
        var target = '';
        var dlvalue = '';
        var dlparameter = '';
        if (undefined !== format && this.props.isActive) {
          url = format.attributes.url != this.state.url && '' == this.state.url ? format.attributes.url : this.state.url;
          title = format.attributes.title != this.state.title && '' == this.state.title ? format.attributes.title : this.state.title;
          classname = format.attributes["class"] != this.state.classname && '' == this.state.classname ? format.attributes["class"] : this.state.classname;
          id = format.attributes.id != this.state.id && '' == this.state.id ? format.attributes.id : this.state.id;
          target = format.attributes.target != this.state.target && '' == this.state.target ? format.attributes.target : this.state.target;
          dlvalue = format.attributes.data_value != this.state.dlvalue && '' == this.state.dlvalue ? format.attributes.data_value : this.state.dlvalue;
          dlparameter = format.attributes.data_param != this.state.dlparameter && '' == this.state.dlparameter ? format.attributes.data_param : this.state.dlparameter;
        } else {
          url = this.state.url;
          title = this.state.title;
          id = this.state.id;
          classname = this.state.classname;
          target = this.state.target;
          dlvalue = this.state.dlvalue;
          dlparameter = this.state.dlparameter;
        }
        return /*#__PURE__*/React.createElement(Fragment, null, false === this.props.isActive && /*#__PURE__*/React.createElement(RichTextToolbarButton, {
          icon: /*#__PURE__*/React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24"
          }, /*#__PURE__*/React.createElement("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
          }), /*#__PURE__*/React.createElement("path", {
            d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
          })),
          title: __('Datalayer Link', 'metronet-tag-manager'),
          onClick: this.onClick
        }), true === this.props.isActive && /*#__PURE__*/React.createElement(RichTextToolbarButton, {
          icon: /*#__PURE__*/React.createElement("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            style: {
              backgroundColor: '#555d66',
              color: '#FFFFFF'
            },
            viewBox: "0 0 24 24"
          }, /*#__PURE__*/React.createElement("path", {
            d: "M0 0h24v24H0z",
            fill: "none"
          }), /*#__PURE__*/React.createElement("path", {
            d: "M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"
          })),
          title: __('Datalayer Link', 'metronet-tag-manager'),
          onClick: this.onClick
        }), renderModal && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Popover, {
          position: "top",
          noArrow: true
        }, /*#__PURE__*/React.createElement("div", {
          className: "mtm-datalayer-input"
        }, /*#__PURE__*/React.createElement("h2", null, __('Datalayer Variables', 'metronet-tag-manager')), /*#__PURE__*/React.createElement(TextControl, {
          label: __('Enter Title', 'metronet-tag-manager'),
          value: title,
          onChange: function onChange(text) {
            return _this2.onTitleChange(text);
          }
        }), /*#__PURE__*/React.createElement(TextControl, {
          label: __('Enter URL', 'metronet-tag-manager'),
          value: url,
          onChange: function onChange(text) {
            return _this2.onURLChange(text);
          }
        }), /*#__PURE__*/React.createElement(TextControl, {
          label: __('Enter ID', 'metronet-tag-manager'),
          value: id,
          onChange: function onChange(text) {
            return _this2.onIDChange(text);
          }
        }), /*#__PURE__*/React.createElement(TextControl, {
          label: __('Enter Class Name', 'metronet-tag-manager'),
          value: classname,
          onChange: function onChange(text) {
            return _this2.onClassChange(text);
          }
        }), /*#__PURE__*/React.createElement(CheckboxControl, {
          label: __('Open in new window', 'metronet-tag-manager'),
          checked: target == '_blank' ? true : false,
          onChange: function onChange(checked) {
            return _this2.onTargetChange(checked);
          }
        }), /*#__PURE__*/React.createElement(TextControl, {
          label: __('Datalayer Parameter', 'metronet-tag-manager'),
          value: dlparameter,
          onChange: function onChange(text) {
            return _this2.onDLParameterChange(text);
          }
        }), /*#__PURE__*/React.createElement(TextControl, {
          label: __('Datalayer Value', 'metronet-tag-manager'),
          value: dlvalue,
          onChange: function onChange(text) {
            return _this2.onDLValueChange(text);
          }
        }), !isActive && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Button, {
          isPrimary: false,
          isSmall: true,
          onClick: this.onCancel
        }, __('Cancel', 'metronet-tag-manager')), /*#__PURE__*/React.createElement(Button, {
          className: "alignright",
          isPrimary: true,
          isSmall: true,
          onClick: this.onSave
        }, __('Save', 'metronet-tag-manager'))), isActive && /*#__PURE__*/React.createElement(Fragment, null, /*#__PURE__*/React.createElement(Button, {
          isPrimary: false,
          isSmall: true,
          onClick: this.onRemove
        }, __('Remove', 'metronet-tag-manager')), /*#__PURE__*/React.createElement(Button, {
          className: "alignright",
          isPrimary: true,
          isSmall: true,
          onClick: this.onEdit
        }, __('Edit', 'metronet-tag-manager')))))));
      }
    }]);
    return MTMDLEdit;
  }(Component))
});

/***/ }),

/***/ "./resources/css/gutenberg.scss":
/*!**************************************!*\
  !*** ./resources/css/gutenberg.scss ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/src/js/gutenberg/main": 0,
/******/ 			"src/css/gutenberg": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkMetronet"] = self["webpackChunkMetronet"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["src/css/gutenberg"], () => (__webpack_require__("./resources/js/main.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["src/css/gutenberg"], () => (__webpack_require__("./resources/css/gutenberg.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;