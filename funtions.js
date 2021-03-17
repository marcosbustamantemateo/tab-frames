let elements = [];
let clicked_element;

function click_tab_open(e) {
    let idTabOpen = this.id.split('-')[0];
    hide_content();
    document.getElementById(idTabOpen).style.display = 'inline-block';
    clicked_element = idTabOpen;
    // ordenamos el elemento idTabOpen del array elements a la ultima posicion
    // console.log(elements.push(elements.splice(elements.indexOf(idTabOpen), 1)[0]));
}

function mouseover_tab_open(e) {
    this.style.backgroundColor = 'lightgray';
}

function mouseout_tab_open(e) {
    this.style.backgroundColor = 'white';
}

function asignaEventoClick() {
    let tabsOpen = document.getElementsByClassName("li-open");
    for (let i = 0; i < tabsOpen.length; i++) {
        tabsOpen[i].addEventListener("click", click_tab_open, false);
        tabsOpen[i].addEventListener("mouseover", mouseover_tab_open, false);
        tabsOpen[i].addEventListener("mouseout", mouseout_tab_open, false);
    }  
}

// evento al hacer click en un elemento del menu
// crea una pestaña y la muestra
function menu_click(e, value) {

    // compruebo que no este agregado
    if (!elements.includes(value)) {
        let name = e.innerHTML;

        // creo elemento <li> dentro de <ul class="tabs-open">
        let tabsOpen = document.getElementsByClassName("tabs-open")[0];
        let contentTab = document.createTextNode(name);
        let spanCloseTap = document.createElement("span");
        spanCloseTap.innerHTML = "x";
        let li = document.createElement("li");
        li.id = `${value}-open`;
        li.className = 'li-open';
        li.appendChild(contentTab);
        li.appendChild(spanCloseTap);       
        tabsOpen.appendChild(li);

        // agrego eventos
        asignaEventoClick();
        spanCloseTap.addEventListener('click', tab_close, false);
        li.addEventListener('click', view_content(value), false);
        
        // agrego a la lista de elementos
        elements.push(value);
        console.log('AGREGADO', value);        
    } else {
        console.log("YA AGREGADO");
    }
}

// evento al eliminar un elemento 
// elimina la pestaña y si hay otras abiertas, las muestra
function tab_close(e) {

    // instancio el ultimo elemento clickeado
    let last_clicked_element = clicked_element;

    // paro la propagacion de eventos
    e.stopPropagation();

    // elimino de la lista de elementos
    let item = document.getElementById(this.parentNode.id);
    let idTabOpen = item.id.split('-')[0];
    elements.splice(elements.indexOf(idTabOpen), 1);

    // elimino el elemento <li> del DOM
    e.target.parentNode.remove();

    // oculto todos los frames
    hide_content();

    // recorro los tabs abiertos para encontrar al ultimo elemento clickeado
    let itemAux;
    let tabsOpen = document.getElementsByClassName("tabs-open")[0];
    let items = tabsOpen.children;
    for (let i = 0; i < items.length; i++) {
        if (items[i].id == `${last_clicked_element}-open`) {
            itemAux = items[i];
            console.log(itemAux);
        }
    }

    // muestro el ultimo frame clickeado o abierto
    let itemAMostrar = itemAux != null ? itemAux : items[items.length-1];
    if (itemAMostrar != null && itemAMostrar.id != null) {
        let frame = document.getElementById(itemAMostrar.id.split('-')[0]);
        frame.style.display = 'inline-block';
    }
}

function view_content(value) {
    hide_content();
    document.getElementById(value).style.display = 'inline-block';
}

function hide_content() {
    let iframes = document.getElementsByTagName("iframe");
    for (let i = 0; i < iframes.length; i++) {
        iframes[i].style.display = 'none';
    }     
}

