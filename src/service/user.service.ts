import {DocumentDefinition} from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
// agar createAt dan updateAt dpt masuk maka kita  ubah tipe jd omit, tambh juga comparePassword
export async function createUser(input:DocumentDefinition<Omit<UserDocument, 'createdAt'|'updatedAt' | 'comparePassword'>>) {
    try {
        return await UserModel.create(input)
    } catch (error: any) {
        throw new Error(error);
        
    }
}