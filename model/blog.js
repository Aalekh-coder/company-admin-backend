import { Schema, model } from 'mongoose';

const BlogSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
});

export default model('Blog', BlogSchema);
