const btn = document.querySelector('button');
const contenedor = document.querySelector('#listado');
const titulo = document.querySelector('h1');
const servidor = 'https://pokeapi.co/api/v2/pokemon/';
let url = location.search;
let id = location.search.split('=')[1];

btn.addEventListener('click', () => {
    location.href = 'index.html';
})

const endPoint = servidor + id;

fetch(endPoint)
.then(respuesta => {
    return respuesta.json();
})
.then(respuestaJSON => {
    let datos = respuestaJSON;
    renderizar(datos);
})

function renderizar(pokemon){
    titulo.innerHTML = `${pokemon.name}`;
    //Card
    let div = document.createElement('div');
    div.className = 'card-detalle';
    let h4 = document.createElement('h4');
    let img = document.createElement('img');
    //Nombre e imagen
    img.src = `${pokemon.sprites.other.dream_world.front_default}`;
    img.alt = `${pokemon.name}`;
    h4.innerHTML = `${pokemon.name}`;

    let ul = document.createElement('ul');
    //Vida
    let li1 = document.createElement('li');
    let span1 = document.createElement('span');
    li1.innerHTML = 'HP: ';
    span1.innerHTML = `${pokemon.stats[0].base_stat}`;
    li1.append(span1);
    //Ataque
    let li2 = document.createElement('li');
    let span2 = document.createElement('span');
    li2.innerHTML = 'Ataque: ';
    span2.innerHTML = `${pokemon.stats[1].base_stat}`;
    li2.append(span2);
    //Defensa
    let li3 = document.createElement('li');
    let span3 = document.createElement('span');
    li3.innerHTML = 'Defensa: ';
    span3.innerHTML = `${pokemon.stats[2].base_stat}`;
    li3.append(span3);
    //Ataque especial
    let li4 = document.createElement('li');
    let span4 = document.createElement('span');
    li4.innerHTML = 'Ataque especial: ';
    span4.innerHTML = `${pokemon.stats[3].base_stat}`;
    li4.append(span4);
    //Defensa especial
    let li5 = document.createElement('li');
    let span5 = document.createElement('span');
    li5.innerHTML = 'Defensa especial: ';
    span5.innerHTML = `${pokemon.stats[4].base_stat}`;
    li5.append(span5);
    //Velocidad
    let li6 = document.createElement('li');
    let span6 = document.createElement('span');
    li6.innerHTML = 'Velocidad: ';
    span6.innerHTML = `${pokemon.stats[5].base_stat}`;
    li6.append(span6);
    //Stats
    let li7 = document.createElement('li');
    let span7 = document.createElement('span');
    li7.innerHTML = 'Estadísticas totales: ';
    span7.innerHTML = `${pokemon.stats[0].base_stat + pokemon.stats[1].base_stat + pokemon.stats[2].base_stat + pokemon.stats[3].base_stat + pokemon.stats[4].base_stat + pokemon.stats[5].base_stat}`;
    li7.append(span7);
    //Append
    ul.append(li1, li2, li3, li4, li5, li6, li7);
    //Tipo
    let div1 = document.createElement('div');
    div1.className = 'info';
    let p1 = document.createElement('p');
    p1.className = 'pokemon-tipo';
    p1.innerHTML = 'Tipo: ';
    if(pokemon.types.length > 1) {
        let spanTipo1 = document.createElement('span');
        spanTipo1.className = 'tipo';
        spanTipo1.innerHTML = `${pokemon.types[0].type.name}`;
        let spanTipo2 = document.createElement('span');
        spanTipo2.className = 'tipo';
        spanTipo2.innerHTML = `${pokemon.types[1].type.name}`;
        p1.append(spanTipo1, spanTipo2);
    } else {
        let spanTipo1 = document.createElement('span');
        spanTipo1.innerHTML = `${pokemon.types[0].type.name}`;
        p1.append(spanTipo1);
    }
    //Altura y peso
    let p2 = document.createElement('p');
    let span9 = document.createElement('span');
    p2.innerHTML = 'Altura: ';
    span9.innerHTML = `${pokemon.height / 10} m`;
    p2.append(span9);
    let p3 = document.createElement('p');
    let span10 = document.createElement('span');
    p3.innerHTML = 'Peso: ';
    span10.innerHTML = `${pokemon.weight / 10} kg`;
    p3.append(span10);
    div1.append(p1, p2, p3);

    div.append(h4, img, ul, div1);
    contenedor.append(div);
}