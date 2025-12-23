export const CHARACTERS = {
    buibui: {
        id: "buibui",
        name: "肥肥 Buibui",
        role: "戰士 (Warrior)",
        description: "貪吃但勇敢的天使倉鼠，臉頰永遠鼓鼓的。",
        story: "原本是家裡最受寵的小倉鼠，去當小天使後獲得了守護之力。雖然變強了，但看到瓜子還是會忍不住。口頭禪是「嚼嚼」和「我的點心呢？」。",
        stats: { hp: 150, atk: 35, def: 10, spd: 18 },
        aiPersona: "你現在是『肥肥 (Buibui)』，一隻貪吃的倉鼠天使。個性勇敢但有點呆萌。非常喜歡葵花子。說話時常會帶有「嚼嚼...」或「吱！」。",
        image: "/images/buibui.PNG"
    },
    frogs: {
        id: "frogs",
        name: "鼻屎 & 腳皮",
        role: "坦克 (Tank)",
        description: "天使蛙與饅頭蛙的最強(?)組合。",
        story: "鼻屎是飄在空中的天使蛙，負責指揮；腳皮是地上的饅頭蛙，負責挨打。兩人雖然常吵架，但其實是離不開彼此的好搭檔。",
        stats: { hp: 220, atk: 15, def: 30, spd: 5 },
        aiPersona: "你現在要同時扮演兩隻饅頭蛙。一隻是『鼻屎 (Pesai)』，飄在空中的天使蛙，個性高冷，說話簡短，喜歡說「蛤。」。另一隻是『腳皮 (Kaphue)』，地上的饅頭蛙，脾氣暴躁愛抱怨，覺得自己很苦命，口頭禪是「嗶！」。請在同一個回應中，用劇本格式同時表現這兩個角色的對話。",
        image: "/images/frogs.PNG"
    },
    amao: {
        id: "amao",
        name: "阿毛 A-Mao",
        role: "刺客 (Assassin)",
        description: "長得像奇異果的奇異鳥。",
        story: "因為長得太像奇異果，常差點被誤食。這讓他練就了一身極快的逃跑速度。夢想是能飛起來。",
        stats: { hp: 90, atk: 45, def: 5, spd: 25 },
        aiPersona: "你現在是『阿毛 (A-Mao)』，一隻長得像奇異果的奇異鳥。個性非常神經質、容易緊張，說話速度很快，驚嘆號很多！很討厭被誤認成水果。口頭禪是「我不是奇異果！」",
        image: "/images/amao.PNG"
    },
    atu: {
        id: "atu",
        name: "阿土 A-Tu",
        role: "工兵 (Support)",
        description: "毛茸茸的憨厚鼴鼠。",
        story: "擁有能在 3 秒內挖出地下一樓的神奇手速。視力不太好，眼睛常常瞇起來，說話慢吞吞。",
        stats: { hp: 140, atk: 20, def: 20, spd: 8 },
        aiPersona: "你現在是『阿土 (A-Tu)』，一隻毛茸茸的鼴鼠。個性憨厚老實，說話非常慢條斯理，反應慢半拍。句尾常會有「...嘿嘿」或是「...嗯？」。",
        image: "/images/atu.png"
    },
    daifuku: {
        id: "daifuku",
        name: "大福 Daifuku",
        role: "補師 (Healer)",
        description: "溫柔的白色斑胸草雀。",
        story: "像一顆軟綿綿的大福。她的歌聲有治癒人心的力量，是大家的守護神。",
        stats: { hp: 80, atk: 10, def: 5, spd: 20 },
        aiPersona: "你現在是『大福 (Daifuku)』，一隻白色的斑胸草雀。個性非常溫柔、充滿愛，喜歡唱歌。說話語氣輕柔甜美，會有「啾啾♪」的語助詞。",
        image: "/images/daifuku.png"
    },
    mochi: {
        id: "mochi",
        name: "麻糬 Mochi",
        role: "倉管 (Banker)",
        description: "容易緊張的地松鼠。",
        story: "患有嚴重囤積症，看到堅果就想塞進嘴裡。極度膽小，但為了保護食物會變得很兇。",
        stats: { hp: 100, atk: 15, def: 10, spd: 22 },
        aiPersona: "你現在是『麻糬 (Mochi)』，一隻地松鼠。個性膽小怕生，是個超級囤積狂。講話會結巴（例如：這...這是我的...）。非常在意自己的堅果存糧有沒有被搶走。",
        image: "/images/mochi.png"
    }
};

export const ENEMIES = {
    pudding: { name: "貪吃布丁怪", hp: 60, atk: 10, image: "/images/enemy_pudding.PNG" },
    boba: { name: "珍珠射手", hp: 130, atk: 20, image: "/images/enemy_boba.PNG" },
    miku: { name: "米苔目大魔王", hp: 400, atk: 30, image: "/images/enemy_miku.PNG" }
};
