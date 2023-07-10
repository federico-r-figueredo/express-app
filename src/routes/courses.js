const express = require('express');
const router = express.Router();
const Joi = require('joi');
const Course = require('../models/Course');
const debug = require('debug')('app:routes:courses');

router.get('/', async (req, res) => {
    res.send(await getCourses());
});

router.get('/:id', async (req, res) => {
    const course = await getCourse(req.params.id);
    if (!course)
        return res
            .status(404)
            .send('The course with the given ID was not found.');

    res.send(course);
});

router.post('/', async (req, res) => {
    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.send(await createCourse(req.body));
});

router.put('/:id', async (req, res) => {
    const course = await getCourse(req.params.id);
    if (!course)
        return res
            .status(404)
            .send('The course with the given ID was not found.');

    const { error } = validateCourse(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    res.send(await updateCourse(req.params.id, req.body));
});

router.delete('/:id', async (req, res) => {
    const course = await getCourse(req.params.id);
    if (!course)
        return res
            .status(404)
            .send('The course with the given ID was not found.');

    res.send(await deleteCourse(req.params.id));
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        author: Joi.string().min(3).required(),
        tags: Joi.array(),
        isPublished: Joi.boolean().required(),
        price: Joi.number()
    });

    return schema.validate(course);
}

async function createCourse(dto) {
    const course = new Course({
        name: dto.name,
        author: dto.author,
        tags: dto?.tags ?? [],
        isPublished: dto?.isPublished ?? false,
        price: dto.price ?? 0
    });

    return await course.save();
}

async function getCourses() {
    return await Course.find().limit(10).sort({ name: 1 });
}

async function getCourse(id) {
    debug(id);
    return await Course.findById(id);
}

async function updateCourse(id, dto) {
    const course = await Course.findById(id);
    if (!course) return;

    course.name = dto.name;
    course.tags = dto.tags;
    course.author = dto.author;
    course.isPublished = dto.isPublished;
    course.price = dto.price;

    return await course.save();
}

async function deleteCourse(id) {
    const course = await Course.findById(id);
    if (!course) return;

    return await Course.findByIdAndDelete(id);
}

module.exports = router;
