document.addEventListener('DOMContentLoaded', function() {
    const platformButtons = document.querySelectorAll('.platform-btn');
    const tooltipContainer = document.getElementById('tooltip-container');

    const platformOptions = {
        facebook: [
            'פוסטים', 
            {"posts": "פוסטים"},
            'מודעות ממומנות', 
            {"modaot": "מודעות ממומנות"},
            'סטוריז', 
            {"story": "סטוריז"},
            'אירועים', 
            {"events": "אירועים"},
            'טפסי לידים', 
            {"leads": "טפסי לידים"},
            'חנות מקוונת',
            {"shop": "חנות מקוונת"},
        ],
        instagram: [
            'פוסט לפיד',
            'פוסט לסטורי',
            'IGTV'
        ],
        tiktok: [
            'העלאת סרטון'
        ],
        youtube: [
            'העלאת סרטון'
        ],
        twitter: [
            'פרסום ציוץ'
        ],
        google: [
            'מודעות ממומנות'
        ],
        'landing-page': [
            'ראשי', 
            'משני'
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
                        ${options.map(option => `<li onclick="selectOption('${option}', '${platform}')">${option}</li>`).join('')}
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