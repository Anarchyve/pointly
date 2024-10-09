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
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Initialize Firebase Authentication and provider
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();
  
  // Google login functionality
  document.getElementById('googleLoginBtn').addEventListener('click', () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        window.location.href = 'admin.html'; // Redirect to admin page
      })
      .catch((error) => {
        document.getElementById('message').textContent = `Error: ${error.message}`;
      });
  });
  
  // Logout functionality (for admin page)
  if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', () => {
      auth.signOut().then(() => {
        window.location.href = 'index.html'; // Redirect to login page after logout
      }).catch((error) => {
        console.error('Error logging out:', error);
      });
    });
  }
  