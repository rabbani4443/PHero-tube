
// All Category Name Section
const allCategoryName =async ()=>{
    const responseLink = await fetch ('https://openapi.programming-hero.com/api/videos/categories');
    const response = await responseLink.json();
    const data = response.data; 

    const allCategoryId = document.getElementById('all-category-name');
    data.forEach(categoryName => {
        const div = document.createElement('div');
        div.innerHTML =`
        <button onclick="categoryItems('${categoryName.category_id}')" class=" bg-btnColor py-2 md:px-5 px-2 rounded-lg text-[##252525] font-medium text-lg">${categoryName.category}</button>
        `;
        allCategoryId.appendChild(div);
    });
    
};

// Convert seconds to minutes and minutes to hours
const convertSecMinHour =(seconds)=>{
    if(seconds){
        let h = Math.floor(seconds/3600);
        let m = Math.floor(seconds%3600) / 60;
        let result = h + ' hrs ' + Math.floor(m) + ' min ago' ;
        return result;
    };
    return ;
};

const sortItemsByViews = async (categoryId) => {
    const responseLink = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const response = await responseLink.json();
    const data = response.data;
    
    if (data && data.length > 0) {
        data.sort((a, b) => parseInt(b.others.views) - parseInt(a.others.views));
        renderCategoryItems(data);
    } else {
        displayNoDataMessage();
    }
};

const renderCategoryItems = (data) =>{

    const allCategoryItemsId = document.getElementById('all-category-items');
    allCategoryItemsId.classList.add('grid', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-5');
    allCategoryItemsId.innerHTML ='';

    data.forEach(categoryItem => {
       const div = document.createElement('div');
       div.innerHTML =`
       <div>
       <div class="card bg-white">
           <div class="pb-4 relative">
               <img class="rounded-lg w-full h-44" src=${categoryItem.thumbnail} alt="Shoes" />
               <span>
               ${categoryItem.others.posted_date? 
                   '<p class="absolute right-4 bottom-7 rounded-lg bg-gray-800 text-gray-200 text-sm px-3 py-1">' + convertSecMinHour(parseInt(categoryItem.others.posted_date)) + '</p>' : ''}
            </span>
           </div>
           <div class="pb-2">
             <div class="flex  space-x-3">
               <div class="avatar">
                 <div class="mask w-10 h-10  rounded-full">
                   <img src="${categoryItem.authors[0].profile_picture}" alt="${categoryItem.authors[0].profile_name}" />
                 </div>
               </div>
               <div>
                 <div class="font-bold text-titleColor text-base leading-7	">Building a ${categoryItem.title}</div>
                 <div class="text-sm text-textColor font-normal py-1 flex items-center">${categoryItem.authors[0].profile_name}
                 <span class="pl-1 flex">
                 ${categoryItem.authors[0].verified ? '<img class= "w-4 h-4 rounded-full" src="../img/verified.png" alt="Verified">' : ''}
              </span>
                 </div>
                 <div class="text-sm text-textColor font-normal">${categoryItem.others.views} views</div>
               </div>
             </div>
           </div>
         </div>
    </div>
       `,
       allCategoryItemsId.appendChild(div);
       // console.log(categoryItem);
    });
};

const displayNoDataMessage =() =>{
    const allCategoryItemsId = document.getElementById('all-category-items');
    allCategoryItemsId.classList.remove('grid', 'md:grid-cols-2', 'lg:grid-cols-4', 'gap-5');
    allCategoryItemsId.innerHTML =` 
     <div class="w-full flex justify-center items-center">
         <div>
             <img class="mx-auto py-10"  src="../img/Icon.png" alt="">
             <h1 class="text-4xl font-bold text-center">Oops!! Sorry, There is no content here</h1>
         </div>
     </div>
     `;
}

// All Category Items Show the Section
const categoryItems = async(categoryId)=>{
    const responseLink = await fetch(` https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
    const response = await responseLink.json();
    const data = response.data;

    const allCategoryItemsId = document.getElementById('all-category-items');
    allCategoryItemsId.innerHTML = '';

    if (!data || data.length === 0) {
        displayNoDataMessage();
    } else {
        renderCategoryItems(data);
    };

    document.getElementById('sortButton').onclick = () => sortItemsByViews(categoryId);

};
categoryItems(categoryId ="1000");
allCategoryName();