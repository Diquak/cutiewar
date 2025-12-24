import React, { useState, useEffect } from 'react';
import { useGameStore } from '../store/useGameStore';
import { CHARACTERS } from '../data/characters';
import { Swords, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import Particles from '../components/Particles';

export default function Home({ navigate }) {
    const { coins, unlockedCharacters, currentChapterId, isGameCleared } = useGameStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    // 自動輪播
    useEffect(() => {
        if (unlockedCharacters.length <= 1) return;
        const timer = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % unlockedCharacters.length);
        }, 3000);
        return () => clearInterval(timer);
    }, [unlockedCharacters.length]);

    const currentCharId = unlockedCharacters[currentIndex] || unlockedCharacters[0];
    const currentChar = CHARACTERS[currentCharId];

    const goNext = () => setCurrentIndex(prev => (prev + 1) % unlockedCharacters.length);
    const goPrev = () => setCurrentIndex(prev => (prev - 1 + unlockedCharacters.length) % unlockedCharacters.length);

    return (
        <div className="w-full h-full bg-[url('/images/bg_home.png')] bg-cover bg-center relative overflow-hidden flex items-center justify-center">
            {/* Background Particles */}
            <Particles />

            <div className="grid grid-cols-2 w-full max-w-6xl gap-12 items-center px-12 relative z-10 -mt-20">

                {/* Left Column: Character Carousel */}
                <div className="flex flex-col items-center justify-center">
                    <div className="relative w-96 h-96 bg-white rounded-none shadow-pixel border-8 border-black flex items-center justify-center">
                        {/* 左右切換按鈕 */}
                        {unlockedCharacters.length > 1 && (
                            <>
                                <button
                                    onClick={goPrev}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 border-2 border-black z-10"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={goNext}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 border-2 border-black z-10"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}

                        {/* 角色圖片 */}
                        <img
                            key={currentCharId}
                            src={currentChar?.image}
                            alt={currentChar?.name}
                            className="w-64 h-64 object-contain pixel-art animate-bounce-hover"
                        />

                        {/* 角色名稱與職業 */}
                        <div className="absolute -bottom-10 bg-amber-100 px-6 py-2 border-4 border-black shadow-pixel text-center">
                            <p className="text-lg font-bold text-amber-800">{currentChar?.name}</p>
                            <p className="text-xs text-amber-600">{currentChar?.role}</p>
                        </div>

                        {/* 輪播指示器 */}
                        {unlockedCharacters.length > 1 && (
                            <div className="absolute -bottom-20 flex gap-2">
                                {unlockedCharacters.map((_, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentIndex(idx)}
                                        className={`w-3 h-3 border-2 border-black transition-colors ${idx === currentIndex ? 'bg-amber-500' : 'bg-white'}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column: Title & Actions */}
                <div className="flex flex-col items-start space-y-12 pl-12">
                    {/* Title */}
                    <div>
                        <h1 className="text-7xl font-black text-amber-800 tracking-wider leading-tight drop-shadow-md">CUTIE WAR</h1>
                        <p className="text-3xl text-amber-900 font-bold mt-4 tracking-widest">萌寵大戰甜點怪</p>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-8">
                        <div className="bg-yellow-100 px-8 py-5 rounded-none border-4 border-black shadow-pixel flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
                            <span className="text-3xl">🪙</span>
                            <span className="text-3xl font-bold text-yellow-800">{coins}</span>
                        </div>
                        <div className="bg-blue-100 px-8 py-5 rounded-none border-4 border-black shadow-pixel flex items-center gap-4 transform hover:-translate-y-1 transition-transform">
                            <Star size={32} className="text-blue-500 fill-current" />
                            <span className="text-3xl font-bold text-blue-800">{unlockedCharacters.length}/{Object.keys(CHARACTERS).length}</span>
                        </div>
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={() => navigate('adventure')}
                        className="w-full max-w-md bg-red-500 hover:bg-red-600 text-white text-2xl font-bold py-10 px-8 rounded-none btn-pixel flex items-center justify-center gap-6 group"
                    >
                        <Swords size={40} className="group-hover:rotate-12 transition-transform" />
                        {isGameCleared ? "自由對戰 (Free)" : `第 ${currentChapterId} 章：冒險開始`}
                    </button>

                    {isGameCleared && (
                        <p className="text-green-600 text-xl font-bold animate-pulse bg-white/90 px-6 py-3 border-4 border-black rounded-full shadow-pixel">
                            🎉 恭喜通關！開啟自由對戰模式
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
