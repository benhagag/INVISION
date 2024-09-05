document.addEventListener('DOMContentLoaded', function() {
    const topicList = document.getElementById('topic-list');
    const generateLandingPageBtn = document.getElementById('generate-landing-page');
    const processingMessage = document.getElementById('processing-message');
    const landingPageMockup = document.getElementById('landing-page-mockup');
    const selectedTopicsContainer = document.getElementById('selected-topics');
    const desktopViewBtn = document.getElementById('desktop-view');
    const mobileViewBtn = document.getElementById('mobile-view');
    const editTopicsBtn = document.getElementById('edit-topics');
    const landingPageTitle = document.getElementById('landing-page-title');
    const landingPageContainer = document.getElementById('landing-page-container');
    const backArrow = document.querySelector('.back-arrow');
    const manualPrepBtn = document.getElementById('manual-preparation');
    const invisionPrepBtn = document.getElementById('invision-preparation');
    const invisionOverlay = document.getElementById('invision-overlay');
    const invisionStatus = document.getElementById('invision-status');
    const controlPanel = document.querySelector('.control-panel');

    const topics = [
        "בית - עמוד הבית של האתר, כולל מבוא קצר על העסק ותמונה מרכזית.",
        "אודותינו - מידע על העסק, ההיסטוריה שלו, הייחודיות והחזון.",
        "שירותים - פירוט על השירותים או המוצרים שהעסק מציע.",
        "חוגים/מוצרים - פירוט על החוגים השונים או המוצרים המובילים.",
        "לוח זמנים - זמני פעילות, שעות פתיחה, מועדי חוגים או פגישות.",
        "הצוות - פרופילים של הצוות, כולל תמונות ותיאור קצר על כל חבר צוות.",
        "לקוחות מספרים - המלצות ועדויות מלקוחות מרוצים.",
        "הרשמה - טופס להרשמה לחוגים, שירותים או לקבלת מידע נוסף.",
        "צור קשר - פרטי יצירת קשר, טופס ליצירת קשר, מפת הגעה.",
        "בלוג/חדשות - מאמרים, חדשות ועדכונים מהעסק.",
        "שאלות נפוצות (FAQ) - תשובות לשאלות נפוצות שהלקוחות שואלים.",
        "מדיה/גלריה - גלריית תמונות וסרטונים מהפעילויות או מהמוצרים של העסק.",
        "אירועים קרובים - מידע על אירועים קרובים, סדנאות, מבצעים מיוחדים.",
        "הזמנת שירותים/מוצרים - אפשרות להזמין שירותים או מוצרים דרך האתר.",
        "מדיניות פרטיות ותנאי שימוש - פרטים על מדיניות הפרטיות ותנאי השימוש של האתר.",
        "חנות אונליין - במידה ויש מוצרים למכירה, עמוד עם קטלוג מוצרים, סלים ותשלום.",
        "מבצעים והנחות - עמוד עם מבצעים והנחות מיוחדים ללקוחות.",
        "המלצות של מומחים - המלצות של מומחים בתחום, מאמרים מקצועיים.",
        "שיתופי פעולה - מידע על שיתופי פעולה עם עסקים או גופים אחרים.",
        "עדכונים ואירועים בלייב - שידורים חיים של אירועים, סדנאות או פעילויות של העסק."
    ];

    const defaultSelectedTopics = [
        "בית - עמוד הבית של האתר, כולל מבוא קצר על העסק ותמונה מרכזית.",
        "אודותינו - מידע על העסק, ההיסטוריה שלו, הייחודיות והחזון.",
        "שירותים - פירוט על השירותים או המוצרים שהעסק מציע.",
        "צור קשר - פרטי יצירת קשר, טופס ליצירת קשר, מפת הגעה.",
        "לוח זמנים - זמני פעילות, שעות פתיחה, מועדי חוגים או פגישות."
    ];

    function renderTopics() {
        topicList.innerHTML = '';
        topics.forEach((topic, index) => {
            const topicItem = document.createElement('div');
            topicItem.className = 'topic-item';
            if (defaultSelectedTopics.includes(topic)) {
                topicItem.classList.add('selected');
            }
            topicItem.draggable = true;
            topicItem.innerHTML = `<span class="drag-handle">&#9776;</span><span class="topic-title">${topic}</span>`;
            topicItem.addEventListener('click', () => {
                topicItem.classList.toggle('selected');
            });
            topicList.appendChild(topicItem);
        });

        new Sortable(topicList, {
            handle: '.drag-handle',
            animation: 150,
            onEnd: function() {
                const newTopics = Array.from(document.querySelectorAll('.topic-item')).map(item => item.querySelector('.topic-title').textContent);
                topics.length = 0;
                topics.push(...newTopics);
            }
        });
    }

    generateLandingPageBtn.addEventListener('click', () => {
        processingMessage.style.display = 'block';
        const selectedTopics = Array.from(document.querySelectorAll('.topic-item.selected'))
            .map(item => item.querySelector('.topic-title').textContent);
        
        setTimeout(() => {
            processingMessage.style.display = 'none';
            renderLandingPageMockup(selectedTopics, 'manual');
            landingPageContainer.style.display = 'block';
            topicList.style.display = 'none';
            generateLandingPageBtn.style.display = 'none';
            editTopicsBtn.style.display = 'none';
            controlPanel.style.display = 'flex';
            controlPanel.style.flexDirection = 'column';
            controlPanel.style.alignItems = 'center';
        }, 2000);
    });

    function renderLandingPageMockup(selectedTopics, mode) {
        selectedTopicsContainer.innerHTML = '';
        selectedTopics.forEach(topic => {
            const sectionMockup = document.createElement('div');
            sectionMockup.className = 'section-mockup';
            if (mode === 'manual') {
                sectionMockup.innerHTML = `
                    <h2>${topic.split(' - ')[0]}</h2>
                    <h3>כותרת משנה (המלצה: כותרת המייצגת את התוכן)</h3>
                    <p>כאן תוכל להוסיף טקסט המסביר על הנושא שבחרת. לדוגמה: "שירותים - אנו מציעים מגוון רחב של שירותים כולל ייעוץ, פיתוח תוכנה ושירותי תמיכה."</p>
                    <div class="media-upload">
                        <input type="file" accept="image/*,video/*,text/csv" onchange="previewMedia(event)">
                        <p>המלצה: להעלות תמונה או וידיאו לדסקטופ. לדוגמה, אם הנושא הוא 'אירועים קרובים', ניתן להעלות וידיאו קצר המציג את האירועים הקרובים.</p>
                        <div class="media-preview"></div>
                    </div>
                `;
            } else if (mode === 'invision') {
                let content = '';
                switch(topic.split(' - ')[0]) {
                    case 'בית':
                        content = `
                            <h2>ברוכים הבאים ל-DAFGYM</h2>
                            <h3>המקום שלך להתעמלות ולאורח חיים בריא</h3>
                            <p>DAFGYM הוא בית הספר המוביל להתעמלות בישראל. אנו מציעים מגוון רחב של שיעורים וחוגים לכל הגילאים והרמות, מילדים ועד מבוגרים. צוות המדריכים המקצועי שלנו מחויב לעזור לכם להשיג את המטרות הגופניות שלכם בסביבה תומכת ומהנה.</p>
                            <div class="infographic">
                                <div class="infographic-item">
                                    <img src="https://example.com/icon-classes.png" alt="Classes Icon">
                                    <p>50+ חוגים שבועיים</p>
                                </div>
                                <div class="infographic-item">
                                    <img src="https://example.com/icon-trainers.png" alt="Trainers Icon">
                                    <p>20 מדריכים מוסמכים</p>
                                </div>
                                <div class="infographic-item">
                                    <img src="https://example.com/icon-members.png" alt="Members Icon">
                                    <p>1000+ חברים מרוצים</p>
                                </div>
                            </div>
                            <div class="media-upload">
                                <input type="file" accept="image/*,video/*" onchange="previewMedia(event)">
                                <p>העלה תמונה או וידאו של אולם ההתעמלות הראשי שלך.</p>
                                <div class="media-preview"></div>
                            </div>
                        `;
                        break;
                    // ... (other cases remain the same)
                    default:
                        content = `
                            <h2>${topic.split(' - ')[0]}</h2>
                            <h3>תוכן מותאם אישית ל-DAFGYM</h3>
                            <p>כאן יופיע תוכן מותאם אישית לנושא ${topic.split(' - ')[0]} עבור DAFGYM. תוכן זה יכלול מידע מפורט ורלוונטי לנושא הספציפי, תוך התאמה לצרכי בית הספר להתעמלות.</p>
                            <div class="media-upload">
                                <input type="file" accept="image/*,video/*" onchange="previewMedia(event)">
                                <p>העלה תמונה או וידאו רלוונטיים ל-${topic.split(' - ')[0]}.</p>
                                <div class="media-preview"></div>
                            </div>
                        `;
                }
                sectionMockup.innerHTML = content;
            }
            selectedTopicsContainer.appendChild(sectionMockup);
        });
    }

    window.previewMedia = function(event) {
        const file = event.target.files[0];
        const previewContainer = event.target.nextElementSibling.nextElementSibling;
        previewContainer.innerHTML = '';
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                let mediaElement;
                if (file.type.startsWith('video')) {
                    mediaElement = document.createElement('video');
                    mediaElement.controls = true;
                } else if (file.type === 'text/csv') {
                    mediaElement = document.createElement('iframe');
                    mediaElement.src = e.target.result;
                } else {
                    mediaElement = document.createElement('img');
                }
                mediaElement.src = e.target.result;
                mediaElement.style.maxWidth = '100%';
                mediaElement.style.maxHeight = '100%';
                previewContainer.appendChild(mediaElement);
            };
            reader.readAsDataURL(file);
        }
    };

    desktopViewBtn.addEventListener('click', () => {
        landingPageMockup.style.maxWidth = '800px';
        desktopViewBtn.classList.add('selected');
        mobileViewBtn.classList.remove('selected');
    });

    mobileViewBtn.addEventListener('click', () => {
        landingPageMockup.style.maxWidth = '375px';
        mobileViewBtn.classList.add('selected');
        desktopViewBtn.classList.remove('selected');
    });

    editTopicsBtn.addEventListener('click', () => {
        landingPageContainer.style.display = 'none';
        topicList.style.display = 'block';
        generateLandingPageBtn.style.display = 'block';
        editTopicsBtn.style.display = 'block';
        controlPanel.style.display = 'none';
    });

    backArrow.addEventListener('click', () => {
        landingPageContainer.style.display = 'none';
        topicList.style.display = 'block';
        generateLandingPageBtn.style.display = 'block';
        editTopicsBtn.style.display = 'block';
        controlPanel.style.display = 'none';
    });

    manualPrepBtn.addEventListener('click', () => {
        manualPrepBtn.classList.add('selected');
        invisionPrepBtn.classList.remove('selected');
        const selectedTopics = Array.from(document.querySelectorAll('.topic-item.selected'))
            .map(item => item.querySelector('.topic-title').textContent);
        renderLandingPageMockup(selectedTopics, 'manual');
    });

    invisionPrepBtn.addEventListener('click', () => {
        invisionPrepBtn.classList.add('selected');
        manualPrepBtn.classList.remove('selected');
        invisionOverlay.style.display = 'flex';
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 10;
            switch(progress) {
                case 20:
                    invisionStatus.textContent = 'המערכת מפיקה תוצרים...';
                    break;
                case 50:
                    invisionStatus.textContent = 'מתאימה את התוכן ל-DAFGYM...';
                    break;
                case 80:
                    invisionStatus.textContent = 'מסיימת עיצוב דף הנחיתה...';
                    break;
               case 100:
                    clearInterval(progressInterval);
                    invisionStatus.textContent = 'דף הנחיתה מוכן!';
                    setTimeout(() => {
                        invisionOverlay.style.display = 'none';
                        const selectedTopics = Array.from(document.querySelectorAll('.topic-item.selected'))
                            .map(item => item.querySelector('.topic-title').textContent);
                        renderLandingPageMockup(selectedTopics, 'invision');
                    }, 1000);
                    break;
            }
        }, 500);
    });

    renderTopics();
});

