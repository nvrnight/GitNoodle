const Vue = require('vue/dist/vue.js');
const SimpleVueValidation = require('simple-vue-validator');
const Validator = SimpleVueValidation.Validator;
const path = require('path');

Vue.use(SimpleVueValidation);

module.exports = Vue.component('clone-form', {
    data: () => {
        return {
            url: '',
            errors: []
        };
    },
    validators: {
        url: function(v) {
            return Validator.value(v).required().custom(() => {
                if(!Validator.isEmpty(v) && !path.isAbsolute(v) && !v.startsWith('http://') && !v.startsWith('https://')) {
                    return 'Not a valid path or url.';
                }
            });
        }
    },
    methods: {
        submit: async function() {
            if(await this.$validate()) {
                //clone

                this.$emit('clone-done');
            }
        },
        cancel: function() {
            this.$emit('clone-done');
        }
    },
    template: `
    <div>
        <input type="text" v-model="url" placeholder="URL or Path" name="url" />
        <div class="message">{{ validation.firstError('url') }}</div>
        <button class="btn btn-success btn-shadow  px-3 my-2 ml-0 text-left" type="button" @click="submit">Clone</button>
        <button class="btn btn-danger btn-shadow px-3 my-2 ml-0 text-left" type="button" @click="cancel">Cancel</button>
    </div>`
});