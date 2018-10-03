const userController = require('../controllers/user.ctrl')
module.exports = (router) => {

    /**
     * Get a user
     */
    router.route('users/:id')
    .get(userController.getUser)

     /**
     * Get a user profile
     */
    router
    .route('/user/profile/:id')
    .get(userController.getUserProfile)

    /**
     * Adds a user
     */
    router
    .route('/user')
    .post(userController.addUser)

    /**
     * Follow a user
     */
    router
    .route('/user/follow')
    .post(userController.followUser)
}
