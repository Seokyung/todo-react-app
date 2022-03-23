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
        this.state = { item: props.item }; //this.state를 item변수와 props.item으로 초기화
        this.delete = props.delete;
    }

    //deleteEventHandler 함수
    deleteEventHandler = () => {
        this.delete(this.state.item) //this.state.item을 이용해 item 오브젝트에 접근
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} disableRipple/>

                <ListItemText>
                    <InputBase
                        inputProps={{ "aria-label": "naked" }}
                        type="text"
                        id={item.id} //각 리스트를 구분하려고 id(고유번호)를 연결
                        name={item.id} // 각 리스트를 구분하려고 id를 연결
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
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