<template>
  <div>
    <Popover v-slot="{ open }" ref="popover" class="relative inline-block text-left" :id="`popover-${uuid}`" :as="as">
      <PopoverButton :disabled="disabled" @click="show"
        :class="[disabled ? 'disabled' : '', 'btn-primary', buttonClass]">
        <span>{{ buttonTitle }}</span>
        <ChevronDownIcon :class="open ? '' : 'text-opacity-100'"
          class="ml-2 h-5 w-5 text-violet-200 hover:text-violet-100 transition duration-150 ease-in-out group-hover:text-opacity-80"
          aria-hidden="true" />
      </PopoverButton>


      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
        <PopoverPanel 
          v-show="open" 
          ref="popoverMenu" 
          :id="`popover-menu-${uuid}`" 
          static 
          :class="['z-50 bg-white absolute top-0 left-0']"
        >
          <div class="w-screen max-w-2xl transform px-4 sm:px-0">
              <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 p-7">
                <slot>
                  <div class="relative grid gap-8 bg-white lg:grid-cols-2">
                    <a v-for="item in solutions" :key="item.name" :href="item.href"
                      class="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <div class="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12">
                        <div v-html="item.icon"></div>
                      </div>
                      <div class="ml-4">
                        <p class="text-sm font-medium text-gray-900">
                          {{ item.name }}
                        </p>
                        <p class="text-sm text-gray-500">
                          {{ item.description }}
                        </p>
                      </div>
                    </a>
                  </div>
                  <div class="bg-gray-50 p-4">
                    <a href="##"
                      class="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50">
                      <span class="flex items-center">
                        <span class="text-sm font-medium text-gray-900">
                          Documentation
                        </span>
                      </span>
                      <span class="block text-sm text-gray-500">
                        Start integrating products and tools
                      </span>
                    </a>
                  </div>
                </slot>

              </div>
            </div>
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { computePosition, shift, offset, flip, autoUpdate, Placement } from '@floating-ui/dom';
import { ref, PropType, toRefs } from 'vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
import { v4 as uuidv4 } from 'uuid';

const uuid = uuidv4();

const props = defineProps({
  buttonTitle: {
    default: 'Popover',
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

const { buttonTitle, buttonClass, as, floatingPadding, floatingPlacement, floatingOffset } = toRefs(props);

const popover = ref();
const popoverMenu = ref();

const calculatePosition = () => {
  computePosition(popover.value.el, popoverMenu.value.el, {
    placement: floatingPlacement.value,
    middleware: [offset(floatingOffset.value), flip(), shift({ padding: floatingPadding.value })]
  }).then(({ x, y }) => {
      Object.assign(popoverMenu.value.el.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  })
}

const show = async () => {
  autoUpdate(
    popover.value.el, 
    popoverMenu.value.el,
    calculatePosition
  );
}

const solutions = [
  {
    name: 'Insights',
    description: 'Measure actions your users take',
    href: '##',
    icon: `
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M24 11L35.2583 17.5V30.5L24 37L12.7417 30.5V17.5L24 11Z"
          stroke="#FB923C"
          stroke-width="2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M16.7417 19.8094V28.1906L24 32.3812L31.2584 28.1906V19.8094L24 15.6188L16.7417 19.8094Z"
          stroke="#FDBA74"
          stroke-width="2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M20.7417 22.1196V25.882L24 27.7632L27.2584 25.882V22.1196L24 20.2384L20.7417 22.1196Z"
          stroke="#FDBA74"
          stroke-width="2"
        />
      </svg>
    `,
  },
  {
    name: 'Automations',
    description: 'Create your own targeted content',
    href: '##',
    icon: `
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <path
          d="M28.0413 20L23.9998 13L19.9585 20M32.0828 27.0001L36.1242 34H28.0415M19.9585 34H11.8755L15.9171 27"
          stroke="#FB923C"
          stroke-width="2"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M18.804 30H29.1963L24.0001 21L18.804 30Z"
          stroke="#FDBA74"
          stroke-width="2"
        />
      </svg>
    `,
  },
  {
    name: 'Reports',
    description: 'Keep track of your growth',
    href: '##',
    icon: `
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="48" height="48" rx="8" fill="#FFEDD5" />
        <rect x="13" y="32" width="2" height="4" fill="#FDBA74" />
        <rect x="17" y="28" width="2" height="8" fill="#FDBA74" />
        <rect x="21" y="24" width="2" height="12" fill="#FDBA74" />
        <rect x="25" y="20" width="2" height="16" fill="#FDBA74" />
        <rect x="29" y="16" width="2" height="20" fill="#FB923C" />
        <rect x="33" y="12" width="2" height="24" fill="#FB923C" />
      </svg>
    `,
  },
]
</script>
