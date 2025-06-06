import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Header from '../components/header.jsx';

export default function Register() {
  const navigate = useNavigate();
  const [user_name, setuser_name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setpassword_confirmation] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (localStorage.getItem('Auth')) {
      navigate('/tasks');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones simples
    if (!user_name || !email || !password || !password_confirmation) {
      setError('Todos los campos son obligatorios.');
      setSuccess('');
      return;
    }

    if (password !== password_confirmation) {
      setError('Las contraseñas no coinciden.');
      setSuccess('');
      return;
    }

    setError('');
    try {
      console.log("Registrando...");
      const response = api.post('/signup', {
        user_name,
        email,
        password,
        password_confirmation
      }).then(response => {
        const status = response.data.status;
        const msg = response.data.msg;

        if (status === "error") {
          setError(msg);
        } else if (status === "success") {
          setSuccess('¡Registro exitoso!');
          console.log('Registrando:', { user_name, email, password });
          //Limpiar formulario
          setuser_name('');
          setEmail('');
          setPassword('');
          setpassword_confirmation('');
        }
      }).catch(error => {
        console.error('Error al reegistrar:', error);
      });


    } catch (error) {
      console.error("error");
      setError('Credenciales incorrectas');
    }

  };

  return (
    <>
      <Header user={{}} />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded shadow-md w-full max-w-sm"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
          {success && <div className="text-green-600 text-sm mb-4">{success}</div>}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Usuario</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={user_name}
              onChange={(e) => setuser_name(e.target.value)}
              placeholder="Tu nombre de usuario"
              required
            />
          </div>

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

          <div className="mb-4">
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

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirmar contraseña</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
              value={password_confirmation}
              onChange={(e) => setpassword_confirmation(e.target.value)}
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Registrarse
          </button>
        </form>
      </div>
    </>
  );
}