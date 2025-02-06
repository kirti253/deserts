import "./App.css";
import Todo from "./todo";

const sampleTodo = {
  title: "wohooooo",
  description: "edfrcnwkre",
  done: false,
};

function App() {
  return (
    <div>
      <h1>My Todo List</h1>
      <Todo todo={sampleTodo} />
    </div>
  );
}

export default App;
