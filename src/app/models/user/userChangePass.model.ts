export interface UserChangePass {
    [x: string]: any;
    // dados enviados para API
    oldPass: string,
    newPass: string,
    verifyNewPass: string,
}