import { StatusCodes } from 'http-status-codes';
import { JwtPayload } from 'jsonwebtoken';
import { USER_ROLES } from '../../../enums/user';
import ApiError from '../../../errors/ApiError';
import { emailHelper } from '../../../helpers/emailHelper';
import { emailTemplate } from '../../../shared/emailTemplate';
import unlinkFile from '../../../shared/unlinkFile';
import generateOTP from '../../../util/generateOTP';
import { IUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../../builder/QueryBuilder';

const createUserToDB = async (payload: Partial<IUser>): Promise<IUser> => {
      //set role
      payload.role = USER_ROLES.USER;
      const createUser = await User.create(payload);
      if (!createUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create user');
      }

      //send email
      const otp = generateOTP();
      const values = {
            name: createUser.name,
            otp: otp,
            email: createUser.email!,
      };
      const createAccountTemplate = emailTemplate.createAccount(values);
      emailHelper.sendEmail(createAccountTemplate);

      //save to DB
      const authentication = {
            oneTimeCode: otp,
            expireAt: new Date(Date.now() + 3 * 60000),
      };
      await User.findOneAndUpdate({ _id: createUser._id }, { $set: { authentication } });

      return createUser;
};
const createAdminToDB = async (payload: Partial<IUser>): Promise<IUser> => {
      //set role
      payload.role = USER_ROLES.ADMIN;
      payload.verified = true;
      const createUser = await User.create(payload);
      if (!createUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Failed to create admin');
      }

      return createUser;
};
const updateAdminToDB = async (id: string, payload: Partial<IUser>): Promise<IUser | null> => {
      const isExistUser = await User.isExistUserById(id);
      if (!isExistUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
      }

      const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
            new: true,
      });

      return updateDoc;
};
const deleteAdminToDB = async (id: string): Promise<IUser | null> => {
      const isExistUser = await User.isExistUserById(id);
      if (!isExistUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
      }

      const deleteDoc = await User.findOneAndDelete({ _id: id });

      return deleteDoc;
};

const getUserProfileFromDB = async (user: JwtPayload): Promise<Partial<IUser>> => {
      const { id } = user;
      const isExistUser = await User.isExistUserById(id);
      if (!isExistUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
      }

      return isExistUser;
};

const getAllUserFromDB = async (query: Record<string, any>) => {
      const userModal = new QueryBuilder(User.find({ role: USER_ROLES.USER }), query)
            .search(['name', 'email'])
            .filter()
            .paginate()
            .sort()
            .fields();
      const data = await userModal.modelQuery;
      const meta = await userModal.countTotal();

      return {
            data,
            meta,
      };
};
const getAllAdminFromDB = async (query: Record<string, any>) => {
      const userModal = new QueryBuilder(User.find({ role: USER_ROLES.ADMIN }), query)
            .search(['name', 'email'])
            .filter()
            .paginate()
            .sort()
            .fields();
      const data = await userModal.modelQuery;
      const meta = await userModal.countTotal();

      return {
            data,
            meta,
      };
};

const getUserByIdFromDB = async (id: string) => {
      const result = await User.findById(id);
      return result;
};

const updateProfileToDB = async (user: JwtPayload, payload: Partial<IUser>): Promise<Partial<IUser | null>> => {
      const { id } = user;

      if (payload.email) {
            throw new ApiError(StatusCodes.FORBIDDEN, 'Email cannot be changed!!!');
      }
      const isExistUser = await User.isExistUserById(id);
      if (!isExistUser) {
            throw new ApiError(StatusCodes.BAD_REQUEST, "User doesn't exist!");
      }

      //unlink file here
      if (payload.profile) {
            unlinkFile(isExistUser.profile);
      }

      const updateDoc = await User.findOneAndUpdate({ _id: id }, payload, {
            new: true,
      });

      return updateDoc;
};

const deleteAccountFromDB = async (email: string, password: string) => {
      // Validate required fields
      if (!email) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Email is required!');
      }
      if (!password) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Password is required!');
      }

      // Find the user by email and include the password field
      const user = await User.findOne({ email }).select('+password');
      if (!user) {
            throw new ApiError(StatusCodes.NOT_FOUND, 'Email password pair not found!');
      }

      // Verify the password
      const isPasswordValid = await User.isMatchPassword(password, user.password);
      if (!isPasswordValid) {
            throw new ApiError(StatusCodes.BAD_REQUEST, 'Password is incorrect!');
      }

      // Delete the user account
      const deletedUser = await User.findOneAndUpdate({ email }, { $set: { status: 'delete' } }, { new: true });

      return deletedUser;
};
const updateStatusIntoDB = async (id: string, status: string) => {
      const result = await User.findOneAndUpdate(
            { _id: id },
            {
                  $set: {
                        status: status,
                  },
            },

            {
                  new: true,
            }
      );

      return result;
};

export const UserService = {
      createUserToDB,
      getUserProfileFromDB,
      updateProfileToDB,
      getAllUserFromDB,
      getUserByIdFromDB,
      deleteAccountFromDB,
      createAdminToDB,
      updateAdminToDB,
      deleteAdminToDB,
      getAllAdminFromDB,
      updateStatusIntoDB,
};
