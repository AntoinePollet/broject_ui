<template>
  <div>
    <button type="button" @click="openModal" :disabled="disabled" :class="[disabled ? 'disabled' : '', 'btn-primary', buttonClass]">
      {{ buttonTitle }}
    </button>
  </div>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-50">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div :class="[scrollable ? 'w-scren' : '', 'fixed inset-0']">
        <div :class="[scrollable ? 'w-scren h-screen' : '', 'flex items-center justify-center p-4 text-center']">

          <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95">
            <DialogPanel
              :class="['transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all', computedSize]">
              <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                {{ title }}
                <slot name="title"></slot>
              </DialogTitle>
              <div class="mt-2 overflow-y-auto max-h-[500px]">
                <slot name="content">
                  <p class="text-sm text-gray-500">
                    Your payment has been successfully submitted. We’ve sent you
                    an email with all of the details of your order.
                  </p>
                </slot>
              </div>

              <div class="mt-4">
                <div class="flex gap-3">
                  <button type="button" class="btn-secondary" @click="cancel()">
                    Cancel
                  </button>
                  <button type="button" class="btn-primary" @click="ok()">
                    Ok
                  </button>
                </div>
                <slot name="footer"></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { PropType, ref, toRefs, computed } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

enum Size {
  'xs',
  'sm',
  'md',
  'lg',
  'xl',
  '2xl',
  '3xl',
  '4xl',
  '5xl',
  '6xl',
  '7xl',
}

const dialogSizes = {
  'xs': 'max-w-xs',
  'sm': 'max-w-sm',
  'md': 'max-w-md',
  'lg': 'max-w-lg',
  'xl': 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

const props = defineProps({
  title: {
    type: String as PropType<string>,
    default: 'Default Title'
  },
  buttonTitle: {
    type: String as PropType<string>,
    default: 'Open dialog'
  },
  size: {
    type: String as PropType<keyof typeof Size>,
    default: 'md',
    validator: (value: string) => Object.values(Size).includes(value)
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  scrollable: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  buttonClass: {
    type: String as PropType<string>,
    default: ""
  }
});

const { buttonTitle, size } = toRefs(props);

const emits = defineEmits(['cancel', 'ok']);

const isOpen = ref(false)

const computedSize = computed(() => {
  return dialogSizes[size.value]
});

const cancel = () => {
  emits('cancel');
  closeModal();
}

const ok = () => {
  emits('ok');
  closeModal();
}

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}
</script>
