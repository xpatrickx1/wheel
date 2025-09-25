import React from "react";
import { CircleQuestionMark } from "lucide-react"

export const Help = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex items-start text-xs gap-2 mb-4 mt-2 relative">
        <CircleQuestionMark size={14}/>
        <span className="text-left">{children}</span>
      </div>
    )
}
