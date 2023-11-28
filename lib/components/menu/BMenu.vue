<template>
  <div>
    <Menu v-slot="{ open }"  :id="`menu-${uuid}`" :as="as" class="relative inline-block text-left">
      <div>
        <MenuButton ref="referenceElement" @click="show" :disabled="disabled"
          :class="[disabled ? 'disabled' : '', 'btn-primary', buttonClass]">
          {{ buttonTitle }}
          <ChevronDownIcon class=" ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100" aria-hidden="true" />
        </MenuButton>
      </div>

      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform scale-100 opacity-0"
        leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0">
        <MenuItems 
          v-show="open" 
          ref="floatingElement" 
          static 
          :id="`menu-items-${uuid}`"
          class="z-50 absolute top-0 mt-0 origin-top divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
            <div class="px-1 py-1">
              <slot></slot>
            </div>
          </MenuItems>
        </transition>
    </Menu>
  </div>
</template>

<script setup lang="ts">
import { Menu, MenuButton, MenuItems } from '@headlessui/vue'
import type { PropType } from "vue";
import { toRefs, ref } from "vue";
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { v4 as uuidv4 } from 'uuid';
import { Placement, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';

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
  },
  floatingPlacement: {
      type: String as PropType<Placement>,
      default: 'bottom-start'
  },
  floatingPadding: {
      type: Number as PropType<number>,
      default: 10
  },
  floatingOffset: {
    type: Number as PropType<number>,
    default: 10
  }
});

const { buttonTitle, floatingPadding, floatingPlacement, floatingOffset  } = toRefs(props);

const referenceElement = ref();
const floatingElement = ref();

const calculatePosition = () => {
  computePosition(referenceElement.value.el, floatingElement.value.el, {
    placement: floatingPlacement.value,
    middleware: [offset(floatingOffset.value), flip(), shift({ padding: floatingPadding.value })]
  }).then(({ x, y }) => {
      Object.assign(floatingElement.value.el.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
  })
}

const show = async () => {
  autoUpdate(
    referenceElement.value.el, 
    floatingElement.value.el,
    calculatePosition
  );
}

</script>