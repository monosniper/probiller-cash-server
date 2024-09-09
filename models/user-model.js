import pkg from 'mongoose';
const {model, Schema} = pkg;

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    cardsCount: {type: Number, default: 0},
    balance: {type: Number, default: 0},
    payed: {type: Boolean, default: false},
}, {timestamps: true});

export default model('User', UserSchema);