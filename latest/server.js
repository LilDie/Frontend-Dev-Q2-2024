import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 8438;

// Necesitas estas líneas para resolver __dirname en un módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para servir archivos CSS desde la carpeta src
app.get('/src/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'src', filename));
});

// Ruta para servir archivos JavaScript desde la carpeta src/components
app.get('/src/components/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'src', 'components', filename));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});