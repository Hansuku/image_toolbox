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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../index.js":
/*!*******************!*\
  !*** ../index.js ***!
  \*******************/
/*! exports provided: base64ToBlob, imgFileToBase64, base64ToFile, imgCompress */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64ToBlob", function() { return base64ToBlob; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imgFileToBase64", function() { return imgFileToBase64; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "base64ToFile", function() { return base64ToFile; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "imgCompress", function() { return imgCompress; });
/**
 * base64 to blob
 *
 * @export
 * @param {string} urlData
 * @returns {Blob}
 */
function base64ToBlob(urlData) {
  var arr = urlData.split(',');
  var mime = arr[0].match(/:(.*?);/)[1] || 'image/png';
  var bytes = window.atob(arr[1]);
  var ab = new ArrayBuffer(bytes.length);
  var ia = new Uint8Array(ab);

  for (var i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }

  return new Blob([ab], {
    type: mime
  });
}
/**
 * img file to base64
 *
 * @export
 * @param {*} file input's select file
 * @returns Promise
 */

function imgFileToBase64(file) {
  return new Promise(function (resolve, reject) {
    try {
      var reader = new FileReader();

      reader.onload = function (e) {
        var base64Img = e.target.result;
        resolve(base64Img);
      };

      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
}
/**
 * base64 to file
 * @param dataurl  base64 Code
 * @param filename  file name
 * @returns {File}
 */

function base64ToFile(dataurl, filename) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, {
    type: mime
  });
}
/**
 *
 *
 * @export
 * @param mode Picture compression mode:auto(Compression in equal proportion to maximum width or height) width(Compression by width) height(Compression by height)
 * @param dataSrouce Data srouce, passing:image/base64/canvas/img file
 * @param dataSrouceType Data srouce type: image/base64/canvas/file
 * @param maxWidth Maximum width of compression,default: 1080
 * @param maxHeight Maximum height of compression,default: 1080
 * @param quality Picture output quality;Range of values: 0-1 ;default: 0.92;It's useing canvas function:toDataUrl;
 * @returns Promise
 */

function imgCompress(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "auto" : _ref$mode,
      dataSrouce = _ref.dataSrouce,
      dataSrouceType = _ref.dataSrouceType,
      _ref$maxWidth = _ref.maxWidth,
      maxWidth = _ref$maxWidth === void 0 ? 0 : _ref$maxWidth,
      _ref$maxHeight = _ref.maxHeight,
      maxHeight = _ref$maxHeight === void 0 ? 0 : _ref$maxHeight,
      _ref$quality = _ref.quality,
      quality = _ref$quality === void 0 ? 0.92 : _ref$quality;

  /**
   * draw canvas
   *
   * @param {*} img
   * @param {*} offsetWidth
   * @param {*} offsetHeight
   * @param {*} realWidth
   * @param {*} realHeight
   * @returns
   */
  var _drawToCanvas = function _drawToCanvas(img, offsetWidth, offsetHeight, realWidth, realHeight) {
    return new Promise(function (resolve, reject) {
      try {
        var canvas = document.createElement("canvas");
        canvas.width = offsetWidth;
        canvas.height = offsetHeight;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, realWidth, realHeight, 0, 0, offsetWidth, offsetHeight);
        var base64str = canvas.toDataURL("image/jpeg", quality);
        resolve(base64str);
      } catch (err) {
        reject(err);
      }
    });
  };
  /**
   * check img compress size
   *
   * @param {*} img
   * @returns
   */


  var _getResizeSizeImg = function _getResizeSizeImg(img) {
    var originImgWidth = img.width;
    var originImgHeight = img.height;
    var percentScale = parseFloat(originImgWidth / originImgHeight);

    if (originImgWidth <= 1800 && originImgHeight <= 1800) {
      return {
        width: originImgWidth,
        height: originImgHeight
      };
    }

    if (mode == "auto") {
      var autoWidth = maxWidth == 0 ? 1800 : maxWidth;
      var autoHeight = maxHeight == 0 ? 1800 : maxHeight;
      var sizeByMaxWidth = {
        width: autoWidth,
        height: parseInt(autoWidth / percentScale)
      };
      var sizeByMaxHeight = {
        width: parseInt(autoHeight / percentScale),
        height: autoHeight
      };

      if (sizeByMaxHeight.height <= maxWidth) {
        return sizeByMaxHeight;
      }

      return sizeByMaxWidth;
    } else if (mode == "width") {
      if (originImgWidth <= maxWidth) {
        return {
          originImgWidth: originImgWidth,
          originImgHeight: originImgHeight
        };
      }

      var _autoWidth = maxWidth == 0 ? 1800 : maxWidth;

      var _sizeByMaxWidth = {
        width: _autoWidth,
        height: parseInt(_autoWidth / percentScale)
      };
      return _sizeByMaxWidth;
    } else {
      if (originImgHeight <= maxHeight) {
        return {
          originImgWidth: originImgWidth,
          originImgHeight: originImgHeight
        };
      }

      var _autoWidth2 = maxHeight == 0 ? 1800 : maxHeight;

      var _sizeByMaxHeight = {
        width: parseInt(_autoWidth2 / percentScale),
        height: maxHeight
      };
      return _sizeByMaxHeight;
    }
  };

  return new Promise(function (resolve, reject) {
    var originImage = new Image();

    originImage.onload = function () {
      var finalSize = _getResizeSizeImg(originImage);

      console.log(finalSize);

      _drawToCanvas(originImage, finalSize.width, finalSize.height, originImage.width, originImage.height).then(function (res) {
        resolve(res);
      })["catch"](function (err) {
        reject(err);
      });
    }; // switch all external incoming types to Base64


    if (dataSrouceType == "img" || dataSrouceType == "image") {
      console.log(dataSrouce);
      originImage.src = dataSrouce.src;
    } else if (dataSrouceType == "base64") {
      originImage.src = dataSrouce;
    } else if (dataSrouceType == "canvas") {
      originImage.src = dataSrouce.toDataUrl("image/jpeg");
    } else if (dataSrouceType == "file") {
      imgFileToBase64(dataSrouce).then(function (res) {
        originImage.src = res;
      })["catch"](function (err) {
        throw err;
      });
    } else {
      console.log('unknow type:' + dataSrouceType);
      reject('unknow type:' + dataSrouceType);
    }
  });
}

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../index */ "../index.js");

