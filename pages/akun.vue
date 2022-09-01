<template>
  <div class="px-10">
    <v-row class="mt-2">
      <v-card class="mx-auto" width="960" elevation="6" outlined>
        <v-list-item>
          <v-list-item-icon>
            <v-img
              v-if="personil.pangkat"
              :src="translate[personil.pangkat.toLowerCase()].img"
              width="30"
            ></v-img>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-h6 mb-1">
              <span v-if="personil.pangkat">{{
                translate[personil.pangkat].kode
              }}</span>

              {{ personil.nama_depan }}
            </v-list-item-title>
            <v-list-item-subtitle>{{
              personil.nomor_nrp
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-row>

    <h2 class="text-h6 mt-12">Informasi Diri</h2>

    <v-row class="mt-6">
      <v-card class="mx-auto" width="960" elevation="6" outlined>
        <v-list-item>
          <v-list-item-icon>
            <v-icon large> mdi-map-marker-outline </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-caption-h5 mb-1">
              Alamat
            </v-list-item-title>
            <v-list-item-subtitle>{{ personil.alamat }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon large> mdi-phone </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-caption-h5 mb-1">
              No Telepon
            </v-list-item-title>
            <v-list-item-subtitle>{{
              personil.nomor_telepon
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon large> mdi-email </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-caption-h5 mb-1">
              Email
            </v-list-item-title>
            <v-list-item-subtitle>{{ personil.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon large> mdi-lock </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text-caption-h5 mb-1">
              Password
            </v-list-item-title>
            <!-- <v-list-item-subtitle>abc*****</v-list-item-subtitle> -->
          </v-list-item-content>
          <v-btn x-small depressed color :disabled="true"> Ubah </v-btn>
        </v-list-item>
      </v-card>
    </v-row>
  </div>
</template>

<script scoped>
import Translate from "../core/translate.js";
import usePersonil from "../api/usePersonil.js";

export default {
  name: "InspirePage",
  data: () => {
    return {
      personil: {},
      namaPersonil: {},
      translate: Translate,
    };
  },

  methods: {
    ambilDataDariApiPersonil() {
      const token = sessionStorage.getItem("token");
      const payload = {
        where: {
          akun: {
            refresh_token: token,
          },
        },
        include: {
          akun: true,
        },
        take: 1,
      };
      const app = this;
      usePersonil.findMany(payload).then((response) => {
        app.personil = response.data.response.records[0];
        console.log(response);
      });
    },
  },
  mounted() {
    if (sessionStorage.getItem("token") == undefined) {
      location.href = "/login";
    }
    this.ambilDataDariApiPersonil();
  },
};
</script>
