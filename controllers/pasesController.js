const connection = require('../config/conexion')
const title = 'Pase'


const index = (req, res) => {
    connection.query('SELECT pase.*, usuario.nombre FROM pase INNER JOIN usuario ON usuario.id_usuario = pase.id_usuario', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./pases/index', {title: title, pases:datos})        
        }
    })
}

const crear = (req, res) => {
    connection.query('SELECT * FROM usuario', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./pases/crear', {title: title, pases:datos})

        }
    })
}

const editar = (req, res) => {
    const id = req.params.id
    connection.query('SELECT pase.*, usuario.nombre FROM pase INNER JOIN usuario ON usuario.id_usuario = pase.id_usuario WHERE id_pase= ? ',[id] , (error, results) => {
        if(error){
            throw error
        }else{
            connection.query('SELECT * FROM usuario', (err, result) => {
                if(err){
                    throw err
                }else{
                    res.render('./pases/editar', {pases:results[0], usuario:result, title: title})        

                }
            })
        }
    })
}

const eliminar = (req, res) => {
    const id = req.params.id
    // console.log(id)
    
    connection.query('DELETE FROM pase WHERE id_usuario = ?', [id], (error, datos) => {
        if(error){
            throw error
        }else{
            res.redirect('/pases')
        }
    })
}

const guardar = (req,res) => {
    const id_usuario = req.body.nombre
    const fecha_compra= req.body.fecha_compra
    const tipo_pase = req.body.tipo_pase
    const expiracion = req.body.expiracion
    // console.log(id_user, tipo_bono, desc, valor, fecha)
    connection.query('INSERT INTO pase SET ?', {id_usuario,fecha_compra,expiracion,tipo_pase}, (error, datos) => {
        if(error){
            console.log(error)            
        }else{
            res.redirect('/pases')
        }
    })
    // connection.query('INSERT INTO user SET ?',{user:user, password:password}, (error, results) => {
    //     if(error){
    //         console.error(error)
    //     }else{
    //         res.redirect('/users')
    //     }
    // })
}   

const actualizar = (req, res) => {
    const id = req.body.id
    const fecha_compra= req.body.fecha_compra
    const expiracion = req.body.expiracion
    const tipo_pase = req.body.tipo_pase
    connection.query('UPDATE pase SET ? WHERE id_pase=?', [{fecha_compra:fecha_compra,expiracion:expiracion,tipo_pase:tipo_pase}, id], (error, datos) =>{
        if(error){
            console.error(error)
        }else{
            res.redirect('/pases')
   
        }
    })
}

const comparacionfecha = (req, res) => {
    res.render('./pases/comparacionfecha')
}

const resultados2 = (req, res) => {
    //res.send('comparacion')
    const fecha1 = req.body.fecha1
    const fecha2 = req.body.fecha2
    console.log(fecha1, fecha2)
    
    connection.query("SELECT pase.*, date(pase.expiracion) as fecha_format, usuario.nombre, pase.tipo_pase, tipo_pase.pase, tipo_pase.cupo FROM pase INNER JOIN tipo_pase ON tipo_pase.id_pase=pase.id_pase INNER JOIN usuario ON usuario.id_usuario = pase.id_usuario WHERE expiracion BETWEEN '"+fecha1+ "' AND '"+fecha2+"'", (error, datos) => {
        if(error){
            throw error
        }else{
            let total = 0
            for(i=0; i<datos.length; i++){
                total = total + parseFloat(datos[i].valor)
            }

            res.render('./pases/resultados2', {datos, total})
        }
    })
}




module.exports = {
    index,
    crear,
    editar,
    eliminar,
    guardar,
    actualizar,
    comparacionfecha,
    resultados2
}