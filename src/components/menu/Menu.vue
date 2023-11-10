<template>
  <div>
    <Menu v-slot="{ open }" :id="`menu-${uuid}`" :as="as" class="relative inline-block text-left">
      <div>
        <MenuButton @click="initializePopper(open)" :disabled="disabled"
          :class="[disabled ? 'disabled' : '', 'btn-primary', buttonClass]">
          {{ buttonTitle }}
          <ChevronDownIcon class=" ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
        </MenuButton>
      </div>


      <MenuItems static :id="`menu-items-${uuid}`"
        class="z-50 absolute top-0 mt-0 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-100 opacity-0"
          leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0">
          <div v-show="open">
            <div class="px-1 py-1">
              <slot></slot>
            </div>
          </div>
        </transition>
      </MenuItems>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import type { PropType } from "vue";
import { toRefs, ref } from "vue";
import { createPopper } from '@popperjs/core';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();

const props = defineProps({
  buttonTitle: {
    default: 'Options',
    type: String as PropType<string>
  },
  buttonClass: {
    default: '',
    type: String as PropType<string>
  },
  as: {
    default: 'div',
    type: String as PropType<string>
  },
  disabled: {
    default: false,
    type: Boolean as PropType<boolean>
  }
});

const { buttonTitle } = toRefs(props);

let popper = ref()

const initializePopper = (open: boolean) => {
  const menu = document.querySelector(`#menu-${uuid}`) as Element;
  const menuItems = document.querySelector(`#menu-items-${uuid}`) as HTMLElement;

  if (!open && !popper.value) {
    popper.value = createPopper(menu, menuItems, {
      placement: 'bottom-start',
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        }
      ],
    });
  }
}

</script>