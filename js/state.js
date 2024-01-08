'use strict';

const localeStorageState = JSON.parse(localStorage.getItem('stateTodoList'));

export const state = localeStorageState
	? localeStorageState
	: {
			tasks: [],
			night: false,
			createOrder: 'new',
			doneFilter: 'all',
	  };

// Añadir tareas
export const addTask = (task) => {
	const taskObject = {
		text: task,
		done: false,
		createAt: new Date().getTime(),
	};

	// Añadir tarea al array
	state.tasks.push(taskObject);

	// Guardar en localStorage
	saveState();
};

// Eliminar tareas hechas
export const deleteDoneTasks = () => {
	state.tasks = state.tasks.filter((task) => !task.done);
	saveState();
};

// Eliminar todas las tareas
export const deleteAllTasks = () => {
	state.tasks = [];
	saveState();
};

// Marcar tareas como hechas
export const toggleStateTask = (index) => {
	state.tasks[index].done = !state.tasks[index].done;
	saveState();
};

// Cambiar el orden de las tareas
export const toggleOrder = () => {
	state.createOrder === 'new'
		? (state.createOrder = 'old')
		: (state.createOrder = 'new');
	saveState();
};

// Cambiar el filtro de las tareas
export const toggleFilter = () => {
	if (state.doneFilter === 'done') {
		state.doneFilter = 'undone';
	} else if (state.doneFilter === 'undone') {
		state.doneFilter = 'all';
	} else {
		state.doneFilter = 'done';
	}
	saveState();
};

// Guardar el estado en localStorage
const saveState = () => {
	localStorage.setItem('stateTodoList', JSON.stringify(state));
};
