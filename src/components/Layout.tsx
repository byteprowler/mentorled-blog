import { ReactNode } from 'react'

export default function Layout( {children} : {children: ReactNode}) {
  return (
    <div className='min-h-screen'>
      {children}
    </div>
  )
}
