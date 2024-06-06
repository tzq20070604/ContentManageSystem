<template>
    <el-aside width="200px">
        <el-scrollbar>
            <el-menu :default-openeds="['/info']" active-text-color="green" :router="true"
                :default-active="route.fullPath">
                <MenuItem :data="routeData">
                </MenuItem>
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { HomeRoutes } from "../router/data.js"
import MenuItem from './MenuItem.vue'
import { useRoute } from 'vue-router';
const routeData = ref(HomeRoutes)
const route = useRoute()
</script>

<style scoped>
.el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.el-menu {
    border-right: none;
}
</style>