const connection = require('../config/conexion')
const title = 'Tipo'


const index = (req, res) => {
    connection.query('SELECT tipo_pase.*, pase.tipo_pase FROM tipo_pase INNER JOIN pase ON pase.id_pase = tipo_pase.id_pase', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./tipos/index', {title: title, tipos:datos})        
        }
    })
}

const crear = (req, res) => {
    connection.query('SELECT * FROM pase', (error, datos) => {
        if(error){
            throw error
        }else{
            res.render('./tipos/crear', {title: title, tipos:datos})

        }
    })
}

const editar = (req, res) => {
    const id = req.params.id
    connection.query('SELECT tipo_pase.*, pase.tipo_pase FROM tipo_pase INNER JOIN pase ON pase.id_pase = tipo_pase.id_pase WHERE id_tipo= ? ',[id] , (error, results) => {
        if(error){
            throw error
        }else{
            connection.query('SELECT * FROM pase', (err, result) => {
                if(err){
                    throw err
                }else{
                    res.render('./tipos/editar', {tipos:results[0], pase:result, title: title})        

                }
            })
        }
    })
}

const eliminar = (req, res) => {
    const id = req.params.id
    // console.log(id)
    
    connection.query('DELETE FROM tipo_pase WHERE id_tipo = ?', [id], (error, datos) => {
        if(error){
            throw error
        }else{
            res.redirect('/tipos')
        }
    })
}

const guardar = (req,res) => {
    const id_pase = req.body.tipo_pase
    const cupo = req.body.cupo
    const pase=req.body.pase
    const costo=req.body.costo
    // console.log(id_user, tipo_bono, desc, valor, fecha)
    connection.query('INSERT INTO tipo_pase SET ?', {id_pase,cupo,pase,costo}, (error, datos) => {
        if(error){
            console.log(error)            
        }else{
            res.redirect('/tipos')
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
    const cupo = req.body.cupo
    const pase=req.body.pase
    const costo=req.body.costo
    connection.query('UPDATE tipo_pase SET ? WHERE id_tipo=?', [{cupo:cupo,pase:pase,costo:costo}, id], (error, datos) =>{
        if(error){
            console.error(error)
        }else{
            res.redirect('/tipos')
   
        }
    })
}

const comparacion = (req, res) => {
    res.render('./horarios/comparacion')
}

const resultados = (req, res) => {
    //res.send('comparacion')
    const edad1 = req.body.edad1
    const edad2 = req.body.edad2
    console.log(edad1, edad2)
    
    connection.query("SELECT horario.*, ficha.nombre,ficha.edad,horario.medicamento FROM horario INNER JOIN ficha ON ficha.id_ficha = horario.id_ficha WHERE edad BETWEEN '"+edad1+ "' AND '"+edad2+"'", (error, datos) => {
        if(error){
            throw error
        }else{
            let total = 0
            for(i=0; i<datos.length; i++){
                total = total + parseFloat(datos[i].valor)
            }

            res.render('./horarios/resultados', {datos, total})
        }
    })
}

const comparacionfecha = (req, res) => {
    res.render('./horarios/comparacionfecha')
}

const resultados2 = (req, res) => {
    //res.send('comparacion')
    const fecha1 = req.body.fecha1
    const fecha2 = req.body.fecha2
    console.log(fecha1, fecha2)
    
    connection.query("SELECT horario.*, date(ficha.fecha_nacimiento) as fecha_format, ficha.nombre, ficha.fecha_nacimiento, ficha.edad, horario.medicamento, horario.motivo FROM horario INNER JOIN ficha ON ficha.id_ficha = horario.id_ficha WHERE fecha_nacimiento BETWEEN '"+fecha1+ "' AND '"+fecha2+"'", (error, datos) => {
        if(error){
            throw error
        }else{
            let total = 0
            for(i=0; i<datos.length; i++){
                total = total + parseFloat(datos[i].valor)
            }

            res.render('./horarios/resultados2', {datos, total})
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
    comparacion,
    resultados,
    comparacionfecha,
    resultados2
}