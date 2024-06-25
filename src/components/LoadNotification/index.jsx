import React from 'react'

function LoadNotification() {
    return (
        <div class="block  shadow rounded-md p-4 max-w-sm w-full mx-auto">
            {Array.from({ length: 7 }).map(() => (
                <div class="animate-pulse flex space-x-4 py-4">
                    <div class="rounded-full bg-slate-200 h-16 w-16"></div>
                    <div class="flex-1 space-y-6 py-1">
                        <div class="h-3 bg-slate-200 rounded"></div>
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-3 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-3 bg-slate-200 rounded col-span-1"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div >

    )
}

export default LoadNotification
