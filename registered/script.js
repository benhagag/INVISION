document.addEventListener('DOMContentLoaded', function() {
    // Simulate setting the username (in a real app, this would come from the server or local storage)
    const username = "שם משתמש";
    document.getElementById('username').textContent = username;

    // Add event listeners to buttons
    document.getElementById('createContent').addEventListener('click', function() {
        alert('מעביר אותך ליצירת תוכן...');
        // Here you would typically redirect to the content creation page
        // window.location.href = '/create-content';
    });

    document.getElementById('startCampaign').addEventListener('click', function() {
        alert('מעביר אותך להתחלת קמפיין...');
        // Here you would typically redirect to the campaign start page
        // window.location.href = '/start-campaign';
    });
});