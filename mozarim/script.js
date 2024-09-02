const solutions = [
    {
        title: "פתרון שיווק אי-קומרס מתקדם",
        description: "הגדל מכירות ושפר את חווית הלקוח באתר האי-קומרס שלך",
        icon: "🛒",
        industry: "ecommerce",
        benefits: [
            "אופטימיזציה של המרות",
            "ניהול מלאי חכם",
            "פרסונליזציה מתקדמת"
        ],
        caseStudy: "חנות האופנה המקוונת 'סטייל-פלוס' הגדילה את המכירות ב-40% תוך 3 חודשים מיישום הפתרון."
    },
    {
        title: "פלטפורמת שיווק B2B לחברות טכנולוגיה",
        description: "צור וטפח לידים איכותיים בתעשיית ההייטק",
        icon: "💻",
        industry: "tech",
        benefits: [
            "זיהוי לקוחות פוטנציאליים",
            "אוטומציה של תהליכי מכירות",
            "ניתוח ביצועים מתקדם"
        ],
        caseStudy: "חברת התוכנה 'טק-סולושנס' קיצרה את מחזור המכירות שלה ב-30% והגדילה את ההכנסות ב-25%."
    },
    {
        title: "מערכת שיווק פיננסי רגולטורית",
        description: "שווק שירותים פיננסיים תוך עמידה בכל הדרישות הרגולטוריות",
        icon: "💰",
        industry: "finance",
        benefits: [
            "ציות לרגולציה מובנה",
            "ניהול קמפיינים ממוקדים",
            "דיוור אלקטרוני מאובטח"
        ],
        caseStudy: "בנק 'פיננס-פרו' הגדיל את בסיס הלקוחות שלו ב-15% תוך שנה, תוך שמירה על 100% ציות לרגולציה."
    },
    {
        title: "פלטפורמת שיווק לשירותי בריאות",
        description: "הגדל את הנראות של שירותי הבריאות שלך ושפר את התקשורת עם המטופלים",
        icon: "🏥",
        industry: "health",
        benefits: [
            "ניהול מוניטין אונליין",
            "תזכורות אוטומטיות למטופלים",
            "קמפיינים ממוקדי בריאות"
        ],
        caseStudy: "רשת המרפאות 'הלת'-קר' הגדילה את מספר הפניות החדשות ב-50% ושיפרה את שביעות רצון המטופלים ב-30%."
    },
    {
        title: "פלטפורמת שיווק חכמה לחינוך דיגיטלי",
        description: "הגדל את מספר הנרשמים לקורסים ושפר את המעורבות של הלומדים",
        icon: "📚",
        industry: "education",
        benefits: [
            "ניהול קמפיינים ממוקדים לקורסים ספציפיים",
            "מערכת המלצות אישיות ללומדים פוטנציאליים",
            "ניתוח התנהגות לומדים לשיפור תוכן ושיווק"
        ],
        caseStudy: "פלטפורמת הלמידה המקוונת 'אדיו-פרו' הגדילה את מספר הנרשמים לקורסים ב-60% ושיפרה את שיעורי השלמת הקורסים ב-35% תוך חצי שנה מיישום הפתרון."
    },
    {
        title: "מערכת שיווק חווייתית לתיירות ואירוח",
        description: "משוך יותר מבקרים ושפר את חווית האירוח מתחילתה ועד סופה",
        icon: "🏖️",
        industry: "tourism",
        benefits: [
            "ניהול מוניטין ודירוגים אונליין",
            "פרסונליזציה של הצעות וחבילות נופש",
            "אוטומציה של תקשורת לפני, במהלך ואחרי השהייה"
        ],
        caseStudy: "רשת המלונות 'סאנשיין הוטלס' הגדילה את שיעור ההזמנות הישירות ב-40% והעלתה את ציוני שביעות הרצון של האורחים ב-25% תוך שנה מהטמעת המערכת."
    }
];

function showSolutions() {
    const grid = document.getElementById('solutionsGrid');
    grid.innerHTML = '';
    solutions.forEach(solution => {
        const card = document.createElement('div');
        card.className = 'solution-card';
        card.innerHTML = `
            <div class="solution-icon">${solution.icon}</div>
            <h2 class="solution-title">${solution.title}</h2>
            <p>${solution.description}</p>
            <button class="cta-button" onclick="showSolutionDetails('${solution.title}')">למידע נוסף</button>
        `;
        grid.appendChild(card);
    });
}

function filterSolutions(industry) {
    const buttons = document.querySelectorAll('#industryFilter button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');

    const grid = document.getElementById('solutionsGrid');
    grid.innerHTML = '';
    solutions.forEach(solution => {
        if (industry === 'all' || solution.industry === industry) {
            const card = document.createElement('div');
            card.className = 'solution-card';
            card.innerHTML = `
                <div class="solution-icon">${solution.icon}</div>
                <h2 class="solution-title">${solution.title}</h2>
                <p>${solution.description}</p>
                <button class="cta-button" onclick="showSolutionDetails('${solution.title}')">למידע נוסף</button>
            `;
            grid.appendChild(card);
        }
    });
}

function showSolutionDetails(title) {
    const solution = solutions.find(s => s.title === title);
    const modal = document.getElementById('solutionModal');
    document.getElementById('modalTitle').textContent = solution.title;
    document.getElementById('modalDescription').textContent = solution.description;
    const benefitsList = document.getElementById('modalBenefits');
    benefitsList.innerHTML = '';
    solution.benefits.forEach(benefit => {
        const li = document.createElement('li');
        li.textContent = benefit;
        benefitsList.appendChild(li);
    });
    document.getElementById('modalCaseStudy').textContent = solution.caseStudy;
    modal.style.display = 'block';
}

function requestDemo() {
    alert('תודה על התעניינותך! נציג שלנו יצור איתך קשר בקרוב להדגמה אישית.');
    closeSolutionModal();
}

function closeSolutionModal() {
    document.getElementById('solutionModal').style.display = 'none';
}

// Event Listeners
window.onload = showSolutions;

const closeBtn = document.getElementsByClassName('close')[0];
closeBtn.onclick = closeSolutionModal;

window.onclick = function(event) {
    const modal = document.getElementById('solutionModal');
    if (event.target == modal) {
        closeSolutionModal();
    }
}

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

// Initialize clear icon state
toggleClearIcon();
