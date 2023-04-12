//photos.js
var express= require('express');
var router = express.Router();
var multer = require('multer');
var photoController = require ('../../controllers/photoController');
var upload = multer ({
  storage: photoController.storage,
  fileFilter: photoController.iamgeFilter

});

const PhotoService = photoController.PhotoService;


router.use((re, res, next)=>{

  res.set({
  // Allow ajax access
  'Access-Control-Allow-Origin':'*',
  // Allows 'preflight'
  'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-type':'application/json'
  });
  if(req.method == 'OPTIONS'){
    return res.status(200).end();
  }  
  next();
});

//photos-listing
router.get('/',(req, res, next)=>{
  PhotoService.list()
    .then((photos)=>{
      console.log(`Api: found images: ${photos}`);
      res.status(200);
      res.send(JSON.stringify(photos))
    })
});

// finding a photo

router.get('/:photoid',(req, res, next)=>{
  PhotoService.read(req.params.photoid)
    .then((photo)=>{
      console.log(`Api: found images: ${photo}`);
      res.status(200);
      res.send(JSON.stringify(photo));

    }).catch((err)=>{
      res.status(404);
      res.end();
    });
});

 //  create

 router.post('/', async (req, res, next) =>{
   var path = req.body.imageurl;
   var photo = {
     title: req.body.title,
     description: req.body.description,
     imageurl: path
   }
   try{
     const photoSave = await PhotoService.create(photo);
     res.status(201);
     res.send(JSON.stringify(photoSave));

   }catch(err){
     console.log(err);
     throw new Error("Photo Save Error", photo);
   }


 });

 //  update

 router.put('/:photoid',(req, res, next)=>{
   console.log(`putting ${req.params.photoid}`);
   let putdata = req.body;
   PhotoService.update(req.params.photoid, putdata)
   .then((updatedPhoto)=>{
     res.status(200);
     res.send(JSON.stringify(updatedPhoto));
   }).catch((err)=>{
     res.status(404);
     res.end()
   });
 });

 //  delete

 router.delete('/:photoid',(req, res, next)=>{
   PhotoService.delete(req.params.photoid)
   .then((photo)=>{
     console.log(`found images: ${photo}`);
     res.status(200);
     res.send(JSON.stringify(photo));
   }).catch((err)=>{
     res.status(404);
     res.end()
   });
 });


module.exports = router;
