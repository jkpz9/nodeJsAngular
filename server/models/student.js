var mongoose = require('mongoose');

// import validator
// var validatorIpt = require('../validation/validate');

// create new Schema
var StudentSchema = mongoose.Schema({
		FirstName: {
			type: String,
			required: true
		},
		LastName: {
			type: String,
			required: true
		},
		Email: {
			type: String,
			required: true,
			// validate: {
			// 	validator: validatorIpt.isEmail(this.Email),
			// 	message: 'Email is invalid'
			// }
		},
		Phone: {
			type: String,
			required: true,
			// validate: {
			// 	validator: validatorIpt.isPhone(this.Phone),
			// 	message: 'Phone Number is invalid'

			// }
		},
		// Address: {
		// 	City:{
		// 		type: String,
		// 		required: false
		// 	}

		// }
	});

// export model
var Student = module.exports = mongoose.model('Student', StudentSchema);

// get all
module.exports.getStudents = function(cb,limit){
	Student.find(cb).limit(limit);
};

// get one
module.exports.getStudentById = function(id, cb){
	Student.findOne({_id: id}, cb);
};

// add new
module.exports.addStudent = function(student, cb){
	Student.create(student, cb);
};

// update
module.exports.updateStudent = function(id,newInfo,cb){
	Student.findOneAndUpdate({_id: id}, newInfo, cb);
};
// delete
module.exports.deleteStudent = function(id, cb){
	Student.findOneAndRemove({_id: id}, cb);
}

