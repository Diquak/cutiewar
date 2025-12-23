export const FULL_STORY_SCRIPT = [
    {
        chapterId: 1,
        title: "第一章：午睡危機",
        background: "/images/bg_garden.png",
        introDialogue: [
            { speaker: "肥肥 Buibui", text: "嚼嚼... 今天的葵花子特別香... ❤️", mood: "happy" },
            { speaker: "野生布丁怪", text: "ㄉㄨㄞ！(一口吞掉葵花子)", mood: "attack" },
            { speaker: "腳皮 Kaphue", text: "嗶——！！(痛死啦！誰踩在老子背上！)", mood: "angry" },
            { speaker: "鼻屎 Pesai", text: "蛤。(眼神示意：處理掉它)", mood: "neutral" },
            { speaker: "肥肥 Buibui", text: "把我的點心還來！萌寵守衛隊，出擊！", mood: "determined" }
        ],
        battle: { enemyId: "pudding", enemyName: "貪吃布丁怪", hp: 60 },
        outroDialogue: [
            { speaker: "肥肥 Buibui", text: "哼，知道厲害了吧。咦？那邊草叢在晃？", mood: "alert" },
            { speaker: "大福 Daifuku", text: "啾啾！救命呀～阿毛被黏住了！", mood: "worry" }
        ]
    },
    {
        chapterId: 2,
        title: "第二章：黏黏迷宮",
        background: "/images/bg_bush.png",
        introDialogue: [
            { speaker: "阿毛 A-Mao", text: "放開我！我不是奇異果！我是鳥！", mood: "panic" },
            { speaker: "麻糬 Mochi", text: "我...我的堅果存糧...都被封住了...", mood: "crying" },
            { speaker: "珍珠射手", text: "啵啵啵！(無情地發射珍珠)", mood: "attack" },
            { speaker: "阿土 A-Tu", text: "不行...土太硬了，我挖不動...嘿嘿...", mood: "dizzy" },
            { speaker: "肥肥 Buibui", text: "欺負我的朋友？腳皮，上去擋住珍珠！", mood: "command" },
            { speaker: "腳皮 Kaphue", text: "嗶！？(又是我？我恨這個團隊...)", mood: "shock" }
        ],
        battle: { enemyId: "boba", enemyName: "珍珠射手", hp: 130 },
        outroDialogue: [
            { speaker: "大福 Daifuku", text: "啾啾♪ (唱出治癒的歌聲，幫大家恢復體力)", mood: "happy" },
            { speaker: "阿土 A-Tu", text: "謝謝你們... 我聞到了，魔王就在那個野餐籃裡！", mood: "serious" },
            { speaker: "麻糬 Mochi", text: "那...那我們也一起去！為了保護堅果！", mood: "determined" },
            { speaker: "系統", text: "阿毛、阿土、大福、麻糬 加入了隊伍！" }
        ]
    },
    {
        chapterId: 3,
        title: "最終章：決戰野餐籃",
        background: "/images/bg_basket.png",
        introDialogue: [
            { speaker: "米苔目大魔王", text: "呼嚕嚕... 竟敢闖入我的勾芡領域...", mood: "evil" },
            { speaker: "腳皮 Kaphue", text: "嗶！！(噁心死了！這傢伙全身都是麵條！)", mood: "scared" },
            { speaker: "阿毛 A-Mao", text: "大家小心！他的觸手很快！(發抖)", mood: "panic" },
            { speaker: "肥肥 Buibui", text: "這是最後一戰了！為了花園的和平，還有好吃的午睡！", mood: "brave" },
            { speaker: "鼻屎 Pesai", text: "蛤！(發出進攻信號)", mood: "shout" },
            { speaker: "全體", text: "Cutie War 守衛隊，全軍突擊！！", mood: "battle_cry" }
        ],
        battle: { enemyId: "miku", enemyName: "米苔目大魔王", hp: 400 },
        outroDialogue: [
            { speaker: "米苔目大魔王", text: "可惡... 竟然輸給了這些小動物...", mood: "dead" },
            { speaker: "系統", text: "魔法解除，甜點怪變回了普通的美味點心。", mood: "narrator" },
            { speaker: "肥肥 Buibui", text: "我要開動了！(大吃)", mood: "happy" },
            { speaker: "旁白", text: "就這樣，肥肥和鼻屎在天上守護著大家，腳皮繼續在地上氣噗噗地生活。這就是最棒的結局。", mood: "peace" },
            { speaker: "結局畫面", text: "[顯示全體大合照：肥肥鼻屎有光環，大家靠在一起睡覺]", visual: "ending_cg" }
        ]
    }
];
