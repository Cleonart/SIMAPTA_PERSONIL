<template>
  <v-app dark>
    <img src="~/assets/images/background.png" class="background" />
    <v-main class="content">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-bottom-navigation
      :value="value"
      style="position: fixed; bottom: 0"
      color="teal"
      grow
    >
      <v-btn @click="changeRoute('/', 1)">
        <span>Beranda</span>
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn @click="changeRoute('/absensi_instan', 2)">
        <span>Absensi</span>
        <v-icon>mdi-qrcode</v-icon>
      </v-btn>
      <v-btn @click="changeRoute('/akun', 3)">
        <span>Profil</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      value: 0,
      page_title: "Beranda",
      clipped: false,
      judul_halaman: "Judul Halaman",
      drawer: false,
      items: {
        beranda: {
          icon: "mdi-home",
          judul: "Beranda",
          ke: "/",
          value: 0,
        },
        absensi_instan: {
          icon: "mdi-qrcode",
          judul: "Absen Instan",
          ke: "/absensi_instan",
          value: 1,
        },
        akun: {
          icon: "mdi-account",
          judul: "Akun",
          ke: "/akun",
          value: 2,
        },
      },
      menu_detail: false,
    };
  },
  methods: {
    changeRoute: function (route, index) {
      location.href = route;
      this.value = index;
    },
  },
  mounted() {
    const routeNow = String($nuxt.$route.path).split("/");
    let routeIndex = 1;
    if (routeNow[1] == "") {
      routeIndex = "beranda";
    } else {
      routeIndex = routeNow[1];
    }
    const selected = this.items[routeIndex];
    this.value = selected.value;
  },
};
</script>

<style scoped>
.background {
  position: fixed;
  left: 0px;
  object-fit: cover;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}
.content {
  margin-bottom: 80px;
}
</style>
