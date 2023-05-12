import { createSlice } from "@reduxjs/toolkit"

// init state
const status = {
    idle: 'idle',
    loading: 'loading',
    succeeded: 'succeeded',
    failed: "failed"
}

const initialState = {
    tasks: {
        Approved : [],
        Done: [],
        Ongoing: [
            {
                "id": 3,
                "title": "Task management Design Updated",
                "assignedBy": {
                    "email": "ahmad.alshahal2@gmail.com",
                    "firstName": "Ahmad",
                    "lastName": "AlShahal",
                    "arabicFullName": null
                },
                "deadline": "Aug 20, 2021",
                "description": "Task management system for global share",
                "difficulty": "MEDIUM",
                "priority": "Urgent",
                "url": "https://en.wikipedia.org/wiki/ISO_8601",
                "comments": [
                    "We'll store your personal information so that we can pick up the conversation if we talk later. We may send you emails about our upcoming services",
                    "We'll store your personal information so that we can pick up the conversation if we talk later. We may send you emails about our upcoming services",
                    "We may send you emails to follow up on our discussion here."
                ]
            },
            {
                "id": 4,
                "title": "Task management Design Updated",
                "assignedBy": {
                    "email": "ahmad.alshahal2@gmail.com",
                    "firstName": "Ahmad",
                    "lastName": "AlShahal",
                    "arabicFullName": null
                },
                "deadline": "Aug 20, 2021",
                "description": "Task management system for global share",
                "difficulty": "MEDIUM",
                "priority": "important",
                "url": "https://en.wikipedia.org/wiki/ISO_8601",
                "comments": []
            },
            {
                "id": 5,
                "title": "Task management Design Updated",
                "assignedBy": {
                    "email": "ahmad.alshahal2@gmail.com",
                    "firstName": "Ahmad",
                    "lastName": "AlShahal",
                    "arabicFullName": null
                },
                "deadline": "Aug 20, 2021",
                "description": "Task management system for global share",
                "difficulty": "MEDIUM",
                "priority": "NORMAL",
                "url": "https://en.wikipedia.org/wiki/ISO_8601",
                "comments": []
            },
            {
                "id": 6,
                "title": "Task management Design Updated",
                "assignedBy": {
                    "email": "ahmad.alshahal2@gmail.com",
                    "firstName": "Ahmad",
                    "lastName": "AlShahal",
                    "arabicFullName": null
                },
                "deadline": "Aug 20, 2021",
                "description": "Task management system for global share",
                "difficulty": "MEDIUM",
                "priority": "NORMAL",
                "url": "https://en.wikipedia.org/wiki/ISO_8601",
                "comments": []
            },
            {
                "id": 7,
                "title": "Task management Design Updated",
                "assignedBy": {
                    "email": "ahmad.alshahal2@gmail.com",
                    "firstName": "Ahmad",
                    "lastName": "AlShahal",
                    "arabicFullName": null
                },
                "deadline": "Aug 20, 2021",
                "description": "Task management system for global share",
                "difficulty": "MEDIUM",
                "priority": "NORMAL",
                "url": "https://en.wikipedia.org/wiki/ISO_8601",
                "comments": []
            },
            {
                "id": 8,
                "title": "Task management Design Updated",
                "assignedBy": {
                    "email": "ahmad.alshahal2@gmail.com",
                    "firstName": "Ahmad",
                    "lastName": "AlShahal",
                    "arabicFullName": null
                },
                "deadline": "Aug 20, 2021",
                "description": "Task mansdfsdfsdgsdgdgsgdgsdfsdgsdgsagsdgsgsgsgsagement system for global share",
                "difficulty": "MEDIUM",
                "priority": "NORMAL",
                "url": "https://en.wikipedia.org/wiki/ISO_8601",
                "comments": []
            },
        ],
        ToDo: [
            {
                "id": 2,
                "title": "Task management Design",
                "assignedBy": {
                    "email": "ahmad.alshahal2@gmail.com",
                    "firstName": "Ahmad",
                    "lastName": "AlShahal",
                    "arabicFullName": null
                },
                "deadline": "Aug 20, 2021",
                "description": "Task management system for global share Task management system for global share Task management system for global share Task management system for global share Task management system for global share",
                "difficulty": "MEDIUM",
                "priority": "Normal",
                "url": "https://en.wikipedia.org/wiki/ISO_8601",
                "comments": [
                    "We may send you emails to follow up on our discussion here.",
                ],
            }
        ],
    },
    taskStatus: [
        {
            "id": 1,
            "name": "ToDo"
        },
        {
            "id": 2,
            "name": "Ongoing"
        },
        {
            "id": 3,
            "name": "Done"
        },
        {
            "id": 4,
            "name": "Approved"
        },
    ],
    status: status.idle,
    error: null,
}

const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        
    }
});

// selectors
export const selectAllTask = state => state.task;
export const selectTasks = state => state.task.tasks;
export const selectTaskStatus = state => state.task.taskStatus;
export const selectTaskError = state => state.task.error;
export const selectStatus = state => state.task.status;

// actions
export const {} = tasksSlice.actions;

// reducer
export default tasksSlice.reducer;