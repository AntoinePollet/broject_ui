<template>
    <label class="block">
        <span v-if="label"
        :class="[required ? 'after:content-[\'*\'] after:ml-0.5 after:text-red-500' : '', ' block text-sm font-medium text-slate-700']">
        {{ label }}
        </span>
        <textarea 
            v-model="value"
            @update:model-value="update"
            :required="required"
            :placeholder="placeholder"
            class="mt-1 px-3 py-2 bg-white border shadow-sm border-primary-300 placeholder-slate-400 
                focus:outline-none focus:border-primary-500 
                focus:ring-primary-500 block w-full rounded-md sm:text-sm focus:ring-1"
        ></textarea>
    </label>
</template>

<script setup lang="ts">

import { PropType, ref } from 'vue';

defineProps({
    modelValue: {
        type: String as PropType<string>,
        default: ''
    },
    label: {
        type: String as PropType<string>,
        default: ''
    },
    placeholder: {
        type: String as PropType<string>,
        default: ''
    },
    required: {
        type: Boolean as PropType<boolean>,
        default: false
    },
});

const emits = defineEmits(['update:modelValue', 'change']);

const value = ref(undefined);

const update = (value) => {
    emits('update:modelValue', value)
}

</script>