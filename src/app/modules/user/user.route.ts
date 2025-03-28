import express from 'express';
import { USER_ROLES } from '../../../enums/user';
import auth from '../../middlewares/auth';
import fileUploadHandler from '../../middlewares/fileUploadHandler';
import validateRequest from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
const router = express.Router();

router.get('/profile', auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER), UserController.getUserProfile);

//create a new user
router.route('/create-user').post(validateRequest(UserValidation.createUserZodSchema), UserController.createUser);
//create a new admin
router.route('/create-admin').post(
      auth(USER_ROLES.SUPER_ADMIN),
      validateRequest(UserValidation.createUserZodSchema),
      UserController.createAdmin
);
// get all admins
router.route('/all-admin').get(auth(USER_ROLES.SUPER_ADMIN), UserController.getAllAdmin);
router.patch('/update-admin/:id', auth(USER_ROLES.SUPER_ADMIN), UserController.updateAdmin);
router.delete('/delete-admin/:id', auth(USER_ROLES.SUPER_ADMIN), UserController.deleteAdmin);

// router
//     .route('/create-super-admin')
//     .post(validateRequest(UserValidation.createUserZodSchema), UserController.createSuperAdmin);
// //update user status
router.route('/update-status/:id').patch(
      auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN),
      validateRequest(UserValidation.userStatusZodSchema),
      UserController.updateStatus
);

// update user profile
router.route('/update-profile').patch(
      auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN, USER_ROLES.USER),
      fileUploadHandler(),
      UserController.updateProfile
);
// get all users
router.route('/all-user').get(auth(USER_ROLES.SUPER_ADMIN, USER_ROLES.ADMIN), UserController.getAllUsers);

//get single user by id
router.route('/:id').get(auth(USER_ROLES.ADMIN, USER_ROLES.USER), UserController.getUserById);

//  delete user account
router.route('/delete-account').patch(auth(USER_ROLES.ADMIN, USER_ROLES.USER), UserController.deleteAccount);
export const UserRoutes = router;
