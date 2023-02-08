import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { v4 as uuid } from "uuid";

const App = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [s_todo, setS_Todo] = useState([]);
  const [todoDate, setTodoDate] = useState('2000-01-01');
  const [todoCat, setTodoCat] = useState('Home');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [byCat, setByCat] = useState('');

  const addTodo = () => {
    const id = uuid();
    if(todo.length) {
      setTodos([...todos, {id: id, text: todo, status: false, category: todoCat, date: todoDate}]);
    }
    
  };


  const deleteTodo = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const markAsDone = (id) => {
    setTodos(
      todos.map((t) => {
        if(t.id === id) {
          t.status = !t.status;
        }
        return t;
      })
    )
  };

  const showAll = () => {
        setS_Todo('');
        setByCat('');
        setEndDate('');
        setStartDate('');
  }

  return (
  <>
    <h1>Tasks To Do</h1>
    <input 
      value = {todo}
      onChange = {(e) => setTodo(e.target.value)}
      type = 'text'
      placeholder='Enter Task'
    />

    <select onChange = {(e) => setTodoCat(e.target.value)}>
      <option value="Home">Home</option>
      <option value="School">School</option>
      <option value="Work">Work</option>
      <option value="Misc">Misc</option>
    </select>

    <input 
      value = {todoDate}
      onChange = {(e) => setTodoDate(e.target.value)}
      type = "date"
    />

    <br />
    <button onClick = {() => addTodo(todo)}>Add</button>
    <br />

    <div>
      <input 
        value = {s_todo}
        type = "text"
        onChange = {(e) => setS_Todo(e.target.value)}
        placeholder = "Search"
      />
      <br />

      <input
        value = {byCat}
        type = 'text'
        onChange = {(e) => setByCat(e.target.value)}
        placeholder = 'Search by Category'
      />
      <br />

      <input 
        value = {startDate}
        onChange = {(e) => setStartDate(e.target.value)}
        type = "date"
      />

      Between
      <input 
        value = {endDate}
        onChange = {(e) => setEndDate(e.target.value)}
        type = "date"
      />
      <br />
      <button onClick = {() => showAll()}>Show All</button>
      <ol>
        {todos.filter((t) => {
          if(t.text.includes(s_todo)) {
            return t;
          }
          }).filter((t) => {
            if(t.category.includes(byCat)) {
              return t;
            }
          }).filter((t) => {
            if(startDate == '' && endDate == '') {
              return t;
            }
            else if(startDate == '' && endDate !== '') {
              if(t.date <= endDate) {
                return t;
              }
            }
            else if(startDate !== '' && endDate == '') {
              if(t.date >= startDate) {
                return t;
              }
            }
            else {
              if(t.date >= startDate && t.date <= endDate) {
                return t;
              }
            }
          })
          .map((todo) => {
            return (
              <li>
                <input type = "checkbox"
                  onChange = {() => {
                    markAsDone(todo.id);
                  }}
                />
                {todo.status === true ? <s> {todo.text}</s> : todo.text}
                {todo.status === true ? <s> {todo.category}</s> : todo.category}
                {todo.status === true ? <s> {todo.date}</s> : todo.date}
                <button onClick = {() => deleteTodo(todo.id)}>Delete</button>
                
              </li>
            );
          })}
      </ol>
    </div>
  </>  
  );
};


ReactDOM.render(<App />, document.getElementById("root"));