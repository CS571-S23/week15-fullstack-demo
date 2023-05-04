import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // TODO not hardcode
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: "Hello World",
      content: "Hello!"
    },
    {
      id: 2,
      title: "Lorem Ipsum",
      content: "Dolor sit."
    }
  ])
  
  const addPost = () => {
    // TODO actually add
    alert("Post added!");
  }

  return (
    <div className="App">
      <h1>BadgerChat Basic</h1>
      <div>
        <label htmlFor='input-title'>Title</label>
        <input
          id='input-title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor='input-content'>Content</label>
        <input
          id='input-content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={addPost}>Add Post</button>
      </div>
      <br/>
      {
        messages.map(m => 
          <div key={m.id}>
            <h2>{m.title}</h2>
            <p>{m.content}</p>
          </div>
        )
      }
    </div>
  );
}

export default App;
