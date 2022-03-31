import { API_BASE_URL } from "../app-config";

//반복을 피하기 위해 call에 토큰이 존재하는 경우 헤더에 추가
const ACCESS_TOKEN = "ACCESS_TOKEN";

//백엔드로 요청 보낼 때 사용할 유틸리티 함수
export function call(api, method, request) {
  let headers = new Headers({
    "Content-Type": "application/json",
  });

  //로컬 스토리지에서 ACCESS_TOKEN 가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
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
      console.log("error.status : ", error.status);
      if (error.status === undefined || error.status === 403) { //**수정 필요! (원래 조건은 error.status === 403뿐이지만 error.status를 자꾸 못받아와서 임시조치해줬다.)
        window.location.href = "/login"; // redirect
        //alert("error.status : " + error.status);
      }
      return Promise.reject(error);
    }
  );
}

//signin 함수 (로그인)
export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      if (response.token) {
        //로컬 스토리지에 토큰 저장
        localStorage.setItem("ACCESS_TOKEN", response.token);
        //token이 존재하는 경우 Todo 화면으로 리디렉트
        window.location.href="/";
        //console.log("response : ", response);
        //alert("로그인 토큰 : " + response.token);
      }
    }
  );
}

//signout 함수 (로그아웃)
export function signout() {
  localStorage.setItem(ACCESS_TOKEN, null);
  window.location.href = "/login";
}