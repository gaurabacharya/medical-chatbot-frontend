import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ChatCard from '../ChatCard'
import { sendMessage } from '../../lib/api'

// Mock the API module
jest.mock('../../lib/api', () => ({
  sendMessage: jest.fn()
}))

describe('ChatCard', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks()
  })

  it('renders the initial state correctly', () => {
    render(<ChatCard />)
    
    // Check for logo
    expect(screen.getByAltText('logo')).toBeInTheDocument()
    
    // Check for title
    expect(screen.getByText('Ask our Medical AI Anything')).toBeInTheDocument()
    
    // Check for suggestion buttons
    expect(screen.getByText('What is type 2 diabetes?')).toBeInTheDocument()
    expect(screen.getByText('What is the best treatment for high cholesterol?')).toBeInTheDocument()
    expect(screen.getByText('What is the best medicine for skin rashes?')).toBeInTheDocument()
  })

  it('sends a message when clicking a suggestion button', async () => {
    // Mock the API response
    const mockResponse = 'Here is information about type 2 diabetes...'
    ;(sendMessage as jest.Mock).mockResolvedValueOnce(mockResponse)

    render(<ChatCard />)
    
    // Click the first suggestion button
    fireEvent.click(screen.getByText('What is type 2 diabetes?'))
    
    // Check if the message appears in the chat
    expect(screen.getByText('What is type 2 diabetes?')).toBeInTheDocument()
    
    // Wait for the API response
    await waitFor(() => {
      expect(screen.getByText(mockResponse)).toBeInTheDocument()
    })
  })

  it('handles API errors gracefully', async () => {
    // Mock the API to throw an error
    ;(sendMessage as jest.Mock).mockRejectedValueOnce(new Error('API Error'))

    render(<ChatCard />)
    
    // Click a suggestion button
    fireEvent.click(screen.getByText('What is type 2 diabetes?'))
    
    // Wait for the error message
    await waitFor(() => {
      expect(screen.getByText(/Error: API Error/)).toBeInTheDocument()
    })
  })
}) 