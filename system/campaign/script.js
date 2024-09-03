document.addEventListener('DOMContentLoaded', function() {
    initializeChannels();
    setupEventListeners();
    updateCampaignSummary();
    console.log("הדף נטען בהצלחה.");
});

const channels = {
    'Google Ads & YouTube': {
        icon: 'fab fa-google',
        subchannels: [
            { name: 'יצירת מודעות טקסט', icon: 'fas fa-font' },
            { name: 'העלאת מודעות תמונה', icon: 'fas fa-image' },
            { name: 'העלאת מודעות וידאו', icon: 'fas fa-video' },
            { name: 'יצירת מודעות רספונסיביות', icon: 'fas fa-expand' },
            { name: 'העלאת סרטונים לYouTube', icon: 'fab fa-youtube' },
            { name: 'עדכון מטא-דאטה של סרטונים YouTube', icon: 'fas fa-tags' },
            { name: 'העלאת תמונות ממוזערות לYouTube', icon: 'fas fa-image' }
        ]
    },
    'Facebook': {
        icon: 'fab fa-facebook',
        subchannels: [
            { name: 'פוסטים רגילים', icon: 'fas fa-file-alt' },
            { name: 'פוסטים עם תמונות', icon: 'fas fa-image' },
            { name: 'פוסטים עם וידאו', icon: 'fas fa-video' },
            { name: 'מודעות ממומנות', icon: 'fas fa-ad' },
            { name: 'סטוריז', icon: 'fas fa-book-open' },
            { name: 'אירועים', icon: 'fas fa-calendar-alt' },
            { name: 'טפסי לידים', icon: 'fas fa-clipboard-list' },
            { name: 'חנות מקוונת', icon: 'fas fa-shopping-cart' },
            { name: 'בוט צ\'אט', icon: 'fas fa-robot' },
            { name: 'שידורים חיים', icon: 'fas fa-broadcast-tower' }
        ]
    },
    'Instagram': {
        icon: 'fab fa-instagram',
        subchannels: [
            { name: 'העלאת תמונות לפיד', icon: 'fas fa-image' },
            { name: 'העלאת סרטונים לפיד', icon: 'fas fa-video' },
            { name: 'העלאת תמונות לסטורי', icon: 'fas fa-image' },
            { name: 'העלאת סרטונים לסטורי', icon: 'fas fa-video' },
            { name: 'פרסום קרוסלים', icon: 'fas fa-images' },
            { name: 'העלאת IGTV', icon: 'fas fa-tv' }
        ]
    },
    'Twitter': {
        icon: 'fab fa-twitter',
        subchannels: [
            { name: 'פרסום ציוצים טקסטואליים', icon: 'fas fa-comment' },
            { name: 'העלאת תמונות', icon: 'fas fa-image' },
            { name: 'העלאת סרטונים', icon: 'fas fa-video' },
            { name: 'יצירת סקרים', icon: 'fas fa-poll' }
        ]
    },
    'TikTok': {
        icon: 'fab fa-tiktok',
        subchannels: [
            { name: 'העלאת סרטונים', icon: 'fas fa-video' },
            { name: 'עדכון מטא-דאטה של סרטונים', icon: 'fas fa-tags' }
        ]
    },
    'דף נחיתה': {
        icon: 'fas fa-pager',
        subchannels: [
            { name: 'ראשי', icon: 'fas fa-home' },
            { name: 'משני לקמפיינים', icon: 'fas fa-th-large' }
        ]
    }
};

