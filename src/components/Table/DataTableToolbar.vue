<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { computed } from "vue";
import { X } from "lucide-vue-next";

import { priorities, statuses } from "./data/data";
import DataTableFacetedFilter from "./DataTableFacetedFilter.vue";

const props = defineProps({
  table: Object,
});

const isFiltered = computed(() => props.table.getState().columnFilters.length > 0);
</script>

<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-1 items-center space-x-2">
      <Input
        placeholder="Tìm sản phẩm..."
        :model-value="table.getColumn('productName')?.getFilterValue() ?? ''"
        class="h-8 w-[150px] lg:w-[250px]"
        @input="table.getColumn('productName')?.setFilterValue($event.target.value)"
      />
      <DataTableFacetedFilter
        v-if="table.getColumn('status')"
        :column="table.getColumn('status')"
        title="Status"
        :options="statuses"
      />

      <Button v-if="isFiltered" variant="ghost" class="h-8 px-2 lg:px-3" @click="table.resetColumnFilters()">
        Reset
        <X class="ml-2 h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
