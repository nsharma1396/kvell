/**
 * @apiDefine LoginParam
 * @apiDescription Hey
 * @apiParam {String} username Your e-mail-address.
 * @apiParam {String} password Your password.
 */

/**
 * @apiDefine UserParam
 * @apiParam {String} firstname Your firstname.
 * @apiParam {String} lastname  Your lastname.
 * @apiParam {Date}   birthday  Your birthday.
 */

/**
 * @api {GET} /account/register Register a new user.
 * @apiUse LoginParam
 * @apiUse UserParam
 * @apiParam {Boolean} terms Checkbox to accept the terms.
 */

/**
 * @api {GET} /account/login Signin with an existing user.
 * @apiUse LoginParam
 * @apiParam {Boolean} rememberme Checkbox to auto-login on revisit.
 */
