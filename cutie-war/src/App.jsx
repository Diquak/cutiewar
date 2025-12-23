import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Team from './pages/Team';
import Gacha from './pages/Gacha';
import About from './pages/About';
import Chat from './pages/Chat';
import Adventure from './pages/Adventure';

function App() {
    const [page, setPage] = useState('home');

    return (
        <div className="h-screen w-screen overflow-hidden bg-[#fdf6e3] text-gray-800">
            {/* Page Content */}
            <main className="w-full max-w-md mx-auto h-full bg-opacity-50 relative">
                {page === 'home' && <Home navigate={setPage} />}
                {page === 'team' && <Team />}
                {page === 'gacha' && <Gacha />}
                {page === 'about' && <About />}
                {page === 'chat' && <Chat />}
                {page === 'adventure' && <Adventure onBack={() => setPage('home')} />}
            </main>

            {/* Navigation - Always visible except in Adventure maybe? Spec says "Even if back is pressed..." */}
            {/* Spec: "Adventure: ... Even if pressed back..." implies Adventure might be full screen or have its own back. */}
            {/* Usually Adventure hides the nav to focus on game. */}
            {page !== 'adventure' && <Navbar currentParams={page} navigate={setPage} />}
        </div>
    );
}

export default App;
