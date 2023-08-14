export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';

export function addEmployee(data){
    return (dispatch) => {
        dispatch({ type: ADD_EMPLOYEE, payload: data });
    }
}