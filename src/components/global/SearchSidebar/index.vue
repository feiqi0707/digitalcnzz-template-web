<template>
    <div
        id="search"
        :class="{ searching: $store.state.global.openSearch }"
        @click="exit"
    >
        <div class="container">
            <div class="search-box" @click.stop>
                <el-input
                    ref="input"
                    v-model="search"
                    prefix-icon="el-icon-search"
                    placeholder="搜索页面"
                    clearable
                    @keydown.esc.native="$store.commit('global/toggleSearch')"
                />
                <div class="tips">
                    你可以使用快捷键<span>ctrl</span>+<span>s</span>唤醒搜索面板，按<span>esc</span>退出
                </div>
            </div>
            <div ref="search" class="result">
                <!-- eslint-disable-next-line vue/require-component-is -->
                <component
                    v-for="item in resultList"
                    :key="item.path"
                    v-bind="linkProps(item.path)"
                    class="item"
                >
                    <div class="icon">
                        <svg-icon :name="item.icon" />
                    </div>
                    <div class="info">
                        <div class="title">
                            {{ item.title }}
                            <svg-icon
                                v-if="item.isExternal"
                                name="external-link"
                            />
                        </div>
                        <div class="breadcrumb">
                            <span
                                v-for="(bc, index) in item.breadcrumb"
                                :key="index"
                            >
                                {{ bc }}
                                <i class="el-icon-arrow-right" />
                            </span>
                        </div>
                        <div class="path">{{ item.path }}</div>
                    </div>
                </component>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SearchSidebar",
    props: {},
    data() {
        return {
            search: "",
            sourceList: []
        };
    },
    computed: {
        resultList() {
            let result = [];
            result = this.sourceList.filter(item => {
                let flag = false;
                if (item.title.indexOf(this.search) >= 0) {
                    flag = true;
                }
                if (item.path.indexOf(this.search) >= 0) {
                    flag = true;
                }
                if (item.breadcrumb.some(b => b.indexOf(this.search) >= 0)) {
                    flag = true;
                }
                return flag;
            });
            return result;
        }
    },
    watch: {
        "$store.state.global.openSearch"(val) {
            if (val) {
                document
                    .querySelector("body")
                    .setAttribute("style", "overflow: hidden;");
                this.$refs.search.scrollTop = 0;
                setTimeout(() => {
                    this.$refs.input.$el.children[0].focus();
                }, 100);
            } else {
                document
                    .querySelector("body")
                    .setAttribute("style", "overflow: auto;");
                setTimeout(() => {
                    this.search = "";
                }, 500);
            }
        }
    },
    created() {},
    mounted() {
        this.sourceList = [];
        if (this.$store.state.global.showHeader) {
            this.$store.state.global.allRoutes.map(item => {
                this.getSourceList(item.children);
            });
        } else {
            this.getSourceList(this.$store.state.global.sidebarRoutes);
        }
    },
    methods: {
        isExternal(path) {
            return /^(https?:|mailto:|tel:)/.test(path);
        },
        linkProps(url) {
            if (this.isExternal(url)) {
                return {
                    is: "a",
                    href: url,
                    target: "_blank",
                    rel: "noopener"
                };
            }
            return {
                is: "router-link",
                to: url
            };
        },
        hasChildren(item) {
            let flag = true;
            if (item.children) {
                if (item.children.every(i => i.meta.sidebar === false)) {
                    flag = false;
                }
            } else {
                flag = false;
            }
            return flag;
        },
        getSourceList(arr) {
            arr.map(item => {
                if (item.meta.sidebar !== false) {
                    if (this.hasChildren(item)) {
                        let baseBreadcrumb = item.meta.baseBreadcrumb
                            ? this.deepCopy(item.meta.baseBreadcrumb)
                            : [];
                        baseBreadcrumb.push(item.meta.title);
                        let child = this.deepCopy(item.children);
                        child.map(c => {
                            c.meta.baseIcon =
                                item.meta.icon || item.meta.baseIcon;
                            c.meta.baseBreadcrumb = baseBreadcrumb;
                            c.meta.basePath = item.meta.basePath
                                ? [item.meta.basePath, item.path].join("/")
                                : item.path;
                        });
                        this.getSourceList(child);
                    } else {
                        let breadcrumb = [];
                        if (item.meta.baseBreadcrumb) {
                            breadcrumb = this.deepCopy(
                                item.meta.baseBreadcrumb
                            );
                        }
                        breadcrumb.push(item.meta.title);
                        let path = "";
                        if (this.isExternal(item.path)) {
                            path = item.path;
                        } else {
                            path = item.meta.basePath
                                ? [item.meta.basePath, item.path].join("/")
                                : item.path;
                        }
                        this.sourceList.push({
                            icon: item.meta.icon || item.meta.baseIcon,
                            title: item.meta.title,
                            breadcrumb: breadcrumb,
                            path: path,
                            isExternal: this.isExternal(item.path)
                        });
                    }
                }
            });
        },
        exit() {
            this.$store.commit("global/toggleSearch");
        },
        deepCopy(obj) {
            var copy = Object.create(Object.getPrototypeOf(obj));
            var propNames = Object.getOwnPropertyNames(obj);
            propNames.forEach(function(name) {
                var desc = Object.getOwnPropertyDescriptor(obj, name);
                Object.defineProperty(copy, name, desc);
            });
            return copy;
        }
    }
};
</script>

