function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.content-section').forEach(section => section.classList.remove('active'));
    
    document.querySelector(`.tab:nth-child(${['create', 'manage', 'report'].indexOf(tabName) + 1})`).classList.add('active');
    document.getElementById(`${tabName}-campaign${tabName === 'report' ? 's' : ''}`).classList.add('active');
}

function toggleCampaignType(type) {
    const manualCampaign = document.getElementById('manual-campaign');
    const invisionCampaign = document.getElementById('invision-campaign');
    const buttons = document.querySelectorAll('.campaign-type-toggle .button');

    if (type === 'manual') {
        manualCampaign.style.display = 'block';
        invisionCampaign.style.display = 'none';
        buttons[0].classList.remove('secondary-button');
        buttons[1].classList.add('secondary-button');
    } else {
        manualCampaign.style.display = 'none';
        invisionCampaign.style.display = 'block';
        buttons[0].classList.add('secondary-button');
        buttons[1].classList.remove('secondary-button');
    }
}

function createCampaign(type) {
    let campaignData;
    if (type === 'manual') {
        campaignData = {
            name: document.getElementById('campaign-name').value,
            objective: document.getElementById('campaign-objective').value,
            targetAudience: document.getElementById('target-audience').value,
            budget: document.getElementById('campaign-budget').value,
            duration: document.getElementById('campaign-duration').value,
            adFormat: document.getElementById('ad-format').value,
            adText: document.getElementById('ad-text').value,
            callToAction: document.getElementById('call-to-action').value
        };
    } else {
        campaignData = {
            name: document.getElementById('invision-campaign-name').value,
            objective: document.getElementById('invision-campaign-objective').value,
            targetAudience: document.getElementById('invision-target-audience').value,
            budget: document.getElementById('invision-campaign-budget').value,
            duration: document.getElementById('invision-campaign-duration').value,
            adFormat: document.getElementById('invision-ad-format').value,
            adText: document.getElementById('invision-ad-text').value,
            callToAction: document.getElementById('invision-call-to-action').value
        };
    }

    showStatus(`הקמפיין "${campaignData.name}" נוצר בהצלחה!`);
    loadCampaigns(); // טעינה מחדש של רשימת הקמפיינים
}

function generateInVisionCampaign() {
    const prompt = document.getElementById('invision-prompt').value;
    document.getElementById('invision-recommendation').style.display = 'block';
    showStatus('המלצת קמפיין נוצרה בהצלחה!');
}

function editInVisionCampaign() {
    const inputs = document.querySelectorAll('#invision-recommendation input, #invision-recommendation textarea, #invision-recommendation select');
    inputs.forEach(input => input.disabled = false);
    showStatus('ניתן לערוך את המלצת הקמפיין');
}

function showStatus(message, type = 'success') {
    const statusElement = document.getElementById('status-message');
    statusElement.textContent = message;
    statusElement.style.display = 'block';
    statusElement.style.backgroundColor = type === 'success' ? 'rgba(0, 190, 198, 0.1)' : 'rgba(255, 0, 0, 0.1)';
    statusElement.style.color = type === 'success' ? '#00bec6' : '#ff0000';
    setTimeout(() => {
        statusElement.style.display = 'none';
    }, 5000);
}

function generateReport() {
    const campaignId = document.getElementById('report-campaign').value;
    const startDate = document.getElementById('report-start-date').value;
    const endDate = document.getElementById('report-end-date').value;

    const demoData = {
        impressions: 50000,
        clicks: 1500,
        spend: 500,
        conversions: 75
    };
    displayReportResults(demoData);
}

function displayReportResults(data) {
    const resultsContainer = document.getElementById('report-results');
    resultsContainer.innerHTML = `
        <h3>תוצאות הקמפיין</h3>
        <div class="stats">
            <div class="stat">
                <div class="stat-value">${data.impressions.toLocaleString()}</div>
                <div>חשיפות</div>
            </div>
            <div class="stat">
                <div class="stat-value">${data.clicks.toLocaleString()}</div>
                <div>קליקים</div>
            </div>
            <div class="stat">
                <div class="stat-value">${data.spend.toLocaleString()} ₪</div>
                <div>הוצאה</div>
            </div>
            <div class="stat">
                <div class="stat-value">${((data.clicks / data.impressions) * 100).toFixed(2)}%</div>
                <div>שיעור קליקים (CTR)</div>
            </div>
            <div class="stat">
                <div class="stat-value">${data.conversions}</div>
                <div>המרות</div>
            </div>
            <div class="stat">
                <div class="stat-value">${(data.spend / data.conversions).toFixed(2)} ₪</div>
                <div>עלות להמרה</div>
            </div>
        </div>
    `;
}

function loadCampaigns() {
    const demoCampaigns = [
        { id: '1', name: 'קמפיין קיץ 2023', status: 'ACTIVE', objective: 'CONVERSIONS', budget_remaining: 15000 },
        { id: '2', name: 'השקת מוצר חדש', status: 'PAUSED', objective: 'AWARENESS', budget_remaining: 5000 },
        { id: '3', name: 'מבצע סוף שנה', status: 'ACTIVE', objective: 'TRAFFIC', budget_remaining: 8000 }
    ];
    displayCampaigns(demoCampaigns);
}

function displayCampaigns(campaigns) {
    const campaignsList = document.getElementById('campaigns-list');
    const reportCampaignSelect = document.getElementById('report-campaign');
    
    campaignsList.innerHTML = '';
    reportCampaignSelect.innerHTML = '';

    campaigns.forEach(campaign => {
        campaignsList.innerHTML += `
            <div class="campaign-item">
                <h3>${campaign.name}</h3>
                <p>סטטוס: ${campaign.status === 'ACTIVE' ? 'פעיל' : 'מושהה'}</p>
                <p>מטרה: ${translateObjective(campaign.objective)}</p>
                <p>תקציב נותר: ${(campaign.budget_remaining / 100).toLocaleString()} ₪</p>
                <button class="button" onclick="editCampaign('${campaign.id}')">ערוך</button>
                <button class="button secondary-button" onclick="toggleCampaignStatus('${campaign.id}', '${campaign.status}')">
                    ${campaign.status === 'ACTIVE' ? 'השהה' : 'הפעל'}
                </button>
            </div>
        `;

        reportCampaignSelect.innerHTML += `
            <option value="${campaign.id}">${campaign.name}</option>
        `;
    });
}

function translateObjective(objective) {
    const objectives = {
        'CONVERSIONS': 'המרות',
        'AWARENESS': 'מודעות',
        'TRAFFIC': 'תנועה',
        'APP_INSTALLS': 'התקנות אפליקציה',
        'ENGAGEMENT': 'מעורבות',
        'VIDEO_VIEWS': 'צפיות בוידאו',
        'LEAD_GENERATION': 'יצירת לידים'
    };
    return objectives[objective] || objective;
}

function editCampaign(campaignId) {
    showStatus(`עריכת קמפיין מספר ${campaignId}`);
}

function toggleCampaignStatus(campaignId, currentStatus) {
    const newStatus = currentStatus === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    showStatus(`הקמפיין ${newStatus === 'ACTIVE' ? 'הופעל' : 'הושהה'} בהצלחה`);
    loadCampaigns(); // טעינה מחדש של רשימת הקמפיינים
}

// טעינת הקמפיינים בעת טעינת הדף
window.onload = loadCampaigns;

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
}