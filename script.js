// Firebase 모듈 불러오기
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js';
import { getFirestore, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

// Firebase 설정
const firebaseConfig = {
  apiKey: "AIzaSyDh216FMIAH2VQBmOJdWVQr6gE-aHb8eRc",
  authDomain: "pointly-28101.firebaseapp.com",
  projectId: "pointly-28101",
  storageBucket: "pointly-28101.appspot.com",
  messagingSenderId: "75956245415",
  appId: "1:75956245415:web:ed4ba383f9997f408a1c82",
  measurementId: "G-WJWZWFX44Q"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 구글 로그인
document.getElementById('googleLoginBtn').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            // 관리자로 로그인 성공 후 관리자 페이지로 이동
            window.location.href = 'admin.html';
        })
        .catch((error) => {
            console.error('Google login error:', error);
        });
});

// 학생 로그인
document.getElementById('studentLoginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // 학생 로그인 성공 후 학생 페이지로 이동
            window.location.href = 'student.html';
        })
        .catch((error) => {
            console.error('Student login error:', error);
            alert('Login failed: ' + error.message);
        });
});

// 학생 회원가입 신청 시 Firestore에 저장
function requestSignup(email) {
    addDoc(collection(db, 'signupRequests'), {
        email: email,
        approved: false
    }).then(() => {
        alert('Signup request submitted.');
    }).catch((error) => {
        console.error('Error submitting request:', error);
    });
}
