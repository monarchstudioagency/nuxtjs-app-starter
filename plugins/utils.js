import Vue from 'vue'

Vue.mixin({
  methods: {
    matchValue: (value, type = "id") => {

      if (!value || value === "undefined") return false;

      let string = value.toString();

      if (type === "id") return string.match(/^[0-9a-fA-F]{24}$/);

      if (type === "password") {
        const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@+?#\$%\^&\*])(?=.{8,})/;
        return PASSWORD_REGEX.test(string);
      }
      if (type === "email") {
        const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return EMAIL_REGEX.test(string);
      }

      if (type === "zipcode") {
        const ZIPCODE_REGEX = /^(([0-8][0-9])|(9[0-5])|(2[ab]))[0-9]{3}$/;
        return ZIPCODE_REGEX.test(string);
      }

    },
    emptyValue: (value) => {
      if (value) {
        let string = value.toString();
        return string === "" || !string.replace(/\s/g, '').length;
      }
      return false;
    },
    isCorrectHour: (hour) => {

      try {
        const time_split = hour.split(':')
        if(time_split.length > 2 || time_split.length === 0) {
          return false
        }
        if(time_split[0] > 12 && time_split[0] < 0){
          return false
        }
        if(time_split[1] > 60 && time_split[1] < 0){
          return false
        }
        return true
      } catch (e) {
        return false
      }

    }
  }
})
