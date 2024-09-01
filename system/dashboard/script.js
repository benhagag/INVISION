function showContent(contentId) {
    document.querySelectorAll('.content').forEach(content => {
        content.style.display = 'none';
    });
    document.getElementById(contentId).style.display = 'block';
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
}

function applyFilters() {
    // Implement filter logic for marketing activities
    console.log('Applying marketing filters');
}

function applyGeneralFilters() {
    // Implement filter logic for general activities
    console.log('Applying general filters');
}

function applyDataFilters() {
    // Implement filter logic for data operations
    console.log('Applying data filters');
}

function applySecurityFilters() {
    // Implement filter logic for security events
    console.log('Applying security filters');
}

function applyReportFilters() {
    // Implement filter logic for reports
    console.log('Applying report filters');
}

// Show overview by default
showContent('overview');