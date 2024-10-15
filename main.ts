const productos = [

  { id: 1, nombre: 'Producto A', precio: 30 },
  
  { id: 2, nombre: 'Producto B', precio: 20 },
  
   { id: 3, nombre: 'Producto C', precio: 50 },
  
   { id: 4, nombre: 'Producto D', precio: 10 }
  
  ];

const handler = async (req: Request): Promise < Response > => {
const url = new URL(req.url);
const path = url.pathname;


if (path.startsWith('/producto/')) {
  const id = (path.split("/",3));
  const aux = id[2];

  const producto=productos.filter(producto => producto.id === parseInt(aux));

  return new Response(JSON.stringify(producto));  

} else if (path === '/productos') {
    const minPrecio = url.searchParams.get('minPrecio');
    const maxPrecio = url.searchParams.get('maxPrecio');

    let filteredProductos = productos;

    if (minPrecio !== null) {
      filteredProductos = filteredProductos.filter(producto => producto.precio >= parseFloat(minPrecio));
      
    }

     else if (maxPrecio !== null) {
      filteredProductos = filteredProductos.filter(producto => producto.precio <= parseFloat(maxPrecio));
    }


    return new Response(JSON.stringify(filteredProductos));

  }
  else if (path === "/calcular-promedio") {
    const minPrecio = url.searchParams.get("minPrecio");
    const maxPrecio = url.searchParams.get("maxPrecio");

    let filteredProductos = productos;

    if (minPrecio !== null) {
      filteredProductos = filteredProductos.filter(producto => producto.precio >= parseFloat(minPrecio));
    }

    if (maxPrecio !== null) {
      filteredProductos = filteredProductos.filter(producto => producto.precio <= parseFloat(maxPrecio));
    }

    const totalProductos = filteredProductos.length;
    if (totalProductos === 0) return new Response(JSON.stringify({ promedio: 0 }));

    const sumaPrecios = filteredProductos.reduce((acc, prod) => acc + prod.precio, 0);
    const promedio = sumaPrecios / totalProductos;

    return new Response(JSON.stringify({ promedio }), { status: 200});
  }

  return new Response('Not Found', { status: 404 });
};


Deno.serve({port: 3000}, handler);