const stars = document.querySelectorAll('.stars label');
let selectedValue = 0;

stars.forEach(star => {
    star.addEventListener('mouseover', () => {
        const value = parseInt(star.getAttribute('data-value'));
        highlightStars(value);
    });

    star.addEventListener('mouseout', () => {
        highlightStars(selectedValue);
    });

    star.addEventListener('click', () => {
        selectedValue = parseInt(star.getAttribute('data-value'));
        highlightStars(selectedValue);
        document.getElementById(`estrela${selectedValue}`).checked = true;
    });
});

function highlightStars(rating) {
    stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        star.style.color = value <= rating ? 'gold' : '#d1d5db';
        star.style.transform = value <= rating ? 'scale(1.2)' : 'scale(1)';
    });
}