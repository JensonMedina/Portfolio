const sections = document.querySelectorAll('.section');
const sectBtns = document.querySelectorAll('.controlls');
const sectBtn = document.querySelectorAll('.control');
const allSections = document.querySelector('.main-content');
const english = document.getElementById('en');
const español = document.getElementById('es');

let placeholders ={
    "input-name":{
        "en": " YOUR NAME",
        "es": "TU NOMBRE"
    },
    "input-email":{
        "en": "YOUR EMAIL",
        "es": "TU CORREO"
    },
    "input-subject":{
        "en": "ENTER SUBJECT",
        "es": "ASUNTO"
    },
    "txt-msg":{
        "en": "MESSAGE HERE",
        "es": "ESCRIBA SU MENSAJE"
    }
}


//Cambiar la clase active cuando se pasa a otra pagina
function PageTransitions(){
    //Escuchar click en botones
    for(let i = 0; i < sectBtn.length; i++){
        sectBtn[i].addEventListener('click', function(){
            let currentBtn = document.querySelectorAll('.active-btn');
            currentBtn[0].className = currentBtn[0].className.replace('active-btn', '');
            this.className += ' active-btn';
        })
    }
    //section active className
    allSections.addEventListener("click", (e)=>{
        const id = e.target.dataset.id;
        if(id){
            //remove selected from the other sectBtns
            sectBtns.forEach((btn)=>{
                btn.classList.remove('active');
            })
            e.target.classList.add('active');
            //hide other sections
            sections.forEach((section)=>{
                section.classList.remove('active');
            })
            const element = document.getElementById(id);
            element.classList.add('active');
        }
    })

    //toggle theme
    const themeBtn = document.querySelector('.theme-btn');
    themeBtn.addEventListener('click',()=>{
        let element = document.body;
        element.classList.toggle('light-mode');
    })

//change language
const changeLanguage = async (language)=>{
    const requestJson = await fetch(`./languages/${language}.json`);
    const texts = await requestJson.json();
    const textsToChange = document.querySelectorAll("[data-section]");
    for(const textToChange of textsToChange){
        const section = textToChange.dataset.section;
        const value = textToChange.dataset.value;
        textToChange.innerHTML = texts[section][value];
    }
    for (const [key, value] of Object.entries(placeholders)) {
        const placeholder = value[language];
        const element = document.querySelector(`[class=${key}]`);
        element.setAttribute("placeholder", placeholder);
    }
  }
 
//change inactive class
let banEn = false;
let banEs = true;
function changeInactiveClass(){
    if(banEn){
        english.classList.add('inactive');
        español.classList.remove('inactive');
        banEn = false;
        banEs = true;
    }else if(banEs){
        español.classList.add('inactive');
        english.classList.remove('inactive');
        banEs = false;
        banEn = true;
    }
}


//listen click on language
english.addEventListener('click', (e)=>{
    changeLanguage(e.target.id)
    changeInactiveClass();
})
español.addEventListener('click', (e)=>{    
    changeLanguage(e.target.id)
    changeInactiveClass();
})

}
PageTransitions();



