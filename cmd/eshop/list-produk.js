export default (handler) => {
    handler.reg({
        cmd: ['listcos', 'lc', 'listcostum'],
        tags: 'e-shop',
        desc: 'menampilkan list costum yang ada',
        run: async (m, { db }) => {
          let eshop = db.setting.eshop
          let mes = `LIST COSTUM\n\n`
          mes += eshop.map(v => `nama costum: ${v.name}\nharga: ${v.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\ntotal rental: ${v.total}\ninclude: ${v.inc}\n`).join('\n')
          m.reply(mes)
    }
  })
}