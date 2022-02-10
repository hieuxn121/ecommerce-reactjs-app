import LoadableComponent from '../Loadable';

export const homeRouter = [
    {
        path: '/',
        exact: true,
        name: 'home',
        permission: '',
        title: 'Home',
        icon: 'home',
        component: LoadableComponent(() => import('../../scenes/Home')),
        index: 0
      },
    ]
export const aboutRouter = [
    {
        path: '/about',
        exact: true,
        name: 'about',
        permission: '',
        title: 'About',
        icon: 'about',
        component: LoadableComponent(() => import('../../scenes/About')),
        index: 0
      }
]
export const productRouter = [
    {
        path: '/products',
        exact: true,
        name: 'products',
        permission: '',
        title: 'Producst',
        icon: 'products',
        component: LoadableComponent(() => import('../../scenes/Products')),
        index: 0
    }
]
export const cartRouter = [
    {
        path: '/cart',
        exact: true,
        name: 'cart',
        permission: '',
        title: 'Cart',
        icon: 'cart',
        component: LoadableComponent(() => import('../../scenes/Cart')),
        index: 0
      }
]
export const loginRouter = [
    {
        path: '/login',
        exact: true,
        name: 'login',
        permission: '',
        title: 'Login',
        icon: 'login',
        component: LoadableComponent(() => import('../../scenes/Login')),
        index: 0
    }
]
export const adminRouter = [
    {
        path: '/admin',
        exact: true,
        name: 'admin',
        permission: '',
        title: 'Admin',
        icon: 'admin',
        component: '',
        index: 0
    }
]
export const routers = [...homeRouter,...aboutRouter,...cartRouter,...productRouter,...loginRouter]