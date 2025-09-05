// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
function App() {
  const [tasks, setTasks] = useState([]); //タスクの一覧
  const [input, setInput] = useState(""); //入力中のタスク
  const [isPressed, setIsPressed] = useState(false); //ボタンが押されたか
  const [pressedDeleteIndex, setPressedDeleteIndex] = useState(null);

  //入力フォームの内容を更新
  // const handleChange = (e) => {
  //   setInput(e.target.value);
  // };

  //タスク追加
  const handleAdd = () => {
    if (input.trim() === "") return; //空白は追加しない
    setTasks([...tasks, { text: input, completed: false }]);
    setInput(""); //入力欄をクリア

    //ボタンの色を一瞬変える
    setIsPressed(true);
    setTimeout(() => {
      setIsPressed(false);
    }, 150); //150msだけアクティブ状態
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  }

  //タスク削除
  const handleDelete =  (index) => {
    //押されたインデックスを保存
    setPressedDeleteIndex(index);

    //一定時間後にリセット（アニメーション終了）
    setTimeout(() => setPressedDeleteIndex(null), 150);

    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <div className="App" style={{ padding: "20px" }}>
      <h1>ToDoアプリ</h1>

      <input
        type="text"
        value={input}
        // onChange={handleChange}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
        placeholder="タスクを入力"
      />
      <button onClick={handleAdd} className={isPressed ? "pressed" : ""}>追加</button>

      <ul id="todo-list">
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              onClick={() => toggleTask(index)}
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "gray" : "black", cursor: "pointer"
              }}
            >
              {task.text}
            </span>
            
            <button onClick={() => handleDelete(index) } className={pressedDeleteIndex === index ? "pressed" : ""}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
