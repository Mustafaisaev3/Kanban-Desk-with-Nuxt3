<template>
    <div class="w-[500px] h-[auto] flex flex-col rounded-md bg-[#ffffff] overflow-hidden">
        <div class="w-full h-auto flex justify-between items-center p-4 bg-[#dff0fa]">
            <h2 class="text-xl">Добавить колонку</h2>
            <IconCSS name="mdi:close" class="text-xl cursor-pointer" @click="closeModal"/>
        </div>
        <div class="flex-1 p-4 h-auto">
            <Input placeholder="Hello" label="Название колонки" v-model="columnTitleInputRef"/>
        </div>
        <div class="w-full h-auto p-2 flex justify-end gap-2">
            <Button :variant="'red'" @click="closeModal">Отмена</Button>
            <Button :variant="'green'" @click="addNewColumn">Добавить</Button>
        </div>
    </div>
</template>
<script setup lang="ts">
import useUI from '@/store/useUI'
import useTasks from '@/store/useTasks'
import Button from '~/components/shared/Button.vue';
import Input from '~/components/shared/Input.vue'

const columnTitleInputRef = ref("")

const { closeModal } = useUI()
const { addColumn } = useTasks()

const addNewColumn = () => {
    if (!columnTitleInputRef.value) {
        return
    }

    addColumn(columnTitleInputRef.value)
    closeModal()
}
</script>