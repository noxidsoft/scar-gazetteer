<template>
  <b-container fluid="sm">
    <b-container id="header">
      <b-row>
        <b-col><img src="~@/assets/scar_logo_sm.gif" alt="S C A R" /></b-col>
        <b-col>
          <h1>COMPOSITE GAZETTEER OF ANTARCTICA</h1>
          <h2>ENEA - P.N.R.A.</h2>
        </b-col>
        <b-col><img src="~@/assets/pnra_logo_sm.png" alt="P N R A" /></b-col>
      </b-row>
      <b-row>
        <p>
          <a href="http://www.scar.org">Scientific Committee on Antarctic Research (SCAR)</a><br />
          Collated by <a href="http://www.pnra.it">Programma Nazionale di Ricerche in Antartide</a> (Italy)<br />
          in the framework of the SCAR <a href="http://www.scar.org/data-products/scagi">Standing Committee on Antarctic Geographic Information (SCAGI)</a>
        </p>
      </b-row>
    </b-container>
      <!--- The main-manu-placeholder is a fixed height and so will keep the page contents in
      the same position once the navbar gets affixed. --->
    <div id="main-menu-placeholder">
      <!-- make sure the affixed navbar still contains margins -->
      <div id="main-menu" data-spy="affix" data-offset-top="286" >
        <!-- apply margins -->
        <b-container>
          <!-- create navbar -->
          <b-navbar type="dark" variant="primary">
              <b-navbar-brand href="/">SCAR Gazetteer</b-navbar-brand>
              <b-navbar-nav>
                <b-nav-item to="/search"><b-icon-search /> Search</b-nav-item>
                <b-nav-item to="/information"><b-icon-info-circle-fill /> Information</b-nav-item>
              </b-navbar-nav>

              <b-navbar-nav class="nav-right">
                <b-nav-form @submit="submit" v-if="!$store.state.user.isLoggedIn">
                  <b-form-input size="sm" placeholder="Username" v-model="username"></b-form-input>
                  <b-form-input size="sm" placeholder="Password" type="password" v-model="password"></b-form-input>
                  <b-button size ="sm" type="submit">Login</b-button>
                </b-nav-form>
                <b-nav-item v-else>
                  <b-nav-item>{{$store.state.user.username}}</b-nav-item>
                  <b-button size="sm" @click="logout">Logout</b-button>
                </b-nav-item>
              </b-navbar-nav>
          </b-navbar>
        </b-container>
      </div>
    </div>
    <router-view />
  </b-container>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
  },
  data: function() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapActions('user', [
      'authenticate',
      'checkLoggedIn',
      'logout'
    ]),
    submit: function(event) {
      event.preventDefault()
      this.authenticate({username: this.username, password: this.password})
    }
  },
  mounted: function() {
    this.checkLoggedIn()
  }
}
</script>

<style>
@import '~@/assets/scar_gaz.css';
@import '~@/assets/main.css';

.navbar {
  border-radius: 5px;
}

.navbar-brand {
  padding-left: 1.5em
}

.nav-right {
    justify-content: flex-end;
    flex-grow: 3; 
    padding-right: 1.5em;
}

.form-inline {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.form-control {
  margin: 0.5em;
}
</style>
