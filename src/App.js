import React from 'react';
import Todo from './Todo.js';
import './App.css';

class App extends React.Component {
  //App 컴포넌트 생성자 코드 - 생성자에서 props를 넘겨받고 this.state에서 item을 초기화해줌
  constructor(props) {
    super(props);
    this.state = {
      item: { id: 0, title: "Hello World 1", done: true }, //this.state.item을 이용해 item 오브젝트에 접근
      item2: { id: 1, title: "Hello World 2", done: false},
    };
  }

  render() {
    return (
      <div className="App">        
        <Todo item={this.state.item} /> {/* item={변수}를 아용해 props로 매개변수를 넘김 */}
        <Todo item={this.state.item2} />
      </div>
    )
  }
}

export default App;
