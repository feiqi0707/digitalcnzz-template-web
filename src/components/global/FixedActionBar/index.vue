<template>
    <div :class="`actionbar ${isBottom ? '' : 'shadow'}`">
        <slot />
    </div>
</template>

<script>
export default {
    name: 'FixedActionBar',
    data() {
        return {
            isBottom: true
        }
    },
    mounted() {
        this.onScroll()
        window.addEventListener('scroll', this.onScroll)
    },
    destroyed() {
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        onScroll() {
            // 变量scrollTop是滚动条滚动时，滚动条上端距离顶部的距离
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            // 变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
            // 变量scrollHeight是滚动条的总高度（当前可滚动的页面的总高度）
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
            // 滚动条到底部
            if (Math.ceil(scrollTop + windowHeight) >= scrollHeight) {
                this.isBottom = true
            } else {
                this.isBottom = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.actionbar {
    position: fixed;
    z-index: 4;
    right: 0;
    bottom: 0;
    left: 50%;
    width: calc(#{$g_app_width} - #{$g_sidebar_width});
    margin-left: $g-sidebar-width;
    transform: translateX(-50%) translateX($g-sidebar-width * -1 / 2);
    padding: 20px;
    text-align: center;
    background-color: #fff;
    transition: box-shadow 0.5s;
    box-shadow: 0 0 1px 0 #ccc;
    &.shadow {
        box-shadow: 0 -10px 10px -10px #ccc;
    }
}
@media screen and (max-width: $g-app-width) {
    .actionbar {
        width: calc(100% - #{$g_sidebar_width});
    }
}
/deep/ .el-form-item {
    margin-bottom: 0;
}
</style>
