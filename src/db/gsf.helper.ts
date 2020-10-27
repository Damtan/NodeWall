import mongoose from "mongoose";
const conn = mongoose.connection;
import fs from "fs";
import path from "path";

export class GsfHelper {
  public static async storeFile(
    bucketName: string,
    filePath: string
  ): Promise<string> {
    const opts = {
      bucketName: bucketName,
    };
    const bucket = new mongoose.mongo.GridFSBucket(conn.db, opts);

    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(bucket.openUploadStream(path.basename(filePath)))
        .on("error", function (err) {
          reject(err);
        })
        .on("finish", function (file) {
          resolve(file);
        });
    });
  }
}
