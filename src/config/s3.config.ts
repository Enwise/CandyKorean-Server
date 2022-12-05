import AWS from "aws-sdk"
import {AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_REGION} from "./index"

const storage: AWS.S3 = new AWS.S3({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY,
    region: AWS_REGION
});

export default storage;