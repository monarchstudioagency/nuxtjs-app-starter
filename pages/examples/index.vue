<template>
  <el-main class="company_layout">

    <!--HEADER-->
    <div class="t_layout_header d-flex v-align-center h-space-between mb-2">
      <h1 class="no-m">Examples</h1>

      <el-button type="primary" size="small" icon="el-icon-plus" @click="openAddDialog = true">Ajouter</el-button>
    </div>

    <el-table
      :data="examples"
      style="width: 100%"
      id="tableList"
      :height="tableHeightList"
      v-loading="loading">
      <el-table-column
        prop="status"
        label="Statut."
        width="100">
        <template slot-scope="scope">
          <el-tag :type="manageTypeLabel(scope.row.status)" size="small">
            {{ manageTextLabel(scope.row.status) }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="Nom">
      </el-table-column>
      <el-table-column
        prop="author"
        label="Auteur"
        sortable>
      </el-table-column>
      <el-table-column
        prop="city"
        label="Ville">
      </el-table-column>
      <el-table-column
        label="Actions"
        width="100">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openExample(scope.row._id)">Ouvrir
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="Ajouter un exemple" :visible.sync="openAddDialog" custom-class="small-dialog">
      <el-form :model="form">
        <el-form-item label="Nom de l'exemple">
          <el-input v-model="form.name" placeholder="Nom" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="User rattaché">
          <el-input v-model="form.author" placeholder="ID du user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="Expiration de l'exemple">
          <el-input type="date" v-model="form.expiration" placeholder="Exemple" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="openAddDialog = false" size="medium">Annuler</el-button>
    <el-button type="primary" @click="createExample" :loading="Btnloading" size="medium">Confirmer</el-button>
  </span>
    </el-dialog>

  </el-main>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      Btnloading: false,
      tableHeightList: "300",
      openAddDialog: false,
      form: {
        author: '',
        name: '',
        expiration: ''
      },
      examples: [
        {
          _id: "999",
          status: "active",
          name: "Exemple 1",
          author: 'Thomas Sellem',
          city: 'Angers'
        },
        {
          _id: "888",
          status: "expired",
          name: "Exemple 2",
          author: 'Thomas Sellem',
          city: 'Paris'
        }
      ]
    };
  },
  head() {
    return {
      title: `${process.env.NAME} | Organisations`
    }
  },
  methods: {
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
    createExample() {
      this.Btnloading = true;
      setTimeout(() => {
        this.openAddDialog = false
        this.Btnloading = false;
        this.$message.success("Organisation créée avec succès");
      }, 1000)
    },
    openExample(id) {
      this.$router.push(`/examples/${id}`)
    }
  },
  beforeMount() {
    setTimeout(() => {
      this.loading = false;
    }, 1000)
  }
}
</script>
