import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

// type User = { email: string; password: string };

// SignUp
export const signUp = async (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("유저가 성공적으로 회원가입을 하였습니다.", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("회원가입을 실패하였습니다. :" + errorMessage, errorCode);
    });
};

// Login
export const signLogin = async (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("로그인을 성공하였습니다! ", user);
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`로그인을 실패하였습니다: ${errorMessage} ${errorCode}`);
    });
};
