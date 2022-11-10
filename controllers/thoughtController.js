const { Thought, User } = require('../models');
const { populate } = require("../models/user");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find()
            .then((thought) => {
                res.json(thought);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    getThoughtById(req, res) {
        Thought.findOne(
            {
                _id: params.id
            })
            .then((thoughtData) => {
                if(!thoughtData) {
                    res.status(404).json({message: 'No thought with this id'});
                    return;
                }
                res.json(thoughtData);
            }) 
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    addThought(req, res) {
        Thought.create(req.body)
            .then((thoughtData) => {
                return User.findOneAndUpdate(
                    {_id: req.body.userID},
                    {$push: { thoughts: thoughtData._id}},
                    {new: true}
                )
            })
            .then(userData =>{
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
            },
            {
            $set: req.body
            },
            {
            runValidators: true,
            new: true
            })
            .then((thoughtData) => {
                if(!thoughtData) {
                    res.status(404).json({message: 'No thought with this id'});
                }
                res.json(thoughtData);
            }) 
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    removeThought(req, res) {
        Thought.findOneAndDelete(
            {
                _id: req.params.id
            })
            .then((thoughtData) => {
                if(!thoughtData){
                    res.status(404).json({ message: 'No thought with that id'})
                }
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$pull: {thoughts:thought._id}},
                    {new:true}
                )
            })
            .then(() => {
                res.json({message: 'Thought deleted'})
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$addToSet: {reactions: req.body}},
            {runValidators: true, 
                new: true}
        )
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with that id.'});
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            {_id: req.params.thoughtId},
            {$pull: {reactions: {reactionId: req.params.reactionId}}},
            {runValidators: true, 
                new: true}
        )
        .then((thoughtData) => {
            if(!thoughtData) {
                res.status(404).json({ message: 'No thought found with that id.'});
            }
            res.json(thoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    }
};

module.exports = thoughtController;