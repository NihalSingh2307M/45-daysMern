const QUOTES_API_KEY = 'oTKWD7uOmKS3g6HWjF/Apg==DocflHt9O6G1kAxy';
const PEXELS_API_KEY = 'BdLairY7294Cbh15kTC25VcFJtkHh2VskkbCGdZfc4J5Nc1sqXJH0PV6';

const quote = document.getElementById('quote');
const author = document.getElementById('author');
const video = document.getElementById('bg-video');
const btn = document.querySelector('button');

async function getQuote() {
    quote.textContent = 'Loading...';
    author.textContent = '';
    
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes', {
            headers: {
                'X-Api-Key': QUOTES_API_KEY
            }
        });
        
        const data = await response.json();
        
        quote.textContent = data[0].quote;
        author.textContent = data[0].author;
    } catch (error) {
        quote.textContent = 'Failed to load quote. Try again!';
        author.textContent = '';
    }
}


function scaleUp() {
    btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
            scale: 1.1,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
            scale: 1,
            duration: 0.8,
            ease: "power2.out"
        });
    });
}

scaleUp();

window.onload = function() {
    getQuote();
};