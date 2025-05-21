import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

// 파베 - 회원가입
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

// 파베 - 로그인 (에러 타입 지정해줘야함)
export const signLogin = async (
  email: string,
  password: string
): Promise<User> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("로그인이 성공적으로 완료되었습니다.", user);
    return user;
  } catch (error: unknown) {
    const { code, message } = error as { code?: string; message?: string };
    console.error("로그인에 실패하였습니다: " + message, code);
    throw error;
  }
};
