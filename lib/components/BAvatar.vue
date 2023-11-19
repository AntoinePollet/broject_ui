<template>
    <div :style="{ width: `${size}px`, height: `${size}px` }" class="rounded-full bg-primary-50 relative avatar">
        <img v-if="url" :src="url" class="rounded-full h-full object-cover"/>
        <div v-else class="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4">
            <span class="text-primary-500">{{ generateInitials(text) }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue';

const props = defineProps({
    url: {
        type: String as PropType<string>,
        required: false,
        default: ''
    },
    size: {
        type: Number as PropType<number>,
        default: 50,
    },
    text: {
        type: String as PropType<string>,
        required: false,
        default: ''
    }
});

const { text } = toRefs(props);

const generateInitials = (name: string) => {
    const initials = name
        .split(' ')
        .map((word: string) => word.charAt(0))
        .join('')
        .toUpperCase();
    return initials.length > 2 ? initials.slice(0, 2) : initials;
};
</script>