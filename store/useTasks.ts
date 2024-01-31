import { defineStore } from 'pinia'
import type { IColumn, ITask } from '~/types'
import { v4 as uuid } from 'uuid'

interface IUseTasks {
    columns: IColumn[],
    targetTask: null | ITask
}

const useTasks = defineStore('Tasks', {
    state: () => ({ 
        columns: [
            {
                id: uuid(),
                title: 'Запланированно',
                isDragging: false,
                tasks: [
                    {
                        id: uuid(),
                        title: 'Задача 1',
                        description: 'Описание'
                    },
                    {
                        id: uuid(),
                        title: 'Задача 2',
                        description: 'Описание'
                    },
                    {
                        id: uuid(),
                        title: 'Задача 3',
                        description: 'Описание'
                    },
                ],
            },
            {
                id: uuid(),
                title: 'В работе',
                isDragging: false,
                tasks: [
                    {
                        id: uuid(),
                        title: 'Задача 1',
                        description: 'Описание'
                    },
                    {
                        id: uuid(),
                        title: 'Задача 2',
                        description: 'Описание'
                    },
                    {
                        id: uuid(),
                        title: 'Задача 3',
                        description: 'Описание'
                    },
                ],
            },
            {
                id: uuid(),
                title: 'Готово',
                isDragging: false,
                tasks: [
                    {
                        id: uuid(),
                        title: 'Задача 1',
                        description: 'Описание'
                    },
                    {
                        id: uuid(),
                        title: 'Задача 2',
                        description: 'Описание'
                    },
                    {
                        id: uuid(),
                        title: 'Задача 3',
                        description: 'Описание'
                    },
                ],
            },
        ],
    }) as IUseTasks,

    actions: {
        addColumn (title: string) {
            const newColumn = {
                id: uuid(),
                title: title,
                itemCount: 0,
                isDragging: false,
                tasks: []
            }
            
            this.columns.push(newColumn)
        },
        deleteColumn (colId: string) {
            const filteredColumns = this.columns.filter(col => {
                return col.id != colId
            })

            this.columns = filteredColumns
        },
        addTask (task: ITask, columnId: string) {
            const filteredCol = this.columns.map(col => {
                if (col.id == columnId) {
                    col.tasks.push(task)
                }

                return col
            })

            this.columns = filteredCol
        },
        deleteTask (taskId: string | number, columnId: string | number) {
            const filteredCol = this.columns.map(col => {
                if (col.id == columnId) {
                    const newTasks = col.tasks.filter(task => {
                        console.log(task.id,  taskId)
                        return task.id != taskId
                    })

                    col.tasks = newTasks
                    return col
                }

                return col
            })

            this.columns = filteredCol
        },
        editTask (taskId: string | number, columnId: string | number, title: string, description: string) {
            const filteredCol = this.columns.map(col => {
                if (col.id == columnId) {
                    col.tasks.map(task => {
                        if (task.id == taskId) {
                            task.title = title
                            task.description = description
                        }
                    })
                    return col
                }

                return col
            })

            this.columns = filteredCol
        },
        getTask (taskId: string | number, columnId: string | number) {
            let targetTask 
            this.columns.map(col => {
                if(col.id == columnId) {
                    col.tasks.filter(task => {
                        task.id == taskId ? targetTask = task : null
                    })
                }
            })[0]

            return targetTask
        },
        dragAndDropTask (task: ITask, initColumn: string | number, targetColumn: string | number) {
            const filteredCol = this.columns.map(col => {
                if (col.id == initColumn) {
                    const newTasks = col.tasks.filter(taskItem => {
                        return taskItem.id != task.id
                    })

                    col.tasks = newTasks
                    return col
                }

                return col
            })

            const newColArr = filteredCol.map(col => {
                if (col.id == targetColumn) {
                    col.tasks.push(task)
                    return col
                }
                return col
            })

            this.columns = newColArr
        }
    }
})

export default useTasks