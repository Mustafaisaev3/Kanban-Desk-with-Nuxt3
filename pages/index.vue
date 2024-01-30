<template>
    <div class="w-full h-screen px-20 pt-20">
        <div class="w-full h-auto flex items-center justify-center pb-5">
            <Button :variant="'green'" :icon="'mdi:plus'" @click="addNewColumn">
                Добавить Колонку
            </Button>
        </div>
        <div class="w-full h-auto flex gap-10 overflow-x-auto pb-5">
            <Column 
              v-for="column in columns"
              :id="column.id"
              :column="column"
              @dragover="handleDragOver"
              @drop="handleDrop(column)"
              :isMoving="isMoving"
              
            >
            <div
                v-if="column.tasks.length > 0"
                class="h-full rounded-md p-3 bg-gray-100 border-2 flex items-center flex-col gap-4"
                :class="column.isDragging && 'border-dashed border-sky-500 bg-sky-100'"
            >
                <Task 
                  v-for="task in column.tasks" 
                  :id="task.id" 
                  :task="task"
                  :columnId="column.id"
                  @dragstart="handleDragStart(task, column)"  
                />
            </div>
            </Column>
        </div>
    </div>
</template>
<script setup lang="ts">
import Column from '~/components/shared/Column.vue';
import Button from '~/components/shared/Button.vue';
import useTasks from '../store/useTasks'
import useUI from '../store/useUI'
import { ModalViews } from '~/types';
import Task from '~/components/shared/Task.vue';
import type { ITask, IColumn } from '~/types';
import { storeToRefs } from 'pinia';

const { columns } = storeToRefs(useTasks())
const { dragAndDropTask } = useTasks()
const { openModal } = useUI()

const dragTaskRef = ref<ITask | null>(null)
const sourceColumnRef = ref<IColumn | null>(null)
const isMoving = ref<boolean>(false)

const handleDragStart = (task: ITask, column: IColumn) => {
    isMoving.value = true
    dragTaskRef.value = task
    sourceColumnRef.value = column
}

const handleDragOver = (event: DragEvent) => {
    event.preventDefault()
    console.log('drag')
}

const handleDrop = (column: IColumn) => {
    isMoving.value = false
    console.log(column, 'column')
    if (dragTaskRef.value && sourceColumnRef.value) {
        dragAndDropTask(dragTaskRef.value, sourceColumnRef.value.id, column.id)
    }
}

const addNewColumn = () => {
    openModal(ModalViews.ADD_COLUMN)
}
</script>