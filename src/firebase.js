import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth"
import {addDoc, collection, getFirestore} from "firebase/firestore"
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDwlnhtcO96XRWpHVLCEaflxmtYoBtaN0E",
  authDomain: "netflix-clone-782cb.firebaseapp.com",
  projectId: "netflix-clone-782cb",
  storageBucket: "netflix-clone-782cb.firebasestorage.app",
  messagingSenderId: "280245043885",
  appId: "1:280245043885:web:251dd46826367b37867c24"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Signup
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // check if user already exists
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.empty) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
      });
    }

    toast.success("Signup successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.message || error.code);
  }
};

// ✅ Login
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful!");
  } catch (error) {
    console.error(error);
    toast.error(error.message || error.code);
  }
};

// ✅ Logout
const logout = async () => {
  try {
    await signOut(auth);
    toast.info("Logged out!");
  } catch (error) {
    console.error(error);
    toast.error(error.message || error.code);
  }
};

export { auth, db, login, signup, logout };