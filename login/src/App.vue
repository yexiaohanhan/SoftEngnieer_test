<template>

  <router-view/>

</template>

<script setup>
import { provide } from "vue";
import * as echarts from "echarts";

//通过provide提供echarts
provide("echarts", echarts);
</script>




