export interface UserLogin {
    [x: string]: any;
    // dados enviados para API
    email: string,
    password: string,
    
    // retorno da API
    auth? : boolean,
    token? : string,
}