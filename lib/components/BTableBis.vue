<template>
  <table class="border-collapse table-auto shadow-lg p-5 w-full rounded-md">
    <thead>
      <tr class="border-b">
        <th v-if="selectable" class="p-3"> selec </th>
        <th
          v-for="column in columns"
          :class="[
            column?.sortable ? 'cursor-pointer sortable pointer-events-auto' : '',
            'text-sm p-3 text-start font-normal select-none inline-table',
          ]"
          @click="setSortable($event, column)"
          aria-sort="none"
        >
          <span>{{ column.text }}</span>
          <span v-show="column?.sortable">
            <ArrowUpIcon
              :class="[
                { 'none opacity-0': columnSortStatus[column.value] === 'none' },
                {
                  'opacity-100 ascending':
                    columnSortStatus[column.value] === 'ascending' && columnBeingSorted === column.value,
                },
                {
                  'opacity-100 descending':
                    columnSortStatus[column.value] === 'descending' && columnBeingSorted === column.value,
                },
                'h-5 w-5',
              ]"
            />
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in filteredItems" class="border-b last:border-b-0 hover:bg-slate-50">
        <td v-if="selectable" class="p-3"> check</td>

        <td
          v-for="[index, [key, value]] of Object.entries(Object.entries(item))"
          :key="key"
          :class="[tdAlign(key), 'p-3']"
          @click="rowClicked(item, items.indexOf(item))"
          @dblclick="rowDbClicked(item, items.indexOf(item))"
        >
          <slot :name="key" :value="value" :item="item">
            {{ item[columns[index].value] }}
          </slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { PropType, computed, onMounted, ref, toRefs } from 'vue';
import { ArrowUpIcon } from '@heroicons/vue/20/solid';

const emit = defineEmits(['rowClicked', 'rowDbClicked']);

type AlignDefinition = 'start' | 'center' | 'end' | 'right' | 'left' | 'justify';

type Sort = 'none' | 'ascending' | 'descending';

type ColumnDefinition = {
  sortable: boolean;
  name: string;
  value: string;
  text: string;
  align: AlignDefinition;
};

type ItemDefinition = {
  name: string;
  value: string;
};

const props = defineProps({
  columns: {
    type: Array as PropType<Array<ColumnDefinition>>,
    default: () => [],
  },
  items: {
    type: Array as PropType<Array<ItemDefinition>>,
    default: () => [],
  },
  selectable: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
});

const currentSort = ref<Sort>('none');
const columnBeingSorted = ref<string | null>(null);
const columnSortStatus = ref<{ [key: string]: Sort }[]>([]);

onMounted(() => {
  columns.value.forEach((col) => {
    if (col?.sortable) columnSortStatus.value[col.value] = 'none';
  });
});

const rowClicked = (item, index: number) => {
  emit('rowClicked', { item, index });
};

const setSortable = (event: Event, column: ColumnDefinition) => {
  const columnTableHeader = (event.target as HTMLElement).closest('.sortable')!;

  // Only allow to filter by one column
  // Reset all sort to none but the currentTarget

  Object.keys(columnSortStatus.value).forEach((key) => (columnSortStatus.value[key] = 'none'));

  const allSortableEl = Array.from(document.querySelectorAll('table th.sortable')).filter((el) => {
    return el != columnTableHeader;
  });

  allSortableEl.forEach((el) => {
    el.setAttribute('aria-sort', 'none');
  });

  const sort = columnTableHeader.getAttribute('aria-sort');
  switch (sort) {
    case 'none':
      columnTableHeader.setAttribute('aria-sort', 'ascending');
      columnSortStatus.value[column.value] = 'ascending';
      currentSort.value = 'ascending';
      columnBeingSorted.value = column.value;
      break;
    case 'ascending':
      columnTableHeader.setAttribute('aria-sort', 'descending');
      columnSortStatus.value[column.value] = 'descending';
      currentSort.value = 'descending';
      columnBeingSorted.value = column.value;
      break;
    case 'descending':
      columnTableHeader.setAttribute('aria-sort', 'ascending');
      columnSortStatus.value[column.value] = 'ascending';
      currentSort.value = 'ascending';
      columnBeingSorted.value = column.value;
      break;
  }
};

const rowDbClicked = (item, index: number) => {
  emit('rowDbClicked', { item, index });
};

const tdAlign = (key: string) => {
  return columns.value.find((h) => h.value === key)?.align
    ? `text-${columns.value.find((h) => h.value === key)?.align}`
    : 'text-start';
};

const filteredItems = computed(() => {
  const itemsToSortType = typeof items.value[0][columnBeingSorted.value!];

  if (currentSort.value === 'none') return items.value;

  if (currentSort.value === 'ascending') {
    items.value.sort((a, b) => {
      return itemsToSortType === 'string'
        ? a[columnBeingSorted.value!].toLowerCase().localeCompare(b[columnBeingSorted.value!].toLowerCase())
        : a[columnBeingSorted.value!] - b[columnBeingSorted.value!];
    });
  } else {
    items.value.sort((a, b) => {
      return itemsToSortType === 'string'
        ? b[columnBeingSorted.value!].toLowerCase().localeCompare(a[columnBeingSorted.value!].toLowerCase())
        : b[columnBeingSorted.value!] - a[columnBeingSorted.value!];
    });
  }
  return items.value;
});

const { items, columns } = toRefs(props);
</script>

<style scoped>
table th span {
  display: inline-block;
  vertical-align: middle;
}

table th span svg.descending {
  transition: ease-in-out 200ms transform;
  transform: rotate(180deg);
}

table th span svg.ascending {
  transition: ease-in-out 200ms transform;
}
table th:hover span svg.none {
  transition: ease-in 200ms opacity;
  opacity: 0.5;
}
</style>
