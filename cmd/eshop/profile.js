export default (handler) => {
  handler.reg({
    cmd: ['profile'],
    tags: 'e-shop',
    desc: 'menampilkan profile diri sendiri/oranglain',
    run: async (m, { db }) => {
      let input = m.text ? m.text : m.quoted ? m.quoted.sender : m.mentions.length > 0 ? m.mentions[0] : false;

      let user = db.users;

      if (!input) { 
        let usr = user[m.sender];
        m.reply(`⟨♥⟩⟨♠⟩ *your profile* ⟨♠⟩⟨♥⟩
⟩——————————————⟨
- | nama: ${usr.name}
- | instagram: ${usr.ig}
- | email: ${usr.email}
- | total rental: ${usr.total_rental}
- | booking costum: ${usr.booking}
- | tanggal booking: ${usr.tanggal}
- | saldo: ${usr.saldo.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}
- | verifikasi: ${usr.verifikasi ? '✅' : '❌' }
- | verifikasi email: ${usr.verifikasi_email ? '✅' : '❌' }
- | autentikasi: ${usr.autentikasi ? '✅' : '❌' }
⟩——————————————⟨`);
      } else {
        let usrs = user[input];

        if (usrs) {
          m.reply(`⟨♥⟩⟨♠⟩ *your profile* ⟨♠⟩⟨♥⟩
⟩——————————————⟨
- | nama: ${usrs.name}
- | instagram: ${usrs.ig}
- | total rental: ${usrs.total_rental}
- | booking: ${usrs.booking}
- | tanggal booking: ${usrs.tanggal}
⟩——————————————⟨`);
        } else {
          m.reply(`Pengguna dengan username "${input}" tidak ditemukan!`);
        }
      }
    }
  })
}
