const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  title: 
  { 
    type: String,
    required: true 
},
  description:
   { 
    type: String
 },
  dueDate:
   { 
    type: Date,
    required: true
 },
  status:
   {
     type: String,
     enum: ["pending", "completed"],
     default: "pending"
     },
  priority:
   {
     type: String,
     enum: ["low", "medium", "high"],
     default: "medium"
     },
  assignedTo:
   { 
    type: mongoose.Schema.Types.ObjectId, ref: "User"
 },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
