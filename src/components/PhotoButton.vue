<template>
      <v-dialog
        transition="dialog-left-transition"
        max-width="600"
      >
        <template v-slot:activator="{ on, attrs }">
          <button
            v-bind="attrs"
            v-on="on"
          >
          <img src="../assets/camera2.svg" width="50px" height="auto" />
          </button>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >Opening from the left</v-toolbar>
            <v-card-text>
              <div class="text-h2 pa-12">Hello world!</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

</template>

<script>
  export default {
    name: 'HelloWorld',
  }
</script>