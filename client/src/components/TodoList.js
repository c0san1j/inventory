import React, { useState, useEffect } from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import api from '../api/posts';

function TodoList() {
	const [todos, setTodos] = useState([]);

	const makePost = async (serial) => {
		try {
			const response = await api.post('/inventory/', {
				serial: serial,
			});
			// const { _id, model, status, serial } = response.data;
			// setTodos(response.data);
			// console.log(response.data);
		} catch (error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else {
				console.log(`Error: ${error.message}`);
			}
		}
	};

	const getOneVan = async (serial) => {
		try {
			const response = await api.get(`/inventory/${serial}`);
			// const { _id, model, status, serial } = response.data;
			// setTodos(response.data);
			console.log(response.data);
			return response.data;
		} catch (error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else {
				console.log(`Error: ${error.message}`);
			}
		}
	};

	const delVan = async (id) => {
		try {
			const response = await api.post('/inventory/del', { id: id });
			// const { _id, model, status, serial } = response.data;
			// setTodos(response.data);
			console.log(response.data);
			// return response.data;
		} catch (error) {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else {
				console.log(`Error: ${error.message}`);
			}
		}
	};

	useEffect(() => {
		const fetchPosts = async () => {
			try {
				const response = await api.get('/inventory');
				// const { _id, model, status, serial } = response.data;
				setTodos(response.data);
				console.log(`response: ${response.data}`);
			} catch (error) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else {
					console.log(`Error: ${error.message}`);
				}
			}
		};
		fetchPosts();
	}, []);

	const addTodo = async (todo) => {
		if (!todo.text || /^\s*$/.test(todo.text)) {
			return;
		}

		//redis or mongodb
		await makePost(todo.text);
		const newTodoDB = await getOneVan(todo.text);
		// console.log(JSON.parse(newTodoDB));

		// console.log(todo);

		const newTodos = [newTodoDB, ...todos];
		setTodos(newTodos);
	};

	const removeTodo = async (id) => {
		const removeArr = [...todos].filter((todo) => todo.id !== id);
		console.log(id);
		await delVan(id);

		setTodos(removeArr);
	};

	const updateTodo = (todoId, newValue) => {
		if (!newValue.text || /^\s*$/.test(newValue.text)) {
			return;
		}
		setTodos((prev) =>
			prev.map((item) => (item.id === todoId ? newValue : item))
		);
	};

	const completeTodo = (id) => {
		let updatedTodos = todos.map((todo) => {
			if (todo.id === id) {
				todo.isComplete = !todo.isComplete;
			}
			return todo;
		});
		setTodos(updatedTodos);
	};

	return (
		<div>
			<h1>What the plan for today?</h1>
			<TodoForm onSubmit={addTodo} />
			<Todo
				todos={todos}
				completeTodo={completeTodo}
				removeTodo={removeTodo}
				updateTodo={updateTodo}
			/>
		</div>
	);
}

export default TodoList;
