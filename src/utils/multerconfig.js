import multer from "multer";

const storage = multer.memoryStorage(); // Gunakan memory storage untuk menyimpan file sementara di dalam memori

const upload = multer({ storage: storage });

export default upload;
