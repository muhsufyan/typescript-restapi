import { omit } from 'lodash';
import {DocumentDefinition, FilterQuery} from 'mongoose';
import UserModel, { UserDocument } from '../models/user.model';
// agar createAt dan updateAt dpt masuk maka kita  ubah tipe jd omit, tambh juga comparePassword
export async function createUser(input:DocumentDefinition<Omit<UserDocument, 'createdAt'|'updatedAt' | 'comparePassword'>>) {
    try {
        const user =  await UserModel.create(input)
        return omit(user.toJSON(), 'password')
    } catch (error: any) {
        throw new Error(error);
        
    }
}

export async function validatePassword({email, password}:{email: string, password: string}) {
    const user = await UserModel.findOne({ email });
    if (!user){
        return false
    }
    // jika ada emailnya maka cek passwordnya, sama ?
    const isValid = await user.comparePassword(password);
    if(!isValid) return false
    return omit(user.toJSON(), 'password')
}

export async function findUser(query:FilterQuery<UserDocument>) {
    return UserModel.findOne(query).lean()
}