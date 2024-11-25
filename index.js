const express = require('express');
   const app = express();
   const PORT = process.env.PORT || 3000;

   app.use(express.json());

   let tasks = [];
   let nextId = 1;

   // Создание задачи
   app.post('/tasks', (req, res) => {
       const { title, description } = req.body;
       const newTask = { id: nextId++, title, description, completed: false };
       tasks.push(newTask);
       res.status(201).json(newTask);
   });

   // Получение всех задач
   app.get('/tasks', (req, res) => {
       res.json(tasks);
   });

   // Получение задачи по ID
   app.get('/tasks/:id', (req, res) => {
       const task = tasks.find(t => t.id === parseInt(req.params.id));
       if (!task) return res.status(404).send('Task not found');
       res.json(task);
   });

   // Обновление задачи по ID
   app.put('/tasks/:id', (req, res) => {
       const task = tasks.find(t => t.id === parseInt(req.params.id));
       if (!task) return res.status(404).send('Task not found');

       const { title, description, completed } = req.body;
       task.title = title !== undefined ? title : task.title;
       task.description = description !== undefined ? description : task.description;
       task.completed = completed !== undefined ? completed : task.completed;

       res.json(task);
   });

   // Удаление задачи по ID
   app.delete('/tasks/:id', (req, res) => {
       const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
       if (taskIndex === -1) return res.status(404).send('Task not found');

       tasks.splice(taskIndex, 1);
       res.status(204).send();
   });

   app.listen(PORT, () => {
       console.log(`Server is running on http://localhost:${PORT}`);
   });