import mongoose from "mongoose";
const batterySchema=new mongoose.Schema({
    battery_id:{
        type:String,
        required:true,
        unique:true
    },
    current:{
        type:Number,
        required:true,
       min:0
    },
    voltage:{
        type:Number,
        required:true,
        min:0
    },
    temperature:{
        type:Number,
        required:true,
        min:0
    },
    time:{
        required:true,
        type:Date,

    }
},{
    timestamps:false
})

export const batteryModel = mongoose.model("Battery", batterySchema);