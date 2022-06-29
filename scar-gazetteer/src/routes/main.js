import Vue from 'vue'
import Router from 'vue-router'
import Postgrest from 'vue-postgrest'

import Main from "@/pages/Main.vue"
import Search from "@/pages/Search.vue"
import SearchResults from "@/pages/SearchResults.vue"
import Download from "@/pages/Download.vue"
import PlaceName from "@/pages/PlaceName.vue"
import Information from "@/pages/Information.vue"
import InformationGeneral from "@/pages/InformationGeneral.vue"
import InformationBatchInstructions from "@/pages/InformationBatchInstructions.vue"
import InformationHistory from "@/pages/InformationHistory.vue"
import InformationThemes from "@/pages/InformationThemes.vue"
import InformationCGACharacteristics from "@/pages/InformationCGACharacteristics.vue"
import InformationData from "@/pages/InformationData.vue"
import InformationCitation from "@/pages/InformationCitation.vue"
import InformationGlossary from "@/pages/InformationGlossary.vue"
import InformationNamingAuthorities from "@/pages/InformationNamingAuthorities.vue"
import InformationStatistics from "@/pages/InformationStatistics.vue"
import NewPlaceName from "@/pages/NewPlaceName.vue"
import EditPlaceName from "@/pages/EditPlaceName.vue"

import store from "@/store"

Vue.use(Router)
Vue.use(Postgrest,
    {
      apiRoot: '/api/'
    })

const router = new Router({
    base: process.env.VUE_APP_PROXY_PATH,
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Main,
        },
        {
            path: '/information',
            component: Information,
            children: [
                {
                    path: '',
                    component: InformationGeneral
                },
                {
                    path: 'batch-instructions',
                    component: InformationBatchInstructions
                },
                {
                    path: 'history',
                    component: InformationHistory
                },
                {
                    path: 'themes',
                    component: InformationThemes
                },
                {
                    path: 'cga-characteristics',
                    component: InformationCGACharacteristics
                },
                {
                    path: 'data-and-validation',
                    component: InformationData

                },
                {
                    path: 'citation-information',
                    component: InformationCitation
                },
                {
                    path: 'glossary',
                    component: InformationGlossary
                },
                {
                    path: 'naming-authorities',
                    component: InformationNamingAuthorities
                },
                {
                    path: 'statistics',
                    component: InformationStatistics
                }
            ]
        },
        {
            path: '/search',
            component: Search,
        },
        {
            path: '/search/results',
            component: SearchResults     
        },
        {
            path: '/download',
            component: Download
        },
        {
            path: '/place-name/:id',
            component: PlaceName
        },
        {
            path: '/place-name/:id/edit',
            component: EditPlaceName,
            meta: {requiresAdmin: true}
        },
        {
            path: '/new-name',
            component: NewPlaceName,
            meta: {requiresAdmin: true}
        }
    ]
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAdmin)) {
      if (store.state.user.isAdmin) {
        next()
        return
      }
      next('/')
    } else {
      next()
    }
  })

export default router