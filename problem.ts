import { Map } from 'immutable';
import {
  CaseReducer,
  CaseReducerWithPrepare,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

// This works as you'd expect
let myMap = Map<string, number>();
myMap = myMap.set('abc', 1);
myMap = myMap.deleteAll(['abc']);
console.log(myMap);

// In a slice though the type binds to the default Map type
export const testSlice = createSlice({
  name: 'test',
  initialState: {
    stale: Map<string, number>(),
    staleLast: 0,
  },
  reducers: {
    test: (
      state:
        | CaseReducer<
            { stale: Map<string, number>; staleLast: number },
            { payload: any; type: string }
          >
        | CaseReducerWithPrepare<
            { stale: Map<string, number>; staleLast: number },
            PayloadAction<any, string, any, any>
          >
    ) => {
      // This errors because clear returns void in the default Map type
      state.stale = state.stale.clear();
      // This err is because deleteAll doesn't exist in the default Maptype
      state.stale = state.stale.deleteAll(['test']);
    },
  },
});

export const { test } = testSlice.actions;
export default testSlice.reducer;
