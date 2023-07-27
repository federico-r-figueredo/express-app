const mongoose = require('mongoose');
const Joi = require('joi');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true, minLength: 5, maxLength: 255 },
    author: { type: String, required: true },
    category: { type: String, required: true, lowercase: true, trim: true },
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
        max: 10000,
        get: (v) => Math.round(v),
        set: (v) => Math.round(v)
    }
});

const Course = mongoose.model('Course', courseSchema);

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        category: Joi.string().required(),
        tags: Joi.array(),
        isPublished: Joi.boolean().required(),
        price: Joi.number().greater(1).less(1000)
    });

    const result = {
        success: true,
        error: schema.validate(course)?.error?.details[0]?.message,
        payload: null
    };

    if (result.error) {
        result.success = false;
    }

    return result;
}

module.exports.Course = Course;
module.exports.validateCourse = validateCourse;
