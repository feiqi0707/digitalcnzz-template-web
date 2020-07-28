# digitalzz-webFront-web

前端项目 Web 端模板

# 安装依赖环境

yarn 、npm install

# 启动开发服务

yarn dev 、 npm run dev

# 构建生产测试发布包

yarn build:prod 、yarn build:test 、 npm run build:prod 、 npm run build:test

# 构建发布配置 OSS 自动上传配置

## 预发测试环境配置 vue.config.js

{ ossBaseDir: '/digitalcnzz/pretest/', project: 'digitalcnzz-xxxx-web', // 发布前把 xxxx 换成当前项目的名称 retry: 0,
gzip: true, exclude: /.\*\.\$/ }

## 生产环境配置

{ ossBaseDir: '/digitalcnzz/prod', project: 'digitalcnzz-xxxx-web', // 发布前把 xxxx 换成当前项目的名称 retry: 0, gzip:
true, exclude: /.\*\.\$/ }
