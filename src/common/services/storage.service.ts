import { Injectable, Logger } from "@nestjs/common";
import * as AWS from "aws-sdk";

import config from "config";

@Injectable()
export class StorageService {
  private S3 = new AWS.S3(config.AWS);
  private logger = new Logger(StorageService.name);

  get bucketsList() {
    return config.S3_BUCKETS;
  }

  async uploadFile(params: AWS.S3.PutObjectRequest) {
    try {
      return this.S3.upload(params).promise();
    } catch (e) {
      this.logger.error(e.message || e);
    }
  }

  async deleteFile(params: AWS.S3.DeleteObjectRequest) {
    try {
      return this.S3.deleteObject(params).promise();
    } catch (e) {
      this.logger.error(e.message || e);
    }
  }
}
