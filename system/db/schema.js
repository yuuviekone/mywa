const schema = async (m, sock, db) => {
    const isNumber = x => typeof x === "number" && !isNaN(x)
    const isBoolean = x => typeof x === "boolean" && Boolean(x)
    db.users = db.users || {}
    db.groups = db.groups || {}
    db.eshop = db.eshop || {}

    let user = db.users[m.sender]
    if (typeof user !== "object") db.users[m.sender] = {}
    if (user) {
        if (!m.sender.endsWith("@s.whatsapp.net")) return
        if (!("name" in user)) user.name = m.pushName
        if (!("ig" in user)) user.ig = ""
        if (!("lastChat" in user)) user.lastChat = -1
        if (!("ads" in user)) user.ads = -1
        if (!("lang" in user)) user.lang = ""
        if (!isNumber(user.afk)) user.afk = -1
        if (!("afk_reason" in user)) user.afk_reason = ""
        if (!("booking" in user)) user.booking = ""
        if (!("tanggal" in user)) user.tanggal = ""
        if (!("email" in user)) user.email = ""
        if (!("email_bayangan" in user)) user.email_bayangan = ""
        if (!("code_email" in user)) user.code_email = ""
        if (!isBoolean(user.verifikasi)) user.verifikasi = false
        if (!isBoolean(user.verifikasi_email)) user.autentikasi = false
        if (!isBoolean(user.autentikasi)) user.autentikasi = false
        if (!isNumber(user.exp)) user.exp = 0
        if (!isNumber(user.total_rental)) user.total_rental = 0
        if (!isNumber(user.limit)) user.limit = 10
        if (!isNumber(user.saldo)) user.saldo = 0
        if (!isNumber(user.point)) user.point = 0
        if (!("exp_prem" in user)) user.exp_prem = 0
        if (!isBoolean(user.premium)) user.premium = false
        if (!isBoolean(user.autoDownload)) user.autoDownload = false
        if (!isBoolean(user.autoSticker)) user.autoSticker = false
        if (!isBoolean(user.banned)) user.banned = false
        if (!("logAi" in user)) user.logAi = []
        if (!("total_trx" in user)) user.total_trx = 0
        if (!("jumlah_trx" in user)) user.jumlah_trx = 0
        if (!("depo" in user)) user.depo = {}

    } else {
        db.users[m.sender] = {
            name: m.pushName,
            lastChat: -1,
            ads: -1,
            lang: "",
            afk: -1,
            afk_reason: "",
            booking: "",
            tanggal: "",
            verifikasi: false,
            verifikasi_email: false,
            autentikasi: false,
            ig: "",
            exp: 0,
            limit: 10,
            saldo: 0,
            point: 0,
            exp_prem: 0,
            premium: false,
            autoDownload: false,
            autoSticker: false,
            banned: false,
            logAi: [],
            total_trx: 0,
            jumlah_trx: 0,
            depo: {}
        }
    }

    if (m.isGroup) {
        let group = db.groups[m.from]
        if (typeof group !== "object") db.groups[m.from] = {}
        if (group) {
            if (!m.from.endsWith("@g.us")) return
            if (!("name" in group)) group.name = await sock.getName(m.from)
            if (!isNumber(group.lastChat)) group.lastChat = new Date() * 1
            if (!isBoolean(group.mute)) group.mute = false
            if (!isBoolean(group.antiLink)) group.antiLink = false
            if (!isBoolean(group.autoDownload)) group.autoDownload = false
            if (!isBoolean(group.autoSticker)) group.autoSticker = false
            if (!("blacklist" in group)) group.blacklist = []
        } else {
            db.groups[m.from] = {
                name: await sock.getName(m.from),
                lastChat: new Date() * 1,
                mute: false,
                antiLink: false,
                autoDownload: false,
                autoSticker: false,
                blacklist: []
            }
        }
    }

    let setting = db.setting
    if (setting) {
        if (!("firstchat" in setting)) setting.firstchat = false
        if (!("readstory" in setting)) setting.readstory = false
        if (!("reactstory" in setting)) setting.reactstory = false
        if (!("autoread" in setting)) setting.autoread = false
        if (!("self" in setting)) setting.self = false
        if (!("debug" in setting)) setting.debug = false
        if (!("hidden" in setting)) setting.hidden = []
        if (!("topup" in setting)) setting.topup = []
        if (!("resAi" in setting)) setting.resAi = []
        if (!("ptero" in setting)) setting.ptero = []
        if (!("number" in setting)) setting.number = ""
        if (!("owner" in setting)) setting.owner = db.setting.owner
        if (!("ch_id" in setting)) setting.ch_id = "120363181344949815@newsletter"
        if (!("ch_name" in setting)) setting.ch_name = "🔥 LightWeight WhatsApp Bot"
        if (!("logo" in setting)) setting.logo = "https://i.ibb.co/C9w0YjT/Ephoto360-com-166a8b5e1ccfdc.jpg"
        if (!("dev" in setting)) setting.dev = "Made by Amirul Dev"
        if (!("packname" in setting)) setting.packname = "IG @amirul.dev"
        if (!("fake_txt" in setting)) setting.fake_txt = "🟢 LIGHTWEIGHT WHATSAPP BOT"
        if (!("ignoreJid" in setting)) setting.ignoreJid = []
        if (!("api" in setting)) setting.api = {}
        if (!("limit" in setting)) setting.limit = {
            free: 10,
            prem: 100,
            own: 9999,
            reset: "00:00"
        }
        if(!("eshop" in setting)) setting.eshop = []
        if(!("transaksi" in setting)) setting.transaksi = []
    } else {
        db.setting = {
            firstchat: false,
            readstory: false,
            reactstory: false,
            autoread: false,
            self: false,
            debug: false,
            hidden: [],
            topup: [],
            resAi: [],
            ptero: [],
            number: "",
            owner: db.setting.owner,
            ch_id: "120363181344949815@newsletter",
            ch_name: "🔥 LightWeight WhatsApp Bot",
            logo: "https://i.ibb.co/C9w0YjT/Ephoto360-com-166a8b5e1ccfdc.jpg",
            dev: "Made by Amirul Dev",
            packname: "IG @amirul.dev",
            fake_txt: "🟢 LIGHTWEIGHT WHATSAPP BOT",
            ignoreJid: [],
            api: {},
            limit: {
                free: 10,
                prem: 100,
                own: 9999,
                reset: "00:00"
            },
            eshop: [],
            transaksi: []
        }
    }
}

export default { schema }