<template>
    <button 
      class="py-2 px-4 rounded-md text-sm flex gap-4 justify-between items-center"
      :class="`
        ${variant ? buttonVariants[variant as keyof typeof buttonVariants] : buttonVariants.default}
      `"
    >
        <slot></slot>
        <IconCSS v-if="icon" :name="icon" class="text-lg" />
    </button>
</template>
<script setup lang="ts">

const { variant } = defineProps({
    variant: {
        type: String
    },
    icon: {
        type: String,
    },
})

const buttonVariants = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
    red: 'text-white bg-[#f0373ace] border-[#f0373ace] hover:border-[#f0373ace]/90 hover:bg-[#f0373ace]/90 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2',
    gray: 'text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700',
    green: 'bg-green-500 text-white hover:text-white border border-green-500 hover:border-green-600 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ',
}

</script>