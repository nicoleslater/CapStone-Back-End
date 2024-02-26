import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand }from "@aws-sdk/client-s3";
import fs from "fs";


// AWS SDK Configuration
// Credentials will be automatically sourced from environment variables
const s3Client = new S3Client({ region: process.env.AWS_REGION });
const uploadFile = async (req, res) => {
  try {
  const file = req.file;
  const fileStream = fs.createReadStream(file.path); // Using streams for better performance

  const params = {
    Bucket: process.env.BUCKET_NAME, // Sourced from environment variable
    Key: file.originalname,
    Body: fileStream,
    ContentType: file.mimetype, // Assuming mimetype is provided by multer
  };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log(`Uploading (s3 controller) ${req.file.originalname} to S3 bucket: ${params.Bucket}`);


    // Manually construct the file URL after upload
    const fileUrl = `https://${params.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${encodeURIComponent(params.Key)}`;

    // Clean up the uploaded file from temporary storage
    fs.unlinkSync(file.path);

    res.status(200).send(`File uploaded successfully. URL: ${fileUrl}`);
  } catch (err) {
    console.error("Error uploading file:", err);
    res.status(500).send(err.message || "Internal Server Error");
  }
};
const downloadFile = async (req, res) => {
  console.log('Controller: downloadFile called for', req.params.filename);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.params.filename,
  };
  
  try {
    console.log(`Downloading (s3 controller) ${req.params.filename} from S3 bucket: ${params.Bucket}`);
    const command = new GetObjectCommand(params);
    const { Body, ContentType } = await s3Client.send(command);
    console.log(`Successfully downloaded ${params.Key}`);
    
    res.set('Content-Type', ContentType);
    Body.pipe(res);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('Internal Server Error');
  }
};
const deleteFile = async (req, res) => {
  console.log('Controller: deleteFile called for', req.params.filename);
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: req.params.filename,
  };

  try {
    console.log(`Deleting (s3 controller) ${req.params.filename} from S3 bucket: ${params.Bucket}`);
    await s3Client.send(new DeleteObjectCommand(params));
    console.log(`Successfully deleted ${params.Key}`);
    
    res.status(200).send('File deleted successfully.');
  } catch (error) {
    console.error('Error deleting file:', error);
    res.status(500).send('Internal Server Error');
  }
};


export {
   uploadFile,
   downloadFile,
   deleteFile
  };
