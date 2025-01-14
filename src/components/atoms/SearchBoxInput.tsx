// imports
import styled from 'styled-components'
import { ChangeEventHandler } from 'react'

interface SearchBoxInputProps {
    placeholder: string
    value: string
    onChange: ChangeEventHandler<HTMLInputElement>
}

// function
export default function SearchBoxInput({ placeholder, value, onChange }: SearchBoxInputProps) {
  return ( 
    <SearchBoxInputWrapper
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus
    />
  )
}

// styles
const SearchBoxInputWrapper = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    margin-right: 10px;
`
