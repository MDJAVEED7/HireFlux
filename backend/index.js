import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dir = path.dirname(__filename);

const app = express();

// Serve static files from "public" folder at "/static" path
app.use('/static', express.static(path.join(__dir, 'public')));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
// CORS setup
const allowedOrigins = [
  'http://localhost:5173',
  'https://hireflux.onrender.com'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));


// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
const __dirname= path.resolve();
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));
app.get('/{*any}', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
// Root route
app.get("/", (req, res) => {
    console.log("hello");
    res.send("API is running");
});

// Serve frontend build
const PORT = process.env.PORT || 3000;



// Connect to DB and start server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Failed to connect to DB", error);
        process.exit(1);
    });
