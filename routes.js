/**
 * Created by ryadav on 4/30/17.
 */

var userController=require('./controller/ususerController');
var productController=require('./controller/productController');
var tokenValidate=require('./services/tokenService').validateToken;

module.exports = function(app,router) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    app.use(tokenValidate);


    // rest api


    /**
     * @api {post} /api/user/add/ Adding user
     * @apiName addUser
     * @apiDescription We will be able to add user.<br>
     * If the user email already exists in database, then it will send an exception that user already exists with status of 403.<br>
     * If the user email does not exists in the database, then we send a message that user has been created with status of 200.<br>
     * @apiError (403) {String} userAlreadyExists user already exists
     * @apiGroup users
     * @apiHeader {String} x-access-token Users unique access-key.
     * @apiHeader {String} Content-Type Content-Type should be application/json to access json object sent to the api.
     * @apiParam {String} email users unique email.
     * @apiParam {String} password users password.
     * @apiParam {String} name users name.
     *
     * @apiSuccess (200) {Number} id unique id will be added to DB.
     * @apiSuccess (200) {String} name users name will be added.
     * @apiSuccess (200) {String} email users email added to DB.
     * @apiSuccess (200) {String} password users password added to DB.
     * @apiSuccess (200) {Date} createdAt Indicates the time when user was created.
     * @apiSuccess (200) {Date} updatedAt Indicates the time when user was updated.
     * @apiVersion 0.0.1
     */
    router.post('/user/add', userController.addUser);


    /**
     * @api {post} /api/user/authenticate/ Authenticating user
     * @apiName authenticate
     * @apiDescription We will be able to authenticate user from the system.<br>
     * The user email & password is validate against the DB, if it matches, then json web token is generated and sent back to user with status of 200<br>
     * The user email & password is validate against the DB, if it does not match, then message 'email & password does not match' is sent with status of 403<br>
     * @apiError (403) {String} validationFail email & password does not match
     * @apiGroup users
     * @apiHeader {String} Content-Type Content-Type should be application/json to access json object sent to the api.
     * @apiParam {String} email users unique email.
     * @apiParam {String} password users password.
     *
     * @apiSuccess (200) {String} x-access-token jwt token is sent to the user.
     * @apiVersion 0.0.1
     */
    router.post('/user/authenticate', userController.authenticate);

    /**
     * @api {post} /api/product/addProduct/ Adding user
     * @apiName addUser
     * @apiDescription We will be able to add product.<br>
     * If the user email already exists in database, then it will send an exception that user already exists with status of 403.<br>
     * If the user email does not exists in the database, then we send a message that user has been created with status of 200.<br>
     * @apiError (403) {String} userAlreadyExists user already exists
     * @apiGroup users
     * @apiHeader {String} x-access-token Users unique access-key.
     * @apiHeader {String} Content-Type Content-Type should be application/json to access json object sent to the api.
     * @apiParam {String} Product name.
     * @apiParam {String} product size.
     * @apiParam {String} product colour.
     *
     * @apiSuccess (200) {Number} id unique id will be added to DB.
     * @apiSuccess (200) {String} Product name.
     * @apiSuccess (200) {String} email users email added to DB.
     * @apiSuccess (200) {String} password users password added to DB.
     * @apiSuccess (200) {Date} createdAt Indicates the time when user was created.
     * @apiSuccess (200) {Date} updatedAt Indicates the time when user was updated.
     * @apiVersion 0.0.1
     */
    router.post('/product/addProduct', productController.addProduct);


    router.get('/product/getProduct', productController.getProduct);


    router.post('/product/updateProduct', productController.updateProduct);


    router.delete('/product/deleteProduct',productController.deleteProduct);


    router.get('product/searchProduct',productController.searchProduct)

}
