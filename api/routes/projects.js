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
                    message: "Error getting projects",
                });
        } else {
                return res.status(200).send(projects);
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
            message: "Project successfully created",
            project: result
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
                return res.status(200).send(project);
        } else 
                return res.status(404).json({message:"Project not found"});
            
        });
});

//UPDATE A SPECIFIC PROJECT (asd)

router.patch('/:projID', (req, res, next) => {

    const project = new Project({
        _id: req.params.projID,
        name: req.body.name,
        description: req.body.description
    });

    const query = {'_id': req.params.projID};

    Project.findOneAndUpdate(query, project , {upsert:false}, (err, proj) =>{
        if(err){
            res.status(500).json({message:"Error updating project"});
        } else if (proj!=null && !err){
                Project.findById(req.params.projID, (error, p)=>{
                    if(error) {
                        return res.status(500).json({message:"Error getting project"});
                    }else if (p!=null && !error){
                        return res.status(200).send(p);
                    }   
                });     
        } else
            return res.status(404).json({message:"Project not found"});

    });

});

//DELETE A SPECIFIC PROJECT

router.delete('/:projID', (req, res, next) => {
    const id = req.params.projID;
   
    Project.deleteOne({_id: id}, (err, proj)=>{
        console.log(proj);
        if(err){
            return res.status(500).json({message:"Error deleting project"});
        } else if(proj.n === 0){
            return res.status(404).json({message:"Project not found"});
        }
          else {
            return res.status(200).json({
                     message: "Successfully deleted project"
                   });
        }
    });
});

module.exports = router;