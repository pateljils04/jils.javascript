let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Problem 1. List of pitches on page load [3}

let productdata = []

function fetchdata(){
    fetch("https://add-to-cart-backend-eyn9.onrender.com/pitches")
    .then((res)=>res.json())
    .then((data)=>{
        cardlist(data)
        productdata=data
    })
    .catch((err)=>console.log(err))
}
fetchdata()

function cardlist(data){
    let store=data.map((el)=>card(el.id,el.image,el.price,el.founder,el.category,el.title,el.description))
    console.log(store)
    mainSection.innerHTML=store.join("")
}

function card(id,image,price,founder,category,title,description){
    let singlecard=`
    <a href="description.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&price=${encodeURIComponent(price)}&category=${encodeURIComponent(category)}&founder=${encodeURIComponent(founder)}&id=${encodeURIComponent(id)}&desc=${encodeURIComponent(description)}">
    <div class="card" data-id="${id}">
    <div class="card-img">
      <img src="${image}" alt="${title}" height="300px" >
    </div>
    <div class="card-body">
      <h4 class="card-title">${title}</h4>
      <p class="card-founder">Founder : ${founder}</p>
      <p class="card-category">${category}</p>
      <p class="card-price">${price}</p>
      <a href="#" data-id="${id}" class="card-link">Edit</a>
      <button class="card-button" data-id="${id}" >Delete</button>
    </div>
  </div>
  </a>
    `
    return singlecard;
}


// ####### POST PART

pitchCreateBtn.addEventListener("click",()=>{
let product ={
    title:pitchTitleInput.value,
    price:pitchPriceInput.value,
    image:pitchImageInput.value,
    founder:pitchfounderInput.value,
    category:pitchCategoryInput.value
}

fetch("https://add-to-cart-backend-eyn9.onrender.com/pitches",{
    method:"POST",
    headers:{
        'Content-Type':'application/json',
    },
    body:JSON.stringify(product)
})
.then((res)=>res.json())
.then((data)=>{
    console.log(data)
    alert("product added...")
    fetchdata()
}).catch((err)=>{
    console.log(err)
    alert("something went wrong")

})

})




// ######### DELETE PART


document.addEventListener("click",(e)=>{
if(e.target.classList.contains("card-button")){
deleteproduct(e.target.dataset.id)
}
})

function deleteproduct(id){
    fetch(`https://add-to-cart-backend-eyn9.onrender.com/pitches/${id}`,{
        method:"DELETE"
    })
    .then((res)=>res.json())
    .then((data)=>{
        alert("deleted...")
        console.log(data)
    })
    .catch((err)=>console.log(err))

}




// ######## FILTER data

filterFood.addEventListener("click",()=>{
let filterdata =productdata.filter((el)=>el.category==="Food")
console.log(filterdata)
cardlist(filterdata)
})
filterElectronics.addEventListener("click",()=>{
    let filterdata = productdata.filter((el)=>el.category==="Electronics")
    console.log(filterdata)
    cardlist(filterdata)
})
filterPersonalCare.addEventListener("click",()=>{
    let filterdata = productdata.filter((el)=>el.category==="Personal Care")
    console.log(filterdata)
    cardlist(filterdata)
})




// ###### SORTING DATA

sortAtoZBtn.addEventListener("click",()=>{
    let sortAtoZdata = productdata.sort((a,b)=>a.price-b.price)
    cardlist(sortAtoZdata)
})

sortZtoABtn.addEventListener("click",()=>{
    let sortZtoAdata = productdata.sort((a,b)=>b.price-a.price)
    cardlist(sortZtoAdata)
})


// update all fields

document.addEventListener("click",(e)=>{
    if(e.target.classList.contains("card-link")){
        let id = e.target.dataset.id;
        populateform(id)
    }
});

function populateform(id){
    fetch(`https://add-to-cart-backend-eyn9.onrender.com/pitches/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        // console.log(data)
        updatePitchTitleInput.value=data.title
        updatePitchImageInput.value=data.image
        updatePitchfounderInput.value=data.founder
        updatePitchCategoryInput.value=data.category
        updatePitchPriceInput.value=data.price
        updatePitchIdInput.value=data.id

    })
    .catch((err)=>console.log(err))
}

updatePitchBtn.addEventListener("click",()=>{
    let updateproductdata={
        title: updatePitchTitleInput.value,
        image:updatePitchImageInput.value,
        founder:updatePitchfounderInput.value,
        category:updatePitchCategoryInput.value,
        price:updatePitchPriceInput.value,
        id:updatePitchIdInput.value
    }
    console.log(updateproductdata)
    fetch(`https://add-to-cart-backend-eyn9.onrender.com/pitches/${updateproductdata.id}`,{
    method:"PUT",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(updateproductdata)
    }).then((res)=>res.json())
    .then((data)=>
    alert("data updated..."))
    .catch((err)=>console.log(err))
})


