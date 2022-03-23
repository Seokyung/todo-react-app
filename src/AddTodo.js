import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { item: { title: "" } }; //사용자의 입력을 저장할 오브젝트
        this.add = props.add //props의 함수를 this.add에 연결
    }

    //onInputChange 함수 작성 - 사용자가 input 필드에 키를 하나 입력할 때마다 문자열을 자바스크립트 오브젝트에 저장함
    onInputChange = (e) => { //Event e를 매개변수로 받음 - event: 어떤 일이 일어났을 때의 상태와 그 일에 대한 정보를 담고 있음
        const thisItem = this.state.item;
        thisItem.title = e.target.value; //e.target.value에 현재 화면의 InputField에 입력된 글자들이 담겨있음
        this.setState({ item: thisItem }); //setState를 통해 item을 업데이트해 사용자의 Todo 아이템을 임시로 저장함
        console.log(thisItem);
    }

    //onButtonClick 함수 작성 - App 컴포넌트에서 add 함수를 props로 넘겨받아 사용
    onButtonClick = () => {
        this.add(this.state.item); //add 함수 사용
        this.setState({ item: { title: "" } });
    }

    //enterKeyEventHandler 함수 작성 - 키보드의 키 이벤트 발생 시 항상 실행(엔터키)
    enterKeyEventHandler = (e) => {
        if (e.key === 'Enter') {
            this.onButtonClick(); //+버튼 클릭과 동일한 기능을 하므로 +버튼 클릭 함수 재사용함
        }
    }

    render() {
        //onInputChange, onButtonClick 함수 연결
        return (
            <Paper style={{ margin: 16, padding: 16 }}>
                <Grid container>
                    <Grid xs={11} md={11} item style={{ paddingRight: 16 }}>
                        <TextField
                            placeholder="Add Todo Here"
                            fullWidth
                            onChange={this.onInputChange} //이벤트 핸들러 함수: 어떤 이벤트가 발생할 때마다 onChange() 실행 -> 이벤트 e가 매개변수로 넘어옴
                            value={this.state.item.title}
                            onKeyPress={this.enterKeyEventHandler} //onKeyPress() : 키보드의 키가 눌릴 때마다 실행되는 이벤트 핸들러
                        />
                    </Grid>
                    <Grid xs={1} md={1} item>
                        <Button
                            fullWidth
                            color="secondary"
                            variant="outlined"
                            onClick={this.onButtonClick}
                        >
                            +
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        );
    }
}

export default AddTodo;