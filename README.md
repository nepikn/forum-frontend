# 留言板

前後端分離、部署於 AWS EC2、在 Cloudflare 註冊域名的 MPA

## 預期功能

用戶可以

- 瀏覽留言
- 註冊／登入／登出
- 修改帳戶名稱
- 新增／修改／刪除留言

## 展示

| `/forum`                                                                                            | `/forum/auth`                                                                                      |
| --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| ![screenshot](https://raw.githubusercontent.com/nepikn/forum-frontend/main/src/assets/comments.jpg) | ![screenshot](https://raw.githubusercontent.com/nepikn/forum-frontend/main/src/assets/auth.jpg)    |
| ![screenshot](https://raw.githubusercontent.com/nepikn/forum-frontend/main/src/assets/editor.jpg)   | ![screenshot](https://raw.githubusercontent.com/nepikn/forum-frontend/main/src/assets/sign-in.jpg) |

## 主要技術

- 前端
  - Vite v5
- 後端
  - PHP v8
  - MySQL v8
- 部署
  - AWS EC2
  - Cloudflare Registrar

## 安裝

```bash
ssh DESTINATION
cd /var/www/html/
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

###

-

```javascript

```

## 素材

- [Reddit Design System](https://www.figma.com/community/file/1357423094737880333/reddit-design-system)
- [Login Page design](https://www.figma.com/community/file/969408928471748876/login-page-design)
