const express = require('express');
const app = express();
const multer = require('multer');

const PORT = process.env.PORT || 3000;
const storage = multer.diskStorage({
  	destination: function (req, file, cb) {
   	 	cb(null, './public/');
  	},
  	filename: function (req, file, cb) {
  		const fileFormat = file.mimetype.split('/');
        cb(null, file.originalname);
  	}
});


const upload = multer({ storage: storage })

app.use(express.json());
app.use(express.static('public'));

app.listen(PORT, () => {
	console.log('GOOD');
});
const path = require('path');
app.get('/', (req, res) => {
	res.sendFile(path.resolve('public/index.html'));
});

app.post('/img', upload.single('img'), (req, res) => {
	res.json({img: __dirname, env: process.env.TEST, file: req.file});
});