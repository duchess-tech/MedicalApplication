import express from 'express';
import authRoutes from './routes/auth.routes.js';
import oauthRoutes from './routes/oauth.routes.js'
import patientRoutes from './routes/patient/patient.Routes.js'
import cors from 'cors';
import connectDB from './database/db.js'
const app = express();

app.use(cors({
  origin: 'http://localhost:8080', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

connectDB()
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api', oauthRoutes);
app.use('/api/patient', patientRoutes);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});