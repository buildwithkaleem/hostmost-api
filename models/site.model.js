import mongoose from 'mongoose';


const siteSchema = new mongoose.Schema({
  user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: [true, "User is required"],
      },
  subDomain: {
    type: String,
    unique: [true,"Your Sub Domain is Allready Existes"],
    default:""
  },
  customDomain: {
    type: String,
    unique: [true, "Your Custom Domain is Allready Existes"],
    default: ""
  },
  source: {
    type: String,
    // required: [true, "source is required"],
    default: ""
  },
  publicId:{
    type: String,
  },
  serverIp: {
    type: String,
    default: ""
  },
  sitePublicLink: {
    type: String,
    default: ""
  },

}, { timestamps: true });


export const siteModel = mongoose.model("Site", siteSchema);