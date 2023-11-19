<template>
  <MenuItem v-slot="{ active }">
    <button :class="[
      active ? 'bg-primary-400 text-white' : 'text-gray-900',
      'group flex w-full items-center rounded-md px-2 py-2 text-sm', itemClass
    ]">
      <font-awesome-icon v-if="prependIcon" :icon="prependIcon"
        :class="[active ? 'text-primary-200' : 'text-primary-400', 'mr-2 h-5 w-5']" aria-hidden="true"></font-awesome-icon>
      {{ title }}
      <font-awesome-icon v-if="appendIcon" :icon="appendIcon"
        :class="[active ? 'text-primary-200' : 'text-primary-400', 'ml-2 h-5 w-5']" aria-hidden="true"></font-awesome-icon>
    </button>
  </MenuItem>
</template>

<script setup lang="ts">
import { MenuItem } from '@headlessui/vue'
import type { PropType } from "vue";
import { toRefs } from "vue";

const props = defineProps({
  title: {
    default: () => [],
    type: String as PropType<string>,
    required: true
  },
  prependIcon: {
    default: null,
    type: String as PropType<string>
  },
  appendIcon: {
    default: null,
    type: String as PropType<string>
  },
  itemClass: {
    default: '',
    type: String as PropType<string>
  }
});

const { itemClass, title, prependIcon, appendIcon } = toRefs(props);

</script>

<style lang="scss"></style>