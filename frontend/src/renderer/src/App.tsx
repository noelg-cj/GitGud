import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import { Button } from './components/ui/button'
import { Calendar } from "./components/ui/calendar"
import { useState } from 'react'
import SideBar from './components/sidebar'
import { ThemeProvider } from './components/theme-provider'
import { SidebarProvider } from './components/ui/sidebar'
import Branch from './components/branch'

function App(): JSX.Element {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <SideBar />
          <Branch />
        </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
