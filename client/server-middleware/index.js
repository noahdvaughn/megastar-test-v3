const express = require('express')
const app = express()

const axios = require('axios')

app.use(express.json())
const API_KEY = process.env.STRAPI_KEY

// app.get('/tasks', async (req, res) => {

//     try {
//         // const response = await axios.get('http://localhost:1337/api/taskss')
//         // const response = await axios.get('http://localhost:1337/api/testing/1')
//         // res.status(200).send(JSON.stringify(response))
//         console.log(JSON.stringify(response))
        
//     } catch (error) {
//         res.status(500).json({ data: error.message })
//     }
// })
module.exports = {
    path: '/api',
    handler: app
  }