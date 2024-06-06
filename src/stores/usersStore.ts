import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useUsersStore = defineStore(
  'users',
  () => {
    const info = ref({})
    const saveUserInfo = (data) => {
      console.log(data)
      info.value = data
    }
    return {
      info,
      saveUserInfo
    }
  },
  {
    persist: true
  }
)
