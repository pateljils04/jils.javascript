function fetchdata(){
    fetch("https://api.rootnet.in/covid19-in/stats/latest")
    .then((res)=>res.json())
    .then((data)=>card(data.data.regional))
    .catch((err)=>console.log(err))
}
fetchdata()

function card(data){
    const store = data.map((el)=>singlecard(el.loc,el.confirmedCasesIndian,el.confirmedCasesForeign,el.discharged,el.deaths,el.totalConfirmed))
    console.log(store)
    document.getElementById("table").innerHTML=store.join("")
}

function singlecard(loc,confirmedCasesIndian,confirmedCasesForeign,discharged,deaths,totalConfirmed){

    let card =`
    <tr class="table-secondary">
    <th><i class="bi bi-arrow-right"></i></th>
    <td>${loc}</td>
    <td>${confirmedCasesIndian}</td>
    <td>${confirmedCasesForeign}</td>
    <td>${discharged}</td>
    <td>${deaths}</td>
    <td>${totalConfirmed}</td>
</tr>
    `

return card;
}




