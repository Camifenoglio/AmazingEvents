//.sort((a,b))=>  a.accuracy -b.accuracy)
let dataApi;
async function getData() {
    await fetch("https://amazing-events.herokuapp.com/api/events")
        .then(response => response.json())
        .then(json => dataApi = json)
    //array eventos
    let dataArray = dataApi.events
    //array eventos pasados
    var dataPastEvents = dataArray.filter(e => e.assistance)
    //obtengo porcentaje de asistencia y creo propiedad de porcentaje        
    dataPastEvents.map(e => {
        var porcentaje = ((e.assistance / e.capacity) * 100).toFixed()
        e.porcentaje = porcentaje
    })
    //ordeno de mayor a menor array de pasados por porcentaje
    eventosSortPorcentaje = dataPastEvents.sort((a, b) => b.porcentaje - a.porcentaje)
    // console.log(eventosSortPorcentaje)

    //ordeno de mayor a menor los eventos por capacidad
    eventosSortCapacidad = dataArray.filter(e => e.capacity).sort((a, b) => b.capacity - a.capacity)
    // console.log(eventosSortCapacidad)

    //Funcion para imprimi body primera tabla events statics
    function displayEventsStatics(arrayporcentaje, arraycapacidad) {
        templateHtml = `
            <tr>
            <td><span> Events with the highest percentage of attendance</span></td>
            <td><span>Events with the lovest percentage of attendance</span> </td>
            <td><span>Event with larger capacity</span> </td>
            </tr>
            <td>${arrayporcentaje[0].name}: ${arrayporcentaje[0].porcentaje}%</td>
            <td>${arrayporcentaje[arrayporcentaje.length - 1].name}: ${arrayporcentaje[arrayporcentaje.length - 1].porcentaje}%</td>
            <td>${arraycapacidad[0].name}: ${arraycapacidad[0].capacity}</td>
            `
        document.getElementById("EventStatics").innerHTML = templateHtml
    }
    displayEventsStatics(eventosSortPorcentaje, eventosSortCapacidad)

    //tabla 2
    // array datos futuros
    var dataUpcomingEvents = dataArray.filter(e => e.estimate)
    //categorias
    var obtenerCategorias = dataUpcomingEvents.map(e => e.category)
    var setCategorias = new Set(obtenerCategorias)
    var arrayCategorias = [...setCategorias]
    //crear array con categorias unicas con sus eventos respectivos
    var catEventos = []
    arrayCategorias.map(category =>
        catEventos.push({
            categoria: category,
            evento: dataUpcomingEvents.filter(e => e.category === category)
        }))
    // console.log(catEventos)
    //array con propiedades q/necesito , y sus valores en otro array
    catEventosFuturos = []
    catEventos.map(array => {
        catEventosFuturos.push({
            categoria: array.categoria,
            estimate: array.evento.map(e => e.estimate),
            capacity: array.evento.map(e => e.capacity),
            revenueEstimate: array.evento.map(e => e.estimate * e.price)
        })
    })
    // console.log(catEventosFuturos)

    //array final eventos futuros
    catEventosFuturos.forEach(eventoCategoria => {
        var totalEstimate = 0;
        eventoCategoria.estimate.forEach(estimate => totalEstimate += Number(estimate))
        eventoCategoria.estimate = totalEstimate
        var totalCapacity = 0;
        eventoCategoria.capacity.forEach(capacity => totalCapacity += Number(capacity))
        eventoCategoria.capacity = totalCapacity
        var totalRevenueEstimate = 0;
        eventoCategoria.revenueEstimate.forEach(revenueEstimate => totalRevenueEstimate += Number(revenueEstimate))
        eventoCategoria.revenueEstimate = totalRevenueEstimate
        eventoCategoria.porcentajeAttendance = ((totalEstimate / totalCapacity) * 100).toFixed(2)
    })
    // console.log(catEventosFuturos)

    //table 3 
    //crear array con categorias unicas con sus eventos respectivos
    var catEventosPast = []
    arrayCategorias.map(category =>
        catEventosPast.push({
            categoria: category,
            evento: dataPastEvents.filter(e => e.category === category)
        }))

    // console.log(catEventosPast)
    //array con propiedades q/necesito , y sus valores en otro array
    catEventosPasados = []
    catEventosPast.map(array => {
        catEventosPasados.push({
            categoria: array.categoria,
            assistance: array.evento.map(e => e.assistance),
            capacity: array.evento.map(e => e.capacity),
            revenueAssistance: array.evento.map(e => e.assistance * e.price)
        })
    })
    // console.log(catEventosPasados)
    //array final eventos pasados
    catEventosPasados.forEach(eventoCategoria => {
        var totalAssistance = 0;
        eventoCategoria.assistance.forEach(assistance => totalAssistance += Number(assistance))
        eventoCategoria.assistance = totalAssistance
        var totalCapacity = 0;
        eventoCategoria.capacity.forEach(capacity => totalCapacity += Number(capacity))
        eventoCategoria.capacity = totalCapacity
        var totalRevenueAssistance = 0;
        eventoCategoria.revenueAssistance.forEach(revenueAssistance => totalRevenueAssistance += Number(revenueAssistance))
        eventoCategoria.revenueAssistance = totalRevenueAssistance
        eventoCategoria.porcentajeAttendance = ((totalAssistance / totalCapacity) * 100).toFixed(2)
    })
    // console.log(catEventosPasados)

    //imprimir tabla 2
    function displayTablaDos() {
        let imprimirTabla2 = `
        <tr>
        <td><span> Categories</span></td>
        <td> <span>Estimated</span></td>
        <td><span> Percentage of attendance</span></td>
        </tr>
        `
        catEventosFuturos.forEach(elemento => {
            document.createElement
            imprimirTabla2 += `
            <tr>
            <td>${elemento.categoria}</td>
            <td>$ ${elemento.revenueEstimate}</td>
            <td>${elemento.porcentajeAttendance} %</td>
            </tr>
        `
            document.getElementById("tablaDos").innerHTML = imprimirTabla2
        })
    }
    displayTablaDos()

    function displayTablaTres() {
        let imprimirTabla3 = `
    <tr>
    <td><span> Categories</span></td>
    <td> <span> Revenues</span></td>
    <td><span> Percentage of attendance</span></td>
    </tr>
    `
        catEventosPasados.forEach(elemento => {
            document.createElement
            imprimirTabla3 += `
        <tr>
        <td>${elemento.categoria}</td>
        <td>$ ${elemento.revenueAssistance}</td>
        <td>${elemento.porcentajeAttendance} %</td>
        </tr>
        `
            document.getElementById("tablaTres").innerHTML = imprimirTabla3
        })
    }

    displayTablaTres()
}
getData()