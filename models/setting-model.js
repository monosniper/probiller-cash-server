import pkg from 'mongoose';
const {model, Schema} = pkg;

const SettingSchema = new Schema({
    name: {type: String, unique: true, required: true},
    value: {type: String, nullable: true},
}, {timestamps: true});

export default model('Setting', SettingSchema);