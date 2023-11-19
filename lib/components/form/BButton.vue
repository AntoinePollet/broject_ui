<template>
    <div :class="[variantClass[variant], 'relative', { 'disabled' : disabled }]" @click="click">
        <div v-if="prependIcon">
            <font-awesome-icon v-if="prependIcon" :icon="prependIcon"
            :class="['mr-2 h-5 w-5']" aria-hidden="true"></font-awesome-icon>
        </div>
        <slot name="prepend"></slot>
        <button :disabled="disabled">
            <slot></slot>
        </button>
        <slot name="append"></slot>
        <font-awesome-icon v-if="appendIcon" :icon="prependIcon"
            :class="['ml-2 h-5 w-5']" aria-hidden="true"></font-awesome-icon>
    </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const emit = defineEmits(['click']);

enum ButtonVariant {
    "primary",
    "secondary"
}

const variantClass = {
    "primary": "btn-primary",
    "secondary": "btn-secondary"
}

// @ts-ignore
const props = defineProps({
    variant: {
        type: String as PropType<keyof ButtonVariant>,
        default: "primary",
        validator: (value: string) => Object.values(ButtonVariant).includes(value)
    },
    title: {
        type: String as PropType<string>,
        default: "classic btn"
    },
    disabled: {
        type: Boolean as PropType<boolean>,
        default: false
    },
    prependIcon: {
        type: String as PropType<string>,
        default: ""
    },
    appendIcon: {
        type: String as PropType<string>,
        default: ""
    }
});

const click = () => {
    emit('click');
}

</script>