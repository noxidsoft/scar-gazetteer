<template>
    <b-container>
        <h1>Search Results</h1>
        <b-alert show>
            <p><b-icon-info-circle-fill /> <strong>SCAR Gazetteer Information:</strong>
            Each place can have one or more entries in the SCAR Composite Gazetteer, dependant on its origin. By viewing an  individual entry, you may see multiple references to the same place.
            SCAR uses a more general feature type coding, so each place will, in general, have multiple feature types.</p>
		</b-alert>
        <p>Page: {{ page }} of {{ total_pages }} - Total Results: {{count}}</p>
        <b-button @click="previous" :disabled="page == 1">Previous</b-button> <b-button @click="next" :disabled="page >= total_pages">Next</b-button>
        <b-table :items="results" :fields="fields" >
            <template #cell(place_name_mapping)="p">
                <div>
                    <a :href="`/place-name/${p.item.name_id}`">{{p.item.place_name_mapping}} ({{p.item.gazetteer}})</a>
                    <b-badge>Place ID: {{p.item.place_id}}</b-badge>
                    <b-badge>Name ID: {{p.item.name_id}}</b-badge>
                </div>
            </template>
        </b-table>
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'

export default {
    name: 'SearchResults',
    data: function () {
        return {
            fields: [
                { key: 'place_name_mapping', label: "Place Name", sortable: true },
                { key: 'latitude', sortable: false },
                { key: 'longitude', sortable: false },
            ],
            page_size: 25
        }
    },
    mixins: [pg],
    computed: {
        page() {
            return  this.$route.query.page || 1
        },
        total_pages() {
            return Math.ceil(this.count / this.page_size)
        },
        results() {
            return this.pg
        },
        count() {
            return this.pg.$range.totalCount
        },
        pgConfig() {

            let filter = {}

            if(this.$route.query.search_text) {
                filter['place_name_mapping.like'] = `%${this.$route.query.search_text}%`
            }

            if(this.$route.query.gazetteer) {
                filter['gazetteer.eq'] = `${this.$route.query.gazetteer}`
            }

            if(this.$route.query.feature_type) {
                filter['feature_type_code.eq'] = `${this.$route.query.feature_type}`
            }

            if(this.$route.query.relics == 1) {
                filter['relic_flag.is'] = false
            }

            if(this.$route.query.relics == 2) {
                filter['relic_flag.is'] = true
            }

            return {
                route: 'place_names',
                query: {
                    select: ['place_name_mapping', 'gazetteer', 'place_id', 'name_id', 'latitude', 'longitude', 'feature_type_code'],
                    and: filter,
                    order: [
                        ['place_name_mapping', 'asc']
                    ],
                    limit: 50,
                    offset: (this.page -1) * this.page_size
                },
                count: 'exact'
            }
        }
    },
    methods: {
        next: function () {

            if(this.page >= this.total_pages) {
                return
            }

            console.log("NEXT PAGE")

            const query = Object.assign({}, this.$route.query);
            query.page = parseInt(this.page) + 1;
            this.$router.push({ query });
        },
        previous: function() {
            if(this.page == 1) {
                return
            }

            const query = Object.assign({}, this.$route.query);
            query.page = parseInt(this.page) - 1;
            this.$router.push({ query });
        }
    }
}
</script>

<style scoped>
    .badge {
        color: #fff;
        background-color: #999;
        text-shadow: 0 -1px 0 rgb(0 0 0 / 25%);
    }
</style>
