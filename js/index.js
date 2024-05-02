const handleCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/news/categories');
    const data = await response.json();
    const categories = data.data.news_category;
    displayCategory(categories);
}
const displayCategory =(categories) => {
    console.log(categories);    
    const tabContents = document.getElementById('tab-contents');
    categories.slice(0,3).forEach(category => {
        const div = document.createElement('div');
        div.innerHTML = `<a role="tab" class="tab">${category.category_name}</a>`;
        tabContents.appendChild(div);
    })
}
handleCategory();