// uploadMiddleware.js
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


// Set up storage location for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads')); 
    // Temporary directory for uploads
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Create multer upload middleware
const upload = multer({ storage: storage });

export default upload;

// import multer from 'multer';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Set up storage location for multer
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const userId = req.user ? req.user.id : 'anonymous'; // Get user ID from the request or set to 'anonymous'
//     const userUploadsDir = path.join(__dirname, `../uploads/${userId}`); // Create a directory for each user
//     cb(null, userUploadsDir);
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// // Create multer upload middleware
// const upload = multer({ storage: storage });

// export default upload;
