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
    document.location.href = option;
}

function showManualForm() {
    document.getElementById('event-form').style.display = 'block';
    document.getElementById('invision-prompt').style.display = 'none';
    document.getElementById('event-preview').style.display = 'none';
}

function showInvisionPrompt() {
    document.getElementById('invision-prompt').style.display = 'block';
    document.getElementById('event-form').style.display = 'none';
    document.getElementById('event-preview').style.display = 'none';
}

function generateEvent() {
    const topic = document.getElementById('event-topic').value;
    const previewContent = document.getElementById('preview-content');

    const eventExample = {
        name: `אירוע ${topic} מיוחד`,
        type: Math.random() > 0.5 ? 'מקוון' : 'פיזי',
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('he-IL'),
        time: '19:00',
        location: Math.random() > 0.5 ? 'מרכז הקונגרסים תל אביב' : 'שידור חי בזום',
        description: `הצטרפו אלינו לאירוע מרתק בנושא ${topic}. נארח מומחים מובילים בתחום ונקיים פאנל שאלות ותשובות. אל תחמיצו!`
    };

    previewContent.innerHTML = `
        <p><strong>שם האירוע:</strong> ${eventExample.name}</p>
        <p><strong>סוג:</strong> ${eventExample.type}</p>
        <p><strong>תאריך:</strong> ${eventExample.date}</p>
        <p><strong>שעה:</strong> ${eventExample.time}</p>
        <p><strong>מיקום:</strong> ${eventExample.location}</p>
        <p><strong>תיאור:</strong> ${eventExample.description}</p>
    `;

    document.getElementById('event-preview').style.display = 'block';
    document.getElementById('invision-prompt').style.display = 'none';
}

function editEvent() {
    document.getElementById('event-form').style.display = 'block';
    document.getElementById('event-preview').style.display = 'none';

    const previewContent = document.getElementById('preview-content');
    document.getElementById('event-name').value = previewContent.querySelector('p:nth-child(1)').textContent.split(': ')[1];
    document.getElementById('event-type').value = previewContent.querySelector('p:nth-child(2)').textContent.split(': ')[1] === 'מקוון' ? 'online' : 'inperson';
    document.getElementById('event-location').value = previewContent.querySelector('p:nth-child(5)').textContent.split(': ')[1];
    document.getElementById('event-description').value = previewContent.querySelector('p:nth-child(6)').textContent.split(': ')[1];
}