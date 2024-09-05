let currentStep = 1;
const products = [];

function nextStep(step) {
    document.getElementById(`step${step}`).style.display = 'none';
    document.getElementById(`step${step + 1}`).style.display = 'block';
    currentStep++;
    updateProgress();
}

function prevStep(step) {
    document.getElementById(`step${step}`).style.display = 'none';
    document.getElementById(`step${step - 1}`).style.display = 'block';
    currentStep--;
    updateProgress();
}

function updateProgress() {
    const progress = (currentStep / 4) * 100;
    document.getElementById('progress').style.width = `${progress}%`;
}

function addProductForm(container = 'productForms') {
    const productForms = document.getElementById(container);
    const newProductForm = document.createElement('div');
    newProductForm.classList.add('product-form');
    newProductForm.innerHTML = `
        <h3>מוצר ${productForms.children.length + 1}</h3>
        <button type="button" class="remove-product" onclick="removeProductForm(this)">
            <i class="fas fa-minus"></i>
        </button>
        <form class="addProductForm">
            <label for="productName">
                שם המוצר:
                <span class="tooltip">
                    <i class="fas fa-question-circle"></i>
                    <span class="tooltiptext">השתמשו בשם קצר ותיאורי</span>
                </span>
            </label>
            <input type="text" class="productName" placeholder="לדוגמה: חולצת טי קלאסית" required>
            
            <label for="productPrice">
                מחיר:
                <span class="tooltip">
                    <i class="fas fa-question-circle"></i>
                    <span class="tooltiptext">הזינו את המחיר ללא סימן המטבע</span>
                </span>
            </label>
            <input type="number" class="productPrice" placeholder="לדוגמה: 49.99" required>
            
            <label for="productDescription">
                תיאור המוצר:
                <span class="tooltip">
                    <i class="fas fa-question-circle"></i>
                    <span class="tooltiptext">תארו את המוצר בפירוט, כולל חומרים ומידות</span>
                </span>
            </label>
            <textarea class="productDescription" placeholder="לדוגמה: חולצת טי איכותית מ-100% כותנה, זמינה במגוון צבעים ומידות" required></textarea>
            
            <label for="productImage">
                תמונת המוצר:
                <span class="tooltip">
                    <i class="fas fa-question-circle"></i>
                    <span class="tooltiptext">העלו תמונה איכותית וברורה של המוצר</span>
                </span>
            </label>
            <input type="file" class="productImage" accept="image/*" required>
        </form>
    `;
    productForms.appendChild(newProductForm);
}

function removeProductForm(button) {
    button.closest('.product-form').remove();
    updateProductFormNumbers();
}

function updateProductFormNumbers() {
    const productForms = document.querySelectorAll('.product-form');
    productForms.forEach((form, index) => {
        form.querySelector('h3').textContent = `מוצר ${index + 1}`;
    });
}

function quickSetup() {
    const shopType = prompt("באיזה נושא תרצו לפתוח חנות? (לדוגמה: אופנה, אלקטרוניקה, ספרים)");
    if (shopType) {
        document.getElementById('shopName').value = `החנות המובילה ל${shopType}`;
        document.getElementById('shopDescription').value = `גלו את העולם המרתק של ${shopType} בחנות שלנו! אנו מציעים מבחר עשיר ואיכותי של מוצרים חדשניים במחירים תחרותיים. הצטרפו אלינו לחוויית קנייה מהנה ומשתלמת!`;
        document.getElementById('currency').value = 'ILS';
        
        document.getElementById('paymentMethod').value = 'creditCard';
        document.getElementById('shippingMethod').value = 'standard';
        document.getElementById('theme').value = 'modern';
        
        // מעבר לתצוגה מקדימה
        for (let i = 1; i <= 4; i++) {
            document.getElementById(`step${i}`).style.display = 'none';
        }
        document.getElementById('preview').style.display = 'block';
        currentStep = 5;
        updateProgress();
        updateShopPreview();
    }
}

