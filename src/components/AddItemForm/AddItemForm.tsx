import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import {AddBox} from '@mui/icons-material';
import {yellow} from '@mui/material/colors';

export type AddItemFormSubmitHelperType = { setError: (error: string) => void, setTitle: (title: string) => void }

type AddItemFormPropsType = {
    callback: (title: string, helper: AddItemFormSubmitHelperType) => void
    disabled?: boolean
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo(({disabled = false, callback}) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('')

    const addItem = async () => {
        let trimmedTask = title.trim()
        if (trimmedTask) {
            callback(trimmedTask, {setError, setTitle})
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError('')
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       disabled={disabled}
                       label={error ? 'Title is required' : 'Enter title'}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyPressHandler}
                       error={!!error}
                       helperText={error}
                       color={'success'}
            />
            <IconButton sx={{color: yellow['A700']}} onClick={addItem} disabled={disabled} style={{marginLeft: '5px'}}>
                <AddBox/>
            </IconButton>
        </div>
    );
});

