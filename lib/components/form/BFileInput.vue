<template>
  <div>

    <label class="block">
      <span :for="label" class="btn-primary cursor-pointer items-center gap-2">
        <font-awesome-icon icon="fa-solid fa-download" />
        <span v-if="multiple">
          {{ files && files.length > 1 ? $tc('selectedFiles', 0, { count: files.length }) : files && files.length === 1 ?
            $tc('selectedFiles', 1, { fileName: files[0].name }) : $tc('inputFileLabel') }}
        </span>
        <span v-else>
          {{ files ? $tc('selectedFiles', 1, { fileName: (files as File).name }) : $tc('inputFileLabel') }}
        </span>
      </span>

      <input type="file" name="files" :required="required" :id="label" :multiple="multiple" :accept="accept"
        @change="onChange" :disabled="disabled"
        :class="['w-[0.1px] h-[0.1px] absolute opacity-0 overflow-hidden z-0 pointer-events-none']"
        :placeholder="placeholder" />
    </label>
    <span v-if="maxSizeExceeded" class="text-red-500 italic font-normal text-sm">
      {{ $t('fileSizeExceeded', { size: maxSize }) }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { PropType, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object as PropType<FileList | File>
  },
  placeholder: {
    type: String as PropType<string>,
    default: ''
  },
  name: {
    type: String as PropType<string>,
    default: ''
  },
  label: {
    type: String as PropType<string>,
    default: ''
  },
  required: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  multiple: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  accept: {
    type: String as PropType<string>,
    default: 'image/png, image/jpeg'
  },
  disabled: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  maxSize: {
    type: Number as PropType<number>,
    default: 1
  }
});

const emits = defineEmits(['update:modelValue', 'change']);

const files = ref<File | FileList | null>(null);
const maxSizeExceeded = ref<boolean>(false);

const { multiple } = props;

const onChange = (event) => {
  const maxSizeInMB = (1024 * 1024) * props.maxSize;
  maxSizeExceeded.value = false;
  if (multiple) {
    let filesSizes = 0;
    Array.from(event.target.files as FileList).forEach(file => filesSizes += file.size);
    if (filesSizes > maxSizeInMB) {
      event.target.value = '';
      emits('update:modelValue', null)
      maxSizeExceeded.value = true;
      files.value = null;
    } else {
      files.value = event.target.files;
      emits('update:modelValue', files.value)
    }
  } else {
    const file = event.target.files[0];
    if (file.size > maxSizeInMB) {
      maxSizeExceeded.value = true;
      emits('update:modelValue', null);
      files.value = null;
    } else {
      files.value = file;
      emits('update:modelValue', files.value);
    }
  }
}
</script>