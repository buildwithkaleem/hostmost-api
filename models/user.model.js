import mongoose from 'mongoose';
import argon2 from "argon2";

const userSchema = new mongoose.Schema({
  userName:{
    type:String,
    required: [true, "User Name is required"],
  },
  email:{
    type:String,
    required: [true, "Email is required"],
    unique:[true,"Email Allready Existes"]
  },
  password:{
    type:String,
    required: [true, "Password is required"],
  },
  isVerified: { type: Boolean, default: false },
  role: { 
    type:String,
    default:"user" 
    },
  profilePic: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
 

}, { timestamps: true });

userSchema.pre("save", async function () {

  if (!this.isModified("password")) return;

  this.password = await argon2.hash(this.password);

});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await argon2.verify(this.password, enteredPassword);
};

export const userModel = mongoose.model("User",userSchema);