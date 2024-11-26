export default (handler) => {
  handler.reg({
    cmd: ['donasi'],
    tags: ['e-shop'],
    desc: 'Fitur donasi untuk mendukung developer.',
    run: async (m, { conn, text }) => {
      if (!text) return m.reply(m.chat, 'Gunakan format: .donasi nominal (minimal Rp2.000)', m);
      if (isNaN(text)) return m.reply('Nominal donasi harus berupa angka');
      if (parseInt(text) < 2000) return m.reply('Nominal donasi minimal Rp2.000');

      let qrisId = '00020101021126570011ID.DANA.WWW011893600915376199609502097619960950303UMI51440014ID.CO.QRIS.WWW0215ID10243491794070303UMI5204739453033605802ID5916yuucimun rentcos6013Kota Semarang61055019863049034';
      let amount = parseInt(text);

      let qrData = createQRData(qrisId, amount);
      let qrImage = await toDataURL(qrData.slice(0, 2048), { scale: 8 });

      conn.sendFile(m.chat, qrImage, 'qrcode.png', `Terima kasih atas donasi sebesar Rp${amount}`, m);
    }
  });
};

function createQRData(qrisId, amount) {
  qrisId = qrisId.slice(0, -4); 
  const step1 = qrisId.replace("010211", "010212"); 
  const parts = step1.split("5802ID");

  const formattedAmount = "54" + ("0" + amount.toString().length).slice(-2) + amount;
  const completeData = parts[0] + formattedAmount + parts[1] + convertCRC16(parts[0] + formattedAmount + parts[1]); 

  return completeData;
}

function convertCRC16(str) {
  const crc16 = crc.crc16ccitt(Buffer.from(str, 'utf8')).toString(16).toUpperCase();
  return ("0000" + crc16).slice(-4);
}
