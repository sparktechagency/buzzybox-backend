import { Request } from 'express';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import ApiError from '../../errors/ApiError';

const fileUploadHandler = () => {
      //create upload folder
      const baseUploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(baseUploadDir)) {
            fs.mkdirSync(baseUploadDir);
      }

      //folder create for different file
      const createDir = (dirPath: string) => {
            if (!fs.existsSync(dirPath)) {
                  fs.mkdirSync(dirPath);
            }
      };

      //create filename
      const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                  let uploadDir;
                  switch (file.fieldname) {
                        case 'image':
                              uploadDir = path.join(baseUploadDir, 'images');
                              break;
                        case 'categoryImage':
                              uploadDir = path.join(baseUploadDir, 'categories');
                              break;
                        case 'aboutImage':
                              uploadDir = path.join(baseUploadDir, 'about');
                              break;
                        case 'occasionImage':
                              uploadDir = path.join(baseUploadDir, 'occasions');
                              break;
                        case 'howItWorksImage':
                              uploadDir = path.join(baseUploadDir, 'how-it-works');
                              break;
                        case 'userImage':
                              uploadDir = path.join(baseUploadDir, 'reviews');
                              break;
                        case 'pageImage':
                              uploadDir = path.join(baseUploadDir, 'images');
                              break;

                        case 'media':
                              uploadDir = path.join(baseUploadDir, 'medias');
                              break;
                        case 'doc':
                              uploadDir = path.join(baseUploadDir, 'docs');
                              break;
                        default:
                              throw new ApiError(StatusCodes.BAD_REQUEST, 'File is not supported');
                  }
                  createDir(uploadDir);
                  cb(null, uploadDir);
            },
            filename: (req, file, cb) => {
                  const fileExt = path.extname(file.originalname);
                  const fileName = file.originalname.replace(fileExt, '').toLowerCase().split(' ').join('-') + '-' + Date.now();
                  cb(null, fileName + fileExt);
            },
      });

      //file filter
      const filterFilter = (req: Request, file: any, cb: FileFilterCallback) => {
            if (
                  file.fieldname === 'image' ||
                  file.fieldname === 'categoryImage' ||
                  file.fieldname === 'occasionImage' ||
                  file.fieldname === 'aboutImage' ||
                  file.fieldname === 'howItWorksImage' ||
                  file.fieldname === 'userImage' ||
                  file.fieldname === 'pageImage'
            ) {
                  if (
                        file.mimetype === 'image/jpeg' ||
                        file.mimetype === 'image/png' ||
                        file.mimetype === 'image/jpg' ||
                        file.mimetype === 'image/webp'
                  ) {
                        cb(null, true);
                  } else {
                        throw new ApiError(StatusCodes.BAD_REQUEST, 'Only .jpeg, .png, .jpg .webp file supported');
                  }
            } else if (file.fieldname === 'media') {
                  if (file.mimetype === 'video/mp4' || file.mimetype === 'audio/mpeg') {
                        cb(null, true);
                  } else {
                        throw new ApiError(StatusCodes.BAD_REQUEST, 'Only .mp4, .mp3, file supported');
                  }
            } else if (file.fieldname === 'doc') {
                  if (file.mimetype === 'application/pdf') {
                        cb(null, true);
                  } else {
                        throw new ApiError(StatusCodes.BAD_REQUEST, 'Only pdf supported');
                  }
            } else {
                  throw new ApiError(StatusCodes.BAD_REQUEST, 'This file is not supported');
            }
      };

      const upload = multer({
            storage: storage,
            fileFilter: filterFilter,
      }).fields([
            { name: 'image', maxCount: 3 },
            { name: 'categoryImage', maxCount: 1 },
            { name: 'occasionImage', maxCount: 1 },
            { name: 'aboutImage', maxCount: 1 },
            { name: 'howItWorksImage', maxCount: 1 },
            { name: 'userImage', maxCount: 1 },
            { name: 'pageImage', maxCount: 1 },
            { name: 'media', maxCount: 3 },
            { name: 'doc', maxCount: 3 },
      ]);
      return upload;
};

export default fileUploadHandler;
