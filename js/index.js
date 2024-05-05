const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const categories = data.data.news_category;
    displayCategory(categories);
}
const displayCategory =(categories) => {
    const tabContents = document.getElementById('tab-contents');
    categories.slice(0,3).forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `<a role="tab" onclick='handleLoadNews("${category.category_id}")' class="tab">${category.category_name}</a>`;
        tabContents.appendChild(div);
    });
}

const handleLoadNews = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/category/${id}`);
    const data = await res.json();
    displayNews(data);
}

const displayNews = (data) => {
    const cardsContainer = document.getElementById('cards-container');
    cardsContainer.innerHTML = '';
    data.data.forEach(news => {
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card w-96 bg-base-100 shadow-xl">
                <figure><img src="${news?.image_url}" alt="Shoes" /></figure>
                <div class="card-body">
                <h2 class="card-title">${news.title.slice(0,40)}</h2>
                <p>${news.details.slice(0,200)}</p>
                <h3>Total Views: ${news.total_view ? news.total_view : 'No Views'}</h3>
                <div class="card-actions justify-end">
                    <button onclick='handleModal("${news._id}")' class="btn btn-primary">Read More</button>
                </div>
                </div>
            </div>
        `;
        cardsContainer.appendChild(div);
    })
}

const handleModal = async (newsId) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/news/${newsId}`);
    const data = await res.json();
    const news = data.data[0];
    console.log(news)
    console.log(newsId)
    const modalContainer = document.getElementById('modal-container');
    const div = document.createElement('div');
    div.innerHTML = `
        <dialog id="my_modal_1" class="modal">
        <div class="modal-box">
            <figure><img src="${news?.thumbnail_url}" alt="Shoes" /></figure>
            <h3 class="font-bold text-lg">${news.title}</h3>
            <p class="py-4">${news.details.slice(0,200)}</p>
            <div class="modal-action">
            <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
            </form>
            </div>
        </div>
        </dialog>
    `;
    modalContainer.appendChild(div);
    const modal = document.getElementById('my_modal_1');
    modal.showModal();
}



handleCategory();
handleLoadNews('01');


