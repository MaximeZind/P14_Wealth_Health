import initialColorPalette from '../data/darkModeColorPalette.json'
const initialState = initialColorPalette;

export default function colorPaletteReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}