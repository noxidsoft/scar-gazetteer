<template>
            <b-form @submit="submit">
            <b-form-group
            label="Official Name:"
            label-for="official_name"
            >
                <b-form-input
                id="official_name-1"
                v-model="form_data.place_name_mapping"
                type="text"
                required
                />
            </b-form-group>

            <b-form-group
            label="Latitude:"
            label-for="latitude"
            >
                <b-form-input
                id="latitude"
                v-model="form_data.latitude"
                type="number"
                required
                />
            </b-form-group>
            <b-form-group
            label="Longitude:"
            label-for="longitude"
            >
                <b-form-input
                id="longitude"
                v-model="form_data.longitude"
                type="number"
                required
                />
            </b-form-group>
            <b-form-group
            label="Coordinate Accuracy:"
            label-for="coordinate_accuracy"
            >
                <b-form-input
                id="coordinate_accuracy"
                v-model="form_data.coordinate_accuracy"
                type="number"
                />
            </b-form-group>
            <b-form-group
            label="Altitude:"
            label-for="altitude"
            >
                <b-form-input
                id="altitude"
                v-model="form_data.altitude"
                type="number"
                />
            </b-form-group>
            <b-form-group
            label="Altitude Accuracy:"
            label-for="altitude_accuracy"
            >
                <b-form-input
                id="altitude"
                v-model="form_data.altitude_accuracy"
                type="number"
                />
            </b-form-group>
            <b-form-group
                label="Narrative"
                label-for="narrative"
                >
                <b-form-textarea
                id="narrative"
                v-model="form_data.narrative"
                rows="3"
                max-rows="6"
                />
            </b-form-group>
            <b-form-group
                label="Named For"
                label-for="named-for"
                >
                <b-form-textarea
                id="named-for"
                v-model="form_data.named_for"
                rows="3"
                max-rows="6"
                />
            </b-form-group>
            <b-form-group
                    label="Source Gazetteer:"
                    label-for="gazetteer">
                <b-form-select
                    id="gazetteer"
                    v-model="form_data.gazetteer"
                    :options="lists.gazetteers"
                />
            </b-form-group>
            <b-form-group
                    label="Feature Type:"
                    label-for="feature_type">
                <b-form-select
                    id="feature_type"
                    v-model="form_data.feature_type_code"
                    :options="lists.feature_types"
                />
            </b-form-group>
            <b-form-group
            label="Feature Class:"
            label-for="feature_class"
            >
                <b-form-input
                id="feature_class"
                v-model="form_data.scar_feature_class"
                type="text"
                required
                />
            </b-form-group>
            <b-form-group
                    label="Is Relic:"
                    label-for="is_relic">
                <b-form-select
                    id="is_relic"
                    v-model="form_data.relic_flag"
                    :options="lists.relic"
                />
            </b-form-group>
            <b-form-group
                    label="Date Named:"
                    label-for="date_named">
                <b-form-input
                id="date_named"
                v-model="form_data.date_named"
                type="date"
                required
                />
            </b-form-group>
            <b-form-group
                label="Comments:"
                label-for="comments"
                >
                <b-form-textarea
                id="comments"
                v-model="form_data.comments"
                rows="3"
                max-rows="6"
                />
            </b-form-group>
            <br />
            <b-button  type="submit" variant="primary">Submit</b-button> 
            <b-button variant="secondary">Reset</b-button>
        </b-form>
</template>

<script>
import axios from 'axios'

export default {
    name: 'PlaceNameForm',
    props: {
        form: Object
    },
    data: function() {
        return {
            form_data: {},
            lists: {
                gazetteers: [{value: null, text: 'Select Gazetteer'}],
                feature_types: [{value: null, text: 'Select Feature Type'}],
                relic: [{value: false, text: 'No'}, {value: true, text:'Yes'}],
                location_method: [
                    {value: null, text: 'None'}
                ]
            }
        }
    },
    watch: {
        form: function() {
            this.form_data = this.form
        }
    },
    mounted: async function() {
        this.form_data = this.form

        let response = await axios.get('/api/gazetteers')
        let gaz = response.data

        let formatted = gaz.map(g => {
            return {value: g.gazetteer_code, text: g.country}
        })

        this.lists.gazetteers = this.lists.gazetteers.concat(formatted)

        let response2 = await axios.get('/api/feature_types')
        let feat = response2.data

        let formatted2 = feat.map(f => {
            return {value: f.feature_type_code, text: f.feature_type_name}
        })

        this.lists.feature_types = this.lists.feature_types.concat(formatted2)
    },
    methods: {
        submit (event) {
            event.preventDefault()
            this.$emit('submit', this.form_data)
        }
    }
}
</script>
