function showAdInfo() {
    const adType = document.getElementById('adType').value;
    const adTypeInfo = document.getElementById('adTypeInfo');
    
    if (adType) {
        let content = '';
        switch(adType) {
            case 'text':
                content = `
                    <h3>מודעת טקסט</h3>
                    <p>מודעת טקסט היא הסוג הבסיסי והנפוץ ביותר של מודעות בגוגל. היא מורכבת מכותרת, תיאור וכתובת URL.</p>
                    <h4>יתרונות:</h4>
                    <ul>
                        <li>פשוטה ומהירה ליצירה</li>
                        <li>מתאימה לכל מכשיר</li>
                        <li>יעילה לקידום שירותים או מוצרים שאינם ויזואליים</li>
                        <li>עלות נמוכה יחסית</li>
                        <li>מתאימה במיוחד לחיפושים ממוקדים</li>
                    </ul>
                `;
                break;
            case 'image':
                content = `
                    <h3>מודעת תמונה</h3>
                    <p>מודעת תמונה משלבת טקסט עם תמונה, מה שמאפשר להציג את המוצר או השירות בצורה ויזואלית.</p>
                    <h4>יתרונות:</h4>
                    <ul>
                        <li>מושכת את העין</li>
                        <li>מתאימה למוצרים ושירותים ויזואליים</li>
                        <li>מאפשרת להציג את המוצר או השירות בצורה ברורה</li>
                        <li>יעילה במיוחד ברשת התצוגה של גוגל</li>
                        <li>מגדילה את הסיכוי ליצירת רושם ראשוני חזק</li>
                    </ul>
                `;
                break;
            case 'video':
                content = `
                    <h3>מודעת וידאו</h3>
                    <p>מודעת וידאו מאפשרת להציג סרטון קצר שמקדם את המוצר או השירות שלך.</p>
                    <h4>יתרונות:</h4>
                    <ul>
                        <li>מעבירה מסר מורכב בקלות</li>
                        <li>מגדילה מעורבות משתמשים</li>
                        <li>אפקטיבית במיוחד לסיפור מותג או הדגמת מוצר</li>
                        <li>יכולה ליצור חיבור רגשי עם הצופים</li>
                        <li>מתאימה במיוחד לפלטפורמות כמו YouTube</li>
                    </ul>
                `;
                break;
            case 'responsive':
                content = `
                    <h3>מודעה רספונסיבית</h3>
                    <p>מודעה רספונסיבית מתאימה את עצמה אוטומטית לגודל ולפורמט הזמין, תוך שימוש בנכסים שונים שסיפקת.</p>
                    <h4>יתרונות:</h4>
                    <ul>
                        <li>מתאימה עצמה לכל גודל מסך</li>
                        <li>משפרת ביצועים ע"י בחירת השילוב הטוב ביותר</li>
                        <li>חוסכת זמן ביצירת גרסאות שונות למודעה</li>
                        <li>מאפשרת לגוגל לאופטימיזציה את המודעה לכל הקשר</li>
                        <li>מגדילה את הסיכוי להגיע לקהל רחב יותר</li>
                    </ul>
                `;
                break;
        }
        adTypeInfo.innerHTML = content;
        adTypeInfo.style.display = 'block';
    } else {
        adTypeInfo.style.display = 'none';
    }
    updateAdTypeFields();
}

function showManualForm() {
    document.getElementById('adForm').style.display = 'block';
    document.getElementById('invisionPrompt').style.display = 'none';
    document.getElementById('adFormTitle').textContent = `יצירת ${document.getElementById('adType').options[document.getElementById('adType').selectedIndex].text}`;
    updateAdTypeFields();
}

function showInvisionPrompt() {
    document.getElementById('adForm').style.display = 'none';
    document.getElementById('invisionPrompt').style.display = 'block';
}

