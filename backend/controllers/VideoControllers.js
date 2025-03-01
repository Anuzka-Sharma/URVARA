const pool = require("../config/db");  // import ki jagah require
const AWS = require("aws-sdk"); 
const multer = require("multer");
const dotenv = require("dotenv");


dotenv.config();

// ✅ AWS S3 Configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

// ✅ Multer Middleware for Memory Storage (50MB Limit)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
}).single("video");

// ✅ Video Upload Handler
const uploadVideo = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error("❌ Multer Error:", err.message);
      return res.status(400).json({ error: err.message });
    }

    const file = req.file;
    if (!file) return res.status(400).json({ error: "No file uploaded" });

    console.log("📂 File Received:", file.originalname);
    
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `videos/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      console.log("📡 Uploading to S3...");
      const data = await s3.upload(params).promise();
      console.log("✅ Video Uploaded to S3:", data.Location);

      const sql = "INSERT INTO videos (title, url, uploader) VALUES (?, ?, ?)";
      await pool.query(sql, [file.originalname, data.Location, "user123"]);

      res.json({ message: "🎉 Video uploaded successfully", url: data.Location });
    } catch (err) {
      console.error("❌ Upload Error:", err.message);
      res.status(500).json({ error: err.message });
    }
  });
};

// ✅ Fetch All Videos
const getAllVideos = async (req, res) => {
  try {
    console.log("🔍 Fetching all videos...");
    const [results] = await pool.query("SELECT * FROM videos");
    res.json(results);
  } catch (err) {
    console.error("❌ Fetch Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Fetch Trending Videos
const getTrendingVideos = async (req, res) => {
  try {
    console.log("🔥 Fetching trending videos...");
    const [results] = await pool.query("SELECT * FROM videos ORDER BY views DESC LIMIT 10");
    res.json(results);
  } catch (err) {
    console.error("❌ Trending Fetch Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Search Videos
const searchVideos = async (req, res) => {
  try {
    console.log("🔍 Search Query:", req.query.q);
    const searchQuery = `%${req.query.q}%`;
    const [results] = await pool.query("SELECT * FROM videos WHERE title LIKE ?", [searchQuery]);
    res.json(results);
  } catch (err) {
    console.error("❌ Search Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Increment Video Views
const incrementViews = async (req, res) => {
  try {
    console.log("📈 Increasing view count for video ID:", req.params.id);
    await pool.query("UPDATE videos SET views = views + 1 WHERE id = ?", [req.params.id]);
    res.json({ message: "✅ View count updated" });
  } catch (err) {
    console.error("❌ View Increment Error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadVideo, getAllVideos, getTrendingVideos, searchVideos, incrementViews };
