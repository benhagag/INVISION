let isPostPublished = false;
let currentTab = 'manual';
let mediaFiles = [];
let currentMediaIndex = 0;

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById('manual-post').classList.toggle('hidden', tab !== 'manual');
    document.getElementById('ai-post').classList.toggle('hidden', tab !== 'ai');
    currentTab = tab;
    updatePreview();
}

function updatePreview() {
    const previewText = document.getElementById('preview-text');
    if (currentTab === 'manual') {
        previewText.textContent = document.getElementById('manual-text').value;
    } else {
        previewText.textContent = document.getElementById('ai-content').value;
    }
    updateSEOScore();
    updateImprovedPreview();
}

function updateSEOScore() {
    const text = currentTab === 'manual' ? document.getElementById('manual-text').value : document.getElementById('ai-content').value;
    const score = Math.min(text.length / 2, 100);
    document.getElementById('seo-meter-fill').style.width = `${score}%`;
    document.getElementById('seo-score').textContent = `${Math.round(score)}%`;
}

function togglePreviewMode(mode) {
    const container = document.getElementById('preview-container');
    container.className = mode === 'mobile' ? 'preview-mobile' : 'preview-desktop';
    
    document.querySelectorAll('.preview-toggle .preview-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(mode === 'mobile' ? 'מובייל' : 'דסקטופ'));
    });
}

function generateAIContent() {
    const topic = document.getElementById('ai-topic').value;
    const content = document.getElementById('ai-content').value;
    const audience = document.getElementById('ai-audience').value;

    if (!topic || !content || !audience) {
        document.getElementById('ai-error').textContent = 'אנא מלא את כל השדות';
        return;
    }

    document.getElementById('ai-error').textContent = '';
    
    // Simulating AI content generation
    const generatedContent = `חדש ב${topic}! 🎉\n${content}\nמיועד במיוחד ל${audience}.\nבואו לבקר אותנו ותיהנו מהצעות מיוחדות!`;
    
    document.getElementById('ai-content').value = generatedContent;
    updatePreview();
}

function publishPost() {
    isPostPublished = true;
    document.getElementById('show-recommendations').classList.remove('disabled');
    document.querySelector('.recommendation-count').classList.remove('hidden');
    alert('הפוסט פורסם בהצלחה!');
}

function saveDraft() {
    alert('הטיוטה נשמרה בהצלחה!');
}

