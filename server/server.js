const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001
const cors = require("cors");
const morgan = require("morgan");
const path = require("path")

app.use("/", express.static(path.join(__dirname, 'static')))
app.use(cors({origin: "http://localhost:3000", credentials: false}))
app.use(express.json())
app.use(morgan("dev"))


// * router 세팅
const postingRouter = require("./route/posting.router");
app.use("/posting", postingRouter)



app.listen(PORT, () => {
    console.log(`서버 구동 ${PORT}`)
})