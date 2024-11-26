export default (handler) => {
  handler.reg({
    cmd: ['booking'],
    tags: 'e-shop',
    desc: 'memesan/booking costum',
    run: async (m, { db, sock }) => {
      if (db.users[m.sender].verifikasi === true) {
        const [pesan, tgl, bln] = m.text.split(" ")
        const user = db.users[m.sender]
        const eshopData = db.setting.eshop

        if (!pesan) {
          m.reply(`Ingin memesan costum apa?\n .booking costum tanggal bulan \nContoh: .booking nahida 12 12`)
        } else if (!tgl || isNaN(tgl)) {
          m.reply(`Tanggal harus berupa angka. Contoh: .booking nahida 12 12`)
        } else if (!bln || isNaN(bln) || bln > 12 || bln < 1) {
          m.reply(`Bulan harus berupa angka antara 1-12. Contoh: .booking nahida 12 12`)
        } else {
          const index = eshopData.findIndex(item => item.name.toLowerCase() === pesan.toLowerCase())

          if (index !== -1) {
            const item = eshopData[index]
            if (user.saldo >= item.harga) {
          const bulan = ["","Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"][bln]
              user.booking = item.name
              user.tanggal = `${tgl} ${bulan}`
              user.saldo -= item.harga
              user.total_rental += 1
              eshopData[index].total += 1
              m.reply(`Pemesanan ${item.name} berhasil untuk tanggal ${user.tanggal}. Saldo Anda sekarang ${user.saldo}`)
              sock.sendMessage('62882006832884@s.whastapp.net', { text: `Pengguna dengan ID ${m.sender} telah membooking costum ${item.name} untuk tanggal ${user.tanggal}` })
            } else {
              m.reply(`Saldo Anda tidak mencukupi untuk membeli ${item.name}`)
            }
          } else {
            m.reply(`Costum tersebut tidak ada dalam database. Silahkan pilih dari daftar berikut: ${eshopData.map(item => item.name).join(', ')}`)
          }
        }
      } else {
        m.reply(`silahkan update verifikasi ke owner \nwa.me/62882006832884`);
      }
    }
  })
}
