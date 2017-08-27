<template>
    <div class="form-group" v-bind:class="{ 'has-error': error }">
        <label class="col-sm-3 control-label" v-bind:for="name">{{ text }}</label>

        <div class="col-sm-9">
            <slot></slot>
            <p class="help-block"><span class="glyphicon glyphicon-alert" aria-hidden="true"></span> {{ error }}</p>
        </div>
    </div>
</template>



<script>
    export default {
        props: ['text', 'error'],

        computed: {
            name: function() {
                // Transformin 'Email Address' into 'email_address'
                return this.text.toLowerCase().replace(/ /g, '_');

            }
        }
    }
</script>



<style lang="scss" scoped>
    .form-group {
        margin-bottom: 30px;
        &.has-error .help-block {
            max-height:25px;
            opacity: 1;
        }
    }


    label {
        font-size: 13px;
        transition: color 0.2s ease-out;
    }


    input, textarea {
        transition: border-color 0.3s ease-out;
        &:empty:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px white inset;
        }

        &:focus {
            // just to override the !important from homer_admin-v2.0/light-shadow
            border-color: #3498DB !important;
        }
    }


    .help-block {
        max-height: 0;
        margin-bottom: 0;
        padding: 0 0 1px 2px;
        font-size: 12px;
        font-weight: 600;
        overflow: hidden;
        opacity: 0;
        transition: max-height 0.3s ease-out, opacity 0.3s ease-out;

        .glyphicon { padding-right: 5px; }
    }
</style>