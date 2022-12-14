const router = require('express').Router();

const {getAllUsers, 
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    removeFriend 
} = require('../../controllers/userController');

router
    .route('/')
        .get(getAllUsers)
        .post(createUser);

router
    .route('/:id')
        .get(getUserById)
        .put(updateUser)
        .delete(deleteUser);

router
    .route('/:id/friends/:friendsId')
        .post(addFriend);

router
    .route('/:id/friends/:friendsId')
        .delete(removeFriend);

module.exports = router;
