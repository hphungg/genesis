import React from 'react';

interface SetCardProps {
    set: any;
    onClick: () => void;
}

export function SetCard({ set, onClick }: SetCardProps) {
    return (
        <div
            onClick={onClick}
            className="aspect-3/2 rounded-xl border bg-card overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer relative group flex flex-col"
        >
            <div className="absolute inset-0 bg-muted">
                <div className="w-full h-full bg-linear-to-br from-primary/20 to-primary/5 opacity-50" />
            </div>

            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/50 to-transparent p-3 pt-8 z-10 flex flex-col items-start gap-1">
                <h3 className="text-white text-lg font-bold truncate">{set.name}</h3>
                <div className="bg-teal-600/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-sm backdrop-blur-sm">
                    {set.tag}
                </div>
            </div>
        </div>
    );
}
