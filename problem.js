"use strict";
exports.__esModule = true;
exports.test = exports.testSlice = void 0;
var immutable_1 = require("immutable");
var toolkit_1 = require("@reduxjs/toolkit");
// This works as you'd expect
var myMap = (0, immutable_1.Map)();
myMap = myMap.set('abc', 1);
myMap = myMap.deleteAll(['abc']);
console.log(myMap);
// In a slice though the type binds to the default Map type
exports.testSlice = (0, toolkit_1.createSlice)({
    name: 'test',
    initialState: {
        stale: (0, immutable_1.Map)(),
        staleLast: 0
    },
    reducers: {
        test: function (state) {
            // This errors because clear returns void in the default Map type
            state.stale = state.stale.clear();
            // This err is because deleteAll doesn't exist in the default Maptype
            state.stale = state.stale.deleteAll(['test']);
        }
    }
});
exports.test = exports.testSlice.actions.test;
exports["default"] = exports.testSlice.reducer;
