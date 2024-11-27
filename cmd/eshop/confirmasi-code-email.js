export default (headler) => {
  headler.reg({
    cmd: ["confirmcode"],
    tags: "e-shop",
    desc: "untuk confirmasi code verifikasi email",
    run: async (m, { db }) => {
      let usr = db.users[m.sender]
      let code = m.text
      if (usr.code_email === code) {
        m.reply(`berhasil`)
      } else {
        m.reply(`code tersebut salah`)
      }
    }
  })
}