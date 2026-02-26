import { BuilderForm } from './BuilderForm.js';

var mainContent = document.getElementById("mainContent");
var formTitle   = document.getElementById("formTitle");
var builder     = new BuilderForm();
var currentForm = 1;
var totalForms  = 3;

var formTitles = {
    1: "Datos Básicos",
    2: "Datos Completos",
    3: "Experiencia de Usuario"
};



function validateCurrentForm() {
    var isValid = true;


    mainContent.querySelectorAll("[data-required='true']").forEach(field => {
        if (!field.value.trim()) {
            field.classList.add("field-error");
            isValid = false;
        } else {
            field.classList.remove("field-error");
        }
        field.addEventListener("input",  () => field.classList.remove("field-error"), { once: true });
        field.addEventListener("change", () => field.classList.remove("field-error"), { once: true });
    });

    mainContent.querySelectorAll("[data-required-radio]").forEach(group => {
        var name    = group.getAttribute("data-required-radio");
        var checked = group.querySelector(`input[name="${name}"]:checked`);
        if (!checked) {
            group.classList.add("radio-error");
            isValid = false;
        } else {
            group.classList.remove("radio-error");
        }
    });

    return isValid;
}

function shakeForm() {
    var card = document.getElementById("formCard");
    card.classList.remove("shake");
    void card.offsetWidth; 
    card.classList.add("shake");
    card.addEventListener("animationend", () => card.classList.remove("shake"), { once: true });
}



function createForm1() {
    mainContent.innerHTML = builder
        .addFieldName("Ej. Juan Carlos")
        .addFielLastName("Ej. García López")
        .addFieldEmail("Ej. juan@correo.com")
        .addButton("btn-submit-1", "Guardar datos")
        .build();
}

function createForm2() {
    mainContent.innerHTML = builder
        .addFieldName("Ej. Juan Carlos")
        .addFielLastName("Ej. García López")
        .addFieldPhone("Ej. 55 1234 5678")
        .addFieldEmail("Ej. juan@correo.com")
        .addFieldAddress("Ej. Av. Principal #123")
        .addList(["Ciudad de México", "Guadalajara", "Monterrey", "Puebla", "Otra"])
        .addButton("btn-submit-2", "Crear y acceder")
        .build();
}

function createForm3() {
    mainContent.innerHTML = builder
        .addSurveyTitle("Queremos conocer tu experiencia con nosotros")
        .addMultipleChoice("¿Cómo calificarías tu experiencia general?", ["Excelente", "Buena", "Regular", "Mala"])
        .addMultipleChoice("¿Qué tan fácil fue usar la plataforma?",     ["Muy fácil", "Fácil", "Difícil", "Muy difícil"])
        .addMultipleChoice("¿Volverías a usar nuestro servicio?",         ["Definitivamente sí", "Probablemente sí", "Probablemente no", "No"])
        .addMultipleChoice("¿Recomendarías este servicio?",               ["Sí, sin dudarlo", "Tal vez", "Probablemente no", "No"])
        .addButton("btn-submit-survey", "Enviar encuesta")
        .build();
}



function loadForm(num, skipValidation = false) {
    if (!skipValidation && num > currentForm) {
        if (!validateCurrentForm()) {
            shakeForm();
            return;
        }
    }

    currentForm = num;
    formTitle.textContent = formTitles[num];
    document.getElementById("currentNum").textContent = num;

    if (num === 1) createForm1();
    else if (num === 2) createForm2();
    else if (num === 3) createForm3();

    updateButtons();
}

function updateButtons() {
    var btnPrev = document.getElementById("btn-prev");
    var btnNext = document.getElementById("btn-next");
    btnPrev.disabled = currentForm === 1;
    btnNext.disabled = currentForm === totalForms;
}

document.getElementById("btn-prev").addEventListener("click", () => loadForm(currentForm - 1, true));
document.getElementById("btn-next").addEventListener("click", () => loadForm(currentForm + 1));

loadForm(1, true);