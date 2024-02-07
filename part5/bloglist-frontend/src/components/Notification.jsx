const Notification = ({ notification }) => {
  if (!notification) {
    return null
  }
  const notiStyle = {
    borderRadius: '5px',
    borderStyle: 'solid',
    paddingLeft: '20px',
    paddingBottom: '20px',
    paddingTop: '20px',
    paddingRight: '20px',
    marginBottom: '15px',
    maxWidth: '200px',
    backgroundColor: 'lightgrey'
  }

  if (notification.type === 'error') {
    notiStyle['color'] = 'red'
  } else {
    notiStyle['color'] = 'green'
  }

  return (
    <div id='notification' style={notiStyle}>
      {notification.message}
    </div>
  )
}

export default Notification