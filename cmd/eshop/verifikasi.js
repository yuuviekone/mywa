export default (handler) => {
  handler.reg({
    cmd: ["verifikasi"],
    tags: "owner",
    desc: "memberi centang hijau/verifikasi kepada user",
    run: async (m, { db, sock }) => {
      let nomer = m.text
      let uid = `${nomer}@s.whatsapp.net`
      db.users[uid].verifikasi = true
      sock.sendMessage(uid, {text:`berhasil mengupdate verifikasi`})
    }
  })
}