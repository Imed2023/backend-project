
import mongoose from "mongoose";

const moviedetSchema = new mongoose.Schema({



id : String,
stream_display_name : String,
category_id : Number,
stream_icon : String,
stream_url : String,
movie_image : String,
genre : String,
plot : String,
cast : String,
duration : String,
bitrate : String,
rate : String,
rating : String,

})

const movie_details = mongoose.model('movie_details',moviedetSchema)
export default movie_details


