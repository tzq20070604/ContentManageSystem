import { createRouter, createWebHistory } from 'vue-router'
import { allRoutes } from './data.js'
import { useUsersStore } from '../stores/usersStore.ts'
import { useRouteStore } from '@/stores/routeStore'
const source = createRouterFromData(allRoutes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: source
})

function createRouterFromData(source: Array<any>): any[] {
  const arr = []
  for (const item of source) {
    let obj = {}
    item.meta = { ...item.meta, title: item.title }
    if (item.children?.length > 0) {
      obj = {
        ...item,
        component: () => import(`../views/${item.component}.vue`),
        children: createRouterFromData(item.children)
      }
    } else {
      obj = {
        ...item,
        component: () => import(`../views/${item.component}.vue`)
      }
    }
    arr.push(obj)
  }
  return arr
}

// 全局拦截 - 某几个页面都必须授权才能访问。
router.beforeEach((to, from, next) => {
  // console.log('to', from, to)
  const store = useUsersStore()
  const isAuthenticated = !!store.info?.id
  const obj = { name: 'Login', query: { fullPath: encodeURIComponent(to.fullPath) } }
  if (to.name !== 'Login' && !isAuthenticated && to.meta.requiredAuth) {
    next(obj)
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // console.log('提交后端用户行为信息')
  const routeStore = useRouteStore()
  const index = routeStore.noCachRoutes.indexOf(to.fullPath)
  if (index != -1) {
    routeStore.noCachRoutes.splice(index, 1)
  }
})
export default router
