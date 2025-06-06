import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (localStorage.getItem('Auth')) {
      navigate('/tasks');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(localStorage.getItem('Auth'));
    if (localStorage.getItem('Auth')) {
      navigate('/tasks');
    }

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setError('');
    //trata de hacer el login si hay un erro lo captura
    try {
      console.log("Inicio de sesion...");
      const response = await api.post('/login', {
        email,
        password
      }).then(response => {
        const status = response.data.status;
        const msg = response.data.msg;

        if (status === "error") {
          setError(msg);
        } else if (status === "success") {
          const usuario = response.data;
          console.log(usuario);
          localStorage.setItem('user_id', usuario.user.id);
          localStorage.setItem('user_name', usuario.user.user_name);
          localStorage.setItem('access_token', usuario.access_token);
          localStorage.setItem('Auth', true);
          //Despues de recoger los datos necesario enviar al usuaio al pag task
          navigate('/tasks');
        }
      }).catch(error => {
        console.error('Error al reegistrar:', error);
      });


    } catch (error) {
      console.error("error");
      setError('Credenciales incorrectas');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesion</h2>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Correo electrónico</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@example.com"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Contraseña</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            required
          />
        </div>

        <div className="flex justify-between items-center space-x-2">
          <button
            type="submit"
            className="w-1/2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Iniciar sesion
          </button>

          <button
            type="button"
            onClick={handleRegisterClick}
            className="w-1/2 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 transition"
            to="/register"
          >
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}