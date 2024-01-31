<template lang="">
    <div class="h-full space-y-3 w-[230px]">
        <div class="text-xl font-medium p-3 border border-1 rounded-md flex justify-between items-center overflow-hidden">
            <div class="flex text-base">
                <div class="truncate max-w-[150px] pr-1">
                    {{ column.title }}
                </div>
                <span class="opacity-50">({{ column.tasks.length }})</span>
            </div>
            <IconCSS name="mdi:delete" class="text-[red] cursor-pointer" @click="deleteColumn(column.id)"/>
        </div>
        <div class="w-full h-auto flex flex-col gap-4 border-[1px] rounded-md" :class="isMoving && 'border border-dashed border-[blue]'">
            <slot></slot>
        </div>
        <div class="w-[230px] h-auto">
            <Button :variant="'green'" :icon="'mdi:plus'" class="w-full" @click="handleNewTask">Новая Задача</Button>
        </div>
    </div>
</template>
<script setup lang="ts">
import type { IColumn } from '../../types';
import Button from './Button.vue';
import useTasks from '~/store/useTasks';
import useUI from '~/store/useUI';
import { ModalViews } from '../../types';

const { deleteColumn } = useTasks()
const { openModal } = useUI()

const { column, isMoving } = defineProps({
    column: {
        type: Object as PropType<IColumn>,
        required: true,
    },
    isMoving: {
        type: Boolean,
        required: true,
    },
})

const handleNewTask = () => {
    openModal(ModalViews.ADD_TASK, column.id)
}

</script>