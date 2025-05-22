// 이메일 정규식 (영어 + @ 포함)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 비밀번호 정규식 (대문자 1개 이상 + 특수문자 1개 이상)
const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/;

export const validateEmail = (
  email: string
): { isValid: boolean; message: string } => {
  if (!email) {
    return { isValid: false, message: "이메일을 입력해주세요." };
  }

  if (!EMAIL_REGEX.test(email)) {
    return {
      isValid: false,
      message: "올바른 이메일 형식이 아닙니다. (영어와 @가 포함되어야 합니다)",
    };
  }

  return { isValid: true, message: "" };
};

export const validatePassword = (
  password: string
): { isValid: boolean; message: string } => {
  if (!password) {
    return { isValid: false, message: "비밀번호를 입력해주세요." };
  }

  if (password.length < 8) {
    return { isValid: false, message: "비밀번호는 8자 이상이어야 합니다." };
  }

  if (!PASSWORD_REGEX.test(password)) {
    return {
      isValid: false,
      message:
        "비밀번호는 대문자 1개 이상과 특수문자 1개 이상을 포함해야 합니다.",
    };
  }

  return { isValid: true, message: "" };
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): { isValid: boolean; message: string } => {
  if (!confirmPassword) {
    return { isValid: false, message: "비밀번호 확인을 입력해주세요." };
  }

  if (password !== confirmPassword) {
    return { isValid: false, message: "비밀번호가 일치하지 않습니다." };
  }

  return { isValid: true, message: "" };
};
