import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let counter = 0;

app.get("/api/test", (req, res) => {
    counter++;
    res.json({ message: "🚀 Server is running! Responded " + counter + " times" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
