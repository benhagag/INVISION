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

function loadTestimonials() {
    const testimonials = [
        { text: "מאז שהתחלנו להשתמש באינוויז'ן, המכירות שלנו עלו ב-30% והפסקנו לדאוג מהשיווק", author: "רונית, בעלת חנות אופנה" },
        { text: "חסכנו המון זמן וכסף. המערכת עושה עבודה מעולה בשיווק העסק שלנו", author: "יוסי, בעל מסעדה" },
        { text: "הפתרון המושלם לעסק קטן כמו שלי. ממליץ בחום!", author: "דני, בעל סטודיו לצילום" }
    ];

    const container = document.getElementById('testimonial-container');
    testimonials.forEach(testimonial => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = 'testimonial-item';
        testimonialElement.innerHTML = `
            <p>"${testimonial.text}"</p>
            <div class="testimonial-author">- ${testimonial.author}</div>
        `;
        container.appendChild(testimonialElement);
    });
}

// Initialize
toggleClearIcon();
loadTestimonials();