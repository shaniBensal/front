<template>
    <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">
            <v-card>
                <v-card-title class="headline grey lighten-2" primary-title>
                    Your Order Has Been Accepted!
                </v-card-title>

                <v-card-text>
                    Thank you for using rentApp!
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                    <v-spacer></v-spacer>

                    <router-link :to="'/user/'+user._id"><v-btn color="primary" flat @click="closeModal">
                        OK
                    </v-btn></router-link>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
export default {
  name: "confirmModal",
  props: ["open"],
  data() {
    return {};
  },
  created() {},
  methods: {
    closeModal() {
      this.$emit("closeModal");
      this.$emit("approve");
    }
  },
  computed: {
    dialog() {
      return this.open;
    },
    user() {
      return this.$store.getters.loggedinUser;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-card__text {
  background-color: azure;
}

.v-card__actions {
  background-color: azure;
}
</style>
