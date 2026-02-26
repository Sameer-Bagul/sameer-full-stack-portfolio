import React from 'react';

export default function GridOverlay() {
    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden flex justify-center">
            <div className="w-full max-w-[1400px] px-4 h-full">
                <div className="grid grid-cols-12 gap-8 h-full">
                    {[...Array(12)].map((_, i) => (
                        <div
                            key={i}
                            className="h-full bg-red-500/5 border-x border-red-500/10"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
