import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    user: { type: String, required: true },
    message: { type: String },
  },{
    versionKey: false
  });
  
  const chatModel = model("messages", chatSchema);
  
  export { chatModel }