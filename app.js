import { initializeApp } from "https://www.gstatic.com/firebasejs/11.7.0/firebase-app.js";
import { 
    getAuth, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut 
} from "https://www.gstatic.com/firebasejs/11.7.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA99JhLrjglfQo9T_1SKbH4znBn3GvFuIw",
    authDomain: "instagram-clone-45171.firebaseapp.com",
    projectId: "instagram-clone-45171",
    storageBucket: "instagram-clone-45171.firebasestorage.app",
    messagingSenderId: "429091016628",
    appId: "1:429091016628:web:a600b6c672202ee6e52ce1",
    measurementId: "G-18NK5CW984"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get references to HTML elements
const authContainer = document.querySelector('.auth-container');
const mainAppContent = document.querySelector('.main-app-content');

const authEmailInput = document.getElementById('auth-email');
const authPasswordInput = document.getElementById('auth-password');
const authLoginBtn = document.getElementById('auth-login-btn');
const authSignupBtn = document.getElementById('auth-signup-btn');
const authSignupToggle = document.getElementById('auth-signup-toggle');
const authErrorMessage = document.getElementById('auth-error-message');
const logoutButton = document.querySelector('.logout-button');

// Toggle between login and signup forms
authSignupToggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (authSignupBtn.style.display === 'none') {
        authSignupBtn.style.display = 'block';
        authLoginBtn.style.display = 'none';
        authSignupToggle.textContent = 'Log in';
    } else {
        authSignupBtn.style.display = 'none';
        authLoginBtn.style.display = 'block';
        authSignupToggle.textContent = 'Sign up';
    }
    authErrorMessage.textContent = ''; // Clear any previous errors
});

// Handle login
authLoginBtn.addEventListener('click', async () => {
    try {
        await signInWithEmailAndPassword(auth, authEmailInput.value, authPasswordInput.value);
        authErrorMessage.textContent = '';
    } catch (error) {
        authErrorMessage.textContent = error.message;
    }
});

// Handle signup
authSignupBtn.addEventListener('click', async () => {
    try {
        await createUserWithEmailAndPassword(auth, authEmailInput.value, authPasswordInput.value);
        authErrorMessage.textContent = '';
    } catch (error) {
        authErrorMessage.textContent = error.message;
    }
});

// Handle logout
if (logoutButton) {
    logoutButton.addEventListener('click', async (e) => {
        e.preventDefault();
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Error signing out:", error);
        }
    });
}

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, show main content, hide auth form
        mainAppContent.style.display = 'block';
        authContainer.style.display = 'none';
    } else {
        // User is signed out, show auth form, hide main content
        mainAppContent.style.display = 'none';
        authContainer.style.display = 'flex'; // Use flex to center the form
    }
});