const express = require('express');
const router = express.Router();
const Project = require('../../models/project');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: "Handling GET requests to projects"
    });
});

router.post('/', (req, res, next) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    });

    project.save().then(result => {
        console.log(result);
    }).catch(err => console.log(err)
    );

    res.status(201).json({
        message: "Handling POST requests to projects",
        createdProj: project
    });
});

router.get('/:projID', (req, res, next) => {
    const id = req.params.projID;
    res.status(200).json({
        message: "You reached project ID",
        id: id
    });
});

router.patch('/:projID', (req, res, next) => {
    res.status(200).json({
        message: "You updated a product id",
    });
});

router.delete('/:projID', (req, res, next) => {
    res.status(200).json({
        message: "You deleted a product id",
    });
});

module.exports = router;