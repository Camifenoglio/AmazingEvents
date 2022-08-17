let dataApi;

async function getData() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(json => dataApi = json)

    let dataArray = dataApi.events

    //fn p/imprimir tarjetas ampliadas
    var id = location.search.split("?id=")
    //console.log(id)
    var selectedId = id[1]
    //console.log(selectedId)
    var card = dataArray.find(function (card) {
        return card._id == selectedId
    })

    function displayDetails() {
        var templateHtml = `
            <div class="col-md-5 d-flex justify-content-center align-items-center">
                <img class="imgCardAmpliada img-fluid rounded-start p-2 mt-4 mt-md-0" src="${card.image}"> 
            </div>
            <div class="col-md-7 d-flex justify-content-between cardAmpliadaTexto">
                <div class="card-body cardBody m-3 m-md-3" >
                <h5 class="card-title pb-2">${card.name}</h5>
                <p>Date: ${card.date} </p>
                <p>Place: ${card.place}</p>
                <p>${card.description}</p>
                <p> Price: ${card.price} usd </p>
            </div>
            `
        document.querySelector("#detailsContainer").innerHTML = templateHtml
    }
    displayDetails()
}

getData()