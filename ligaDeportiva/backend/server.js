const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your_jwt_secret'; // Cambia esto en producción

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB
mongoose.connect('mongodb+srv://usuario_rp:1234@daw2.7lid144.mongodb.net/ligaDeportiva', {
}).then(() => console.log('Conectado a MongoDB'))
  .catch(err => {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1); // Salir si no puede conectar
  });

// Modelo de Usuario
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'usuario' }
});

const User = mongoose.model('User', userSchema);

// Ruta de login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username);
  try {
    const user = await User.findOne({ username });
    console.log('User found:', user);
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    if (!isMatch) {
      console.log('Password incorrect');
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    console.log('Login successful, role:', user.role);
    res.json({ role: user.role, token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Ruta de registro
app.post('/api/register', async (req, res) => {
  const { username, password, role = 'usuario' } = req.body;
  console.log('Register attempt:', username);
  try {
    const existingUser = await User.findOne({ username });
    console.log('Existing user:', existingUser);
    if (existingUser) {
      console.log('User already exists');
      return res.status(400).json({ message: 'Usuario ya existe' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Password hashed');
    const newUser = new User({ username, password: hashedPassword, role });
    await newUser.save();
    console.log('User saved');
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ message: 'Error del servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Endpoint para probar conexión
app.get('/api/test', (req, res) => {
  res.json({ message: 'Servidor funcionando', mongoConnected: mongoose.connection.readyState === 1 });
});