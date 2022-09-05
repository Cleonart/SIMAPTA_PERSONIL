<template>
  <div v-if="personil.nama_display">
    <h3 class="mt-8">Selamat Datang,</h3>
    <h1 class="mt-2">{{ personil.nama_display }}</h1>

    <!-- <v-row style="margin-top: 15px">
      <v-col>
        <h3 class="font-weight-bold">Rekap Absensi</h3>
        <p class="text-caption">Absen bulan ini</p>
      </v-col>
      <v-col>
        <v-select
          :items="bulan"
          solo
          style="width: 100%; float: right; margin-top: 5px; z-index: 999"
        ></v-select>
      </v-col>
    </v-row> -->

    <!-- [START] Scrollmenu dari Rekap Absen -->
    <!-- <div class="scrollmenu">
      <a>
        <v-card width="180px" style="margin-right: 25px">
          <v-card-title class="text-xs-body-2 text-sm-body-2">
            Hadir
          </v-card-title>
          <v-card-actions style="font-size: 40px; padding-top: 25px"
            >13 hari</v-card-actions
          >
        </v-card>
      </a>
      <a>
        <v-card width="180px" height="150px" style="margin-right: 25px">
          <v-card-title class="text-xs-body-2 text-sm-body-2">
            Hadir
          </v-card-title>
          <v-card-actions style="font-size: 40px; padding-top: 25px"
            >13 hari</v-card-actions
          >
        </v-card>
      </a>
      <a>
        <v-card width="180px" height="150px" style="margin-right: 25px">
          <v-card-title class="text-xs-body-2 text-sm-body-2">
            Hadir
          </v-card-title>
          <v-card-actions style="font-size: 40px; padding-top: 25px"
            >13 hari</v-card-actions
          >
        </v-card>
      </a>
      <a>
        <v-card width="180px" height="150px" style="margin-right: 25px">
          <v-card-title class="text-xs-body-2 text-sm-body-2">
            Hadir
          </v-card-title>
          <v-card-actions style="font-size: 40px; padding-top: 25px"
            >13 hari</v-card-actions
          >
        </v-card>
      </a>
      <a>
        <v-card width="180px" height="150px" style="margin-right: 25px">
          <v-card-title class="text-xs-body-2 text-sm-body-2">
            Hadir
          </v-card-title>
          <v-card-actions style="font-size: 40px; padding-top: 25px"
            >13 hari</v-card-actions
          >
        </v-card>
      </a>
    </div> -->
    <!-- [END] Scrollmenu dari Rekap Absen -->

    <h3 style="margin-top: 20px">Jadwal Penugasan Anda</h3>
    <v-alert
      v-if="surat_tugas.length <= 0"
      border="top"
      style="margin-top: 20px"
      colored-border
      type="info"
      elevation="2"
    >
      Belum ada jadwal penugasan untuk anda saat ini
    </v-alert>

    <v-card
      class="mt-6"
      v-for="item in surat_tugas"
      :key="item.surat_tugas.nomor_registrasi"
    >
      <v-card-text>
        <v-row>
          <v-col>
            <p class="text-caption mb-0">NOMOR SURAT TUGAS</p>
            <p class="text-caption font-weight-bold">
              {{ item.surat_tugas.nomor_sprint }}
            </p>
            <p class="text-caption mb-0">TIPE PENUGASAN</p>
            <p class="text-caption font-weight-bold">
              {{ item.surat_tugas.tipe_penugasan }}
            </p>
          </v-col>
          <v-col class="text-right">
            <p class="text-caption mb-0">
              Mulai -
              {{ moment(item.surat_tugas.tanggal_mulai).format("DD/MM/YYYY") }}
            </p>
            <p class="text-caption">
              Selesai -
              {{
                moment(item.surat_tugas.tanggal_selesai).format("DD/MM/YYYY")
              }}
            </p>
            <a href="/api">
              <v-btn
                :disabled="true"
                x-small
                color="primary"
                style="margin: 10px 0px 0px 0px"
                >LIHAT SURAT TUGAS
              </v-btn>
            </a>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script scoped>
import usePersonil from "../api/usePersonil";
import useSuratTugasPersonil from "../api/useSuratTugasPersonil";
import moment from "moment";

export default {
  data: () => ({
    bulan: ["Januari 2022", "Februari 2022", "Maret 2022", "April 2022"],
    moment: moment,
    personil: {},
    surat_tugas: {},
    namaPersonil: {},
  }),

  methods: {
    async getSuratTugasData() {
      const app = this;
      const response = await useSuratTugasPersonil.findMany({
        where: {
          personil_id: app.personil.id,
          surat_tugas: {
            status: "valid",
          },
        },
        include: { surat_tugas: true },
      });
      this.surat_tugas = response.data.response.records;
    },
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
          surat_tugas_ids: {
            include: {
              surat_tugas: true,
            },
          },
        },
        take: 1,
      };
      const app = this;
      usePersonil.findMany(payload).then((response) => {
        app.personil = response.data.response.records[0];
        app.getSuratTugasData();
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

<style>
/* [START] Custom Scroollbar */
.scrollmenu {
  background-color: transparent;
  overflow-x: scroll;
  white-space: nowrap;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 99;
}

.scrollmenu a {
  display: inline-block;
}
/* [END] Custom Srollbar */

/* [START] Scrollable Menu */
.scrollmenu::-webkit-scrollbar {
  width: 0px;
}

.scrollmenu::-webkit-scrollbar-track {
  background: transparent;
}

.scrollmenu::-webkit-scrollbar-thumb {
  background: transparent;
}
/* [END] Scrollable Menu */
</style>
