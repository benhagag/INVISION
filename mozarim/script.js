function showMessage(msg) {
    document.getElementById('message').innerText = msg;
}

function search() {
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm.trim() !== '') {
        showMessage(`מחפש: ${searchTerm}`);
    } else {
        showMessage('נא להזין מילות חיפוש');
    }
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    toggleClearIcon();
    document.getElementById('searchInput').focus();
}

function toggleClearIcon() {
    const searchInput = document.getElementById('searchInput');
    const clearIcon = document.getElementById('clearIcon');
    clearIcon.style.display = searchInput.value ? 'block' : 'none';
}

function changeLanguage(lang) {
    showMessage(`שפת הממשק שונתה ל-${lang}`);
}

const productDetails = {
    'מנתח השוק החכם': {
        description: 'מנתח השוק החכם הוא כלי מתקדם המשתמש בבינה מלאכותית לניתוח מגמות שוק בזמן אמת. הוא מספק תובנות עמוקות על המתחרים, התנהגות צרכנים, והזדמנויות שוק חדשות.',
        benefits: [
            'חיסכון של עד 70% בזמן מחקר שוק',
            'זיהוי מגמות שוק לפני המתחרים',
            'התאמה מהירה לשינויים בהתנהגות הצרכנים',
            'קבלת החלטות עסקיות מבוססות נתונים'
        ],
        features: [
            'ניתוח מתחרים בזמן אמת',
            'מעקב אחר מילות מפתח ומגמות חיפוש',
            'ניתוח רגשות של לקוחות ברשתות חברתיות',
            'תחזיות שוק מבוססות AI'
        ],
        successStory: 'חברת "טק-פרו" הצליחה לזהות פער בשוק ולהשיק מוצר חדש שהגדיל את ההכנסות ב-35% תוך 6 חודשים בלבד.',
        faq: [
            'כמה זמן לוקח להתחיל לקבל תובנות משמעותיות?',
            'האם הכלי מתאים גם לעסקים קטנים?',
            'איך המערכת מבטיחה את דיוק הנתונים?'
        ]
    },
    'מנהל הקמפיינים האוטומטי': {
        description: 'מנהל הקמפיינים האוטומטי מאפשר לך לנהל ולאופטמז קמפיינים שיווקיים בכל הפלטפורמות הדיגיטליות באופן אוטומטי, 24/7.',
        benefits: [
            'חיסכון של עד 80% בזמן ניהול קמפיינים',
            'שיפור ה-ROI של קמפיינים ב-50% בממוצע',
            'הגעה מדויקת יותר לקהל היעד',
            'התאמה אוטומטית של תקציבים בין פלטפורמות'
        ],
        features: [
            'אופטימיזציה אוטומטית של מודעות',
            'ניהול קמפיינים במספר פלטפורמות במקביל',
            'דוחות ביצועים בזמן אמת',
            'למידת מכונה לשיפור מתמיד בביצועים'
        ],
        successStory: 'רשת "פאשן-פלוס" הצליחה להגדיל את התשואה על ההשקעה בפרסום ב-70% תוך חודשיים מתחילת השימוש במערכת.',
        faq: [
            'האם ניתן לשלב את המערכת עם כלי פרסום קיימים?',
            'כיצד המערכת מחליטה על הקצאת תקציבים?',
            'האם יש אפשרות להתערבות ידנית בניהול הקמפיינים?'
        ]
    },
    'יוצר התוכן הדיגיטלי': {
        description: 'יוצר התוכן הדיגיטלי הוא כלי AI מתקדם המסוגל ליצור תוכן איכותי ומותאם אישית עבור כל פלטפורמה דיגיטלית, מפוסטים לרשתות חברתיות ועד לכתבות בלוג מעמיקות.',
        benefits: [
            'חיסכון של עד 90% בעלויות יצירת תוכן',
            'יצירת תוכן עקבי ובאיכות גבוהה',
            'התאמה מהירה לטרנדים ומגמות תוכן',
            'שיפור משמעותי בנוכחות הדיגיטלית של העסק'
        ],
        features: [
            'יצירת תוכן מותאם לכל פלטפורמה',
            'אופטימיזציה אוטומטית ל-SEO',
            'התאמת סגנון כתיבה לקהל היעד',
            'יכולות עריכה ושיפור תוכן קיים'
        ],
        successStory: 'בלוג "טק-טרנדס" הצליח להגדיל את התנועה האורגנית שלו ב-200% תוך 3 חודשים בזכות התוכן האיכותי והעקבי.',
        faq: [
            'האם התוכן שנוצר הוא ייחודי ומקורי?',
            'כיצד מבטיחים שהתוכן מתאים לקול המותג שלי?',
            'האם ניתן לערוך ולשנות את התוכן שנוצר?'
        ]
    },
    'הדשבורד האנליטי': {
        description: 'הדשבורד האנליטי מרכז את כל הנתונים החשובים לעסק שלך במקום אחד, מציג אותם בצורה ברורה ונגישה, ומאפשר קבלת החלטות מבוססות נתונים בקלות ובמהירות.',
        benefits: [
            'חיסכון של עד 60% בזמן ניתוח נתונים',
            'שיפור הדיוק בקבלת החלטות עסקיות',
            'זיהוי מהיר של מגמות ובעיות',
            'שיתוף מידע יעיל יותר בין מחלקות'
        ],
        features: [
            'אינטגרציה עם מגוון מקורות מידע',
            'דוחות מותאמים אישית',
            'התראות בזמן אמת על חריגות',
            'תחזיות עתידיות מבוססות AI'
        ],
        successStory: 'חברת "דאטה-פרו" הצליחה לזהות הזדמנות שוק חדשה שהובילה לפיתוח מוצר חדש ולגידול של 40% בהכנסות השנתיות.',
        faq: [
            'כמה זמן לוקח להטמיע את המערכת בעסק?',
            'האם ניתן להתאים את הדשבורד לצרכים ספציפיים של העסק?',
            'איך מבטיחים את אבטחת המידע בדשבורד?'
        ]
    },
    'מערכת ניהול הלקוחות': {
        description: 'מערכת ניהול הלקוחות שלנו מאפשרת לך לנהל את כל האינטראקציות עם הלקוחות במקום אחד, לאוטמט תקשורת שגרתית, ולשפר את שביעות הרצון והנאמנות של הלקוחות.',
        benefits: [
            'שיפור של עד 40% בשימור לקוחות',
            'הגדלת ערך הלקוח לאורך זמן',
            'ייעול תהליכי מכירה ושירות',
            'יצירת חוויית לקוח אישית ועקבית'
        ],
        features: [
            'ניהול אוטומטי של פניות לקוחות',
            'סגמנטציה מתקדמת של לקוחות',
            'מעקב אחר היסטוריית לקוח מלאה',
            'אוטומציה של תקשורת שיווקית'
        ],
        successStory: 'חברת "קאסטומר-קר" הצליחה להעלות את שיעור שימור הלקוחות ב-35% ואת שביעות הרצון של הלקוחות ב-50% תוך שנה.',
        faq: [
            'האם המערכת מתממשקת עם מערכות CRM קיימות?',
            'כיצד המערכת מסייעת בזיהוי לקוחות בסיכון נטישה?',
            'האם יש אפשרות לניהול מועדון לקוחות דרך המערכת?'
        ]
    },
    'כלי האופטימיזציה לחוויית המשתמש': {
        description: 'כלי האופטימיזציה לחוויית המשתמש מאפשר לך לשפר את האתר או האפליקציה שלך באופן מתמיד, להגדיל את שיעורי ההמרה, ולספק חוויה מותאמת אישית לכל משתמש.',
        benefits: [
            'הגדלת שיעורי ההמרה בממוצע ב-30%',
            'שיפור זמן השהייה באתר',
            'הקטנת שיעורי נטישה',
            'יצירת חוויית משתמש מותאמת אישית'
        ],
        features: [
            'ניתוח התנהגות משתמשים בזמן אמת',
            'A/B Testing אוטומטי',
            'מפות חום וניתוח מסלולי גלישה',
            'פרסונליזציה דינמית של תוכן'
        ],
        successStory: 'חברת "יוזר-פרו" הצליחה להגדיל את שיעור ההמרות באתר שלה ב-45% תוך 3 חודשים מתחילת השימוש בכלי.',
        faq: [
            'כמה זמן לוקח לראות תוצאות משמעותיות?',
            'האם הכלי מתאים גם לאפליקציות מובייל?',
            'איך מבטיחים שהשינויים לא פוגעים בחוויית המשתמש הקיימת?'
        ]
    }
};

function showProductDetails(productName) {
    const modal = document.getElementById('productModal');
    const details = productDetails[productName];

    document.getElementById('modalTitle').textContent = productName;
    document.getElementById('modalDescription').textContent = details.description;

    const benefitsList = document.getElementById('modalBenefits');
    benefitsList.innerHTML = '';
    details.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });

    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = '';
    details.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    document.getElementById('modalSuccessStory').textContent = details.successStory;

    const faqList = document.getElementById('modalFAQ');
    faqList.innerHTML = '';
    details.faq.forEach(question => {
        const li = document.createElement('li');
        li.textContent = question;
        faqList.appendChild(li);
    });

    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('productModal').style.display = 'none';
}

function startFreeTrial() {
    showMessage('התחלת ניסיון חינם של 30 יום');
    closeModal();
}

// Get the modal
var modal = document.getElementById('productModal');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
span.onclick = closeModal;

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        closeModal();
    }
}

// Initialize clear icon state
toggleClearIcon();