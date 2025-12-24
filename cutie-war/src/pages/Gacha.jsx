import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CHARACTERS } from '../data/characters';
import { Gift, Sparkles, ArrowLeft } from 'lucide-react';

export default function Gacha({ onBack }) {
    const { coins, addCoins, unlockedCharacters } = useGameStore();
    const [isPulling, setIsPulling] = useState(false);
    const [result, setResult] = useState(null);

    const COST = 100;

    // 抽卡池：只包含已解鎖的夥伴角色（不包含敵人）
    const getGachaPool = () => {
        // 只從 CHARACTERS 裡挑已解鎖的
        return unlockedCharacters.filter(id => CHARACTERS[id]);
    };

    const handlePull = () => {
        const pool = getGachaPool();

        if (pool.length === 0) {
            alert("還沒有可抽的角色！先去冒險解鎖夥伴吧！");
            return;
        }

        if (coins < COST) {
            alert("金幣不足！(去冒險賺錢吧)");
            return;
        }

        setIsPulling(true);
        setResult(null);
        addCoins(-COST);

        setTimeout(() => {
            // 從已解鎖的角色池中隨機抽取
            const randomId = pool[Math.floor(Math.random() * pool.length)];
            setResult(CHARACTERS[randomId]);
            setIsPulling(false);
        }, 1500);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header with Back Button */}
            <div className="p-4 flex items-center gap-4 shrink-0">
                <button onClick={onBack} className="p-2 border-2 border-black hover:bg-gray-100 active:translate-y-1">
                    <ArrowLeft size={16} />
                </button>
                <h2 className="text-lg font-bold text-amber-800">抽卡</h2>
                <div className="ml-auto bg-white px-4 py-2 border-4 border-black shadow-pixel">
                    <span className="text-lg font-bold text-yellow-600">🪙 {coins}</span>
                </div>
            </div>

            {/* Content Area - 可滾動 */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="flex flex-col items-center justify-start space-y-4 min-h-full">
                    {/* 抽獎箱 */}
                    <div className={`relative transition-all duration-500 shrink-0 ${isPulling ? 'scale-110 animate-pulse' : ''}`}>
                        <img src="/images/gacha_box.PNG" alt="Gacha Box" className="w-40 pixel-art filter drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
                            onError={(e) => e.target.src = 'https://placehold.co/200x200?text=Box'}
                        />
                        {isPulling && <Sparkles className="absolute top-0 left-0 text-yellow-400 animate-spin w-full h-full opacity-50" />}
                    </div>

                    {/* 結果顯示 */}
                    {result && !isPulling && (
                        <div className="bg-white p-4 border-4 border-black shadow-pixel-lg flex flex-col items-center shrink-0">
                            <h3 className="text-base font-bold mb-2 text-amber-600">✨ 今日的夥伴 ✨</h3>
                            <img src={result.image} className="w-20 h-20 object-contain pixel-art mb-2" />
                            <p className="text-base font-black text-gray-800">{result.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{result.role}</p>
                        </div>
                    )}

                    {/* 抽獎按鈕 */}
                    <button
                        onClick={handlePull}
                        disabled={isPulling}
                        className="shrink-0 bg-purple-600 hover:bg-purple-700 text-white text-sm font-bold py-3 px-6 border-4 border-black shadow-pixel active:shadow-none active:translate-y-1 disabled:opacity-50 flex items-center gap-2 transition-none"
                    >
                        <Gift size={18} />
                        {isPulling ? "抽取中..." : `欣賞夥伴 (${COST} 🪙)`}
                    </button>

                    <p className="text-[10px] text-gray-500 text-center max-w-xs leading-relaxed shrink-0 pb-4">
                        * 隨機展示你已解鎖的夥伴，金幣請到冒險模式獲取！
                    </p>
                </div>
            </div>
        </div>
    );
}
