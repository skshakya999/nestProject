import * as bcrypt from 'bcrypt';

export async function encodePass( rawPass:string) {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPass,salt)
}