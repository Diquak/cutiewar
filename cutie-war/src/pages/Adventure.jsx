import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CHARACTERS, ENEMIES } from '../data/characters';
import { FULL_STORY_SCRIPT } from '../data/story';
import { ArrowLeft, Sword, Zap, Heart } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Adventure({ onBack }) {
    const { currentChapterId, unlockedCharacters, isGameCleared, advanceChapter, unlockCharacter, addCoins } = useGameStore();

    // === State ===
    const [mode, setMode] = useState(isGameCleared ? 'menu' : 'intro');
    const [activeScript, setActiveScript] = useState(null);
    const [dialogueIndex, setDialogueIndex] = useState(0);

    // Initialize Script based on Chapter
    useEffect(() => {
        // Safety: Ensure at least one character is unlocked
        if (!unlockedCharacters || unlockedCharacters.length === 0) {
            console.warn("Adventure: No characters found, unlocking Buibui");
            unlockCharacter('buibui');
        }

        // Recover missing characters if in Chapter 3+
        if (currentChapterId >= 3 && unlockedCharacters.length === 1) {
            ['frogs', 'amao', 'atu', 'daifuku', 'mochi'].forEach(id => unlockCharacter(id));
        }

        if (!isGameCleared) {
            const script = FULL_STORY_SCRIPT.find(s => s.chapterId === currentChapterId);
            if (script) {
                setActiveScript(script);
                setMode('intro');
            } else {
                console.error("Adventure: Chapter not found! ID:", currentChapterId);
                // Fallback: If chapter not found, start Ch1 or random battle to prevent black screen
                const fallbackScript = FULL_STORY_SCRIPT[0];
                if (fallbackScript) {
                    setActiveScript(fallbackScript);
                    setMode('intro');
                } else {
                    setMode('menu');
                }
            }
        }
    }, [currentChapterId, isGameCleared, unlockedCharacters]);

    // === Handlers ===

    const startFreeBattle = () => {
        const enemyKeys = Object.keys(ENEMIES);
        const randomKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
        const enemy = ENEMIES[randomKey];

        setActiveScript({
            title: "自由對戰",
            background: "/images/bg_garden.png",
            introDialogue: [],
            battle: { enemyId: randomKey, enemyName: enemy.name, hp: enemy.hp * 1.5 },
            outroDialogue: [{ speaker: "系統", text: "戰鬥勝利！獲得 50 金幣。" }]
        });
        setMode('battle');
    };

    const handleDialogueNext = () => {
        if (!activeScript) return;
        const currentList = mode === 'intro' ? activeScript.introDialogue : activeScript.outroDialogue;

        if (dialogueIndex < currentList.length - 1) {
            setDialogueIndex(prev => prev + 1);
        } else {
            // Dialogue End
            if (mode === 'intro') {
                if (unlockedCharacters.length === 0) {
                    console.warn("Adventure: Empty team detected before battle, auto-unlocking Buibui");
                    unlockCharacter('buibui');
                }
                setMode('battle');
            } else {
                // Outro End -> Chapter Logic
                if (!isGameCleared) {
                    // ★ 分章節解鎖角色
                    if (activeScript.chapterId === 1) {
                        // 第1章通關：阿毛加入 (為了第2章做準備)
                        unlockCharacter('amao');
                    } else if (activeScript.chapterId === 2) {
                        // 第2章通關：其他夥伴全部加入 (為了第3章打魔王)
                        ['atu', 'daifuku', 'mochi'].forEach(id => unlockCharacter(id));
                    }
                    // 注意：advanceChapter() 移到 complete 畫面的按鈕
                }
                setMode('complete');
            }
            setDialogueIndex(0);
        }
    };

    // Helper to find character image for dialogue
    const getSpeakerImage = (speakerName) => {
        const charKey = Object.keys(CHARACTERS).find(k => speakerName.includes(CHARACTERS[k].name) || CHARACTERS[k].name.includes(speakerName.split(' ')[0]));
        if (charKey) return CHARACTERS[charKey].image;

        const enemyKey = Object.keys(ENEMIES).find(k => speakerName.includes(ENEMIES[k].name));
        if (enemyKey) return ENEMIES[enemyKey].image;

        return null;
    };

    if (!activeScript && mode !== 'menu') {
        return <div className="h-full flex items-center justify-center font-pixel text-white bg-black">Loading... (Script: {activeScript ? 'Yes' : 'No'}, Mode: {mode})</div>;
    }

    if (mode === 'menu') {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-8 p-6 bg-[url('/images/bg_home.png')] bg-cover bg-center">
                <div className="bg-white/90 p-8 border-4 border-black shadow-pixel text-center space-y-4">
                    <h1 className="text-xl font-black text-amber-800">自由模式</h1>
                    <p className="text-xs text-gray-600">恭喜通關！盡情享受戰鬥吧。</p>
                    <button onClick={startFreeBattle} className="w-full bg-red-500 text-white py-4 font-bold hover:bg-red-600 flex items-center justify-center gap-2 border-4 border-black shadow-pixel active:translate-y-1 active:shadow-none transition-none">
                        <Sword /> 開始隨機戰鬥
                    </button>
                    <button onClick={onBack} className="w-full bg-gray-200 text-gray-700 py-3 font-bold border-4 border-black shadow-pixel active:translate-y-1 active:shadow-none transition-none">
                        返回首頁
                    </button>
                </div>
            </div>
        )
    }

    if (mode === 'intro' || mode === 'outro') {
        const dialogueList = mode === 'intro' ? activeScript?.introDialogue : activeScript?.outroDialogue;
        const currentLine = dialogueList ? dialogueList[dialogueIndex] : null;

        if (!currentLine) return <div>Error</div>;

        const speakerImg = getSpeakerImage(currentLine.speaker);

        return (
            <div
                className="h-full relative overflow-hidden flex flex-col bg-black font-pixel"
                onClick={handleDialogueNext}
            >
                <img src={activeScript.background} className="absolute inset-0 w-full h-full object-cover opacity-60" />

                {/* Speaker Image */}
                {speakerImg && (
                    <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10">
                        <img
                            src={speakerImg}
                            className="w-64 h-64 object-contain pixel-art drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] animate-bounce-hover"
                        />
                    </div>
                )}

                {/* Dialogue Box */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="bg-white border-4 border-black p-6 shadow-pixel min-h-[160px] animate-bounce-in relative">
                        <button onClick={(e) => { e.stopPropagation(); onBack(); }} className="absolute -top-4 -right-2 bg-gray-200 text-xs px-2 py-1 border-2 border-black">
                            Exit
                        </button>

                        <div className="flex items-center justify-between mb-2">
                            <span className="font-black text-amber-800 text-sm bg-amber-100 px-3 py-1 border-2 border-black">
                                {currentLine.speaker}
                            </span>
                        </div>
                        <p className="text-gray-800 text-sm font-medium leading-loose font-mono">
                            {currentLine.text}
                        </p>
                        <p className="text-right text-[10px] text-gray-400 mt-2 font-bold animate-pulse">▼ 點擊繼續</p>
                    </div>
                </div>
            </div>
        )
    }

    if (mode === 'battle') {
        const battleSquad = (unlockedCharacters && unlockedCharacters.length > 0)
            ? unlockedCharacters
            : ['buibui'];

        if (!activeScript?.battle) {
            console.error("Adventure: Missing battle config");
            return <div className="p-4 text-white bg-red-800 font-pixel">Error: Battle Configuration Missing</div>;
        }

        return (
            <BattleScene
                enemyConfig={activeScript.battle}
                unlockedCharacters={battleSquad}
                onWin={() => { addCoins(50); setMode('outro'); }}
                onLose={() => { alert("戰鬥失敗！"); onBack(); }}
                onRun={onBack}
            />
        )
    }

    if (mode === 'complete') {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-yellow-50 space-y-6 p-6 from-yellow-100 to-white bg-gradient-to-b">
                <h2 className="text-2xl font-black text-yellow-600">CHAPTER CLEAR!</h2>
                <div className="text-6xl animate-bounce">⭐</div>
                <button onClick={() => { if (!isGameCleared) advanceChapter(); onBack(); }} className="bg-amber-500 text-black border-4 border-black px-8 py-3 font-bold shadow-pixel hover:bg-amber-600 active:translate-y-1 active:shadow-none transition-none">
                    回到首頁
                </button>
            </div>
        )
    }

    return null;
}

