const express = require('express');
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000


/*
|--------------------------------------------------------------------------
| Middleware
|--------------------------------------------------------------------------
*/

app.use(express.json())
app.use(cors())


/*
|--------------------------------------------------------------------------
| root route
|--------------------------------------------------------------------------
*/

app.get('/', (req, res)=>{
    res.send('hello nature')
})

/*
|--------------------------------------------------------------------------
| all route
|--------------------------------------------------------------------------
*/

const run = ()=>{
    try {
        app.get('/plants', (req, res)=>{
            res.send('all trees will be here')
        })
        
    } catch (error) {
        console.error('database connection failed', error)
    }

}
run()




app.listen(port, ()=>{
    console.log(`listening from port ${port}`);
})
