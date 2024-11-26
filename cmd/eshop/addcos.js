export default (handler) => {
    handler.reg({
        cmd: ['addcos'],
        tags: 'owner',
        desc: 'menambahkan list costum',
        isOwner: true,
        run: async (m, {db}) => {
          let [ id, nama, nominal, kategori, ...inc ] = m.text.split("|")
          if (!id) {
            m.reply(`masukan id costum`)
          } else if (!nama) {
            m.reply(`masukan nama costum`)
          } else if (!nominal) {
            m.reply(`masukan harga costum`)
          } else if (!kategori) {
            m.reply(`masukan kategori costum seperti nama anime/game`)
          } else if (!inc) {
            m.reply(`masukan include costum seperti wig/acc dll`)
          } else {
            nominal = parseInt(nominal)
          let eshop = db.setting.eshop
          eshop.push({name: `${nama}`, 
          harga: nominal, 
          kategori: `${kategori}`, 
          total: 0, 
          inc: `${inc}`})
          m.reply(`costum ${nama} dengan harga ${nominal} telah di tambahkan`)
          }
    }
  })
}