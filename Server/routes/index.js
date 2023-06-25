const express = require("express");
const router = express.Router();
const Todos = require("../model/Todo");

router.get("/", async (req, res) => {
  try {
    const todos = await Todos.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async(req, res) => {
  const { title, description, priority, color, completed } = req.body;
  const todo = new Todos({
    title,
    description,
    priority,
    color,
    completed,
  });
  try {
    const latestTodo=await todo.save();
    res.status(201).json(latestTodo);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
    try {
      const todos = await Todos.findById(req.params.id);
      res.status(200).json(todos);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  router.delete("/:id", async (req, res) => {
    try {
      const todos = await Todos.deleteOne({_id:req.params.id});
      res.status(200).json(todos);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });

router.put("/:id",async(req,res)=>{
    const {id}=req.params;
    const updateobject=req.body
    const updateTodo=await Todos.findByIdAndUpdate(id,updateobject,{new:true})
    return res.status(202).json(updateTodo);
})

module.exports=router
