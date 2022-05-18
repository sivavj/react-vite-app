import React, { useContext } from 'react'
import { ThemeContext } from './theme-context'

export default function Dashboard() {
    const {theme} = useContext(ThemeContext)
  return (
    <div style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
        height: '100vh'
      }} >
          <div className='container'>
              <h1 className='display-1 text-center mt-5'>Dashboard</h1>
          </div>
      </div>
  )
}
