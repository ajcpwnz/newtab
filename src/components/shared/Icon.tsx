import React from 'react'
import styled from 'styled-components'

interface IconProps {
  type: 'interact' | 'delete' | 'add'
  width?: string
  height?: string
}

const typeMapping = {
  'add': '/ico/add.svg',
  'delete': '/ico/delete.svg',
  'interact': '/ico/interact.svg',
}

const _Icon = styled.span<IconProps>`
  display: inline-block;  
  cursor: pointer;
  opacity: .4;
  display: block;
  padding: .5rem;
  &:hover {
    transition: opacity .3s ease;
    opacity: 1;
  }
  &:after {
  content: '';
    width: ${({ width }) => width || '1rem'};
    height: ${({ height }) => height || '1rem'};
    display: inline-block;
    background-image: url(${({ type }) => typeMapping[type]});
    background-position: center;
    background-size: 100%;
  }
`

export const Icon = _Icon