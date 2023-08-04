//import redux
import { 
    createAsyncThunk, 
    createSlice,
    createEntityAdapter
} from "@reduxjs/toolkit";

//import API
import * as volunteerAPI from './VolunteerAPI';

// init slice
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const volunteerModel = {
    id: 0,
    email: "",
    password: '',
    phoneNumber: "",
    firstName: "",
    lastName: "",
    additionalEmail: "",
    middleName: "",
    arabicFullName: "",
    appointlet: "",
    bio: "",
    gsStatus: "",
    joinDate: "2000-1-1",
    positionId: "",
    position: {
        name: '',
        squad: {
            name: ''
        }
    },
    comments: [],
}

const volunteerAdapter = createEntityAdapter({
    selectId : (vol) => vol.id,
    sortComparer: (volA , volB) => volA.id - volB.id
});


//thunk actions


//create slice
const volunteerSlice = createSlice({
    name : 'volunteer',
    initialState: volunteerAdapter.getInitialState({
        status: status.idle,
        error: null,
        isSearched: false
    }),
    reducers: {
        addVolunteer: (state , action) => {
            volunteerAdapter.addOne(state , action.payload);
            state.status = status.succeeded;
        },
        addManyVolunteer: (state , action) => {
            volunteerAdapter.addMany(state , action.payload);
            state.status = status.succeeded;
        }
    },
    extraReducers: (builder) => {
        
    }
})


//selector
export const {
    selectAll: selectAllVolunteer,
    selectById: selectVolunteerById,
} = volunteerAdapter.getSelectors(state => state.volunteer);
export const selectVolunteerStatus = state => state.volunteer.status;
export const selectVolunteerError = state => state.volunteer.error;

//actions
export const {addManyVolunteer, addVolunteer} = volunteerSlice.actions;

// reducer
export default volunteerSlice.reducer;