// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDh216FMIAH2VQBmOJdWVQr6gE-aHb8eRc",
  authDomain: "pointly-28101.firebaseapp.com",
  projectId: "pointly-28101",
  storageBucket: "pointly-28101.appspot.com",
  messagingSenderId: "75956245415",
  appId: "1:75956245415:web:ed4ba383f9997f408a1c82",
  measurementId: "G-WJWZWFX44Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// 구글 로그인
document.getElementById('googleLoginBtn').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
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

    auth.signInWithEmailAndPassword(email, password)
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
    db.collection('signupRequests').add({
        email: email,
        approved: false
    }).then(() => {
        alert('Signup request submitted.');
    }).catch((error) => {
        console.error('Error submitting request:', error);
    });
}
