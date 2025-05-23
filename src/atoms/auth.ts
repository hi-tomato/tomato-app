import { atom } from "jotai";

export interface User {
  id: string;
  email: string;
  name: string;
}

export const userAtom = atom<User | null | undefined>(undefined);

export const isLoggedInAtom = atom((get) => {
  const user = get(userAtom);
  return user !== null && user !== undefined;
});
export const isLoadingAtom = atom((get) => get(userAtom) === undefined);
