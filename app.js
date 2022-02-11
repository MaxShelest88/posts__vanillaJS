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
    const filterInput = document.querySelector('.input')
    const inputValue = filterInput.value

    createPosts()
    createPag(items)
    filter()

    function removeActive(selector){
        const items = document.querySelectorAll(selector)
        items.forEach(item=>{
            item.classList.remove('active')
        })
    }

    function createPag(items) {
        const pagNumber = items.length / itemsOnPage
        const pagArr = []
        for (let i = 0; i < pagNumber; i++) {
            pagArr.push(`<div class ='pagination__btn' data-id="${i}">${i + 1}</div>`)
            pagBody.addEventListener('click', (e) => {
                if (e.target.classList.contains('pagination__btn')) {
                    const inputValue = filterInput.value
                    const attr = e.target.dataset.id
                    if (+attr === i) {
                        createPosts(i)
                        removeActive('.pagination__btn')
                        e.target.classList.add('active')
                    }
                    if(inputValue !=='' && +attr === i){
                        createPosts(i, inputValue)
                        textHighlight (inputValue)
                    }
                }
            })
        }
        pagArr[0]=`<div class ='pagination__btn active' data-id="0">1</div>`
        pagBody.innerHTML = pagArr.join('')
    }

    function createPosts(startNum = 0, inputValue='') {
        const startFrom = startNum * itemsOnPage
        if(inputValue === ''){
            const data = items.slice(startFrom, startFrom + itemsOnPage)
            renderHtml(data)
        }
        if(inputValue !== ''){
            const data = items.filter(el => {
                const elText = JSON.stringify(el)
                return elText.includes(inputValue) ? el : el.innerHTML = ''
            })
            const newData = data.slice(startFrom, startFrom + itemsOnPage)
            renderHtml(newData)
        }

    }

    function renderHtml(arr) {
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

    function textHighlight (inputValue){
        const posts = document.querySelectorAll('.post')
        posts.forEach(el => {
            const elChildren = [...el.children]
            elChildren.forEach(item => {
                const textEl = item.innerHTML
                if (textEl.includes(inputValue) && inputValue !== '') {
                    let index = textEl.indexOf(inputValue)
                    item.innerHTML = `
                        ${textEl.substring(0, index)}<mark>${textEl.substring(index, index + inputValue.length)}</mark>${textEl.substring(index + inputValue.length)}
                        `
                }
            })
        })
    }

    function filter(startNum = 0) {
        filterInput.addEventListener('input', (e) => {
            const inputText = e.target.value
            if (e.target && inputText !== '') {
                const startFrom = startNum * itemsOnPage
                const data = items.filter(el => {
                    const elText = JSON.stringify(el)
                    return elText.includes(inputText) ? el : el.innerHTML = ''
                })
                createPag(data)
                const newData = data.slice(startFrom, startFrom + itemsOnPage)
                renderHtml(newData)
            } else {
                createPosts()
                createPag(items)}
            textHighlight (inputText)
        })
        textHighlight(inputValue)
    }
}

renderPosts()
