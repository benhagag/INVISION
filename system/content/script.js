document.addEventListener('DOMContentLoaded', function() {
    const platformButtons = document.querySelectorAll('.platform-btn');
    const tooltipContainer = document.getElementById('tooltip-container');

    const platformOptions = {
        facebook: [
            {key: "posts", value: "פוסטים"},
            {key: "modaot", value: "מודעות ממומנות"},
            {key: "story", value: "סטוריז"},
            {key: "events", value: "אירועים"},
            {key: "leads", value: "טפסי לידים"},
            {key: "shop", value: "חנות מקוונת"},
        ],
        instagram: [
            {key: "posts", value: "פוסט לפיד"},
            {key: "story", value: "פוסט לסטורי"},
            {key: "igtv", value: "IGTV"},
        ],
        tiktok: [
            {key: "video", value: "העלאת סרטון"},
        ],
        youtube: [
            {key: "video", value: "העלאת סרטון"},
        ],
        twitter: [
            {key: "tweet", value: "פרסום ציוץ"},
        ],
        google: [
            {key: "modaot", value: "מודעות ממומנות"},
        ],
        'landing-page': [
            {key: "main", value: "ראשי"},
            {key: "second", value: "משני"},
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
                            ${options.map(option => `<li onclick="selectOption('${option}', '${platform}')">${option}</li>`).join('')}
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
                        ${options.map(option => `<li onclick="selectOption('${platform}/${option.key}', '${platform}')">${option.value}</li>`).join('')}
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
    alert(`נבחרה האפשרות: ${option}`);

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