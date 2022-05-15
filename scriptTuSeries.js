//BOTONES
const botonNueva = document.getElementById("botonNueva");
const botonEditar = document.getElementById("botonEditar");
const botonMas= document.getElementById("botonMas");
const botonMenos= document.getElementById("botonMenos");
const botonCrear= document.getElementById("botonCrear");
const botonAceptar= document.getElementById("botonAceptar");
const botonCancelar= document.getElementById("botonCancelar");
const botonBuscar = document.getElementById("botonBuscar")
const botonCancelarEd = document.getElementById("botonCancelarEd")

//BOTON CREAR SERIE DE MODEL
botonCrear.addEventListener("click", function(){
    verificarDatosYAgregar();
})


function verificarDatosYAgregar(){
    var nombreSerie = document.getElementById("nombreAgregar").value;
    var temporadas = document.getElementById("temporadasAgregar").value;

    if (nombreSerie == "" || temporadas == ""){
        alert("Todos los campos son necesarios...")
        return false
    } else if (isNaN(temporadas)){
        alert("'Temporadas' debería ser un número")
        return false
    } else if (temporadas < 1) {
        alert("El número de 'temporadas' debe ser mayor que 0")
        return false
    }

    crearSerie(nombreSerie, temporadas)
    botonCancelar.click()
    
}

function crearSerie(nombre, temporadas){
    var tBody = document.querySelector("tbody");

    var filaNueva = document.createElement("tr");

    var celda1 = document.createElement("td");
    var celda2 = document.createElement("td");
    var celda3 = document.createElement("td");
    var celda4 = document.createElement("td");
    var celda5 = document.createElement("td");

    var celdas = [celda1, celda2, celda3, celda4, celda5]

    tBody.appendChild(filaNueva);
    
    celda2.innerHTML = nombre.toUpperCase()
    celda3.innerHTML = temporadas
    celda4.innerHTML = 0
    celda5.innerHTML = 0 + "%"

    for (let i = 0; i < celdas.length; i++) {
        filaNueva.appendChild(celdas[i]);
    }
}

//BUSCADOR
var tabla = document.getElementById("datos")
var buscador = document.getElementById("buscador");

const filtrar = function(){
    const texto = buscador.value.toLowerCase();

    for(let i = 1; i < tabla.rows.length; i++){
        let found = false;
        const celdasDeLaFila = tabla.rows[i].querySelectorAll("td");
        const compararCon = celdasDeLaFila[1].textContent.toLowerCase();

        if(compararCon.indexOf(texto) !== -1){
            found = true;
        }

        if(found){
            tabla.rows[i].style.display = '';
        } else {
            tabla.rows[i].style.display = 'none';
        }

    }
}

buscador.addEventListener("keyup", filtrar)
botonBuscar.addEventListener("click", filtrar)


//SELECCIONAR FILA
var filaSeleccionada = document.querySelector(".filaSecundaria")

var seleccionar = function(){
    for(let i = 1; i < tabla.rows.length; i++){
        tabla.rows[i].addEventListener("click", function(){
            if(filaSeleccionada != null){
                filaSeleccionada.classList.remove("filaSecundaria")
            }

            tabla.rows[i].classList.toggle("filaSecundaria")
            filaSeleccionada = tabla.rows[i]
            
        })
    
    }
}

tabla.addEventListener("click", seleccionar)


//BOTON MAS Y MENOS (AGREGAR/SACAR UNA TEMPORADA)

botonMas.addEventListener("click", function(){

    if(filaSeleccionada == null){
        alert("No hay una fila seleccionada")
    } else {
        var celdasFilaSelecc = filaSeleccionada.querySelectorAll("td");
        var num = parseInt(celdasFilaSelecc[3].innerHTML) + 1;
    
        if(num <= parseInt(celdasFilaSelecc[2].innerHTML)){
            celdasFilaSelecc[3].innerHTML = num
        } else {
            alert("No se puede agregar, supera la totalidad de temporadas de la serie")
        }

        modificarPorcentaje(celdasFilaSelecc)
    }
    
})

botonMenos.addEventListener("click", function(){

    if(filaSeleccionada == null){
        alert("No hay una fila seleccionada")
    } else {
        var celdasFilaSelecc = filaSeleccionada.querySelectorAll("td");
        var num = parseInt(celdasFilaSelecc[3].innerHTML) - 1;
    
        if(num >= 0){
            celdasFilaSelecc[3].innerHTML = num
        } else {
            alert("Las temporadas no pueden ser negativas")
        }

        modificarPorcentaje(celdasFilaSelecc)
    }
})


function modificarPorcentaje(celdas){
    var numCelda = parseInt(celdas[3].innerHTML)
    var porcentaje = 
        (numCelda * 100) / parseInt(celdas[2].innerHTML)

    celdas[4].textContent = porcentaje.toFixed(2) + "%"
}


//BOTON EDITAR SERIE DE MODEL
botonAceptar.addEventListener("click", function(){
    verificarDatosYEditar();
})


function verificarDatosYEditar(){
    var nombreSerie = document.getElementById("nombreEditar").value;
    var temporadas = document.getElementById("temporadasEditar").value;
    var temporadasVistas = document.getElementById("vistas").value;

    if (nombreSerie == "" || temporadas == "" || temporadasVistas == ""){
        alert("Todos los campos son necesarios...")
        return false
    } else if (isNaN(temporadas) || isNaN(temporadasVistas)){
        alert("'Temporadas' o 'Temporadas Vistas' debería ser un número")
        return false
    } else if (temporadas < 0 || temporadasVistas < 0 ) {
        alert("El número de 'temporadas' o 'temporadas vistas' debe ser mayor que 0")
        return false
    } else if (temporadasVistas > temporadas){
        alert("Las temporadas vistas no pueden ser mayor al número de temporadas")
        return filaSeleccionada
    } else if(filaSeleccionada == null){
        alert("Ups!! No hay ninguna serie seleccionada")
    } else{
        editarSerie(nombreSerie, temporadas, temporadasVistas)
        botonCancelarEd.click()   
    }
    
}

function editarSerie(nombre, temporadas, vistas){
    var celdasFilaSelecc = filaSeleccionada.querySelectorAll("td");

    celdasFilaSelecc[1].textContent = nombre
    celdasFilaSelecc[2].textContent = temporadas
    celdasFilaSelecc[3].textContent = vistas

    modificarPorcentaje(celdasFilaSelecc)
    
}