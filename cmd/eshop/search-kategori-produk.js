export default (handler) => {
  handler.reg({
    cmd: ['searchcat'],
    tags: 'e-shop',
    desc: 'mencari costum berdasarkan kategori',
    run: async (m, {db}) => {
        let kategori = m.text;
        let eshopData = db.setting.eshop;

        if (!kategori) {
            m.reply(`Masukan kategori costum contoh .searchcat genshin`);
        } else {
            const results = eshopData.filter(item => item.kategori.toLowerCase().includes(kategori.toLowerCase()));

            if (results.length > 0) {
                let message = "Hasil pencarian:\n";
                results.forEach(item => {
                    message += `\nid: ${item.id}\nNama: ${item.name}\nKategori: ${item.kategori}\nHarga: ${item.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\nninclude: ${item.inc}\n`;
                });
                m.reply(message);
            } else {
                m.reply(`Tidak ada costum dengan kategori ${kategori}`);
            }
        }
    }
});

}