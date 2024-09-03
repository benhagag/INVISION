document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const sections = document.querySelectorAll('.settings-section');
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    const closeModal = document.querySelector('.close');
    const toast = document.getElementById('toast');

    // פונקציונליות ניווט
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.classList.add('hidden');
            });
            document.getElementById(targetId).classList.remove('hidden');
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // פונקציונליות שינוי סיסמה
    document.getElementById('changePassword').addEventListener('click', function() {
        modalTitle.textContent = 'שינוי סיסמה';
        modalBody.innerHTML = `
            <form id="passwordForm">
                <div class="form-group">
                    <label for="currentPassword">סיסמה נוכחית:</label>
                    <input type="password" id="currentPassword" required>
                </div>
                <div class="form-group">
                    <label for="newPassword">סיסמה חדשה:</label>
                    <input type="password" id="newPassword" required>
                </div>
                <div class="form-group">
                    <label for="confirmPassword">אימות סיסמה חדשה:</label>
                    <input type="password" id="confirmPassword" required>
                </div>
                <button type="submit" class="btn-primary">שנה סיסמה</button>
            </form>
        `;
        modal.style.display = 'block';
        
        document.getElementById('passwordForm').addEventListener('submit', function(e) {
            e.preventDefault();
            // הוסף כאן לוגיקה לשינוי הסיסמה
            showToast('הסיסמה שונתה בהצלחה');
            modal.style.display = 'none';
        });
    });

    // פונקציונליות אימות דו-שלבי
    document.getElementById('twoFactor').addEventListener('change', function() {
        document.getElementById('twoFactorOptions').classList.toggle('hidden');
    });

    document.getElementById('setupTwoFactor').addEventListener('click', function() {
        const method = document.querySelector('input[name="twoFactorMethod"]:checked').value;
        modalTitle.textContent = 'הגדרת אימות דו-שלבי';
        modalBody.innerHTML = `
            <p>נבחרה שיטת האימות: ${method}</p>
            <p>קוד האימות נשלח אליך. אנא הזן אותו כאן:</p>
            <input type="text" id="verificationCode" maxlength="6">
            <button class="btn-primary" id="verifyCode">אמת קוד</button>
        `;
        modal.style.display = 'block';

        document.getElementById('verifyCode').addEventListener('click', function() {
            // הוסף כאן לוגיקה לאימות הקוד
            showToast('אימות דו-שלבי הופעל בהצלחה');
            modal.style.display = 'none';
        });
    });

    // פונקציונליות העדפות תצוגה
    document.getElementById('language').addEventListener('change', function() {
        showToast(`שפת הממשק שונתה ל${this.options[this.selectedIndex].text}`);
    });

    document.getElementById('theme').addEventListener('change', function() {
        document.body.className = this.value + '-theme';
        showToast(`מצב התצוגה שונה ל${this.options[this.selectedIndex].text}`);
    });

    // פונקציונליות מיון סדר הדשבורד
    new Sortable(document.getElementById('dashboardOrder'), {
        animation: 150,
        ghostClass: 'sortable-ghost',
        onEnd: function() {
            showToast('סדר הדשבורד עודכן');
        }
    });

    // פונקציונליות עריכת חבר צוות
    document.querySelectorAll('.edit-team-member').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.cells[0].textContent;
            const role = row.cells[1].textContent;
            const permissions = row.cells[2].textContent;

            modalTitle.textContent = 'עריכת חבר צוות';
            modalBody.innerHTML = `
                <form id="editTeamMemberForm">
                    <div class="form-group">
                        <label for="editName">שם:</label>
                        <input type="text" id="editName" value="${name}" required>
                    </div>
                    <div class="form-group">
                        <label for="editRole">תפקיד:</label>
                        <input type="text" id="editRole" value="${role}" required>
                    </div>
                    <div class="form-group">
                        <label for="editPermissions">הרשאות:</label>
                        <select id="editPermissions">
                            <option value="full" ${permissions === 'מלאות' ? 'selected' : ''}>מלאות</option>
                            <option value="edit" ${permissions === 'עריכה' ? 'selected' : ''}>עריכה</option>
                            <option value="view" ${permissions === 'צפייה' ? 'selected' : ''}>צפייה</option>
                        </select>
                    </div>
                    <button type="submit" class="btn-primary">שמור שינויים</button>
                </form>
            `;
            modal.style.display = 'block';

            document.getElementById('editTeamMemberForm').addEventListener('submit', function(e) {
                e.preventDefault();
                // הוסף כאן לוגיקה לשמירת שינויים בחבר הצוות
                showToast('פרטי חבר הצוות עודכנו בהצלחה');
                modal.style.display = 'none';
            });
        });
    });

    // פונקציונליות מחיקת חבר צוות
    document.querySelectorAll('.delete-team-member').forEach(button => {
        button.addEventListener('click', function() {
            const row = this.closest('tr');
            const name = row.cells[0].textContent;

            if (confirm(`האם אתה בטוח שברצונך למחוק את ${name} מהצוות?`)) {
                // הוסף כאן לוגיקה למחיקת חבר הצוות
                row.remove();
                showToast('חבר הצוות נמחק בהצלחה');
            }
        });
    });

    // פונקציונליות הזמנת חבר צוות חדש
    document.getElementById('sendInvite').addEventListener('click', function() {
        const email = document.getElementById('inviteTeamMember').value;
        if (email) {
            // הוסף כאן לוגיקה לשליחת הזמנה
            showToast(`הזמנה נשלחה ל-${email}`);
            document.getElementById('inviteTeamMember').value = '';
        } else {
            showToast('אנא הזן כתובת אימייל תקינה');
        }
    });

    // פונקציונליות הוספת תפקיד חדש
    document.getElementById('addNewRole').addEventListener('click', function() {
        const newRole = document.getElementById('newRole').value;
        if (newRole) {
            // הוסף כאן לוגיקה להוספת תפקיד חדש
            showToast(`התפקיד "${newRole}" נוסף בהצלחה`);
            document.getElementById('newRole').value = '';
        } else {
            showToast('אנא הזן שם תפקיד');
        }
    });

    // פונקציונליות סגירת מודל
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // פונקציונליות טוסט
    function showToast(message) {
        toast.textContent = message;
        toast.className = 'toast show';
        setTimeout(function(){ toast.className = toast.className.replace('show', ''); }, 3000);
    }

    // אתחול החלק הראשון
    sections[0].classList.remove('hidden');
});