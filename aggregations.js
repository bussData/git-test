/*conexion a la base de datos 
y a las colecciones*/
//este file se invoca accediendo en cmd a la carpeta de este file 
//y luego ejecuto mongosh --quiet aggregations.js
var database=db.getSiblingDB("capitulo0") //use
var coleccionClientes=database.clientes
var coleccionVentas=database.ventas

/*
var operacion=[
    //Stage1
    {$match:{cliente_id:{$eq:1}}},
    //Stage2
    {$addFields:{
        totalVenta:{$sum:'$productos.precio'}
    }}
  ]
  
var resultado=coleccionVentas.aggregate(operacion)
print("------total venta del cliente_id 1---------")
print(resultado)*/

/*
$addFields
En las ventas de cliente con id 1 agregar un nuevo
atributo llamado totalVenta, que contenga la suma 
de el precio de los productos.
*/
/*
var operacion=[
    //Stage1
    {$match:{cliente_id:{$eq:1}}},
    //Stage2
    {$addFields:{
        totalVenta:{$sum:'$productos.precio'}
    }}
  ]
  
var resultado=coleccionVentas.aggregate(operacion)
print("------total venta del cliente_id 1---------")
print(resultado)*/

/*
$replaceRoot
De cada venta remplazar cada documento
con los siguientes valores
fechaVenta:
totalVenta:
cliente:
*/
/* 
var operacion=[
    //Stage1
    {$addFields:{total:{$sum:'$productos.precio'}}},
    //Stage2
    {
        $replaceRoot:{
            newRoot:{
                fechaVenta:'$fecha',
                totalVenta:'$total',
                cliente:'$cliente_id'
            }
        }
    }
  ]
 
var resultado=coleccionVentas.aggregate(operacion)
print("-----nuevos documentos-----")
print(resultado)
*/
/*
$sample
De la colección clientes selecciona 2 
al azar
*/
 /*
var operacion=[
    {$sample:{size:2}}
  ]
 
var resultado=coleccionClientes.aggregate(operacion)
print("------2 clientes al azar------")
print(resultado)
 */
 
/*
$unwind:
Obtener los productos de la venta 
del cliente con id 3
*/
 /*
var operacion=[
    //Stage1
    {$match:{cliente_id:3}},
    //Stage2
    {
        $unwind:{path:'$productos'}
    },
    //Stage3
    {
        $replaceRoot:{
            newRoot:{
                nombreProducto:'$productos.nombre',
                precioProducto:'$productos.precio',
                cliente:'$cliente_id'
            }
            
        }
    }
]
 
var resultado=coleccionVentas.aggregate(operacion)
print(resultado)*/

//sin pipeline bota todo el documento.
//el pipeline tendra la relacion de objetos que quiero(proyecccion)
/*
$lookup
mostrar en una consulta el nombre
del cliente con id 3 y su total de Venta
*/
 
var operacion=[
    //Stage1
    {$match:{cliente_id:3}},
    //Stage2
    {
        $lookup:{
            from:'clientes',
            localField:'cliente_id',
            foreignField:'_id',
            pipeline:[{$project:{_id:0, nombre:1}}],
            as:'datos'
        }
    },
    //Stage3
    {
        $replaceRoot:{
            newRoot:{
                totalVenta:{$sum:'$productos.precio'},
                nombre:{$arrayElemAt:['$datos',0]}
            }
        }
    },
    //Stage4
    {
        $project:{
            nombre:'$nombre.nombre',
            totalVenta:'$totalVenta'
        }
    }
   ]
   
var resultado=coleccionVentas.aggregate(operacion)
print(resultado)
