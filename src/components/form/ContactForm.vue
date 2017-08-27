<template>
    <div class="hpanel b-chanllenge is-hidden" ref="hpanel">
        <div class="panel-heading">
            Buspaket Challenge
            <div class="info-box" ref="info_box">Success ! Your message has been sent.</div>
        </div>

        <div class="panel-body">
            <form class="b-form form-horizontal" action="/api-endpoint" method="post" ref="form">
                <form-group text="Full Name" v-bind:error="errors.full_name">
                    <input type="text" class="form-control" id="full_name" placeholder="Full Name" v-model="info.full_name" v-on:focus="errors.full_name = ''">
                </form-group>

                <form-group text="Email address" v-bind:error="errors.email">
                    <input type="email" class="form-control" id="email_address" placeholder="Email" v-model="info.email" v-on:focus="errors.email = ''">
                </form-group>

                <form-group text="Comment" v-bind:error="errors.comment">
                    <textarea class="form-control" id="comment" placeholder="Write your comment here..." v-model="info.comment" v-on:focus="errors.comment = ''"></textarea>
                </form-group>

                <div class="hr-line-dashed"></div>

                <div class="col-sm-9 col-sm-offset-3">
                    <button class="btn btn-info" type="submit" v-on:click="submit" ref="submit_btn" title="Submit"></button>
                </div>
            </form>
        </div>
    </div>
</template>



<script>
    import FormGroup from './FormGroup.vue';


    export default {
        data: function() {
            return {
                info: {
                    email:      '',
                    full_name:  '',
                    comment:    '',
                },

                errors:        {
                    full_name: '',
                    email:     '',
                    comment:   ''
                }
            };
        },


        components: { FormGroup },


        methods: {
            submit: function(e) {
                let submit_btn = this.$refs.submit_btn,
                    form       = this.$refs.form,
                    method     = form.getAttribute('method').toLowerCase(),
                    url        = form.getAttribute('action');

                // Sending the user info to the server, at the url given by the form
                this.$http[method](url, this.info)
                    .then(response => {
                        let errors = response.data.errors;

                        // Updating the errors with the ones from the server
                        this.updatingErrors(errors);

                        // If we don't have any errors => Success
                        if (Object.keys(errors).length === 0) {
                            this.onSucces();
                        }

                        // Removing the loading text from the submit button
                        submit_btn.classList.remove('loading');
                        // Making it active again, for the next session
                        submit_btn.removeAttribute('disabled');
                    });

                // Setting the button to loading state until the server responds
                submit_btn.classList.add('loading');
                // Disabling the Submit button until the server responds
                submit_btn.setAttribute('disabled', 'disabled');
                // Preventing standard form submiting (it is done by ajax call)
                e.preventDefault();
            },


            onSucces: function() {
                let info_box   = this.$refs.info_box;

                // Showing the Green Success box
                info_box.classList.add('active');
                // Hidding the Green Success box, after 2sec
                setTimeout(() => {
                    info_box.classList.remove('active');
                }, 4000);

                // Reseting the form fields
                for (let key in this.info) {
                    this.info[key] = '';
                }
            },


            updatingErrors: function(errors) {
                // Updating the local errors (so they can be reflected into the view) with the ones from the server (if any)
                for (let key in this.errors) {
                    this.errors[key] = errors[key] || '';
                }
            }
        },


        mounted: function() {
            // When the page is loaded we're sliding the panel in
            setTimeout(() => {
                this.$refs['hpanel'].classList.remove('is-hidden');
            }, 300);
        }
    }
</script>



<style lang="scss" scoped>
    .b-chanllenge {
        max-width: 90%;
        width: 600px;
        transform: translateY(0);
        opacity: 1;
        transition: transform 0.2s ease-out, opacity 0.2s ease-out;
        &.is-hidden {
            transform: translateY(-50px);
            opacity: 0;
        }
    }

    .b-form {
        max-width:100%;

       button[type="submit"] {
            max-width: 100%;
            transition: width 0.2s ease-out;
            white-space: normal;
            &:after {
                content: attr(title);
            }
            &.loading:after {
                content: 'Waiting on the server to respond. Please wait !';
            }
        }
    }

    .info-box {
        background-color: #62CB31;
        position: absolute;
        bottom: -100%;
        right: 0;
        padding: 15px 20px;
        color: #FFF;
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        opacity: 0;
        transition: bottom 0.2s ease-out, opacity 0.2s ease-out;

        &.active {
            bottom: -1px;
            opacity: 1;
        }
    }
</style>