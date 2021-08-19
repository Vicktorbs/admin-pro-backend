const { Schema, model } = require("mongoose");

const MedicSchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

MedicSchema.method('toJSON', function() {
    const {__v, ...object} = this.toObject();
    return object;
})

module.exports = model('Medic', MedicSchema);