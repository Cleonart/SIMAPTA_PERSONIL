<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="menu_detail"
      fixed
      app
      style="z-index: 9999"
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.ke"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.judul" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ judul_halaman }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="menu_detail = !menu_detail">
        <v-icon>mdi-{{ `chevron-${menu_detail ? "right" : "left"}` }}</v-icon>
      </v-btn>
      <v-btn icon @click="$router.push('/absensi_instan')">
        <v-icon>mdi-qrcode</v-icon>
      </v-btn>
    </v-app-bar>
    <img src="~/assets/images/background.png" class="background" />
    <v-main class="content">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      page_title: "Beranda",
      clipped: false,
      judul_halaman: "Judul Halaman",
      drawer: false,
      items: [
        {
          icon: "mdi-home",
          judul: "Beranda",
          ke: "/",
        },
        {
          icon: "mdi-qrcode",
          judul: "Absen Instan",
          ke: "/absensi_instan",
        },
        {
          icon: "mdi-account",
          judul: "Akun",
          ke: "/akun",
        },
      ],
      menu_detail: false,
    };
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
</style>
