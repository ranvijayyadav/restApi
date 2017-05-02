/**
 * Created by ryadav on 4/30/17.
 */
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

        return deferred.promise;
    }

}