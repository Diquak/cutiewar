import React, { useRef } from 'react';
import { useGameStore } from '../store/useGameStore';
import { Download, Upload, Trash2, Heart, ArrowLeft } from 'lucide-react';

export default function About({ onBack }) {
    const { importSave, resetProgress } = useGameStore();
    const fileInputRef = useRef(null);

    const handleExport = () => {
        const data = localStorage.getItem('cutie-war-storage');
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cutie-war-save-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
    };

    const handleImport = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const json = JSON.parse(event.target.result);
                if (json.state) {
                    importSave(json.state);
                    alert("存檔載入成功！");
                } else {
                    alert("無效的存檔格式");
                }
            } catch (err) {
                alert("讀取代碼失敗");
            }
        };
        reader.readAsText(file);
    };

    return (
        <div className="h-full flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center gap-4 shrink-0">
                <button onClick={onBack} className="p-2 border-2 border-black hover:bg-gray-100 active:translate-y-1">
                    <ArrowLeft size={16} />
                </button>
                <h2 className="text-lg font-bold text-amber-800">關於</h2>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-6">
                <div className="bg-white p-6 border-4 border-black shadow-pixel relative">
                    <div className="absolute -top-3 -left-3 bg-pink-400 border-4 border-black w-8 h-8 flex items-center justify-center">
                        <Heart className="fill-white text-white w-4 h-4" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 mb-4 ml-4">關於 Cutie War</h2>

                    <div className="text-xs leading-loose text-gray-600 space-y-4 font-mono">
                        <p>
                            謝謝您的遊玩！本遊戲旨在透過可愛動物與食物怪獸的打鬥中，希望讓玩家被療癒。
                        </p>
                        <div className="bg-pink-50 p-4 border-4 border-pink-200">
                            <p>「謹以此遊戲紀念去當小天使的 肥肥 (Buibui) 與 鼻屎 (Pesai)。謝謝你們曾帶來的歡笑。」</p>
                        </div>
                        <p>
                            特別介紹：還有現在陪伴在我身邊的 腳皮 (Kaphue)。想讓大家知道，氣噗噗的饅頭蛙是有多麼可愛！
                        </p>
                        <p className="text-right text-[10px] font-bold text-pink-500 mt-4">Made with Love.</p>
                    </div>
                </div>

                <div className="bg-white p-6 border-4 border-black shadow-pixel space-y-4">
                    <h3 className="font-bold text-gray-800 text-sm border-b-4 border-gray-200 pb-2">存檔管理</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={handleExport} className="flex flex-col items-center justify-center p-4 bg-blue-50 border-4 border-black hover:bg-blue-100 active:translate-y-1 active:shadow-none transition-none">
                            <Download className="text-blue-500 mb-2" />
                            <span className="text-[10px] font-bold text-gray-600">匯出回憶</span>
                        </button>

                        <button onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center justify-center p-4 bg-green-50 border-4 border-black hover:bg-green-100 active:translate-y-1 active:shadow-none transition-none">
                            <Upload className="text-green-500 mb-2" />
                            <span className="text-[10px] font-bold text-gray-600">匯入回憶</span>
                            <input ref={fileInputRef} type="file" hidden accept=".json" onChange={handleImport} />
                        </button>
                    </div>

                    <button onClick={() => { if (confirm("確定要重置所有進度嗎？無法復原！")) resetProgress(); }} className="w-full p-4 bg-red-100 border-4 border-black text-red-600 font-bold flex items-center justify-center gap-2 hover:bg-red-200 active:translate-y-1 transition-none">
                        <Trash2 size={16} />
                        <span className="text-xs">重置進度</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
