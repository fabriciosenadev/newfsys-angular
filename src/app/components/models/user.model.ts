export interface User {
    // dados enviados para API
    full_name: string,
    email: string,
    password: string,
    
    // usado apenas no front
    verifyPass: string,

    // retorno da API
    success? : string,
    token? : string,
}