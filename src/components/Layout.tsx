import React from 'react';

interface LayoutProps {
    children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
            {/* Background pattern or simple gray */}
            <main className="flex-1 w-full max-w-full px-4 sm:px-6 lg:px-8 py-6 mx-auto">
                <div className="max-w-7xl mx-auto w-full space-y-8 pb-24">
                    {children}
                </div>
            </main>
        </div>
    );
}
