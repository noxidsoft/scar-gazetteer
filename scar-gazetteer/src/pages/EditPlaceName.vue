<template>
    <b-container>
        <h1>Edit place name</h1>
        <place-name-form  :form="form_data" v-on:submit="submit"/>
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'
import PlaceNameForm from '@/components/PlaceNameForm.vue'

export default {
    name: "EditPlaceName",
    components: {PlaceNameForm},
    mixins: [pg],
    computed: {
        pgConfig () {
            return {
                route: 'place_names',
                query: {
                    and: {
                        'name_id.eq': this.$route.params.id
                    }
                    },
                single: true 
            }
        },
        form_data () {
            return this.pg
        }
    },
    methods: {
        submit (form_data) {
            console.log(form_data)

            Object.assign(this.form_data, form_data)

            this.form_data.$patch({ return: 'minimal' })
        }
    }
}
</script>
