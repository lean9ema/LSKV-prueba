const express = require('express');
const app = express();
const path = require('path');
const port = 3000;
const methodOverride = require('method-override');

app.set('view engine','ejs'); // Para "activar" ejs 
app.set('views',path.resolve(__dirname, './src/views')); // No hace falta, cuando se tiene a views en la parte principal 

app.use(express.static('public'));  // Para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method')); // Para poder pisar el method="POST" en el formulario por PUT y DELETE

const usersRoutes = require('./src/routers/userRoutes');
const productRoutes = require('./src/routers/productRoutes');
const homeRoutes = require('./src/routers/homeRoutes');

app.use('/', homeRoutes);
app.use('/products', productRoutes);
app.use('/users', usersRoutes);

app.get('/empresa', (req,res)=>{
    res.render('empresa');
}); 

app.use( (req,res,next)=>{
    res.status(404).render('not-found');
});

app.listen ( process.env.PORT || port, () =>{
    console.log(`Servidor funcionando en el puerto ${port}` )
})
