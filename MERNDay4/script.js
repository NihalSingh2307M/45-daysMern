const skills = [
  { name: 'HTML', proficiency: 'Intermediate' },
  { name: 'CSS', proficiency: 'Intermediate' },
  { name: 'JavaScript', proficiency: 'Intermediate' },
  { name: 'React', proficiency: 'Beginner' },
];

function changeBackground(index) {
  document.querySelectorAll('.background-image').forEach(img => {
    img.classList.add('hidden');
  });
  
  const targetBg = document.getElementById(`bg-${index}`);
  if (targetBg) {
    targetBg.classList.remove('hidden');
  }
}


function updateSlideContent() {
  const slides = document.querySelectorAll('.swiper-slide');
  slides.forEach((slide, index) => {
    if (skills[index]) {
      const titleElement = slide.querySelector('h3');
      const proficiencyElement = slide.querySelector('.proficiency');
      
      if (titleElement) titleElement.textContent = skills[index].name;
      if (proficiencyElement) proficiencyElement.textContent = skills[index].proficiency;
    }
  });
}

// Using Swiper for slide animation
const swiper = new Swiper('.swiper', {
  loop: true,
  autoplay: { delay: 4000, disableOnInteraction: false },
  pagination: { el: '.swiper-pagination', clickable: true },
  navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
  speed: 600,
  on: {
    slideChange: function () { changeBackground(this.realIndex); },
    init: function() { 
      changeBackground(0);
      updateSlideContent(); // Update content when swiper initializes
    }
  }
});
