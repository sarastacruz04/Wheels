// server.js
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// ES Modules: __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al users.json
const usersFilePath = path.join(__dirname, 'users.json'); // <-- aquí se usa backend/users.json

// Leer usuarios
const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) return [];
  const data = fs.readFileSync(usersFilePath, 'utf-8');
  try {
    return JSON.parse(data);
  } catch (err) {
    console.error('Error al parsear users.json', err);
    return [];
  }
};

// Guardar usuarios
const saveUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Registro
app.post('/api/users/register', (req, res) => {
  const { nombre, apellido, idUniversidad, email, telefono, password } = req.body;

  if (!nombre || !apellido || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  const users = readUsers();

  const existe = users.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );

  if (existe) {
    return res.status(400).json({ message: 'El correo ya está registrado' });
  }

  const newUser = { nombre, apellido, idUniversidad, email, telefono, password };
  users.push(newUser);
  saveUsers(users);

  return res.status(201).json({ message: 'Usuario registrado exitosamente' });
});

// Login
app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan campos' });
  }

  const users = readUsers();

  const user = users.find(
    (u) => u.email.trim().toLowerCase() === email.trim().toLowerCase()
  );

  if (!user || user.password.trim() !== password.trim()) {
    return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
  }

  return res.status(200).json({
    message: 'Login exitoso',
    user: {
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      idUniversidad: user.idUniversidad,
      telefono: user.telefono
    }
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
