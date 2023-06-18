import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    // textTransform: 'uppercase',
    borderRadius: 'base',
    backgroundColor: 'white',
  },
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'white',
      color: 'white',
      background: 'brand.100',
      _hover: {
        background: 'blue.500'
      }
    },
    deleteBtn: {
      border: '1px solid',
      borderColor: 'red.600',
      color: 'red.600',
      fontSize: 'sm',
      _hover: {
        border: '1px solid',
        borderColor: 'red.600',
        color: 'white',
        backgroundColor: 'red.600'
      }
    }
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
})