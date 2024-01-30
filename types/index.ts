
export interface ITask {
    id: string | number;
    title: string;
    description: string;
    column?: string | number;
}

export interface IColumn {
    id: string | number;
    title: string;
    itemCount?: number;
    isDragging?: boolean;
    tasks: ITask[]
}

export const ModalViews = {
    ADD_COLUMN: 'ADD_COLUMN',
    ADD_TASK: 'ADD_TASK',
    EDIT_TASK: 'EDIT_TASK'
}