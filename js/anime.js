// Select all tab buttons and tab content sections
const tabs = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Add click event to each tab
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Hide all tab contents
        tabContents.forEach(c => c.classList.remove('active'));

        // Show the selected tab content
        const target = tab.dataset.tab;
        document.getElementById(target).classList.add('active');
    });
});

