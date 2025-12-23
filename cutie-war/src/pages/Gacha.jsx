import React, { useState } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CHARACTERS } from '../data/characters';
import { Gift, Sparkles } from 'lucide-react';

export default function Gacha() {
    const { coins, addCoins, unlockCharacter } = useGameStore();
    const [isPulling, setIsPulling] = useState(false);
    const [result, setResult] = useState(null);

    const COST = 100;

    const handlePull = () => {
        if (coins < COST) {
            alert("金幣不足！(去冒險賺錢吧)");
            return;
        }

        setIsPulling(true);
        addCoins(-COST);

        setTimeout(() => {
            const charIds = Object.keys(CHARACTERS);
            const randomId = charIds[Math.floor(Math.random() * charIds.length)];

            unlockCharacter(randomId);
            setResult(CHARACTERS[randomId]);
            setIsPulling(false);
        }, 1500);
    };

    return (
        <div className="p-6 pb-24 flex flex-col items-center justify-center min-h-[80vh] space-y-8">
            <div className="bg-white p-4 border-4 border-black shadow-pixel">
                <span className="text-xl font-bold text-yellow-600 flex items-center gap-2">
                    🪙 {coins}
                </span>
            </div>

            <div className={`relative transition-all duration-500 ${isPulling ? 'scale-110 animate-pulse' : ''}`}>
                <img src="/images/gacha_box.PNG" alt="Gacha Box" className="w-64 pixel-art filter drop-shadow-[4px_4px_0_rgba(0,0,0,1)]"
                    onError={(e) => e.target.src = 'https://placehold.co/200x200?text=Box'}
                />
                {isPulling && <Sparkles className="absolute top-0 left-0 text-yellow-400 animate-spin w-full h-full opacity-50" />}
            </div>

            {result && !isPulling && (
                <div className="bg-white p-6 border-4 border-black shadow-pixel-lg flex flex-col items-center animate-bounce">
                    <h3 className="text-lg font-bold text-amber-600 mb-2">獲得！</h3>
                    <img src={result.image} className="w-32 h-32 object-contain pixel-art mb-4" />
                    <p className="text-xl font-black text-gray-800">{result.name}</p>
                </div>
            )}

            <button
                onClick={handlePull}
                disabled={isPulling}
                className="bg-purple-600 hover:bg-purple-700 text-white text-md font-bold py-4 px-8 border-4 border-black shadow-pixel active:shadow-none active:translate-y-1 active:translate-x-1 disabled:opacity-50 flex items-center gap-2 transition-none"
            >
                <Gift size={20} />
                抽一次 ({COST} 🪙)
            </button>

            <p className="text-[10px] text-gray-500 text-center max-w-xs leading-relaxed">
                * 重複角色將轉換為安慰獎金幣 (+100)
            </p>
        </div>
    );
}