function initializeChannels() {
    const channelsContainer = document.getElementById('channelSelection');
    let totalBudget = parseInt(document.getElementById('totalBudget').value);

    for (let [channel, channelData] of Object.entries(channels)) {
        const channelElement = document.createElement('div');
        channelElement.className = 'channel';
        channelElement.innerHTML = `
            <div class="channel-header">
                <span><i class="channel-icon ${channelData.icon}"></i>${channel}</span>
                <div class="channel-budget">
                    <input type="range" min="0" max="${totalBudget}" value="0" data-channel="${channel}">
                    <span class="budget-display">₪0</span>
                    <span class="percentage-display">0%</span>
                </div>
            </div>
            <div class="subchannels hidden">
                ${channelData.subchannels.map(subchannel => `
                    <div class="subchannel">
                        <span><i class="subchannel-icon ${subchannel.icon}"></i>${subchannel.name}</span>
                        <input type="range" min="0" max="${totalBudget}" value="0" data-subchannel="${subchannel.name}">
                        <span class="budget-display">₪0</span>
                        <span class="percentage-display">0%</span>
                    </div>
                `).join('')}
            </div>
        `;
        channelsContainer.appendChild(channelElement);
    }
}

function setupEventListeners() {
    document.getElementById('totalBudget').addEventListener('input', updateTotalBudget);
    document.getElementById('editBudget').addEventListener('click', editBudget);
    document.querySelectorAll('.channel-header').forEach(header => {
        header.addEventListener('click', toggleSubchannels);
    });
    document.querySelectorAll('.channel-budget input[type="range"]').forEach(input => {
        input.addEventListener('input', updateChannelBudget);
    });
    document.querySelectorAll('.subchannel input[type="range"]').forEach(input => {
        input.addEventListener('input', updateSubchannelBudget);
    });
    document.getElementById('manualCampaign').addEventListener('click', () => switchCampaignType('manual'));
    document.getElementById('invisionCampaign').addEventListener('click', () => switchCampaignType('invision'));
    document.querySelectorAll('.option-button').forEach(button => {
        button.addEventListener('click', toggleOptionButton);
    });
    document.querySelectorAll('input[name="kpi"], input[name="message"]').forEach(checkbox => {
        checkbox.addEventListener('change', limitCheckboxSelection);
    });
    document.querySelector('.button-group').addEventListener('click', handleCampaignGoals);
    document.getElementById('campaignName').addEventListener('input', updateCampaignSummary);
    document.getElementById('location').addEventListener('input', showSuggestions);
    document.getElementById('interests').addEventListener('input', showSuggestions);
    document.getElementById('otherCheckbox').addEventListener('change', function() {
        const otherGoal = document.getElementById('otherGoal');
        if (this.checked) {
            otherGoal.classList.remove('hidden');
        } else {
            otherGoal.classList.add('hidden');
        }
    });
}

function updateTotalBudget() {
    let totalBudget = parseInt(this.value);
    document.getElementById('totalBudgetDisplay').textContent = `₪${totalBudget.toLocaleString()}`;
    updateAllChannelBudgets(totalBudget);
    updateTips();
    updateCampaignSummary();
}

function editBudget() {
    const totalBudgetInput = document.getElementById('totalBudget');
    const currentBudget = parseInt(totalBudgetInput.value);
    const newBudget = prompt('הזן את התקציב היומי החדש:', currentBudget);
    
    if (newBudget !== null && !isNaN(newBudget)) {
        totalBudgetInput.value = newBudget;
        totalBudgetInput.dispatchEvent(new Event('input'));
    }
}

function toggleSubchannels(event) {
    const subchannels = event.currentTarget.nextElementSibling;
    subchannels.classList.toggle('hidden');
}

function updateChannelBudget() {
    let channelBudget = parseInt(this.value);
    let totalBudget = parseInt(document.getElementById('totalBudget').value);
    
    if (channelBudget > totalBudget) {
        channelBudget = totalBudget;
        this.value = channelBudget;
    }
    
    let percentage = (channelBudget / totalBudget) * 100;
    
    this.nextElementSibling.textContent = `₪${channelBudget.toLocaleString()}`;
    this.nextElementSibling.nextElementSibling.textContent = `${percentage.toFixed(1)}%`;

    updateSubchannelMaxBudgets(this.closest('.channel'), channelBudget);
    updateCampaignSummary();
}

