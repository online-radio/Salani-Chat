
import { initializeApp } from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyCuLFl4G1g4kCdczU0nBrbLi_JM_y_kuaM",
  authDomain: "fmy-first-project.firebaseapp.com",
  databaseURL: "https://fmy-first-project.firebaseio.com",
  projectId: "fmy-first-project",
  storageBucket: "fmy-first-project.appspot.com",
  messagingSenderId: "827057007334",
  appId: "1:827057007334:web:56a8eb17d9f6b7cae2a927",
  measurementId: "G-V7C465TKMQ"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        location.href = 'chat.html';
    }
});

var error = document.getElementById('error');

loginWithGithub = () => {

    var provider = new firebase.auth.GithubAuthProvider();
        
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // The signed-in user info.
        var user = result.user;
        console.log('Github Sign in', user)

        const userInfo = {
            name: user.displayName,
            email: user.email,
            imageUrl: user.photoURL,
        }
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        location.href = 'chat.html';

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        error.innerHTML = errorMessage

    });

}

const SigninWithGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
        prompt: 'select_account'
    });

    firebase.auth().signInWithPopup(provider)
        .then(function (result) {
            // This gives you a Google Access Token.
            // The signed-in user info 
            console.log('user login succesFully', result.user.displayName)
            const userInfo = {
                name: result.user.displayName,
                email: result.user.email,
                imageUrl: result.user.photoURL,
            }
            localStorage.setItem('userInfo', JSON.stringify(userInfo))
            location.href = 'chat.html';
        })
        .catch((error) => {
            // Handle Errors here.
            var errorMessage = error.message;
            error.innerHTML = errorMessage
        });
}




SigninWithFacebook = () => {

    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        const userInfo = {
            name: user.displayName,
            email: user.email,
            imageUrl: user.photoURL
        }
        // console.log(userInfo, 'usersInfo');
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
        location.href = 'chat.html';
        // ...
    }).catch(function (error) {
        // Handle Errors here.
        var errorMessage = error.message;
        error.innerHTML = errorMessage

    });

}
