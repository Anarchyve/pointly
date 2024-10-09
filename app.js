// Firebase 모듈 가져오기
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

// Firebase 설정
const firebaseConfig = {
    apiKey: "AIzaSyDh216FMIAH2VQBmOJdWVQr6gE-aHb8eRc",
    authDomain: "pointly-28101.firebaseapp.com",
    projectId: "pointly-28101",
    // 기타 설정...
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase Authentication 참조
const auth = getAuth(app);

// 구글 로그인 제공자 생성
const provider = new GoogleAuthProvider();

// HTML 요소 참조
const loginButton = document.getElementById('googleLogin');
const logoutButton = document.getElementById('logout');
const userDetails = document.getElementById('user-details');

// 로그인 버튼 클릭 이벤트
loginButton.addEventListener('click', () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            // 로그인 성공
            const user = result.user;
            console.log('로그인 성공:', user);
            updateUI(user);
        })
        .catch((error) => {
            // 에러 처리
            console.error('로그인 에러:', error);
        });
});

// 로그아웃 버튼 클릭 이벤트
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            console.log('로그아웃 성공');
            updateUI();
        })
        .catch((error) => {
            console.error('로그아웃 에러:', error);
        });
});

// 인증 상태 변화 감지
onAuthStateChanged(auth, (user) => {
    if (user) {
        // 로그인 상태
        console.log('사용자 로그인:', user);
        updateUI(user);
    } else {
        // 로그아웃 상태
        console.log('사용자 로그아웃');
        updateUI();
    }
});

// UI 업데이트 함수
function updateUI(user) {
    if (user) {
        userDetails.innerText = `안녕하세요, ${user.displayName}님`;
        loginButton.style.display = 'none';
        logoutButton.style.display = 'block';
    } else {
        userDetails.innerText = '';
        loginButton.style.display = 'block';
        logoutButton.style.display = 'none';
    }
}
