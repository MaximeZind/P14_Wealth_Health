import { ADD_EMPLOYEE, DEL_EMPLOYEE } from "../actions/employees.action";
import mockedData from '../data/initialState.json';

const initialState = mockedData;

// Format:
// [
//     {
//         id: null,
//         firstName: null,
//         lastName: null,
//         startDate: null,
//         department: null,
//         dateOfBirth: null,
//         street: null,
//         city: null,
//         state: null,
//         zipCode: null,
//     }
// ]

export default function employeesReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_EMPLOYEE:
            return [...state, action.payload];
        case DEL_EMPLOYEE:
            const id = action.payload;
            const updatedEmployees = state.filter((employee) => employee.id !== id);
            return updatedEmployees;
        default:
            return state;
    }
}