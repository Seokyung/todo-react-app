import React from 'react';
import { ListItem, ListItemText, InputBase, Checkbox } from "@material-ui/core";

class Todo extends React.Component {
    //Todo 컴포넌트 생성자 코드
    constructor(props) {
        super(props); //super를 이용해 props 오브젝트 초기화
        this.state = { item: props.item }; //this.state를 item변수와 props.item으로 초기화
    }

    render() {
        const item = this.state.item;
        return (
            <ListItem>
                <Checkbox checked={item.done} />
                <ListItemText>
                    <InputBase
                        inputProps={{ "aria-label": "naked" }}
                        type="text"
                        id={item.id}
                        name={item.id}
                        value={item.title}
                        multiline={true}
                        fullWidth={true}
                    />
                </ListItemText>
            </ListItem>
        );
    }
}

export default Todo;