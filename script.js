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
