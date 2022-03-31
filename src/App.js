import React from 'react';
import Todo from './Todo.js';
import AddTodo from './AddTodo.js';
import { call, signout } from './service/ApiService';
import { Paper, List, Container, Grid, Button, AppBar, Toolbar, Typography } from "@material-ui/core";
import './App.css';

class App extends React.Component { 
  //App 컴포넌트 생성자 코드 - 생성자에서 props를 넘겨받고 this.state에서 item을 초기화해줌
  constructor(props) {
    super(props);
    //item -> items 배열로
    this.state = {
      items: [],
      loading: true, //로딩중이라는 상태를 표현할 변수 생성자에 상태 변수 추가
    };
  }

  //componentDidMount() - 렌더링이 맨 처음 일어나고 마운팅 후 바로 부르는 함수
  componentDidMount() {
    //ApiService 메서드 이용
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false }) //componentDidMount의 GET 요청이 성공적으로 리턴하는 경우 loading: false (더이상 로딩중이 아님)
    );

    /*
    //ApiService 사용 전 코드
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
    */
  }

  //add 함수 추가 (Todo 추가하는 함수)
  add = (item) => {
    //ApiService 메서드 이용
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );

    /*
    //ApiService 사용 전 코드
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; //key를 위한 id 추가
    console.log("id : ", thisItems.length)
    item.done = false; //done 초기화
    thisItems.push(item) //리스트에 아이템 추가
    this.setState({ items: thisItems }); //업데이트는 반드시 this,setState로 해야함
    console.log("items : ", this.state.items);
    */
  };

  //delete 함수 추가 (Todo 삭제하는 함수)
  //기존 items(thisItems 변수)에서 매개변수로 넘어온 item을 제외한 새 items(newItems 변수)를 state에 저장 - filter() 사용
  delete = (item) => {
    //ApiService 메서드 이용
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );

    /*
    //ApiService 사용 전 코드
    const thisItems = this.state.items;
    console.log("Before Updating Items : ", this.state.items)
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      //디버깅 콜백
      console.log("Updated Items : ", this.state.items)
    });
    */
  };

  //update 함수 추가 (Todo 수정하는 함수)
  update = (item) => {
    //ApiService 메서드 이용
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render() {
    //자바스크립트가 제공하는 map 함수를 이용해 배열을 반복해 <Todo... /> 컴포넌트 생성
    var todoItems = (this.state.items.length > 0) && ( //배열 초기값이 없어서 this.state.items.length>0로 조건을 주면 오류가 났다.. 조건을 0이 아니면으로 바꿔줬더니 고쳐졌다 => 백엔드와 연결 후에 자동으로 null 데이터가 추가돼서 원래 코드로 고쳐주었다.
      <Paper style={{ margin: 16 }}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo
              item={item}
              key={item.id}
              delete={this.delete}
              update={this.update}
            /> // item={변수}를 아용해 props로 매개변수를 넘김
          ))}
        </List>
      </Paper>
    );

    //navigationBar 추가
    var navigationBar = (
      <AppBar position="static">
        <Toolbar>
          <Grid justifyContent="space-between" container>
            <Grid item>
              <Typography variant='h6'>일해라 노예들아 하하하</Typography>
            </Grid>
            <Grid>
              <Button color="inherit" onClick={signout}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    //로딩중이 아닐 때 렌더링할 부분 (props로 넘겨주기, 생성된 컴포넌트 리턴, add 함수 연결)
    var todoListPage = (
      <div>
        {navigationBar} {/* 내비게이션 바 렌더링 */}
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );

    //로딩중일 때 렌더링할 부분
    var loadingPage = <h2 style={{color:"#ec407a"}}>조금만 기다료바~^^</h2>;

    var content = loadingPage;

    if (!this.state.loading) {
      //로딩중이 아니면 todoListPage 선택
      content = todoListPage;
    }

    //선택한 content 렌더링
    return (
      <div className="App">
        {content}
      </div>
    )
  }
}

export default App;
