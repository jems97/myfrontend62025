import api from '../api/axios'; 
import { useNavigate } from 'react-router-dom';

export default function Header({ user }) {
  const navigate = useNavigate();
  const handleLogout = () => {
    try{
      const access_token = localStorage.getItem('access_token');
    
      api.get('/logout', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      .then(response => {
        console.log(response.data);
      }).catch(error => {
          console.error('Error:', error);
        });
        localStorage.clear();
        navigate('/');  
    }catch(error){
      console.error(error);
    }
  };

  return (
    <header className="w-full bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">

      <span className="text-sm font-semibold">
        {localStorage.getItem('Auth') && user?.name
        ? `Bienvenido, ${user.name}`
        : (
          <button
              onClick={() => navigate('/')}
              className="hover:underline text-sm"
            >
              Ir a Inicio
            </button>
        )
        }
      </span>

      {localStorage.getItem('Auth') && (
      <button
        onClick={() => handleLogout()}
        className="text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
      >
        Cerrar sesión
      </button>
    )}
    </header>
  );
}