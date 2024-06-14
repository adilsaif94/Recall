const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mime = require('mime-types'); 

const app = express();
const PORT = 3000;


const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });


app.post('/upload', upload.single('file'), (req, res) => {
  try {
    console.log('File Received:', req.file);
    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'File upload failed', error: error.message });
  }
});


app.get('/uploadedFiles', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to fetch uploaded files', error: err.message });
    }
    const uploadedFiles = files.map(file => ({
      uri: `${req.protocol}://${req.get('host')}/uploads/${file}`,
      type: mime.lookup(file) || 'application/octet-stream',
      id: file 
    }));
    res.status(200).json(uploadedFiles);
  });
});


app.delete('/delete/:id', (req, res) => {
  const fileId = req.params.id;
  const filePath = path.join(uploadDir, fileId);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to delete file', error: err.message });
    }
    res.status(200).json({ message: 'File deleted successfully' });
  });
});


app.use('/uploads', express.static(path.join(__dirname, uploadDir)));

app.listen(PORT, () => {
  console.log(`Server running on http://454545.45.4.45:${PORT}`);
});
