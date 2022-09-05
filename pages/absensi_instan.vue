<template>
  <div
    class="scanner_container"
    ref="scanner_container"
    v-bind:style="container"
  >
    <video ref="scanner_canvas" class="scanner" :loading="loading"></video>
    <div class="scanner_info">
      <div>
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
      </div>
    </div>
    <div style="margin-top: -25px; padding: 0px 20px; display: flex">
      <div style="width: 50%">
        <p style="margin: 0"><strong>Absensi Samapta</strong></p>
        <p style="margin: 0">{{ date }}</p>
      </div>
      <div style="width: 50%">
        <h1 style="margin: 0; text-align: right">{{ time }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import qrScanner from "qr-scanner";
import useAbsensi from "../api/useAbsensi";
export default {
  name: "InspirePage",
  data() {
    return {
      scanner: {},
      date: null,
      container: { height: "" },
      opacity: 0.9,
      loading: false,
      interval: null,
      time: null,
      qr: null,
    };
  },
  methods: {
    adjustScannerHeight() {
      this.container.height = 0 + "px";
      setTimeout(() => {
        let main_height =
          this.$refs.scanner_container.offsetParent.offsetHeight.toString();
        this.container.height = main_height + "px";
      }, 50);
      /* makes the scanner container follow the height of v-main-wrapper which we will call main going forward
      , the 50s delay is for giving the screen time to adjust it's height because we need time for the main to adjust to the
      current screen size instead of it's last screen size. the reason we shrink it is because main keeps it's heigt from
      the last screen size hence making the camera not follow the current screen size
      */
    },
  },
  beforeDestroy() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  created() {
    const app = this;
    setInterval(function () {
      app.time = moment().format("HH:mm:ss");
      app.date = moment().format("DD MMMM YYYY");
    }, 1000);
  },
  mounted() {
    if (sessionStorage.getItem("token") == undefined) {
      location.href = "/login";
    }
    window.addEventListener("resize", this.adjustScannerHeight);
    this.adjustScannerHeight();
    const scanner = this.$refs.scanner_canvas;
    const window_width = window.innerWidth + 50;
    const app = this;
    this.scanner = new qrScanner(
      this.$refs.scanner_canvas,
      (result) => {
        // console.log(result);
        // alert(result);

        console.log(result);
        useAbsensi

          .absenViaQr({
            kodeQr: result.data,
            token: sessionStorage.getItem("token"),
          })
          .then((response) => {
            console.log(response);
            // alert(response);
          });

        app.loading = true;
        setTimeout(() => {
          app.loading = false;
          // location.href = "/";
          app.scanner.start();
        }, 4000);
        // alert("absen berhasil");
        app.scanner.stop();
      },
      {
        highlightScanRegion: true,
        highlightCodeOutline: true,
        maxScansPerSecond: 2,
      }
    );

    this.scanner.start();
  },
};
</script>

<style>
.scanner_container {
  /* position: fixed; */
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.scanner {
  flex-grow: 3;
  width: 100%;
  height: 80%;
  object-fit: cover;
}
.scanner_info {
  flex-grow: 1;
  align-items: center;
  display: flex;
  bottom: 0;
  padding: 10px;
}
.scanner_info h1 {
  left: 30px;
  bottom: 5px;
}
.scanner_info p {
  margin: 0;
}
.scanner_info div {
  flex-grow: 5;
}
.container {
  padding: 0;
}
</style>
