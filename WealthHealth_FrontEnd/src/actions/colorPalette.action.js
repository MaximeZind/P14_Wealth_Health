export const UPDATE_COLOR_PALETTE = 'UPDATE_COLOR_PALETTE';

export function updateColorPalette(data){
    return (dispatch) => {
        dispatch({ type: UPDATE_COLOR_PALETTE, payload: data });
    }
}