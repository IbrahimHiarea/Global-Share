//import react
import React, { useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router';

//import redux
import { useDispatch , useSelector } from 'react-redux';
import { addManyApplication , selectAllApplication , selectApplicationStatus } from '../ApplicationSlice';

//import components
import Error from '../../../common/components/Error/Error';
import ApplicationFilterBar from '../ApplicationFilterBar/ApplicationFilterBar';
import DashboardTable from '../../../common/components/Dashboard/DashboardTable/DashboardTable';

//import style
import style from './ApplicationPage.module.css';

const columns = [
    {
        name: 'id',
        keys: ['id'],
        type: 'id',
    },
    {
        name: 'vacancy id',
        keys: ['vacancyId'],
        type: 'id'
    },
    {
        name: 'Position',
        keys: ['vacancy' , 'position' , 'name'],
        type: 'normal'
    },
    {
        name: 'Squad',
        keys: ['vacancy' , 'position' , 'squad' , 'name'],
        type: 'normal',
    },
    {   
        name: 'status',
        keys: ['status'],
        type: 'recruitmentStatus'
    },
];

const fakeData = [
    {
        id: 1,
        vacancyId: 200,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'applied',
        feedbacks: [],
        answers: [],
    },
    {
        id: 2,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'hr_approved',
        feedbacks: [],
        answers: [],
    },
    {
        id: 3,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'orch_approved',
        feedbacks: [],
        answers: [],
    },
    {
        id: 4,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'hr_interview_approved',
        feedbacks: [],
        answers: [],
    },
    {
        id: 5,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'tech_interview_approved',
        feedbacks: [],
        answers: [],
    },
    {
        id: 6,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'done',
        feedbacks: [],
        answers: [],
    },
    {
        id: 7,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'refused',
        feedbacks: [],
        answers: [],
    },
    {
        id: 8,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'applied',
        feedbacks: [],
        answers: [],
    },
    {
        id: 9,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'applied',
        feedbacks: [],
        answers: [],
    },
    {
        id: 10,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'applied',
        feedbacks: [],
        answers: [],
    },
    {
        id: 11,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'applied',
        feedbacks: [],
        answers: [],
    },
    {
        id: 12,
        vacancyId: 100,
        vacancy: {
            position: {
                name: 'Specialist Android Developer',
                squad: {
                    name: 'Radioactive',
                }
            }
        },
        status: 'applied',
        feedbacks: [],
        answers: [],
    },
];

function ApplicationPage() {
    const nav = useNavigate();
    const dispatch = useDispatch();

    const data = useSelector(selectAllApplication);
    const status = useSelector(selectApplicationStatus);

    const onRowClick = (row) => nav(`${row.id}`);

    //TODO::
    const onChangePage = (page , totalRow) => {
        console.log(page , totalRow);
    }

    useEffect(() => {
        dispatch(addManyApplication(fakeData));
    } , []);

    if(status==='failed'){
        return (
            <div className={style['application-page']}>
                <Error />
            </div>
        );
    }

    return (
        <div className={style["application-page"]}>
            <h1 className={style['application-title']}>applications</h1>

            <ApplicationFilterBar />

            <DashboardTable 
                columns={columns}
                data={data}
                pending={status==='loading' || status ==='idle' ? true : false}
                rowClick={onRowClick}
                onChangePage={onChangePage}
            />
        </div>
    );
}

export default ApplicationPage;