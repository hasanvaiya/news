# 🌐 News Portal Source Code

Here is the exact code you need to copy and upload to your GitHub repository. 

> [!IMPORTANT]
> The `script.js` file below has been configured to use the free **public RSS API** instead of your local backend. This ensures your website will work perfectly on GitHub Pages for everyone on the internet!

---

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Bulletin - Premium News Portal</title>
    <!-- Premium Font: Outfit -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="glow-bg"></div>
    <div class="glow-bg-2"></div>

    <header class="navbar">
        <div class="container nav-content">
            <h1 class="logo">The<span>Bulletin</span></h1>
            <nav class="nav-links">
                <a href="#politics-news">BD Politics</a>
                <a href="#bd-news">Bangladesh</a>
                <a href="#international-news">International</a>
                <a href="#top-stories">Breaking News</a>
                <a href="#sports-news">Sports</a>
            </nav>
            <div class="mobile-menu-btn">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </header>

    <main class="container">
        <!-- Politics News (First Priority) -->
        <section id="politics-news" class="news-section">
            <div class="section-header">
                <h2>BD Politics</h2>
                <div class="glow-line"></div>
            </div>
            <div id="politics-loader" class="skeleton-grid">
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
            </div>
            <div id="politics-grid" class="news-grid hidden"></div>
        </section>

        <!-- Breaking News (Global) -->
        <section id="top-stories" class="news-section">
            <div class="section-header">
                <h2>Breaking News</h2>
                <div class="glow-line"></div>
            </div>
            <div id="top-loader" class="skeleton-grid">
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
            </div>
            <div id="top-grid" class="news-grid hidden"></div>
        </section>

        <!-- Bangladesh News -->
        <section id="bd-news" class="news-section">
            <div class="section-header">
                <h2>Bangladesh</h2>
                <div class="glow-line"></div>
            </div>
            <div id="bd-loader" class="skeleton-grid">
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
            </div>
            <div id="bd-grid" class="news-grid hidden"></div>
        </section>

        <!-- International News -->
        <section id="international-news" class="news-section">
            <div class="section-header">
                <h2>International</h2>
                <div class="glow-line"></div>
            </div>
            <div id="international-loader" class="skeleton-grid">
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
            </div>
            <div id="international-grid" class="news-grid hidden"></div>
        </section>

        <!-- Sports News -->
        <section id="sports-news" class="news-section">
            <div class="section-header">
                <h2>Sports</h2>
                <div class="glow-line"></div>
            </div>
            <div id="sports-loader" class="skeleton-grid">
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
                <div class="skeleton-card"><div class="skeleton-img"></div><div class="skeleton-text"></div><div class="skeleton-text short"></div></div>
            </div>
            <div id="sports-grid" class="news-grid hidden"></div>
        </section>

    </main>

    <footer class="footer">
        <div class="container footer-content">
            <div class="footer-brand">
                <h2 class="logo">The<span>Bulletin</span></h2>
                <p>The premium portal for global & local insights.</p>
            </div>
            <p class="copyright">&copy; 2026 The Bulletin. Developed by Hasan Ahmed Sojib.</p>
        </div>
    </footer>

    <script src="script.js"></script>
</body>
</html>
```

---

### `style.css`
```css
:root {
    --bg-dark: #050505;
    --card-bg: rgba(20, 20, 22, 0.6);
    --card-border: rgba(255, 255, 255, 0.08);
    --text-primary: #ffffff;
    --text-secondary: #a1a1aa;
    --accent: #3b82f6;
    --accent-glow: rgba(59, 130, 246, 0.5);
    
    --font-main: 'Outfit', sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-main);
    background-color: var(--bg-dark);
    color: var(--text-primary);
    line-height: 1.6;
    overflow-x: hidden;
    position: relative;
}

/* Ambient Glowing Backgrounds */
.glow-bg, .glow-bg-2 {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    z-index: -1;
    opacity: 0.4;
    pointer-events: none;
}