<style lang="scss" scoped>
#search {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #000, $alpha: 0.5);
    backdrop-filter: blur(10px);
    transition: all 0.3s;
    opacity: 0;
    visibility: hidden;
    &.searching {
        opacity: 1;
        visibility: visible;
        .container {
            transform: initial;
            filter: initial;
        }
    }
    .container {
        display: flex;
        flex-direction: column;
        width: 800px;
        height: 100%;
        margin: 0 auto;
        transition: all 0.3s;
        transform: scale(1.1);
        filter: blur(10px);
        .search-box {
            margin-top: 50px;
            /deep/ .el-input__inner {
                height: 52px;
                line-height: 52px;
            }
            .tips {
                margin: 20px 0 40px;
                line-height: 24px;
                font-size: 14px;
                text-align: center;
                color: #fff;
                span {
                    margin: 0 5px;
                    padding: 1px 5px 2px;
                    border-radius: 5px;
                    font-weight: bold;
                    background-color: rgba($color: #000, $alpha: 0.5);
                }
            }
        }
        .result {
            max-height: calc(100% - 250px);
            border-radius: 5px;
            overflow: auto;
            background-color: #fff;
            .item {
                display: flex;
                align-items: center;
                text-decoration: none;
                cursor: pointer;
                &:hover {
                    transition: all 0.3s;
                    background-color: #f5f7fa;
                    .icon {
                        color: #409eff;
                        transform: scale(1.2);
                        transition: all 0.3s;
                    }
                    .info {
                        .title {
                            color: #333;
                        }
                        .breadcrumb,
                        .path {
                            color: #606266;
                            transition: all 0.3s;
                        }
                    }
                }
                .icon {
                    width: 66px;
                    text-align: center;
                    color: #999;
                    .svg-icon {
                        font-size: 20px;
                    }
                }
                .info {
                    flex: 1;
                    height: 70px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    border-left: 1px solid #ebeef5;
                    padding: 5px 10px 7px;
                    .title {
                        font-size: 18px;
                        font-weight: bold;
                        color: #666;
                        .svg-icon {
                            font-size: 14px;
                        }
                    }
                    .breadcrumb,
                    .path {
                        line-height: 14px;
                        font-size: 12px;
                        color: #c0c4cc;
                    }
                    .breadcrumb {
                        span:last-child i {
                            display: none;
                        }
                    }
                }
            }
        }
    }
}
</style>
