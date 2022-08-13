export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =
            "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =
            mostrarMensajeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio.",
    },
    email: {
        valueMissing: "Este campo email no puede estar vacio.",
        typeMismatch: "El correo no es valido",
    },
    password: {
        valueMissing: "Este campo password no puede estar vacio.",
        patternMismatch:
            "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
    },
    nacimiento: {
        valueMissing: "Este campo nacimiento no puede estar vacio.",
        customError: "debes tener al menos 18 anhos de Edad",
    },
    numero: {
        valueMissing: "Este campo numero no puede estar vacio.",
        patternMismatch: "El formato requeridoes: (XXXXXXXXXX) 10 numeros",
    },
    direccion: {
        valueMissing: "Este campo direccion no puede estar vacio.",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres",
    },
    ciudad: {
        valueMissing: "Este campo ciudad no puede estar vacio.",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres",
    },
    estado: {
        valueMissing: "Este campo estado no puede estar vacio.",
        patternMismatch: "La estado debe contener entre 10 a 40 caracteres",
    },
};

const validadores = {
    nacimiento: (input) => validarNacimineto(input),
};

function mostrarMensajeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}

function validarNacimineto(input) {
    const fechaCliente = input.value;
    const fechaMayorEdad = moment(fechaCliente).add(18, "y");
    let mensaje = "";
    if (!mayorDeEdad(fechaMayorEdad)) {
        mensaje = "debes tener al menos 18 anhos de Edad";
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = moment();
    const fechaMayorEdad = moment(fecha);
    const diferenciaEdades = fechaActual.diff(fechaMayorEdad, "days");
    return diferenciaEdades >= 0;
}
