const { initializeApp } = require("firebase/app")
const { getStorage, ref } = require("firebase/storage")

const firebaseConfig = {
  apiKey: "AIzaSyAkbXR014C05XWDNQ9nySplEiCSe1u3HSU",
  authDomain: "webtradingsf.firebaseapp.com",
  projectId: "webtradingsf",
  storageBucket: "webtradingsf.appspot.com",
  messagingSenderId: "657601885222",
  appId: "1:657601885222:web:387b5391b10c13e67c62e7"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

module.exports = storage