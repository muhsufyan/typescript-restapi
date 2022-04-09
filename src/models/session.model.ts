import mongoose from "mongoose";
import { UserDocument } from "./user.model";
// kurang mengerti fungsi ini buat apa 30:20
export interface SchemaDocument extends mongoose.Document{
    user: UserDocument['_id'],
    valid: boolean,
    userAgent: string,
    createdAt: Date,
    updatedAt: Date,
}
// schema
const sessionSchema = new mongoose.Schema({
    // schema yg dibuat (request filter)
    // data user didpt dari id tabel User
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    valid: {type: Boolean, default: true},
    userAgent: {type:String}
},{
    // untuk create_at dan update_at
    timestamps: true
}
)

// model (buat tabel/document)
const SessionModel = mongoose.model("Session",sessionSchema)

export default SessionModel
