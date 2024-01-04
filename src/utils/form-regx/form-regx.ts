export const passwordRegxAnyLetters = (password: string) => /[a-z]+/i.test(password);
export const passwordRegxAnyNumbers = (password: string) => /[0-9]+/i.test(password);
export const emailRegx = (email: string) => /^[\w-\\.]+@+[\w-]+\.[a-z]{2,4}$/i.test(email);
