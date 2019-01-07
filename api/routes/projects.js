const express = require('express');
const router = express.Router();
const Project = require('../models/project');
const mongoose = require('mongoose');
const JSON = require('JSON');

//GET ALL PROJECTS FROM projects COLLECTION

router.get('/', (req, res, next) => {
    Project.find({}, (err, projects) => {
        if(err) {
                return res.status(500).json({
                message: "Error in GET requests to projects",
                });
        } else {
                return res.status(200).json({
                    message: "Handling GET requests to projects",
                    projects: projects
                });
        }   
    });

  
});

//POST A PROJECT 

router.post('/', (req, res, next) => {
    const project = new Project({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    });

    project.save().then(result => {
        console.log(result);
        return res.status(201).json({
            message: "Handling POST requests to projects",
            createdProj: project
        });
    }).catch(err => {
            console.log(err);
            return res.status(500).json({
                message: "Please provide the correct fields"
            });
        }
    );

});

//GET A SPECIFIC PROJECT ID

router.get('/:projID', (req, res, next) => {
    const id = req.params.projID;

    Project.findById(id, (err, project)=>{
        if(err) {
            return res.status(500).json({message:"Error getting project"});
        }else if (project!=null && !err){
                return res.status(200).json({
                    message:"Handling POST requests to projects/{id}",
                    project: project
                });
        } else 
                return res.status(404).json({message:"Project not found"});
            
        });
});

//UPDATE A SPECIFIC PROJECT (asd)

router.patch('/:projID', (req, res, next) => {
    res.status(200).json({
        message: "You updated a product id",
    });
});

//DELETE A SPECIFIC PROJECT

router.delete('/:projID', (req, res, next) => {
    res.status(200).json({
        message: "You deleted a product id",
    });
});

module.exports = router;