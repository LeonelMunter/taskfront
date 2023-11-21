import { useState, ChangeEvent, FormEvent } from "react";

import { useTasks } from "../context/useTasks.tsx";

function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        done: false
    })
const {createTask} = useTasks()


const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
setTask({ ...task, [e.target.name]: e.target.value})

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
e.preventDefault();
createTask(task)


// console.log(data)
}
  return (
    <div>

    <form onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="title"
        placeholder="write a title"
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
        onChange={handleChange}/>
        <textarea 
        name="description" 
        rows={3}
        placeholder="write a description"
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
        onChange={handleChange}></textarea>
        <label className="inline-flex items-center gap-x-2">
            <input type="checkbox"
            className="h-5 w-5 text-indigo-600 "
            onChange={() => setTask({...task, done: !task.done})}/>
            <span>done</span>
        </label>

        <button
        className="bg-indigo-500 px-3 block py-2 w-full">
            save
        </button>
    </form>

    </div>
  )
}

export default TaskForm