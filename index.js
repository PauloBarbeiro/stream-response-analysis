"use strict"
import express from 'express'
import fs from 'node:fs'
import { fileURLToPath } from 'node:url'
import Path, { dirname } from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const datasetPath = Path.resolve(__dirname, './DataSource')

const app = express()

app.get('/', function (req, res) {
    res.send('Hello World')
})

/**
 * Returns the dataset object WITH NO stream
 */
app.get('/dataset', function (req, res) {
    const data = fs.readFileSync(`${datasetPath}/dataset.json`)
    res.send(data)
})

/**
 * Returns the dataset object WITH stream
 */
app.get('/dataset/stream/default', function (req, res) {
    const readStream = fs.createReadStream(`${datasetPath}/dataset.json`)

    res.once('close', () => {
        res.end()
    })

    readStream.pipe(res, {end: true})
})

app.listen(3000)