//import redux
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice 
} from '@reduxjs/toolkit';

//import API
import * as applicationAPI from './ApplicationAPI';

//init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
} 

const applicationModel = {
    id: 0,
    vacancyId: 0,
    vacancy: {
        position: {
            name: '',
            squad: {
                name: '',
            }
        }
    },
    status: 'applied',
    feedbacks: [], //feedback model
    answers: [], //answer model
};  

const feedbackModel = {
    id: 0,
    applicationId: 0,
    application: {},
    type: '', // recruitmentStatus,
    text: '',
};

const answersModel = {
    id: 0,
    text: '',
    applicationId: 0,
    application: {},
    questionId : '',
    question: {}, //vacancy question model
};


const applicationAdapter = createEntityAdapter({
    selectId: (ap) => ap.id,
    sortComparer: (apA , apB) => apA.id - apB.id
});


//thunk actions


//create slice
const applicationSlice = createSlice({
    name:'application',
    initialState: applicationAdapter.getInitialState({
        status: status.idle,
        error: null,
        isSearched: false
    }),
    reducers: {
        addApplication: (state , action) => {
            applicationAdapter.addOne(state , action.payload);
            state.status = status.succeeded;
        },
        addManyApplication: (state , action) => {
            applicationAdapter.addMany(state , action.payload);
            state.status = status.succeeded;
        }
    },
    extraReducers: (builder) => {

    }
});


//selector
export const {
    selectAll: selectAllApplication,
    selectById: selectApplicationById,
} = applicationAdapter.getSelectors(state => state.application);
export const selectApplicationStatus = state => state.application.status;
export const selectApplicationError = state => state.application.error;

//action
export const {addManyApplication , addApplication} = applicationSlice.actions;

//reducer
export default applicationSlice.reducer;