import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'

export const useRouteStore = defineStore(
  'routeStore',
  () => {
    const router = useRouter()
    const route = useRoute()
    const currentRoute = ref({})
    const routeArr = ref([])
    const noCachRoutes = ref<string[]>([])
    const addRoute = (routeObj) => {
      const arr = routeArr.value.filter((item) => {
        if (item.fullPath == routeObj.fullPath) {
          return item
        }
      })
      if (arr.length > 0) { // 有
        currentRoute.value = arr[0]
      } else { // 没有
        routeArr.value.push(routeObj)
        currentRoute.value = routeObj
      }
    }

    const closeRoute = (routeObj) => {
      const arr = routeArr.value.filter((item) => {
        if (item.fullPath == routeObj.fullPath) {
          return item
        }
      })
      if (arr.length == 0) return
      const delItem = arr[0]
      const delIndex = routeArr.value.lastIndexOf(delItem)
      // 删除的是自己
      if (delItem.fullPath === currentRoute.value.fullPath) {
        // 如果是最后一个
        if (delIndex === routeArr.value.length - 1) {
          if (routeArr.value.length == 1) {
            routeArr.value = []
            currentRoute.value = {}
           
            router.push({ name: 'info', force: true })
          } else {
            routeArr.value.pop()
            const pre = routeArr.value[routeArr.value.length - 1]
            router.push({ path: pre.fullPath, force: true })
          }
        } else {
          const next = routeArr.value[delIndex + 1]
          routeArr.value.splice(delIndex, 1)
          router.push({ path: next.fullPath, force: true })
        }
      } else {

        routeArr.value.splice(delIndex, 1)
      }
      noCachRoutes.value.push(delItem.fullPath)
    }

    const clearAllRoute = () => {
      routeArr.value = []
      currentRoute.value = {}
    }
    return {
      currentRoute,
      routeArr,
      addRoute,
      closeRoute,
      clearAllRoute,
      noCachRoutes
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
