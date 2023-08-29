

const loadData = async (searchText = 'iphone') => {

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    getPhonesData(phones)
}

 
const getPhonesData = (phone) => {
    
     
    const container = document.getElementById('card-container')
    container.textContent = '';
     phone.map(phones => {
      console.log(phones)
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
                  <button class="px-6 py-2 text-white font-semibold bg-[#0D6EFD] rounded  shadow-lg">Show Details</button>
                  </div>
                </div>
        `;
        container.appendChild(phoneCard)
     })
      
     inLoading(false)
     
}

loadData()
const searchPhone = () => {
    inLoading(true)
    const inputFields = document.getElementById('input-fields')
    const inputValue = inputFields.value;
     loadData(inputValue)
    
}

const inLoading = (load) => {

  const loadingButton = document.getElementById('loading')
  if(load){
    loadingButton.classList.remove('hidden')
  }else{
    loadingButton.classList.add('hidden')
  }
}
 

  