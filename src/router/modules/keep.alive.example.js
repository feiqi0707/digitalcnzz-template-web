import Layout from '@/layout'
import KeepAliveLayout from '@/layout/keepAlive'

export default {
    path: '/keep_alive_example',
    component: Layout,
    redirect: '/keep_alive_example/page',
    name: 'keepAliveExample',
    meta: {
        title: '页面缓存演示',
        icon: 'keep-alive'
    },
    children: [
        {
            path: 'page',
            name: 'keepAliveExamplePage',
            component: () => import(/* webpackChunkName: 'keep_alive_example' */ '@/views/keep_alive_example/page'),
            meta: {
                title: '演示',
                sidebar: false,
                activeMenu: '/keep_alive_example'
            }
        },
        {
            path: 'detail',
            name: 'keepAliveExampleDetail',
            component: () => import(/* webpackChunkName: 'keep_alive_example' */ '@/views/keep_alive_example/detail'),
            meta: {
                title: '同级路由',
                sidebar: false,
                activeMenu: '/keep_alive_example/page'
            }
        },
        {
            path: 'detail2',
            component: KeepAliveLayout,
            redirect: '/keep_alive_example/detail2',
            meta: {
                title: '下级路由',
                sidebar: false,
                activeMenu: '/keep_alive_example/page'
            },
            children: [
                {
                    path: '',
                    name: 'keepAliveExampleDetail2',
                    component: () => import(/* webpackChunkName: 'keep_alive_example' */ '@/views/keep_alive_example/detail'),
                    meta: {
                        title: '下级路由'
                    }
                },
                {
                    path: 'detail3',
                    component: KeepAliveLayout,
                    redirect: '/keep_alive_example/detail2/detail3',
                    meta: {
                        title: '下下级路由',
                        sidebar: false,
                        activeMenu: '/keep_alive_example/page'
                    },
                    children: [
                        {
                            path: '',
                            name: 'keepAliveExampleDetail3',
                            component: () => import(/* webpackChunkName: 'keep_alive_example' */ '@/views/keep_alive_example/detail'),
                            meta: {
                                title: '下下级路由'
                            }
                        }
                    ]
                }
            ]
        }
    ]
}
