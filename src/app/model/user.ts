export interface UserInterface {
    id?: number,
    username: string,
    email: string,
    password: string,
    bio?: string,
    image?: string,
    token: string
}

export interface UserEmailPasswordInterface {
    email: string,
    password: string
}

export interface CreateUser {
    username: string,
    email: string,
    password: string
}

export interface UserInfo {
    username: string,
    email: string,
    bio: string,
    image: string
}