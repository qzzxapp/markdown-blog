# Markdown Blog

> 一个基于纯静态渲染的极简个人博客系统。用 Markdown 写文章，用浏览器阅读，无需任何后端服务。

---

## ✨ 特性

| 特性 | 说明 |
|------|------|
| 📝 Markdown 渲染 | 支持 Front Matter 元数据、表格、代码块、引用、图片等 |
| 🎨 亮色 / 暗色主题 | 自动跟随系统偏好，支持手动切换，`localStorage` 记忆 |
| 📱 响应式布局 | 手机、平板、桌面全尺寸适配 |
| 💻 代码语法高亮 | highlight.js 自动识别语言并着色 |
| 🖼️ 封面图支持 | 支持 Unsplash 等外链封面，列表页卡片展示 |
| 🏷️ 标签系统 | 文章标签自动渲染为胶囊样式 |
| ⚡ 纯静态 | 零后端依赖，任何静态托管均可部署 |
| 🔒 行尾一致性 | `.gitattributes` + `.editorconfig` 杜绝跨平台 LF/CRLF 差异 |

## 📁 项目结构

```
markdown-blog/
├── index.html            # 首页 — 文章列表
├── post.html             # 详情页 — Markdown 渲染
├── .gitattributes        # Git 行尾归一化配置
├── .gitignore            # 忽略规则
├── .editorconfig         # 编辑器一致性配置
├── LICENSE               # MIT License
├── README.md             # 本文件
├── css/
│   └── style.css         # 全局样式（亮/暗主题变量、响应式）
├── js/
│   ├── blog.js           # 首页逻辑（文章注册表、主题切换、弹窗）
│   └── post.js           # 详情页逻辑（Front Matter 解析、Markdown 渲染）
└── posts/
    ├── hermes-macos-workflow.md
    ├── frontend-toolchain-2026.md
    └── minimalist-blog.md
```

## 🚀 快速开始

### 本地预览

```bash
# 克隆仓库
git clone https://github.com/qzzxapp/markdown-blog.git
cd markdown-blog

# 方式一：Python 一行命令
python3 -m http.server 8080

# 方式二：Node.js
npx serve .

# 方式三：直接双击 index.html（部分功能可能受跨域限制）
```

打开浏览器访问 `http://localhost:8080` 即可。

### 部署到 GitHub Pages

1. 将代码推送到 GitHub 仓库
2. 进入仓库 **Settings → Pages**
3. Source 选择 **Deploy from a branch**
4. Branch 选择 **main**，目录选 **/ (root)**
5. 保存后等待 1-2 分钟，访问 `https://<username>.github.io/markdown-blog/`

也支持 Cloudflare Pages、Vercel、Netlify 等任何静态托管平台。

## 📝 写文章

只需两步：

### 1. 在 `posts/` 目录新建 `.md` 文件

```markdown
---
title: 我的新文章
date: 2026-05-20
tags: [标签1, 标签2]
excerpt: 这里写文章摘要，会显示在列表页
cover: https://images.unsplash.com/photo-xxx?w=800&h=400&fit=crop
---

## 正文标题

正文内容支持所有标准 Markdown 语法...

- 列表
- **粗体**
- `代码`
- [链接](https://example.com)

> 引用文字

​```javascript
console.log('代码块');
​```
```

### 2. 在 `js/blog.js` 的 `POSTS` 数组中注册

```javascript
const POSTS = [
    // ...已有文章
    {
        file: 'posts/my-new-post.md',
        title: '我的新文章',
        date: '2026-05-20',
        tags: ['标签1', '标签2'],
        excerpt: '这里写文章摘要',
        cover: '封面图URL'
    }
];
```

保存后刷新页面即可看到新文章。

## 🛠️ 技术栈

| 技术 | 用途 |
|------|------|
| HTML5 | 语义化页面结构 |
| CSS3 | CSS 变量、Grid、Flexbox、媒体查询 |
| JavaScript (ES6+) | 客户端逻辑 |
| [marked.js](https://marked.js.org/) | Markdown → HTML 渲染（CDN 引入） |
| [highlight.js](https://highlightjs.org/) | 代码语法高亮（CDN 引入） |
| Google Fonts | Noto Serif SC + Inter + JetBrains Mono |

## 📄 License

[MIT](LICENSE) © 2026
