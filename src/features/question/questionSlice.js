//import redux
import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from '@reduxjs/toolkit';

//import API
import * as questionAPI from './questionAPI';

//init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
};

const questionModel = {
    id: 0,
    text: '',
    type: '', //type of questions
    options: [], //array of strings
};

const questionAdapter = createEntityAdapter({
    selectId: (qu) => qu.id,
    sortComparerL: (quA , quB) => quA.id - quB.id
});

//thunk actions


// create slice
const questionSlice = createSlice({
    name: 'question',
    initialState: questionAdapter.getInitialState({
        status: status.idle,
        error: null,
        isSearched: false,
    }),
    reducers: {
        addQuestion: (state , action) => {
            questionAdapter.addOne(state , action.payload);
            state.status = status.succeeded;
        },
        addManyQuestion: (state , action) => {
            questionAdapter.addMany(state , action.payload);
            state.status = status.succeeded;
        }
    },
    extraReducers: (builder) => {

    }
});


//selector
export const {
    selectAll: selectAllQuestion,
    selectById: selectQuestionById,
} = questionAdapter.getSelectors(state => state.question);
export const selectQuestionStatus = state => state.question.status;
export const selectQuestionError = state => state.question.error;

//action
export const {addManyQuestion , addQuestion} = questionSlice.actions;

//reducer
export default questionSlice.reducer;