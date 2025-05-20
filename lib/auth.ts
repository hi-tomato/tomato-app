import {
  createUserWithEmailAndPassword,
  // signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

// type User = { email: string; password: string };

// SignUp
export const signUp = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("유저가 성공적으로 회원가입을 하였습니다.", user);
    return user; // User 객체 반환
  } catch (error) {
    const errorCode = (error as any).code;
    const errorMessage = (error as any).message;
    console.error("회원가입을 실패하였습니다. :" + errorMessage, errorCode);
    throw error;
  }
};

// Login
export const signLogin = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user; // User 객체 반환
  } catch (error) {
    throw error;
  }
};
