import mongoose from "mongoose";
import { customAlphabet } from "nanoid";
import { UserDocument } from "./user.model";
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz0123456789",10)
// untuk ke db
export interface ProductDocument extends mongoose.Document{
    user: UserDocument["_id"];
    productId: string;
    title: string;
    description: string;
    price: number;
    image: string;
    createdAt: Date;
    updatedAt: Date;
}
// schema
const productSchema = new mongoose.Schema({
    // schema yg dibuat (request filter)
    // data user didpt dari id tabel User
    productId: {
        type: String,
        required: true,
        unique: true,
        default: () => `product_${nanoid()}`,
      },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      title: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
{
    // untuk create_at dan update_at
    timestamps: true,
}
)

// model (buat tabel/document)
const ProductModel = mongoose.model<ProductDocument>("Product", productSchema);

export default ProductModel;
