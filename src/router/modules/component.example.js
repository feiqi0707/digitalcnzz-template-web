import Layout from '@/layout'

export default {
    path: '/component_example',
    component: Layout,
    redirect: '/component_example/pagemain',
    name: 'componentExample',
    meta: {
        title: '组件演示',
        icon: 'component'
    },
    children: [
        {
            path: 'pagemain',
            name: 'componentExamplePagemain',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/pagemain'),
            meta: {
                title: '空白页'
            }
        },
        {
            path: 'pageheader',
            name: 'componentExamplePageheader',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/pageheader'),
            meta: {
                title: '页头'
            }
        },
        {
            path: 'editor',
            name: 'componentExampleEditor',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/editor'),
            meta: {
                title: '编辑器'
            }
        },
        {
            path: 'result',
            name: 'componentExampleResult',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/result'),
            meta: {
                title: '处理结果'
            }
        },
        {
            path: 'actionbar',
            name: 'componentExampleActionbar',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/actionbar'),
            meta: {
                title: '固定底部操作栏'
            }
        },
        {
            path: 'searchbar',
            name: 'componentExampleSearchbar',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/searchbar'),
            meta: {
                title: '搜索栏'
            }
        },
        {
            path: 'batchactionbar',
            name: 'componentExampleBatchactionbar',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/batchactionbar'),
            meta: {
                title: '批量操作栏'
            }
        },
        {
            path: 'upload',
            name: 'componentExampleUpload',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/upload'),
            meta: {
                title: '上传'
            }
        },
        {
            path: 'imagepreview',
            name: 'componentExampleImagePreview',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/image.preview'),
            meta: {
                title: '图片预览'
            }
        },
        {
            path: 'trend',
            name: 'componentExampleTrend',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/trend'),
            meta: {
                title: '趋势标记'
            }
        },
        {
            path: 'area',
            name: 'componentExampleArea',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/area'),
            meta: {
                title: '省市区联动'
            }
        },
        {
            path: 'amap',
            name: 'componentExampleAmap',
            component: () => import(/* webpackChunkName: 'component_example' */ '@/views/component_example/amap'),
            meta: {
                title: '高德地图点标记'
            }
        }
    ]
}
