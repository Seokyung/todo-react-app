import React from 'react';
import {
    ListItem,
    ListItemText,
    InputBase,
    Checkbox,
    ListItemSecondaryAction,
    IconButton
} from "@material-ui/core";
import { DeleteOutlined } from '@material-ui/icons';

class Todo extends React.Component {
    //Todo 컴포넌트 생성자 코드
    constructor(props) {
        super(props); //super를 이용해 props 오브젝트 초기화
        this.state = { item: props.item, readOnly: true }; //this.state를 item변수와 props.item으로 초기화, readOnly 상태변수 추가
        this.delete = props.delete; //delete를 this.delete에 할당
        this.update = props.update; //update를 this.update에 할당
    }

    //deleteEventHandler 함수
    deleteEventHandler = () => {
        this.delete(this.state.item) //this.state.item을 이용해 item 오브젝트에 접근
        console.log("Deleted item: ", this.state.item);
    }

    //title 클릭 시 읽기모드가 해제되는 함수
    offReadOnlyMode = () => {
        console.log("ReadOnly-Event!", this.state.readOnly)
        this.setState({ readOnly: false }, () => { //readOnly를 false로 바꿔줌
            console.log("ReadOnly? ", this.state.readOnly)
        });
    }

    //엔터 키를 누르면 다시 읽기모드가 활성화되는 함수
    enterKeyEventHandler = (e) => {
        if (e.key === "Enter") {
            this.setState({ readOnly: true });
            this.update(this.state.item); //엔터를 누르면 저장
            console.log("Updated item: ", this.state.item);
        }
    };

    //사용자가 키보드의 키로 입력할 때마다 item값을 새로 변경하는 함수
    editEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.title = e.target.value;
        this.setState({ item: thisItem });
        console.log("수정: ", thisItem.title);
    }

    //checkbox의 상태(체크여부)를 업데이트해주는 함수
    checkboxEventHandler = (e) => {
        const thisItem = this.state.item;
        thisItem.done = !thisItem.done;
        this.setState({ item: thisItem });
        this.update(this.state.item); //체크박스가 변경되면 저장
        console.log("체크여부 : ", thisItem.done);
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox
                    checked={item.done}
                    onChange={this.checkboxEventHandler} //체크여부 업데이트해주는 함수 연결
                />

                <ListItemText>
                    <InputBase
                        inputProps={{
                            "aria-label": "naked",
                            readOnly: this.state.readOnly, //readOnly 상태 연결
                        }}                        
                        type="text"
                        id={item.id} //각 리스트를 구분하려고 id(고유번호)를 연결
                        name={item.id} // 각 리스트를 구분하려고 id를 연결
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                        onClick={this.offReadOnlyMode} //읽기모드 해제 함수 연결
                        onChange={this.editEventHandler} //item값 수정하는 함수 연결
                        onKeyPress={this.enterKeyEventHandler} //읽기모드 활성화 함수 연결
                    />
                </ListItemText>

                <ListItemSecondaryAction>
                    <IconButton
                        aria-label="Delete Todo"
                        onClick={this.deleteEventHandler}
                    >
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default Todo;