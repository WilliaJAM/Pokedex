

    fetch('https://pokeapi.co/api/v2/pokemon?limit=10010&offset=0')
.then(response => response.json())
.then(data => {
    if(!data){
        console.error('No hay datos en la api');
    }

    console.log(data)
        const placeLogo = document.getElementById('pokedexLogo')
        const logo = document.createElement('img');
        logo.src = '../../assets/icons/pokedex-removebg-preview.png'
        logo.alt = 'Pokédex'
        appendChildFunction(placeLogo, logo)

        const pokemon = data.results;
        const columnas = document.getElementById('colum');
        pokemon.forEach(element => {
            const divCard = document.createElement('div');
            const divCardBody = document.createElement('div');
            const image = document.createElement('img');
            const headerType5 = document.createElement('h5');
            const p = document.createElement('p');
            const p2 = document.createElement('p');
            const linkButton = document.createElement('a');
                
            divCard.className = "card";
            divCardBody.className = "card-body";

            headerType5.textContent = converterUpperCase(element.name)

            
            linkButton.innerHTML = "Acerca de este pokemon";
            linkButton.className = "btn btn-primary"
            linkButton.id = "accessToInfo"

            appendChildFunction(divCardBody, headerType5);
            appendChildFunction(divCardBody, linkButton);
            appendChildFunction(divCard, divCardBody);
            appendChildFunction(columnas, divCard);

            if (!element.url) {
                console.log('Error no se encontro ningun url para acceder');
            }

            fetch(element.url)
            .then(response => response.json())
            .then(data =>{
                if(!data){
                    console.error('No hay datos');
                    return
                }

                image.src = data.sprites.front_default
                image.alt = "Imagen no encontrada"
                appendChildFunction(divCard, image);

                linkButton.addEventListener('click', ()=>{
                    window.open('http://127.0.0.1:5500/pokedex/html/infoPokemon.html', '_self');
                    localStorage.setItem('temporalyPokeInfo', data.id);
                })

                    function translate(nameEnglish) {
                        const find = pokemonTypesEnglish.findIndex(name => name === converterUpperCase(nameEnglish));
                        return pokemonTypesSpanish[find]
                    }
                    function searchClass(cssClass) {
                        const find = pokemonTypesEnglish.find(name => name === converterUpperCase(cssClass));
                        return find
                    }

                    if(data.types.length == 2){
                    p.innerHTML = `${translate(data.types[0].type.name)}`
                    p2.innerHTML = `${translate(data.types[1].type.name)}`

                    p.className = `badge ${searchClass(data.types[0].type.name)}`
                    p2.className = `badge ${searchClass(data.types[1].type.name)}`

                    appendChildFunction(divCard, p2) 
                }else{
                    p.innerHTML = `${translate(data.types[0].type.name)}`
                    p.className = `badge ${searchClass(data.types[0].type.name)}`
                }

                appendChildFunction(divCard, p) //lo pega
            })
        });
        
});

function appendChildFunction(element, child) {
    element.appendChild(child)
}
function converterUpperCase(name) {
    const fullName = name
    const firstLetterUpperCase = fullName.slice(0, 1)
    return fullName.replace(firstLetterUpperCase, firstLetterUpperCase.toUpperCase());

}
const pokemonTypesEnglish = [
    "Normal", "Fire", "Water", "Grass", "Electric", 
    "Ice", "Fighting", "Poison", "Ground", "Flying", 
    "Psychic", "Bug", "Rock", "Ghost", "Dragon", 
    "Dark", "Steel", "Fairy"
];

const pokemonTypesSpanish = [
    "Normal", "Fuego", "Agua", "Planta", "Eléctrico", 
    "Hielo", "Lucha", "Veneno", "Tierra", "Volador", 
    "Psíquico", "Bicho", "Roca", "Fantasma", "Dragón", 
    "Siniestro", "Acero", "Hada"
];
const colorTypes = [
    "badge badge-secondary", "badge badge-red", "badge", "badge-success", 
    "badge-warning", "badge-blueSkye", "badge-orange", ""
]

//nota mental usar .catch para capturar errores cunado se esta manejando con apis

//Parender mas sobre clases.
// class Hola {
//     constructor(string, numero) {
//         this.string = string;
//         this.numero = numero;
//     }
// }

// class Hola2 extends Hola {
//     constructor(string, numero, hole){
//         super(string, numero);
//         this.hole = hole
//     }
// }