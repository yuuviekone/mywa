export default (handler) => {
    handler.reg({
        cmd: ['delcos'],
        tags: 'owner',
        desc: 'menghapus list costum',
        isOwner: true,
        run: async (m, {db}) => {
          let nama = m.text;
          let eshopData = db.setting.eshop;
          if (!nama) {
              m.reply(`Masukan nama costum contoh .delcos nahida`);
          } else {
              const indexToDelete = eshopData.findIndex(item => item.name === nama);
          
              if (indexToDelete !== -1) {
                  eshopData.splice(indexToDelete, 1);
                  db.setting.eshop = eshopData;
          
                  m.reply(`Costum dengan nama ${nama} telah berhasil dihapus dari database`);
              } else {
                  m.reply(`Costum tersebut tidak ada dalam database`);
              }
          }

    }
  })
}