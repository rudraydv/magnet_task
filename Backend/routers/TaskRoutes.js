const express = require("express");
// const { protect } = require("../middlewares/authMiddlewares");
const {
  createTask,
  getTasks,
  getUserTasks,
  getTaskById,
  updateTask,
  updateTaskStatus,
  moveTaskPriority,
  deleteTask,
} = require("../controllers/taskControllers");

const router = express.Router();

router.route("/tasks").post(createTask); 
router.route("/tasks").get(getTasks); 
router.route("/tasks/user").get(getUserTasks); 
router.route("/tasks/:id").get(getTaskById); 
router.route("/tasks/:id").put(updateTask); 
router.route("/tasks/:id/status").put(updateTaskStatus); 
router.route("/tasks/:id/priority").put(moveTaskPriority); 
router.route("/tasks/:id").delete(deleteTask); 

module.exports = router;
