<template>
    <div id="app">
        <contact-form></contact-form>
    </div>
</template>


<script>
    import ContactForm from './components/form/ContactForm.vue';

    export default {
        name: 'app',

        components: { ContactForm }
    }
</script>


<style lang="scss">
    @import './assets/style/index.scss';

    #app {
        min-height: 100vh;
        justify-content: center;
        align-items: center;
        display: flex;
    }
</style>
