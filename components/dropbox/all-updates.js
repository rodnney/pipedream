const dropbox = require('https://github.com/PipedreamHQ/pipedream/components/dropbox/dropbox.app.js')

module.exports = {
  name: "all-updates",
  props: {
    dropbox,
    path: { propDefinition: [dropbox, "path"]},
    recursive: { propDefinition: [dropbox, "recursive"]},
    dropboxApphook: {
      type: "$.interface.apphook",
      appProp: "dropbox",
    },
    db: "$.service.db",
  },
  hooks: {
    async activate() {
      await this.dropbox.initState(this)
    }
  },
  async run(event) {
    let updates = await this.dropbox.getUpdates(this)
    for(update of updates) {
      this.$emit(update)
    }
  },
}