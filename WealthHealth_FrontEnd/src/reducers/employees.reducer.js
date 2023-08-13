import { ADD_EMPLOYEE } from "../actions/employees.action";

const initialState = [];

// {
//     firstName: null,
//     lastName: null,
//     startDate: null,
//     department: null,
//     dateOfBirth: null,
//     street: null,
//     city: null,
//     state: null,
//     zipCode: null,
// }

export default function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return state + action.payload;
        default:
            return state;
    }
}