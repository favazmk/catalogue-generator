import { Upload, FilePlus, List, RefreshCw } from 'lucide-react';

interface HeaderProps {
    onStartNew: () => void;
}

export function Header({ onStartNew }: HeaderProps) {
    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="sticky top-2 z-40 mx-auto max-w-4xl">
            <nav className="bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-gray-200 px-6 py-3 flex items-center justify-between transition-all hover:shadow-md">

                <div className="flex items-center space-x-2 sm:space-x-6 overflow-x-auto no-scrollbar">
                    <button
                        onClick={() => scrollToSection('upload-section')}
                        className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
                    >
                        <Upload className="w-4 h-4" />
                        <span className="hidden sm:inline">Upload Files</span>
                    </button>

                    <div className="w-px h-4 bg-gray-300 flex-shrink-0" />

                    <button
                        onClick={() => scrollToSection('manual-entry')}
                        className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
                    >
                        <FilePlus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add Manually</span>
                    </button>

                    <div className="w-px h-4 bg-gray-300 flex-shrink-0" />

                    <button
                        onClick={() => scrollToSection('review-list')}
                        className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors whitespace-nowrap"
                    >
                        <List className="w-4 h-4" />
                        <span className="hidden sm:inline">Review List</span>
                    </button>
                </div>

                <button
                    onClick={onStartNew}
                    className="ml-4 flex items-center space-x-2 text-sm font-medium text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-full px-4 py-1.5 transition-colors flex-shrink-0"
                >
                    <RefreshCw className="w-4 h-4" />
                    <span>Start New</span>
                </button>

            </nav>
        </header>
    );
}
