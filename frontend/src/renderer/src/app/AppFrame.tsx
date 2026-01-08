import CommandBar from '@renderer/features/layout/CommandBar'
import TabBar from '@renderer/features/layout/TabBar'
import { applyTheme } from '@renderer/theme/applyTheme'
import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import "@renderer/styles/base.css"  
import "@renderer/styles/themes/orpheus.css"
import "@renderer/styles/themes/midnight.css"
import "@renderer/styles/themes/jade.css"


const AppFrame = () => {
  const theme = "orpheus" 

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <div>
      <TabBar />
      <div className='flex flex-1 min-h-0'>
        <Outlet />
      </div>
      <CommandBar />
    </div>
  )
}

export default AppFrame