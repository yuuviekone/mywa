export default (handler) => {
    handler.reg({
    cmd: ['searchcos'],
    tags: 'e-shop',
    desc: 'mencari costum sesuai nama',
    run: async (m, {db}) => {
        let nama = m.text;
        let eshopData = db.setting.eshop;

        if (!nama) {
            m.reply(`Masukan nama costum contoh .searchcos nahida`);
        } else {
            const indexToSearch = eshopData.findIndex(item => item.id === nama);

            if (indexToSearch !== -1) {
                const costum = eshopData[indexToSearch];
                m.reply(`id costum: ${costum.id}\nnama costum: ${costum.name}\nharga: ${costum.harga.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}\ntotal rental: ${costum.total}\ninclude: ${costum.inc}`);
            } else {
                m.reply(`Costum dengan nama ${nama} tidak ada dalam database`);
            }
        }
    }
});
}