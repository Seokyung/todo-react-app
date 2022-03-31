//url을 요청하면 AppRouter를 가장 먼저 렌더링함
import React from "react";
import "./index.css";
import App from "./App.js";
import Login from "./Login.js";
import SignUp from "./SignUp.js";
import { BrowserRouter, Routes, Route } from "react-router-dom"; //React-router-dom이 v6.0.2로 업데이트 됨에 따라 <Switch />를 사용할 수 없게 되어 대신 <Routes />를 사용함. Routes의 자손들은 모두 Route컴포넌트로 이루어져 있어야 함. (코드참고)
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            Seokyung Todo Project | {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

class AppRouter extends React.Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Routes>
                            <Route exact path="/" element={<App/>} />
                            <Route path="/signup" element={<SignUp/>} />
                            <Route path="/login" element={<Login/>} />                           
                        </Routes>
                    </div>
                    <Box mt={5}>
                        <Copyright />
                    </Box>
                </BrowserRouter>
            </div>
        );
    }
}

export default AppRouter;