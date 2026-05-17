import mongoose from 'mongoose';

const contectSchema = new mongoose.Schema({
  name:String,
  email:String,
  subject:String,
  message:{
    type:String,
    maxlength:[200,"Max Message is 200 Words"]
  }
},{timestamps:true});


export const contectModel = mongoose.model("Contect",contectSchema)