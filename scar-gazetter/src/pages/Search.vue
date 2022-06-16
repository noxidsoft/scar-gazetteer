<template>
    <b-container>
        <h1>Search for place names</h1>
        <b-form @submit="search">
            <b-form-group
                    label="Place Name:"
                    label-for="search_text">
                <b-form-input
                    id="search_text"
                    v-model="form.search_text"
                    type="text"
                />
            </b-form-group>
            <b-form-group
                    label="Feature Type:"
                    label-for="feature_type">
                <b-form-select
                    id="feature_type"
                    v-model="form.feature_type"
                    :options="feature_types"
                />
            </b-form-group>
            <b-form-group
                    label="Gazetteer:"
                    label-for="gazetteer">
                <b-form-select
                    id="gazetteer"
                    v-model="form.gazetteer"
                    :options="gazetteers"
                />
            </b-form-group>
            <b-form-group
                    label="Relics:"
                    label-for="relics">
                <b-form-select
                    id="relics"
                    v-model="form.relics"
                    :options="relics"
                />
            </b-form-group>
            <b-button type="submit" variant="primary">Search</b-button>
        </b-form>
    </b-container>
</template>

<script>
import qs from 'qs'

export default {
    name: "Search",
    data: function() {
        return {
            feature_types: [
                {
                    value: null,
                    text: "All feature types"
                }
            ],
            relics: [
                { value: null, text: "Include Relics"},
                { value: 1, text: "Exclude Relics"},
                { value: 2, text: "Only Relics"},
            ],
            gazetteers: [
                {value: null, text: "All Gazetteers"},
                {value: 'AUS', text: 'Australia'},
                {value: 'RUS', text: 'Russia'}
            ],
            form: {
                search_text: "",
                feature_type: null,
                gazetteer: null,
                relics: null
            }
        }
    },
    methods: {
        search(event) {
            event.preventDefault()
            this.$router.push(`/search/results?${qs.stringify(this.form)}`)
        }
    }
}
</script>
