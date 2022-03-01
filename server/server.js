const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000

const postingRouter = require("./route/posting.router");
app.use(express.json())
app.use("/posting", postingRouter)



app.listen(PORT, () => {
    console.log(`서버 구동 ${PORT}`)
})