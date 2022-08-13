let wrapper = document.createElement('div')
let text = document.createElement('h1')
let grid = document.createElement('div')
let form = document.forms.frm
let btn = document.querySelector('button')
let url = "http://localhost:3001"
let del = document.querySelector('.delete')

function getData() {
    axios.get(url + '/todos')
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                reload(res.data)
            }
        })
}
getData()



form.onsubmit = (event) => {
    event.preventDefault()

    let get = {
        isDone: false,
        time: new Date().getHours() + ':' + new Date().getMinutes()
    }

    let fm = new FormData(form)
    fm.forEach((value, key) => {
        get[key] = value
    })

    axios.post(url + '/todos', get)
        .then(res => {
            if (res.status === 200 || res.status === 201) {
                getData() 
            }
        })
        .catch(err => console.log(err))

}

// del.onclick = () => {
//     axios.delete(url + '/todos', id)
// }

function reload(arr) {
    grid.innerHTML = ""

    for (let info of arr) {
        // a create
        let item = document.createElement('item')
        let text2 = document.createElement('h2')
        let paragraph = document.createElement('p')
        let img = document.createElement('img')
        // b decor
        item.classList.add('item')

        info.isDone ? item.classList.add('item_done') : console.log()

 
        

        text2.classList.add('text2')
        text2.innerHTML = info.task
        paragraph.classList.add('paragraph')
        paragraph.innerHTML = info.time
        img.classList.add('image')
        img.src = 'картинки/delete-img.svg'
        // c add
        grid.append(item)
        item.append(text2)
        item.append(paragraph)
        item.append(img)

        // functions
        // img.onclick = () => {
        //     let idx = todos.indexOf(info)

        //     todos.splice(idx, 1)
        //     reload(todos)
        // }
        img.onclick = () => {
            axios.delete(url + '/todos/' + info.id)
            .then(res => {
                if (res.status === 200 || res.status === 201) {
                                getData() 
                            }
            }) .catch(err => console.log(err))
        
        }  

        text2.onclick = () => {
            info.isDone = !info.isDone

            reload(todos)
        }

    }
}

// b decor
wrapper.classList.add('wrapper')
text.innerHTML = 'Todo List'
text.classList.add('text')
grid.classList.add('grid')

// text.onclick = () => {
//     axios.delete('/todos' + '/id')
//     .then(rec => {
//         if (rec.status === 200 || rec.status === 201) {
//             getData() 
//         }
//     })
    
// }
//  c add
wrapper.append(text, grid, )
document.body.prepend(wrapper)