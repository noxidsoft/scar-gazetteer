<template>
    <b-container>
        <h1>{{place.place_name_mapping}}</h1>
        <b-badge>Name ID: {{place.name_id}}</b-badge> <b-badge>Place ID: {{place.place_id}}</b-badge>
        <p v-if="place.feature_types">Feature Type: <a :href="'https://data.aad.gov.au/aadc/ftc/display_feature_type.cfm?feature_type_code='+ place.feature_types.feature_type_code">{{place.feature_types.feature_type_name}}</a> <b-icon-info-circle v-b-tooltip.hover :title="place.feature_types.definition"/></p>
        <h3>Origin</h3>
        <p v-if="place.gazetteers">This name originates from <strong>{{place.gazetteers.country}}</strong>. It is part of the {{gazetteerName}} and the SCAR Composite Gazetteer of Antarctica.</p>
        
        <div v-if="other_names.length > 0">
            <p>Names that other countries have for this feature: </p>
            <ul>
                <li v-for="name of other_names" :key="name.name_id">
                    <router-link :to="'/place-name/'+ name.name_id"> {{name.place_name_mapping}} ({{name.gazetteer}})</router-link>
                </li>
            </ul>
        </div>

        <h3>Narrative</h3>
        <p>{{place.narrative}}</p>
        <h3>Named For</h3>
        <p>{{place.named_for}}</p>
        <h3>Location</h3>
        <ul>
            <li>Latitude: {{place.latitude}}</li>
            <li>Longitude: {{place.longitude}}</li>
            <li>Altitude: {{place.altitude || "Not Recorded"}}</li>
        </ul>
        <h3>Map</h3>
            <l-map style="height: 300px" :zoom="zoom" :center="markerLatLng" v-if="this.place">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker :lat-lng="markerLatLng">
                    <l-popup :options="{ permanent: true, interactive: true }">
                        <strong>{{place.place_name_mapping}}</strong><br />
                        {{place.latitude}},{{place.longitude}}
                    </l-popup>
                </l-marker>
            </l-map>
        <h3>Source</h3>
        <ul>
            <li>Location Method: {{place.location_method || "Not Recorded"}}</li>
            <li>Source Name: {{place.source_name || "Not Recorded"}}</li>
            <li>Source Publisher: {{place.source_publisher || "Not Recorded"}}</li>
            <li>Source Scale: {{place.source_scale || "Not Recorded"}}</li>
            <li>Source Identifier: {{place.source_identifier || "Not Recorded"}}</li>
        </ul>
        <h3>Comments</h3>
        <p>{{place.comments}}</p>
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'
import { LMap, LMarker, LTileLayer, LPopup } from "vue2-leaflet";
import axios from 'axios'

export default {
    name: 'PlaceName',
    components: {
        LMap,
        LMarker,
        LTileLayer,
        LPopup
    },
    data: function () {
        return {
            url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
            attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            zoom: 3,
            other_names: []
        }
    },
    mixins: [pg],
    computed: {
        place() {
            return this.pg
        },
        pgConfig() {
            return {
                route: 'place_names',
                query: {
                    select: ['*','gazetteers(*), feature_types(*)'],
                    and: {
                        'name_id.eq': this.$route.params.id
                    }
                },
                single: true
            }
        },
        markerLatLng() {
            return [this.place.latitude || 0, this.place.longitude || 0]
        },
        gazetteerName() {
            return this.place.gazetteers.gazetteer_name ?? `${this.place.gazetteers.country} Gazetteer`
        }
    },
    watch: {
        '$route.params.id': async function() {
            await this.pg.$get()

            await this.getOtherNames()
        },
        'pg': function() {
            this.getOtherNames()
        }
    },
    methods: {
        getOtherNames: async function() {
            const response = await axios.get(`/api/place_names?place_id=eq.${this.place.place_id}&name_id=neq.${this.place.name_id}`)

            this.other_names = response.data
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
