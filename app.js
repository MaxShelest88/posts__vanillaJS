const getData = async (url) => {
    const resolve = await fetch(url)
    return resolve.json()
}
const url = 'https://jsonplaceholder.typicode.com/posts/'

const renderPosts = async () => {
    try {
        const posts = await getData(url)
        createPosts(posts)

    } catch (error) {
        console.log(error.message)
    }
}

function createPosts(items) {
    const parent = document.querySelector('.posts__body')
    const itemsOnPage = 6
    createPag()
    function createPag(){
        const pagNumber = items.length / itemsOnPage
        const pagBody = document.createElement('div')
        parent.insertAdjacentElement('afterend', pagBody)
        pagBody.classList.add('posts__pagination', 'pagination')
        createPosts()
        for (let i = 0; i < pagNumber; i++) {
            const pagBtn = document.createElement('div')
            pagBtn.classList.add('pagination__btn')
            pagBtn.innerHTML = `${i + 1}`
            pagBody.append(pagBtn)
            pagBtn.addEventListener('click', ()=>{
                createPosts(i)
            })
        }

    }

    function createPosts(startNum =0){
        const startFrom = startNum * itemsOnPage
        const data = items.slice(startFrom, startFrom + itemsOnPage)
        const postsHtml = data.map(el => {
            return `
                                <article class="post"> 
                                         <div class="post__user">Пользователь ${el.userId} </div>
                                         <div class="post__id">Пост № ${el.id}</div>
                                         <div class="post__title">${el.title} </div>
                                         <div class="post__body">${el.body}</div>
                                 </article>
            `
        })
        return parent.innerHTML = postsHtml
    }


}

renderPosts()