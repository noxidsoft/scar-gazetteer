<template>
        <div class="container">
        <h1>Welcome to the SCAR Composite Gazetteer of Antarctica</h1>
    
        <cfoutput>
            <p>The SCAR Composite Gazetteer of Antarctica (CGA) has been compiled over a period of {{years}} years (commenced 1992) and consists of {{name_count}} names that correspond to {{feature_count}} features.
                The place names information has been submitted by the national names committees from 22 countries and compiled by Roberto Cervellati and Chiara Ramorino from the Italian Antarctic names committee - Comitato per i nomi geografici antartici.
            </p>
        </cfoutput>
    
        <p>The SCAR CGA is now a relational database - related to the
            <a href="https://mapcatalogue.aq">SCAR Map catalogue</a>,
            <a href="https://data.aad.gov.au/aadc/ftc/">SCAR Feature Catalogue</a> and the
            <a href="https://data.aad.gov.au/aadc/biodiversity/">SCAR Flora and Fauna databases</a> (all developed by the Australian Antarctic Data Centre).
            This allows the search for Antarctic names, maps and flora and fauna information to be addressed via the gazetteer or map catalogue with results showing links to national names committees, map publishers, map retailers and small scale maps showing the distribution of flora and fauna.
        </p>
    
        <ul class="unstyled">
            <li><a href="/search"><b-icon-search /> Search for names</a></li>
            <li><a href="/information/statistics"><b-icon-bar-chart/> View SCAR Gazetteer summary information</a></li>
            <li><a href="/download"><b-icon-download-alt /> Download SCAR Gazetteer</a></li>
            <li><a href="/information/batch-instructions"><b-icon-question-sign /> Instructions for batch edits</a></li>
        </ul>
    </div>
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
    }
}
</script>
