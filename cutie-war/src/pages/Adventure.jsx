import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { FULL_STORY_SCRIPT, ENEMIES } from '../data/story'; // Wait, ENEMIES are in characters.js in my thought but I put them in data/characters.js? Let me check characters.js content.
// I put ENEMIES in characters.js export.
import { CHARACTERS, ENEMIES } from '../data/characters';
import { FULL_STORY_SCRIPT } from '../data/story';
import { ArrowLeft, Sword, Zap, Heart } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

export default function Adventure({ onBack }) {
    const { currentChapterId, unlockedCharacters, isGameCleared, advanceChapter } = useGameStore();

    // === State ===
    // Mode: 'menu' (Free Mode only), 'intro', 'battle', 'outro', 'complete'
    const [mode, setMode] = useState(isGameCleared ? 'menu' : 'intro');
    const [activeScript, setActiveScript] = useState(null);
    const [dialogueIndex, setDialogueIndex] = useState(0);

    // Battle State
    const [battleState, setBattleState] = useState(null);
    const [logs, setLogs] = useState([]);

    // Initialize Script based on Chapter
    useEffect(() => {
        if (!isGameCleared) {
            const script = FULL_STORY_SCRIPT.find(s => s.chapterId === currentChapterId);
            if (script) {
                setActiveScript(script);
                setMode('intro');
            } else {
                console.error("Chapter not found!");
            }
        }
    }, [currentChapterId, isGameCleared]);

    // === Handlers ===

    const startFreeBattle = () => {
        // Random Enemy
        const enemyKeys = Object.keys(ENEMIES);
        const randomKey = enemyKeys[Math.floor(Math.random() * enemyKeys.length)];
        const enemy = ENEMIES[randomKey];

        setActiveScript({
            title: "自由對戰",
            background: "/images/bg_garden.png",
            introDialogue: [],
            battle: { enemyId: randomKey, enemyName: enemy.name, hp: enemy.hp * 1.5 }, // Buffer HP for fun
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
                setMode('battle');
            } else {
                // Outro End -> Complete
                if (!isGameCleared) {
                    advanceChapter(); // This might trigger re-render and useEffect logic for next chapter
                }
                setMode('complete');
            }
            setDialogueIndex(0);
        }
    };

    if (mode === 'menu') {
        return (
            <div className="h-full flex flex-col items-center justify-center space-y-8 p-6 bg-[url('/images/bg_home.png')] bg-cover">
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

        // Safety check
        if (!currentLine) {
            // Should not happen, but if empty dialogue list:
            if (mode === 'intro') setMode('battle');
            else setMode('complete');
            return null;
        }

        return (
            <div
                className="h-full relative overflow-hidden flex flex-col bg-black font-pixel"
                onClick={handleDialogueNext}
            >
                {/* Background */}
                <img src={activeScript.background} className="absolute inset-0 w-full h-full object-cover opacity-80" />

                {/* Character Speaker Image (If exists in CHARACTERS or ENEMIES) */}
                {/* Trying to match speaker name to ID is hard. We can map some known ones or just hide image if not found */}
                {/* For simplicity in VN, we rely on the Dialogue Box mainly, unless speaker is '肥肥 Buibui' which maps to 'buibui' */}

                {/* Dialogue Box */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="bg-white border-4 border-black p-6 shadow-pixel min-h-[160px] animate-bounce-in">
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
        return (
            <BattleScene
                enemyConfig={activeScript.battle}
                unlockedCharacters={unlockedCharacters}
                onWin={() => setMode('outro')}
                onLose={() => { alert("戰鬥失敗！請強化隊伍後再來。(其實重來就好)"); onBack(); }}
            />
        )
    }

    if (mode === 'complete') {
        return (
            <div className="h-full flex flex-col items-center justify-center bg-yellow-50 space-y-6 p-6 from-yellow-100 to-white bg-gradient-to-b">
                <h2 className="text-2xl font-black text-yellow-600">CHAPTER CLEAR!</h2>
                <div className="text-6xl animate-bounce">⭐</div>
                <button onClick={onBack} className="bg-amber-500 text-black border-4 border-black px-8 py-3 font-bold shadow-pixel hover:bg-amber-600 active:translate-y-1 active:shadow-none transition-none">
                    回到首頁
                </button>
            </div>
        )
    }

    return null;
}

// === Battle Component ===

function BattleScene({ enemyConfig, unlockedCharacters, onWin, onLose }) {
    // Init Battle State
    // Combatants: 'player-id', 'enemy'
    const [combatants, setCombatants] = useState({});
    const [turnOrder, setTurnOrder] = useState([]);
    const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
    const [logs, setLogs] = useState([]);
    const [animating, setAnimating] = useState(false); // Block input during animations

    // Initial Setup
    useEffect(() => {
        const initialCombatants = {};

        // Add Player Team
        unlockedCharacters.forEach(id => {
            const char = CHARACTERS[id];
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
                status: 'idle' // idle, attack, hit, dead
            };
        });

        // Add Enemy
        // Enemy stats from ENEMIES + Config overrides
        const enemyBase = ENEMIES[enemyConfig.enemyId];
        initialCombatants['enemy'] = {
            id: 'enemy',
            name: enemyConfig.enemyName,
            hp: enemyConfig.hp || enemyBase.hp,
            maxHp: enemyConfig.hp || enemyBase.hp,
            atk: enemyBase.atk,
            def: 10, // Default DEF for enemy
            spd: 12, // Default SPD for enemy
            image: enemyBase.image,
            isEnemy: true,
            status: 'idle'
        };

        setCombatants(initialCombatants);

        // Sort Turn Order
        const order = Object.values(initialCombatants)
            .sort((a, b) => b.spd - a.spd)
            .map(c => c.id);

        setTurnOrder(order);
        addLog("戰鬥開始！");
    }, []);

    const addLog = (msg) => setLogs(prev => [msg, ...prev].slice(0, 3));

    // Turn Loop Effect
    useEffect(() => {
        if (turnOrder.length === 0 || animating) return;

        const currentId = turnOrder[currentTurnIdx];
        const actor = combatants[currentId];

        // Check if dead
        if (actor.hp <= 0) {
            nextTurn();
            return;
        }

        // Enemy AI
        if (actor.isEnemy) {
            setAnimating(true);
            setTimeout(() => {
                // Determine target (Random alive player)
                const candidates = Object.values(combatants).filter(c => !c.isEnemy && c.hp > 0);
                if (candidates.length === 0) {
                    onLose();
                    return;
                }
                const target = candidates[Math.floor(Math.random() * candidates.length)];
                executeAttack(actor, target);
            }, 1000); // Think time
        }

    }, [currentTurnIdx, animating, combatants, turnOrder]);

    const nextTurn = () => {
        // Check Win/Loss conditions
        const enemy = combatants['enemy'];
        const players = Object.values(combatants).filter(c => !c.isEnemy && c.hp > 0);

        if (enemy.hp <= 0) {
            setTimeout(onWin, 1000);
            return;
        }
        if (players.length === 0) {
            setTimeout(onLose, 1000);
            return;
        }

        setCurrentTurnIdx(prev => (prev + 1) % turnOrder.length);
        setAnimating(false);
    };

    const executeAttack = (attacker, target) => {
        // 1. Animation Start (Translate)
        setCombatants(prev => ({
            ...prev,
            [attacker.id]: { ...prev[attacker.id], status: 'attack' }
        }));

        setTimeout(() => {
            // 2. Calc Damage
            // Formula: Math.max(1, Math.floor((Attacker.ATK - Target.DEF * 0.2) * (Math.random() * 0.2 + 0.9)))
            const dmg = Math.max(1, Math.floor(
                (attacker.atk - target.def * 0.2) * (Math.random() * 0.2 + 0.9)
            ));

            addLog(`${attacker.name} 攻擊了 ${target.name}，造成 ${dmg} 點傷害！`);

            // 3. Apply Damage & Hit Anim
            setCombatants(prev => ({
                ...prev,
                [attacker.id]: { ...prev[attacker.id], status: 'idle' }, // Reset attacker
                [target.id]: {
                    ...prev[target.id],
                    hp: Math.max(0, prev[target.id].hp - dmg),
                    status: 'hit',
                    popup: dmg
                }
            }));

            // 4. Cleanup
            setTimeout(() => {
                setCombatants(prev => ({
                    ...prev,
                    [target.id]: { ...prev[target.id], status: 'idle', popup: null }
                }));
                nextTurn();
            }, 800); // Hit duration

        }, 500); // Attack dash duration
    };

    const handlePlayerAction = (type) => { // type: 'attack' | 'heal'
        setAnimating(true);
        const attackerId = turnOrder[currentTurnIdx];
        const attacker = combatants[attackerId];
        const target = combatants['enemy']; // Always single enemy for now

        if (type === 'attack') {
            executeAttack(attacker, target);
        } else {
            // Heal logic (Simplified: Heal Self or All?)
            // Spec: Daifuku has Heal
            const healAmount = 30;
            addLog(`${attacker.name} 唱出了治癒之歌！全員恢復 ${healAmount} HP`);

            setCombatants(prev => {
                const updated = { ...prev, [attacker.id]: { ...prev[attacker.id], status: 'attack' } };

                // Heal everyone
                Object.keys(updated).forEach(key => {
                    if (!updated[key].isEnemy && updated[key].hp > 0) {
                        updated[key].hp = Math.min(updated[key].maxHp, updated[key].hp + healAmount);
                        updated[key].popup = `+${healAmount}`; // Green? Handle via CSS
                    }
                });
                return updated;
            });

            setTimeout(() => {
                setCombatants(prev => { // Clear Anims
                    const clean = { ...prev };
                    Object.keys(clean).forEach(key => {
                        clean[key].status = 'idle';
                        clean[key].popup = null;
                    });
                    return clean;
                });
                nextTurn();
            }, 1000);
        }
    };

    const currentActorId = turnOrder[currentTurnIdx];
    const isPlayerTurn = !combatants[currentActorId]?.isEnemy && !animating;

    return (
        <div className="h-full flex flex-col bg-[url('/images/bg_garden.png')] bg-cover relative">
            {/* Battle Area */}
            <div className="flex-1 relative mt-[20%]">
                {/* Enemy */}
                {combatants['enemy'] && (
                    <div className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
                        <CharacterSprite char={combatants['enemy']} />
                        <HealthBar current={combatants['enemy'].hp} max={combatants['enemy'].maxHp} />
                    </div>
                )}

                {/* Player Team */}
                <div className="absolute bottom-32 w-full flex justify-center gap-4 px-4 flex-wrap">
                    {Object.values(combatants).filter(c => !c.isEnemy).map(c => (
                        <div key={c.id} className={clsx("flex flex-col items-center transition-all", c.hp <= 0 && "opacity-50 grayscale")}>
                            <div className={c.id === currentActorId ? "mb-2 animate-bounce text-yellow-500 font-bold" : "opacity-0 mb-2"}>
                                ▼
                            </div>
                            <CharacterSprite char={c} isActor={c.id === currentActorId} />
                            <HealthBar current={c.hp} max={c.maxHp} compressed />
                        </div>
                    ))}
                </div>
            </div>

            {/* UI Controls */}
            <div className="bg-white/95 h-1/3 border-t-4 border-black shadow-2xl p-6 flex flex-col gap-4">
                {/* Logs */}
                <div className="h-16 overflow-hidden text-xs font-mono text-gray-500 space-y-1 border-b-2 border-dashed border-gray-400 pb-2">
                    {logs.map((L, i) => <p key={i}>{L}</p>)}
                </div>

                {/* Actions */}
                {isPlayerTurn ? (
                    <div className="grid grid-cols-2 gap-4 h-full">
                        <button
                            onClick={() => handlePlayerAction('attack')}
                            className="bg-red-500 hover:bg-red-600 text-white border-4 border-black shadow-pixel active:shadow-none active:translate-y-1 font-bold text-sm flex flex-col items-center justify-center gap-1 transition-none"
                        >
                            <Sword size={20} /> 攻擊
                        </button>
                        <button
                            onClick={() => handlePlayerAction('heal')} // Just treating 2nd button as Skill for now
                            className="bg-blue-500 hover:bg-blue-600 text-white border-4 border-black shadow-pixel active:shadow-none active:translate-y-1 font-bold text-sm flex flex-col items-center justify-center gap-1 transition-none"
                        >
                            <Zap size={20} /> 技能
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 font-bold animate-pulse">
                        {combatants[currentActorId]?.isEnemy ? "敵方回合..." : "等待中..."}
                    </div>
                )}
            </div>
        </div>
    )
}

function CharacterSprite({ char, isActor }) {
    const isAttack = char.status === 'attack';
    const isHit = char.status === 'hit';

    return (
        <div className="relative">
            <motion.img
                src={char.image}
                className={clsx(
                    "w-20 h-20 object-contain pixel-art",
                    isActor && "scale-110 drop-shadow-md"
                )}
                animate={{
                    x: isAttack ? (char.isEnemy ? -50 : 50) : 0,
                    x: isHit ? [0, -5, 5, -5, 5, 0] : 0, // Shake
                    filter: isHit ? "brightness(2) sepia(1) hue-rotate(-50deg) saturate(5)" : "none" // Flash Red-ish
                }}
                transition={{ duration: 0.3 }}
            />
            <AnimatePresence>
                {char.popup && (
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 0, y: -30 }}
                        exit={{ opacity: 0 }}
                        className={clsx(
                            "absolute -top-10 left-1/2 -translate-x-1/2 text-2xl font-black drop-shadow-md",
                            char.popup.toString().includes('+') ? "text-green-500" : "text-red-500"
                        )}
                    >
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
        <div className={clsx("w-full bg-gray-200 border-2 border-black overflow-hidden mt-1", compressed ? "h-2 w-16" : "h-4 w-32")}>
            <div
                className={clsx("h-full transition-all duration-300", pct < 30 ? "bg-red-500" : "bg-green-500")}
                style={{ width: `${pct}%` }}
            />
        </div>
    )
}
