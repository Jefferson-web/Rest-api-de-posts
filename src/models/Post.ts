import { Schema, model } from 'mongoose';

const PostSchema = new Schema({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true, lowercase: true },
    content: { type: String, required: true },
    image: { type: String },
    createAt: { type: Date, default: Date.now },
    updateAt: { type: Date }
})

export default model('Post', PostSchema);