// === Battle Component ===

function BattleScene({ enemyConfig, unlockedCharacters, onWin, onLose, onRun }) {
    // 1. All Hook Definitions (Must be at the top, unconditional)
    const [combatants, setCombatants] = useState({});
    const [turnOrder, setTurnOrder] = useState([]);
    const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
    const [logs, setLogs] = useState([]);
    const [animating, setAnimating] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    const addLog = (msg) => setLogs(prev => [msg, ...prev].slice(0, 3));

    // 2. Helper Functions (Defined before they are used in Effects)
    const nextTurn = () => {
        setCombatants(currentCombatants => {
            const enemy = currentCombatants['enemy'];
            const players = Object.values(currentCombatants).filter(c => !c.isEnemy && c.hp > 0);

            if (!enemy || enemy.hp <= 0) { setTimeout(onWin, 1000); return currentCombatants; }
            if (players.length === 0) { setTimeout(onLose, 1000); return currentCombatants; }

            return currentCombatants;
        });
        setCurrentTurnIdx(prev => (prev + 1) % (turnOrder.length || 1));
        setAnimating(false);
    };

    const executeAttack = (attacker, target) => {
        setCombatants(prev => ({ ...prev, [attacker.id]: { ...prev[attacker.id], status: 'attack' } }));
        setTimeout(() => {
            const dmg = Math.max(1, Math.floor((attacker.atk - target.def * 0.2) * (Math.random() * 0.2 + 0.9)));
            addLog(`${attacker.name} 攻擊了 ${target.name}，造成 ${dmg} 點傷害！`);
            setCombatants(prev => ({
                ...prev,
                [attacker.id]: { ...prev[attacker.id], status: 'idle' },
                [target.id]: { ...prev[target.id], hp: Math.max(0, prev[target.id].hp - dmg), status: 'hit', popup: dmg }
            }));
            setTimeout(() => {
                setCombatants(prev => ({ ...prev, [target.id]: { ...prev[target.id], status: 'idle', popup: null } }));
                nextTurn();
            }, 800);
        }, 500);
    };

    // 3. Effects (Init and Loop)

    // Initialization Effect
    useEffect(() => {
        if (!enemyConfig) return;

        const initialCombatants = {};
        // Add Player Team
        unlockedCharacters.forEach(id => {
            const char = CHARACTERS[id];
            if (char) {
                initialCombatants[id] = {
                    id,
                    name: char.name,
                    hp: char.stats.hp,
                    maxHp: char.stats.hp,
                    atk: char.stats.atk,
                    def: char.stats.def,
                    spd: char.stats.spd,
                    image: char.image,
                    isEnemy: false,
                    status: 'idle'
                };
            }
        });

        // Add Enemy
        const enemyBase = ENEMIES[enemyConfig.enemyId];
        if (enemyBase) {
            initialCombatants['enemy'] = {
                id: 'enemy',
                name: enemyConfig.enemyName,
                hp: enemyConfig.hp || enemyBase.hp,
                maxHp: enemyConfig.hp || enemyBase.hp,
                atk: enemyBase.atk,
                def: 10,
                spd: 12,
                image: enemyBase.image,
                isEnemy: true,
                status: 'idle'
            };
        }

        setCombatants(initialCombatants);

        const order = Object.values(initialCombatants)
            .sort((a, b) => b.spd - a.spd)
            .map(c => c.id);
        setTurnOrder(order);
        setLogs(["戰鬥開始！"]);
        setIsInitialized(true);
    }, [enemyConfig, unlockedCharacters]);

    // Turn Loop Effect
    useEffect(() => {
        if (!isInitialized || turnOrder.length === 0 || animating) return;
        const currentId = turnOrder[currentTurnIdx];
        const actor = combatants[currentId];

        if (!actor || actor.hp <= 0) {
            nextTurn();
            return;
        }

        if (actor.isEnemy) {
            setAnimating(true);
            setTimeout(() => {
                const candidates = Object.values(combatants).filter(c => !c.isEnemy && c.hp > 0);
                if (candidates.length === 0) { onLose(); return; }
                const target = candidates[Math.floor(Math.random() * candidates.length)];
                executeAttack(actor, target);
            }, 1000);
        }
    }, [currentTurnIdx, animating, combatants, turnOrder, isInitialized]);

    // 4. Handlers (Player Action)
    const handlePlayerAction = (type) => {
        setAnimating(true);
        const attackerId = turnOrder[currentTurnIdx];
        const attacker = combatants[attackerId];
        const target = combatants['enemy'];

        if (type === 'attack') executeAttack(attacker, target);
        else {
            // Heal
            const healAmount = 30;
            addLog(`${attacker.name} 使用技能！全員恢復 ${healAmount} HP`);
            setCombatants(prev => {
                const updated = { ...prev };
                Object.keys(updated).forEach(key => {
                    if (!updated[key].isEnemy && updated[key].hp > 0) {
                        updated[key].hp = Math.min(updated[key].maxHp, updated[key].hp + healAmount);
                        updated[key].popup = `+${healAmount}`;
                    }
                });
                return updated;
            });
            setTimeout(() => {
                setCombatants(prev => {
                    const clean = { ...prev };
                    Object.keys(clean).forEach(key => clean[key].popup = null);
                    return clean;
                });
                nextTurn();
            }, 1000);
        }
    };

    // 5. Conditional Returns (Must be LAST, after all hooks and handler definitions)

    // Error check
    if (!enemyConfig) {
        return <div className="text-red-500 font-bold p-4">Error: Missing Enemy Config</div>;
    }

    // Loading check
    if (!isInitialized || turnOrder.length === 0) {
        return <div className="h-full flex items-center justify-center text-white font-pixel animate-pulse">Loading Battle...</div>;
    }

    // Render Logic
    const currentActorId = turnOrder[currentTurnIdx];
    const currentActor = combatants[currentActorId];
    const isPlayerTurn = currentActor && !currentActor.isEnemy && !animating;

    return (
        <div className="h-full flex flex-col bg-[url('/images/bg_garden.png')] bg-cover relative overflow-hidden">
            {/* Top Bar: Logs & Escape */}
            <div className="bg-black/50 p-2 flex justify-between items-start z-20">
                <div className="text-white text-[10px] font-mono leading-tight h-12 overflow-hidden w-2/3">
                    {logs.map((L, i) => <div key={i}>{L}</div>)}
                </div>
                <button onClick={onRun} className="bg-red-500 text-white text-xs px-3 py-1 border-2 border-white rounded-none">
                    逃跑 (Exit)
                </button>
            </div>

            {/* Battle Area (Horizontal) */}
            <div className="flex-1 flex items-center justify-between px-4 pb-28 relative">
                {/* Players (Left) - 3x2 Grid */}
                <div className="grid grid-cols-3 gap-2 items-end">
                    {Object.values(combatants).filter(c => !c.isEnemy).map(c => (
                        <div key={c.id} className={clsx("relative flex flex-col items-center transition-all", c.hp <= 0 && "opacity-50 grayscale")}>
                            {c.id === currentActorId && <div className="absolute -top-4 text-yellow-400 animate-bounce text-xs">▼</div>}
                            <CharacterSprite char={c} isActor={c.id === currentActorId} small />
                            <HealthBar current={c.hp} max={c.maxHp} compressed />
                        </div>
                    ))}
                </div>

                {/* Enemy (Right) */}
                {combatants['enemy'] && (
                    <div className="flex flex-col items-center mb-20 mr-4">
                        <CharacterSprite char={combatants['enemy']} />
                        <HealthBar current={combatants['enemy'].hp} max={combatants['enemy'].maxHp} />
                    </div>
                )}
            </div>

            {/* Controls (Bottom) */}
            {isPlayerTurn && (
                <div className="absolute bottom-0 w-full bg-white border-t-4 border-black p-4 grid grid-cols-2 gap-4 h-24 z-30 animate-slide-up">
                    <button onClick={() => handlePlayerAction('attack')} className="bg-red-500 text-white border-4 border-black font-bold flex items-center justify-center gap-2 hover:bg-red-600 active:scale-95">
                        <Sword /> 攻擊
                    </button>
                    <button onClick={() => handlePlayerAction('heal')} className="bg-blue-500 text-white border-4 border-black font-bold flex items-center justify-center gap-2 hover:bg-blue-600 active:scale-95">
                        <Zap /> 技能
                    </button>
                    {combatants[currentActorId] && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-yellow-400 px-4 py-1 border-2 border-black text-xs font-bold shadow-pixel">
                            輪到 {combatants[currentActorId].name} 行動
                        </div>
                    )}
                </div>
            )}

            {!isPlayerTurn && (
                <div className="absolute bottom-0 w-full h-12 bg-black/80 flex items-center justify-center text-white font-pixel animate-pulse z-30">
                    對手思考中...
                </div>
            )}
        </div>
    )
}

