<template>
    <div class="wrap">
        <el-dialog v-model="centerDialogVisible" title="温馨提示" width="500" align-center>
            <span>是否退出登录</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="loginOut">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <el-header style="text-align: right; font-size: 12px">
            <div class="toolbar">
                <el-dropdown @command="handleCommand">
                    <el-icon style="margin-right: 8px; margin-top: 1px">
                        <setting />
                    </el-icon>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="exit"> 退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
                <span>{{ info?.username }}</span>
            </div>
        </el-header>
        <PageSeg></PageSeg>
        <Bread></Bread>
    </div>
</template>


<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import Bread from '../components/Bread.vue'
import { useUsersStore } from '../stores/usersStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import PageSeg from './PageSeg.vue'
const centerDialogVisible = ref(false)
let store = useUsersStore()
const router = useRouter()
let info = store.info
const handleCommand = (command: string) => {
    if (command === 'exit') {
        centerDialogVisible.value = true
    }
}
const loginOut = () => {
    centerDialogVisible.value = false
    store.saveUserInfo(null) // 清除缓存
    router.replace("/login")
}
</script>


<style scoped>
.wrap {
    width: 100%;
}

.el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>