/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scripts_visualization__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scripts/visualization */ \"./src/scripts/visualization.js\");\n\n(0,_scripts_visualization__WEBPACK_IMPORTED_MODULE_0__.Play)();//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguanMuanMiLCJtYXBwaW5ncyI6Ijs7QUFBOEM7QUFDOUNBLDREQUFJLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96ZXJvLXZpc3VhbGl6ZXIvLi9zcmMvaW5kZXguanM/YjYzNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQbGF5IH0gZnJvbSBcIi4vc2NyaXB0cy92aXN1YWxpemF0aW9uXCJcblBsYXkoKTsiXSwibmFtZXMiOlsiUGxheSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/index.js\n");

/***/ }),

/***/ "./src/scripts/visualization.js":
/*!**************************************!*\
  !*** ./src/scripts/visualization.js ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Play\": function() { return /* binding */ Play; }\n/* harmony export */ });\nconst Play = function () {\n  let sfile = document.getElementById(\"soundfile\");\n  let uploadSound = document.getElementById(\"uploadButton\");\n  let uploadText = document.getElementById(\"uploadButtonText\");\n  uploadSound.addEventListener(\"click\", function () {\n    sfile.click();\n  });\n  let audio = document.getElementById(\"audio\");\n  sfile.onchange = function () {\n    if (sfile.value) uploadText.innerHTML = sfile.value;else uploadText.innerHTML = \"No file chosen.\";\n    let sfiles = this.files;\n    audio.src = URL.createObjectURL(sfiles[0]);\n    audio.load();\n    audio.play();\n    let audioContext = new AudioContext();\n    let src = audioContext.createMediaElementSource(audio);\n    let visualizer = audioContext.createAnalyser();\n    let stage = document.getElementById(\"canvas\");\n    canvas.width = window.innerWidth;\n    canvas.height = window.innerHeight;\n    let ctx = stage.getContext('2d');\n    src.connect(visualizer);\n    visualizer.connect(audioContext.destination);\n    visualizer.fftSize = 512; // Higher the more detail in data.\n\n    let bufferLength = visualizer.frequencyBinCount; // Half of fftSize represents the amount of data values\n\n    let dataArray = new Uint8Array(bufferLength);\n    let WIDTH = canvas.width;\n    let HEIGHT = canvas.height;\n    let barWidth = WIDTH / bufferLength * 2.5;\n    let barHeight;\n    let x = 0;\n    let EQ = 5; // THE AMOUNT OF IF STATEMENTS\n\n    function renderVisualizer() {\n      console.log(dataArray);\n      requestAnimationFrame(renderVisualizer);\n      x = 0;\n      visualizer.getByteFrequencyData(dataArray);\n      ctx.fillRect(0, 0, WIDTH, HEIGHT);\n      // console.log(dataArray);\n      for (let i = 0; i < bufferLength; i++) {\n        barHeight = dataArray[i];\n        ctx.beginPath();\n        if (i >= 0 && i < 3 &&\n        // Frequency\n        barHeight > 150 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${255},${0},${0})`; // SUBS\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 0 / EQ * Math.PI, 1 / EQ * Math.PI, false);\n        } else if (i >= 3 && i < 4 &&\n        // Frequency\n        barHeight > 150 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${255},${0},${0})`; // LOWS\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 1 / EQ * Math.PI, 2 / EQ * Math.PI, false);\n        } else if (i > 4 && i < 6 &&\n        // Frequency\n        barHeight > 150 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${0},${255},${0})`; // MIDS\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 2 / EQ * Math.PI, 3 / EQ * Math.PI, false);\n        } else if (i >= 6 && i < 8 &&\n        // Frequency\n        barHeight > 150 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${0},${0},${255})`; // HIGHS\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 3 / EQ * Math.PI, 4 / EQ * Math.PI, false);\n        } else if (i > 8 && i < 11 &&\n        // Frequency\n        barHeight > 150 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${200},${50},${255})`;\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 4 / EQ * Math.PI, 5 / EQ * Math.PI, false);\n        } else if (\n        // MID TO HIGH\n        i >= 11 && i < 13 &&\n        // Frequency\n        barHeight > 195 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${255},${0},${255})`;\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 5 / EQ * Math.PI, 6 / EQ * Math.PI, false);\n        } else if (\n        // CLAPS\n        i >= 13 && i < 19 &&\n        // Frequency\n        barHeight > 185 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${255},${255},${255})`;\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 6 / EQ * Math.PI, 7 / EQ * Math.PI, false);\n        } else if (\n        // HIGH \n        i >= 19 && i < 25 &&\n        // Frequency\n        barHeight > 185 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${255},${255},${255})`;\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 7 / EQ * Math.PI, 8 / EQ * Math.PI, false);\n        } else if (\n        // HIGH\n        i >= 25 && i < 35 &&\n        // Frequency\n        barHeight > 185 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${255},${255},${255})`;\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 8 / EQ * Math.PI, 9 / EQ * Math.PI, false);\n        } else if (\n        // HIGH\n        i >= 35 && i < 50 &&\n        // Frequency\n        barHeight > 185 // Noise Gate\n        ) {\n          ctx.lineWidth = 1;\n          ctx.strokeStyle = `rgb(${255},${255},${255})`;\n          ctx.arc(canvas.width / 2, canvas.height / 2, 255 + barHeight, 9 / EQ * Math.PI, 10 / EQ * Math.PI, false);\n        }\n        ctx.stroke();\n      }\n      ctx.beginPath();\n      ctx.lineWidth = 5;\n      ctx.strokeStyle = `rgb(${255},${255},${255})`;\n      ctx.arc(canvas.width / 2, canvas.height / 2, 255, 0, 2 * Math.PI, false);\n      ctx.stroke();\n    }\n    audio.play();\n    renderVisualizer();\n    console.log(\"hi\");\n  };\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsR0FBRzRCLElBQUksQ0FBQ0MsRUFBRSxFQUFFLEtBQUssQ0FBQztNQUN4RTNCLEdBQUcsQ0FBQzRCLE1BQU0sRUFBRTtJQUNoQjtJQUNBbkQsS0FBSyxDQUFDVSxJQUFJLEVBQUU7SUFDWjRCLGdCQUFnQixFQUFFO0lBQ2xCQyxPQUFPLENBQUNDLEdBQUcsQ0FBQyxJQUFJLENBQUM7RUFDckIsQ0FBQztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96ZXJvLXZpc3VhbGl6ZXIvLi9zcmMvc2NyaXB0cy92aXN1YWxpemF0aW9uLmpzPzQ0MjAiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgUGxheSA9IGZ1bmN0aW9uKCl7XG5cbiAgICBsZXQgc2ZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNvdW5kZmlsZVwiKTtcbiAgICBsZXQgdXBsb2FkU291bmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwbG9hZEJ1dHRvblwiKVxuICAgIGxldCB1cGxvYWRUZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGxvYWRCdXR0b25UZXh0XCIpXG5cbiAgICB1cGxvYWRTb3VuZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcbiAgICAgICAgc2ZpbGUuY2xpY2soKTtcbiAgICB9KTtcblxuICAgIGxldCBhdWRpbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXVkaW9cIik7XG4gIFxuICAgIHNmaWxlLm9uY2hhbmdlID0gZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKHNmaWxlLnZhbHVlKSB1cGxvYWRUZXh0LmlubmVySFRNTCA9IHNmaWxlLnZhbHVlO1xuICAgICAgICBlbHNlIHVwbG9hZFRleHQuaW5uZXJIVE1MID0gXCJObyBmaWxlIGNob3Nlbi5cIlxuXG4gICAgICAgIGxldCBzZmlsZXMgPSB0aGlzLmZpbGVzO1xuICAgICAgICBhdWRpby5zcmMgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKHNmaWxlc1swXSk7XG4gICAgICAgIGF1ZGlvLmxvYWQoKTtcbiAgICAgICAgYXVkaW8ucGxheSgpO1xuICAgICAgICBsZXQgYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgICAgICBsZXQgc3JjID0gYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhRWxlbWVudFNvdXJjZShhdWRpbyk7XG4gICAgICAgIGxldCB2aXN1YWxpemVyID0gYXVkaW9Db250ZXh0LmNyZWF0ZUFuYWx5c2VyKCk7XG5cbiAgICAgICAgbGV0IHN0YWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBsZXQgY3R4ID0gc3RhZ2UuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgc3JjLmNvbm5lY3QodmlzdWFsaXplcik7XG4gICAgICAgIHZpc3VhbGl6ZXIuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICB2aXN1YWxpemVyLmZmdFNpemUgPSA1MTI7IC8vIEhpZ2hlciB0aGUgbW9yZSBkZXRhaWwgaW4gZGF0YS5cblxuICAgICAgICBsZXQgYnVmZmVyTGVuZ3RoID0gdmlzdWFsaXplci5mcmVxdWVuY3lCaW5Db3VudDsgLy8gSGFsZiBvZiBmZnRTaXplIHJlcHJlc2VudHMgdGhlIGFtb3VudCBvZiBkYXRhIHZhbHVlc1xuXG4gICAgICAgIGxldCBkYXRhQXJyYXkgPSBuZXcgVWludDhBcnJheShidWZmZXJMZW5ndGgpO1xuXG4gICAgICAgIGxldCBXSURUSCA9IGNhbnZhcy53aWR0aDtcbiAgICAgICAgbGV0IEhFSUdIVCA9IGNhbnZhcy5oZWlnaHQ7XG5cbiAgICAgICAgbGV0IGJhcldpZHRoID0gKFdJRFRIIC8gYnVmZmVyTGVuZ3RoKSAqIDIuNTtcbiAgICAgICAgbGV0IGJhckhlaWdodDtcbiAgICAgICAgbGV0IHggPSAwO1xuICAgICAgICBsZXQgRVEgPSA1IC8vIFRIRSBBTU9VTlQgT0YgSUYgU1RBVEVNRU5UU1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlclZpc3VhbGl6ZXIoKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGFBcnJheSk7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmVuZGVyVmlzdWFsaXplcik7XG4gICAgICAgICAgICB4ID0gMDtcbiAgICAgICAgICAgIHZpc3VhbGl6ZXIuZ2V0Qnl0ZUZyZXF1ZW5jeURhdGEoZGF0YUFycmF5KTtcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdCgwLCAwLCBXSURUSCwgSEVJR0hUKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFBcnJheSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJ1ZmZlckxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBiYXJIZWlnaHQgPSBkYXRhQXJyYXlbaV07XG4gICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgKGkgPj0gMCAmJiBpIDwgMykgJiYgLy8gRnJlcXVlbmN5XG4gICAgICAgICAgICAgICAgICAgIGJhckhlaWdodCA+IDE1MCAvLyBOb2lzZSBHYXRlXG4gICAgICAgICAgICAgICAgICAgICkgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYHJnYigkezI1NX0sJHswfSwkezB9KWA7IC8vIFNVQlNcbiAgICAgICAgICAgICAgICAgICAgY3R4LmFyYyhjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgMjU1ICsgYmFySGVpZ2h0LCAoMCAvIEVRKSAqIE1hdGguUEksICgxIC8gRVEpICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgKGkgPj0gMyAmJiBpIDwgNCkgJiYgLy8gRnJlcXVlbmN5XG4gICAgICAgICAgICAgICAgICAgIGJhckhlaWdodCA+IDE1MCAvLyBOb2lzZSBHYXRlXG4gICAgICAgICAgICAgICAgICAgICkgXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYHJnYigkezI1NX0sJHswfSwkezB9KWA7IC8vIExPV1NcbiAgICAgICAgICAgICAgICAgICAgY3R4LmFyYyhjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgMjU1ICsgYmFySGVpZ2h0LCAoMSAvIEVRKSAqIE1hdGguUEksICgyIC8gRVEpICogTWF0aC5QSSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgKGkgPiA0ICYmIGkgPCA2KSAmJiAvLyBGcmVxdWVuY3lcbiAgICAgICAgICAgICAgICAgICAgYmFySGVpZ2h0ID4gMTUwIC8vIE5vaXNlIEdhdGVcbiAgICAgICAgICAgICAgICAgICAgKXtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGByZ2IoJHswfSwkezI1NX0sJHswfSlgOyAvLyBNSURTXG4gICAgICAgICAgICAgICAgICAgIGN0eC5hcmMoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIDI1NSArIGJhckhlaWdodCwgKDIgLyBFUSkgKiBNYXRoLlBJLCAoMyAvIEVRKSAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIChpID49IDYgJiYgaSA8IDgpICYmIC8vIEZyZXF1ZW5jeVxuICAgICAgICAgICAgICAgICAgICBiYXJIZWlnaHQgPiAxNTAgLy8gTm9pc2UgR2F0ZVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYHJnYigkezB9LCR7MH0sJHsyNTV9KWA7IC8vIEhJR0hTXG4gICAgICAgICAgICAgICAgICAgIGN0eC5hcmMoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIDI1NSArIGJhckhlaWdodCwgKDMgLyBFUSkgKiBNYXRoLlBJLCAoNCAvIEVRKSAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgICAgIChpID4gOCAmJiBpIDwgMTEpICYmIC8vIEZyZXF1ZW5jeVxuICAgICAgICAgICAgICAgICAgICBiYXJIZWlnaHQgPiAxNTAgLy8gTm9pc2UgR2F0ZVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYHJnYigkezIwMH0sJHs1MH0sJHsyNTV9KWA7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5hcmMoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIDI1NSArIGJhckhlaWdodCwgKDQgLyBFUSkgKiBNYXRoLlBJLCAoNSAvIEVRKSAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIC8vIE1JRCBUTyBISUdIXG4gICAgICAgICAgICAgICAgICAgIChpID49IDExICYmIGkgPCAxMykgJiYgLy8gRnJlcXVlbmN5XG4gICAgICAgICAgICAgICAgICAgIGJhckhlaWdodCA+IDE5NSAvLyBOb2lzZSBHYXRlXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBgcmdiKCR7MjU1fSwkezB9LCR7MjU1fSlgO1xuICAgICAgICAgICAgICAgICAgICBjdHguYXJjKGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAyNTUgKyBiYXJIZWlnaHQsICg1IC8gRVEpICogTWF0aC5QSSwgKDYgLyBFUSkgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCAvLyBDTEFQU1xuICAgICAgICAgICAgICAgICAgICAoaSA+PSAxMyAmJiBpIDwgMTkpICYmIC8vIEZyZXF1ZW5jeVxuICAgICAgICAgICAgICAgICAgICBiYXJIZWlnaHQgPiAxODUgLy8gTm9pc2UgR2F0ZVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYHJnYigkezI1NX0sJHsyNTV9LCR7MjU1fSlgO1xuICAgICAgICAgICAgICAgICAgICBjdHguYXJjKGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAyNTUgKyBiYXJIZWlnaHQsICg2IC8gRVEpICogTWF0aC5QSSwgKDcgLyBFUSkgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCAvLyBISUdIIFxuICAgICAgICAgICAgICAgICAgICAoaSA+PSAxOSAmJiBpIDwgMjUpICYmIC8vIEZyZXF1ZW5jeVxuICAgICAgICAgICAgICAgICAgICBiYXJIZWlnaHQgPiAxODUgLy8gTm9pc2UgR2F0ZVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjdHgubGluZVdpZHRoID0gMTtcbiAgICAgICAgICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gYHJnYigkezI1NX0sJHsyNTV9LCR7MjU1fSlgO1xuICAgICAgICAgICAgICAgICAgICBjdHguYXJjKGNhbnZhcy53aWR0aCAvIDIsIGNhbnZhcy5oZWlnaHQgLyAyLCAyNTUgKyBiYXJIZWlnaHQsICg3IC8gRVEpICogTWF0aC5QSSwgKDggLyBFUSkgKiBNYXRoLlBJLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCAvLyBISUdIXG4gICAgICAgICAgICAgICAgICAgIChpID49IDI1ICYmIGkgPCAzNSkgJiYgLy8gRnJlcXVlbmN5XG4gICAgICAgICAgICAgICAgICAgIGJhckhlaWdodCA+IDE4NSAvLyBOb2lzZSBHYXRlXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgICAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBgcmdiKCR7MjU1fSwkezI1NX0sJHsyNTV9KWA7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5hcmMoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIDI1NSArIGJhckhlaWdodCwgKDggLyBFUSkgKiBNYXRoLlBJLCAoOSAvIEVRKSAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoIC8vIEhJR0hcbiAgICAgICAgICAgICAgICAgICAgKGkgPj0gMzUgJiYgaSA8IDUwKSAmJiAvLyBGcmVxdWVuY3lcbiAgICAgICAgICAgICAgICAgICAgYmFySGVpZ2h0ID4gMTg1IC8vIE5vaXNlIEdhdGVcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGByZ2IoJHsyNTV9LCR7MjU1fSwkezI1NX0pYDtcbiAgICAgICAgICAgICAgICAgICAgY3R4LmFyYyhjYW52YXMud2lkdGggLyAyLCBjYW52YXMuaGVpZ2h0IC8gMiwgMjU1ICsgYmFySGVpZ2h0LCAoOSAvIEVRKSAqIE1hdGguUEksICgxMCAvIEVRKSAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gNTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IGByZ2IoJHsyNTV9LCR7MjU1fSwkezI1NX0pYCBcbiAgICAgICAgICAgIGN0eC5hcmMoY2FudmFzLndpZHRoIC8gMiwgY2FudmFzLmhlaWdodCAvIDIsIDI1NSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBhdWRpby5wbGF5KCk7XG4gICAgICAgIHJlbmRlclZpc3VhbGl6ZXIoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJoaVwiKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IFBsYXkgfTsiXSwibmFtZXMiOlsiUGxheSIsInNmaWxlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInVwbG9hZFNvdW5kIiwidXBsb2FkVGV4dCIsImFkZEV2ZW50TGlzdGVuZXIiLCJjbGljayIsImF1ZGlvIiwib25jaGFuZ2UiLCJ2YWx1ZSIsImlubmVySFRNTCIsInNmaWxlcyIsImZpbGVzIiwic3JjIiwiVVJMIiwiY3JlYXRlT2JqZWN0VVJMIiwibG9hZCIsInBsYXkiLCJhdWRpb0NvbnRleHQiLCJBdWRpb0NvbnRleHQiLCJjcmVhdGVNZWRpYUVsZW1lbnRTb3VyY2UiLCJ2aXN1YWxpemVyIiwiY3JlYXRlQW5hbHlzZXIiLCJzdGFnZSIsImNhbnZhcyIsIndpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImhlaWdodCIsImlubmVySGVpZ2h0IiwiY3R4IiwiZ2V0Q29udGV4dCIsImNvbm5lY3QiLCJkZXN0aW5hdGlvbiIsImZmdFNpemUiLCJidWZmZXJMZW5ndGgiLCJmcmVxdWVuY3lCaW5Db3VudCIsImRhdGFBcnJheSIsIlVpbnQ4QXJyYXkiLCJXSURUSCIsIkhFSUdIVCIsImJhcldpZHRoIiwiYmFySGVpZ2h0IiwieCIsIkVRIiwicmVuZGVyVmlzdWFsaXplciIsImNvbnNvbGUiLCJsb2ciLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJnZXRCeXRlRnJlcXVlbmN5RGF0YSIsImZpbGxSZWN0IiwiaSIsImJlZ2luUGF0aCIsImxpbmVXaWR0aCIsInN0cm9rZVN0eWxlIiwiYXJjIiwiTWF0aCIsIlBJIiwic3Ryb2tlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/scripts/visualization.js\n");

/***/ }),

/***/ "./src/index.scss":
/*!************************!*\
  !*** ./src/index.scss ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvaW5kZXguc2Nzcy5qcyIsIm1hcHBpbmdzIjoiO0FBQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly96ZXJvLXZpc3VhbGl6ZXIvLi9zcmMvaW5kZXguc2Nzcz85NzQ1Il0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/index.scss\n");

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
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	__webpack_require__("./src/index.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.scss");
/******/ 	
/******/ })()
;