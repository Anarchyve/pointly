window.onload = function() {
    // Firebase configuration
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
    firebase.initializeApp(firebaseConfig);
  
    // Firebase Auth 및 Google Provider 초기화
    const auth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
  
    // Google 로그인 버튼에 이벤트 리스너 추가
    document.getElementById('googleLoginBtn').addEventListener('click', () => {
      auth.signInWithPopup(provider)
        .then((result) => {
          const user = result.user;
          window.location.href = 'admin.html'; // 로그인 성공 시 관리자 페이지로 리디렉션
        })
        .catch((error) => {
          document.getElementById('message').textContent = `Error: ${error.message}`;
        });
    });
  
    // 로그아웃 기능 (관리자 페이지에서 로그아웃 시 처리)
    if (document.getElementById('logoutBtn')) {
      document.getElementById('logoutBtn').addEventListener('click', () => {
        auth.signOut().then(() => {
          window.location.href = 'index.html'; // 로그아웃 후 로그인 페이지로 리디렉션
        }).catch((error) => {
          console.error('Error logging out:', error);
        });
      });
    }
  };
  