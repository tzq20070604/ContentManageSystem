<template>
    <router-view v-slot="props">
        <keep-alive v-if="!has">
            <component :is="props.Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="props.Component" :key="route.fullPath" v-else />
    </router-view>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useRouteStore } from '@/stores/routeStore';
import { computed } from 'vue'
const route = useRoute()
const routeStore = useRouteStore()
const has = computed(() => {
    return routeStore.noCachRoutes.includes(route.fullPath)
})
</script>
