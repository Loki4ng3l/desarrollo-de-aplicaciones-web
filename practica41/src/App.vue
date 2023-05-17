<script setup>
  import HolaMundo from './components/HolaMundo.vue'
</script>

<template>
  <div>
    <HolaMundo mensaje="1er componente de VueJS" color="bg-success" letra="fs-5"></HolaMundo>

    <HolaMundo mensaje="2do componente de VueJS"/>

    <hola-mundo mensaje="KEBAB CASE de VueJS"></hola-mundo>

    <holaMundo mensaje="CAMEL CASE de VueJS" color="bg-danger"></holaMundo>
  </div>
</template>