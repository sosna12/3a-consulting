// Typing Effect
const words = [
  "Reporting Channels Hotline: +251-910 120 305",
  "Reporting Channels — You can confidentially or anonymously report suspicious activities",
  "Reporting Channels via Email: Awoke@3aconsulting.com",
];

let i = 0;
let j = 0;
let currentWord = "";
let isDeleting = false;

function typeEffect(){

currentWord = words[i];

if(isDeleting)
{
document.querySelector(".typing").textContent =
currentWord.substring(0, j--);
}
else
{
document.querySelector(".typing").textContent =
currentWord.substring(0, j++);
}

if(!isDeleting && j === currentWord.length)
{
isDeleting = true;
setTimeout(typeEffect,1000);
return;
}

if(isDeleting && j === 0)
{
isDeleting = false;
i++;

if(i === words.length)
{
i = 0;
}
}

setTimeout(typeEffect,100);

}

typeEffect();

window.addEventListener("scroll", function(){

const skillsSection = document.querySelector("#skills");

const progressBars = document.querySelectorAll(".progress-bar");

const sectionTop = skillsSection.offsetTop;

const screenPosition = window.pageYOffset + window.innerHeight;

if(screenPosition > sectionTop)
{

progressBars.forEach(function(bar){

bar.style.width = bar.getAttribute("data-width");

});

}

});