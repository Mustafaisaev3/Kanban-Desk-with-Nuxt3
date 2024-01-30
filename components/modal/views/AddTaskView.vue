<template>
    <div class="w-[500px] h-[auto] flex flex-col rounded-md bg-[#ffffff] overflow-hidden">
        <div class="w-full h-auto flex justify-between items-center p-4 bg-[#dff0fa]">
            <h2 v-if="edit" class="text-xl">Редактировать задачу</h2>
            <h2 v-else class="text-xl">Добавить задачу</h2>
            <IconCSS name="mdi:close" class="text-xl cursor-pointer" @click="closeModal"/>
        </div>
        <div class="flex-1 p-4 h-auto">
            <Input placeholder="Hello" label="Название" v-model="taskTitleInputRef"/>
            <Input placeholder="Hello" label="Описание" v-model="taskDescriptionInputRef"/>
        </div>
        <div class="w-full h-auto p-2 flex justify-end gap-2">
            <Button :variant="'red'" @click="closeModal">Отмена</Button>
            <Button v-if="edit" :variant="'green'" @click="editExistTask">Редактировать</Button>
            <Button v-else :variant="'green'" @click="addNewTask">Добавить</Button>
        </div>
    </div>
</template>
<script setup lang="ts">
import useUI from '@/store/useUI'
import useTasks from '@/store/useTasks'
import Button from '~/components/shared/Button.vue';
import Input from '~/components/shared/Input.vue'
import { v4 as uuid } from 'uuid'

const { edit } = defineProps({
    edit: {
        type: Boolean,
        required: false,
    },
})

const { closeModal, modalData } = useUI()
const { addTask, editTask } = useTasks()
const { task, columnId } = modalData

console.log(modalData)

const taskTitleInputRef = ref(task ? task.title : '')
const taskDescriptionInputRef = ref(task ? task.description : '')

const addNewTask = () => {
    if (!taskTitleInputRef.value || !taskDescriptionInputRef.value) {
        return
    }

    const newTask = {
        id: uuid(),
        title: taskTitleInputRef.value,
        description: taskDescriptionInputRef.value
    }
    addTask(newTask, modalData)
    closeModal()
}

const editExistTask = () => {
    editTask(task.id, columnId, taskTitleInputRef.value, taskDescriptionInputRef.value)
    closeModal()
}
</script>