export interface UserInfo {
    [x: string]: any;
    full_name: string,
    token: string,
    // dados para o menu interno do app
    firstName?: string,
}