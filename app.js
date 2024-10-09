// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

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
