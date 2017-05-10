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
        var userObject;

        if(req.body.email){
            userObject={
                email:req.body.email,
                password:req.body.password
            }
            userService.addUser(userObject)
                .then(function (userData) {
                    res.send(userData).status(200).end();
                },function (error) {
                    res.send(error).status(403).end();
                })
        }

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
                        var token=tokenService.tokenGenerate(userData)
                        res.send(token).status(200).end();
                        //send jwt token created using user data
                    },function (error) {
                        res.send(error).status(403).end();
                        //send error message back
                    })

            },function(error){
                var errObject={
                    error:error,
                    message:'Unable to find user'
                }
                res.send(errObject).status(403).end()
                //send unable to find user
            })

    }
}