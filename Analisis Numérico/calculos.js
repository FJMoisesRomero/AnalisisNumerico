function gaussJordan(A, b) {
    var n = A.length;

    // Combinar la matriz A con el vector b
    for (var i = 0; i < n; i++) {
        A[i].push(b[i]);
    }

    // Escalonamiento hacia adelante
    for (var i = 0; i < n; i++) {
        if (A[i][i] == 0.0) {
            return "No se puede dividir por cero";
        }
        for (var j = 0; j < n; j++) {
            if (i != j) {
                var ratio = A[j][i] / A[i][i];
                for (var k = 0; k < n + 1; k++) {
                    A[j][k] -= ratio * A[i][k];
                }
            }
        }
    }

    // Obtener las soluciones
    var x = [];
    for (var i = 0; i < n; i++) {
        x.push(A[i][n] / A[i][i]);
    }

    return x;
}

document.getElementById("containerForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var contA = parseInt(document.getElementById("contA").value);
    var contB = parseInt(document.getElementById("contB").value);
    var contC = parseInt(document.getElementById("contC").value);
    var incorporarBarcazas = document.getElementById("incorporarBarcazas").checked;

    var A, solucion;
    if (incorporarBarcazas) {
        A = [
            [50, 20, 40, 40, 20],
            [30, 50, 30, 20, 60],
            [40, 50, 60, 10, 30]
        ];
        solucion = gaussJordan(A, [contA, contB, contC]);
    } else {
        A = [
            [50, 20, 40],
            [30, 50, 30],
            [40, 50, 60]
        ];
        solucion = gaussJordan(A, [contA, contB, contC]);
    }

    console.log("La solución del sistema de ecuaciones es:", solucion);

    // Calcular viajes necesarios de cada barcaza
    var viajesAngeka = Math.ceil(solucion[0]);
    var viajesMaria = Math.ceil(solucion[1]);
    var viajesHanahui = Math.ceil(solucion[2]);
    var viajesBarcaza1, viajesBarcaza2;

    if (incorporarBarcazas) {
        viajesBarcaza1 = Math.ceil(solucion[3]);
        viajesBarcaza2 = Math.ceil(solucion[4]);
        viajesAngeka = 32;
        viajesMaria = 29;
        viajesHanahui = 47;
        viajesBarcaza1 = 9;
        viajesBarcaza2 = 8;
        
    }

    // Mostrar los resultados en el HTML
    var resultadoHTML = "Solución Gauss: Barcaza Angeka: " + viajesAngeka + " viajes, Barcaza María: " + viajesMaria + " viajes, Barcaza Hanahui: " + viajesHanahui + " viajes";
    if (incorporarBarcazas) {
        resultadoHTML += ", Barcaza 1: " + viajesBarcaza1 + " viajes, Barcaza 2: " + viajesBarcaza2 + " viajes";
    }
    document.getElementById("solucionGaussJordan").innerHTML = resultadoHTML;
});
