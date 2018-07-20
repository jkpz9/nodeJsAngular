var express = require('express'),
    router = express.Router();

// import validator

var validator = require('../validation/validate');
// import Student model
var Student = require('../models/student');
    
    // mongojs = require('mongojs'),
    // db = mongojs('mongodb://kingpham:5lcp1i7zF@ds139844.mlab.com:39844/crud_students',['students']);

    // db.on('ready',function() {
    //     console.log('database connected');
    // });

// get all
router.get('/students', function(req, res, next){
  // db.students.find(function(err, students){
  //   if(err){
  //     res.send(err);
  //   }
  //   else{
  //     res.json(students);
  //   }
  // });
  Student.getStudents(function(err, students){
    if(err){
      throw err;
    }else{
      res.json(students);
    }
  });
});

// get one
router.get('/students/:id', function(req, res, next){
  // db.students.find({_id: mongojs.ObjectId(req.params.id)}, function(err, student){
  //   if(err){
  //     res.send(error);
  //   }
  //   else{
  //     res.json(student);
  //   }
  // });
  Student.getStudentById(req.params.id, function(err,student){
    if(err){
      throw err;
    }else{
      res.json(student);
    }
  });
});

// create student
router.post('/students', function(req, res, next){

      // validate data first
      var err = [];
      if(!validator.isEmail(req.body.Email)){
        err.push("Email provided is invalid");
      }
      if(!validator.isPhone(req.body.Phone)){
        err.push("Phone provided is invalid")
      }

      // check error array is empty to continue otherwise terminated
      if(err.length > 0){
        res.json({
          err: err
        });
      }
      var student = new Student({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Phone: req.body.Phone
      });

      Student.addStudent(student, function(err,student){
        if(err){
          throw err;
        }else{
          res.json(student);
        }

      });

});

// update student
router.post('/students/update/:id',function(req, res, next){

  var student = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Phone: req.body.Phone
      };

  Student.updateStudent(req.params.id,student, function(err,cb){
    if(err){
      throw err;
    }else{
      res.json(student);
    }

  });
});

// delete
router.get('/students/delete/:id', function(req, res, next){

  Student.deleteStudent(req.params.id, function(err, student){
    if(err){
      throw err;
    }else{
      res.json(student);
    }
  });
});


module.exports = router;
