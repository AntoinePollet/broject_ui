<template>
    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
        <div :id="`tooltip-${uuid}`" 
            :class="[showTooltip ? 'block': 'hidden', 'p-3 bg-gray-600 text-white']" role="tooltip">
            My tooltip
        </div>
    </transition>
</template>

<script setup lang="ts">
import { createPopper } from "@popperjs/core";
import { v4 as uuidv4 } from "uuid";
import { PropType, onMounted, ref, toRefs } from "vue";

const uuid = uuidv4();

const props = defineProps({
    targetElementId: {
        required: true,
        type: String as PropType<string>
    }
});

const { targetElementId } = toRefs(props); 

const popper = ref()
const showTooltip = ref<boolean>(false);
const tooltipElement = ref<HTMLElement>();
const targetElement = ref<Element>();

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

onMounted(() => {
    targetElement.value = document.querySelector(`#${targetElementId.value}`) as Element;
    tooltipElement.value = document.querySelector(`#tooltip-${uuid}`) as HTMLElement;

    if (targetElement) {

        showEvents.forEach((event) => {
            if (targetElement.value) {
                targetElement.value.addEventListener(event, show)
            }
        });

        hideEvents.forEach((event) => {
            if (targetElement.value) {
                targetElement.value.addEventListener(event, hide);
            }
        });
    }
});

const show = () => {
    if (!popper.value && targetElement.value && tooltipElement.value) {
        popper.value = createPopper(targetElement.value, tooltipElement.value, {
            placement: 'top',
            modifiers: [
                {
                    options: {
                        name: 'offset',
                        offset: [10, 10]
                    }
                }
            ]
        });
    }
    showTooltip.value = true;
    popper.value.update();
}

const hide = () => {
    showTooltip.value = false;
}

</script>