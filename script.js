class Todo {
    constructor(add, list, input) {
        this.add = add;
        this.list = list;
        this.input = input;
        this.storage = "todo";
    }
    static add_del_event(element, obj) {
        element.addEventListener("click", function() {
            this.parentNode.parentNode.removeChild(this.parentNode)
            let req_elem = element.parentNode.querySelector(".task_text")
            obj.delete_from_storage(req_elem.id)
        })
    }

    show({ place = this.list, value } = {}) {
        let data = `<div class="added_task">
                        <box-icon name='dialpad-alt'></box-icon>
                        <p class="task_text"></p>
                        <img src="delete.svg" alt="" class="delete" id="delete">
                    </div>`

        place.innerHTML += data

        let pos = document.querySelectorAll(".task_text");
        pos.forEach((element, index) => {
            element.id = index
        })

        let cur_pos = pos[(pos.length) - 1]
        cur_pos.textContent = value

        let del = document.querySelectorAll(".delete")
        del.forEach(element => {
            Todo.add_del_event(element, this)
        })

    }

    add_to_storage(value) {
        let key_name = this.storage;
        let storage_data = localStorage.getItem(key_name);
        if (storage_data) {
            let data = JSON.parse(storage_data);
            data.push(value);
            let stringified_data = JSON.stringify(data);
            localStorage.setItem(key_name, stringified_data)
        } else {
            let arr = [value]
            let stringied_arr = JSON.stringify(arr)
            localStorage.setItem(key_name, stringied_arr)
        }
    }

    retrieve_from_storage() {
        let key = this.storage;
        let data_stored = JSON.parse(localStorage.getItem(key));
        if (data_stored) {
            data_stored.forEach(element => {
                this.show({ value: element })
            })
        }
    }

    delete_from_storage(id) {
        let key = this.storage;
        let stored_data = JSON.parse(localStorage.getItem(key));
        stored_data.splice(id, 1)
        let new_data = JSON.stringify(stored_data)
        localStorage.setItem(key, new_data)
    }

    add_data() {
        let data = `<div class="added_task">
                        <box-icon name='dialpad-alt'></box-icon>
                        <p class="task_text"></p>
                        <img src="delete.svg" alt="" class="delete" id="delete">
                    </div>`
        let value = this.input.value;

        if (value) {

            this.show({ value: value })
            this.add_to_storage(value)
        }
    }

}

let add = document.getElementById("add");
let input = document.getElementById("task_input")
let list = document.getElementById("task_list")

let todo = new Todo(add, list, input)

todo.retrieve_from_storage()
add.onclick = () => {
    todo.add_data()
}