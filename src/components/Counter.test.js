import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Counter from './Counter'

describe('Counter component', () => {
  beforeEach(() => {
    // Mock window.alert
    jest.spyOn(window, 'alert').mockImplementation(() => {})
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('renders correctly with initial state', () => {
    render(<Counter />)
    expect(screen.getByRole('heading', { name: /Contador/i })).toBeInTheDocument()
    expect(screen.getByText(/Tienes 0 en el contador/i)).toBeInTheDocument()
  })

  test('increments counter when "Aumentar" button is clicked', () => {
    render(<Counter />)
    const button = screen.getByText('Aumentar')
    fireEvent.click(button)
    expect(screen.getByText(/Tienes 1 en el contador/i)).toBeInTheDocument()
  })

  test('decrements counter when "Disminuir" button is clicked', () => {
    render(<Counter />)
    const aumentarButton = screen.getByText('Aumentar')
    const disminuirButton = screen.getByText('Disminuir')

    // Increase counter to 1 first
    fireEvent.click(aumentarButton)
    expect(screen.getByText(/Tienes 1 en el contador/i)).toBeInTheDocument()

    // Decrease counter to 0
    fireEvent.click(disminuirButton)
    expect(screen.getByText(/Tienes 0 en el contador/i)).toBeInTheDocument()
  })

  test('does not decrement counter below 0 and shows alert', () => {
    render(<Counter />)
    const disminuirButton = screen.getByText('Disminuir')
    fireEvent.click(disminuirButton)
    expect(window.alert).toHaveBeenCalledWith('No puedes disminuir más')
    expect(screen.getByText(/Tienes 0 en el contador/i)).toBeInTheDocument()
  })

  test('resets counter when "Reset" button is clicked', () => {
    render(<Counter />)
    const aumentarButton = screen.getByText('Aumentar')
    const resetButton = screen.getByText('Reset')

    fireEvent.click(aumentarButton)
    expect(screen.getByText(/Tienes 1 en el contador/i)).toBeInTheDocument()

    fireEvent.click(resetButton)
    expect(screen.getByText(/Tienes 0 en el contador/i)).toBeInTheDocument()
  })

  test('updates input value when typing', () => {
    render(<Counter />)
    const input = screen.getByPlaceholderText('Ingresa un número')
    fireEvent.change(input, { target: { value: '5' } })
    expect(input.value).toBe('5')
  })

  test('increments counter by number entered in input when "Aumentar por número" is clicked', () => {
    render(<Counter />)
    const input = screen.getByPlaceholderText('Ingresa un número')
    const button = screen.getByText('Aumentar por número')

    fireEvent.change(input, { target: { value: '3' } })
    fireEvent.click(button)

    expect(screen.getByText(/Tienes 3 en el contador/i)).toBeInTheDocument()
    expect(input.value).toBe('')
  })

  test('shows alert and does not increment counter if input is invalid', () => {
    render(<Counter />)
    const input = screen.getByPlaceholderText('Ingresa un número')
    const button = screen.getByText('Aumentar por número')

    fireEvent.change(input, { target: { value: 'abc' } })
    fireEvent.click(button)

    expect(window.alert).toHaveBeenCalledWith('Por favor ingresa un número válido')
    expect(screen.getByText(/Tienes 0 en el contador/i)).toBeInTheDocument()
  })
})