function deletePost() {
    if (confirm('האם אתה בטוח שברצונך למחוק את הפוסט?')) {
        document.getElementById('manual-text').value = '';
        document.getElementById('ai-content').value = '';
        mediaFiles = [];
        currentMediaIndex = 0;
        updatePreview();
        alert('הפוסט נמחק בהצלחה.');
    }
}

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
    const originalText = currentTab === 'manual' ? document.getElementById('manual-text').value : document.getElementById('ai-content').value;
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

    let mediaContent = '';
    if (mediaFiles.length > 0) {
        const currentMedia = mediaFiles[currentMediaIndex];
        if (currentMedia.type === 'image') {
            mediaContent = `<img src="${currentMedia.src}" alt="תמונה שנבחרה">`;
        } else if (currentMedia.type === 'video') {
            mediaContent = `<video src="${currentMedia.src}" controls></video>`;
        }
    }

    document.getElementById('improved-preview').innerHTML = `
        <div class="instagram-post-header">
            <img src="https://via.placeholder.com/40" alt="תמונת פרופיל">
            <div class="instagram-post-header-info">
                <div class="instagram-post-header-name">השם שלך</div>
                <div class="instagram-post-header-time">לפני שעה</div>
            </div>
        </div>
        <div class="instagram-post-content">
            <p>${improvedText}</p>
            <div id="media-preview" class="media-preview">${mediaContent}</div>
        </div>
        <div class="instagram-post-actions">
            <span class="instagram-action">❤️ לייק</span>
            <span class="instagram-action">💬 תגובה</span>
            <span class="instagram-action">➡️ שיתוף</span>
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

function addMedia(type) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'image' ? 'image/*' : 'video/*';
    input.multiple = true;
    input.onchange = function(event) {
        const files = event.target.files;
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = function(e) {
                mediaFiles.push({
                    type: type,
                    src: e.target.result,
                    name: file.name
                });
                const filename = document.createElement('p');
                filename.textContent = `קובץ נבחר: ${file.name}`;
                const contentArea = currentTab === 'manual' ? document.getElementById('manual-post') : document.getElementById('ai-post');
                contentArea.appendChild(filename);
                updateMediaPreview();
            }
            reader.readAsDataURL(file);
        });
    };
    input.click();
}

function updateMediaPreview() {
    const mediaPreview = document.getElementById('media-preview');
    mediaPreview.innerHTML = '';
    if (mediaFiles.length > 0) {
        const currentMedia = mediaFiles[currentMediaIndex];
        if (currentMedia.type === 'image') {
            const img = document.createElement('img');
            img.src = currentMedia.src;
            img.alt = "תמונה שנבחרה";
            mediaPreview.appendChild(img);
        } else {
            const video = document.createElement('video');
            video.src = currentMedia.src;
            video.controls = true;
            mediaPreview.appendChild(video);
        }
        mediaPreview.appendChild(createPreviewArrows());
    }
}

function createPreviewArrows() {
    const arrowsContainer = document.createElement('div');
    arrowsContainer.className = 'preview-arrows';
    
    const leftArrow = document.createElement('button');
    leftArrow.className = 'preview-arrow left';
    leftArrow.innerHTML = '&#10094;';
    leftArrow.onclick = () => changePreviewMedia(-1);
    
    const rightArrow = document.createElement('button');
    rightArrow.className = 'preview-arrow right';
    rightArrow.innerHTML = '&#10095;';
    rightArrow.onclick = () => changePreviewMedia(1);
    
    arrowsContainer.appendChild(leftArrow);
    arrowsContainer.appendChild(rightArrow);
    
    return arrowsContainer;
}

function changePreviewMedia(direction) {
    currentMediaIndex += direction;
    if (currentMediaIndex < 0) {
        currentMediaIndex = mediaFiles.length - 1;
    } else if (currentMediaIndex >= mediaFiles.length) {
        currentMediaIndex = 0;
    }
    updateMediaPreview();
}

function tagPeople() {
    alert('פונקציונליות תיוג אנשים תיושם בעתיד');
}

function openEmojiPicker() {
    const emojiPicker = document.getElementById('emoji-picker');
    emojiPicker.classList.toggle('hidden');
    if (!emojiPicker.classList.contains('hidden')) {
        const emojis = ['😊', '👍', '❤️', '🎉', '🤔', '😂', '👏', '🙌', '🔥', '✨'];
        emojiPicker.innerHTML = emojis.map(emoji => `<span class="emoji" onclick="addEmoji('${emoji}')">${emoji}</span>`).join('');
    }
}

function addEmoji(emoji) {
    const textArea = currentTab === 'manual' ? document.getElementById('manual-text') : document.getElementById('ai-content');
    const cursorPos = textArea.selectionStart;
    const textBefore = textArea.value.substring(0, cursorPos);
    const textAfter = textArea.value.substring(cursorPos);
    textArea.value = textBefore + emoji + textAfter;
    textArea.focus();
    textArea.selectionStart = cursorPos + emoji.length;
    textArea.selectionEnd = cursorPos + emoji.length;
    updatePreview();
    document.getElementById('emoji-picker').classList.add('hidden');
}

function addLocation() {
    alert('פונקציונליות הוספת מיקום תיושם בעתיד');
}

function addGIF() {
    alert('פונקציונליות הוספת GIF תיושם בעתיד');
}

document.addEventListener('DOMContentLoaded', function() {
    const keywords = ['מבצע מיוחד', 'חדש על המדף', 'המלצת השבוע', 'מהדורה מוגבלת', 'הכי נמכר'];
    const keywordList = document.getElementById('keyword-list');
    keywords.forEach(keyword => {
        const keywordElement = document.createElement('span');
        keywordElement.classList.add('keyword');
        keywordElement.textContent = keyword;
        keywordElement.onclick = () => addKeyword(keyword);
        keywordList.appendChild(keywordElement);
    });
    updatePreview();

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

function addKeyword(keyword) {
    const textArea = currentTab === 'manual' ? document.getElementById('manual-text') : document.getElementById('ai-content');
    textArea.value += (textArea.value ? ' ' : '') + keyword;
    updatePreview();
}

function proceedToNextScreen() {
    alert('מעבר למסך הבא');
    // כאן תוכל להוסיף את ההיגיון למעבר למסך הבא
}

function goBack() {
    alert('חזרה למסך הקודם');
    // כאן תוכל להוסיף את ההיגיון לחזרה למסך הקודם
}	
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
            {url: "system/content/instagram/igtv/index.html", value: "IGTV"},
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
    document.location.href = option;
    // alert(`נבחרה האפשרות: ${option}`);
}