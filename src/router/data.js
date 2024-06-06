let HomeRoutes = [
  {
    path: '/info',
    name: 'info',
    title: '个人信息',
    component: 'InfoView',
    meta: { requiredAuth: true }
  },
  {
    path: '/employee',
    name: 'employee',
    title: '员工管理',
    component: 'EmployeeView',
    meta: { requiredAuth: true },
    children: [
      {
        path: '/employee/add',
        name: 'EmployeeAdd',
        title: '添加员工',
        component: 'EmployeeAddView',
        meta: { requiredAuth: true }
      },
      {
        path: '/employee/edit',
        name: 'EmployeeEdit',
        title: '员工编辑',
        component: 'EmployeeEditView',
        meta: { requiredAuth: true }
      },
      {
        path: '/employee',
        redirect: '/employee/add'
      }
    ]
  },
  {
    path: '/good',
    name: 'good',
    title: '商品管理',
    component: 'GoodView',
    meta: { requiredAuth: true },
    children: [
      {
        path: '/good/add',
        name: 'GoodAdd',
        title: '添加商品',
        component: 'GoodAddView',
        meta: { requiredAuth: true }
      },
      {
        path: '/good/edit',
        name: 'GoodEdit',
        title: '编辑商品',
        component: 'GoodEditView',
        meta: { requiredAuth: true, keepAlive: true }
      },
      {
        path: '/good',
        redirect: '/good/add'
      }
    ]
  }
]

const otherRoutes = [
  {
    path: '/login',
    name: 'Login',
    title: '用户登录',
    component: 'LoginView',
    meta: { requiredAuth: false }
  },
  {
    path: '/',
    redirect: '/info'
  },
  {
    path: '/:pathMatch(.*)*', // /aaa /bbb /ccc  /aaa/a1/a2
    component: 'NotFoundView',
    name: 'NotFound',
    title: '找不到页面',
    meta: { requiredAuth: true }
  }
]
const allRoutes = [...HomeRoutes, ...otherRoutes]
export { allRoutes, HomeRoutes }
