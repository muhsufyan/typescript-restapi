import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

// kurang mengerti fungsi ini buat apa 30:20
export interface UserDocument extends mongoose.Document{
    email: string,
    name: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    comparePassword(candidatePassword: string): Promise<Boolean>;
}
// schema
const userSchema = new mongoose.Schema({
    // schema yg dibuat (request filter)
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
},{
    // untuk create_at dan update_at
    timestamps: true
}
)
// kurang mengerti 30:50
userSchema.pre("save", async function(next){
    // tangkap data user di db mungkin
    let user = this as UserDocument
    // mungkin untuk password jika tdk ada edit password
    if(!user.isModified('password')){
        return next()
    }
    // jika password diubah. buat salt untuk bcyrpt
    const salt = await bcrypt.genSalt(config.get<number>('saltWorkFactor'))
    // generate password
    const hashed = await bcrypt.hashSync(user.password, salt)
    // ganti password user dg password yg tlh di hash
    user.password = hashed
    return next()
})
// compare password untuk login
userSchema.methods.comparePassword = async function (candidatePassword:string): Promise<boolean> {
    // tangkap data user di db mungkin
    const user = this as UserDocument
    return bcrypt.compare(candidatePassword, user.password).catch((error)=>false);
}
// model (buat tabel/document)
const UserModel = mongoose.model<UserDocument>("User",userSchema)

export default UserModel
