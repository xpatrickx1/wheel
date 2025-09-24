import React from 'react';

const Tabs = ({ children, className }: { children: React.ReactNode, className?: string }) => { 
    return (
        <div>
            {children}
        </div>
    )
}

export default Tabs;

const TabsList = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex border-b border-gray-600 mb-4">
            {children}
        </div>
    )
}

const TabsTrigger = ({ children, value, isActive, onClick }: { children: React.ReactNode, value?: string, isActive?: boolean, onClick?: () => void }) => {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
                isActive 
                    ? 'bg-blue-600 text-white border-b-2 border-blue-600' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
        >
            {children}
        </button>
    )
}

const TabsContent = ({ children, value }: { children: React.ReactNode, value?: string }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent };