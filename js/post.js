/**
 * Blog — 文章详情页逻辑
 * 负责：解析 URL 参数、加载 Markdown、渲染文章内容、代码高亮
 */

// ========================================
// 主题管理（与 blog.js 共享逻辑）
// ========================================
function initTheme() {
    const saved = localStorage.getItem('blog-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('blog-theme', next);
}

// ========================================
// 解析 Front Matter
// ========================================
function parseFrontMatter(text) {
    const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    if (!match) return { meta: {}, content: text };

    const meta = {};
    const rawMeta = match[1];

    rawMeta.split('\n').forEach(line => {
        const [key, ...rest] = line.split(':');
        if (!key || rest.length === 0) return;

        let value = rest.join(':').trim();

        // 解析数组
        if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1)
                .split(',')
                .map(item => item.trim().replace(/^['"]|['"]$/g, ''));
        }

        meta[key.trim()] = value;
    });

    return { meta, content: match[2] };
}

// ========================================
// 渲染文章
// ========================================
async function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const file = params.get('file');

    if (!file) {
        showError('未指定文章文件');
        return;
    }

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const text = await response.text();

        const { meta, content } = parseFrontMatter(text);
        const htmlContent = marked.parse(content);

        // 更新页面标题
        document.title = `${meta.title || '文章'} — Blog`;

        // 渲染文章
        const article = document.getElementById('post-content');
        article.innerHTML = `
            <header class="post-header">
                <h1 class="post-title">${meta.title || '无标题'}</h1>
                <div class="post-meta">
                    <span class="post-date">📅 ${formatDate(meta.date)}</span>
                    ${meta.tags ? `<span>${meta.tags.map(t => `<span class="tag">${t}</span>`).join(' ')}</span>` : ''}
                </div>
            </header>
            ${meta.cover ? `<img class="post-cover" src="${meta.cover}" alt="${meta.title}">` : ''}
            <div class="post-body">${htmlContent}</div>
        `;

        // 代码高亮
        if (typeof hljs !== 'undefined') {
            article.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
            });
        }

    } catch (err) {
        showError(`加载失败：${err.message}`);
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

function showError(msg) {
    const article = document.getElementById('post-content');
    article.innerHTML = `
        <div style="text-align: center; padding: 80px 0;">
            <p style="font-size: 3rem; margin-bottom: 16px;">📝</p>
            <p style="color: var(--text-secondary);">${msg}</p>
            <a href="index.html" style="margin-top: 20px; display: inline-block;">← 返回首页</a>
        </div>
    `;
}

// ========================================
// 初始化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadPost();

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }
});
