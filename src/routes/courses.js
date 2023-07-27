const express = require('express');
const debug = require('debug')('app:routes:courses');
const { Course, validateCourse } = require('../models/Course');
const validateObjectID = require('../validators/objectID');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const async = require('../middleware/async');

const router = express.Router();

// prettier-ignore
router.get('/', authenticate, async(async (req, res) => {
    const result = await getCourses();
    res.send(result);
}));

// prettier-ignore
router.get('/:id', authenticate, async(async (req, res) => {
    let result = await validateObjectID(req.params.id);
    if (!result.success) return res.status(400).send(result);

    result = await getCourse(req.params.id);
    if (!result.success) return res.status(404).send(result);

    res.send(result);
}));

// prettier-ignore
router.post('/', authenticate, async(async (req, res) => {
    let result = validateCourse(req.body);
    if (!result.success) return res.status(400).send(result);

    result = await createCourse(req.body);

    res.send(result);
}));

// prettier-ignore
router.put('/:id', authenticate, async(async (req, res) => {
    let result = await validateObjectID(req.params.id);
    if (!result.success) return res.status(400).send(result);

    result = await getCourse(req.params.id);
    if (!result.success) return res.status(404).send(result);

    result = validateCourse(req.body);
    if (!result.success) return res.status(400).send(result);

    result = await updateCourse(req.params.id, req.body);

    res.send(result);
}));

// prettier-ignore
router.delete('/:id', [authenticate, authorize], async(async (req, res) => {
    result = await validateObjectID(req.params.id);
    if (!result.success) return res.status(400).send(result);

    result = await getCourse(req.params.id);
    if (!result.success) return res.status(404).send(result);

    result = await deleteCourse(req.params.id);

    res.send(result);
}));

async function getCourses() {
    return {
        success: true,
        error: null,
        payload: await Course.find().limit(10).sort({ name: 1 })
    };
}

async function getCourse(id) {
    const course = await Course.findById(id);
    if (!course)
        return {
            success: false,
            error: `The course with the given ID (${id}) wasn't found.`,
            payload: null
        };

    return {
        success: true,
        error: null,
        payload: course
    };
}

async function createCourse(dto) {
    const course = new Course({
        name: dto.name,
        author: dto.author,
        category: dto.category,
        tags: dto?.tags ?? [],
        isPublished: dto?.isPublished ?? false,
        price: dto.price ?? 0
    });

    await course.validate();
    return {
        success: true,
        error: null,
        payload: await course.save()
    };
}

async function updateCourse(id, dto) {
    const course = await Course.findById(id);
    if (!course)
        return {
            success: false,
            error: `Course with ID = ${id} wasn't found.`,
            payload: null
        };

    course.name = dto.name;
    course.author = dto.author;
    course.category = dto.category;
    course.tags = dto.tags;
    course.isPublished = dto.isPublished;
    course.price = dto.price;

    await course.validate();
    return {
        success: true,
        error: null,
        payload: await course.save()
    };
}

async function deleteCourse(id) {
    return {
        success: true,
        error: null,
        payload: await Course.findByIdAndDelete(id)
    };
}

module.exports = router;
