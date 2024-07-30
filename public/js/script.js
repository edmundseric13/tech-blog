document.addEventListener('DOMContentLoaded', () => {

    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    console.log('Script loaded successfully');
});

function formatDate(date) {
    return new Date(date).toLocaleDateString();
}