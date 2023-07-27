import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: {

    type: String,
    required: [true, "Please provide a First Name!"],
  },
  last_name: {

    type: String,
    required: [true, "Please provide a Last Name!"],
  },
    email: {

        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
    
    })
    
    const Users = mongoose.model('Users',UserSchema)
    export default Users
    
