import { useState } from 'react';
import Header from '../components/header.jsx';

export default function TaskManager() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) return;

    const newTask = {
      id: Date.now(),
      title,
      description,
      dueDate,
    };

    setTasks([...tasks, newTask]);

    // Limpiar formulario
    setTitle('');
    setDescription('');
    setDueDate('');
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <>
    <Header user={{ name: 'Juan' }} onLogout={() => setUser(null)} />
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Crear Tarea</h2>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <div>
          <label className="block text-gray-700">Título</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Comprar comida"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            className="w-full px-3 py-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Detalles de la tarea"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700">Fecha límite</label>
          <input
            type="date"
            className="w-full px-3 py-2 border rounded"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Agregar Tarea
        </button>
      </form>

      {/* Listado de tareas */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Tareas</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No hay tareas aún.</p>
        ) : (
          <ul className="space-y-4">
            {tasks.map((task) => (
              <li key={task.id} className="bg-gray-100 p-4 rounded shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold">{task.title}</h4>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-600 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Fecha límite: {task.dueDate}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
    </>
  );
}