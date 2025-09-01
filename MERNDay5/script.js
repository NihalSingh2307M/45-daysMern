let card = document.querySelector(".card-container");
let main = document.querySelector(".main");
let themeSwitch = document.querySelector(".theme-switch__checkbox");
let isDark = false;

function scaleUp(){
  card.addEventListener("mouseenter",()=>{
    gsap.to(card,{
        scale:1.1,
        duration:0.8,
        ease:"power2.out"
    });
  })

  card.addEventListener("mouseleave",()=>{
    gsap.to(card,{
        scale:1,
        duration:0.8,
        ease:"power2.out"
    });
  });
}


function initThemeSwitch() {
    themeSwitch.addEventListener('change', () => {
        isDark = themeSwitch.checked;
        
        if (isDark) {
            gsap.to(main, {
                background: "rgb(29, 31, 44)",
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(card, {
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                borderColor: "rgba(255, 255, 255, 0.1)",
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(".name", {
                color: "#60a5fa",
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(".description", {
                color: "#d1d5db",
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(".social-link", {
                backgroundColor: "rgba(96, 165, 250, 0.1)",
                borderColor: "rgba(96, 165, 250, 0.3)",
                color: "#60a5fa",
                duration: 0.6,
                ease: "power2.out"
            });
            
        } else {
            gsap.to(main, {
                background: "rgb(95, 110, 133)",
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(card, {
                backgroundColor: "rgba(255, 255, 255, 0.162)",
                borderColor: "rgba(0, 0, 0, 0.05)",
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(".name", {
                color: "#1e40af",
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(".description", {
                color: "#374151",
                duration: 0.6,
                ease: "power2.out"
            });
            
            gsap.to(".social-link", {
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                borderColor: "rgba(59, 130, 246, 0.3)",
                color: "#1e40af",
                duration: 0.6,
                ease: "power2.out"
            });
        }
    });
}

scaleUp();
initThemeSwitch();