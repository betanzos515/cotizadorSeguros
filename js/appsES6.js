const selectAnios = document.querySelector('#anio');
const formulario = document.querySelector('form');


class Seguro{
    constructor(marca,anio,tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    calcular(){
        /*
            1 = americano 1.15
            2 = asiatico 1.05
            3 = europeo 1.35
        */
        let cantidad 
        const base = 2000;
    
        switch(this.marca){
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }
        const diferencia = new Date().getFullYear() - this.anio;
        cantidad -= ((diferencia * 3)* cantidad) /100 ;
        /*
            Si el seguro es básico se multiplicar por 30%
            Si el seguro es completo 50%
        */
       if(this.tipo === 'basico'){
           cantidad *= 1.30;
       }
       else{
           cantidad *= 1.50;
       }
    
        return cantidad.toFixed(2);
    }
}



//Todo lo que se muestra
class Interfaz{

    mostrarError(mensaje,tipo){
        const div = document.createElement('div');
        if(tipo === 'error'){
            div.classList = 'error';
        }else{
            div.classList = 'correcto';
        }
        div.innerHTML = `${mensaje}`;
        //insert before toma dos parametros, el primero es el elemento que quieres insertar el segundo del cual se insertará antes
        formulario.insertBefore(div,document.querySelector('.form-group'));
        setTimeout(()=>{
            div.remove();
        },2000);
    }

    mostrarResultado(seguro, cantidad){
        const resultado = document.querySelector('#resultado');
        let marca ;
    
        switch(seguro.marca){
            case '1' : 
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3' :
                marca = 'Europeo';
                break
        }
        const div = document.createElement('div');
        div.innerHTML = `
            <p class="header">Tu resumen:
            <p>Marca : ${marca}
            <p>Anio : ${seguro.anio}
            <p>Tipo : ${seguro.tipo}
            <p>Total : ${cantidad}
        `;
        
        const mostrar = document.querySelector('#cargando');
        const imagen = mostrar.querySelector('img');
        imagen.style.display = 'block';
        setTimeout(()=>{
            imagen.style.display = 'none';
            resultado.appendChild(div);    
        },2000);
    }

}

//Listeners
document.addEventListener('DOMContentLoaded',function(){
    llenarAnio();
});

formulario.addEventListener('submit',function(e){
    e.preventDefault();
    const marca = document.querySelector('#marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    const anio = document.querySelector('#anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //instanciamos interfaz
    const interfaz = new Interfaz();
    //revisamos que los campos no esten vacios.
    if(marcaSeleccionada === '' || anioSeleccionado === '' || tipo === ''){
        //interfaz imprimiendo un error
        interfaz.mostrarError('Faltan datos, revisa el formulario y prueba de nuevo','error');
    }
    else{
        interfaz.mostrarError('Correcto cotizando ...','correcto');
        // removemos resultados anteriores
        borrarResultados();
        //instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada,anioSeleccionado,tipo);
        const cantidad = seguro.calcular();
        //mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
    }    
});


// funciones

function borrarResultados(){
    const resultados = document.querySelector('#resultado div');
        if(resultados != null)
        resultados.remove();
}


function llenarAnio(){
    const max = new Date().getFullYear();
    const min = max - 20 ;
    for(let i = max ; i >= min ; i--){
        let option = document.createElement('option');
        option.value = i;
        option.innerHTML = i;
        selectAnios.appendChild(option);
    } 
}