import { auth, GoogleAuthProvider, signInWithPopup } from './index.html';

const provider = new GoogleAuthProvider();

document.getElementById('googleLoginBtn').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      window.location.href = 'admin.html';  // 로그인 성공 시 admin 페이지로 이동
    })
    .catch((error) => {
      document.getElementById('message').textContent = `Error: ${error.message}`;
    });
});
