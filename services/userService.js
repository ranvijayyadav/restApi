/**
 * Created by ryadav on 4/30/17.
 */

var crypto = require("crypto");
var Q = require('q');
module.exports={
    findUser:function (email) {
        var deferred = Q.defer();
        //check for user in database if found return
        //async call to database
        //if user found deferred.resolve(newUser);
        //else deferred.reject(error)

        return deferred.promise;
    },

    validatePassword:function (userdata,password) {
        var deferred = Q.defer();
        //compare userdata.password with hash of password
        //compare hash in a loop so that it returns at same time interval in each case;

        // ajax request to database here to fetch the user datails

        setTimeout(function () {
            if(this.encryptPassword(password)===this.encryptPassword(password)) {//compare the password provided by user with hash key stored in database

                deferred.resolve(userdata)//return user data with token
            } else {
                deferred.reject(new Error("Invalid username or password"))
            }

        },1000)

        return deferred.promise;
    },

    //this is a stub return the userdata it gets with flag useer added or unable to add user
    addUser:function (userObject) {
        var addedUser, deferred;
        deferred = Q.defer();

        // ajax request to database here to add data to user simulating now with set timeout

        setTimeout(function () {
            if(userObject){
                addedUser={
                    email:userObject.email,
                    password:this.encryptPassword(userObject.password),
                    isAdded:true
                }
                deferred.resolve(addedUser);
            } else {
                deferred.reject(new Error('Unable to add user'))
            }
        },1000)

        return deferred.promise;

    },

    /**
     * Converts raw password string into encrypted password using crypto library.
     *
     * @param {String} Raw password string.
     * @return {String} Encrypted password string.
     */
    encryptPassword: function(password) {
        var salt = 'salt';
        var passwordHash = crypto.createHash('sha256').update(salt.concat(crypto.createHash('sha256').update(password).digest('hex'))).digest('hex');
        return passwordHash;
    }

}