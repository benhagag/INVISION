document.getElementById('logo').addEventListener('change', function(e) {
    var fileName = e.target.files[0].name;
    document.querySelector('.file-name').textContent = fileName;
});

document.querySelectorAll('.industry-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.industry-option').forEach(opt => opt.classList.remove('selected'));
        this.classList.add('selected');
        document.getElementById('industry').value = this.dataset.value;
        if (this.dataset.value === 'other') {
            document.querySelector('.other-industry-input').classList.add('show');
        } else {
            document.querySelector('.other-industry-input').classList.remove('show');
        }
    });
});

document.getElementById('saveOtherIndustry').addEventListener('click', function() {
    const otherIndustryInput = document.getElementById('otherIndustry');
    if (otherIndustryInput.value) {
        document.getElementById('industry').value = otherIndustryInput.value;
        otherIndustryInput.disabled = true;
    }
});

document.getElementById('editOtherIndustry').addEventListener('click', function() {
    document.getElementById('otherIndustry').disabled = false;
});

document.getElementById('deleteOtherIndustry').addEventListener('click', function() {
    document.getElementById('otherIndustry').value = '';
    document.getElementById('otherIndustry').disabled = false;
    document.getElementById('industry').value = '';
    document.querySelector('.other-industry-input').classList.remove('show');
    document.querySelectorAll('.industry-option').forEach(opt => opt.classList.remove('selected'));
});

document.querySelector('.add-competitor').addEventListener('click', function() {
    const competitorsList = document.getElementById('competitorsList');
    const newCompetitorInput = document.createElement('div');
    newCompetitorInput.className = 'competitor-input';
    newCompetitorInput.innerHTML = `
        <input type="text" placeholder="שם המתחרה" class="modern-input">
        <input type="url" placeholder="קישור לאתר המתחרה" class="modern-input">
    `;
    competitorsList.appendChild(newCompetitorInput);
});

document.querySelectorAll('.age-group').forEach(group => {
    group.addEventListener('click', function() {
        this.classList.toggle('selected');
    });
});

document.getElementById('newClientForm').addEventListener('submit', function(e) {
    e.preventDefault();
    // כאן תוכל להוסיף לוגיקה לשליחת הטופס
    alert('הטופס נשלח בהצלחה!');
});