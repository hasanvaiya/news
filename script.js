document.addEventListener('DOMContentLoaded', () => {
    // ============================================================
    //  🚀 SPLASH SCREEN REMOVAL
    // ============================================================
    const hideSplash = () => {
        const splash = document.getElementById('splash');
        if (splash) {
            splash.style.opacity = '0';
            splash.style.pointerEvents = 'none';
            setTimeout(() => splash.remove(), 600);
        }
    };
    // Force hide after max 4s in case of slow network
    setTimeout(hideSplash, 4000);

    const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    
    // You can add an API key here if rss2json limits you
    const RSS2JSON_KEY = ''; 
    const buildRss2jsonUrl = (rssUrl) => `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}${RSS2JSON_KEY ? '&api_key=' + RSS2JSON_KEY : ''}`;

    // --- MASSIVE CATEGORIZED BANGLA FEEDS ---
    const FEEDS = {
        top: [
            { url: 'https://www.prothomalo.com/feed/', source: 'প্রথম আলো' },
            { url: 'https://www.jugantor.com/feed', source: 'যুগান্তর' },
            { url: 'https://www.kalerkantho.com/rss.xml', source: 'কালের কণ্ঠ' },
            { url: 'https://www.ittefaq.com.bd/feed', source: 'ইত্তেফাক' },
            { url: 'https://samakal.com/feed', source: 'সমকাল' }
        ],
        politics: [
            { url: 'https://www.jagonews24.com/rss/politics', source: 'জাগো নিউজ' },
            { url: 'https://www.banglanews24.com/rss/category/Politics', source: 'বাংলানিউজ২৪' },
            { url: 'https://www.dhakapost.com/rss/politics', source: 'ঢাকা পোস্ট' }
        ],
        bd: [
            { url: 'https://bdnews24.com/rss/bangladesh', source: 'বিডিনিউজ২৪' },
            { url: 'https://www.somoynews.tv/rss', source: 'সময় টিভি' },
            { url: 'https://www.jagonews24.com/rss/national', source: 'জাগো নিউজ' },
            { url: 'https://www.bd-pratidin.com/rss.xml', source: 'বাংলাদেশ প্রতিদিন' },
            { url: 'https://www.ntvbd.com/rss', source: 'এনটিভি' },
            { url: 'https://barta24.com/rss', source: 'বার্তা২৪' }
        ],
        world: [
            { url: 'https://feeds.bbci.co.uk/bengali/rss.xml', source: 'বিবিসি বাংলা' },
            { url: 'https://www.dhakapost.com/rss/international', source: 'ঢাকা পোস্ট' },
            { url: 'https://www.jagonews24.com/rss/international', source: 'জাগো নিউজ' },
            { url: 'https://www.banglanews24.com/rss/category/International', source: 'বাংলানিউজ২৪' }
        ],
        sports: [
            { url: 'https://www.jagonews24.com/rss/sports', source: 'জাগো নিউজ' },
            { url: 'https://www.dhakapost.com/rss/sports', source: 'ঢাকা পোস্ট' },
            { url: 'https://www.banglanews24.com/rss/category/Sports', source: 'বাংলানিউজ২৪' }
        ]
    };

    const sections = [
        { id: 'top', containerId: 'top-grid', loaderId: 'top-loader' },
        { id: 'politics', containerId: 'politics-grid', loaderId: 'politics-loader' },
        { id: 'bd', containerId: 'bd-grid', loaderId: 'bd-loader' },
        { id: 'world', containerId: 'international-grid', loaderId: 'international-loader' },
        { id: 'sports', containerId: 'sports-grid', loaderId: 'sports-loader' }
    ];

    let seenLinks = new Set();
    let savedArticles = JSON.parse(localStorage.getItem('thebulletin_saved')) || [];

    const getImg = (a) => a.image?.srcset?.length ? a.image.srcset[0].url : (a.image?.url || a.enclosure?.link || a.thumbnail || DEFAULT_IMAGE);

    // ============================================================
    //  🚀 NOTIFICATION TOAST SYSTEM
    // ============================================================
    const showToast = (message) => {
        const container = document.getElementById('toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    };

    // ============================================================
    //  🚀 BOOKMARK / SAVE NEWS SYSTEM
    // ============================================================
    const updateBookmarkBadge = () => {
        const badge = document.getElementById('bookmark-badge');
        if (badge) {
            badge.textContent = savedArticles.length;
            badge.classList.toggle('hidden', savedArticles.length === 0);
        }
    };

    const toggleSaveArticle = (articleStr, btn) => {
        const article = JSON.parse(decodeURIComponent(articleStr));
        const index = savedArticles.findIndex(a => a.link === article.link);
        
        if (index > -1) {
            savedArticles.splice(index, 1);
            btn.classList.remove('bookmarked');
            showToast('খবরটি রিমুভ করা হয়েছে');
        } else {
            savedArticles.push(article);
            btn.classList.add('bookmarked');
            showToast('খবরটি সেভ করা হয়েছে');
        }
        
        localStorage.setItem('thebulletin_saved', JSON.stringify(savedArticles));
        updateBookmarkBadge();
        renderBookmarks();
    };

    window.handleSaveClick = (event, articleStr) => {
        event.preventDefault(); // Stop link navigation
        event.stopPropagation();
        toggleSaveArticle(articleStr, event.currentTarget);
    };

    const renderBookmarks = () => {
        const list = document.getElementById('bookmarks-list');
        if (!list) return;
        
        if (savedArticles.length === 0) {
            list.innerHTML = '<div class="bookmarks-empty" style="text-align:center; padding: 40px 20px; color: #a1a1aa;"><p>কোনো সেভ করা খবর নেই।</p></div>';
            return;
        }

        list.innerHTML = savedArticles.map(a => `
            <a href="${a.link}" target="_blank" class="swipe-card">
                <div class="card-img-wrapper">
                    <img src="${a.image}" onerror="this.src='${DEFAULT_IMAGE}'">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${a.title}</h3>
                    <div class="card-meta">
                        <span>${a.source}</span>
                    </div>
                </div>
                <button class="bookmark-btn bookmarked" onclick="window.handleSaveClick(event, '${encodeURIComponent(JSON.stringify(a))}');">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/></svg>
                </button>
            </a>
        `).join('');
    };

    updateBookmarkBadge();


    // ============================================================
    //  🚀 BUILD SWIPEABLE CARD
    // ============================================================
    const buildSwipeCard = (a, src) => {
        const isSaved = savedArticles.some(saved => saved.link === a.link);
        const articleData = { title: a.title, link: a.link, image: getImg(a), source: src };
        const articleStr = encodeURIComponent(JSON.stringify(articleData));
        
        let pubDateStr = '';
        if (a.pubDate) {
            const dateObj = new Date(a.pubDate);
            if (!isNaN(dateObj.getTime())) {
                pubDateStr = dateObj.toLocaleTimeString('bn-BD', { hour: '2-digit', minute:'2-digit' });
            }
        }

        return `
        <a href="${a.link}" target="_blank" class="swipe-card">
            <div class="card-img-wrapper">
                <img src="${articleData.image}" alt="" onerror="this.src='${DEFAULT_IMAGE}'">
                <button class="bookmark-btn ${isSaved ? 'bookmarked' : ''}" onclick="window.handleSaveClick(event, '${articleStr}')" title="Save">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"></path></svg>
                </button>
            </div>
            <div class="card-content">
                <h3 class="card-title">${a.title}</h3>
                <div class="card-meta">
                    <span>${src}</span> 
                    ${pubDateStr ? `<span>&bull;</span> <span class="time-ago">${pubDateStr}</span>` : ''}
                    <div style="flex:1"></div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="#8e8e93"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>
                </div>
            </div>
        </a>`;
    };

    const shuffleArray = (array) => {
        let curId = array.length;
        while (0 !== curId) {
            let randId = Math.floor(Math.random() * curId);
            curId -= 1;
            let tmp = array[curId];
            array[curId] = array[randId];
            array[randId] = tmp;
        }
        return array;
    };

    // ============================================================
    //  🚀 FETCH LOGIC
    // ============================================================
    const fetchSectionFeeds = async (sectionId, containerId, loaderId, isRefresh = false) => {
        const container = document.getElementById(containerId);
        const loader = document.getElementById(loaderId);
        
        if (isRefresh) {
            if(container) { container.innerHTML = ''; container.classList.add('hidden'); }
            if(loader) loader.classList.remove('hidden');
        }

        const sectionFeeds = shuffleArray([...(FEEDS[sectionId] || [])]);
        let items = [];
        let fetchedCount = 0;
        
        // Fetch up to 15 items per section (total 75+ items across 5 sections)
        for (const feed of sectionFeeds) {
            if (fetchedCount >= 15) break; 
            try {
                const res = await fetch(buildRss2jsonUrl(feed.url));
                const data = await res.json();
                if (data.status === 'ok' && data.items && data.items.length > 0) {
                    const newItems = data.items.filter(a => !seenLinks.has(a.link));
                    newItems.forEach(a => {
                        a._sourceName = feed.source;
                        seenLinks.add(a.link);
                    });
                    items = items.concat(newItems);
                    fetchedCount += newItems.length;
                }
            } catch (e) { console.error("Error fetching", feed.url); }
        }

        if (items.length > 0) {
            items = shuffleArray(items);
            if (loader) loader.classList.add('hidden');
            if (container) {
                let html = items.map(a => buildSwipeCard(a, a._sourceName)).join('');
                if (isRefresh) {
                    container.innerHTML = html;
                } else {
                    // Prepend for background auto-updates
                    container.insertAdjacentHTML('afterbegin', html);
                }
                container.classList.remove('hidden');
            }
            return items.length;
        } else {
            if (loader && !isRefresh) loader.classList.add('hidden');
            return 0;
        }
    };

    const fetchAllData = async (isRefresh = false) => {
        if (isRefresh) seenLinks = new Set(); // Reset seen links on manual refresh
        
        let totalFetched = 0;
        const promises = sections.map(s => fetchSectionFeeds(s.id, s.containerId, s.loaderId, isRefresh));
        const results = await Promise.all(promises);
        
        totalFetched = results.reduce((acc, val) => acc + val, 0);
        
        if (!isRefresh) hideSplash(); // Hide splash on initial load
        return totalFetched;
    };

    // Initial Load
    fetchAllData();

    // ============================================================
    //  🚀 REFRESH BUTTON (Wipe and load 50+ new)
    // ============================================================
    const handleRefresh = async (btn) => {
        if (!btn || btn.disabled) return;
        btn.disabled = true;
        document.querySelector('.spin-icon')?.classList.add('spin-animation');
        
        const count = await fetchAllData(true);
        if (count > 0) showToast(`${count} টি নতুন খবর আপডেট হয়েছে!`);
        
        btn.disabled = false;
        document.querySelector('.spin-icon')?.classList.remove('spin-animation');
    };

    document.getElementById('refresh-btn-main')?.addEventListener('click', function() { handleRefresh(this); });

    // ============================================================
    //  🚀 AUTO-UPDATE (Every 2 Minutes)
    // ============================================================
    setInterval(async () => {
        console.log("Auto-updating feeds in background...");
        // Auto update fetches new items without wiping existing ones
        const count = await fetchAllData(false);
        if (count > 0) {
            showToast(`🔥 ${count} টি নতুন খবর যুক্ত হয়েছে!`);
        }
    }, 120000); // 2 minutes

    // ============================================================
    //  🚀 NAVIGATION & SCROLL
    // ============================================================
    window.scrollToSection = (id) => {
        const el = document.getElementById(id);
        if (el) {
            const headerOffset = 130;
            const elementPosition = el.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    };

    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.feed-section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        if (current) {
            document.querySelectorAll('.cat-chip').forEach(chip => {
                chip.classList.remove('active');
                if (chip.getAttribute('onclick').includes(current)) {
                    chip.classList.add('active');
                    chip.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                }
            });
        }
    });

    // View Toggles
    document.getElementById('back-to-home')?.addEventListener('click', () => {
        document.getElementById('bookmarks-view').classList.add('hidden');
        document.getElementById('home-view').classList.remove('hidden');
    });

    document.getElementById('nav-bookmark')?.addEventListener('click', () => {
        document.getElementById('home-view').classList.add('hidden');
        document.getElementById('bookmarks-view').classList.remove('hidden');
        window.scrollTo(0,0);
        renderBookmarks();
    });

});
