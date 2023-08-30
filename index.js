

const loadData = async (searchText = 'iphone' ,isShowAll) => {

    if(searchText === ''){
      searchText = 'iphone'
    }
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    console.log(phones)
    getPhonesData(phones, isShowAll)
}

 
const getPhonesData = (phone, isShowAll) => {
    
     
    const container = document.getElementById('card-container')
    container.textContent = '';
    // show all button part 
     
    const showAllButton = document.getElementById('show-button')
    if(phone.length > 12 && !isShowAll){
      showAllButton.classList.remove('hidden')
    }else{ 
      showAllButton.classList.add('hidden')
    }
     
     if(!isShowAll){
      phone = phone.slice(0, 12)
     }
     phone.map(phones => {
       
        const {brand, phone_name, slug, image} = phones;
        const phoneCard = document.createElement('div')
        phoneCard.classList = `card  bg-base-100 shadow-xl`
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                  <img src="${image}" alt="Shoes" class="rounded-xl" />
                </figure>
                <div class="card-body items-center text-center">
                  <h2 class="card-title text-2xl">${phone_name}</h2>
                  <p class="text-[#706F6F] mb-2">There are many variations of passages of <br> available, but the  majority have suffered</p>
                  <p class="text-2xl font-bold">$999</p>

                  <div class="card-actions">
                  <button onclick="phoneDetails('${slug}')"
                    class="px-6 py-2 text-white font-semibold bg-[#0D6EFD] rounded  shadow-lg">Show Details</button>
                  </div>
                </div>
        `;
        container.appendChild(phoneCard)
     })
      
     inLoading(false)
     
}
 
// modal part 
const phoneDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  openModal(data.data)
  show_details_modal.showModal()
}
const openModal = (modalPhone) => {
  console.log(modalPhone)
   const {brand, name, image , mainFeatures, others, slug, releaseDate} = modalPhone;
const modalContainer = document.getElementById('modalContainer')
modalContainer.innerHTML = `
<div class="bg-[#0D6EFD0D] rounded-lg  p-6">
<img class=" mx-auto" src="${image}" alt="">
</div>
<div class="space-y-3 mt-10">
<h1 class="text-3xl font-semibold">${name}</h1>

<p class="text-[#706F6F]">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>

<h1> <span class="font-bold">Storage:</span> ${mainFeatures?.storage}</h1>
<h1> <span class="font-bold">Display Size :</span> ${mainFeatures?.displaySize} </h1>
<h1> <span class="font-bold">Chipset :</span> ${mainFeatures?.chipSet}</h1>
<h1> <span class="font-bold">Memory:</span> ${mainFeatures?.memory} </h1>
<h1> <span class="font-bold">Slug:</span> ${slug} </h1>
<h1> <span class="font-bold">Release Date:</span> ${releaseDate}</h1>
<h1> <span class="font-bold">Brand:</span> ${brand}</h1>
<h1> <span class="font-bold">GPS:</span> ${others?.GPS}</h1>
 
</div>    

`
}
// modal part end 
 
const searchPhone = (isShowAll) => {
    inLoading(true)
    const inputFields = document.getElementById('input-fields')
    const inputValue = inputFields.value;
    loadData(inputValue, isShowAll)
    
}
 

const inLoading = (load) => {

  const loadingButton = document.getElementById('loading')
  if(load === true){
    loadingButton.classList.remove('hidden')
  }else{
    loadingButton.classList.add('hidden')
  }
}
 
const showAll = () => {
  searchPhone(true)
   
}
 

loadData()