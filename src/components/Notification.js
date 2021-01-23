import React from 'react'

const Notification = ({ message }) => {
console.log('message: ', message)

    const NotificationStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const ErrorStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    if (message.message === null) {
      return null
    }
  
    return (
      <div style = {message.style ? NotificationStyle: ErrorStyle}>
        {message.message}
      </div>
    )
  }

  export default Notification