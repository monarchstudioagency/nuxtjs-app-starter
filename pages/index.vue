<template>
  <div class="d-flex h-align-center">
    <el-form :model="login" style="width: 400px" class="mt-2">
      <el-image src="/img/madate-logo.png" alt="Madate Logo" style="width: 100px;" class="mt-1 mb-1"></el-image>
      <h1>Connexion</h1>
      <el-form-item label="Email" :rules="rules.email">
        <el-input type="email"  prefix-icon="el-icon-message" placeholder="Votre email" v-model="login.email"></el-input>
      </el-form-item>
      <el-form-item label="Mot de passe" :rules="rules.password">
        <el-input type="password" placeholder="Votre mot de passe" prefix-icon="el-icon-lock"
                  show-password v-model="login.password"></el-input>
      </el-form-item>

      <p class="color-danger text-small" v-if="login.message">{{login.message}}</p>

      <p class="mt-0">
        <n-link to="/forgot-password" class="el-link el-link--primary">Mot de passe oublié ?</n-link>
      </p>

      <el-button type="primary" @click="userLogin" icon="el-icon-arrow-right" :loading="isLoading">Se connecter
      </el-button>

      <el-divider></el-divider>

      <p class="no-m text-label text-small">Pas encore de compte ?</p>
      <p class="no-m">
        <n-link to="/signin" class="el-link el-link--primary">Créer un compte</n-link>
      </p>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "auth",
  auth: "guest",
  data() {
    return {
      isLoading: false,
      login: {
        email: '',
        password: '',
        message: ''
      },
      rules: {
        email: [
          {required: true, message: 'Veuillez renseigner une adresse e-mail', trigger: 'blur'},
          {type: 'email', message: 'Veuillez entrer une adresse e-mail valide', trigger: ['blur', 'change']}
        ],
        password: [
          {required: true, message: 'Veuillez renseigner un mot de passe', trigger: 'blur'}
        ]
      }
    }
  },
  head() {
    return {
      title: `${process.env.NAME} | Connexion`,
      meta: [
        {
          name: 'description',
          content: 'Connexion'
        }
      ]
    }
  },
  methods: {
    async userLogin() {
      this.isLoading = true
      await this.$auth.loginWith('local', {data: this.login}).then(_ => {
        this.setContainerState().then(redirect => {
          this.$message.success('Vous êtes connecté');
          this.$router.push(redirect)
        })
      }).catch(err => {
        this.isLoading = false
        if(err.response.status === 401) return this.login.message = 'Email ou mot de passe incorrect';
        this.$message.error('Une erreur est survenue');
      })
    }
  }
}
</script>
