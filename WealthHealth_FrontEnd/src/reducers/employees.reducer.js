import { ADD_EMPLOYEE, DELETE_EMPLOYEE, UPDATE_EMPLOYEE } from "../actions/employees.action";
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
        case DELETE_EMPLOYEE:
            const id = action.payload;
            const updatedEmployeesAfterDeletion = state.filter((employee) => employee.id !== id);
            return updatedEmployeesAfterDeletion;
        case UPDATE_EMPLOYEE:
            const updatedEmployee = action.payload;
            const updatedEmployeesAfterUpdate = state.map((employee) =>
                employee.id === updatedEmployee.id ? updatedEmployee : employee
            );
            return updatedEmployeesAfterUpdate;
        default:
            return state;
    }
}