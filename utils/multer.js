import multer from "multer";
const DatauriParser = require('datauri/parser');
const parser = new DatauriParser();
const path = require('path');
import { imageFilter } from "./helpers";

const storage = multer.memoryStorage();

export const uploadFile = multer({ storage: storage, fileFilter: imageFilter, limits: {fileSize: 1000000} }).single("image");

export const formatBufferTo64 = file =>
  parser.format(path.extname(file.originalname).toString(), file.buffer)