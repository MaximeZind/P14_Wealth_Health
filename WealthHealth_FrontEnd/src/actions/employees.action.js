export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';

export function addEmployee(data){
    return (dispatch) => {
        dispatch({ type: ADD_EMPLOYEE, payload: data });
    }
}

export function deleteEmployee(data){
    return (dispatch) => {
        dispatch({ type: DELETE_EMPLOYEE, payload: data});
    }
}

export function updateEmployee(data){
    return (dispatch) => {
        dispatch({ type: UPDATE_EMPLOYEE, payload: data});
    }
}