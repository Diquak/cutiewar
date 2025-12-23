import React from 'react';
import { motion } from 'framer-motion';

export default function Particles() {
    // 產生 15 個隨機粒子
    const particles = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        size: Math.random() * 4 + 2, // 大小 2~6px
        left: Math.random() * 100,   // 隨機水平位置
        top: Math.random() * 100,    // 隨機垂直位置
        duration: Math.random() * 10 + 10, // 飄動速度 10~20秒
        delay: Math.random() * 5
    }));

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute bg-white/30 rounded-full"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                    }}
                    animate={{
                        y: [0, -100], // 慢慢往上飄
                        opacity: [0, 0.8, 0] // 淡入淡出
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        ease: "linear",
                        delay: p.delay
                    }}
                />
            ))}
        </div>
    );
}
