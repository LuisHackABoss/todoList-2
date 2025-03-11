import {
	addTask,
	deleteAllTasks,
	deleteDoneTasks,
	state,
	toggleFilter,
	toggleOrder,
	toggleStateTask,
} from './state.js';

// Seleccionar el formulario
const form = document.forms.formTodo;

// Seleccionar el p del error
const error = document.querySelector('#error');

// Seleccionar el ul de las tareas
const ul = document.querySelector('ul#todoList');

// Seleccionar los botones
const btnTheme = document.querySelector('#btnTheme');
const btnClear = document.querySelector('#btnClear'); //Tareas hechas
const btnDelete = document.querySelector('#btnDelete'); //Todas las tareas
const btnOrder = document.querySelector('#btnOrder');
const btnFilter = document.querySelector('#btnFilter');
const deleteOk = document.querySelector('#deleteOk');

// Selecccionar el modal
const modal = document.querySelector('.modal-ext');

// Funcion que maneja el evento submit del formulario

const handleSubmit = (e) => {
	e.preventDefault();

	const newTask = form.elements.newTask;
	console.log(newTask);
	const taskText = newTask.value.trim();

	if (taskText !== '') {
		addTask(taskText);
		showerror('');
	} else {
		showerror('La tarea esta vacia');
	}

	// Limpiar el formulario
	form.reset();

	// Renderizar las tareas
	render();
};

// Renderizar las tareas
const render = () => {
	let count = 0;

	// fragment para guardar las tareas
	const fragment = document.createDocumentFragment();
	console.log(state);

	// Ordenar las tareas
	const sortedTasks = state.tasks.sort((a, b) => {
		if (state.createOrder === 'new') {
			return b.createAt - a.createAt;
		} else {
			return a.createAt - b.createAt;
		}
	});

	// Filtrar las tareas
	const filteredTasks = sortedTasks.filter((task) => {
		if (state.doneFilter === 'done') {
			return task.done;
		} else if (state.doneFilter === 'undone') {
			return !task.done;
		} else {
			return true;
		}
	});

	// Recorrer las tareas
	for (const task of filteredTasks) {
		const li = document.createElement('li');
		const input = document.createElement('input');
		const span = document.createElement('span');
		span.textContent = task.text;

		// Añadir atributos al li
		li.dataset.counter = count++;
		li.setAttribute('name', 'task');

		// Añadir atributos al input
		input.setAttribute('type', 'checkbox');
		input.setAttribute('name', 'check');
		if (task.done) {
			input.setAttribute('checked', '');
			span.classList.add('done');
		} else {
			input.removeAttribute('checked');
			span.classList.remove('done');
		}

		//  Añadir al li el input y el span
		li.append(input);
		li.append(span);

		// Añadir los li al fragment
		fragment.append(li);
	}

	// Añadir el fragment al ul
	ul.innerHTML = '';
	ul.append(fragment);

	// Cambiar el contenido de los botones
	btnOrder.textContent = state.createOrder === 'new' ? '⬇️' : '⬆️';
	if (state.doneFilter === 'done') {
		btnFilter.innerHTML = '<img src="./img/done.png" alt="done"/>';
	} else if (state.doneFilter === 'undone') {
		btnFilter.innerHTML = '<img src="./img/undone.png" alt="undone"/>';
	} else {
		btnFilter.innerHTML = '<img src="./img/all.png" alt="all"/>';
	}
};

// Añadir el evento submit al formulario
form.addEventListener('submit', handleSubmit);

// Añadir el evento click al boton de borrar tareas hechas
btnClear.addEventListener('click', () => {
	modal.classList.toggle('hide');
	deleteOk.addEventListener('click', () => {
		deleteDoneTasks();
		render();
	});
});

// Añadir el evento click al boton de borrar todas las tareas
btnDelete.addEventListener('click', () => {
	modal.classList.toggle('hide');
	deleteOk.addEventListener('click', () => {
		deleteAllTasks();
		render();
	});
});

// Añadir el evento click a la ul
ul.addEventListener('click', (e) => {
	const target = e.target;
	if (target.matches('input')) {
		// Modificar el estado de la tarea
		const indexTask = parseInt(target.parentElement.dataset.counter);
		toggleStateTask(indexTask);
		render();
	}
});

// Añadir el evento click al boton de ordenar
btnOrder.addEventListener('click', () => {
	toggleOrder();
	render();
});

// Añadir el evento click al boton de filtrar
btnFilter.addEventListener('click', () => {
	toggleFilter();
	render();
});

// Añadir el evento click al modal
modal.addEventListener('click', (e) => {
	modal.classList.toggle('hide');
});

// Mostrar error
const showerror = (message) => {
	error.textContent = message;
};

render();
