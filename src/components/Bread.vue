<template>
    <el-breadcrumb separator="/" class="wrap">
        <el-breadcrumb-item v-for="item in route.matched" :key="item.path" :to="{ path: item.path }">{{ item.meta
            .title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<style scoped>
.wrap {
    height: 50px;
    line-height: 50px;
}
</style>
