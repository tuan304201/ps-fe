<script setup>
import { columns } from "@/components/Table/columns";
import DataTable from "@/components/Table/DataTable.vue";
import { storeToRefs } from "pinia";
import { useTaskStore } from "@/stores/taskStore";

const taskStore = useTaskStore();
const { tasks } = storeToRefs(taskStore);
</script>

<template>
  <div class="container px-3 sm:px-4 lg:px-8 md:my-5 my-2">
    <div class="w-full">
      <h2 class="text-2xl font-semibold text-primary mb-4">Đơn mua</h2>
      <DataTable :data="tasks" :columns="columns" />
    </div>
  </div>
</template>
