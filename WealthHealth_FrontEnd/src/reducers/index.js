import { combineReducers } from "@reduxjs/toolkit";
import employeesReducer from "./employees.reducer";
import colorPaletteReducer from "./colorPalette.reducer";

export default combineReducers({
    employeesReducer, colorPaletteReducer
});