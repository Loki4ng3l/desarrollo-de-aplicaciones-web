const { createApp } = Vue

createApp({
    data(){
        return{
            codigo : '',
            descripcion : '',
            precio : 0,
            articulos : [
                {
                    codigo : 1,
                    descripcion : 'Papas',
                    precio : 34
                },
                {
                    codigo : 2,
                    descripcion : 'Manzana',
                    precio : 38
                }
            ]
        }
    },
    methods : {
        agregarArticulo(){
            this.articulos.push({
                codigo : this.codigo,
                descripcion : this.descripcion,
                precio : this.precio
            });
            this.codigo = '';
            this.descripcion = '';
            this.precio = 0;
        }
    }
}).mount('#miApp');