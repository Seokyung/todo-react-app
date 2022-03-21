import React from 'react';
import Todo from './Todo.js';
import { Paper, List } from "@material-ui/core";
import './App.css';

class App extends React.Component {
  //App 컴포넌트 생성자 코드 - 생성자에서 props를 넘겨받고 this.state에서 item을 초기화해줌
  constructor(props) {
    super(props);
    //1. item -> items 배열로
    this.state = {
      items: [
        { id: 0, title: "Hello World 1", done: true }, //this.state.item을 이용해 item 오브젝트에 접근
        { id: 1, title: "Hello World 2", done: false},
      ],
    };
  }

  render() {
    //2. 자바스크립트가 제공하는 map 함수를 이용해 배열을 반복해 <Todo... /> 컴포넌트 생성
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} /> // item={변수}를 아용해 props로 매개변수를 넘김
          ))}
        </List>
      </Paper>
    );

    //3. 생성된 컴포넌트 리턴    
    return (
      <div className="App">
        {todoItems}
      </div>
    )
  }
}

export default App;
