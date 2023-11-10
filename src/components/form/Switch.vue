<template>
  <SwitchGroup as="div" class="flex items-center">
    <SwitchLabel v-if="label" :class="['mr-4', labelClass]">{{ label }}</SwitchLabel>
    <Switch v-model="enabled" :class="enabled ? 'bg-primary-500' : 'bg-secondary-400'"
      class="relative inline-flex h-[20px] w-[40px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
      <span class="sr-only">Use setting</span>
      <span aria-hidden="true" :class="enabled ? 'translate-x-5' : 'translate-x-0'"
        class="pointer-events-none inline-block h-[16px] w-[16px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out" />
    </Switch>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { PropType, computed, watch } from 'vue'
import { Switch, SwitchGroup, SwitchLabel } from '@headlessui/vue'

const props = defineProps({
  modelValue: {
    type: Boolean as PropType<boolean>,
    required: true
  },
  label: {
    type: String as PropType<string>
  },
  labelClass: {
    type: String as PropType<string>
  }
});

const emit = defineEmits(['update:modelValue', 'change']);

const enabled = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
})

watch(
  () => props.modelValue,
  (newValue: boolean) => {
    enabled.value = newValue;
    emit('change', newValue);
  }
);

</script>
