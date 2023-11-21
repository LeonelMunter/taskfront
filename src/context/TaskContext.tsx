import { createContext, useState, useEffect } from "react";
import { getTaskRequest, createTaskRequest, deleteTaskRequest, updatedTaskRequest } from "../api/tasks";
import { Task, CreateTask, UpdateTask, } from "../interface/task.interface";



interface TaskContextValue {
    tasks: Task[],
    createTask: (task: CreateTask) => Promise<void>  //aca le decimos que trae la creacion de la tarea pero que no va a ejecutar nada
    deleteTask: (id: string) => Promise<void> // aca lo mismo, que no va a ejecutar nada   
    updateTask: (id: string, task: UpdateTask) => Promise<void> 
}

export const TaskContext = createContext<TaskContextValue>({
    tasks: [],
    createTask: async() => {},
    deleteTask: async() => {},
    updateTask: async() => {},
})

interface Props {
    children: React.ReactNode
}

export const TaskProvider: React.FC<Props> = ({children}) => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        getTaskRequest()
        .then((response) => response.json())
        .then((data) => setTasks(data)
        )
    }, [])

const createTask = async (task: CreateTask) => {
const res = await createTaskRequest(task)
const data = await res.json()
setTasks([...tasks, data])
}

const deleteTask = async (id: string) => {
const res = await deleteTaskRequest(id)
if(res.status === 204) setTasks(tasks.filter((task) => task._id !== id))
// este filtro lo que hace es filtrar todas las tareas, muestra todas menos la que se "borró"
}

const updateTask = async (id: string, task: UpdateTask) => {
    const res = await updatedTaskRequest(id, task);
    const data = await res.json();
    setTasks(tasks.map(task => task._id === id ? {...task, ...data} : task))
}
return (
    <TaskContext.Provider 
    value={{
        tasks,
        createTask,
        deleteTask,
        updateTask}}>
        {children}
    </TaskContext.Provider>
)
}