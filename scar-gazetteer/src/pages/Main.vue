<template>
    <b-container class="main-content">
        <h1>Welcome to the SCAR Composite Gazetteer of Antarctica</h1>
    

        <p>The SCAR Composite Gazetteer of Antarctica (CGA) has been compiled over a period of {{years}} years (commenced 1992) and consists of {{name_count}} names that correspond to {{feature_count}} features.
            The place names information has been submitted by the national names committees from 22 countries and compiled by Roberto Cervellati and Chiara Ramorino from the Italian Antarctic names committee - Comitato per i nomi geografici antartici.
        </p>

    
        <p>The SCAR CGA is now a relational database - related to the
            <a href="https://mapcatalogue.aq">SCAR Map catalogue</a>, and the
            <a href="https://data.aad.gov.au/aadc/ftc/">SCAR Feature Catalogue</a>.
            This allows the search for Antarctic names, maps and flora and fauna information to be addressed via the gazetteer or map catalogue with results showing links to national names committees, map publishers, map retailers and small scale maps showing the distribution of flora and fauna.
        </p>
    
        <ul class="unstyled">
            <li><b-icon-search /> <a href="/search">Search for names</a></li>
            <li><b-icon-bar-chart/> <a href="/information/statistics"> View SCAR Gazetteer summary information</a></li>
            <li><b-icon-cloud-arrow-down /> <a href="/download"> Download SCAR Gazetteer</a></li>
            <li><b-icon-info-circle /> <a href="/information/batch-instructions"> Instructions for batch edits</a></li>
        </ul>
    </b-container>
</template>

<script>
import dayjs from 'dayjs'

export default {
    name: "Main",
    data: function() {
        return {
            feature_count: 0,
            name_count: 0
        }
    },
    computed: {
        years: function() {
            return dayjs().year() - 1992
        }
    },
    metaInfo: function () {
        return {
            script: [{
                type: 'application/ld+json',
                json: {
                    "@context": "https://schema.org",
                    "@type": "WebPage",
                    "name": 'SCAR Composite Gazetteer of Antarctica',
                    "sourceOrganization" : {
                        "@type": "Organization",
                        "name": "Scientific Committee on Antarctic Research (SCAR)",
                        "url": "https://scar.org",
                        "logo": "https://scar.org/templates/it_headlines/custom/images/SCAR_logo_2018_white_background.png"
                    },
                    "publisher": {
                        "@type": "Organization",
                        "name": "Scientific Committee on Antarctic Research (SCAR)",
                        "url": "https://scar.org",
                        "logo": "https://scar.org/templates/it_headlines/custom/images/SCAR_logo_2018_white_background.png"
                    },
                    "spatialCoverage": {
                        "@type": "Place",
                        "geo": {
                            "@type": "GeoShape",
                            "box": "-90 180 -60 -180"
                        }
                    }
                }
            }]
        }
    }
}
</script>


<style scoped>

.unstyled {
  list-style: none; /* Remove list bullets */
  padding: 0;
  margin: 0;
}

.main-content {
    max-width: 60em;
}

</style>