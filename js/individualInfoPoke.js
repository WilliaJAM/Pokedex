//Guarda el id para buscarlo
let idPokemon = localStorage.getItem('temporalyPokeInfo');
let parsedId = parseInt(idPokemon)
//Validaciones
if(!idPokemon){
    throw new Error ('No hay identificador')
}


if(typeof idPokemon !== "string"){
    console.warn('No es un string');

}

if(!idPokemon || idPokemon.trim()=== ''){
    throw new Error ('No debe estar vacio');
}


//Información del pokemon
    fetch(`https://pokeapi.co/api/v2/pokemon/${idPokemon}/`)
.then(response => response.json())
.then(data =>{
    //Validations
    if(!data){
        throw new Error("No hay datos en el objeto");
        
        }
        
    if(typeof data !== 'object'){
        throw new Error("No hay un objeto");
        
    }
    console.log(data);


    //Nombre del pokemon
    const headerType1 = document.getElementById('namePokemon');
    headerType1.innerHTML = firstLetterUpperCase(data.name);


    const pokemonFotage = document.getElementById('imagePokemon');
    const typePokemon = document.getElementById('typesPokemon');
    const buttonShiny = document.getElementById('buttonShinyVersion')

    //Para traducir el tipo del pokemon
    const headerType4 = elementHtml('h4');
    const headerType4SecondTypePokemon = elementHtml('h4')

        //Fucion que retorna el tipo traducidi mediante el nombre en ingles y el array sincronizado
        function typeTraduced(name) {
            const find = pokemonTypesEnglish.findIndex(element => element === firstLetterUpperCase(name) );
            return pokemonTypesSpanish[find]
        }
        //Aplca clases con el mismo nombre de los elementos del array en Css
        function applyClassCss(nameType) {
            const find = pokemonTypesEnglish.find(element => element === firstLetterUpperCase(nameType));
            return find
        }

        //Valida si tiene 1 o 2 tipos
        if(data.types.length == 2){
            headerType4.textContent = `${typeTraduced(data.types[0].type.name)}`
            headerType4SecondTypePokemon.textContent = `${typeTraduced(data.types[1].type.name)}`

            //Se le pone badge para que se aplique la clase 
            headerType4.className = `badge ${applyClassCss(data.types[0].type.name)}`
            headerType4SecondTypePokemon.className = `badge ${applyClassCss(data.types[1].type.name)}`

            appendChild(typePokemon, headerType4SecondTypePokemon)
        }else{
            headerType4.textContent = `${typeTraduced(data.types[0].type.name)}`
            headerType4.className = `badge ${applyClassCss(data.types[0].type.name)}`
        }
        appendChild(typePokemon, headerType4);

    const imgFront = document.createElement('img');
    const imgFront2 = document.createElement('img');
    const button = document.createElement('button')

    


    // Para la img 1 de la pagina
    button.addEventListener('click',()=>{
       isShiny = !isShiny;
       updateImg()
    })

    appendChild(pokemonFotage, imgFront);
    appendChild(pokemonFotage, imgFront2);
    appendChild(buttonShiny, button);



    const movesPokemon = data.moves;

    //Titulo de la tabla de movimiento
    const titleTable = document.getElementById("titleTable");
    const titleOfTheTable = elementHtml("h2");
    titleOfTheTable.innerHTML = "Tabla de movimiento"
    appendChild(titleTable, titleOfTheTable)

    //Elementos de la tabla
    const division = document.getElementById('tableMoves')
    const table = elementHtml('table')
    const tBody = elementHtml('tbody')
    const tHead = elementHtml('thead')
    const th = elementHtml('th')
    const th2 = elementHtml('th')
    const th3 = elementHtml('th')
    const th4 = elementHtml('th')
    const th5 = elementHtml('th')



    //Tabla Movimientos
    movesPokemon.forEach(element => {
        
        //Movimientos pokemon 
        fetch(element.move.url)
        .then(response => response.json())
        
        .then(data =>{
            if(!data){
                console.error('No hay datos')
            }
            
            if(typeof data !== 'object'){
                console.error('No es un objeto')
            }
            //Movimiento des los pokemon al español
            const movesInEnglish = data.names.find(element => element.language.name == 'es')
            const moveTraduced = movesInEnglish.name
            //Descripcion de los movimientos
            const descriptionTraduced = data.flavor_text_entries.find(element => element.language.name == 'es');
            const accessInfor = descriptionTraduced.flavor_text

        const trNumber1 = elementHtml('tr')
        const trNumber2 = elementHtml('tr')
        const td = elementHtml('td')
        const td2 = elementHtml('td')
        const td3 = elementHtml('td')
        const td4 = elementHtml('td')
        const td5 = elementHtml('td')

        table.className = "table table-striped"

        th2.scope = "col"
        th2.textContent = 'Descripción'

        th.scope= "col"
        th.textContent = 'Movimientos'

        th3.scope = 'col'
        th3.textContent = 'Presición'

        th4.scope = 'col'
        th4.textContent = 'Poder'

        th5.scope = 'col'
        th5.textContent = 'PP'

        td.textContent = moveTraduced

        td2.textContent= accessInfor

        td3.textContent = `${data.accuracy === null ?  0 : data.accuracy}`;

        td4.textContent = `${data.power === null ? 0 : data.power}`

        td5.textContent = `${data.pp}`

        //Encabezado de la tabla
        appendChild(trNumber1,th)
        appendChild(trNumber1, th2)
        appendChild(trNumber1, th3)
        appendChild(trNumber1, th4)
        appendChild(trNumber1, th5)
        appendChild(tHead, trNumber1)

        //Cuerpo de la tabla
        appendChild(trNumber2, td)
        appendChild(trNumber2, td2)
        appendChild(trNumber2, td3)
        appendChild(trNumber2, td4)
        appendChild(trNumber2, td5)
        appendChild(tBody, trNumber2)

        appendChild(table, tBody)
        appendChild(table, tHead)
        appendChild(division, table)

        })
    });
        //Estadisticas del pokemon
    const canvas = document.getElementById("radarChart");
    const titleOfTheStats = elementHtml("h2")
    const idOfTheDivStatsPokemon = document.getElementById("title");

    titleOfTheStats.innerHTML = "Estadisticas base"
    appendChild(idOfTheDivStatsPokemon , titleOfTheStats);

    const ctx = canvas.getContext("2d");

        // Datos y configuración
        const labels = ["PS", "Ataque", "Defensa", "Ataque Espacial", "Defensa Especial", "Velocidad"];
        const valores = [];
        data.stats.forEach(element => {
            valores.push(element.base_stat)
        });
        const maxValor = 200;
        const numLíneas = 5; // Niveles en la malla
        const centroX = canvas.width / 2;
        const centroY = canvas.height / 2;
        const radioMax = 130; // Radio máximo de la gráfica

        // Dibujar malla de la gráfica
        ctx.strokeStyle = "#aaa";
        ctx.lineWidth = 1;
        for (let i = 1; i <= numLíneas; i++) {
            ctx.beginPath();
            let radio = (radioMax / numLíneas) * i;
            for (let j = 0; j < labels.length; j++) {
                let angulo = (Math.PI * 2 * j) / labels.length;
                let x = centroX + Math.cos(angulo) * radio;
                let y = centroY + Math.sin(angulo) * radio;
                if (j === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // Dibujar líneas desde el centro
        ctx.strokeStyle = "#666";
        labels.forEach((_, i) => {
            let angulo = (Math.PI * 2 * i) / labels.length;
            let x = centroX + Math.cos(angulo) * radioMax;
            let y = centroY + Math.sin(angulo) * radioMax;
            ctx.beginPath();
            ctx.moveTo(centroX, centroY);
            ctx.lineTo(x, y);
            ctx.stroke();
        });

        // Dibujar la gráfica de datos
        ctx.strokeStyle = "rgba(0, 183, 255, 0.53)";
        ctx.fillStyle = "rgba(60, 173, 218, 0.53)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        valores.forEach((valor, i) => {
            let angulo = (Math.PI * 2 * i) / labels.length;
            let radio = (valor / maxValor) * radioMax;
            let x = centroX + Math.cos(angulo) * radio;
            let y = centroY + Math.sin(angulo) * radio;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Dibujar etiquetas
        ctx.fillStyle = "black";
        ctx.font = "14px Arial";
        labels.forEach((label, i) => {
            let angulo = (Math.PI * 2 * i) / labels.length;
            let x = centroX + Math.cos(angulo) * (radioMax + 20);
            let y = centroY + Math.sin(angulo) * (radioMax + 20);
            ctx.fillText(label, x - 20, y);
        });

        const back = document.getElementById('back');
        const home = document.getElementById('home');
        const next = document.getElementById('next');

        home.addEventListener('click',()=>{
            window.open('http://127.0.0.1:5500/pokedex/html/pokedex.html', '_self');
            idPokemon = localStorage.removeItem('temporalyPokeInfo')
        })

        back.addEventListener('click', ()=>{

            if (idPokemon == 1) {
                alert('No hay mas');
            }else{
            const id = parsedId - 1
            localStorage.setItem('temporalyPokeInfo', id);
            location.reload();
            }
            
        })
        next.addEventListener('click', ()=>{
            if(idPokemon == 10279){
                alert('Llegaste al limite')
            }else{
            const id = parsedId + 1
            localStorage.setItem('temporalyPokeInfo', id)
            location.reload();
            }
        })
});


//Funciones Para acortar
function appendChild(element, child) {
    element.appendChild(child);
}
function firstLetterUpperCase(string) {
    const name = string;
    const firstLetter = string.slice(0, 1);

    return name.replace(firstLetter, firstLetter.toUpperCase());
}

function elementHtml(element) {
    const elementHtmlDOM = document.createElement(element); 
    return elementHtmlDOM
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
//Mostrar las habilidades ocultas en pantalla con info en español
//basicamente hacer como tenemos con los moviminetos usar la misma función.

