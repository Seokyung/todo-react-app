import { API_BASE_URL } from "../app-config";

//백엔드로 요청 보낼 때 사용할 유틸리티 함수
export function call(api, method, request) {
  let options = {
    headers: new Headers({
      "Content-Type": "application/json",
    }),
    url: API_BASE_URL + api,
    method: method,
  };
  
  if (request) {
    // GET method
    options.body = JSON.stringify(request);
  }

  //console.log("url : ",options.url);
  //console.log("request : ",request);

  return fetch(options.url, options)
    .then((response) =>
      response.json().then((json) => {
        if (!response.ok) {
          //response.ok가 true이면 정상적인 응답을 받은 것이고, 아니면 에러 응답을 받은 것임
          return Promise.reject(json);          
        }
        return json;
      })
    )
    .catch((error) => {
      // 추가된 부분
      //console.log("error.status : ", error.status);
      if (error.status === undefined || error.status === 403) { //**수정 필요! (원래 조건은 error.status === 403뿐이지만 error.status를 자꾸 못받아와서 임시조치해줬다.)
        window.location.href = "/login"; // redirect
      }
      return Promise.reject(error);
    }
  );
}

//signin 함수
export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      if (response.token) {
        //token이 존재하는 경우 Todo 화면으로 리디렉트
        window.location.href="/";
        /*
        console.log("response : ", response);
        alert("로그인 토큰 : " + response.token);
        */
      }
    }
  );
}