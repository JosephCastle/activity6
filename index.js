const { response } = require('express');
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;


const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({defaultLayout: __dirname + '/views/layouts', extname:'hbs'}));

app.use(express.static('public'));

app.get('/', async (req, res) =>{ 
            const data = await getTodos();
            res.render('main', {layout:'index', data: data})});


app.listen(port, () => console.log(`App listening to port ${port}`));



async function getTodos() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      let index = Math.floor(Math.random() * 10);
      const data = response.data.slice(index, 10);
      return data;
    } catch (error) {
      console.error(error);
    }
  }


