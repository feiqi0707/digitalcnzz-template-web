<template>
    <div id="app">
        <RouterView v-if="isRouterAlive" />
    </div>
</template>

<script>
export default {
    provide() {
        return {
            reload: this.reload
        }
    },
    data() {
        return {
            isRouterAlive: true
        }
    },
    watch: {
        $route: 'routeChange',
        '$store.state.keepAlive.list': val => {
            process.env.NODE_ENV == 'development' && console.log(`[ keepAliveList ] ${val}`)
        }
    },
    methods: {
        reload() {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
        routeChange(newVal, oldVal) {
            if (newVal.name == oldVal.name) {
                this.reload()
            }
        }
    },
    metaInfo() {
        return {
            title: this.$store.state.global.title,
            titleTemplate: title => {
                return title
                    ? `${title} - ${process.env.VUE_APP_TITLE}`
                    : process.env.VUE_APP_TITLE
            }
        }
    }
}
</script>

<style scoped>
#app {
    height: 100%;
}
</style>
