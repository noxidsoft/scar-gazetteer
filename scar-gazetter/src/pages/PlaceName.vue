<template>
    <b-container>
        {{place}}
        <h1>{{place.place_name_mapping}}</h1>
        <b-badge>Place ID: {{place.place_id}}</b-badge><b-badge>Name ID: {{place.name_id}}</b-badge>
        <h3>Origin</h3>
        <p>This name originates from . It is part of the and the SCAR Composite Gazetteer of Antarctica.</p>
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
        <h3>Approval Status</h3>
    </b-container>
</template>

<script>
import { pg } from 'vue-postgrest'
import { LMap, LMarker, LTileLayer, LPopup } from "vue2-leaflet";

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
                    select: ['*'],
                    and: {
                        'name_id.eq': this.$route.params.id
                    }
                },
                single: true
            }
        },
        markerLatLng() {
            return [this.place.latitude || 0, this.place.longitude || 0]
        }
    },
    watch: {
        '$route.params.id': function() {
            this.pg.$get
        },
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
