import Vue          from 'vue';
import App          from './App.vue';
import axios        from 'axios';

// For testing
import MockAdapter  from 'axios-mock-adapter';


Vue.prototype.$http = axios;


new Vue({
    el: '#app',
    render: h => h(App),

    mounted: function() {
        /* For testing */
         // Simulating a server response
        let mock = new MockAdapter(axios, { delayResponse: 900 });

        mock.onPost('/api-endpoint').reply(function(config) {
            let data        = JSON.parse(config.data),
                errors      = {},

                email_regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


            /**
            * Validating fields
             */
            if (data.full_name === '') {
                errors.full_name = 'Name is required. We would like to know who you are !';
            } else if (data.full_name.length < 5) {
                errors.full_name = 'Please provide your real name !';
            }

            if (data.email === '') {
                errors.email = 'Email is required. We need to be able to reach you !';
            } else if (!email_regex.test(data.email)) {
                errors.email = 'Please provide your real email !';
            }

            if (data.comment === '') {
                errors.comment = 'Comment is required. Nothing to say ?';
            }

            return new Promise(function(resolve, reject) {
                resolve([200, { errors: errors } ]);
            });
        });
        /* end of For testing */
    }
});
