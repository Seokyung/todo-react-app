import React from 'react';
import Todo from './Todo.js';
import AddTodo from './AddTodo.js';
import { Paper, List, Container } from "@material-ui/core";
import './App.css';

class App extends React.Component {
  //componentDidMount() - 렌더링이 맨 처음 일어나고 마운팅 후 바로 부르는 함수
  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    fetch("http://localhost:8080/todo", requestOptions)
    .then((response) => response.json())
    .then(
      (response) => {
        this.setState({
          items: response.data,
        });
      },
      (error) => {
        this.setState({
          error,
        });
      }
    );
  }

  //App 컴포넌트 생성자 코드 - 생성자에서 props를 넘겨받고 this.state에서 item을 초기화해줌
  constructor(props) {
    super(props);
    //item -> items 배열로
    this.state = {
      items: [],
    };
  }

  //add 함수 추가 (Todo 추가하는 함수)
  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; //key를 위한 id 추가
    console.log("id : ", thisItems.length)
    item.done = false; //done 초기화
    thisItems.push(item) //리스트에 아이템 추가
    this.setState({ items: thisItems }); //업데이트는 반드시 this,setState로 해야함
    console.log("items : ", this.state.items);
  }

  //delete 함수 추가 (Todo 삭제하는 함수)
  //기존 items(thisItems 변수)에서 매개변수로 넘어온 item을 제외한 새 items(newItems 변수)를 state에 저장 - filter() 사용
  delete = (item) => {
    const thisItems = this.state.items;
    console.log("Before Updating Items : ", this.state.items)
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      //디버깅 콜백
      console.log("Updated Items : ", this.state.items)
    });    
  }

  render() {
    //자바스크립트가 제공하는 map 함수를 이용해 배열을 반복해 <Todo... /> 컴포넌트 생성
    var todoItems = (this.state.items.length !== 0) && ( //배열 초기값이 없어서 this.state.items.length>0로 조건을 주면 오류가 났다.. 조건을 0이 아니면으로 바꿔줬더니 고쳐졌다
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
            /> // item={변수}를 아용해 props로 매개변수를 넘김
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