function updateSubchannelBudget() {
    let subchannelBudget = parseInt(this.value);
    let channelBudget = parseInt(this.closest('.channel').querySelector('.channel-budget input').value);
    
    if (subchannelBudget > channelBudget) {
        subchannelBudget = channelBudget;
        this.value = subchannelBudget;
    }
    
    let percentage = (subchannelBudget / channelBudget) * 100;

    this.nextElementSibling.textContent = `₪${subchannelBudget.toLocaleString()}`;
    this.nextElementSibling.nextElementSibling.textContent = `${percentage.toFixed(1)}%`;
    updateCampaignSummary();
}

function updateAllChannelBudgets(totalBudget) {
    document.querySelectorAll('.channel-budget input[type="range"]').forEach(input => {
        input.max = totalBudget;
        let currentValue = parseInt(input.value);
        if (currentValue > totalBudget) {
            currentValue = totalBudget;
            input.value = currentValue;
        }
        let percentage = (currentValue / totalBudget) * 100;
        input.nextElementSibling.textContent = `₪${currentValue.toLocaleString()}`;
        input.nextElementSibling.nextElementSibling.textContent = `${percentage.toFixed(1)}%`;
        updateSubchannelMaxBudgets(input.closest('.channel'), currentValue);
    });
}

function updateSubchannelMaxBudgets(channelElement, channelBudget) {
    channelElement.querySelectorAll('.subchannel input[type="range"]').forEach(input => {
        input.max = channelBudget;
        let currentValue = parseInt(input.value);
        if (currentValue > channelBudget) {
            currentValue = channelBudget;
            input.value = currentValue;
        }
        let percentage = (currentValue / channelBudget) * 100;
        input.nextElementSibling.textContent = `₪${currentValue.toLocaleString()}`;
        input.nextElementSibling.nextElementSibling.textContent = `${percentage.toFixed(1)}%`;
    });
}

function updateTips() {
    const totalBudget = parseInt(document.getElementById('totalBudget').value);
    const tips = document.getElementById('tips');
    let tipText = '';
    let contentRecommendations = '';

    if (totalBudget < 1000) {
        tipText = 'טיפ: עם תקציב נמוך, כדאי להתמקד ב-2 ערוצים עיקריים ו-3-4 פרסומים בכל אחד.';
       contentRecommendations = `
            <h4>המלצות לתוכן:</h4>
            <ul>
                <li>צור פוסט אחד ביום בכל ערוץ</li>
                <li>השתמש בתוכן איכותי ומעניין שיגרום לאינטראקציה</li>
                <li>נסה לשלב תמונות ווידאו לגיוון התוכן</li>
            </ul>
        `;
    } else if (totalBudget >= 1000) {
        tipText = 'טיפ: נסה לחלק את התקציב בין 3-4 ערוצים עיקריים עם 5-6 פרסומים בכל אחד לביצועים מיטביים.';
        contentRecommendations = `
            <h4>המלצות לתוכן:</h4>
            <ul>
                <li>צור 2-3 פוסטים ביום בכל ערוץ</li>
                <li>השתמש במגוון סוגי תוכן: תמונות, וידאו, סטוריז, ופוסטים טקסטואליים</li>
                <li>שקול יצירת תוכן ייחודי לכל ערוץ</li>
                <li>נסה לשלב תוכן אינטראקטיבי כמו סקרים או תחרויות</li>
            </ul>
        `;
    }

    tips.querySelector('p').textContent = tipText;
    document.getElementById('contentRecommendations').innerHTML = contentRecommendations;
    
    const activeChannels = Array.from(document.querySelectorAll('.channel-budget input[type="range"]'))
        .filter(input => parseInt(input.value) > 0)
        .map(input => input.closest('.channel').querySelector('.channel-header span').textContent);
    
    let channelSpecificRecommendations = '<h4>המלצות ספציפיות לערוצים:</h4><ul>';
    activeChannels.forEach(channel => {
        switch(channel) {
            case 'Instagram':
                channelSpecificRecommendations += '<li>Instagram: השתמש בהאשטגים רלוונטיים, צור סטוריז יומיים</li>';
                break;
            case 'Facebook':
                channelSpecificRecommendations += '<li>Facebook: שתף תוכן מגוון, הגב לתגובות במהירות</li>';
                break;
            case 'Google Ads & YouTube':
                channelSpecificRecommendations += '<li>Google Ads & YouTube: בחר מילות מפתח ממוקדות, בדוק ועדכן את המודעות באופן קבוע, צור תוכן וידאו מעניין</li>';
                break;
            case 'Twitter':
                channelSpecificRecommendations += '<li>Twitter: השתמש בהאשטגים טרנדיים, הגב ושתף ציוצים רלוונטיים</li>';
                break;
            case 'TikTok':
                channelSpecificRecommendations += '<li>TikTok: צור תוכן קצר ומעניין, השתמש במוזיקה פופולרית ואתגרים</li>';
                break;
            case 'דף נחיתה':
                channelSpecificRecommendations += '<li>דף נחיתה: עצב דף נקי וממוקד, הדגש את הצעת הערך הייחודית שלך</li>';
                break;
        }
    });
    channelSpecificRecommendations += '</ul>';
    
    document.getElementById('contentRecommendations').innerHTML += channelSpecificRecommendations;
}

