import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Team from './pages/Team';
import Gacha from './pages/Gacha';
import About from './pages/About';
import Chat from './pages/Chat';
import Adventure from './pages/Adventure';
import clsx from 'clsx';

function App() {
    const [page, setPage] = useState('home');
    const [hideNavbar, setHideNavbar] = useState(false);

    // 判斷是否隱藏導航列
    const isAdventure = page === 'adventure';
    const shouldHideNavbar = isAdventure || hideNavbar;

    return (
        // 全局背景：深灰色，用來襯托遊戲視窗，確保置中
        <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center p-4 font-pixel overflow-hidden">

            {/* 遊戲主視窗：保持 1440x1024 比例 (約 1.4:1)，但自動縮放以適應螢幕 */}
            {/* aspect-[1440/1024] 確保比例不變，max-h-[95vh] 確保不超過螢幕高度 */}
            <div className={clsx(
                "relative w-full max-w-[1440px] aspect-[1440/1024] max-h-[95vh] shrink-0 overflow-hidden shadow-2xl transition-colors duration-500 flex flex-col border-8 border-black",
                isAdventure ? "bg-black" : "bg-[#fdf6e3]"
            )}>

                {/* 內容區：佔滿剩餘空間 (扣除下方導覽列) */}
                <main className="flex-1 w-full h-full relative overflow-hidden">
                    {page === 'home' && <Home navigate={setPage} />}
                    {page === 'team' && <Team />}
                    {page === 'gacha' && <Gacha />}
                    {page === 'about' && <About />}
                    {page === 'chat' && <Chat onChatRoomChange={setHideNavbar} />}
                    {page === 'adventure' && <Adventure onBack={() => setPage('home')} />}
                </main>

                {/* 導覽列：固定在遊戲視窗內部的下方 */}
                {!shouldHideNavbar && (
                    <div className="absolute bottom-0 left-0 w-full z-50 pointer-events-none flex justify-center pb-8">
                        <div className="pointer-events-auto">
                            <Navbar currentParams={page} navigate={setPage} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