// ... (CharacterSprite and HealthBar remain slightly same, maybe adjust X translate for horizontal)
function CharacterSprite({ char, isActor, small }) {
    const isAttack = char.status === 'attack';
    const isHit = char.status === 'hit';
    // Adjust attack direction based on side
    const moveX = char.isEnemy ? -50 : (small ? 30 : 50);
    const sizeClass = small ? "w-20 h-20" : "w-32 h-32";

    return (
        <div className="relative">
            <motion.img
                src={char.image}
                className={clsx(sizeClass, "object-contain pixel-art", isActor && "scale-110 drop-shadow-md")}
                animate={{
                    x: isHit ? [0, -5, 5, -5, 5, 0] : (isAttack ? moveX : 0),
                    filter: isHit ? "brightness(2) sepia(1) hue-rotate(-50deg) saturate(5)" : "none"
                }}
                transition={{ duration: 0.3 }}
            />
            <AnimatePresence>
                {char.popup && (
                    <motion.div initial={{ y: 0, opacity: 1 }} animate={{ y: -30, opacity: 0 }} className={clsx("absolute -top-10 left-1/2 -translate-x-1/2 font-black drop-shadow-md", small ? "text-lg" : "text-2xl", char.popup.toString().includes('+') ? "text-green-500" : "text-red-500")}>
                        {char.popup}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function HealthBar({ current, max, compressed }) {
    const pct = Math.max(0, Math.min(100, (current / max) * 100));
    return (
        <div className={clsx("bg-gray-700 border-2 border-black overflow-hidden mt-1", compressed ? "h-2 w-16" : "h-4 w-32")}>
            <div className={clsx("h-full transition-all duration-300", pct < 30 ? "bg-red-500" : "bg-green-500")} style={{ width: `${pct}%` }} />
        </div>
    )
}
