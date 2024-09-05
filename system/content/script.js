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
        button.addEventListener('click', function() {
            // הסרת מחלקת 'active' מכל הכפתורים
            platformButtons.forEach(btn => btn.classList.remove('active'));

            // הוספת מחלקת 'active' לכפתור שנבחר
            this.classList.add('active');

            // הצגת תפריט נפתח לכפתור שנבחר
            const platform = this.getAttribute('data-platform');
            const options = platformOptions[platform];
            if (options) {

                console.log(options);

                const rect = this.getBoundingClientRect();
                const tooltipWidth = rect.width; // רוחב התפריט זהה לרוחב הכפתור

                tooltipContainer.innerHTML = `
                    <div class="tooltip" style="top: ${rect.bottom + window.scrollY}px; left: ${rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2)}px; width: ${tooltipWidth}px;">
                        <ul>
                            ${options.map(option => `<li onclick="selectOption('https://benhagag.github.io/INVISION/${option.url}', '${platform}')">${option.value}</li>`).join('')}
                        </ul>
                    </div>
                `;
                const tooltip = tooltipContainer.querySelector('.tooltip');
                tooltip.style.display = 'block';

                // סגירת התפריט כשעוברים החוצה
                tooltip.addEventListener('mouseleave', function() {
                    tooltip.style.display = 'none';
                });

                tooltip.addEventListener('mouseenter', function() {
                    tooltip.style.display = 'block';
                });
            }
        });

        button.addEventListener('mouseenter', function() {
            const platform = this.getAttribute('data-platform');
            const options = platformOptions[platform];
            const rect = this.getBoundingClientRect();
            const tooltipWidth = rect.width;

            tooltipContainer.innerHTML = `
                <div class="tooltip" style="top: ${rect.bottom + window.scrollY}px; left: ${rect.left + window.scrollX + (rect.width / 2) - (tooltipWidth / 2)}px; width: ${tooltipWidth}px;">
                    <ul>
                        ${options.map(option => `<li onclick="selectOption('https://benhagag.github.io/INVISION/${option.url}', '${platform}')">${option.value}</li>`).join('')}
                    </ul>
                </div>
            `;
            const tooltip = tooltipContainer.querySelector('.tooltip');
            tooltip.style.display = 'block';

            button.addEventListener('mouseleave', function() {
                tooltip.style.display = 'none';
            });

            tooltip.addEventListener('mouseleave', function() {
                tooltip.style.display = 'none';
            });

            tooltip.addEventListener('mouseenter', function() {
                tooltip.style.display = 'block';
            });
        });
    });
});

function selectOption(option, platform) {

    document,location.href = option;

    // מציאת הכפתור הרלוונטי והוספת מחלקת 'active'
    const platformButtons = document.querySelectorAll('.platform-btn');
    platformButtons.forEach(btn => btn.classList.remove('active'));

    const selectedButton = document.querySelector(`.platform-btn[data-platform='${platform}']`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // סגירת התפריט לאחר בחירת אפשרות
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}