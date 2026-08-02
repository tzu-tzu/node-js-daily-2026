// 課程錄影練習
let express = require('express');
let router = express.Router();

router.get('/edit-profile', (req, res) => {
    res.send('Edit Profile Page');
});

router.get('/photo-gallery', (req, res) => {
    res.send('Photo Gallery Page');
});

module.exports = router;