function updateAdTypeFields() {
    const adType = document.getElementById('adType').value;
    const adTypeFields = document.getElementById('adTypeFields');
    let fields = '';
    
    switch(adType) {
        case 'text':
            fields = `
                <div class="form-group">
                    <label for="headline">כותרת ראשית:</label>
                    <input type="text" id="headline" required placeholder="עד 30 תווים, לדוגמה: מבצע קיץ חם!">
                </div>
                <div class="form-group">
                    <label for="subheadline">כותרת משנית:</label>
                    <input type="text" id="subheadline" placeholder="עד 30 תווים, לדוגמה: הנחות של עד 50%">
                </div>
                <div class="form-group">
                    <label for="description">תיאור:</label>
                    <textarea id="description" rows="3" required placeholder="עד 90 תווים, לדוגמה: הנחות ענק על כל מוצרי הקיץ. הזמינו עכשיו ותהנו ממשלוח חינם!"></textarea>
                </div>
            `;
            break;
        case 'image':
            fields = `
                <div class="form-group">
                    <label for="image">תמונה:</label>
                    <input type="file" id="image" accept="image/*" required>
                    <small>גודל מומלץ: 1200x628 פיקסלים</small>
                </div>
                <div class="form-group">
                    <label for="imageHeadline">כותרת ראשית:</label>
                    <input type="text" id="imageHeadline" required placeholder="עד 25 תווים, לדוגמה: קולקציית קיץ חדשה">
                </div>
                <div class="form-group">
                    <label for="imageSubheadline">כותרת משנית:</label>
                    <input type="text" id="imageSubheadline" placeholder="עד 25 תווים, לדוגמה: הנחות מיוחדות לזמן מוגבל">
                </div>
                <div class="form-group">
                    <label for="imageDescription">תיאור:</label>
                    <textarea id="imageDescription" rows="2" required placeholder="עד 90 תווים, לדוגמה: גלו את הקולקציה החדשה שלנו במחירים מיוחדים. הזמינו עכשיו!"></textarea>
                </div>
            `;
            break;
        case 'video':
            fields = `
                <div class="form-group">
                    <label for="video">וידאו:</label>
                    <input type="file" id="video" accept="video/*" required>
                    <small>אורך מומלץ: 6-15 שניות</small>
                </div>
                <div class="form-group">
                    <label for="videoHeadline">כותרת ראשית:</label>
                    <input type="text" id="videoHeadline" required placeholder="עד 15 תווים, לדוגמה: קיץ בסטייל">
                </div>
                <div class="form-group">
                    <label for="videoSubheadline">כותרת משנית:</label>
                    <input type="text" id="videoSubheadline" placeholder="עד 15 תווים, לדוגמה: צפו עכשיו במבצעים">
                </div>
                <div class="form-group">
                    <label for="videoDescription">תיאור:</label>
                    <textarea id="videoDescription" rows="2" required placeholder="עד 90 תווים, לדוגמה: צפו בקולקציה החדשה שלנו וגלו את המבצעים המיוחדים. לחצו כאן!"></textarea>
                </div>
            `;
            break;
        case 'responsive':
            fields = `
                <div class="form-group">
                    <label for="shortHeadline">כותרת קצרה:</label>
                    <input type="text" id="shortHeadline" required placeholder="עד 30 תווים, לדוגמה: מבצע קיץ מטורף">
                </div>
                <div class="form-group">
                    <label for="longHeadline">כותרת ארוכה:</label>
                    <input type="text" id="longHeadline" required placeholder="עד 90 תווים, לדוגמה: הקולקציה החדשה שלנו הגיעה! מבצעים מיוחדים לרגל פתיחת עונת הקיץ">
                </div>
                <div class="form-group">
                    <label for="description1">תיאור 1:</label>
                    <textarea id="description1" rows="2" required placeholder="עד 90 תווים, לדוגמה: מגוון רחב של בגדי ים, אביזרי חוף ומוצרי הגנה מהשמש במחירים שלא תוכלו לעמוד בפניהם."></textarea>
                </div>
                <div class="form-group">
                    <label for="description2">תיאור 2:</label>
                    <textarea id="description2" rows="2" required placeholder="עד 90 תווים, לדוגמה: הזמינו עכשיו וקבלו משלוח חינם בקנייה מעל 200 ש"ח. מבצע לזמן מוגבל!"></textarea>
                </div>
                <div class="form-group">
                    <label for="responsiveImage">תמונה:</label>
                    <input type="file" id="responsiveImage" accept="image/*" required>
                    <small>גודל מומלץ: 1200x628 פיקסלים</small>
                </div>
            `;
            break;
    }
    adTypeFields.innerHTML = fields;
}

