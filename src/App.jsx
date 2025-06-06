import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Register from './pages/register';
import Task from './pages/tasks';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tasks" element={<Task />} />
    </Routes>
  );
}
