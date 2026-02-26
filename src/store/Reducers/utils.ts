// Copyright (c) 2025 Raj 
// See LICENSE for details.
import { IUser } from "@/types/user";


export const setLocalStorage = (user: Partial<IUser>): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('bricks:user', JSON.stringify(user));
}
export const getUserLocalStorage = (): Partial<IUser> => {
    if (typeof window === 'undefined') return {};
    const stringifyUser = localStorage.getItem('bricks:user');
    let user: Partial<IUser> = {}
    if (stringifyUser) user = JSON.parse(stringifyUser);
    return user;
}