function generateAd() {
    const topic = document.getElementById('adTopic').value;
    // שמירה על סוג המודעה הנוכחי
    const currentAdType = document.getElementById('adType').value || 'text';
    document.getElementById('adType').value = currentAdType;
    showAdInfo();
    showManualForm();
    
    // מילוי הטופס בדוגמה מוחשית
    document.getElementById('campaignName').value = `קמפיין ${topic}`;
    document.getElementById('dailyBudget').value = '100';
    document.getElementById('adGroup').value = `קבוצת ${topic}`;
    document.getElementById('keywords').value = `${topic}, מבצע, הנחה`;
    document.getElementById('targetAudience').value = 'גילאי 25-45, מתעניינים בקניות אונליין';
    document.getElementById('geographicTarget').value = 'כל הארץ';
    document.getElementById('finalUrl').value = `https://www.example.com/${topic.replace(' ', '-')}-sale`;
    document.getElementById('ctaText').value = 'קנה עכשיו';

    // מילוי שדות ספציפיים לסוג המודעה
    switch(currentAdType) {
        case 'text':
            document.getElementById('headline').value = `מבצע ${topic} מטורף!`;
            document.getElementById('subheadline').value = `הנחות של עד 50% על ${topic}`;
            document.getElementById('description').value = `גלו את המבחר העצום שלנו של ${topic} במחירים שלא ייאמנו. הזמינו עכשיו וקבלו משלוח חינם בקנייה מעל 200 ש"ח. מבצע לזמן מוגבל!`;
            break;
        case 'image':
            document.getElementById('imageHeadline').value = `קולקציית ${topic} חדשה`;
            document.getElementById('imageSubheadline').value = `הנחות מיוחדות לזמן מוגבל`;
            document.getElementById('imageDescription').value = `גלו את הקולקציה החדשה של ${topic} במחירים מיוחדים. הזמינו עכשיו!`;
            break;
        case 'video':
            document.getElementById('videoHeadline').value = `${topic} בסטייל`;
            document.getElementById('videoSubheadline').value = `צפו עכשיו במבצעים`;
            document.getElementById('videoDescription').value = `צפו בקולקציית ה${topic} החדשה שלנו וגלו את המבצעים המיוחדים. לחצו כאן!`;
            break;
        case 'responsive':
            document.getElementById('shortHeadline').value = `מבצע ${topic} מטורף!`;
            document.getElementById('longHeadline').value = `הקולקציה החדשה של ${topic} הגיעה! מבצעים מיוחדים לזמן מוגבל`;
            document.getElementById('description1').value = `גלו את המבחר העצום שלנו של ${topic} במחירים שלא ייאמנו. מגוון רחב של מוצרים איכותיים לכל טעם וצורך.`;
            document.getElementById('description2').value = `הזמינו עכשיו וקבלו משלוח חינם בקנייה מעל 200 ש"ח. בנוסף, הנחה של 10% על הקנייה הראשונה. מבצע ל-48 שעות בלבד!`;
            break;
    }
    
    showAdPreview();
}

