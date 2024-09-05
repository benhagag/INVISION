document.getElementById('leadFormCreator').addEventListener('input', updatePreview);
document.getElementById('leadFormCreator').addEventListener('submit', function(e) {
    e.preventDefault();
    if (document.getElementById('previewLeadForm').children.length > 7) {
        alert("אזהרה: מספר השדות בטופס חורג מהמומלץ על ידי פייסבוק. שקול להפחית את מספר השדות.");
    }
    alert("הטופס נוצר בהצלחה! תוכל למצוא אותו במערכת INVISION שלך.");
});

function updatePreview() {
    document.getElementById('previewTitle').textContent = document.getElementById('campaignTitle').value || 'קבל הצעה מיוחדת לשירותי הפרסום שלנו!';

    const descriptionList = document.getElementById('previewDescription');
    descriptionList.innerHTML = '';
    const descriptionItems = document.getElementById('campaignDescription').value.split('\n');
    descriptionItems.forEach(item => {
        if (item.trim()) {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check-circle"></i> ${item.trim()}`;
            descriptionList.appendChild(li);
        }
    });

    const previewForm = document.getElementById('previewLeadForm');
    previewForm.innerHTML = '';
    const formFields = document.getElementById('formFields').value.split(',');
    formFields.forEach(field => {
        if (field.trim()) {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = field.trim();
            previewForm.appendChild(input);
        }
    });

    document.getElementById('previewSubmitButton').textContent = document.getElementById('callToAction').value || 'הירשם עכשיו';
    document.getElementById('previewOffer').textContent = document.getElementById('offerDescription').value || '';
    
    document.getElementById('privacyPolicyLink').href = document.getElementById('privacyPolicy').value;
}

updatePreview();

document.getElementById('previewSubmitButton').addEventListener('click', function() {
    const thankYouMessage = document.getElementById('thankYouMessage').value || 'תודה שנרשמת! ניצור איתך קשר בקרוב.';
    alert(thankYouMessage);
});

function showAIDescription() {
    document.getElementById('aiDescription').style.display = 'block';
}

function generateAIForm() {
    const aiPrompt = document.getElementById('aiPrompt').value;
    // כאן תהיה הלוגיקה של ה-AI ליצירת טופס מותאם
    // לצורך הדוגמה, נשתמש בערכים קבועים
    document.getElementById('businessName').value = 'חברת הנסיעות שלך';
    document.getElementById('campaignTitle').value = 'גלה את החופשה המושלמת עבורך!';
    document.getElementById('campaignDescription').value = 'חבילות נופש מותאמות אישית\nמחירים אטרקטיביים\nיעדים מרהיבים בכל העולם';
    document.getElementById('formFields').value = 'שם מלא, אימייל, טלפון, יעד מועדף, תאריך יציאה';
    document.getElementById('callToAction').value = 'קבל הצעה לחופשה';
    document.getElementById('thankYouMessage').value = 'תודה שפנית אלינו! נציג שלנו יצור איתך קשר בהקדם עם הצעה מותאמת אישית.';
    document.getElementById('offerDescription').value = '15% הנחה על הזמנת החופשה הראשונה שלך';
    document.getElementById('targetAudience').value = 'גילאי 25-55, אוהבי טיולים וחופשות';
    document.getElementById('budget').value = '100';
    document.getElementById('duration').value = '30';
    document.getElementById('privacyPolicy').value = 'https://example.com/privacy-policy';
    updatePreview();
}

function toggleAdvancedEdit() {
    const advancedOptions = document.getElementById('advancedEditOptions');
    advancedOptions.style.display = advancedOptions.style.display === 'none' ? 'block' : 'none';
}

function updatePreviewStyle(property, value) {
    document.querySelector('.preview-form').style[property] = value;
}

function updateBackgroundImage(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.querySelector('.preview-form').style.backgroundImage = `url(${e.target.result})`;
            document.querySelector('.preview-form').style.backgroundSize = 'cover';
            document.querySelector('.preview-form').style.backgroundPosition = 'center';
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function updateIconStyle(style) {
    const icons = document.querySelectorAll('.preview-form i');
    icons.forEach(icon => {
        icon.className = icon.className.replace(/\bfas\b|\bfar\b/g, style);
    });
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