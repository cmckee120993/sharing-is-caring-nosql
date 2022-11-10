const { User, Thought } = require('../models');

const userController = {

    getAllUsers(req, res) {
        User.find()
            .then((userData) => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    getUserById(req, res) {
        User.findOne({
            _id: req.params.id
        })
            .then((userData) => res.json(userData))
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            })
    },

    createUser(req, res) {
        User.create(req.body)
        .then((userData) => res.json(userData))
        .catch(err => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findOneAndUpdate({
                _id: req.params.id
            },
           {
             $set: req.body},
             {
                runValidators: true,
                new:true
             })
            .then((userData) => {
                if(!userData) {
                    res.status(404).json({message: 'No user found with this id.'});
                    return;
                }
                res.json(userData);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json(err)
            });
    },

    deleteUser(req, res) {
        User.findOneAndDelete({
                _id: req.params.id
            })
            .then((userData) => {
            if(!userData) {
                res.status(404).json({message: 'No user found with this id.'});
            }
           Thought.deleteMany({
            _id: {
                $in: user.thoughts
            }
           })
        })
        .then(() => res.json({message: 'User and user information deleted.'}))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    },

    addFriend(req, res) {
       User.findOneAndUpdate({
        _id: req.params.id
       }, {
        $addToSet: {
            friends: req.params.friendsId
        }
       }, {
        runValidators: true,
        new: true
       }).then((userData) => {
        if(!userData) {
            res.status(404).json({message: 'No user found with this id.'})
        }
        res.json(userData)
       }).catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
    },

    removeFriend(req, res) {
        User.findOneAndUpdate({
            _id: req.params.id
        }, {
            $pull: {
                friends: req.params.friendsId
            }
        }, 
        {
            runValidators: true,
            new: true
        })
        .then((userData) => {
            if(!userData) {
                res.status(404).json({message: 'No user found with this id.'})
            }
            res.json(userData)
           }).catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
    }
};

module.exports = userController; 