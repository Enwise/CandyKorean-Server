import AWS from "aws-sdk"
import {AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION, AWS_BUCKET_NAME} from "./index"
import multerS3 from "multer-s3"

const s3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION
});

export const s3Storage = multerS3({
    s3: s3,
    bucket: AWS_BUCKET_NAME,
    key: (req, file, cb) => {
        cb(null, "files/" + Date.now() + "/" + file.originalname);
    }
});