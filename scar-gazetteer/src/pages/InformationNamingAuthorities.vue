<template>
    <b-container>
        <h2>Naming Authorities</h2>
        <div v-for="gaz of gazetteers" :key="gaz.gazetteer_id">
            <h3>{{gaz.country}}</h3>
            <p>
                <span v-if="gaz.national_authority">{{gaz.national_authority}}</span><br /> 
                <a :href="gaz.names_urn" v-if="gaz.names_urn">{{gaz.agency}}</a><span v-else>{{gaz.agency}}</span>
            </p>
        </div>
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'

export default {
    name: 'InformationNamingAuthorities',
    data: function () {
        return {
        }
    },
    mixins: [pg],
    computed: {
        gazetteers() {
            return this.pg
        },
        pgConfig() {
            return {
                route: 'gazetteers',
                query: {
                    select: ['*'],
                    order: [
                        ['country', 'asc'],
                    ]
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
