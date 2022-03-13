import multer from "multer";
import { Request } from "express-serve-static-core";
import mime from "mime-types";
import path from "path";

import fs from "fs";

class Multer {
	private URL: string = path.basename('uploads');

	constructor() { }


	private storage(): multer.StorageEngine {
		return multer.diskStorage({
			destination: (req, file, cb) => {
				if (!fs.existsSync(this.URL))
					fs.mkdirSync(this.URL);

				cb(null, this.URL);
			},

			filename: (req, file, cb) => {
				const type = mime.extension(file.mimetype);
				cb(null, `${new Date().getTime()}.${type}`);
			},
		});
	}

	private fileFilter() {
		return (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
			const type = mime.extension(file.mimetype);
			const conditions = ["png", "jpg", "jpeg"];

			if (conditions.includes(`${type}`))
				cb(null, true);

			cb(null, false);
		};
	}

	get getConfig(): multer.Options {
		return {
			storage: this.storage(),
			fileFilter: this.fileFilter(),
		};
	}
}

export const MulterUpload = new Multer();