import { render, screen, fireEvent } from '@testing-library/react'
import MessageInput from '../MessageInput'

describe('MessageInput', () => {
  const mockOnSend = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the input field correctly', () => {
    render(<MessageInput onSend={mockOnSend} loading={false} />)
    
    expect(screen.getByPlaceholderText('Ask me anything about medical related topics...')).toBeInTheDocument()
  })

  it('calls onSend when Enter key is pressed', () => {
    render(<MessageInput onSend={mockOnSend} loading={false} />)
    
    const input = screen.getByPlaceholderText('Ask me anything about medical related topics...')
    fireEvent.change(input, { target: { value: 'Test message' } })
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(mockOnSend).toHaveBeenCalledWith('Test message')
  })

  it('calls onSend when send button is clicked', () => {
    render(<MessageInput onSend={mockOnSend} loading={false} />)
    
    const input = screen.getByPlaceholderText('Ask me anything about medical related topics...')
    fireEvent.change(input, { target: { value: 'Test message' } })
    
    const sendButton = screen.getByRole('button')
    fireEvent.click(sendButton)
    
    expect(mockOnSend).toHaveBeenCalledWith('Test message')
  })

  it('does not call onSend with empty message', () => {
    render(<MessageInput onSend={mockOnSend} loading={false} />)
    
    const input = screen.getByPlaceholderText('Ask me anything about medical related topics...')
    fireEvent.keyDown(input, { key: 'Enter' })
    
    expect(mockOnSend).not.toHaveBeenCalled()
  })

  it('disables input and button when loading', () => {
    render(<MessageInput onSend={mockOnSend} loading={true} />)
    
    const input = screen.getByPlaceholderText('Ask me anything about medical related topics...')
    const sendButton = screen.getByRole('button')
    
    expect(input).toBeDisabled()
    expect(sendButton).toBeDisabled()
  })
}) 