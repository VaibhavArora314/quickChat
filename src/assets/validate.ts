export const validateRegisterCredentials = (
  username: string,
  email: string,
  password: string,
  files: FileList | null | undefined
) => {
  return {
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password),
    image: validateImage(files),
  };
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  if (!email) return "Please enter an email";
  if (!emailRegex.test(email)) return "Invalid email";
  return "";
};

export const validateUsername = (username: string) => {
  if (username.length < 8) return "Username must be of 8 characters";
  if (username.length > 40)
    return "Username cannot be longer than 40 characters";
  return "";
};

export const validatePassword = (password: string) => {
  if (password.length < 8) return "Password must be of 8 characters";
  if (password.length > 40)
    return "Password cannot be longer than 40 characters";
  return "";
};

export const validateImage = (image: FileList | null | undefined) => {
  const MAX_SIZE = 500 * 1000;

  if (!image || image.length == 0) return "Please upload an image!";
  if (!image[0].name.match(/\.(jpg|jpeg|png|gif)$/))
    return "Please upload a valid image!";
  if (image[0].size > MAX_SIZE) return "Max allowed image size is 500kb!";
  return "";
};
