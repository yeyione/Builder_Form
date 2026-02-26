export class BuilderForm {
    constructor() {
        this.html = "";
    }

    addFieldName(placeholder = "Nombre(s)") {
        this.html += `
            <div class="mb-3">
                <label for="field-name" class="form-label">Nombre(s)</label>
                <input id="field-name" type="text" class="form-control" placeholder="${placeholder}" data-required="true">
            </div>`;
        return this;
    }

    addFielLastName(placeholder = "Apellidos") {
        this.html += `
            <div class="mb-3">
                <label for="field-last-name" class="form-label">Apellidos</label>
                <input id="field-last-name" type="text" class="form-control" placeholder="${placeholder}" data-required="true">
            </div>`;
        return this;
    }

    addFieldEmail(placeholder = "Correo Electrónico") {
        this.html += `
            <div class="mb-3">
                <label for="field-email" class="form-label">Correo Electrónico</label>
                <input id="field-email" type="email" class="form-control" placeholder="${placeholder}" data-required="true">
            </div>`;
        return this;
    }

    addFieldPhone(placeholder = "Teléfono") {
        this.html += `
            <div class="mb-3">
                <label for="field-telefono" class="form-label">Teléfono</label>
                <input id="field-telefono" type="text" class="form-control" placeholder="${placeholder}" data-required="true">
            </div>`;
        return this;
    }

    addFieldAddress(placeholder = "Domicilio") {
        this.html += `
            <div class="mb-3">
                <label for="field-domicilio" class="form-label">Domicilio</label>
                <input id="field-domicilio" type="text" class="form-control" placeholder="${placeholder}" data-required="true">
            </div>`;
        return this;
    }

    addList(items = []) {
        var optionsHtml = items.map(item => `<option value="${item}">${item}</option>`).join("");
        this.html += `
            <div class="mb-3">
                <label class="form-label">Selecciona una opción</label>
                <select class="form-select" data-required="true">
                    <option value="" disabled selected>-- Elige una opción --</option>
                    ${optionsHtml}
                </select>
            </div>`;
        return this;
    }

    addSurveyTitle(title = "Encuesta") {
        this.html += `
            <div class="mb-3">
                <p class="text-muted fst-italic">${title}</p>
                <hr>
            </div>`;
        return this;
    }

    addMultipleChoice(question = "", options = []) {
        var name = question.replace(/\s/g, '_').replace(/[^a-zA-Z0-9_]/g, '');
        var optionsHtml = options.map((opt, i) => `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="${name}" id="${name}_${i}" value="${opt}">
                <label class="form-check-label" for="${name}_${i}">${opt}</label>
            </div>`).join("");
        this.html += `
            <div class="mb-4" data-required-radio="${name}">
                <label class="form-label fw-bold">${question}</label>
                ${optionsHtml}
            </div>`;
        return this;
    }

    addButton(id = "btn-action-form", label = "Enviar") {
        this.html += `<button id="${id}" class="btn btn-success w-100 mt-2">${label}</button>`;
        return this;
    }

    build() {
        var result = this.html;
        this.html = "";
        return result;
    }
}