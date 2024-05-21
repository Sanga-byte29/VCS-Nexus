import express from "express";
import userRoute from "./route/user.route.js";
import exploreRoute from "./route/explore.route.js";
import authRoute from "./route/auth.route.js";
import "./passport/github.auth.js";
import passport from "passport";
import session from "express-session";
import dotenv from "dotenv";
import cors from "cors";
import connectMongoDb from "./db/connectMongoDb.js";
import path from "path";

dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


console.log("dirname", __dirname);


app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute)
app.use("/api/explore", exploreRoute)

app.use(express.static(path?.join(__dirname, "/frontend/dist")));
app.get("*", (req,res) => {
    res.sendFile(path?.join(__dirname,"frontend","dist", "index.html"))
})

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
    connectMongoDb()
})
