export interface UserRegister {
    // dados enviados para API
    full_name: string,
    email: string,
    password: string,
    verifyPass: string,

    // retorno da API
    success?: string,
}