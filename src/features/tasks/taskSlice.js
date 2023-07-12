//import redux
import { 
    createSlice ,
    createAsyncThunk,
    createEntityAdapter
} from "@reduxjs/toolkit"

//import API
import * as taskAPI from './TaskAPI';

// init state
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const taskStatusAdapter = createEntityAdapter({
    selectId: (taskStatus) => taskStatus.id,
    sortComparer: (taskStatusA , taskStatusB) => taskStatusA.id - taskStatusB.id
});

const taskAdapter = createEntityAdapter({
    selectId: (task) => task.id,
    sortComparer: (taskA , taskB) => new Date(taskA.date) - new Date(taskB.date)
});

const commentAdapter = createEntityAdapter({
    selectId: (comment) => comment.id,
    sortComparer: (commentA , commentB) => new Date(commentA.date) - new Date(commentB.date)
});

const initialState = {
    taskStatuses: taskStatusAdapter.getInitialState(),
    tasks: taskAdapter.getInitialState(),
    comments: commentAdapter.getInitialState(),
    status: status.idle,
    error: null,
}

//thunks actions
export const fetchTasksBySquad = createAsyncThunk(
    'task/fetchTasksBySquad',
    async (squadId , {rejectWithValue , signal , getState}) => {   
        try{
            // const token = selectAuthToken(getState());
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsImVtYWlsIjoiYWhtYWQuYWxzaGFoYWwyQGdtYWlsLmNvbSIsImlhdCI6MTY4OTE4MzMwNywiZXhwIjoxNjg5Nzg4MTA3fQ.7tII2KAksYX_GbBGfIYmUkKNIEG_VFKjYoos1qNf27g";
            const response = await taskAPI.fetchTasksBySquad(squadId , token , signal);
            console.log(response.data);

            const taskStatuses = [] , tasks = [] , comments = [];
            return {taskStatuses , tasks , comments}
        }
        catch(error){
            console.log(error);
            let message = "Network connection error";
            if(error?.response?.data?.message) message = error.response.data.message
            return rejectWithValue(message);
        }
    },
    {
        condition: (_, {getState}) => {
            const { task } = getState()
            const taskStatus = task.status;
            if (taskStatus === status.succeeded || taskStatus === status.loading) {
                return false
            }
        },
    }
);


//creating tasks slice
const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasksBySquad.pending , (state , action) => {
                state.status = status.loading;
            })
            .addCase(fetchTasksBySquad.fulfilled , (state , action) => {
                const {taskStatuses , tasks , comments} = action.payload;
                taskStatusAdapter.setAll(state.status , taskStatuses);
                taskAdapter.setAll(state.tasks , tasks);
                commentAdapter.setAll(state.comments , comments);
                state.status = status.succeeded;
            })
            .addCase(fetchTasksBySquad.rejected , (state , action) =>{
                state.error = action.payload;
                state.status = status.failed;
            })
    }
});

// selectors

// actions
export const {} = tasksSlice.actions;

// reducer
export default tasksSlice.reducer;