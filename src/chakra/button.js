import { defineStyleConfig } from '@chakra-ui/react'

export const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    borderRadius: 'base',
    backgroundColor: 'white',
  },
  variants: {
    outline: {
      border: '2px solid',
      borderColor: 'brand.100',
      color: 'brand.100',
    },
  },
  // The default size and variant values
  defaultProps: {
    size: 'md',
    variant: 'outline',
  },
})