function switchCampaignType(type) {
    document.getElementById('manualCampaign').classList.toggle('active', type === 'manual');
    document.getElementById('invisionCampaign').classList.toggle('active', type === 'invision');
    
    if (type === 'invision') {
        simulateInVisionProcess();
    } else {
        resetCampaign();
    }
}

function simulateInVisionProcess() {
    const statusMessages = [
        "מעבד את המידע...",
        "מחלק תקציב לערוצי שיווק...",
        "מחלק תקציב לפרסומים..."
    ];

    const systemMessages = document.getElementById('systemMessages');
    systemMessages.innerHTML = '';
    systemMessages.classList.remove('hidden');

    let index = 0;
    const interval = setInterval(() => {
        if (index < statusMessages.length) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('system-message');
            messageElement.textContent = statusMessages[index];
            systemMessages.appendChild(messageElement);
            systemMessages.scrollTop = systemMessages.scrollHeight;
            index++;
        } else {
            clearInterval(interval);
            setTimeout(() => {
                systemMessages.classList.add('hidden');
                populateFormWithInVisionData();
            }, 1000);
        }
    }, 2000);
}

function populateFormWithInVisionData() {
    document.getElementById('totalBudget').value = 1000;
    document.getElementById('totalBudget').dispatchEvent(new Event('input'));

    const channels = ['Google Ads & YouTube', 'Facebook', 'Instagram'];
    const budgets = [400, 300, 300];

    channels.forEach((channel, index) => {
        const channelInput = document.querySelector(`.channel-budget input[data-channel="${channel}"]`);
        if (channelInput) {
            channelInput.value = budgets[index];
            channelInput.dispatchEvent(new Event('input'));
        }
    });

    updateCampaignSummary();
    showStatusMessage('המלצות InVision הוחלו בהצלחה!');
}

function resetCampaign() {
    document.getElementById('totalBudget').value = 1000;
    document.getElementById('totalBudget').dispatchEvent(new Event('input'));

    document.querySelectorAll('.channel-budget input[type="range"]').forEach(input => {
        input.value = 0;
        input.dispatchEvent(new Event('input'));
    });

    updateCampaignSummary();
    showStatusMessage('הקמפיין אופס בהצלחה!');
}

function toggleOptionButton() {
    this.classList.toggle('active');
}

