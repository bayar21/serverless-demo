"use strict";
const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-east-2",
});

const s3 = new AWS.S3({
  apiVersion: "4"
});

module.exports.provideUrl = (event, context, callback) => {
  const { name, type } = event.headers;
  const myBucket = "serverless-bbucket";

  s3.getSignedUrl(
    "putObject",
    {
      Bucket: myBucket,
      Key: name,
      ContentType: type,
    },
    (err, url) => {
      if (err) {
        callback(null, err);
      } else {
        callback(null, url);
      }
    }
  );
};
