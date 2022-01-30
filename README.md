## 技术栈
[Nextjs](https://github.com/vercel/next.js) + [SWR](https://github.com/vercel/swr) + [ChakraUI](https://github.com/chakra-ui/chakra-ui) + [Prisma](https://github.com/prisma/prisma)
## 环境变量设置
* 创建自己的`env`文件
* `DATABASE_URL`本地建议使用dokcer创建postgresql容器`docker run --name some-postgres -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres`
* `GITHUB-ID`和`GITHUB-SECRET`使用[授权](https://github.com/settings/developers)创建一个自己的授权APP
* `SECRET`使用`$ openssl rand -base64 32`创建
## 本地跑起来
* `npm install`，安装依赖
* `npx prisma migrate dev`, 模型映射到数据库
* `npm run dev`, 跑起来啦
## 部署
[参考我写的博客](https://myblog-v2.vercel.app/blog/%E9%80%9A%E8%BF%87Vercel%E9%83%A8%E7%BD%B2%E4%BD%BF%E7%94%A8NextAuthjs%E8%AE%A4%E8%AF%81%E7%9A%84%E7%BD%91%E7%AB%99)
