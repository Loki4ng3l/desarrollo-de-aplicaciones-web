const { createApp } = Vue

const canciones = [
    {
        id : 1,
        texto : 'El respeto al derecho ajeno es la paz'
    },
    {
        id : 2,
        texto : 'La medida del amor es amar sin medida'
    },
    {
        id : 3,
        texto : 'El dinero no puede comprar la felicidad'
    }
];

createApp({
    data(){
        return{
            frases : frases
        }
    }
}).mount('#miApp');