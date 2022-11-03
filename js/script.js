const contenedor = document.querySelector('#listado');
const servidor = 'https://pokeapi.co/api/v2/pokemon';
const historial = document.querySelector('#historial');

historial.addEventListener('click', () => {
    location.href = 'historial.html';
})

//Al cargar la página se realiza el fetch a la API y se renderizan los pokémon
window.addEventListener('load', function(){
    const endPoint = servidor + '?limit=100';

    fetch(endPoint)
    .then(respuesta => {
        return respuesta.json();
    })
    .then(respuestaJSON => {
        let datos = respuestaJSON.results;
        renderizar(datos);
    })
})

function renderizar(lista){
    lista.forEach(pokemon => {
        //Se crea cada card
        let div = document.createElement('div');
        div.className = 'card';
        let h4 = document.createElement('h4');
        let img = document.createElement('img');
        let a = document.createElement('a');

        //Fetch a la url que conseguimos de cada pokemon para poder obtener la imagen
        const endPoint = pokemon.url;
        fetch(endPoint)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJSON => {
            let url = respuestaJSON.sprites.other.dream_world.front_default;
            img.src = url;
        })

        //Se asigna el resto de la info
        h4.innerHTML = `${pokemon.name}`;
        img.alt = `${pokemon.name}`;
        a.href = `detalles.html?id=${pokemon.name}`;
        a.innerHTML = 'Ver detalles';
        a.id = `${pokemon.name}`;
        div.append(h4, img, a);
        contenedor.append(div);
    });
}

//Buscador
const contenedorError = document.querySelector('#error');
const input = document.querySelector('#buscador');
input.addEventListener('keyup', async function(e){
    //Cuando se presiona enter en el buscador se busca ese pokémon por su nombre
    if (e.key === 'Enter' && (input.value).length > 0 && input.value != " ") {

        //Si ya hay un mensaje de error se quita
        if (contenedorError.firstElementChild) {
            let mensaje = contenedorError.firstElementChild;
            mensaje.remove();
        }

        let buscando = input.value;
        const endPoint = servidor + '/' + buscando.toLowerCase();
        let objeto;
        await fetch(endPoint)
        .then(respuesta => {
            if (respuesta.ok) {
                return respuesta.json();
            } else {
                let p = document.createElement('p');
                p.innerHTML = 'No se encontró ese pokémon';
                contenedorError.append(p);
                throw new Error(respuesta.status);
            }
        })
        .then(pokemon => {
            objeto = pokemon;
        })

        //Si la respuesta recibida que se guardo en la variable objeto es verdaderamente un objeto y no es un null, se muestra la card de ese pokémon
        if (typeof objeto === 'object' && objeto !== null) {
            contenedor.innerHTML = '';
            let div = document.createElement('div');
            div.className = 'card';
            let h4 = document.createElement('h4');
            let img = document.createElement('img');
            let a = document.createElement('a');

            h4.innerHTML = `${objeto.name}`;
            img.alt = `${objeto.name}`;
            img.src = `${objeto.sprites.other.dream_world.front_default}`;
            a.href = `detalles.html?id=${objeto.name}`;
            a.innerHTML = 'Ver detalles';
            a.id = `${pokemon.name}`;
            div.append(h4, img, a);
            contenedor.append(div);
        }
    }
    
    //Cuando se borra el contenido del buscador regresa la lista completa
    if (e.key === 'Backspace' && input.value == ''){
        if (contenedorError.firstElementChild) {
            let mensaje = contenedorError.firstElementChild;
            mensaje.remove();
        }
        contenedor.innerHTML = '';
        const endPoint = servidor + '?limit=100';
        fetch(endPoint)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJSON => {
            let datos = respuestaJSON.results;
            renderizar(datos);
        })
    }
})

//Historial
//Array con el nombre del pokémon visto
let vistos = [];
//Función para agregar el pokémon al array, al darle click a ver detalles, y guardarlo en local storage
function obtenerBtnDetalles(){
    let botones = document.querySelectorAll('a');
    botones.forEach(boton => {
        boton.addEventListener('click', function(e){
            let id = e.target.id;
            vistos.push(id);
            let vistosString = JSON.stringify(vistos);
            if (localStorage){
                localStorage.clear();
                localStorage.setItem('vistos', vistosString);
            } else {
                localStorage.setItem('vistos', vistosString);
            }
        })
    });
}
//Se ejecuta la función 1,5 segundos después, para que cargue el listado de pokémon
setTimeout(obtenerBtnDetalles, 1500);