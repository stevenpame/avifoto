require("dotenv").config()
const express = require("express")
const app = express()
const authRoutes = require("./routes/authRoutes")
const PreguntasRoutes = require("./routes/PreguntasRouter")
const RespuestaRoutes = require("./routes/RespuestaRouter")
const ProgramasRoutes = require("./routes/ProgramasRouter")
const PerfilRoutes = require("./routes/PerfilRoutes")
const AspiranteRoutes = require("./routes/AspiranteRoutes")
const AdminRoutes = require("./routes/AdminRoutes")
const EstadisticasRoutes = require("./routes/EstadisticasRouter")
const CentrosRoutes = require("./routes/CentroRoutes")

const cors = require("cors")
const bcrypt = require("bcryptjs")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
    allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json())
app.use('/api',authRoutes,PreguntasRoutes,RespuestaRoutes,ProgramasRoutes,PerfilRoutes,AspiranteRoutes,AdminRoutes, EstadisticasRoutes, CentrosRoutes)

app.use((err, req, res, next) => {
  console.error("Error no controlado:", err)
  if (err?.message?.includes("Solo se permiten")) {
    return res.status(400).json({ mensaje: "Solo se permiten imagenes" })
  }
  return res.status(500).json({ mensaje: "Error interno del servidor" })
})



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${PORT}`);
});
