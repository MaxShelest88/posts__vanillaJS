const getData = async (url) => {
    const resolve = await fetch(url)
    return resolve.json()
}
const url = 'https://jsonplaceholder.typicode.com/posts/'

const renderPosts = async () => {
    try {
        const posts = await getData(url)
        createPosts(posts, 6)

    } catch (error) {
        console.log(error.message)
    }
}

function createPosts(items, itemsOnPage) {
    const parent = document.querySelector('.posts__body')
    const pagBody = document.createElement('div')
    parent.insertAdjacentElement('afterend', pagBody)
    pagBody.classList.add('posts__pagination', 'pagination')

    createPosts()
    createPag(items)
    filter()

    function createPag(items) {
        const pagNumber = items.length / itemsOnPage
        const pagArr = []
        for (let i = 0; i < pagNumber; i++) {
            pagArr.push(`<div class ='pagination__btn' data-id="${i}">${i + 1}</div>`)
            pagBody.addEventListener('click', (e) => {
                if (e.target.classList.contains('pagination__btn')) {
                    const attr = e.target.dataset.id
                    if (+attr === i) {
                        createPosts(i)
                    }
                }
            })
        }
        pagBody.innerHTML = pagArr.join('')

    }

    function createPosts(startNum = 0) {
        const startFrom = startNum * itemsOnPage
        const data = items.slice(startFrom, startFrom + itemsOnPage)
        renderHtml(data)
    }

    function renderHtml(arr){
        parent.innerHTML = arr.map(el => {
            return `
                <article class="post"> 
                         <div class="post__user">Пользователь ${el.userId}</div>
                         <div class="post__id">Пост № ${el.id}</div>
                         <div class="post__title">${el.title} </div>
                         <div class="post__body">${el.body}</div>
                 </article>
            `
        }).join('')
    }

    function filter(startNum = 0) {
        const filterInput = document.querySelector('.input')
        filterInput.addEventListener('input', (e) => {
            const inputText = e.target.value
            if (e.target && inputText !== '') {
                const startFrom = startNum * itemsOnPage
                const data = items.filter(el => el.body.includes(inputText) ? el : el.innerHTML = '')
                createPag(data)
                const newData = data.slice(startFrom, startFrom + itemsOnPage)
                renderHtml(newData)
            } else createPosts()
                const postBody = document.querySelectorAll('.post__body')
                postBody.forEach(el =>{
                    const textEl = el.innerHTML
                    let index = textEl.indexOf(inputText)
                    el.innerHTML = `
                    ${textEl.substring(0,index)}<mark> ${textEl.substring(index,index+inputText.length)}</mark>${textEl.substring(index + inputText.length)}
                    `
                })
        })
    }
}

renderPosts()




