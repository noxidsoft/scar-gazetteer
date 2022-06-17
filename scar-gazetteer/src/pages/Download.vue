<template>
    <b-container>
        <h2>Download</h2>

        <h3>Citation information</h3>
        <p>When citing this dataset, use the following example as a guide.</p>
        <p>Secretariat SCAR (1992, updated 2022).
            Composite Gazetteer of Antarctica, <em>Scientific Committee on Antarctic Research</em>.
            GCMD Metadata (<a href="http://gcmd.nasa.gov/records/SCAR_Gazetteer.html">http://gcmd.nasa.gov/records/SCAR_Gazetteer.html</a>)</p>

        <div class="alert alert-info"><strong>Warning:</strong>  These files maintain <span class="label label-info" id="diacritic_info" data-toggle="tooltip" title="A sign, such as an accent or cedilla, which when written above or below a letter indicates a difference in pronunciation from the same letter when unmarked or differently marked.">diacritics</span>.  Please be mindful not to use software like spreadsheets, which do not keep diacritics.</div> 

    </b-container>
</template>

<script>

export default {
    name: "Search",
    data: function() {

    },
    methods: {
        submit: function() {
            let typeNameGeoServer = "aadc:SCAR_CGA_PLACE_NAMES"
            typeNameGeoServer = "aadc:SCAR_CGA_PLACE_NAMES_SIMPLIFIED"
            
            let fileFormat = 'CSV'
            fileFormat = 'application%2Fjson'
            fileFormat = 'application%2Fvnd.google-earth.kml%2Bxml'

            const downloadLink = `https://data.aad.gov.au/geoserver/aadc/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=${typeNameGeoServer}&outputFormat=${fileFormat}`
            this.$router.push(downloadLink)
        }
    }
}
</script>
