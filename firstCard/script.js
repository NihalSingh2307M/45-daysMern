let card = document.querySelector("#card-container");

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

scaleUp();