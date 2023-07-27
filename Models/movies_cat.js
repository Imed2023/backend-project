import mongoose from "mongoose";

const moviecatSchema = new mongoose.Schema({

id : String,
category_name : String,
category_icon : String,
cat_order : String,
parent_id : String,


})

const movies_cats = mongoose.model('movies_cats',moviecatSchema)
export default movies_cats
