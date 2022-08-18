import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import {lime} from '@mui/material/colors';
import {EditableSpan} from '../../../../components/EditableSpan/EditableSpan';
import {Delete} from '@mui/icons-material';
import {tasksActions} from '../../index';
import {useActions} from '../../../../utils/redux-utils';
import {TaskStatuses, TaskType} from '../../../../api/types';

type TaskPropsType = {
    task: TaskType
    todolistId: string
    disabled?: boolean
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const {updateTask, removeTask} = useActions(tasksActions)

    const removeTaskHandler = () => {
        removeTask({todolistId: props.todolistId, taskId: props.task.id})
    }
    const updateTaskTitleHandler = useCallback((newTitle: string) => {
        updateTask({todolistId: props.todolistId, taskId: props.task.id, model: {title: newTitle}})
    }, [props.todolistId, props.task.id])

    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            todolistId: props.todolistId,
            taskId: props.task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New}
        })
    }

    return (
        <div key={props.task.id}
             className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}
             style={{position: 'relative'}}>
            <Checkbox
                checked={props.task.status === TaskStatuses.Completed}
                onChange={onChangeTaskStatusHandler}
                sx={{
                    color: lime['A700'],
                    '&.Mui-checked': {
                        color: lime['A700'],
                    },
                }}
            />

            <EditableSpan title={props.task.title}
                          callback={updateTaskTitleHandler}/>
            <IconButton size={'small'} onClick={removeTaskHandler}
                        style={{position: 'absolute', top: '2px', right: '2px'}}>
                <Delete fontSize={'small'}/>
            </IconButton>
        </div>
    )
})