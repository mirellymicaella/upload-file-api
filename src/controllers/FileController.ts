import { File } from '../types/File';
import { Request, Response } from 'express';
import { create, find, findById, findByName, deleteById } from '../repositories/FileRepository';
import path from "path";

const FileController = {
	async index(req: Request, res: Response) {
		find((err: Error, files: File[]) => {
			if (err) throw new Error(err.message);

			res.status(200).json(files);
		});
	},

	async store(req: Request, res: Response) {
		if (!req.file)
			return res.status(400).send({ message: 'Please upload a file.' });

		const file: File = {
			name: req.file.filename,
			size: req.file.size
		}

		create(file, (err: Error, file: File) => {
			if (err) throw new Error(err.message);
			res.status(200).json(file);
		});
	},

	async show(req: Request, res: Response) {
		const id = parseInt(req.params.fileId);

		findById(id, (err: Error, file: File) => {
			if (err) throw new Error(err.message);
			res.status(200).json(file);
		});
	},

	async downloadDocument(req: Request, res: Response) {
		const fileId = parseInt(req.params.fileId);

		await findById(fileId, async (err: Error, file: File) => {
			if (err) throw new Error(err.message);

			if (!file)
				return res.status(400).send({ message: 'File not found' });

			const pathFile = path.resolve(`uploads/${file.name}`);
			return res.sendFile(pathFile);
		});
	},

	async delete(req: Request, res: Response) {
		const id = parseInt(req.params.fileId);
		deleteById(id, (err: Error, file: File) => {
			if (err) throw new Error(err.message);
			res.status(200).json("Deletado com sucesso");
		});

	},
};

export { FileController };