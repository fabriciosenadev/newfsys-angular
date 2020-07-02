export interface UserRegister {
    // dados enviados para API
    full_name: string,
    email: string,
    password: string,
    verifyPass: string,

    // retorno da API
    success? : string,
}

export interface UserLogin {
    [x: string]: any;
    // dados enviados para API
    email: string,
    password: string,
    
    // retorno da API
    auth? : boolean,
    token? : string,
}

export interface UserResetPass {
    [x: string]: any;
    // dados enviados para API
    email: string,
    password?: string,
    verifyPass?: string,

    // retorno da API
    success? : string,
    id? : number,
}

export interface UserInfo {
    [x: string]: any;
    full_name: string,
    token: string,
    // dados para o menu interno do app
    firstName? : string,
}