<template>
    <div class="flex gap-2 wrap">
        <el-tag v-for="item in routeStore.routeArr" :key="item.fullPath" closable :type="type(item)"
            @click="clickTag(item)" @close="closeTag(item)">
            {{ item.title }}
        </el-tag>
    </div>
</template>

<script lang="ts" setup>
import { useRouteStore } from '../stores/routeStore.ts'
import { ref, watch, onUnmounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const routeStore = useRouteStore()
const unwatch = watch(() => route, (newValue, oldValue) => {

    let { fullPath, meta: { title } } = newValue
    console.log("fullPath", fullPath)
    if (!title) {
        return
    }
    let current = { fullPath, title }
    routeStore.addRoute(current)
}, { deep: true, immediate: true })
const type = computed(() => {
    return (item) => {
        return item.fullPath === routeStore.currentRoute?.fullPath ? 'success' : 'info'
    }
})

const clickTag = (item) => {
    router.push(item.fullPath)
}

const closeTag = (item) => {
    routeStore.closeRoute(item)
}

onUnmounted(() => {
    // 稍后，当你想要停止观察时  
    console.log("停止观察")
    unwatch()
    routeStore.clearAllRoute()
    routeStore.currentRoute = {}
    routeStore.noCachRoutes = []
});

</script>


<style scoped>
.wrap {
    padding: 20px 0;
}
</style>