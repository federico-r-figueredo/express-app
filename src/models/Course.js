const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 5, maxLength: 255 },
    author: { type: String, required: true },
    tags: {
        type: Array,
        validate: {
            validator: function (value) {
                return value && value.length > 0;
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: { type: Date, default: Date.now },
    isPublished: { type: Boolean, required: true },
    price: {
        type: Number,
        required: function () {
            return this.isPublished;
        },
        min: 1,
        max: 10000
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
