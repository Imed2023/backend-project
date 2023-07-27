
import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({

id : String,
stream_display_name : String,
category_id : String,
stream_icon : String,
view_order : String,
stream_url : String,

})

const movies = mongoose.model('movies',movieSchema)
export default movies