var inputFile = document.getElementById('input');
inputFile.addEventListener('change', function () {
  Object(_index__WEBPACK_IMPORTED_MODULE_0__["imgFileToBase64"])(inputFile.files[0]).then(function (res) {
    var base64Instant = document.getElementById('imgFileToBase64');
    base64Instant.innerText = res;
    console.log({
      base64ToBlob: Object(_index__WEBPACK_IMPORTED_MODULE_0__["base64ToBlob"])(res),
      base64ToFile: Object(_index__WEBPACK_IMPORTED_MODULE_0__["base64ToFile"])(res, '111.jpg')
    });
    document.getElementById('originImg').src = res;
    document.getElementById('originSize').innerText = 'origin size : ' + inputFile.files[0].size + 'kb';
  })["catch"](function (err) {
    throw err;
  });
  Object(_index__WEBPACK_IMPORTED_MODULE_0__["imgCompress"])({
    mode: 'auto',
    dataSrouce: inputFile.files[0],
    dataSrouceType: 'file',
    quality: 0.8
  }).then(function (res) {
    document.getElementById('compressImg').src = res; // get compress size

    var str = res.substring(22);
    var equalIndex = str.indexOf('=');

    if (str.indexOf('=') > 0) {
      str = str.substring(0, equalIndex);
    }

    var imgLength = str.length;
    document.getElementById('compressSize').innerText = 'compress size : ' + parseInt(imgLength - imgLength / 8 * 2) + 'kb';
  })["catch"](function (err) {
    throw err;
  });
});

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL2luZGV4LmpzIiwid2VicGFjazovLy8uL2luZGV4LmpzIl0sIm5hbWVzIjpbImJhc2U2NFRvQmxvYiIsInVybERhdGEiLCJhcnIiLCJzcGxpdCIsIm1pbWUiLCJtYXRjaCIsImJ5dGVzIiwid2luZG93IiwiYXRvYiIsImFiIiwiQXJyYXlCdWZmZXIiLCJsZW5ndGgiLCJpYSIsIlVpbnQ4QXJyYXkiLCJpIiwiY2hhckNvZGVBdCIsIkJsb2IiLCJ0eXBlIiwiaW1nRmlsZVRvQmFzZTY0IiwiZmlsZSIsIlByb21pc2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVhZGVyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsImUiLCJiYXNlNjRJbWciLCJ0YXJnZXQiLCJyZXN1bHQiLCJyZWFkQXNEYXRhVVJMIiwiZXJyIiwiYmFzZTY0VG9GaWxlIiwiZGF0YXVybCIsImZpbGVuYW1lIiwiYnN0ciIsIm4iLCJ1OGFyciIsIkZpbGUiLCJpbWdDb21wcmVzcyIsIm1vZGUiLCJkYXRhU3JvdWNlIiwiZGF0YVNyb3VjZVR5cGUiLCJtYXhXaWR0aCIsIm1heEhlaWdodCIsInF1YWxpdHkiLCJfZHJhd1RvQ2FudmFzIiwiaW1nIiwib2Zmc2V0V2lkdGgiLCJvZmZzZXRIZWlnaHQiLCJyZWFsV2lkdGgiLCJyZWFsSGVpZ2h0IiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50Iiwid2lkdGgiLCJoZWlnaHQiLCJjdHgiLCJnZXRDb250ZXh0IiwiZHJhd0ltYWdlIiwiYmFzZTY0c3RyIiwidG9EYXRhVVJMIiwiX2dldFJlc2l6ZVNpemVJbWciLCJvcmlnaW5JbWdXaWR0aCIsIm9yaWdpbkltZ0hlaWdodCIsInBlcmNlbnRTY2FsZSIsInBhcnNlRmxvYXQiLCJhdXRvV2lkdGgiLCJhdXRvSGVpZ2h0Iiwic2l6ZUJ5TWF4V2lkdGgiLCJwYXJzZUludCIsInNpemVCeU1heEhlaWdodCIsIm9yaWdpbkltYWdlIiwiSW1hZ2UiLCJmaW5hbFNpemUiLCJjb25zb2xlIiwibG9nIiwidGhlbiIsInJlcyIsInNyYyIsInRvRGF0YVVybCIsImlucHV0RmlsZSIsImdldEVsZW1lbnRCeUlkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZpbGVzIiwiYmFzZTY0SW5zdGFudCIsImlubmVyVGV4dCIsInNpemUiLCJzdHIiLCJzdWJzdHJpbmciLCJlcXVhbEluZGV4IiwiaW5kZXhPZiIsImltZ0xlbmd0aCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7Ozs7Ozs7QUFPTyxTQUFTQSxZQUFULENBQXNCQyxPQUF0QixFQUE4QjtBQUNqQyxNQUFJQyxHQUFHLEdBQUdELE9BQU8sQ0FBQ0UsS0FBUixDQUFjLEdBQWQsQ0FBVjtBQUNBLE1BQUlDLElBQUksR0FBR0YsR0FBRyxDQUFDLENBQUQsQ0FBSCxDQUFPRyxLQUFQ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LENBQXpCLENBQTNCLEdBQXlELElBQTdHO0FBQ0gsR0FmRCxXQWVTLFVBQUE3RCxHQUFHLEVBQUk7QUFDWixVQUFNQSxHQUFOO0FBQ0gsR0FqQkQ7QUFrQkgsQ0FoQ0QsRSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vaW5kZXguanNcIik7XG4iLCIvKipcbiAqIGJhc2U2NCB0byBibG9iXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHtzdHJpbmd9IHVybERhdGFcbiAqIEByZXR1cm5zIHtCbG9ifVxuICovXG5leHBvcnQgZnVuY3Rpb24gYmFzZTY0VG9CbG9iKHVybERhdGEpe1xuICAgIHZhciBhcnIgPSB1cmxEYXRhLnNwbGl0KCcsJyk7XG4gICAgdmFyIG1pbWUgPSBhcnJbMF0ubWF0Y2goLzooLio/KTsvKVsxXSB8fCAnaW1hZ2UvcG5nJztcbiAgICB2YXIgYnl0ZXMgPSB3aW5kb3cuYXRvYihhcnJbMV0pO1xuICAgIHZhciBhYiA9IG5ldyBBcnJheUJ1ZmZlcihieXRlcy5sZW5ndGgpO1xuICAgIHZhciBpYSA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlhW2ldID0gYnl0ZXMuY2hhckNvZGVBdChpKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBCbG9iKFthYl0sIHtcbiAgICAgICAgdHlwZTogbWltZVxuICAgIH0pO1xufVxuLyoqXG4gKiBpbWcgZmlsZSB0byBiYXNlNjRcbiAqXG4gKiBAZXhwb3J0XG4gKiBAcGFyYW0geyp9IGZpbGUgaW5wdXQncyBzZWxlY3QgZmlsZVxuICogQHJldHVybnMgUHJvbWlzZVxuICovXG5leHBvcnQgZnVuY3Rpb24gaW1nRmlsZVRvQmFzZTY0KGZpbGUpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBiYXNlNjRJbWcgPSBlLnRhcmdldC5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShiYXNlNjRJbWcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG4vKipcbiAqIGJhc2U2NCB0byBmaWxlXG4gKiBAcGFyYW0gZGF0YXVybCAgYmFzZTY0IENvZGVcbiAqIEBwYXJhbSBmaWxlbmFtZSAgZmlsZSBuYW1lXG4gKiBAcmV0dXJucyB7RmlsZX1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGJhc2U2NFRvRmlsZShkYXRhdXJsLCBmaWxlbmFtZSl7XG4gICAgbGV0IGFyciA9IGRhdGF1cmwuc3BsaXQoJywnKSxcbiAgICAgICAgbWltZSA9IGFyclswXS5tYXRjaCgvOiguKj8pOy8pWzFdLFxuICAgICAgICBic3RyID0gYXRvYihhcnJbMV0pLFxuICAgICAgICBuID0gYnN0ci5sZW5ndGgsXG4gICAgICAgIHU4YXJyID0gbmV3IFVpbnQ4QXJyYXkobik7XG4gICAgd2hpbGUobi0tKXtcbiAgICAgICAgdThhcnJbbl0gPSBic3RyLmNoYXJDb2RlQXQobik7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRmlsZShbdThhcnJdLCBmaWxlbmFtZSwge3R5cGU6bWltZX0pO1xufVxuXG4vKipcbiAqXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIG1vZGUgUGljdHVyZSBjb21wcmVzc2lvbiBtb2RlOmF1dG8oQ29tcHJlc3Npb24gaW4gZXF1YWwgcHJvcG9ydGlvbiB0byBtYXhpbXVtIHdpZHRoIG9yIGhlaWdodCkgd2lkdGgoQ29tcHJlc3Npb24gYnkgd2lkdGgpIGhlaWdodChDb21wcmVzc2lvbiBieSBoZWlnaHQpXG4gKiBAcGFyYW0gZGF0YVNyb3VjZSBEYXRhIHNyb3VjZSwgcGFzc2luZzppbWFnZS9iYXNlNjQvY2FudmFzL2ltZyBmaWxlXG4gKiBAcGFyYW0gZGF0YVNyb3VjZVR5cGUgRGF0YSBzcm91Y2UgdHlwZTogaW1hZ2UvYmFzZTY0L2NhbnZhcy9maWxlXG4gKiBAcGFyYW0gbWF4V2lkdGggTWF4aW11bSB3aWR0aCBvZiBjb21wcmVzc2lvbixkZWZhdWx0OiAxMDgwXG4gKiBAcGFyYW0gbWF4SGVpZ2h0IE1heGltdW0gaGVpZ2h0IG9mIGNvbXByZXNzaW9uLGRlZmF1bHQ6IDEwODBcbiAqIEBwYXJhbSBxdWFsaXR5IFBpY3R1cmUgb3V0cHV0IHF1YWxpdHk7UmFuZ2Ugb2YgdmFsdWVzOiAwLTEgO2RlZmF1bHQ6IDAuOTI7SXQncyB1c2VpbmcgY2FudmFzIGZ1bmN0aW9uOnRvRGF0YVVybDtcbiAqIEByZXR1cm5zIFByb21pc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGltZ0NvbXByZXNzKHttb2RlPVwiYXV0b1wiLGRhdGFTcm91Y2UsZGF0YVNyb3VjZVR5cGUsbWF4V2lkdGg9MCxtYXhIZWlnaHQ9MCxxdWFsaXR5PTAuOTJ9KXtcbiAgICAvKipcbiAgICAgKiBkcmF3IGNhbnZhc1xuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSBpbWdcbiAgICAgKiBAcGFyYW0geyp9IG9mZnNldFdpZHRoXG4gICAgICogQHBhcmFtIHsqfSBvZmZzZXRIZWlnaHRcbiAgICAgKiBAcGFyYW0geyp9IHJlYWxXaWR0aFxuICAgICAqIEBwYXJhbSB7Kn0gcmVhbEhlaWdodFxuICAgICAqIEByZXR1cm5zXG4gICAgICovXG4gICAgY29uc3QgX2RyYXdUb0NhbnZhcyA9IChpbWcsb2Zmc2V0V2lkdGgsb2Zmc2V0SGVpZ2h0LHJlYWxXaWR0aCxyZWFsSGVpZ2h0KSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgICAgICAgICBjYW52YXMud2lkdGggPSBvZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICBjYW52YXMuaGVpZ2h0ID0gb2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIGNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoXG4gICAgICAgICAgICAgICAgICAgIGltZyxcbiAgICAgICAgICAgICAgICAgICAgMCwwLFxuICAgICAgICAgICAgICAgICAgICByZWFsV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHJlYWxIZWlnaHQsXG4gICAgICAgICAgICAgICAgICAgIDAsMCxcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldEhlaWdodFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgYmFzZTY0c3RyID0gY2FudmFzLnRvRGF0YVVSTChcImltYWdlL2pwZWdcIixxdWFsaXR5KTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGJhc2U2NHN0cik7XG4gICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgLyoqXG4gICAgICogY2hlY2sgaW1nIGNvbXByZXNzIHNpemVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Kn0gaW1nXG4gICAgICogQHJldHVybnNcbiAgICAgKi9cbiAgICBjb25zdCBfZ2V0UmVzaXplU2l6ZUltZyA9IChpbWcpID0+IHtcbiAgICAgICAgY29uc3Qgb3JpZ2luSW1nV2lkdGggPSBpbWcud2lkdGg7XG4gICAgICAgIGNvbnN0IG9yaWdpbkltZ0hlaWdodCA9IGltZy5oZWlnaHQ7XG4gICAgICAgIGNvbnN0IHBlcmNlbnRTY2FsZSA9IHBhcnNlRmxvYXQob3JpZ2luSW1nV2lkdGggLyBvcmlnaW5JbWdIZWlnaHQpO1xuICAgICAgICBpZihvcmlnaW5JbWdXaWR0aCA8PSAxODAwICYmIG9yaWdpbkltZ0hlaWdodCA8PSAxODAwKXtcbiAgICAgICAgICAgIHJldHVybiB7d2lkdGg6b3JpZ2luSW1nV2lkdGggLCBoZWlnaHQ6b3JpZ2luSW1nSGVpZ2h0fTtcbiAgICAgICAgfVxuICAgICAgICBpZihtb2RlID09IFwiYXV0b1wiKXtcbiAgICAgICAgICAgIGxldCBhdXRvV2lkdGggPSBtYXhXaWR0aCA9PSAwID8gMTgwMCA6IG1heFdpZHRoO1xuICAgICAgICAgICAgbGV0IGF1dG9IZWlnaHQgPSBtYXhIZWlnaHQgPT0gMCA/IDE4MDAgOiBtYXhIZWlnaHQ7XG4gICAgICAgICAgICBsZXQgc2l6ZUJ5TWF4V2lkdGggPSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGF1dG9XaWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGF1dG9XaWR0aCAvIHBlcmNlbnRTY2FsZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXQgc2l6ZUJ5TWF4SGVpZ2h0ID0ge1xuICAgICAgICAgICAgICAgIHdpZHRoOiBwYXJzZUludChhdXRvSGVpZ2h0IC8gcGVyY2VudFNjYWxlKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGF1dG9IZWlnaHQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYoc2l6ZUJ5TWF4SGVpZ2h0LmhlaWdodCA8PSBtYXhXaWR0aCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpemVCeU1heEhlaWdodFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHNpemVCeU1heFdpZHRoXG4gICAgICAgIH1lbHNlIGlmKG1vZGUgPT0gXCJ3aWR0aFwiKXtcbiAgICAgICAgICAgIGlmKG9yaWdpbkltZ1dpZHRoIDw9IG1heFdpZHRoKXtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBvcmlnaW5JbWdXaWR0aCAsIG9yaWdpbkltZ0hlaWdodCB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGF1dG9XaWR0aCA9IG1heFdpZHRoID09IDAgPyAxODAwIDogbWF4V2lkdGg7XG4gICAgICAgICAgICBsZXQgc2l6ZUJ5TWF4V2lkdGggPSB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IGF1dG9XaWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGF1dG9XaWR0aCAvIHBlcmNlbnRTY2FsZSlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gc2l6ZUJ5TWF4V2lkdGg7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGlmKG9yaWdpbkltZ0hlaWdodCA8PSBtYXhIZWlnaHQpe1xuICAgICAgICAgICAgICAgIHJldHVybiB7IG9yaWdpbkltZ1dpZHRoICwgb3JpZ2luSW1nSGVpZ2h0IH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgYXV0b1dpZHRoID0gbWF4SGVpZ2h0ID09IDAgPyAxODAwIDogbWF4SGVpZ2h0O1xuICAgICAgICAgICAgbGV0IHNpemVCeU1heEhlaWdodCA9IHtcbiAgICAgICAgICAgICAgICB3aWR0aDogcGFyc2VJbnQoYXV0b1dpZHRoIC8gcGVyY2VudFNjYWxlKSxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IG1heEhlaWdodCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gc2l6ZUJ5TWF4SGVpZ2h0XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCkgPT4ge1xuICAgICAgICBsZXQgb3JpZ2luSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgb3JpZ2luSW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmluYWxTaXplID0gX2dldFJlc2l6ZVNpemVJbWcob3JpZ2luSW1hZ2UpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coZmluYWxTaXplKVxuICAgICAgICAgICAgX2RyYXdUb0NhbnZhcyhvcmlnaW5JbWFnZSxmaW5hbFNpemUud2lkdGgsZmluYWxTaXplLmhlaWdodCxvcmlnaW5JbWFnZS53aWR0aCxvcmlnaW5JbWFnZS5oZWlnaHQpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgICAgICAgIH0pLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoZXJyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHN3aXRjaCBhbGwgZXh0ZXJuYWwgaW5jb21pbmcgdHlwZXMgdG8gQmFzZTY0XG4gICAgICAgIGlmKGRhdGFTcm91Y2VUeXBlID09IFwiaW1nXCIgfHwgZGF0YVNyb3VjZVR5cGUgPT0gXCJpbWFnZVwiKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFTcm91Y2UpXG4gICAgICAgICAgICBvcmlnaW5JbWFnZS5zcmMgPSBkYXRhU3JvdWNlLnNyYztcbiAgICAgICAgfWVsc2UgaWYoZGF0YVNyb3VjZVR5cGUgPT0gXCJiYXNlNjRcIil7XG4gICAgICAgICAgICBvcmlnaW5JbWFnZS5zcmMgPSBkYXRhU3JvdWNlO1xuICAgICAgICB9ZWxzZSBpZihkYXRhU3JvdWNlVHlwZSA9PSBcImNhbnZhc1wiKXtcbiAgICAgICAgICAgIG9yaWdpbkltYWdlLnNyYyA9IGRhdGFTcm91Y2UudG9EYXRhVXJsKFwiaW1hZ2UvanBlZ1wiKTtcbiAgICAgICAgfWVsc2UgaWYoZGF0YVNyb3VjZVR5cGUgPT0gXCJmaWxlXCIpe1xuICAgICAgICAgICAgaW1nRmlsZVRvQmFzZTY0KGRhdGFTcm91Y2UpLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5JbWFnZS5zcmMgPSByZXM7XG4gICAgICAgICAgICB9KS5jYXRjaChlcnIgPT4ge1xuICAgICAgICAgICAgICAgIHRocm93IGVyclxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1lbHNle1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ3Vua25vdyB0eXBlOicrZGF0YVNyb3VjZVR5cGUpXG4gICAgICAgICAgICByZWplY3QoJ3Vua25vdyB0eXBlOicrZGF0YVNyb3VjZVR5cGUpXG4gICAgICAgIH1cbiAgICB9KVxufSIsImltcG9ydCB7IGltZ0ZpbGVUb0Jhc2U2NCAsIGJhc2U2NFRvQmxvYiAsIGJhc2U2NFRvRmlsZSwgaW1nQ29tcHJlc3MgfSBmcm9tICcuLi9pbmRleCcgXG5cbmNvbnN0IGlucHV0RmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dCcpO1xuaW5wdXRGaWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsKCk9PntcbiAgICBpbWdGaWxlVG9CYXNlNjQoaW5wdXRGaWxlLmZpbGVzWzBdKS50aGVuKHJlcyA9PiB7XG4gICAgICAgIGNvbnN0IGJhc2U2NEluc3RhbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW1nRmlsZVRvQmFzZTY0Jyk7XG4gICAgICAgIGJhc2U2NEluc3RhbnQuaW5uZXJUZXh0ID0gcmVzXG4gICAgICAgIGNvbnNvbGUubG9nKHtcbiAgICAgICAgICAgIGJhc2U2NFRvQmxvYjpiYXNlNjRUb0Jsb2IocmVzKSxcbiAgICAgICAgICAgIGJhc2U2NFRvRmlsZTogYmFzZTY0VG9GaWxlKHJlcywnMTExLmpwZycpXG4gICAgICAgIH0pXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcmlnaW5JbWcnKS5zcmMgPSByZXNcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29yaWdpblNpemUnKS5pbm5lclRleHQgPSAnb3JpZ2luIHNpemUgOiAnK2lucHV0RmlsZS5maWxlc1swXS5zaXplICsgJ2tiJ1xuICAgICAgICBcbiAgICB9KS5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIHRocm93IGVyclxuICAgIH0pO1xuICAgIGltZ0NvbXByZXNzKHtcbiAgICAgICAgbW9kZTogJ2F1dG8nLFxuICAgICAgICBkYXRhU3JvdWNlOiBpbnB1dEZpbGUuZmlsZXNbMF0sXG4gICAgICAgIGRhdGFTcm91Y2VUeXBlOiAnZmlsZScsXG4gICAgICAgIHF1YWxpdHk6IDAuOFxuICAgIH0pLnRoZW4ocmVzID0+IHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbXByZXNzSW1nJykuc3JjID0gcmVzXG4gICAgICAgIC8vIGdldCBjb21wcmVzcyBzaXplXG4gICAgICAgIGxldCBzdHIgPSByZXMuc3Vic3RyaW5nKDIyKVxuICAgICAgICBsZXQgZXF1YWxJbmRleCA9IHN0ci5pbmRleE9mKCc9Jyk7XG4gICAgICAgIGlmKHN0ci5pbmRleE9mKCc9Jyk+MCl7XG4gICAgICAgICAgICBzdHI9c3RyLnN1YnN0cmluZygwLGVxdWFsSW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBpbWdMZW5ndGggPSBzdHIubGVuZ3RoXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wcmVzc1NpemUnKS5pbm5lclRleHQgPSAnY29tcHJlc3Mgc2l6ZSA6ICcrcGFyc2VJbnQoaW1nTGVuZ3RoLShpbWdMZW5ndGgvOCkqMikgKyAna2InXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgdGhyb3cgZXJyXG4gICAgfSk7XG59KSJdLCJzb3VyY2VSb290IjoiIn0=