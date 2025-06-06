import { useState, useEffect } from 'react';
import api from '../api/axios';
import Header from '../components/header.jsx';
import { useNavigate } from 'react-router-dom';

export default function TaskManager() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUserName] = useState('');
  const [Token, setToken] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    //traer todas las tareas del usuario loggado
    const user_id = localStorage.getItem('user_id');
    const access_token = localStorage.getItem('access_token');
    if (!localStorage.getItem('Auth')) {
      navigate('/');
    } else {
      console.log(userId);
      api.get(`/gettask/${user_id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
        .then(response => {
          setTasks(response.data.tareas);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error al cargar tareas:', error);
          setLoading(false);
        });
      setUserId(user_id);
      setUserName(localStorage.getItem('user_name'));
      setToken(localStorage.getItem('access_token'));
    }
  }, []);


  const handleSubmit = (e) => {
    const user_id = userId;
    e.preventDefault();

    if (!title || !description || !dueDate) return;

    const newTask = {
      titulo: title,
      descripcion: description,
      fecha_limite: dueDate,
      user_id: userId
    };


    try {
      console.log("Registrando...");
      const response = api.post('/newtask', newTask, {
        headers: {
          Authorization: `Bearer ${Token}`
        }
      });
      //ordena las tareas por fecha sin tenr que ehacer otra peticion
      const orderedTasks = [...tasks, newTask].sort(
        (a, b) => new Date(a.fecha_limite) - new Date(b.fecha_limite)
      );

      setTasks(orderedTasks);

      // Limpiar formulario
      setTitle('');
      setDescription('');
      setDueDate('');

    } catch (error) {
      console.error("error");
      setError('Credenciales incorrectas');
    }

  };

  const handleDelete = (id) => {
    try {
      api.delete(`/deletetask/${id}`, {
        headers: {
          Authorization: `Bearer ${Token}`
        }
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('Error al cargar tareas:', error);
          setLoading(false);
        });
      //elimar de la lista para que se actuali las tareas
      setTasks(tasks.filter((task) => task.id !== id));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>

      <Header user={{ name: username }} />
      <div className="p-8 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">Crear Tarea</h2>

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
              placeholder="Descripcion de la tarea"
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

        <div>
          <h3 className="text-xl font-semibold mb-4">Tareas</h3>
          {tasks.length === 0 ? (
            <p className="text-gray-500">No hay tareas.</p>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task.id} className="bg-gray-100 p-4 rounded shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-lg font-bold">{task.titulo}</h4>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </div>
                  <p className="text-gray-700">{task.descripcion}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Fecha límite: {task.fecha_limite}
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