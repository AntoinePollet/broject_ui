<template>
  <div :class="width">
    <Listbox v-model="selectedItem" @update:model-value="update" :horizontal="horizontal" :multiple="multiple">
      <div class="relative">
        <ListboxButton placeholder="hello"
          class="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span v-if="multiple" class="block truncate">{{ selectedItem.length > 0 ? selectedItem.map((item: any) => item.name).join(', ') : 'Selected an item' }}</span>
          <span v-else class="block truncate">{{ selectedItem?.name }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption v-slot="{ active, selected }" v-for="item in items" :key="item.name" :value="item"
              as="template" :disabled="item?.disabled">
              <li :class="[
                active ? 'bg-primary-100 text-primary-900' : 'text-gray-900',
                'relative cursor-pointer select-none py-2 pl-10 pr-4',
              ]">
                <span :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]">{{ item.name }}</span>
                <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs } from 'vue'
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  modelValue: {
    type: Object as PropType<Object | null>,
    required: true
  },
  items: {
    type: Array as PropType<Object[]> as any,
  },
  width: {
    type: String as PropType<string>,
    default: 'w-40'
  },
  horizontal: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false
  }
});

const { multiple } = toRefs(props);

const emits = defineEmits(['update:modelValue'])

const update = (value: Object) => {
  emits('update:modelValue', value);
}

const selectedItem = ref<any>(multiple.value ? [] : { name: "Selected an item" });
</script>