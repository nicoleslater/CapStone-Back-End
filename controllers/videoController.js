// videoController.js
import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
import OpenTok from 'opentok';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { createSession, generateToken } from '../service/videoService.js';
import fs from 'fs';
import path from 'path';
import {
  getAllVideos,
    getVideoById,
    createVideo,
    updateVideo,
    deleteVideo
} from '../queries/videos.js'


console.log('Vonage API Key XXXXXXX:', process.env.VONAGE_API_KEY);
console.log('Vonage Secret message:', process.env.VONAGE_SECRET);

const opentok = new OpenTok(process.env.VONAGE_API_KEY, process.env.VONAGE_SECRET);

const getAllTidbits = async (req, res) => {
  try {
    const videos = await getAllVideos();
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos c:', error);
    res.status(500).json('Error fetching videos c')
  }
};

const getTidbitsById = async (req, res) => {
  try {
    const video = await getVideoById(req.params.id);
    if (video) {
      res.json(video)
    } else {
      res.status(404).json('Video not found c')
    }
  } catch (error) {
    console.error('Error fetching video by id c:', error);
    res.status(500).json('Error fetching video c')
  }
};

const createTidbitsMetadata = async (req, res) => {
  try {
    const videoData = {
      user_id: req.user.id,
      title: req.body.title,
      summary: req.body.summary,
      video_url: req.body.video_url,
      duration: req.body.duration
    };
    const newVideo = await createVideo(videoData);
    res.json(201).json(newVideo);
  } catch (error) {
    console.error('error saving video details to database:', error);
    res.status(500).json('Error saving video details.')
  }
  };

const s3Client = new S3Client({ 
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  }
});

export const createTidbitSession = async (req, res) => {
  opentok.createSession({}, function(error, session) {
    if (error) {
      console.error('Error creating session:', error);
      return res.status(500).json('Failed to create session');
    } else {
      console.log('Session ID:', session.sessionId);
      res.json({ sessionId: session.sessionId })
    }
  });
};

const generateTidbitToken = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const token = generateToken(sessionId);
    res.json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json('Failed to generate token');
  }
};

// Starts a recording. Keep this functionality focused on just starting the recording.
const startTidbitRecording = async (req, res) => {
  const sessionId = req.body.sessionId;
  opentok.startArchive(sessionId, { name: 'Session Recording' }, (error, archive) => {
    if (error) {
      return res.status(500).json(error);
    }
    res.json({ archiveId: archive.id });
  });
};


const stopTidbitRecording = async (req, res) => {
  const archiveId = req.body.archiveId; // Assuming you'll pass the archiveId to stop the recording
  
  opentok.stopArchive(archiveId, (error, archive) => {
    if (error) {
      return res.status(500).json(error);
    }
    // Once stopped, the archive object is returned, and you can respond accordingly
    res.json({ message: 'Recording stopped successfully', archiveId: archive.id });
  });
};

const uploadTidbit = async (req, res) => {
  const archiveId = req.body.archiveId;

  opentok.getArchive(archiveId, async (error, archive) => {
    if (error) {
      return res.status(500).json(error);
    }
    if (!archive.url) {
      return res.status(400).json('Archive URL not available');
    }

    const response = await fetch(archive.url);
    if (!response.ok) {
      return res.status(500).json('Failed to download archive');
    }

    const fileName = `${archiveId}.mp4`;
    const s3Params = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `recordings/${fileName}`,
      Body: response.body, // Stream directly to S3
      ContentType: 'video/mp4',
    };

    try {
      await s3Client.json(new PutObjectCommand(s3Params));
      res.json({ message: 'Tidbit uploaded successfully', fileName });
    } catch (s3Err) {
      console.error('Error uploading to S3:', s3Err);
      return res.status(500).json("Error uploading tidbit to S3.");
    }
  });
};

const updateTidbitMetadata = async (req,  res) => {
  const videoId = req.params.id;
  const videoData = {
    title: req.body.title,
    summary: req.body.summary,
    video_url: req.body.video_url,
    duration: req.body.duration
  };
  try {
    const updatedVideo = await updateVideo(videoId, videoData);
    if (updatedVideo) {
      res.json({ message: 'Video updated successfully', video: updatedVideo });
    } else {
      res.status(404).json('Video not found c');
    }
  } catch (error) {
    console.error('Error updating video c', error);
    res.status(500).json('Error updating video');
  }
};

const deleteTidbit = async (req, res) => {
  const videoId = req.params.id;
  try {
    const deletedVideo = await deleteVideo(videoId);
    if (deletedVideo) {
      res.json({ message: 'Video deleted successfully', video: deletedVideo });
    } else {
      res.status(404).json('Video not found c')
    } 
    } catch (error) {
      console.error('Error deleting video c:', error);
      res.status(500).json('Error deleting video c')
  }
}


export default {
  getAllTidbits,
  getTidbitsById,
  createTidbitsMetadata,
  createTidbitSession,
  generateTidbitToken,
  startTidbitRecording,
  stopTidbitRecording,
  uploadTidbit,
  updateTidbitMetadata,
  deleteTidbit
};