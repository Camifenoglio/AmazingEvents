let dataApi;
async function getData() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(json => dataApi = json)

    let dataArray = dataApi.events
    
    var checkBoxSeleccionado = []
    var textSearch = "";

    //funcion imprimir checkbox
    function displayCheckBox() {
        var checkContainer = document.getElementById("checkContainer")
        var allCategorys = dataArray.map(evento => evento.category) //recorro array y obtengo categorias
        // console.log (allCategorys)
        var arrayFiltrado = new Set(allCategorys) //elimino categorias repetidas mediante un set
        //console.log (arrayFiltrado)
        var categorias = [...arrayFiltrado] //guardo los datos en una variable
        //console.log (categorias)
        //imprimo inputcheckbox
        var inputCheckbox = ""
        categorias.forEach(category => {
            inputCheckbox += `<label><input type="checkbox" value="${category}"> ${category}</label>`
        })
        checkContainer.innerHTML = inputCheckbox
    }
    displayCheckBox()

    //captura datos check
    //guardar los checked en una variable array
    var checkBox = document.querySelectorAll('input[type=checkbox]')
    checkBoxSeleccionado = []

    checkBox.forEach(check => check.addEventListener('click', (evento) => {
        var checkeado = evento.target.checked
        if (checkeado) {
            checkBoxSeleccionado.push(evento.target.value)
        } else {
            checkBoxSeleccionado = checkBoxSeleccionado.filter(uncheck => uncheck !== evento.target.value)
        }
        arrayFiltrado()
        console.log(checkBoxSeleccionado)
    }))

    //capturar datos search
    var search = document.getElementById("search")
    search.addEventListener('keyup', (evento) => {
        textSearch = evento.target.value
        arrayFiltrado()
        //console.log (textSearch)
    })

    //combino checkbox y searchInput
    function arrayFiltrado() {
        let dato = []
        if (checkBoxSeleccionado.length > 0 && textSearch !== "") {
            checkBoxSeleccionado.map(seleccionado => {
                dato.push(...dataArray.filter(element => element.name.toLowerCase().includes(textSearch.trim().toLowerCase()) && element.category == seleccionado))
            })
        } else if (checkBoxSeleccionado.length > 0 && textSearch == "") {
            checkBoxSeleccionado.map(seleccionado => dato.push(...dataArray.filter(element => element.category == seleccionado)))
        } else if (checkBoxSeleccionado.length == 0 && textSearch !== "") {
            dato.push(...dataArray.filter(element => element.name.toLowerCase().includes(textSearch.trim().toLowerCase())))
        } else {
            dato.push(...dataArray)
        }
        //console.log (dato)
        displayCardHome(dato)
    }
    arrayFiltrado()

    //funcion imprimir tarjetas
    function displayCardHome(datos) {
        let templateHtml = "";
        if (datos.length !== 0) {
            datos.forEach(elemento => {
                templateHtml += `  
                <div class="card d-flex align-items-center m-3" style="width: 18rem;">
                    <img class="card-img-top p-3" src="${elemento.image}" alt= "${elemento.name}">
                    <div class="card-body pt-0">
                        <h5 class="card-title d-flex justify-content-center">${elemento.name}</h5>
                        <p class="d-flex justify-content-center text-center m-0 ps-2 ">Date: ${elemento.date}</p>
                        <p class="card-text d-flex justify-content-start text-center">${elemento.description}</p>
                        <div class="d-flex justify-content-between align-items-center ps-2 pe-2">
                            <p class="mb-0" >Price: ${elemento.price}usd</p>
                            <button><a href="./details.html?id=${elemento._id}" class="btn btn-dark"> More info</a></button>
                        </div>
                    </div>      
                </div>`
            })
        } else {
            templateHtml =
                ` <p> No search results </p>`
        }
        document.querySelector('.card2').innerHTML = templateHtml
    }
}
getData()