function updateShopPreview() {
    const shopName = document.getElementById('shopName').value;
    const shopDescription = document.getElementById('shopDescription').value;
    const currency = document.getElementById('currency').value;
    const paymentMethod = document.getElementById('paymentMethod').value;
    const shippingMethod = document.getElementById('shippingMethod').value;
    const theme = document.getElementById('theme').value;
    const primaryColor = document.getElementById('primaryColor').value;
    const secondaryColor = document.getElementById('secondaryColor').value;

    const preview = document.getElementById('shopPreview');
    preview.innerHTML = `
        <div class="preview-content">
            <div class="store-header" style="background-color: ${primaryColor};">
                <h2 style="color: ${secondaryColor};">${shopName}</h2>
                <span class="category-tag" style="background-color: ${secondaryColor}; color: ${primaryColor};">החנות המובילה בתחומה</span>
            </div>
            <div class="preview-section">
                <h3>ברוכים הבאים לחנות שלנו!</h3>
                <p>${shopDescription}</p>
                <p>צרו קשר: 03-1234567 | info@${shopName.toLowerCase().replace(/\s/g, '')}.com</p>
                <p>כתובת: רחוב הקניות 123, תל אביב</p>
            </div>
            <div class="preview-section">
                <h3>המוצרים הלוהטים שלנו</h3>
                <div class="product-list">
                    <div class="preview-product">
                        <img src="https://via.placeholder.com/150" alt="מוצר מוביל" style="width:100px;height:100px;">
                        <h4>מוצר מוביל</h4>
                        <p>המוצר החדשני שכולם מדברים עליו!</p>
                        <p>מחיר מבצע: 99.99 ${currency}</p>
                        <button class="buy-button">הוסף לעגלה</button>
                    </div>
                </div>
            </div>
            <div class="preview-section">
                <h3>למה לקנות אצלנו?</h3>
                <ul>
                    <li>מבחר עצום של מוצרים איכותיים</li>
                    <li>מחירים תחרותיים</li>
                    <li>משלוח מהיר ואמין</li>
                    <li>שירות לקוחות מעולה</li>
                    <li>מדיניות החזרה נוחה</li>
                </ul>
                <p><strong>שיטות תשלום:</strong> ${paymentMethod}</p>
                <p><strong>אפשרויות משלוח:</strong> ${shippingMethod}</p>
            </div>
        </div>
    `;
}

function backToEditing() {
    document.getElementById('preview').style.display = 'none';
    document.getElementById('step1').style.display = 'block';
    currentStep = 1;
    updateProgress();
}

function showAdvancedEdit() {
    document.getElementById('advancedEditOptions').style.display = 'block';
    document.getElementById('advancedShopName').value = document.getElementById('shopName').value;
    document.getElementById('advancedShopDescription').value = document.getElementById('shopDescription').value;
    document.getElementById('advancedPrimaryColor').value = document.getElementById('primaryColor').value;
    document.getElementById('advancedSecondaryColor').value = document.getElementById('secondaryColor').value;
}

function closeAdvancedEdit() {
    document.getElementById('advancedEditOptions').style.display = 'none';
}

function applyAdvancedEdit() {
    document.getElementById('shopName').value = document.getElementById('advancedShopName').value;
    document.getElementById('shopDescription').value = document.getElementById('advancedShopDescription').value;
    document.getElementById('primaryColor').value = document.getElementById('advancedPrimaryColor').value;
    document.getElementById('secondaryColor').value = document.getElementById('advancedSecondaryColor').value;
    document.body.style.fontFamily = document.getElementById('advancedFont').value;
    updateShopPreview();
    closeAdvancedEdit();
}

function publishShop() {
    updateShopPreview();
    alert('החנות פורסמה בהצלחה בדף העסקי שלך בפייסבוק!');
}

updateProgress();
addProductForm(); // Add the first product form by default

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