.glow-bg {
    top: -10%;
    left: -10%;
    width: 50vw;
    height: 50vw;
    background: radial-gradient(circle, rgba(29,78,216,0.4) 0%, rgba(0,0,0,0) 70%);
}

.glow-bg-2 {
    bottom: -20%;
    right: -10%;
    width: 60vw;
    height: 60vw;
    background: radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(0,0,0,0) 70%);
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 24px;
}

.hidden {
    display: none !important;
}

/* --- Floating Navbar --- */
.navbar {
    position: sticky;
    top: 20px;
    margin: 0 24px;
    background: rgba(10, 10, 12, 0.6);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid var(--card-border);
    border-radius: 20px;
    z-index: 1000;
    padding: 15px 30px;
    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
}

.nav-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
}

.logo {
    font-size: 1.8rem;
    font-weight: 800;
    letter-spacing: -1px;
    background: linear-gradient(to right, #fff, #a1a1aa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.logo span {
    background: linear-gradient(to right, #3b82f6, #8b5cf6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.nav-links {
    display: flex;
    gap: 30px;
}

.nav-links a {
    text-decoration: none;
    font-size: 1rem;
    font-weight: 500;
    color: var(--text-secondary);
    transition: all 0.3s ease;
    position: relative;
}

.nav-links a:hover {
    color: #fff;
}

.nav-links a::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0%;
    height: 2px;
    background: var(--accent);
    transition: width 0.3s ease;
    border-radius: 2px;
}

.nav-links a:hover::after {
    width: 100%;
}

.mobile-menu-btn {
    display: none;
}

/* --- Sections --- */
.news-section {
    padding: 60px 0;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards;
}

@keyframes fadeInUp {
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.section-header {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    gap: 20px;
}

.section-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    letter-spacing: -0.5px;
}

.glow-line {
    height: 1px;
    flex-grow: 1;
    background: linear-gradient(to right, rgba(255,255,255,0.2), rgba(255,255,255,0));
    position: relative;
}

.glow-line::after {
    content: '';
    position: absolute;
    left: 0;
    top: -2px;
    width: 50px;
    height: 5px;
    background: var(--accent);
    filter: blur(4px);
    border-radius: 50%;
}

/* --- Premium Cards --- */
.news-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
}

.news-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    overflow: hidden;
    text-decoration: none;
    color: inherit;
    display: flex;
    flex-direction: column;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    height: 440px;
    position: relative;
}

.news-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.4s ease;
}

.news-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px -5px var(--accent-glow);
    border-color: rgba(255, 255, 255, 0.15);
}

.news-card:hover::before {
    opacity: 1;
}

.card-img-wrapper {
    width: 100%;
    height: 220px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
}

.news-card:hover .card-img {
    transform: scale(1.08);
}

.card-content {
    padding: 25px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
}

.card-meta {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: var(--text-secondary);
    margin-bottom: 12px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
}

.source {
    color: var(--accent);
}

.card-title {
    font-size: 1.3rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 15px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-word;
    overflow-wrap: anywhere;
}

.card-desc {
    color: var(--text-secondary);
    font-size: 0.95rem;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: auto;
    word-break: break-word;
    overflow-wrap: anywhere;
}

/* --- Skeletons --- */
.skeleton-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
}

