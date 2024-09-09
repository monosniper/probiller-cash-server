import pkg from 'mongoose';
const {model, Schema} = pkg;

const TokenSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    refreshToken: {type: String, required: true},
});

export default model('Token', TokenSchema);