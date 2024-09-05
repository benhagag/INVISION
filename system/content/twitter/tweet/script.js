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
    updateMediaPreview(); 
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

    if (!topic || !content) {
        document.getElementById('ai-error').textContent = 'אנא מלא את כל השדות';
        return;
    }

    document.getElementById('ai-error').textContent = '';
    
    const generatedContent = `חדש ב${topic}! 🎉\n${content}\nבואו לבקר אותנו ותיהנו מהצעות מיוחדות!`;
    
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

    document.getElementById('improved-preview').innerHTML = `
        <div class="twitter-post-header">
            <img src="https://via.placeholder.com/40" alt="תמונת פרופיל">
            <div class="twitter-post-header-info">
                <div class="twitter-post-header-name">השם שלך</div>
                <div class="twitter-post-header-time">לפני שעה</div>
            </div>
        </div>
        <div class="twitter-post-content">
            <p>${improvedText}</p>
        </div>
        <div id="improved-media-preview" class="media-preview"></div>
        <div class="twitter-post-actions">
            <span class="twitter-action">❤️ לייק</span>
            <span class="twitter-action">💬 תגובה</span>
            <span class="twitter-action">🔁 ריטוויט</span>
            <span class="twitter-action">📤 שתף</span>
        </div>
    `;

    updateMediaPreview(); 
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
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                mediaFiles = [{
                    type: type,
                    src: e.target.result,
                    name: file.name
                }];
                const filename = document.createElement('p');
                filename.textContent = `קובץ נבחר: ${file.name}`;
                const contentArea = currentTab === 'manual' ? document.getElementById('manual-post') : document.getElementById('ai-post');
                contentArea.appendChild(filename);
                updateMediaPreview();
            }
            reader.readAsDataURL(file);
        }
    };
    input.click();
}

function updateMediaPreview() {
    const mediaPreview = document.getElementById('media-preview');
    const improvedMediaPreview = document.getElementById('improved-media-preview'); 

    mediaPreview.innerHTML = '';
    improvedMediaPreview.innerHTML = ''; 

    if (mediaFiles.length > 0) {
        const currentMedia = mediaFiles[currentMediaIndex];
        const mediaElement = currentMedia.type === 'image' ? document.createElement('img') : document.createElement('video');
        
        mediaElement.src = currentMedia.src;
        mediaElement.alt = "תמונה שנבחרה";
        if (currentMedia.type === 'video') {
            mediaElement.controls = true;
        }

        mediaElement.style.maxWidth = '100%'; 
        mediaElement.style.maxHeight = '300px'; 

        mediaPreview.appendChild(mediaElement);
        improvedMediaPreview.appendChild(mediaElement.cloneNode(true)); 
    }
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

function tagPeople() {
    alert('פונקציונליות תיוג אנשים תיושם בעתיד');
}

document.addEventListener('DOMContentLoaded', function() {
    const showRecommendationsBtn = document.getElementById('show-recommendations');
    
    showRecommendationsBtn.addEventListener('mouseenter', function(event) {
        if (showRecommendationsBtn.classList.contains('disabled')) {
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip-bubble');
            tooltip.textContent = 'יש לפרסם את הציוץ לקבלת המלצות';
            tooltip.style.position = 'absolute';
            tooltip.style.bottom = '120%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translateX(-50%)';
            tooltip.style.visibility = 'visible';
            tooltip.style.opacity = '1';
            showRecommendationsBtn.appendChild(tooltip);
        }
    });

    showRecommendationsBtn.addEventListener('mouseleave', function() {
        const tooltip = showRecommendationsBtn.querySelector('.tooltip-bubble');
        if (tooltip) {
            tooltip.remove();
        }
    });
});
// קוד לתפריט הנפתח
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
            const platform = this.getAttribute('data-platform');
            const options = platformOptions[platform];
            const rect = this.getBoundingClientRect();
            const tooltipWidth = rect.width;

            tooltipContainer.innerHTML = `
                <div class="tooltip" style="top: ${rect.bottom + window.scrollY}px; left: ${rect.left + window.scrollX}px; width: ${tooltipWidth}px;">
                    <ul>
                        ${options.map(option => `<li onclick="selectOption('https://benhagag.github.io/INVISION/${option.url}')">${option.value}</li>`).join('')}
                    </ul>
                </div>
            `;
            const tooltip = tooltipContainer.querySelector('.tooltip');
            tooltip.style.display = 'block';

            const closeTooltip = () => {
                tooltip.style.display = 'none';
            };

            tooltip.addEventListener('mouseleave', closeTooltip);

            button.addEventListener('mouseleave', function() {
                setTimeout(() => {
                    if (!tooltip.matches(':hover') && !button.matches(':hover')) {
                        closeTooltip();
                    }
                }, 100);
            });
        });
    });
});

function selectOption(option) {
    window.location.href  = option;
}