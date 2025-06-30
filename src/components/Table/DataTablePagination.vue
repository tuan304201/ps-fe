<script setup>
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-vue-next";
import { computed } from "vue";

const props = defineProps(["table"]);
const table = computed(() => props.table);

const currentPage = computed(() => table.value.getState().pagination.pageIndex + 1);
const totalPages = computed(() => table.value.getPageCount());

const getPageNumbers = computed(() => {
  const maxVisiblePages = 5;
  const pages = [];
  const total = totalPages.value;
  const current = currentPage.value;

  if (total <= maxVisiblePages) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  if (current <= 3) {
    pages.push(1, 2, 3, 4, "...", total);
  } else if (current >= total - 2) {
    pages.push(1, "...", total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "...", current - 1, current, current + 1, "...", total);
  }

  return pages;
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between px-2">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of {{ table.getFilteredRowModel().rows.length }} row(s)
        selected.
      </div>
      <div class="flex items-center space-x-2">
        <p class="text-sm font-medium">Rows per page</p>
        <Select :model-value="String(table.getState().pagination.pageSize)" @update:model-value="table.setPageSize">
          <SelectTrigger class="h-8 w-[70px]">
            <SelectValue :placeholder="table.getState().pagination.pageSize.toString()" />
          </SelectTrigger>
          <SelectContent side="top">
            <SelectItem v-for="pageSize in [5, 10, 20, 30, 50]" :key="pageSize" :value="pageSize.toString()">
              {{ pageSize }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div class="flex items-center justify-center space-x-6 lg:space-x-8 mt-4">
      <div class="flex items-center space-x-2">
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="currentPage === 1"
          @click="table.setPageIndex(0)"
        >
          <span class="sr-only">Go to first page</span>
          <ChevronsLeft class="h-4 w-4" />
        </Button>
        <Button variant="outline" class="h-8 w-8 p-0" :disabled="currentPage === 1" @click="table.previousPage()">
          <span class="sr-only">Go to previous page</span>
          <ChevronLeft class="h-4 w-4" />
        </Button>

        <!-- Số trang -->
        <Button
          v-for="page in getPageNumbers"
          :key="page"
          variant="outline"
          class="h-8 w-8 p-0"
          :class="{ 'bg-primary text-white': page === currentPage }"
          :disabled="page === '...'"
          @click="typeof page === 'number' && table.setPageIndex(page - 1)"
        >
          {{ page }}
        </Button>

        <Button variant="outline" class="h-8 w-8 p-0" :disabled="currentPage === totalPages" @click="table.nextPage()">
          <span class="sr-only">Go to next page</span>
          <ChevronRight class="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          class="hidden h-8 w-8 p-0 lg:flex"
          :disabled="currentPage === totalPages"
          @click="table.setPageIndex(totalPages - 1)"
        >
          <span class="sr-only">Go to last page</span>
          <ChevronsRight class="h-4 w-4" />
        </Button>
      </div>
    </div>
  </div>
</template>
