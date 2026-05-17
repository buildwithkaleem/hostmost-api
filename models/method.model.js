import mongoose from 'mongoose';


const methodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  firstName: {
    type: String,
    required: [true, "firstName is required"]
  },
  lastName: {
    type: String,
    required: [true, "lastName is required"]
  },
  addressLine1: {
    type: String,
    required: [true, "addressLine1 is required"],
    // unique: [true, "Address Line1 Allready Existes"],
  },
  addressLine2: {
    type: String,
    default: ""
  },
  city: {
    type: String,
    required: [true, "city is required"],
  },
  country: {
    type: String,
    required: [true, "country is required"],
  },
  zipCode: {
    type: String,
    required: [true, "zipCode is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone Number is required"],
    maxlength: [15, "Phone Number maximam 15 Number"],
  },
  cardType: {
    type: String,
    enum: ["visa", "mastercard", "amex"],
    default: "visa"
  },
  cardNumber: {
    type: String,
    required: [true, "Card Number is required"],
    minlength: [16, "Card Number minimum 16 Number"],
    maxlength: [19, "Card Number maximam 16 Number"],
    unique: [true, "Card Number is Allready Exists"]
  },
  expirationMonth: {
    type: String,
    required: [true, "Expiration Month is required"],
  },
  expirationYear: {
    type: String,
    required: [true, "Expiration Year is required"],
  },
  cvn: {
    type: String,
    required: [true, "cvn is required"],
    maxlength: [4, "cvn/cvc maximam 5 Number"],
    minlength: [3, "cvn/cvc minimum 2 Number"],
  },

}, { timestamps: true });



export const methodModel = mongoose.model("Method", methodSchema);