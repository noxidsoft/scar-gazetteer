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
              <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                  <b-nav-item href="/search"><b-icon-search /> Search</b-nav-item>
                  <b-nav-item href="/information"><b-icon-info-circle-fill /> Information</b-nav-item>
                </b-navbar-nav>
              </b-collapse>
          </b-navbar>
        </b-container>
      </div>
    </div>

    <router-view />

  </b-container>
</template>

<script>


export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
@import '~@/assets/scar_gaz.css';
@import '~@/assets/main.css';
</style>
