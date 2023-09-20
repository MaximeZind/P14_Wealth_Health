export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const DEL_EMPLOYEE = 'DEL_EMPLOYEE';

export function addEmployee(data){
    return (dispatch) => {
        dispatch({ type: ADD_EMPLOYEE, payload: data });
    }
}

export function deleteEmployee(data){
    return (dispatch) => {
        dispatch({ type: DEL_EMPLOYEE, payload: data});
    }
}