function showAdPreview() {
    const adType = document.getElementById('adType').value;
    const previewContent = document.getElementById('adPreviewContent');
    const ctaText = document.getElementById('ctaText').value || 'קנה עכשיו';
    let previewHtml = '';

    switch(adType) {
        case 'text':
            const headline = document.getElementById('headline').value || 'כותרת המודעה';
            const subheadline = document.getElementById('subheadline').value || 'כותרת משנה';
            const description = document.getElementById('description').value || 'תיאור המודעה יופיע כאן. זהו המקום לתאר את המוצר או השירות שלך.';
            const url = document.getElementById('finalUrl').value || 'www.example.com';
            previewHtml = `
                <div class="ad-preview-text">
                    <h3>${headline} - ${subheadline}</h3>
                    <div class="ad-url">${url}</div>
                    <p>${description}</p>
                    <a href="#" class="cta-button">${ctaText}</a>
                </div>
            `;
            break;
        case 'image':
            const imageHeadline = document.getElementById('imageHeadline').value || 'כותרת מודעת התמונה';
            const imageSubheadline = document.getElementById('imageSubheadline').value || 'כותרת משנה למודעת התמונה';
            const imageDescription = document.getElementById('imageDescription').value || 'תיאור מודעת התמונה';
            previewHtml = `
                <div class="ad-preview-image">
                    <img src="https://via.placeholder.com/600x314" alt="תמונת מודעה">
                    <h3>${imageHeadline}</h3>
                    <h4>${imageSubheadline}</h4>
                    <p>${imageDescription}</p>
                    <a href="#" class="cta-button">${ctaText}</a>
                </div>
            `;
            break;
        case 'video':
            const videoHeadline = document.getElementById('videoHeadline').value || 'כותרת מודעת הווידאו';
            const videoSubheadline = document.getElementById('videoSubheadline').value || 'כותרת משנה למודעת הווידאו';
            const videoDescription = document.getElementById('videoDescription').value || 'תיאור מודעת הווידאו';
            previewHtml = `
                <div class="ad-preview-video">
                    <video width="600" height="338" controls>
                        <source src="movie.mp4" type="video/mp4">
                        הדפדפן שלך אינו תומך בתג וידאו.
                    </video>
                    <h3>${videoHeadline}</h3>
                    <h4>${videoSubheadline}</h4>
                    <p>${videoDescription}</p>
                    <a href="#" class="cta-button">${ctaText}</a>
                </div>
            `;
            break;
        case 'responsive':
            const shortHeadline = document.getElementById('shortHeadline').value || 'כותרת קצרה';
            const longHeadline = document.getElementById('longHeadline').value || 'כותרת ארוכה יותר למודעה הרספונסיבית';
            const description1 = document.getElementById('description1').value || 'תיאור ראשון של המודעה';
            const description2 = document.getElementById('description2').value || 'תיאור שני של המודעה';
            previewHtml = `
                <div class="ad-preview-responsive">
                    <h3>${shortHeadline}</h3>
                    <h4>${longHeadline}</h4>
                    <p>${description1}</p>
                    <p>${description2}</p>
                    <img src="https://via.placeholder.com/600x314" alt="תמונת מודעה רספונסיבית">
                    <a href="#" class="cta-button">${ctaText}</a>
                </div>
            `;
            break;
        default:
            previewHtml = '<p>בחר סוג מודעה כדי לראות תצוגה מקדימה.</p>';
    }

    previewContent.innerHTML = previewHtml;
    document.getElementById('adPreview').style.display = 'block';
}

function closeAdPreview() {
    document.getElementById('adPreview').style.display = 'none';
}

document.getElementById('adForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // כאן תהיה הלוגיקה לשליחת המודעה ל-API של גוגל
    alert('המודעה נשלחה בהצלחה! (הדגמה בלבד)');
});

// עדכון התצוגה המקדימה בכל שינוי בטופס
document.getElementById('adForm').addEventListener('input', function() {
    if (document.getElementById('adPreview').style.display === 'block') {
        showAdPreview();
    }
});

// טיפול בהעלאת קבצים
document.getElementById('adForm').addEventListener('change', function(e) {
    if (e.target.type === 'file') {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                if (e.target.accept.includes('image')) {
                    document.querySelector('.ad-preview-image img, .ad-preview-responsive img').src = event.target.result;
                } else if (e.target.accept.includes('video')) {
                    const video = document.querySelector('.ad-preview-video video');
                    video.src = event.target.result;
                    video.load();
                }
            };
            reader.readAsDataURL(file);
        }
    }
});

// פונקציונליות לתפריט נפתח עבור כפתורי פלטפורמה
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