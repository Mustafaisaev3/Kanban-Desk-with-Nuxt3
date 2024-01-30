<template>
    <div class="w-[200px] h-auto bg-white cursor-pointer p-2 rounded-md shadow overflow-hidden" draggable="true">
        <div class="text-lg font-medium mb-2"> {{ task.title }} </div>
        <p class="text-sm block w-full overflow-hidden pb-2 max-h-[100px]"> {{ task.description }} </p>
        <div class="w-full h-auto mt-4 pt-2 flex justify-between items-center border-t">
            <IconCSS name="material-symbols-light:open-with-rounded" class="hover:text-[gray]" @click="handleOpenTask"/>
            <IconCSS name="mdi:pencil" class="hover:text-[green]" @click="handleEditTask"/>
            <IconCSS name="mdi:delete" class="hover:text-[red]" @click="handleDeleteTask"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { ITask } from '../../types'
import useTasks from '~/store/useTasks';
import useUI from '~/store/useUI';
import { ModalViews } from '../../types';
import { useRouter } from 'vue-router';

const router = useRouter()

const { task, columnId } = defineProps({
    task: {
        type: Object as PropType<ITask>,
        required: true,
    },
    columnId: {
        type: [String, Number],
        required: true,
    }
})

const { deleteTask } = useTasks()
const { openModal } = useUI()

const handleDeleteTask = () => {
    deleteTask(task.id, columnId)
}

const handleEditTask = () => {
    openModal(ModalViews.EDIT_TASK, {
        task,
        columnId
    })
}

const handleOpenTask = () => {
    router.push(`task/${task.id}?column=${columnId}`)
}

</script>