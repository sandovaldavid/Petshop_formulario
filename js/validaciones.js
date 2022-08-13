export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validadores[tipoDeInput]) {
        validadores[tipoDeInput](input);
    }
}

const validadores = {
    nacimiento: (input) => validarNacimineto(input),
};

function validarNacimineto(input) {
    const fechaCliente = input.value;
    const fechaMayorEdad = moment(fechaCliente).add("y", 18);
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
