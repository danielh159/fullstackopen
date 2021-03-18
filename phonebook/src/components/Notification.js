import React from "react"

const Notification = ({ message, deletedName }) => {
  const notificationStyle = {
    color: "green",
    background: "lightgray",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  } else if (message === `Information of ${deletedName} has already been removed from server`) {
    notificationStyle.color = "red"
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification