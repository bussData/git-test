/*conexion a la base de datos 
y a las colecciones*/
var database=db.getSiblingDB("capitulo0") //use
var coleccionClientes=database.clientes
var coleccionVentas=database.ventas
/*
$match && $project
mostrar los nombres de los clientes que son de Chile
*/

/*
var operacion=[
	//stage1:
	{$match:{'direccion.pais':{$eq:"Chile"}}},
	//stage2:
	{$project:{nombre:1, _id:0}}
]
//colocarle _id:0 hace que no se pinte el id
// el valor 1 es para mostrar y 0 para ocultar

//implementacion de la operacion superior
var resultado=coleccionClientes.aggregate(operacion)

//imprimir en pantalla el resultado
print("-----Clientes de Chile---")
print(resultado)
*/

/*
$group:
Agrupar a los clientes por pais
y contar la cantidad de clientes que existen por pais
y listar los nombres de los clientes 
*/

/*
var operacion=[
	//stage1
	{
		$group:{
			_id:'$direccion.pais',
			conteo:{$count:{}},
			nombre:{$push:'$nombre'}
		}
	}/*,
	{//Stage2
		$project:{
			_id:0,
			 pais:'$_id',
            conteo:1,
            nombres:1
		}
	}*/
/*]
var resultado=coleccionClientes.aggregate(operacion) 
print("-----Clientes agrupados por pais---")
print(resultado)
*/

/*
$map
a todos los productos de las ventas del cliente con id:3
en la proyecccion, agregarles el 16% de IVA a cada producto
*/

var operacion=[
    //Stage1
    {$match:{cliente_id:3}},
    //Stage2
	//as: item es una variable temporal de recorrido de los elementos del arreglo
    {
        $project:{
            fecha:1, 
            cliente_id:1,
            productosIVA:{
                $map:{
                    input:'$productos',
                    as: 'item',
                    in: {
                        nombre:'$$item.nombre',
                        precioIVA:{
                            $multiply:['$$item.precio', 1.16]
                        }
                    }
                }
            }
        }
    }
]
var resultado=coleccionVentas.aggregate(operacion)
print("------venta cliente id 3 con el 16% de IVA-----")
print(resultado)
print(resultado)