<template>
    <b-container>
        <h1>Statistics</h1>
        <b-table
        :items="stats"
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
                { key: 'country', sortable: true },
                { key: 'name_count', sortable: true },
            ]
        }
    },
    mixins: [pg],
    computed: {
        stats() {
            return this.pg
        },
        pgConfig() {
            return {
                route: 'name_count',
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
