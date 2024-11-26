export default (handler) => {
  handler.reg({
    cmd: ["update"],
    tags: 'e-shop',
    desc: 'update profile/mengubah profile',
    run: async (m, { db }) => {
      let [system, ...text] = m.text.split(" ");
      let usr = db.users[m.sender];

      if (!system) return m.reply('Format salah. Contoh: .update nama nama_baru');

      text = text.join(' ');

      if (system === 'nama') {
        usr.name = text;
        m.reply(`Nama berhasil diubah menjadi ${text}`);
      } else if (system === 'ig') {
        const regex = /^https:\/\/www.instagram.com\/[a-zA-Z0-9_.\-]+/i;
        if (regex.test(text)) {
          usr.ig = text;
          m.reply('Link Instagram berhasil diubah');
        } else {
          m.reply('Link Instagram tidak valid. Pastikan formatnya seperti https://www.instagram.com/username');
        }
      } else {
        m.reply('Sistem yang Anda masukkan tidak valid. Silahkan gunakan nama atau ig');
      }

      db.users[m.sender] = usr; 
    }
  })
}
