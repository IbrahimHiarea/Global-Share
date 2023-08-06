//import redux
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice 
} from '@reduxjs/toolkit';

//import API
import * as vacancyAPI from './VacancyAPI';

//init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
} 

const vacancyModel = {
    id: 0,
    squad: '',
    position: '',
    status: 'open',
    brief: '',
    tasks: '',
    requiredQualifications: '',
    preferredQualifications: '',
    effect: '',
    questions: [], //questions model
};  



const vacancyAdapter = createEntityAdapter({
    selectId: (sq) => sq.id,
    sortComparer: (sqA , sqB) => sqA.id - sqB.id
});


//thunk actions


//create slice
const vacancySlice = createSlice({
    name:'vacancy',
    initialState: vacancyAdapter.getInitialState({
        status: status.idle,
        error: null,
        isSearched: false
    }),
    reducers: {
        addVacancy: (state , action) => {
            vacancyAdapter.addOne(state , action.payload);
            state.status = status.succeeded;
        },
        addManyVacancy: (state , action) => {
            vacancyAdapter.addMany(state , action.payload);
            state.status = status.succeeded;
        }
    },
    extraReducers: (builder) => {

    }
});


//selector
export const {
    selectAll: selectAllVacancy,
    selectById: selectVacancyById,
} = vacancyAdapter.getSelectors(state => state.vacancy);
export const selectVacancyStatus = state => state.vacancy.status;
export const selectVacancyError = state => state.vacancy.error;

//action
export const {addManyVacancy , addVacancy} = vacancySlice.actions;

//reducer
export default vacancySlice.reducer;