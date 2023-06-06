<template>
    <form>
        <fieldset>
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h1>Registro de usuario</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <label for="nombre">Nombre:</label>
                        <input class="form-control" v-model="nombre" id="nombre" name="nombre" type="text" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <label for="correo">Correo:</label>
                        <input class="form-control" v-model="correo" id="correo" name="correo" type="text" required>
                    </div>
                </div>
                <div class="row" v-if="mensaje">
                    <div class="col-12">
                        <div class="alert alert-danger" role="alert">{{ mensaje }}</div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <label for="usuario">Usuario:</label>
                        <input class="form-control" v-model="usuario" id="usuario" name="usuario" type="text" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 mb-2">
                        <label for="contrasena">Contraseña:</label>
                        <input class="form-control" v-model="contrasena" id="contrasena" name="contrasena" type="password" required>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12 text-center">
                        <button type="submit" class="btn btn-primary">Enviar</button>
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
</template>

<script>

// Option API vs Composition API
export default {
    data () {
        return {
            nombre : '',
            correo : '',
            mensaje : '',
            usuario : '',
            contrasena : '',
        }
    },
    watch: {
        correo(value) {
            this.correo = value;
            // console.log(this.correo);
            this.validarCorreo(value);
        },
        usuario(value) {
            this.usuario = value;
            // console.log(this.usuario);
            this.validarUsuario(value);
        },
    },
    methods: {
        validarCorreo(value) {
            // console.log('Entró a validar correo', value);
            if(value.includes('@') ? console.log('Correo válido') : console.log('Correo inválido'));
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? this.mensaje = '' : this.mensaje = 'Correo inválido');
        },
        validarUsuario(value) {
            if(value.includes(' ') ? this.usuario = this.usuario.trim() : console.log('Usuario válido'));
        },
    }
}
</script>