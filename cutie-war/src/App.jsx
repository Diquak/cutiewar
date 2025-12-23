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

    // Check if current page is adventure
    const isAdventure = page === 'adventure';

    return (
        <div className={clsx(
            "h-screen w-screen overflow-hidden text-gray-800 transition-colors duration-500",
            isAdventure ? "bg-black" : "bg-[#fdf6e3]"
        )}>
            {/* Page Content */}
            <main className={clsx(
                "h-full relative mx-auto transition-all duration-500 ease-in-out",
                isAdventure ? "w-full max-w-none" : "w-full max-w-md bg-opacity-50"
            )}>
                {page === 'home' && <Home navigate={setPage} />}
                {page === 'team' && <Team />}
                {page === 'gacha' && <Gacha />}
                {page === 'about' && <About />}
                {page === 'chat' && <Chat />}
                {page === 'adventure' && <Adventure onBack={() => setPage('home')} />}
            </main>

            {/* Navigation - Hidden in Adventure Mode */}
            {!isAdventure && <Navbar currentParams={page} navigate={setPage} />}
        </div>
    );
}

export default App;
