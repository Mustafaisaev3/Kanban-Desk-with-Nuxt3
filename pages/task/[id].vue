<template>
    <div class="w-full h-screen flex items-center justify-center">
        <div 
          v-if="task"
          class="w-[500px] h-[500px] flex flex-col border rounded-lg"
        >
            <div class="w-full h-auto flex px-5 py-2 justify-between items-center border-b">
                <IconCSS name="mdi:keyboard-backspace" class="text-[40px] cursor-pointer hover:text-[gray]" @click="$router.back()" />
                <div class="text-[12px]">{{ task.id }}</div>
            </div>
            <div class="w-full h-auto my-10 flex-1 overflow-y-auto px-5">
                <h2 class="text-xl font-semibold pb-2">{{ task.title }}</h2>
                <p class="text-lg break-words">{{ task.description }}</p>
            </div>
            <div class="w-full h-auto flex justify-between items-center px-5 py-5 border-t">
                <IconCSS name="mdi:pencil" class="text-[40px] hover:text-[green] cursor-pointer" @click="handleEditTask"/>
                <IconCSS name="mdi:delete" class="text-[40px] hover:text-[red] cursor-pointer" @click="handleDeleteTask"/>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import useTasks from '~/store/useTasks';
import useUI from '~/store/useUI';
import { ModalViews, type ITask } from '~/types';
import { ref, onBeforeMount } from 'vue';

const router = useRouter()

const task = ref<ITask | null>(null)
const { getTask, deleteTask } = useTasks()
const { openModal } = useUI()

const { id } = useRoute().params
const colId = useRoute().query.column

const handleDeleteTask = () => {
    if (colId) {
        deleteTask(task.value?.id!, colId.toString())
        router.back()
    }
}

const handleEditTask = () => {
    openModal(ModalViews.EDIT_TASK, {
        task: task.value,
        colId
    })
}

onBeforeMount(() => {
    if (colId) {
        task.value = getTask(id.toString(), colId.toString())
    }
})
</script>

