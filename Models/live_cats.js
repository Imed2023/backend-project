import mongoose from "mongoose";

const livecatSchema = new mongoose.Schema({

    id : String,
    category_name : String,
    category_type : Number,
    category_icon : String,
    view_order : String,
    parent : Number  ,

})

const live_cats = mongoose.model('live_cats',livecatSchema)
export default live_cats
