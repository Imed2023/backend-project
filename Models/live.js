import mongoose from "mongoose";

const liveSchema = new mongoose.Schema({

    id : String,
    stream_display_name : String,
    category_id : Number,
    stream_icon : String,
    view_order : Number,
    stream_url : String,


})

const lives = mongoose.model('lives',liveSchema)
export default lives
