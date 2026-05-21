/**
 * Blog — 首页逻辑
 * 负责加载文章列表、主题切换、弹窗控制
 */

// ========================================
// 文章注册表（新增文章只需在此添加一条记录）
// ========================================
const POSTS = [
    {
        file: 'posts/hermes-macos-workflow.md',
        title: '用 Hermes 搭建 Mac 自动化工作流',
        date: '2026-05-20',
        tags: ['Hermes', 'macOS', '自动化'],
        excerpt: '探索如何利用 Hermes Agent 与 macOS 系统原生工具深度集成，打造高效的桌面自动化工作流。',
        cover: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop'
    },
    {
        file: 'posts/frontend-toolchain-2026.md',
        title: '现代前端开发工具链 2026 指南',
        date: '2026-05-18',
        tags: ['前端', '工具链', 'JavaScript'],
        excerpt: '2026 年前端开发工具链已经发生了翻天覆地的变化。本文梳理当下最主流的开发工具和最佳实践。',
        cover: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop'
    },
    {
        file: 'posts/minimalist-blog.md',
        title: '静态博客的极简美学',
        date: '2026-05-15',
        tags: ['博客', '设计', '极简主义'],
        excerpt: '少即是多。一个精心设计的静态博客，不需要复杂的框架，只需要干净的排版和流畅的阅读体验。',
        cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop'
    }
];

// ========================================
// 主题管理
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
// 渲染文章列表
// ========================================
function renderPosts() {
    const container = document.getElementById('posts-container');
    if (!container) return;

    // 按日期倒序
    const sorted = [...POSTS].sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = sorted.map(post => `
        <a class="post-card" href="post.html?file=${encodeURIComponent(post.file)}">
            <img class="post-card-cover" src="${post.cover}" alt="${post.title}" loading="lazy">
            <div class="post-card-body">
                <div class="post-card-meta">
                    <span class="post-card-date">📅 ${formatDate(post.date)}</span>
                    <div class="post-card-tags">
                        ${post.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
                <h2 class="post-card-title">${post.title}</h2>
                <p class="post-card-excerpt">${post.excerpt}</p>
            </div>
        </a>
    `).join('');
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
}

// ========================================
// 弹窗控制
// ========================================
function initModal() {
    const aboutLink = document.getElementById('about-link');
    const modal = document.getElementById('about-modal');
    const closeBtn = document.getElementById('modal-close');

    if (!aboutLink || !modal) return;

    aboutLink.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modal.classList.remove('active');
        }
    });
}

// ========================================
// 初始化
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    renderPosts();
    initModal();

    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', toggleTheme);
    }
});
