const { createApp } = Vue;

const HolaMundo = {
  props: ['idioma', 'rojo'],
  template: `
    <div>
      <p v-if="idioma == 'castellano'" :style="{color: color}">Hola Mundo</p>
      <p v-else-if="idioma == 'ingles'">Hello World</p>
      <p v-else-if="idioma == 'frances'">Bonjour le monde</p>
      <p v-else-if="idioma == 'aleman'">Hallo Welt</p>
    </div>
    `,
};

createApp({
  components: {
    'hola-mundo': HolaMundo
  }
}).mount("#miApp");