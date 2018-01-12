const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const months = ['january', 'December'];

const PersonSchema = new Schema ({
    firstName: {
      type: String,
      required: true,
      index: true,
      lowercase: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true//creares an index automatically
    },
    friends: [],
    age: {type:Number, min: 0, max: 150},//new
    gender: String,
    location: String,
    dateOfBirth: Date,
    workDay: {type: String, match: /^(mon|tues|wednes|thur|fri)day$/i}, //new
    months: {type: String, enum: months } //new
    
},
{runSettersOnQuery: true}//new
);
//virtuals
//user.fullname
PersonSchema.virtual('fullName')
.get(function(){
  return `${this.firstName} ${this.lastName}`;
})
.set(function(name){
  this.first = name.split('')[0];
  this.last = name.split('')[1];
})
module.exports = mongoose.model('Person', PersonSchema);
