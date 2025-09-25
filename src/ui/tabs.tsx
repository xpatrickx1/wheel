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
        <div className="flex justify-center mb-4">
            {children}
        </div>
    )
}

const TabsTrigger = ({ children, value, isActive, onClick }: { children: React.ReactNode, value?: string, isActive?: boolean, onClick?: () => void }) => {
    return (
        <div
            onClick={onClick}
            className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${
                isActive 
                    ? 'text-white' 
                    : 'text-gray-400'
            }`}
        >
            {children}
        </div>
    )
}

const TabsContent = ({ children, value }: { children: React.ReactNode, value?: string }) => {
    return (
        <div className='w-full'>
            {children}
        </div>
    )
}

export { Tabs, TabsList, TabsTrigger, TabsContent };