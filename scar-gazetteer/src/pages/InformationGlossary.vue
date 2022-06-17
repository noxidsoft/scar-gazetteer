<template>
    <b-container>
        <h1>Glossary</h1>
        <b-table
        :items="glossary"
        :fields="fields"
        />
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'

export default {
    name: 'InformationGlossary',
    data: function () {
        return {
            fields: [
                { key: 'english_term', sortable: true },
                { key: 'national_term', sortable: true },
                { key: 'language', sortable: true },
                { key: 'scar_feature_type', sortable: true },
            ]
        }
    },
    mixins: [pg],
    computed: {
        glossary() {
            return this.pg
        },
        pgConfig() {
            return {
                route: 'glossary',
                query: {
                    select: ['*']
                }
            }
        }
    },
    watch: {
        '$route.params.id': function() {
            this.pg.$get
        },
    }
}
</script>
