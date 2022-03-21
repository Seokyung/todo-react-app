import React from 'react';

class Todo extends React.Component {
    //Todo 컴포넌트 생성자 코드
    constructor(props) {
        super(props); //super를 이용해 props 오브젝트 초기화
        this.state = { item: props.item }; //this.state를 item변수와 props.item으로 초기화
    }

    render() {
        return (
            <div classname="Todo">
                <input type="checkbox" id={this.state.item.id} name={this.state.item.id} checked={this.state.item.done}/>
                <label id={this.state.item.id}>{this.state.item.title}</label>
            </div>
        );
    }
}

export default Todo;