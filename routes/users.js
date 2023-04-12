//users.js
var express= require('express');
var router = express.Router();

router.get('/',(req, res, next)=>{
  res.render('user', {"username":"Khaled"});
});

router.get('/:userid',(req, res, next)=>{
  res.render('user',{"username":req.param("userid")});
});

module.exports = router;
