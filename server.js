const express = require("express")
const cors = require("cors")
const fs = require("fs")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())

const dataFile = path.join(__dirname, "data.json")

const readData = () => {
        const raw = fs.readFileSync(dataFile)
        return JSON.parse(raw)
}

const writeData = data => {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 2))
}

app.post("/add-password", (req, res) => {
        const { location, hint, password } = req.body

        if (!location || !hint || !password) {
                return res.status(400).json({ error: "All fields required" })
        }

        const data = readData()
        const entry = { location, hint, password }
        data.push(entry)
        writeData(data)

        res.json(entry)
})

app.get("/get-hint-locations", (req, res) => {
        const data = readData()
        const result = data.map(item => ({
                location: item.location,
                hint: item.hint
        }))
        res.json(result)
})

app.listen(3000, () => {
        console.log("Vault running on port 3000")
})