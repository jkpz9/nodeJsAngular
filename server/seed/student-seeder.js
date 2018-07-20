var mongoose = require('mongoose'),
    Student = require('../models/student');

mongoose.connect('mongodb://127.0.0.1:27017/crud_students');

var students = [
    new Student({
        FirstName: 'Pham',
        LastName: 'Quoc Hoang',
        Email: 'Kingkrysber@gmail.com',
        Phone: '096-668-2123'
    }),
    new Student({
        FirstName: 'Ngo Hoang',
        LastName: 'Bao Quyen',
        Email: 'Quyenquyen@gmail.com',
        Phone: '099-668-8924'
    }),
    new Student({
        FirstName: 'Thai',
        LastName: 'Quynh Chi',
        Email: 'quynhchithai@gmail.com',
        Phone: '099-668-4645'
    }),
    new Student({
        FirstName: 'Nguyen Thi',
        LastName: 'Hong Ngoc',
        Email: 'hongngocnguyen@gmail.com',
        Phone: '098-668-4632'
    })
];

var index = 0;

for(var i = 0; i < students.length; i++){
    students[i].save(function(err, doc){
        index++;
        console.log(index);
        if(index == students.length){
            mongoose.disconnect();
        }
    });
}