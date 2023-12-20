<template>
  <div ref="table"></div>
</template>

<script setup lang="ts">
import type {
  TabulatorFull as TabulatorFullType,
  ColumnDefinition,
  OptionsColumns,
  OptionsData,
} from "tabulator-tables";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { onMounted, ref, PropType, toRefs } from "vue";

const emit = defineEmits(["cellClick"]);

const props = defineProps({
  tableData: {
    type: Array as PropType<OptionsData["data"]>,
    default: () => [],
    required: true,
  },
  autoColumnsDefinitions: {
    type: [Array, Object, Function] as PropType<
      OptionsColumns["autoColumnsDefinitions"]
    >,
    default: null,
  },
  columns: {
    type: Array as PropType<Array<ColumnDefinition>>,
    required: true,
  },
});

const { autoColumnsDefinitions, tableData, columns } = toRefs(props);

const table = ref<HTMLElement | string>();
const tabulator = ref<TabulatorFullType>();
// const tableData = ref<OptionsData['data']>([ { name: 'Antoine', age: 34 }, { name: 'Maxime', age: 23 } ]);

onMounted(() => {
  if (table.value) {
    tabulator.value = new Tabulator(table.value, {
      data: tableData.value, //link data to table
      reactiveData: true, //enable data reactivity
      // autoColumns: true,
      responsiveLayout: true,
      invalidOptionWarnings: false,
      columns: columns.value,
      autoColumnsDefinitions: !!autoColumnsDefinitions.value
        ? autoColumnsDefinitions.value
        : function (definitions: any) {
            definitions.forEach((column: ColumnDefinition) => {
              column.vertAlign = "middle";
              column.resizable = true;
              column.sorter = "string";
              column.headerSort = true;
              column.cellClick = (e: UIEvent, cell: CellComponent) => {
                console.log(cell);
                emit("cellClick", cell);
              };
            });

            return definitions;
          },
      headerSortElement: function (column, dir) {
        switch (dir) {
          case "asc":
            return '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"/></svg>';
            break;
          case "desc":
            return '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"/></svg>';
            break;
          default:
            return '<svg xmlns="http://www.w3.org/2000/svg" height="16" width="10" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M137.4 41.4c12.5-12.5 32.8-12.5 45.3 0l128 128c9.2 9.2 11.9 22.9 6.9 34.9s-16.6 19.8-29.6 19.8H32c-12.9 0-24.6-7.8-29.6-19.8s-2.2-25.7 6.9-34.9l128-128zm0 429.3l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128c-12.5 12.5-32.8 12.5-45.3 0z"/></svg>';
        }
      },
      layout: "fitColumns",
      headerSort: true,
      resizableRows: false,
      placeholder: "No element(s) found",
    });
  }
  console.log(tabulator.value);
});
</script>
