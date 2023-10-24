import initialColorPalette from '../data/colorPalette.json';
import { UPDATE_COLOR_PALETTE } from '../actions/colorPalette.action';
// import initialColorPalette from '../data/darkModeColorPalette.json';
const initialState = initialColorPalette;

// Format:
// {
//     "primaryColor": "",
//     "secondaryColor": "",
//     "tertiaryColor": "",
//     "quarternaryColor": "",
//     "quinaryColor": "",
//     "senaryColor": ""
// }


export default function colorPaletteReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_COLOR_PALETTE:
            return action.payload;
        default:
            return state;
    }
}