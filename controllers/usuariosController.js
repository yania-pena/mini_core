const connection = require('../config/conexion')
const title = 'Usuarios'


const index = (req, res) => {
    connection.query('SELECT * FROM usuario', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./usuarios/index', {title: title, usuarios:datos})        
        }
    })
}

const crear = (req, res) => {
    connection.query('SELECT * FROM usuario', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./usuarios/crear', {title: title, usuarios:datos})

        }
    })
}

const editar = (req, res) => {
    const id = req.params.id
    connection.query('SELECT * FROM usuario WHERE id_usuario=? ',[id] , (error, datos) => {
        if(error){
            throw error
        }else{
                    res.render('./usuarios/editar', {usuarios:datos[0], title: title})        

                }
            })
        }

const eliminar = (req, res) => {
    const id = req.params.id
    // console.log(id)
    
    connection.query('DELETE FROM usuario WHERE id_usuario=?', [id], (error, datos) => {
        if(error){
            throw error
        }else{
            res.redirect('/usuarios')
        }
    })
}

const guardar = (req,res) => {
    const id_usuario = req.body.id_usuario
    const nombre= req.body.nombre 
    const correo= req.body.correo
    // console.log(id_user, tipo_bono, desc, valor, fecha)
    connection.query('INSERT INTO usuario SET ?', {id_usuario,nombre,correo}, (error, datos) => {
        if(error){
            console.log(error)            
        }else{
            res.redirect('/usuarios')
        }
    })
}   

const actualizar = (req, res) => {
    const id = req.body.id
    const nombre= req.body.nombre 
    const correo= req.body.correo
    connection.query('UPDATE usuario SET ? WHERE id_usuario=?', [{nombre:nombre,correo:correo}, id], (error, datos) =>{
        if(error){
            console.error(error)
        }else{
            res.redirect('/usuarios')
   
        }
    })
}

        
    

module.exports = {
    index,
    crear,
    editar,
    eliminar,
    guardar,
    actualizar
}