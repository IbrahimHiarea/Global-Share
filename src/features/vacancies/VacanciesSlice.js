//import redux
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice 
} from '@reduxjs/toolkit';

//import API
import * as vacanciesAPI from './VacanciesAPI';

//init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
} 

const vacanciesAdapter = createEntityAdapter({
    selectId: (sq) => sq.id,
    sortComparer: (sqA , sqB) => sqA.id - sqB.id
});


//thunk actions


//create slice
const vacanciesSlice = createSlice({
    name:'vacancies',
    initialState: vacanciesAdapter.getInitialState({
        status: status.idle,
        error: null,
        isSearched: false
    }),
    reducers: {
        addVacancies: (state , action) => {
            vacanciesAdapter.addOne(state , action.payload);
            state.status = status.succeeded;
        },
        addManyVacancies: (state , action) => {
            vacanciesAdapter.addMany(state , action.payload);
            state.status = status.succeeded;
        }
    },
    extraReducers: (builder) => {

    }
});


//selector
export const {
    selectAll: selectAllVacancies,
    selectById: selectVacanciesById,
} = vacanciesAdapter.getSelectors(state => state.vacancies);
export const selectVacanciesStatus = state => state.vacancies.status;
export const selectVacanciesError = state => state.vacancies.error;

//action
export const {addManyVacancies , addVacancies} = vacanciesSlice.actions;

//reducer
export default vacanciesSlice.reducer;