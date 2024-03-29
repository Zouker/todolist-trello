import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {AddItemForm} from './AddItemForm';
import {action} from '@storybook/addon-actions';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: {
            description: 'callback'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const asyncCallback = async (...params: any[]) => {
    action('Button clicked inside form')(...params)
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
    callback: asyncCallback
};

export const AddItemFormStoryDisabledExample = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStoryDisabledExample.args = {
    callback: asyncCallback,
    disabled: true
};
