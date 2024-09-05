let currentTab = 'manual';
let isPostPublished = false;
let tooltip;  // משתנה לשמירת ההפניה לתפריט הנפתח
let activeButton;  // משתנה לשמירת הכפתור הפעיל

function switchTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('manual-video').classList.toggle('hidden', tab !== 'manual');
    document.getElementById('invision-video').classList.toggle('hidden', tab !== 'invision');
    updatePreview();
}

function handleMediaUpload(event) {
    const file = event.target.files[0];
    const maxSize = 50 * 1024 * 1024; // 50MB

    if (file && file.size > maxSize) {
        alert("הקובץ גדול מדי. אנא העלה קובץ בגודל של עד 50MB.");
        event.target.value = ''; // לאפס את שדה הקובץ
        return;
    }

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const previewVideo = document.getElementById('preview-video');
            const previewMediaContainer = document.getElementById('preview-media-container');

            previewVideo.src = e.target.result;
            previewVideo.style.display = 'block';
            previewMediaContainer.style.backgroundImage = 'none';

            previewMediaContainer.style.display = 'block';
        }
        reader.readAsDataURL(file);
    }
}
function updatePreview() {
    if (currentTab === 'manual') {
        const title = document.getElementById('video-title').value;
        const description = document.getElementById('video-description').value;
        const tags = document.getElementById('video-tags').value;

        document.getElementById('preview-title').textContent = title;
        document.getElementById('preview-description').textContent = description;
        document.getElementById('preview-tags').textContent = tags;
    }
    updateSEOScore();
}

function updateSEOScore() {
    let score = 0;
    if (currentTab === 'manual') {
        const mediaUploaded = document.getElementById('video-file').value !== '';
        const title = document.getElementById('video-title').value;
        const description = document.getElementById('video-description').value;
        const tags = document.getElementById('video-tags').value;

        if (mediaUploaded) score += 30;
        score += Math.min(title.length, 20);
        score += Math.min(description.length / 2, 30);
        score += Math.min(tags.split(',').length * 5, 20);
    } else {
        const topic = document.getElementById('invision-topic').value;
        const description = document.getElementById('invision-description').value;
        const audience = document.getElementById('invision-audience').value;
        score += topic ? 30 : 0;
        score += Math.min(description.length / 3, 40);
        score += audience ? 30 : 0;
    }

    const meterElement = document.getElementById('seo-meter-fill');
    const scoreElement = document.getElementById('seo-score');
    meterElement.style.width = `${score}%`;
    scoreElement.textContent = `${score}%`;
}

function togglePreviewMode(mode) {
    const container = document.getElementById('preview-container');
    container.className = mode === 'mobile' ? 'preview-mobile' : 'preview-desktop';
    
    const buttons = document.querySelectorAll('.preview-toggle .button');
    buttons.forEach(button => {
        button.classList.toggle('active', 
            (mode === 'desktop' && button.textContent.includes('דסקטופ')) ||
            (mode === 'mobile' && button.textContent.includes('מובייל'))
        );
    });
}

function publishVideo() {
    isPostPublished = true;
    document.getElementById('show-recommendations').classList.remove('disabled');
    document.querySelector('.recommendation-count').classList.remove('hidden');
    alert('הסרטון פורסם בהצלחה!');
}

function saveDraft() {
    alert('הטיוטה נשמרה בהצלחה!');
}

function deleteVideo() {
    if (confirm('האם אתה בטוח שברצונך למחוק את הסרטון?')) {
        if (currentTab === 'manual') {
            document.getElementById('video-title').value = '';
            document.getElementById('video-description').value = '';
            document.getElementById('video-tags').value = '';
            document.getElementById('video-file').value = '';
        } else {
            document.getElementById('invision-topic').value = '';
            document.getElementById('invision-description').value = '';
            document.getElementById('invision-audience').value = '';
        }
        document.getElementById('preview-video').src = '';
        document.getElementById('preview-title').textContent = '';
        document.getElementById('preview-description').textContent = '';
        document.getElementById('preview-tags').textContent = '';
        updateSEOScore();
        alert('הסרטון נמחק בהצלחה.');
    }
}

function generateInvisionVideo() {
    const topic = document.getElementById('invision-topic').value;
    const description = document.getElementById('invision-description').value;
    const audience = document.getElementById('invision-audience').value;

    if (!topic || !description || !audience) {
        alert("אנא מלא את כל השדות הדרושים.");
        return;
    }

    const invisionContent = `נושא: ${topic}\n${description}\nקהל יעד: ${audience}`;
    document.getElementById('invision-result').textContent = invisionContent;
    document.getElementById('invision-result').classList.remove('hidden');

    document.getElementById('preview-title').textContent = topic;
    document.getElementById('preview-description').textContent = description;
    document.getElementById('preview-tags').textContent = audience;

    updateSEOScore();
}

function getKeywordSuggestions() {
    return ['מדריך', 'סקירה', 'גיימינג', 'מוזיקה', 'חדשות', 'בידור', 'לייף סטייל', 'טכנולוגיה'];
}

function addKeywordToTags(keyword) {
    const tagsElement = currentTab === 'manual' ? document.getElementById('video-tags') : document.getElementById('invision-description');
    tagsElement.value += (tagsElement.value ? ', ' : '') + keyword;
    updatePreview();
}

