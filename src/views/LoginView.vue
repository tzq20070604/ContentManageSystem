<template>
    <el-form ref="formRef" :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item prop="username" label="用户名">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item prop="passwd" label="密码">
            <el-input v-model="form.passwd" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button @click="onReset">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router';
import { useUsersStore } from '../stores/usersStore.ts'
// do not use same name with ref
const route = useRoute()
const router = useRouter()
const userStore = useUsersStore()
const formRef = ref()
const form = reactive({
    username: '',
    passwd: ''
})

const handleLogin = (user: any) => {
    userStore.saveUserInfo(user)
    let fullPath = route.query.fullPath
    if (fullPath) {
        const respath = decodeURIComponent(fullPath)
        router.replace(respath)
    } else {
        router.replace("/")
    }
}

const onSubmit = async () => {
    console.log('login!')
    let { username, passwd } = form
    if (username?.trim().length > 0 && passwd?.trim().length > 0) {
        try {
            let res = await axios.get(`http://localhost:3000/users?username=${username}&passwd=${passwd}`)
            console.log("res", res.data)
            if (res.data?.length > 0) {
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                    onClose() {
                        handleLogin(res.data[0])
                    }
                })
            } else {
                ElMessage.error('账号或密码错误')
            }
        } catch (error) {
            ElMessage.error(`登录失败，${error.message}`)
        }
    } else {
        ElMessage.error('账号和密码不能为空')
    }
}

const register = async () => {
    console.log('register!')
    let { username, passwd } = form
    if (username?.trim().length > 0 && passwd?.trim().length > 0) {
        try {
            let res = await axios.get(`http://localhost:3000/users?username=${username}&passwd=${passwd}`)
            console.log("res", res.data)
            if (res.data?.length > 0) {
                ElMessage({
                    message: '用户已经存在，请直接登录',
                    type: 'warning',
                })
            } else {
                try {
                    let res1 = await axios('http://localhost:3000/users', {
                        method: 'post',
                        data: { username, passwd }
                    })
                    ElMessage({
                        message: '注册成功请登录',
                        type: 'success',
                    })
                    console.log("res1", res1.data)
                } catch (error) {
                    ElMessage.error(`注册失败，${error.message}`)
                }
            }
        } catch (error) {
            ElMessage.error(`注册失败，${error.message}`)
        }
    } else {
        ElMessage.error('账号和密码不能为空')
    }
}

const onReset = () => {
    console.log('onReset!')
    formRef.value.resetFields()
}
</script>


<style scoped lang="scss"></style>