# 留言板 - 前端

前後端分離、部署於 AWS EC2、在 Cloudflare 註冊域名的 MPA

> [Node.js 後端說明](https://github.com/nepikn/forum-backend-js?tab=readme-ov-file#readme-ov-file)

> [另有 PHP 語法的後端](https://github.com/nepikn/forum-backend?tab=readme-ov-file#readme-ov-file)

- [預期功能](#預期功能)
- [展示](#展示)
- [主要技術](#主要技術)
- [安裝](#安裝)
- [學習內容](#學習內容)
- [展望](#展望)
- [素材](#素材)

## 預期功能

用戶可以

- 瀏覽留言
- 註冊／登入／登出
- 修改帳戶名稱
- 新增／修改／刪除留言

## 展示

[線上部署](https://unconscious.cc/forum-js/)

| `/forum`                                                                                             | `/forum/auth`                                                                                       |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ![screenshot](https://raw.githubusercontent.com/nepikn/forum-frontend/main/src/assets/comments.jpeg) | ![screenshot](https://raw.githubusercontent.com/nepikn/forum-frontend/main/src/assets/auth.jpeg)    |
| ![screenshot](https://raw.githubusercontent.com/nepikn/forum-frontend/main/src/assets/editor.jpeg)   | ![screenshot](https://raw.githubusercontent.com/nepikn/forum-frontend/main/src/assets/sign-in.jpeg) |

## 主要技術

- 前端
  - Vite v5
- Node.js 後端
  - Express v4
  - Sequelize v6
  - MySQL v8
- PHP 後端
  - PHP v8
  - MySQL v8
- 部署
  - Apache v2
  - AWS EC2 Debian
  - Cloudflare Registrar

## 安裝

```bash
dir=/var/www/html/
read -p "Install to [$dir]: " ans
cd ${ans:-$dir}
git clone git@github.com:nepikn/forum-frontend.git

cd forum-frontend/
npm install
npm run build
rm ../forum/ -fr
mv dist/ ../forum/

cd ..
rm forum-frontend/ -fr
```

## 學習內容

- [學習歷程 - Apache](https://hackmd.io/o_t2Xo_tR-m5VU2Yd2xFsg)
- [學習歷程 - AWS](https://hackmd.io/FGAWhBuJTb2dt3ABaXIr9A?view)
- 依據 HTTP 請求的方法判斷是否渲染

```javascript
// src/util/api.js
export class Handler {
  // ...

  async handleReq(options = {}) {
    const json = await this.req(options.path || this.defPath, {
      ...this.defOptions,
      ...options,
    });

    (({ method } = options) => {
      if (method && method != "GET") this.render(json);
    })();

    return json;
  }

  // ...
}
```

```javascript
// src/api/comment.js
export default class Comment extends Handler {
  defPath = "/comment";
  defOptions = {
    credentials: "include",
  };

  constructor(render) {
    super();
    this.render = render;
  }

  add(contentOrForm) {
    return super.handlePost({
      queries: { content: contentOrForm },
    });
  }

  // ...
}
```

- 不同模式不同打包配置

```bash
# .env
VITE_BASE=''
```

```bash
# .env.production
VITE_BASE=/forum
```

```javascript
// vite.config.js
export default defineConfig(({ mode }) => {
  const cwd = process.cwd();
  const env = loadEnv(mode, cwd);

  return {
    base: env.VITE_BASE,
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(cwd, "index.html"),
          auth: path.resolve(cwd, "auth/index.html"),
        },
      },
    },
  };
});
```

## 展望

- 以 `RequestInit.body` 傳送 `POST`、`PUT` 請求
- 以 React Router 管理前端路由

## 素材

- [Reddit Design System](https://www.figma.com/community/file/1357423094737880333/reddit-design-system)
- [Login Page design](https://www.figma.com/community/file/969408928471748876/login-page-design)
