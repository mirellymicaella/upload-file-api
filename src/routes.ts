//Express [Router, multer]
import { Router } from "express";
import multer from "multer";

import { FileController } from './controllers/FileController';
import { MulterUpload } from './middlewares/MulterUpload';

const router: Router = Router();

router.post("/files", multer(MulterUpload.getConfig).single("file"), FileController.store);
router.get("/files",  FileController.index);
router.get("/files/:fileId/download",  FileController.downloadDocument);
router.get("/files/:fileId",  FileController.show);
router.delete("/files/:fileId",  FileController.delete);

export { router };