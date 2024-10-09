// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
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

// Google login functionality
document.getElementById('googleLoginBtn').addEventListener('click', () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // Successful login, redirect to admin page
      window.location.href = 'admin.html';
    })
    .catch((error) => {
      // Show error message
      showMessage(`Error: ${error.message}`, 'error');
    });
});

// Logout functionality (for admin page)
if (document.getElementById('logoutBtn')) {
  document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth).then(() => {
      // Redirect to login page after logout
      window.location.href = 'index.html';
    }).catch((error) => {
      console.error('Error logging out:', error);
    });
  });
}

// Show message on the screen
function showMessage(message, type) {
  const messageDiv = document.getElementById('message');
  messageDiv.textContent = message;
  messageDiv.className = type === 'success' ? 'message success' : 'message error';
}
