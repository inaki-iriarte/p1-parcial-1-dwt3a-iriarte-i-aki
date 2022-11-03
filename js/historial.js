const contenedor = document.querySelector('#listado');
const servidor = 'https://pokeapi.co/api/v2/pokemon/';
const volver = document.querySelector('#volver');
const vaciar = document.querySelector('#vaciar');

function contenido(){
    contenedor.innerHTML = '';
    let p = document.createElement('p');
    p.className = 'aviso';
    p.innerHTML = 'Ningún pokémon visto recientemente';
    contenedor.append(p);
}

window.addEventListener('load', function(){
    if (localStorage.vistos){
        contenedor.innerHTML = '';
    } else {
        contenido();
    }
});


volver.addEventListener('click', () => {
    location.href = 'index.html';
})

vaciar.addEventListener('click', () => {
    localStorage.clear();
    contenido();
})

if (localStorage.vistos) {
    let cache = localStorage.vistos;
    let arrayCache = JSON.parse(cache);

    arrayCache.forEach(pokemon => {
        const endPoint = servidor + pokemon;
        
        fetch(endPoint)
        .then(respuesta => {
            return respuesta.json();
        })
        .then(respuestaJSON => {
            let datos = respuestaJSON;
            renderizar(datos);
        })
    
        function renderizar(poke){
            //Card
            let div = document.createElement('div');
            div.className = 'card';
            let h4 = document.createElement('h4');
            let img = document.createElement('img');
            let a = document.createElement('a');
    
            img.src = `${poke.sprites.other.dream_world.front_default}`;
            img.alt = `${poke.name}`;
            h4.innerHTML = `${poke.name}`;
    
            a.href = `detalles.html?id=${pokemon.name}`;
            a.innerHTML = 'Ver detalles';
            a.id = `${pokemon.name}`;
    
            div.append(h4, img, a);
            contenedor.append(div);
        }
    });
}
