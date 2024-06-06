<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <Menu></Menu>
    <el-container class="wrap">
      <NavHeader></NavHeader>
      <el-main>
        <el-scrollbar>
          <CustomRouterView></CustomRouterView>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import CustomRouterView from './CustomRouterView.vue'
import Menu from '../components/Memu.vue'
import NavHeader from '../components/NavHeader.vue'
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
}

.layout-container-demo .el-main {
  padding: 0;
  flex-direction: column;
}
</style>