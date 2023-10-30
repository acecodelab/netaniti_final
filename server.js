import express from 'express';
import bcrypt from 'bcrypt';
import multer from "multer";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";


const app = express();
const port = 3000;

app.use(express.json());

app.use(cors());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: "50mb" },));

// parse requests of content-type - application/form-data

//const storage = multer.memoryStorage(); // Holds a buffer of the file in memory
const upload = multer({ dest: "uploads/" });

app.use(upload.any())

app.use(express.static("public"));
app.use(express.text())

import routerCommon from "./app/routes/common/index.js"


app.use("/v1/", routerCommon.signup)
app.use("/v1/", routerCommon.login)


const httpServer = createServer(app);
const io = new Server(httpServer, {
    transports: ["websocket", "polling"],
    cors: {
        origin: "*",
        credentials: true,
        methods: ["GET", "POST"],
    },
    allowEIO3: true
});

const PORT = process.env.PORT || 8082;
const server = httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});