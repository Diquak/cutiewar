export const FULL_STORY_SCRIPT = [
    {
        chapterId: 1,
        title: "第一章：甜點的逆襲",
        background: "/images/bg_garden.png", // 確保你有這張圖，沒有的話換成 bg_home.png
        introDialogue: [
            { speaker: "系統", text: "這是一個甜點變成怪物，試圖統治世界的時代..." },
            { speaker: "肥肥", text: "嚼嚼... 我的葵花子好像變少了？" },
            { speaker: "系統", text: "突然，一隻巨大的布丁擋住了去路！" },
            { speaker: "貪吃布丁怪", text: "噗喲噗喲！把你們的點心都交出來！" },
            { speaker: "肥肥", text: "吱？！那是我的點心！絕對不能原諒！" }
        ],
        // ★ 關鍵：這裡的 enemyId 必須對應 characters.js 裡的 key (pudding)
        battle: {
            enemyId: "pudding",
            enemyName: "貪吃布丁怪",
            hp: 60
        },
        outroDialogue: [
            { speaker: "貪吃布丁怪", text: "嗚嗚... 被吃掉了..." },
            { speaker: "肥肥", text: "嚼嚼... 這個布丁雖然兇，但味道不錯。" },
            { speaker: "系統", text: "戰鬥勝利！獲得了通往下一關的鑰匙。" }
        ]
    },
    {
        chapterId: 2,
        title: "第二章：珍珠的彈雨",
        background: "/images/bg_bush.png", // 確保有圖，或換成 bg_home.png
        introDialogue: [
            { speaker: "系統", text: "擊敗布丁後，肥肥繼續前進。" },
            { speaker: "阿毛", text: "等等！前面好像有什麼圓圓的東西飛過來了！" },
            { speaker: "阿毛", text: "我不是奇異果！不要射我！" },
            { speaker: "珍珠射手", text: "啵啵啵！黑糖珍珠加農砲，發射！" }
        ],
        // ★ 關鍵：這裡對應 boba
        battle: {
            enemyId: "boba",
            enemyName: "珍珠射手",
            hp: 130
        },
        outroDialogue: [
            { speaker: "珍珠射手", text: "啵... 我的Q度... 消失了..." },
            { speaker: "阿毛", text: "呼... 嚇死我了，還以為要變成果汁了。" }
        ]
    },
    {
        chapterId: 3,
        title: "第三章：魔王的真面目",
        background: "/images/bg_basket.png", // 確保有圖，或換成 bg_home.png
        introDialogue: [
            { speaker: "系統", text: "終於來到了甜點城堡的深處。" },
            { speaker: "米苔目大魔王", text: "愚蠢的寵物們，竟敢來到這裡。" },
            { speaker: "米苔目大魔王", text: "感受澱粉的恐懼吧！" },
            { speaker: "肥肥", text: "不管你是什麼，只要能吃就沒問題！大家上啊！" }
        ],
        // ★ 關鍵：這裡對應 miku
        battle: {
            enemyId: "miku",
            enemyName: "米苔目大魔王",
            hp: 400
        },
        outroDialogue: [
            { speaker: "米苔目大魔王", text: "不可能... 我竟然... 輸了..." },
            { speaker: "系統", text: "世界恢復了和平，而肥肥的肚子也更圓了。" },
            { speaker: "系統", text: "感謝遊玩 Cutie War！" }
        ]
    }
];
