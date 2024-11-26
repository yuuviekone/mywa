export default (handler) => {
  handler.reg({
    cmd: ["auto"],
    tags: "owner",
    desk: "Pemberitahuan Reset Booking Otomatis", // Descriptive name
    run: async (m, { func, db, sock }) => {
      let messageSent = false;
      const hari_ini = func.date(Date.now()).split(" ")[1] + ' ' + func.date(Date.now()).split(" ")[2];

      Object.keys(db.users).forEach((userId) => {
        const user = db.users[userId];

        if (user.tanggal === hari_ini) { 
          user.booking = "";
          user.tanggal = "";
          sock.sendMessage(userId, {
            text: "Terima kasih telah melakukan booking custom! Sampai jumpa di booking selanjutnya ya :)",
          });
          messageSent = true;
        }
      });

      if (!messageSent) {
        m.reply("Tidak ada booking yang perlu direset hari ini.");
      }
    },
  });
};
