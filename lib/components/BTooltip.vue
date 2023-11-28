<template>
    <transition appear enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100" leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100" leave-to-class="translate-y-1 opacity-0">
        <div v-show="showTooltip" ref="floatingElement" :id="`tooltip-${uuid}`"
            :class="['absolute top-0 left-0 p-3 bg-gray-600 text-white rounded-xl', tooltipClass]" role="tooltip">
            My tooltip
            <div ref="arrowElement" id="arrow"></div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { v4 as uuidv4 } from "uuid";
import { PropType, onMounted, ref, toRefs } from "vue";
import { computePosition, shift, offset, flip, autoUpdate, arrow, Placement } from '@floating-ui/dom';

const uuid = uuidv4();

const props = defineProps({
    targetElementId: {
        required: true,
        type: String as PropType<string>
    },
    tooltipClass: {
        type: String as PropType<string>,
        default: ''
    },
    floatingPlacement: {
        type: String as PropType<Placement>,
        default: 'top'
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

const { targetElementId, floatingPlacement, floatingPadding, floatingOffset } = toRefs(props); 

const showTooltip = ref<boolean>(false);

const showEvents = ['mouseenter', 'focus'];
const hideEvents = ['mouseleave', 'blur'];

const referenceElement = ref();
const floatingElement = ref();
const arrowElement = ref();

onMounted(() => {
    referenceElement.value = document.querySelector(`#${targetElementId.value}`) as Element;
    if (referenceElement) {

        showEvents.forEach((event) => {
            if (referenceElement.value) {
                referenceElement.value.addEventListener(event, show)
            }
        });

        hideEvents.forEach((event) => {
            if (referenceElement.value) {
                referenceElement.value.addEventListener(event, hide);
            }
        });
    }
});

const calculatePosition = () => {
    computePosition(referenceElement.value, floatingElement.value, {
        placement: floatingPlacement.value,
        middleware: [
            offset(floatingOffset.value), 
            flip(), 
            shift({ padding: floatingPadding.value }), 
            arrow({ element: arrowElement.value })
        ]
    }).then(({ x, y, placement, middlewareData }) => {
        Object.assign(floatingElement.value.style, {
            left: `${x}px`,
            top: `${y}px`,
        });

        // @ts-ignore
        const {x: arrowX, y: arrowY} = middlewareData.arrow;

        const staticSide = {
            top: 'bottom',
            right: 'left',
            bottom: 'top',
            left: 'right',
        }[placement.split('-')[0]];
        
        Object.assign(arrowElement.value.style, {
            left: arrowX != null ? `${arrowX}px` : '',
            top: arrowY != null ? `${arrowY}px` : '',
            right: '',
            bottom: '',
            // @ts-ignore
            [staticSide]: '-4px',
        });
    })
}

const show = async () => {
    autoUpdate(
        referenceElement.value, 
        floatingElement.value,
        calculatePosition
    );
    showTooltip.value = true;
}

const hide = () => {
    showTooltip.value = false;
}
</script>