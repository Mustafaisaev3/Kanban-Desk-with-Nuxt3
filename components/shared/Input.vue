<template>
    <div class="w-full h-auto">
        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900">{{ label }}</label>
        <input t
          type="text" 
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          v-bind="$attrs"
          class="bg-[#ffffff] border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-blue-500 block w-full p-2.5" 
        >
    </div>
</template>
<script setup lang="ts">
    defineProps<{
        label?: string | number
        placeholder?: string
        modelValue?: string | number
    }>()
</script>

