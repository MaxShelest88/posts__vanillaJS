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

    createPosts()
    createPag(items)
    filter()

    function createPag(items) {
        const pagNumber = items.length / itemsOnPage
        const pagBody = document.createElement('div')
        parent.insertAdjacentElement('afterend', pagBody)
        pagBody.classList.add('posts__pagination', 'pagination')
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
        const postsHtml = data.map(el => {
            return `
                <article class="post"> 
                         <div class="post__user">Пользователь ${el.userId}</div>
                         <div class="post__id">Пост № ${el.id}</div>
                         <div class="post__title">${el.title} </div>
                         <div class="post__body">${el.body}</div>
                 </article>
            `
        }).join('')
        return parent.innerHTML = postsHtml
    }

    function filter() {
        const filterInput = document.querySelector('.input')
        filterInput.addEventListener('input', (e) => {
            if (e.target.value) {
                const data = items.filter(el => el.body.includes(e.target.value) ? el : el.innerHTML = '')
                const postsHtml = data.map(el => {
                    return `
                <article class="post"> 
                         <div class="post__user">Пользователь ${el.userId}</div>
                         <div class="post__id">Пост № ${el.id}</div>
                         <div class="post__title">${el.title} </div>
                         <div class="post__body">${el.body}</div>
                 </article>
            `
                }).join('')
                return parent.innerHTML = postsHtml
            } else {
                createPosts()
            }

        })
    }
}

renderPosts()