.skeleton-card {
    background: var(--card-bg);
    border: 1px solid var(--card-border);
    border-radius: 16px;
    padding: 20px;
    height: 400px;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.skeleton-img {
    width: 100%;
    height: 200px;
    border-radius: 10px;
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.skeleton-text {
    width: 100%;
    height: 20px;
    border-radius: 5px;
    background: linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}

.skeleton-text.short {
    width: 60%;
}

@keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}

/* --- Footer --- */
.footer {
    margin-top: 80px;
    padding: 40px 0;
    border-top: 1px solid var(--card-border);
    background: rgba(5, 5, 5, 0.8);
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-brand p {
    color: var(--text-secondary);
    font-size: 0.9rem;
}

.copyright {
    color: var(--text-secondary);
    font-size: 0.85rem;
}

/* Responsive - Premium Mobile View */
@media (max-width: 768px) {
    .container {
        padding: 0 15px;
    }

    .navbar {
        margin: 10px;
        padding: 15px;
        border-radius: 16px;
    }
    
    .nav-content {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }
    
    .logo {
        font-size: 1.6rem;
    }
    
    .nav-links {
        display: flex;
        overflow-x: auto;
        white-space: nowrap;
        width: 100%;
        padding-bottom: 5px;
        gap: 20px;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none; /* Firefox */
    }
    
    .nav-links::-webkit-scrollbar {
        display: none; /* Safari and Chrome */
    }
    
    .nav-links a {
        font-size: 0.95rem;
        background: rgba(255, 255, 255, 0.05);
        padding: 6px 14px;
        border-radius: 20px;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }
    
    .nav-links a::after {
        display: none;
    }
    
    .nav-links a:hover {
        background: var(--accent);
        color: white;
        border-color: var(--accent);
    }
    
    .mobile-menu-btn {
        display: none;
    }

    .news-section {
        padding: 40px 0;
    }
    
    .section-header h2 {
        font-size: 1.8rem;
    }
    
    /* Mobile Cards - App-like Box Shape */
    .news-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .news-card {
        flex-direction: column;
        height: auto;
        min-height: auto;
        border-radius: 16px;
    }
    
    .card-img-wrapper {
        width: 100%;
        height: 190px;
        border-radius: 16px 16px 0 0;
    }
    
    .card-content {
        padding: 16px;
        justify-content: flex-start;
    }
    
    .card-title {
        font-size: 1.15rem;
        -webkit-line-clamp: 2;
        line-height: 1.4;
        margin-bottom: 8px;
    }
    
    .card-desc {
        font-size: 0.9rem;
        -webkit-line-clamp: 2;
        margin-top: 5px;
    }
    
    .card-meta {
        font-size: 0.75rem;
        margin-bottom: 8px;
    }
    
    /* Mobile Skeletons - Box Shape */
    .skeleton-grid {
        grid-template-columns: 1fr;
        gap: 20px;
    }
    
    .skeleton-card {
        flex-direction: column;
        height: 340px;
        padding: 16px;
        gap: 15px;
        border-radius: 16px;
    }
    
    .skeleton-img {
        width: 100%;
        height: 190px;
        border-radius: 10px;
    }
    
    .footer {
        margin-top: 40px;
        padding: 30px 0;
    }

    .footer-content {
        flex-direction: column;
        gap: 15px;
        text-align: center;
    }
}
```

---

### `script.js`
```javascript
document.addEventListener('DOMContentLoaded', () => {
    // We use rss2json to convert public RSS feeds into JSON. 
    // This allows the website to work perfectly on GitHub Pages without needing a backend server!
    const RSS2JSON_URL = 'https://api.rss2json.com/v1/api.json?rss_url=';
    const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';

    // Sections Configuration (Reliable RSS Feeds)
    const sections = [
        {
            id: 'politics',
            url: `${RSS2JSON_URL}${encodeURIComponent('https://feeds.bbci.co.uk/bengali/rss.xml')}`,
            containerId: 'politics-grid',
            loaderId: 'politics-loader',
            sourceName: 'BBC Bangla'
        },
        {
            id: 'bd',
            url: `${RSS2JSON_URL}${encodeURIComponent('https://www.dhakatribune.com/feed/bangladesh')}`,
            containerId: 'bd-grid',
            loaderId: 'bd-loader',
            sourceName: 'Dhaka Tribune'
        },
        {
            id: 'world',
            url: `${RSS2JSON_URL}${encodeURIComponent('https://www.aljazeera.com/xml/rss/all.xml')}`,
            containerId: 'international-grid',
            loaderId: 'international-loader',
            sourceName: 'Al Jazeera'
        },
        {
            id: 'top',
            url: `${RSS2JSON_URL}${encodeURIComponent('http://feeds.bbci.co.uk/news/rss.xml')}`,
            containerId: 'top-grid',
            loaderId: 'top-loader',
            sourceName: 'BBC News'
        },
        {
            id: 'sports',
            url: `${RSS2JSON_URL}${encodeURIComponent('https://www.skysports.com/rss/12040')}`,
            containerId: 'sports-grid',
            loaderId: 'sports-loader',
            sourceName: 'Sky Sports'
        }
    ];

    // Format Date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Render Articles for a specific section
    const renderSection = (items, containerId, loaderId, defaultSourceName) => {
        const container = document.getElementById(containerId);
        const loader = document.getElementById(loaderId);
        
        // Hide loader
        if (loader) loader.classList.add('hidden');
        
        // Filter valid articles
        const validArticles = items.filter(item => item.title && item.link).slice(0, 10);
        
        if (validArticles.length === 0) {
            container.innerHTML = '<p style="color: var(--text-secondary)">No articles found for this section.</p>';
        } else {
            let html = '';
            validArticles.forEach(article => {
                // Determine image
                let imageUrl = article.thumbnail || article.enclosure?.link || DEFAULT_IMAGE;
                
                // Extract image from description if no thumbnail is available
                if (imageUrl === DEFAULT_IMAGE && article.description) {
                    const imgMatch = article.description.match(/<img[^>]+src="([^">]+)"/);
                    if (imgMatch && imgMatch[1]) {
                        imageUrl = imgMatch[1];
                    }
                }
                
                // Clean HTML from description
                let description = article.description || '';
                description = description.replace(/<[^>]*>?/gm, ''); // remove HTML tags
                if (description.length > 150) description = description.substring(0, 150) + '...';

                const sourceName = defaultSourceName;
                const pubDate = formatDate(article.pubDate);

                html += `
                    <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="news-card">
                        <div class="card-img-wrapper">
                            <img src="${imageUrl}" alt="" class="card-img" onerror="this.src='${DEFAULT_IMAGE}'">
                        </div>
                        <div class="card-content">
                            <div class="card-meta">
                                <span class="source">${sourceName}</span>
                                <span>${pubDate}</span>
                            </div>
                            <h3 class="card-title">${article.title}</h3>
                            <p class="card-desc">${description}</p>
                        </div>
                    </a>
                `;
            });
            container.innerHTML = html;
        }
        
        container.classList.remove('hidden');
    };

    // Fetch Data for a single section
    const fetchSectionData = async (section) => {
        try {
            const response = await fetch(section.url);
            if (!response.ok) throw new Error('API Error');
            const data = await response.json();
            
            if (data.status === 'ok' && data.items) {
                renderSection(data.items, section.containerId, section.loaderId, section.sourceName);
            } else {
                throw new Error('Invalid Data');
            }
        } catch (error) {
            console.error(`Error fetching ${section.id}:`, error);
            const container = document.getElementById(section.containerId);
            const loader = document.getElementById(section.loaderId);
            if (loader) loader.classList.add('hidden');
            container.innerHTML = `<p style="color: #ef4444; padding: 20px; background: rgba(239, 68, 68, 0.1); border-radius: 8px;">Failed to load news. Please try again later.</p>`;
            container.classList.remove('hidden');
        }
    };

    // Fetch all sections
    const fetchAllSections = async () => {
        for (const section of sections) {
            await fetchSectionData(section);
            // Wait 1000ms between requests to avoid rate limits on rss2json
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    };

    // Initialize
    fetchAllSections();

    // Auto-update news every 30 minutes (1,800,000 ms)
    setInterval(fetchAllSections, 30 * 60 * 1000);
});
```
