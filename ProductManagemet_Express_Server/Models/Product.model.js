import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    price: {
        type: Number,
        min: 1,
        required: true
    },
    inStock: {
        type: Number,
        min: 1,
        required: true
    },
    category: {
        type: String,
        enum: ["Electronics", "Clothing", "Machinery", "Others"],
        default: "Electronics"
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export const Product = mongoose.model("Product", ProductSchema);
