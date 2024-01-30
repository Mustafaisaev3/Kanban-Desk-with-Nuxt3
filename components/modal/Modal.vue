<template>
    <teleport to="body">
        <div v-if="isModalOpen" class="absolute left-0 top-0 w-full h-full flex items-center justify-center z-10 bg-[#20202088]">
            <AddColumnView v-if="modalView == ModalViews.ADD_COLUMN" />
            <AddTaskView v-if="modalView == ModalViews.ADD_TASK" />
            <AddTaskView v-if="modalView == ModalViews.EDIT_TASK" :edit="true" />
        </div>
    </teleport>
</template>
<script setup lang="ts">
import AddColumnView from './views/AddColumnView.vue';
import AddTaskView from './views/AddTaskView.vue';
import useUI from '@/store/useUI'
import { storeToRefs } from 'pinia';
import { ModalViews } from '~/types';

const { isModalOpen, modalView } = storeToRefs(useUI())
console.log(modalView)

</script>
<!-- <style scoped> 
* {
    background: }
</style> -->