function limitCheckboxSelection() {
    const checkboxes = document.querySelectorAll(`input[name="${this.name}"]:checked`);
    if (checkboxes.length > 2) {
        this.checked = false;
    }
}

function showStatusMessage(message) {
    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = message;
    statusElement.classList.remove('hidden');
    setTimeout(() => {
        statusElement.classList.add('hidden');
    }, 3000);
}

function handleCampaignGoals(event) {
    if (event.target.classList.contains('option-button')) {
        const otherGoalTextarea = document.getElementById('otherGoal');
        if (event.target.dataset.value === 'other') {
            otherGoalTextarea.classList.remove('hidden');
        } else {
            otherGoalTextarea.classList.add('hidden');
        }

        const activeGoals = document.querySelectorAll('.button-group .option-button.active');
        if (activeGoals.length > 3) {
            event.target.classList.remove('active');
        }
    }
}

function updateCampaignSummary() {
    const summaryName = document.getElementById('summaryName');
    const summaryGoals = document.getElementById('summaryGoals');
    const summaryBudget = document.getElementById('summaryBudget');
    const summaryChannels = document.getElementById('summaryChannels');
    const channelBudgetSummary = document.getElementById('channelBudgetSummary');

    summaryName.textContent = document.getElementById('campaignName').value || 'לא הוגדר';
    
    const activeGoals = Array.from(document.querySelectorAll('.button-group .option-button.active'))
        .map(button => button.textContent);
    summaryGoals.textContent = activeGoals.join(', ') || 'לא נבחרו';

    const totalBudget = parseInt(document.getElementById('totalBudget').value);
    summaryBudget.textContent = `₪${totalBudget.toLocaleString()}`;

    const activeChannels = Array.from(document.querySelectorAll('.channel-budget input[type="range"]'))
        .filter(input => parseInt(input.value) > 0);
    summaryChannels.textContent = activeChannels.length;

    channelBudgetSummary.innerHTML = '';
    activeChannels.forEach(channelInput => {
        const channelName = channelInput.closest('.channel').querySelector('.channel-header span').textContent;
        const channelBudget = parseInt(channelInput.value);
        const channelPercentage = ((channelBudget / totalBudget) * 100).toFixed(2);

        const channelSummary = document.createElement('p');
        channelSummary.textContent = `${channelName}: ₪${channelBudget.toLocaleString()} (${channelPercentage}%)`;
        channelBudgetSummary.appendChild(channelSummary);

        const subchannels = channelInput.closest('.channel').querySelectorAll('.subchannel');
        subchannels.forEach(subchannel => {
            const subchannelName = subchannel.querySelector('span').textContent;
            const subchannelBudget = parseInt(subchannel.querySelector('input').value);
            const subchannelPercentage = ((subchannelBudget / channelBudget) * 100).toFixed(2);

            if (subchannelBudget > 0) {
                const subchannelSummary = document.createElement('p');
                subchannelSummary.textContent = `- ${subchannelName}: ₪${subchannelBudget.toLocaleString()} (${subchannelPercentage}%)`;
                subchannelSummary.style.marginRight = '20px';
                channelBudgetSummary.appendChild(subchannelSummary);
            }
        });
    });
}

function showSuggestions(event) {
    const input = event.target;
    const suggestionsContainer = input.nextElementSibling;
    const inputValue = input.value.toLowerCase();

    const suggestions = ['תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'ספורט', 'אופנה', 'טכנולוגיה', 'אוכל'];
    const filteredSuggestions = suggestions.filter(suggestion => suggestion.toLowerCase().includes(inputValue));

    suggestionsContainer.innerHTML = '';
    filteredSuggestions.forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.classList.add('suggestion-item');
        suggestionElement.textContent = suggestion;
        suggestionElement.addEventListener('click', () => {
            input.value = suggestion;
            suggestionsContainer.innerHTML = '';
        });
        suggestionsContainer.appendChild(suggestionElement);
    });
}