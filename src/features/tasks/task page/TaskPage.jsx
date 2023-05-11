//import react
import React, { useState } from 'react';

// import components 
import TaskHeader  from '../TaskHeader/TaskHeader';
import TaskCard  from '../TaskCard/TaskCard';

// import Icons 
import { FiSearch } from "react-icons/fi";
import { BsChevronDown } from "react-icons/bs";

//import style
import style from './TaskPage.module.css';

function TaskPage (){

    const [data,setDate] = useState([
        {
            columnName: 'To Do' ,
            tasks: [
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Copywriting Content',
                    description: 'Create content for peceland App',
                    date: 'Aug 20, 2021',
                },
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Copywriting Content',
                    description: 'Create content for peceland App',
                    date: 'Aug 20, 2021',
                },
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Copywriting Content',
                    description: 'Create content for peceland App',
                    date: 'Aug 20, 2021',
                },
            ]
        },
        {
            columnName: 'In Progress' ,
            tasks: [
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Copywriting Content',
                    description: 'Create content for peceland App',
                    date: 'Aug 20, 2021',
                },
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Fuck you ossama',
                    description: 'Fuck you ossama',
                    date: 'Aug 20, 2021',
                },
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Fuck you ossama',
                    description: 'Fuck you ossama',
                    date: 'Aug 20, 2021',
                },
            ]
        },
        {
            columnName: 'Done' ,
            tasks: [
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Fuck you ossama',
                    description: 'Fuck you ossama',
                    date: 'Aug 20, 2021',
                },
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Copywriting Content',
                    description: 'Create content for peceland App',
                    date: 'Aug 20, 2021',
                },
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Copywriting Content',
                    description: 'Create content for peceland App',
                    date: 'Aug 20, 2021',
                },
            ]
        },
        {
            columnName: 'Approved' ,
            tasks: [
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Copywriting Content',
                    description: 'Create content for peceland App',
                    date: 'Aug 20, 2021',
                },
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Copywriting Content',
                    description: 'Create content for peceland App',
                    date: 'Aug 20, 2021',
                },
                {
                    status: 'Normal',
                    complex: 'Hard',
                    title: 'Copywriting Content',
                    description: 'Create content for peceland App',
                    date: 'Aug 20, 2021',
                },
            ]
        },
    ]);

    const [searchData,setSearchData] = useState(data);

    const handleSearch = (e) => {
        const serchText = e.target.value;
        const newData = [];
        data?.map((col) => {
            const newTasks = {};
            newTasks.columnName = col.columnName;
            newTasks.tasks = col.tasks.filter((task) => {
                return task.title?.toLowerCase().includes(serchText.toLowerCase())  ||  task.description?.toLowerCase().includes(serchText.toLowerCase());
            });
            newData.push(newTasks);
        });
        setSearchData(newData);
    }

    return (
        <div className={style['task-page']}>
            <div className={style['task-page-header']}>
                <div className={style.search}>
                    <input 
                        type="text" 
                        placeholder='Search...' 
                        onChange = {handleSearch}
                    />
                    <FiSearch color='#768396'></FiSearch>
                </div>
                <div className={style.filter}>
                    <div>Radioactive</div>
                    <BsChevronDown color='#768396'></BsChevronDown>
                </div>
            </div>
            <div className={style['task-page-body']}>
                {
                    searchData?.map((col) => {
                        return (
                            <div className={style['task-col']}>
                                <TaskHeader title={col?.columnName}></TaskHeader>
                                    {
                                        col?.tasks?.slice(0, 15).map((task) => {
                                            return (
                                                <TaskCard
                                                    status = {task?.status}
                                                    complex = {task?.complex}
                                                    title = {task?.title}
                                                    description = {task?.description}
                                                    date = {task?.date}
                                                ></TaskCard>
                                            );
                                        })
                                    }
                            </div>
                        );
                    })
                }
                <div className={style['add-col']}>
                    <TaskHeader title={'Add New'} isAdd='true'></TaskHeader>
                </div>
            </div>
        </div>
    );
}

export default TaskPage;