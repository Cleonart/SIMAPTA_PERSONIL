<template>
  <div>
    <v-form class="login" ref="formLogin">
      <v-row justify="center" align="baseline">
        <img
          src="@/assets/images/polda.png"
          width="80px"
          style="margin-right: 20px"
        />
        <img src="@/assets/images/samapta.png" width="90px" />
      </v-row>

      <v-row class="mt-5 mb-10" justify="center" align="baseline">
        <h2>PORTAL SIMAPTA</h2>
      </v-row>

      <v-row justify="center">
        <v-col :md="5" :sm="10" :cols="10">
          <v-text-field
            v-model="auth.nama_pengguna"
            :rules="auth.aturan_nama"
            outlined
            label="Nama Pengguna"
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row justify="center">
        <v-col :md="5" :sm="10" :cols="10">
          <v-text-field
            v-model="auth.kata_sandi"
            :rules="auth.aturan_kata_sandi"
            :append-icon="show_password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_password ? 'text' : 'password'"
            outlined
            label="Kata Sandi"
            required
            @click:append="show_password = !show_password"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-layout row justify-center>
        <v-dialog
          v-model="loading"
          persistent
          fullscreen
          content-class="loading-dialog"
        >
          <v-container fill-height>
            <v-layout row justify-center align-center>
              <v-overlay :opacity="opacity">
                <v-progress-circular
                  v-if="loading"
                  indeterminate
                  size="70"
                ></v-progress-circular>
              </v-overlay>
            </v-layout>
          </v-container>
        </v-dialog>
      </v-layout>

      <v-row justify="center">
        <v-col :md="5" :sm="10" :cols="10">
          <v-btn @click="validasi" color="primary" block html-type="submit">
            Login</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
    <v-snackbar v-model="snackbar" :timeout="2000">{{
      snackbar_msg
    }}</v-snackbar>
  </div>
</template>

<script>
import auth from "../api/auth";
import Auth from "../api/auth";
import md5 from "md5";

export default {
  layout: "empty",

  data() {
    return {
      show_password: false,
      snackbar: false,
      snackbar_msg: "",
      loading: false,
      opacity: 0.6,

      auth: {
        nama_pengguna: "",
        kata_sandi: "",
        aturan_nama: [(v) => !!v || "Nama pengguna tidak boleh kosong"],
        aturan_kata_sandi: [(v) => !!v || "Kata Sandi tidak boleh kosong"],
      },
    };
  },

  methods: {
    validasi() {
      const valid = this.$refs.formLogin.validate();
      const app = this;

      app.loading = true;

      setTimeout(() => {
        app.loading = false;
      }, 2000);

      if (valid == true) {
        const nama_pengguna = this.auth.nama_pengguna;
        const kata_sandi = md5(this.auth.kata_sandi);
        Auth.login(nama_pengguna, kata_sandi)
          .then((response) => {
            console.log(response);

            // Untuk menampilkan token || hapus nanti!
            console.log(response.data.accessToken);

            // Window sessionStorage javascript
            sessionStorage.setItem("token", response.data.accessToken);
            location.href = "/";
            this.snackbar = true;
            // alert("login berhasil");
          })

          .catch((error) => {
            console.log(error.response.data.msg);
            this.snackbar = true;
            this.snackbar_msg = error.response.data.msg;
            // alert(error.response.data.msg);
          });
      }
    },
  },
};
</script>

<style scoped>
.login {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translate(0%, -50%);
}
#app {
  background: red;
}
</style>
