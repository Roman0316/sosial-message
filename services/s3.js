const AWS = require('aws-sdk');

const s3Config = require('../config/dotenv');

const s3 = new AWS.S3(s3Config);

async function putObject(bucketName, filePath, fileContent) {
  const params = {
    Bucket: bucketName,
    Key: filePath,
    Body: fileContent,
  };

  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully', data);
    return data;
  } catch (error) {
    console.error('Error uploading file', error);
    throw error;
  }
}

async function deleteObject(bucketName, filePath) {
  const params = {
    Bucket: bucketName,
    Key: filePath,
  };

  try {
    const data = await s3.deleteObject(params).promise();
    console.log('File deleted successfully', data);
    return data;
  } catch (error) {
    console.error('Error deleting file', error);
    throw error;
  }
}
module.exports = {
  putObject,
  deleteObject,
};
