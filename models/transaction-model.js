import pkg from 'mongoose';
const {model, Schema} = pkg;

const TransactionSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    amount: {type: Number, required: true},
    status: {type: String, default: 'success'},
}, {timestamps: true});

export default model('Transaction', TransactionSchema);