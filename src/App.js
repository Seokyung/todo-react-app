import React from 'react';
import Todo from './Todo.js';
import AddTodo from './AddTodo.js';
import { Paper, List, Container } from "@material-ui/core";
import './App.css';

class App extends React.Component {
  //App 컴포넌트 생성자 코드 - 생성자에서 props를 넘겨받고 this.state에서 item을 초기화해줌
  constructor(props) {
    super(props);
    //item -> items 배열로
    this.state = {
      items: [
        { id: 0, title: "Hello World 1", done: true }, //this.state.item을 이용해 item 오브젝트에 접근
        { id: 1, title: "Hello World 2", done: false},
      ],
    };
  }

  //add 함수 추가
  add = (item) => {
    const thisItems = this.state.itmes;
    item.id = "ID-" + thisItems.length; //key를 위한 id 추가
    item.done = false; //done 초기화
    thisItems.push(item) //리스트에 아이템 추가
    this.setState({ items: thisItems }); //업데이트는 반드시 this,setState로 해야함
    console.log("items : ", this.state.items);
  }

  render() {
    //자바스크립트가 제공하는 map 함수를 이용해 배열을 반복해 <Todo... /> 컴포넌트 생성
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} /> // item={변수}를 아용해 props로 매개변수를 넘김
          ))}
        </List>
      </Paper>
    );

    //생성된 컴포넌트 리턴, add 함수 연결
    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    )
  }
}

export default App;