function initializeKeywords() {
    const keywords = getKeywordSuggestions();
    const keywordList = document.getElementById('keyword-list');
    keywordList.innerHTML = '';
    keywords.forEach(keyword => {
        const keywordElement = document.createElement('span');
        keywordElement.classList.add('keyword');
        keywordElement.textContent = keyword;
        keywordElement.onclick = function() { addKeywordToTags(keyword); };
        keywordList.appendChild(keywordElement);
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializeKeywords();
    updateSEOScore();
});

document.addEventListener('DOMContentLoaded', function() {
    const platformButtons = document.querySelectorAll('.platform-btn');
    const tooltipContainer = document.getElementById('tooltip-container');

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
            {url: "system/content/instagram/igtv/index.html", value: "Reels"},
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

document.addEventListener('DOMContentLoaded', function() {
    const showRecommendationsBtn = document.getElementById('show-recommendations');
    showRecommendationsBtn.addEventListener('mouseenter', function() {
        if (this.classList.contains('disabled')) {
            let tooltip = this.querySelector('.tooltip-bubble');
            if (!tooltip) {
                tooltip = document.createElement('div');
                tooltip.classList.add('tooltip-bubble');
                tooltip.textContent = 'יש לפרסם את הפוסט לקבלת המלצות';
                this.appendChild(tooltip);
            }
        }
    });

    showRecommendationsBtn.addEventListener('mouseleave', function() {
        const tooltip = this.querySelector('.tooltip-bubble');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

function showRecommendations() {
    if (!isPostPublished) {
        return;
    }

    const loadingElement = document.getElementById('recommendations-loading');
    loadingElement.classList.add('hidden');
    document.querySelector('.recommendations-content').classList.remove('hidden');

    displayRecommendations();
}

function displayRecommendations() {
    const recommendations = [
        { 
            text: 'שינוי תוכן', 
            reason: 'התוכן הנוכחי אינו מספיק מעניין או ממוקד. יש לשנות את התוכן כך שיהיה יותר מושך וממוקד.',
            example: 'חדש בחנות שלנו! מבצע מיוחד על כל מוצרי הקיץ. בואו לבקר אותנו ותיהנו מהנחות מדהימות!'
        },
        { 
            text: 'הוסף האשטאג', 
            reason: 'האשטאגים רלוונטיים יגבירו את החשיפה.',
            example: '#מבצע #הנחות #קיץ'
        },
        { 
            text: 'הוסף קריאה לפעולה', 
            reason: 'יעודד את הקוראים לפעול.',
            example: 'בואו עכשיו לחנות!'
        }
    ];

    const recommendationsList = document.getElementById('recommendations-list');
    recommendationsList.innerHTML = recommendations.map((rec, index) => `
        <div class="recommendation-item">
            <label>
                <input type="checkbox" data-index="${index}" onchange="updateImprovedPreview()">
                ${rec.text}
            </label>
            <p>${rec.reason}</p>
            <p><strong>דוגמה:</strong> ${rec.example}</p>
        </div>
    `).join('');

    document.querySelector('.recommendations-container').classList.remove('hidden');
    updateImprovedPreview();
}

function updateImprovedPreview() {
    const originalText = currentTab === 'manual' ? document.getElementById('video-title').value + '\n' + document.getElementById('video-description').value : document.getElementById('invision-topic').value + '\n' + document.getElementById('invision-description').value;
    let improvedText = originalText;
    let hashtags = '';
    let cta = '';

    document.querySelectorAll('#recommendations-list input:checked').forEach((checkbox) => {
        const recommendationIndex = parseInt(checkbox.dataset.index, 10);
        switch(recommendationIndex) {
            case 0:
                improvedText = 'חדש בחנות שלנו! מבצע מיוחד על כל מוצרי הקיץ. בואו לבקר אותנו ותיהנו מהנחות מדהימות!';
                break;
            case 1:
                hashtags += ' #מבצע #הנחות #קיץ';
                break;
            case 2:
                cta = ' בואו עכשיו לחנות!';
                break;
        }
    });

    improvedText += hashtags;
    improvedText += cta;

    const previewContainer = document.getElementById('improved-preview');
    previewContainer.innerHTML = `
        <div class="video-preview">
            <div class="video-content">
                <div class="video-media-container">
                    <video src="${document.getElementById('preview-video').src}" class="video-media" controls></video>
                </div>
                <div class="video-info">
                    <h3 class="video-title">${improvedText.split('\n')[0]}</h3>
                    <p class="video-description">${improvedText.split('\n').slice(1).join('\n')}</p>
                    <p class="video-tags">${document.getElementById('video-tags').value}</p>
                </div>
                <div class="video-actions">
                    <div class="video-action"><i class="fas fa-thumbs-up"></i><span>0</span></div>
                    <div class="video-action"><i class="fas fa-thumbs-down"></i><span>0</span></div>
                    <div class="video-action"><i class="fas fa-share"></i><span>שתף</span></div>
                    <div class="video-action"><i class="fas fa-download"></i><span>הורד</span></div>
                    <div class="video-action"><i class="fas fa-ellipsis-h"></i></div>
                </div>
            </div>
        </div>
    `;
}
function applyRecommendations() {
    const improvedText = document.getElementById('improved-preview').querySelector('p').textContent;
    if (currentTab === 'manual') {
        document.getElementById('manual-text').value = improvedText;
    } else {
        document.getElementById('ai-content').value = improvedText;
    }
    updatePreview();
    closeRecommendations();
}

function closeRecommendations() {
    document.querySelector('.recommendations-container').classList.add('hidden');
}

function selectOption(option) {
    alert(`נבחרה האפשרות: ${option}`);
}