<template>
  <div class="d-flex h-align-center">
    <el-form label-width="100px" class="mt-2" label-position="top" style="width: 400px" :model="form" ref="signin">

      <el-image src="/img/madate-logo.png" alt="Madate Logo"
                style="width: 100px;" class="mt-1 mb-1"></el-image>
      <h1 class="h1">Inscription</h1>

      <el-form-item prop="email" label="Email" :rules="rules.email">
        <el-input placeholder="Saisissez votre adresse email" prefix-icon="el-icon-message" v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="Mot de passe" :rules="rules.password">
        <el-input type="password" v-model="form.password" placeholder="Mot de passe" prefix-icon="el-icon-lock"
                  show-password autocomplete="new-password"></el-input>
      </el-form-item>
      <div class="d-flex h-space-between mb-2">
        <p :class="get8LengthClass"><i class="el-icon-circle-check"></i> 8 caractères</p>
        <el-divider direction="vertical"></el-divider>
        <p :class="getUppercaseClass"><i class="el-icon-circle-check"></i> 1 majuscule</p>
        <el-divider direction="vertical"></el-divider>
        <p :class="getLowercaseClass"><i class="el-icon-circle-check"></i> 1 minuscule</p>
        <el-divider direction="vertical"></el-divider>
        <p :class="getNumberClass"><i class="el-icon-circle-check"></i> 1 chiffre</p>
      </div>
      <p class="color-danger" v-if="form.message !== ''"><small>{{ form.message }}</small></p>
      <p>
        <el-button type="primary" @click="submitForm" :loading="loading">{{ form.btn }}</el-button>
      </p>

      <el-divider></el-divider>

      <p class="text-label">Vous possédez déjà un compte ?</p>
      <n-link to="/" class="el-link el-link--primary">Connectez-vous</n-link>

    </el-form>
  </div>
</template>

<script>
export default {
  layout: "auth",
  auth: 'guest',
  data() {
    const strengthPassword = (rule, value, callback) => {
      const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
      if (!PASSWORD_REGEX.test(value)) {
        callback(new Error('Veuillez respecter les conditions du mot de passe'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        email: '',
        password: '',
        btn: "S'inscrire",
        message: ''
      },
      rules: {
        email: [
          {required: true, message: 'Veuillez renseigner une adresse e-mail', trigger: 'blur'},
          {type: 'email', message: 'Veuillez entrer une adresse e-mail valide', trigger: ['blur', 'change']}
        ],
        password: [
          {required: true, message: 'Veuillez renseigner un mot de passe', trigger: 'blur'},
          {validator: strengthPassword, trigger: 'blur'}
        ]
      }
    };
  },
  head() {
    return {
      title: `${process.env.NAME} | Inscription`,
      meta: [
        {hid: 'description', name: 'description', content: 'Inscription'}
      ]
    }
  },
  computed: {
    get8LengthClass() {
      return this.form.password.length >= 8 ? 'no-m text-small color-success' : 'no-m text-small color-grey'
    },
    getUppercaseClass() {
      return this.form.password.match(/[A-Z]/) ? 'no-m text-small color-success' : 'no-m text-small color-grey'
    },
    getLowercaseClass() {
      return this.form.password.match(/[a-z]/) ? 'no-m text-small color-success' : 'no-m text-small color-grey'
    },
    getNumberClass() {
      return this.form.password.match(/[0-9]/) ? 'no-m text-small color-success' : 'no-m text-small color-grey'
    }
  },
  methods: {
    submitForm() {
      this.$refs.signin.validate(async (valid) => {
        if (valid) {
          this.loading = true
          this.form.btn = "Veuillez patienter..."
          const data = {
            email: this.form.email,
            password: this.form.password
          }
          await this.$axios.post('/users', data).then(async () => {
            await this.$auth.loginWith('local', {
              data: data
            }).then(_ => {
              return this.$router.push('/onboarding');
            }).catch(e => {
              return this.form.message = "Une erreur est survenue"
            });
          }).catch(e => {
            if (e.response.status === 409) {
              return this.form.message = "Cet email est déjà utilisé"
            } else {
              return this.form.message = "Une erreur est survenue"
            }
          });
          this.form.btn = "S'inscrire"
          this.loading = false
        } else {
          return false;
        }
      });
    }
  }
};
</script>
