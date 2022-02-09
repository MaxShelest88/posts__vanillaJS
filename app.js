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
    const itemsOnPage = 10
    const pagNumber = items.length / itemsOnPage
    const pagBody = document.createElement('div')
    parent.insertAdjacentElement('afterend', pagBody)
    pagBody.classList.add('posts__pagination')
    for (let i = 0; i < pagNumber; i++) {
        const pagStart = i * itemsOnPage
        const pagBtn = document.createElement('div')
        pagBtn.innerHTML = `${i + 1}`
        pagBody.append(pagBtn)
        const data = items.slice(pagStart, pagStart + itemsOnPage)
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
        parent.innerHTML = postsHtml
        pagBtn.addEventListener('click', ()=>{
            parent.innerHTML = postsHtml
        })
    }
}

renderPosts()