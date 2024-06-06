<template>
  <template v-for="item in props.data">
    <el-sub-menu v-if="item.children?.length > 0" :key="item.path" :index="item.path">
      <template #title>
        <el-icon>
          <message />
        </el-icon>{{ item.title }}
      </template>
      <MenuItem :data="item.children">
      </MenuItem>
    </el-sub-menu>
    <el-menu-item v-else-if="!!item.title" @click="navigate(item.path)" :index="item.path" :key="item.path + '222'">{{
      item.title
    }}</el-menu-item>
  </template>
</template>

<script setup lang="ts">
import { Message } from '@element-plus/icons-vue'
import MenuItem from './MenuItem.vue'
import { useRouter } from 'vue-router'
import { defineProps } from 'vue'
const router = useRouter()
const props = defineProps<{ data: any }>()
const navigate = (path) => {
  router.push(path)
}
</script>

<style scoped></style>