// Functionality for platform buttons with tooltips
document.addEventListener('DOMContentLoaded', function() {
    const platformButtons = document.querySelectorAll('.platform-btn');
    const tooltipContainer = document.getElementById('tooltip-container');
    let tooltip;  // משתנה לשמירת ההפניה לתפריט הנפתח
    let activeButton;  // משתנה לשמירת הכפתור הפעיל

    const platformOptions = {
        facebook: [
            {url: "system/content/facebook/posts/index.html", value: "פוסטים"},
            {url: "system/content/facebook/modaot/index.html", value: "מודעות ממומנות"},
            {url: "system/content/facebook/story/index.html", value: "סטוריז"},
            {url: "system/content/facebook/events/index.html", value: "אירועים"},
            {url: "system/content/facebook/leads/index.html", value: "טפסי לידים"},
            {url: "system/content/facebook/shop/index.html", value: "חנות מקוונת"},
        ],
        instagram: [
            {url: "system/content/instagram/posts/index.html", value: "פוסט לפיד"},
            {url: "system/content/instagram/story/index.html", value: "פוסט לסטורי"},
            {url: "system/content/instagram/reels/index.html", value: "Reels"},
        ],
        tiktok: [
            {url: "system/content/tiktok/video/index.html", value: "העלאת סרטון"},
        ],
        youtube: [
            {url: "system/content/youtube/video/index.html", value: "העלאת סרטון"},
        ],
        twitter: [
            {url: "system/content/twitter/tweet/index.html", value: "פרסום ציוץ"},
        ],
        google: [
            {url: "system/content/google/modaot/index.html", value: "מודעות ממומנות"},
        ],
        'landing-page': [
            {url: "system/content/landing-page/main/index.html", value: "ראשי"},
            {url: "system/content/landing-page/second/index.html", value: "משני"},
        ]
    };

    platformButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            activeButton = this;  // שמירת הכפתור הפעיל
            const platform = this.getAttribute('data-platform');
            const options = platformOptions[platform];
            const rect = this.getBoundingClientRect();

            tooltipContainer.innerHTML = `
                <div class="tooltip" style="top: ${rect.bottom + 5}px; left: ${rect.left + window.scrollX}px; min-width: ${rect.width}px;">
                    <ul>
                        ${options.map(option => `<li onclick="selectOption('https://benhagag.github.io/INVISION/${option.url}')">${option.value}</li>`).join('')}
                    </ul>
                </div>
            `;

            tooltip = tooltipContainer.querySelector('.tooltip');
            tooltip.style.display = 'block';

            // שמירת התפריט הנפתח והוספת מאזיני אירועים
            tooltip.addEventListener('mouseenter', function() {
                tooltip.style.display = 'block';
            });

            tooltip.addEventListener('mouseleave', closeTooltip);
        });

        button.addEventListener('mouseleave', function() {
            setTimeout(() => {
                if (!tooltip.matches(':hover') && !activeButton.matches(':hover')) {
                    closeTooltip();
                }
            }, 100);
        });
    });

    function closeTooltip() {
        if (tooltip) {
            tooltip.style.display = 'none';
            activeButton = null;  // איפוס הכפתור הפעיל
        }
    }
});

function selectOption(option) {
    window.location.href = option;
}