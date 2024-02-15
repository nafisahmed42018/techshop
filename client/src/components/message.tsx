import React, { ReactNode } from 'react'
import { Alert, AlertProps } from 'react-bootstrap'

interface MessageProps {
  variant?: AlertProps['variant']
  children: ReactNode
}

const Message: React.FC<MessageProps> = ({ variant = 'info', children }) => {
  return <Alert variant={variant}>{children}</Alert>
}

export default Message
