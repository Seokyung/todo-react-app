//현재 브라우저의 도메인이 localhost인 경우 로컬 호스트에서 동작하는 백엔드 애플리케이션 사용
let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
    backendHost = "http://localhost:8080";
}

export const API_BASE_URL = `${backendHost}`;