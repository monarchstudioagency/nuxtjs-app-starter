<template>
  <el-main class="company_layout">
    <div class="d-flex v-align-center h-space-between single-header mb-1">
      <el-page-header
        @back="goBack"
        content="Super Nom à changer"
        title="Retour"></el-page-header>

      <el-button type="default" size="small" @click="openEditExample = true">Modifier</el-button>

    </div>

    <el-row :gutter="20">
      <el-col :span="24" :md="16">
        <el-card shadow="never" class="mb-1">
          <div slot="header" class="text-small text-uppercase">Informations</div>
          <p class="text-small color-grey no-m">Adresse</p>
          <p>
            47 rue des lices<br>
            -<br>
            Angers, 49100
          </p>
        </el-card>
      </el-col>

      <el-col :span="24" :md="8">
        <el-card shadow="never" class="mb-1">
          <div slot="header" class="text-small text-uppercase">Abonnement</div>
        </el-card>

        <el-card shadow="never" class="mb-1">
          <div slot="header" class="text-small text-uppercase">Créateur</div>
          <el-button type="primary" class="d-block full-width-content" size="small">Thomas Sellem</el-button>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog title="Ajouter une organisation" :visible.sync="openEditExample" custom-class="small-dialog">
      <el-form :model="form">
        <el-form-item label="Nom de l'organisation">
          <el-input v-model="form.name" placeholder="Nom" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="User rattaché">
          <el-input v-model="form.author" placeholder="ID du user" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="openEditExample = false" size="medium">Annuler</el-button>
        <el-button type="primary" @click="openEditExample = false" :loading="Btnloading" size="medium">Confirmer</el-button>
      </span>
    </el-dialog>

  </el-main>
</template>

<script>
export default {
  asyncData({$axios, params, error}) {
    /*
    return $axios.get(`monUrl`).then((res) => {
      return {
        organization: res.data.body
      }
    }).catch((err) => {
      if (err.response) {
        if (err.response.status === 404) {
          return error({statusCode: 404});
        }
      }
    });
    */
    return {
      _id: "999",
      status: "active",
      name: "Exemple 1",
      author: 'Thomas Sellem',
      city: 'Angers'
    }
  },
  data() {
    return {
      title: `${process.env.NAME} | Organisation`,
      form: {
        name: '',
        expiration: ''
      },
      Btnloading: false,
      openEditExample: false
    };
  },
  head() {
    return {
      title: this.title,
    };
  },
  methods: {
    goBack() {
      return this.$router.push('/examples')
    },
    editOrganization() {
      this.Btnloading = true
      this.$axios.put('/organizations/'+this.organization._id, this.form).then(res => {
        this.$message.success("Organisation modifié avec succès")
        this.$nuxt.refresh()
        this.Btnloading = false
        this.openEditExample = false
      }).catch(err => {
        this.Btnloading = false
        return this.$message.error('Impossible de modifier l\'organisation')
      })
    },
    manageTypeLabel(status) {
      switch (status) {
        case "active":
          return "success";
        case "expired":
          return "warning";
        case "cancelled":
          return "danger";
        case "pending":
          return "primary";
      }
    },
    manageTextLabel(status) {
      switch (status) {
        case "active":
          return "Actif";
        case "expired":
          return "Expiré";
        case "cancelled":
          return "Annulé";
        case "pending":
          return "En attente";
      }
    },
  }
};
</script>
