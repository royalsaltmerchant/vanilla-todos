// addtodo
function addTodo(todo) {
  const list = document.querySelector('#todo-list')
  const row = document.createElement('tr')

  row.innerHTML = `
    <td>${todo.title}</td>
    <td>${todo.description}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">Remove</a></td>
  `
  list.appendChild(row)
}

function clearTodoForm() {
  document.querySelector('#title').value = ''
  document.querySelector('#description').value = ''
}

function removeTodo(todo) {
  todo.parentElement.parentElement.remove()
}

document.querySelector('#form-todo').addEventListener('submit', function(event) {
  event.preventDefault()

  const title = document.querySelector('#title').value
  const description = document.querySelector('#description').value
  const todo = {title: title, description: description}

  if(title === '' || description === '') {
    alert('Please add content to the todo')
  } else {
    addTodo(todo)
    Store.addTodo(todo)
    clearTodoForm()
  }
})

//remove todo
document.querySelector('#todo-list').addEventListener('click', function(event) {
  event.preventDefault()
  removeTodo(event.target)
  Store.removeTodo(event.target.parentElement.previousElementSibling.previousElementSibling.textContent)
})

// Store:
class Store {
  static getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
      todos = []
    } else {
      todos = JSON.parse(localStorage.getItem('todos'))
    }

    return todos
  }

  static addTodo(todo) {
    const todos = Store.getTodos()

    todos.push(todo)
    
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  
  static removeTodo(title) {
    const todos = Store.getTodos()

    todos.forEach((todo, index) => {
      if(todo.title === title) {
        todos.splice(index, 1)
      }
    })

    localStorage.setItem('todos', JSON.stringify(todos))
  }
}

//get And Add Stored Todos
function getAndAddStoredTodos() {
  const todos = Store.getTodos()

  todos.forEach(function(todo) {addTodo(todo)})
}

// component did mount
document.addEventListener('DOMContentLoaded', getAndAddStoredTodos)