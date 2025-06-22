import React, { useState, useEffect } from 'react';
import style from './SimpleTodo.module.css';

function SimpleTodo() {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const addTask = () => {
        if (task.trim() === '') return;
        setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
        setTask('');
    };

    const toggleComplete = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const removeTask = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') addTask();
    };

    return (
        <div className={style.container}>
            <h2 className={style.title}>📝Your To-Do List for Today</h2>

            <div className={style.inputGroup}>
                <input
                    type="text"
                    placeholder="Add a new task..."
                    value={task}
                    onChange={e => setTask(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className={style.input}
                />
                <button
                    onClick={addTask}
                    className={style.button}
                    aria-label="Add task"
                >
                    Add
                </button>
            </div>

            <ul className={style.taskList}>
                {todos.length === 0 && (
                    <li className={style.emptyState}>
                        No tasks yet. Start by adding one!
                    </li>
                )}

                {todos.map(todo => (
                    <li
                        key={todo.id}
                        className={`${style.taskItem} ${todo.completed ? style.completed : ''}`}
                        onClick={() => toggleComplete(todo.id)}
                        title="Click to toggle complete"
                    >
                        <span>{todo.text}</span>
                        <button
                            onClick={e => {
                                e.stopPropagation();
                                removeTask(todo.id);
                            }}
                            aria-label="Remove task"
                        >
                            &times;
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SimpleTodo;
