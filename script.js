//todo list with watch and code
var todoList ={
	todos: [],
	addTodo: function(todoText) {
		this.todos.push({
			todoText: todoText,
			completed: false
		});
	},
	changeTodo: function(position, newTodoText) {
		this.todos[position].todoText = newTodoText;
		view.displayTodos();
	},
	deleteTodo: function(position) {
		this.todos.splice(position, 1);
	},
	toggleCompleted: function(position) {
		var todo = this.todos[position];
		todo.completed = !todo.completed;
	},
	toggleAll: function() {
		var totalTodos = this.todos.length;
		var completedTodos = 0;
		this.todos.forEach(function(todo) {
			if (todo.completed) {
				completedTodos += 1;
			}
		});
		this.todos.forEach(function(todo) {
			if (completedTodos === totalTodos) {
				todo.completed = false;	
				document.getElementsByClassName("checkCompletionButton").checked = false;
			} else {
				todo.completed = true;
				document.getElementsByClassName("checkCompletionButton").checked = true;
			}
		});
	}
};

var handlers = {
	toggleAll: function() {
		todoList.toggleAll();
		view.displayTodos();
	},
	addTodo: function() {
		var addTodoText = document.getElementById("addTodoText");
		todoList.addTodo(addTodoText.value);
		addTodoText.value = "";
		view.displayTodos();
	},
	deleteTodo: function (position) {
		todoList.deleteTodo(position);
		view.displayTodos();
	},
	toggleCompleted: function (position) {
		todoList.toggleCompleted(position);
		view.displayTodos();
	}
}

var view = {
	displayTodos: function() {
		var todosUl = document.querySelector("ul");
		todosUl.innerHTML = "";
		
		todoList.todos.forEach(function(todo, position) {
			var todoLi = document.createElement("li");
			
			var todoLiText = document.createElement("input");
			todoLiText.type = "text";
			todoLiText.disabled = true;
			todoLiText.className = "todoDisabledInput";
			todoLiText.value = todo.todoText;
			var checkButton = view.createCheckButton();
			
			if (todo.completed === true) {
				checkButton.checked = true;
			} else {
				checkButton.checked = false;
			}
			todoLi.id = position;
			checkButton.id = todoLi.id + "check";

			var checkLabel = document.createElement("label");
			checkLabel.htmlFor = checkButton.id;
			var checkSpan = document.createElement("span");
			checkSpan.className = "checkSpan";

			checkLabel.appendChild(checkSpan);

			todoLi.appendChild(checkButton);
			todoLi.appendChild(checkLabel);
			todoLi.appendChild(todoLiText);
			todoLi.appendChild(view.createDeleteButton());
			todosUl.appendChild(todoLi);
		});
	},
	createDeleteButton: function() {
		var deleteButton = document.createElement('button');
		deleteButton.innerHTML = "&#10008";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},
	createCheckButton: function() {
		var checkButton = document.createElement("input");
		checkButton.type = "checkbox";
		checkButton.className = "checkCompletionButton";
		return checkButton;
	},
	setupEventListener: function() {
		var todosUl = document.querySelector('ul');
		todosUl.addEventListener("click", function(event) {
			var elementClicked = event.target;
			var position = elementClicked.parentNode.id;
			if (elementClicked.className === "deleteButton") {
				handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
			} else if (elementClicked.className === "checkCompletionButton") {
				handlers.toggleCompleted(parseInt(elementClicked.parentNode.id));
			} else if (elementClicked.className === "todoDisabledInput") {
				elementClicked.disabled = false;
				elementClicked.className += "activeTextInput";
				elementClicked.focus();
				elementClicked.select();
				elementClicked.addEventListener("keyup", function(event) {
					if (event.keyCode === 13) {
						var textInput = elementClicked.value;
						elementClicked.disabled = true;
						elementClicked.classList.remove("activeTextInput");
						todoList.changeTodo(position, textInput);
					}
				});
			}
		});
		
		var addInput = document.getElementById("addTodoText");
		addInput.addEventListener("keyup", function(event) {
			event.preventDefault();
			if (event.keyCode === 13) {
				handlers.addTodo();
			}
		});
	},
}



view.setupEventListener();






