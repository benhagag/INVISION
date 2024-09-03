document.addEventListener('DOMContentLoaded', function() {
    const recommendationData = [
        { 
            id: 1, 
            campaign: 'summer2024',
            title: 'עדכון תמונת נושא לקמפיין קיץ', 
            description: 'התמונה הנוכחית של המתאמן בחוף לא מושכת מספיק. מומלץ להחליף לתמונה של קבוצת מתאמנים נהנים בשיעור חוף עם שקיעה ברקע.',
            currentContent: 'https://example.com/current-beach-image.jpg',
            suggestedContent: 'https://example.com/suggested-group-beach-workout-sunset.jpg',
            urgency: 'high', 
            date: '2024-06-15',
            metrics: { engagement: '+25%', clicks: '+40%' }
        },
        { 
            id: 2, 
            campaign: 'newClasses',
            title: 'שיפור תוכן פוסט שיעורי יוגה', 
            description: 'הפוסט על שיעורי היוגה החדשים לא יצר מספיק מעורבות. מומלץ להוסיף תיאור של היתרונות הבריאותיים ולשלב תמונה של מתרגלים מאושרים.',
            currentContent: 'הצטרפו לשיעורי היוגה החדשים שלנו!',
            suggestedContent: 'גלו את הכוח הפנימי שלכם! 🧘‍♀️✨ שיעורי היוגה החדשים שלנו משלבים טכניקות נשימה, מדיטציה ומתיחות להפחתת מתחים ושיפור הגמישות. הצטרפו עכשיו וקבלו שיעור ניסיון חינם!',
            urgency: 'medium', 
            date: '2024-06-18',
            metrics: { engagement: '+35%', signups: '+20%' }
        },
        { 
            id: 3, 
            campaign: 'personalTraining',
            title: 'הגדלת תקציב קמפיין אימון אישי', 
            description: 'קמפיין האימון האישי מראה תוצאות מבטיחות. מומלץ להגדיל את התקציב ב-20% ולהרחיב את קהל היעד לגילאי 35-50.',
            currentContent: '1000 ש"ח ליום, קהל יעד: 25-40',
            suggestedContent: '1200 ש"ח ליום, קהל יעד: 35-50',
            urgency: 'low', 
            date: '2024-06-20',
            metrics: { roi: '+15%', leads: '+30%' }
        },
        {
            id: 4,
            campaign: 'nutrition',
            title: 'יצירת סדרת פוסטים על תזונה נכונה',
            description: 'לאור שאלות רבות מלקוחות, מומלץ ליצור סדרת פוסטים שבועית על תזונה נכונה לספורטאים. יש לשלב טיפים, מתכונים, ועצות מדיאטנית הסטודיו.',
            currentContent: 'אין תוכן קיים',
            suggestedContent: 'סדרה של 6 פוסטים: 1. חשיבות התזונה לספורטאים, 2. ארוחות לפני אימון, 3. התאוששות אחרי אימון, 4. מתכונים לחטיפים בריאים, 5. תזונה לבניית שריר, 6. שאלות ותשובות עם הדיאטנית',
            urgency: 'medium',
            date: '2024-06-25',
            metrics: { followers: '+10%', engagement: '+45%' }
        }
    ];

    const archiveData = [
        { 
            id: 101, 
            title: 'עדכון תמונת פרופיל פייסבוק', 
            date: '2024-05-20', 
            impact: 'חיובית', 
            description: 'החלפנו את תמונת הפרופיל לתמונה של מדריך מחייך עם לקוחה מרוצה. התוצאה: עלייה של 15% בקליקים על הפרופיל ו-10% יותר הודעות ישירות.' 
        },
        { 
            id: 102, 
            title: 'שיפור תיאור העסק באינסטגרם', 
            date: '2024-05-25', 
            impact: 'חיובית מאוד', 
            description: 'עדכנו את תיאור העסק באינסטגרם לכלול יותר מילות מפתח ו-CTA ברור. התוצאה: עלייה של 30% בכניסות לאתר מהפרופיל ו-25% יותר עוקבים חדשים.' 
        },
        { 
            id: 103, 
            title: 'הוספת סרטון וירטואלי לסיור בסטודיו', 
            date: '2024-06-01', 
            impact: 'חיובית מאוד', 
            description: 'הוספנו סרטון קצר המציג סיור וירטואלי בסטודיו, כולל המתקנים והאווירה. התוצאה: עלייה של 40% בפניות חדשות ו-20% יותר הרשמות לשיעור ניסיון.' 
        }
    ];

    function renderRecommendations() {
        const container = document.getElementById('recommendation-cards');
        container.innerHTML = '';
        recommendationData.forEach(rec => {
            const card = document.createElement('div');
            card.className = `recommendation-card urgency-${rec.urgency}`;
            card.innerHTML = `
                <h3>${rec.title}</h3>
                <p>${rec.description}</p>
                <div class="recommendation-actions">
                    <div class="timeline-date">תאריך יעד: ${new Date(rec.date).toLocaleDateString('he-IL')}</div>
                    <div class="metrics">
                        ${Object.entries(rec.metrics).map(([key, value]) => `<span>${key}: ${value}</span>`).join(' | ')}
                    </div>
                    <div>
                        <button class="action-btn go-to-content" data-url="${rec.suggestedContent}">מעבר לעמוד התוכן</button>
                        <button class="action-btn approve" data-id="${rec.id}">אשר המלצה</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

document.getElementById('recommendation-cards').addEventListener('click', function(e) {
    if (e.target.classList.contains('go-to-content')) {
        alert('אתה מועבר לעמוד הרצוי');
    } else if (e.target.classList.contains('approve')) {
        alert('ההמלצה אושרה ותבוצע בקרוב. צוות השיווק יצור קשר לתיאום הביצוע.');
    }
});
    function renderArchive() {
        const container = document.getElementById('archive-container');
        container.innerHTML = '';
        archiveData.forEach(item => {
            const archiveItem = document.createElement('div');
            archiveItem.className = 'archive-item';
            archiveItem.innerHTML = `
                <h4>${item.title}</h4>
                <p>תאריך: ${new Date(item.date).toLocaleDateString('he-IL')}</p>
                <p>השפעה: ${item.impact}</p>
                <p>${item.description}</p>
            `;
            container.appendChild(archiveItem);
        });
    }

    function updateTips() {
        const tips = [
            'שתפו תמונות מאחורי הקלעים של השיעורים שלכם כדי ליצור חיבור אישי עם העוקבים',
            'הציעו מבצע מיוחד למנויים ותיקים שיביאו חבר חדש - זו דרך מצוינת להרחיב את בסיס הלקוחות',
            'צרו סרטון קצר המציג טכניקת נשימה פשוטה ליוגה - תוכן כזה יכול להפוך לויראלי',
            'ערכו שאלון קצר למנויים לגבי העדפות לשיעורים חדשים - זה יעזור לכם להתאים את ההיצע לביקוש',
            'שתפו סיפורי הצלחה של מתאמנים בעמוד הפייסבוק שלכם - זה יעודד אחרים להצטרף',
            'השתמשו בהאשטגים פופולריים בתחום הכושר והבריאות בפוסטים שלכם באינסטגרם',
            'צרו סדרת פוסטים "טיפ היום" עם עצות קצרות לאורח חיים בריא',
            'הציעו אתגר כושר שבועי בסטורי באינסטגרם ועודדו מעורבות של העוקבים',
            'שתפו מתכון בריא פעם בשבוע - זה יכול למשוך קהל חדש המתעניין בתזונה נכונה',
            'ערכו שידור חי עם אחד המדריכים לשאלות ותשובות - זה יחזק את הקשר עם הקהילה שלכם'
        ];
        const tipsList = document.getElementById('tips-list');
        tipsList.innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
    }

    document.getElementById('archive-btn').addEventListener('click', function() {
        document.getElementById('recommendations').style.display = 'none';
        document.getElementById('archive').style.display = 'block';
        renderArchive();
    });

    document.getElementById('home-btn').addEventListener('click', function() {
        document.getElementById('recommendations').style.display = 'block';
        document.getElementById('archive').style.display = 'none';
        renderRecommendations();
    });

    function applyFilters() {
        const campaignFilter = document.getElementById('campaign-filter').value;
        const timeFilter = document.getElementById('time-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const searchTerm = document.getElementById('searchBar').value.toLowerCase();

        const filteredData = recommendationData.filter(rec => {
            const matchesCampaign = campaignFilter === 'all' || rec.campaign === campaignFilter;
            const matchesTime = timeFilter === 'all' || (timeFilter === 'lastWeek' && new Date(rec.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
            const matchesSearch = rec.title.toLowerCase().includes(searchTerm) || rec.description.toLowerCase().includes(searchTerm);
            return matchesCampaign && matchesTime && matchesSearch;
        });

        renderFilteredRecommendations(filteredData);
    }

    function renderFilteredRecommendations(filteredData) {
        const container = document.getElementById('recommendation-cards');
        container.innerHTML = '';
        filteredData.forEach(rec => {
            const card = document.createElement('div');
            card.className = `recommendation-card urgency-${rec.urgency}`;
            card.innerHTML = `
                <h3>${rec.title}</h3>
                <p>${rec.description}</p>
                <div class="recommendation-actions">
                    <div class="timeline-date">תאריך יעד: ${new Date(rec.date).toLocaleDateString('he-IL')}</div>
                    <div class="metrics">
                        ${Object.entries(rec.metrics).map(([key, value]) => `<span>${key}: ${value}</span>`).join(' | ')}
                    </div>
                    <div>
                        <button class="action-btn go-to-content" data-url="${rec.suggestedContent}">מעבר לעמוד התוכן</button>
                        <button class="action-btn approve" data-id="${rec.id}">אשר המלצה</button>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });
    }

    document.querySelectorAll('.filter-select, #searchBar').forEach(element => {
        element.addEventListener('change', applyFilters);
    });

    document.getElementById('searchBar').addEventListener('input', applyFilters);

    function renderPerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני'],
                datasets: [{
                    label: 'מנויים חדשים',
                    data: [12, 19, 3, 5, 2, 3],
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }, {
                    label: 'הכנסות (באלפי ש"ח)',
                    data: [50, 55, 60, 58, 62, 65],
                    borderColor: 'rgb(255, 99, 132)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'ביצועי הסטודיו לאורך זמן'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    function renderUpcomingTasks() {
        const tasks = [
            { title: 'עדכון תמונת פרופיל', date: '2024-06-20' },
            { title: 'יצירת פוסט לקמפיין קיץ', date: '2024-06-22' },
            { title: 'פגישה עם צלם לצילומי תדמית', date: '2024-06-25' },
            { title: 'סקירת ביצועי קמפיין אימון אישי', date: '2024-06-28' }
        ];

        const tasksList = document.getElementById('tasks-list');
        tasksList.innerHTML = tasks.map(task => `
            <li>
                <strong>${task.title}</strong>
                <br>תאריך: ${new Date(task.date).toLocaleDateString('he-IL')}
            </li>
        `).join('');
    }

    renderRecommendations();
    updateTips();
    renderPerformanceChart();
    renderUpcomingTasks();

    // עדכון טיפים כל 30 שניות
    setInterval(updateTips, 30000);
});