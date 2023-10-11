'use client'
import { useSidebarContext } from "../../contexts/sidebarContext"

export default function ResourcesScreen() {
  const { sidebarOpen, setSidebarOptions, changeSidebarStatus } = useSidebarContext()
/*
  useEffect(() => {
    // Clean sidebar options
    setSidebarOptions([{ text: 'Option 1', href: '/resources' }, { text: 'Option 2', href: '/resources' }])
    // Show sidebar
    changeSidebarStatus(true)
  }, [])
  */

  return <>Resources</>
}