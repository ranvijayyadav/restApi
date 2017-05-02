/**
 * Created by ryadav on 4/30/17.
 */
var userService=require('./../services/userService')
var tokenService=require('./../services/tokenService');

module.exports = {

    /**
     * Add user to system.
     * @param {Object} request body
     * @param {Object} response body
     */
    addUser: function(req, res) {
        //If user account cerated res.status(200).send(data)
        //else  res.status(403).send(error);


    },
    /**
     * Authenticate user against DB data.
     * @param {Object} request body
     * @param {Object} response body
     */
    authenticate: function(req, res) {

        userService.findUser(req.body.email)
            .then(function(userData){
                userService.validatePassword(userData,req.body.password)
                    .then(function () {
                        tokenService.tokenGenerate(userData)
                        //send jwt token created using user data
                    },function (error) {
                        //send error message back
                    })

            },function(error){
                //send unable to find user
            })

    }
}