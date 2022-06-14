<template>
    <b-container>
        <b-form>
            <b-form-group
                    label="Place Name or Identifier:"
                    label-for="search-name">
                <b-form-input
                    id="search-name"
                    v-model="form.name"
                    type="text"
                />
            </b-form-group>
            <b-form-group
                    label="Feature Type:"
                    label-for="search-feature">
                <b-form-select
                    id="search-feature"
                    v-model="form.feature"
                    :options="feature_types"
                />
            </b-form-group>
        </b-form>
    </b-container>
</template>

<script>
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
            form: {
                name: "",
                feature: null
            }
        }
    }
}
</script>
