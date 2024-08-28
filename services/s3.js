const AWS = require('aws-sdk');

const { s3Config } = require('../config/dotenv');

const { bucket, ...option } = s3Config;

const s3 = new AWS.S3(option);

async function putObject(Key, Body, ContentType, Bucket = bucket) {
  const params = {
    Bucket,
    Key,
    Body,
    ContentType,
    ACL: 'public-read',
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
