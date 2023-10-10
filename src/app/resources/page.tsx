'use client'
import { useSidebarContext } from "../../contexts/sidebarContext"
import { useEffect } from "react"

export default function ResourcesScreen() {
  const { sidebarOpen, setSidebarOptions } = useSidebarContext()

  useEffect(() => {
    // Clean sidebar options
    setSidebarOptions([])
  }, [])

  return <>Resources</>
}