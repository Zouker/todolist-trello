import React, {useCallback, useState} from 'react';
import '../app/App.css';
import {v1} from 'uuid';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {Container, Grid, LinearProgress, Paper} from '@mui/material';
import {FilterValuesType, TodolistDomainType} from '../features/TodolistsList/todolists-reducer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import {useSelector} from 'react-redux';
import {logout} from '../features/Auth/auth-reducer';
import {useAppDispatch, useAppSelector} from '../utils/redux-utils';
import {AppRootStateType} from '../utils/types';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/types';

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const status = useAppSelector(state => state.app.status);
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'},
    ])

    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {
                id: v1(),
                title: 'HTML&CSS',
                status: TaskStatuses.Completed,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.New,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Rest API',
                status: TaskStatuses.New,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'GraphQL',
                status: TaskStatuses.New,
                todoListId: todolistID1,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ],
        [todolistID2]: [
            {
                id: v1(),
                title: 'Pork',
                status: TaskStatuses.Completed,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Tomatoes',
                status: TaskStatuses.Completed,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Сucumbers',
                status: TaskStatuses.New,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Bread',
                status: TaskStatuses.New,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
            {
                id: v1(),
                title: 'Ketchup',
                status: TaskStatuses.New,
                todoListId: todolistID2,
                description: '',
                startDate: '',
                deadline: '',
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
            },
        ]
    });

    function removeTask(todolistID: string, taskID: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskID)})
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(filtered => filtered.id === todolistID ? {...filtered, filter: value} : filtered))
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {
            id: v1(),
            title: title,
            status: TaskStatuses.New,
            todoListId: todolistID,
            description: '',
            startDate: '',
            deadline: '',
            addedDate: '',
            order: 0,
            priority: TaskPriorities.Low,
        };
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function updateTask(todolistID: string, taskID: string, newTitle: string) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    function addTodolist(newTitle: string) {
        let newTodolistID = v1();
        setTodolists([{
            id: newTodolistID,
            title: newTitle,
            filter: 'all',
            addedDate: '',
            order: 0,
            entityStatus: 'idle'
        }, ...todolists])
        setTasks({...tasks, [newTodolistID]: []})
    }

    function updateTodolistTitle(todolistID: string, newTitle: string) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, title: newTitle} : tl))
    }

    function changeStatus(todolistID: string, taskID: string, status: TaskStatuses) {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(t => t.id === taskID ? {...t, status: status} : t)
        })
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(tl => tl.id !== todolistID))
        delete tasks[todolistID]
    }

    const logoutHandler = useCallback(() => {
        dispatch(logout())
    }, [])

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TODOLIST
                    </Typography>
                    {isLoggedIn && <Button onClick={logoutHandler} color="inherit">Log out</Button>}
                </Toolbar>
                <div style={{height: '4px'}}>
                    {status === 'loading' && <LinearProgress/>}
                </div>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    {/*<AddItemForm callback={addTodolist}/>*/}
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((tl) => {
                        let tasksForTodolist = tasks[tl.id]
                        if (tl.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
                        }

                        if (tl.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
                        }


                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolist={tl}
                                        tasks={tasksForTodolist}
                                        // removeTask={removeTask}
                                        // changeFilter={changeFilter}
                                        // addTask={addTask}
                                        // changeStatus={changeStatus}
                                        // removeTodolist={removeTodolist}
                                        // updateTask={updateTask}
                                        // updateTodolist={updateTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default App;
