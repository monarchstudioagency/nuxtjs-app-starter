import Vue from 'vue'

Vue.mixin({
  methods: {
    copyToClipboard(elementId) {

      if (process.client && elementId) {

        const textValue = document.getElementById(elementId).innerText;
        const fullLink = document.createElement('input');
        document.body.appendChild(fullLink);
        fullLink.value = textValue;
        fullLink.select();
        document.execCommand("copy", false);
        fullLink.remove();

        try {
          document.execCommand('copy');
          return Promise.resolve()
        } catch (err) {
          return Promise.reject(err)
        }
      }
    },
    humanDate(date, format = null) {
      return this.$moment(date).format(format ? format : 'DD/MM/YYYY')
    },
    humanTime(time) {
      return this.$moment(time).format('HH[h]mm');
    },
    truncate(input, number) {
      if (input.length > number) {
        return input.substring(0, number) + '...'
      }
      return input
    },
    serializeDomain(value) {
      return value.replace(/[^a-zA-Z0-9\-]/g, '').toLowerCase()
    },
    autoHeightTableList(tab = false) {
      if (process.client) {
        let ratio = 120
        const element = document.getElementById('tableList') || document.getElementsByClassName('tableList')
        if (element) {
          const headerHeight = 56
          const windowHeight = window.innerHeight
          if (tab) ratio = 160
          return (windowHeight - headerHeight - ratio).toString()
        } else {
          return null
        }
      }
    },
    getUnivUserFirstLetters(firstname, lastname) {
      return firstname.charAt(0).toUpperCase() + lastname.charAt(0).toUpperCase()
    },
    minutesToHoursConvert(num, separator = true) {

      const hours = (num / 60)

      let rhours = Math.floor(hours)

      const minutes = (hours - rhours) * 60
      let rminutes = Math.round(minutes)

      if (rminutes === 0) {
        rminutes = '00'
      }

      if (rhours < 10 && rhours > 0) {
        if(!separator) rhours = '0' + rhours
      } else if (rhours === 0) {
        rhours = '00'
      }

      if (rhours === '00') {
        if(separator) {
          return rminutes + 'min'
        } else {
          return '00:' + rminutes
        }
      } else {
        if(separator) {
          return rhours + "h" + rminutes
        } else {
          return rhours + ":" + rminutes
        }
      }

    }
  }
})
