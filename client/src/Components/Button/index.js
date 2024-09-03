import React from 'react'
import './index.css'
export const Button = (
    {
        label = 'Button',
        type = 'button',
        className ='',
        disabled = false

    }
) => {
  return (
    <>
    <div className="btn-bdy-1">
    <button type={type} className={`btn-bdy-1_1${className}`} disabled={disabled}>{label}</button>
    </div>
    </>
  )
}

export default Button;