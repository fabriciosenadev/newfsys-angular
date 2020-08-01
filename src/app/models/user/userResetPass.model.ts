export interface UserResetPass {
    [x: string]: any;
    // dados enviados para API
    email: string,
    password?: string,
    verifyPass?: string,

    // retorno da API
    success?: string,
    id?: number,
}