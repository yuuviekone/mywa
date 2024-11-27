import nodemailer from 'nodemailer'
export default (headler) => {
  headler.reg({
    cmd: ["veremail"],
    tags: "e-shop",
    desc: "untuk verifikasi pembuatan akun",
    run: async (m, { db, func }) => {
      let emailusr = m.text
      let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sq.kotorichan@gmail.com',
        pass: 'fzgovrkkxttvsqlu'
  }
});
      let usr = db.users[m.sender]
      if (usr.verifikasi_email === true) {
        m.reply(`akun anda telah terverifikasi`)
      } else {
        let code = func.rand(6)
        usr.code_email = `${code}`
        usr.email = `${emailusr}`
        let mailOptions = {
          from: 'sq.kotorichan@gmail.com',
          to: `${emailusr}`,
          subject: 'verifikasi email yuucimun',
          text: `berikut adalah code verifikasi yuucimun\n.confirmcode ${code}\natau bisa mengunakan link dibawah\nhttps://wa.me/62882006832884?text=.confirmcode+${code}`
        };
        transporter.sendMail(mailOptions, (error) => {
          if (error) {
            m.reply(`error`);
          } else {
            m.reply('Email terkirim');
          }
        });

        
      }
    }
  })
}