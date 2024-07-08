/* modelo de la card o tarea
CREATE TABLE tasks(
    id_task serial primary key,
    title_task varchar(50) not null,
    description_task TEXT not null,
    id_section integer not null,
    foreign key (id_section) references sections(id_section) on delete cascade on update cascade
);
*/

import { pool } from "../db.js";
import { z } from "zod";

const createTask = async (req, res) => {
    const { title_task, description_task} = req.body;
    const { id_section } = req.params;
    const id_user = req.user.id;
    
    //Validar datos de entrada
    const schema = z.object({ title_task: z.string().min(1).max(50), description_task: z.string().min(1) });
    const validate = schema.safeParse(req.body);
    if (!validate.success) {
        return res.status(400).send(validate.error.errors);
    }

    //Validar id_section
    const id_section_schema = z.string().regex(/^\d+$/);
    const id_section_validate = id_section_schema.safeParse(id_section);
    if (!id_section_validate.success) {
        return res.status(400).send("Invalid id_section");
    }

    try {
        //Verificar que el usuario sea el dueño de la sección
        const sectionResult = await pool.query("SELECT * FROM sections WHERE id_section = $1 and id_user = $2", [id_section, id_user]);
        if (sectionResult.rows.length === 0) {
            return res.status(401).send("Unauthorized");
        }

        //Insertar tarea en la base de datos
        const result = await pool.query( "INSERT INTO tasks (title_task,description_task,id_section) VALUES ($1,$2,$3)", [title_task, description_task, id_section]);

        res.status(201).send("Task created");
    } catch (error) {
        res.status(500).send("Error creating task");
    }
}

const getTasks = async (req, res) => {
    const {id_section} = req.params;
    const id_user = req.user.id;

    //Validar id_section
    const id_section_schema = z.string().regex(/^\d+$/);
    const id_section_validate = id_section_schema.safeParse(id_section);
    if (!id_section_validate.success) {
        return res.status(400).send("Invalid id_section");
    }
    try {
        //Verificar que el usuario sea el dueño de la sección
        const sectionResult = await pool.query("SELECT * FROM sections WHERE id_section = $1 and id_user = $2", [id_section, id_user]);
        if (sectionResult.rows.length === 0) {
            return res.status(401).send("Unauthorized");
        }

        const result = await pool.query("SELECT * FROM tasks WHERE id_section = $1", [id_section]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send("Error getting tasks");
    }
}


const updateTask = async (req, res) => {
    const { title_task, description_task } = req.body;
    const { id_task } = req.params;
    const id_user = req.user.id;

    //Validar datos de entrada
    const schema = z.object({ title_task: z.string().min(1).max(50), description_task: z.string().min(1) });
    const validate = schema.safeParse(req.body);
    if (!validate.success) {
        return res.status(400).send(validate.error.errors);
    }

    //Validar id_task
    const id_task_schema = z.string().regex(/^\d+$/);
    const id_task_validate = id_task_schema.safeParse(id_task);
    if (!id_task_validate.success) {
        return res.status(400).send("Invalid id_task");
    }

    try {

        //Verificar que el usuario sea el dueño de la tarea
        const taskResult = await pool.query("SELECT * FROM tasks WHERE id_section in (SELECT id_section FROM sections WHERE id_user = $1) and id_task = $2", [id_user, id_task]);

        if (taskResult.rows.length === 0) {
            return res.status(401).send("Unauthorized");
        }

        //Actualizar tarea en la base de datos
        const result = await pool.query("UPDATE tasks SET title_task = $1, description_task = $2 WHERE id_task = $3", [title_task, description_task, id_task]);

        res.send("Task updated");
    } catch (error) {
        res.status(500).send("Error updating task");
    }
}

const deleteTask = async (req, res) => {
    const { id_task } = req.params;
    const id_user = req.user.id;

    //Validar id_task
    const id_task_schema = z.string().regex(/^\d+$/);
    const id_task_validate = id_task_schema.safeParse(id_task);
    if (!id_task_validate.success) {
        return res.status(400).send("Invalid id_task");
    }

    try {

        //Verificar que el usuario sea el dueño de la tarea
        const taskResult = await pool.query("SELECT * FROM tasks WHERE id_section in (SELECT id_section FROM sections WHERE id_user = $1) and id_task = $2", [id_user, id_task]);

        if (taskResult.rows.length === 0) {
            return res.status(401).send("Unauthorized");
        }

        //Eliminar tarea en la base de datos
        const result = await pool.query("DELETE FROM tasks WHERE id_task = $1", [id_task]);

        res.send("Task deleted");
    } catch (error) {
        res.status(500).send("Error deleting task");
    }
}

const updateTaskSection = async (req, res) => {
    const { id_task } = req.params;
    const { id_section } = req.body;
    const id_user = req.user.id;

    //Validar id_task
    const id_task_schema = z.string().regex(/^\d+$/);
    const id_task_validate = id_task_schema.safeParse(id_task);
    if (!id_task_validate.success) {
        return res.status(400).send("Invalid id_task");
    }

    //Validar id_section
    const id_section_schema = z.string().regex(/^\d+$/);
    const id_section_validate = id_section_schema.safeParse(id_section);
    if (!id_section_validate.success) {
        return res.status(400).send("Invalid id_section");
    }


    try {

        //Verificar que el usuario sea el dueño de la tarea
        const taskResult = await pool.query("SELECT * FROM tasks WHERE id_section in (SELECT id_section FROM sections WHERE id_user = $1) and id_task = $2", [id_user, id_task]);

        if (taskResult.rows.length === 0) {
            return res.status(401).send("Unauthorized");
        }

        //Verificar que el usuario sea el dueño de la nueva sección
        const sectionResult = await pool.query("SELECT * FROM sections WHERE id_section = $1 and id_user = $2", [id_section, id_user]);

        if (sectionResult.rows.length === 0) {
            return res.status(401).send("Unauthorized");
        }

        //Actualizar tarea en la base de datos
        const result = await pool.query("UPDATE tasks SET id_section = $1 WHERE id_task = $2", [id_section, id_task]);

        res.send("Task updated");
    } catch (error) {
        res.status(500).send("Error updating task");
    }
}

const getAllTasksUser = async (req, res) => {
    const id_user = req.user.id;
    try {
        const result = await pool.query("SELECT * FROM tasks WHERE id_section in (SELECT id_section FROM sections WHERE id_user = $1)", [id_user]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).send("Error getting tasks");
    }
}


export { createTask, getTasks, updateTask, deleteTask,updateTaskSection, getAllTasksUser};