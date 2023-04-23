/** A recursive helper function to set a "key" prop for each fields in a form */

import { Children, ReactElement, ReactNode, cloneElement, isValidElement } from 'react'
import { FormErrorProps } from './types'

export const getInputFields = (children?: ReactNode | ReactNode[]): any =>
  Children.toArray(children).reduce((partialInputsUnknown, childUnknown) => {
    const partialInputs = partialInputsUnknown as ReactElement[]
    const child = childUnknown as ReactElement
    if (child && child.props) {
      if (child.props.name) {
        /** If an element contains "name" props, we set key to it */
        return partialInputs.concat(
          cloneElement(child, {
            key: child.props.name,
          })
        )
      }
      if (child.props.children && isValidElement(child.props.children)) {
        return partialInputs.concat(getInputFields(child.props.children))
      }
    }
    if (isValidElement(child)) {
      return partialInputs.concat(child)
    }
    return partialInputs
  }, [])

export const getErrorMessageRecursively = (error: FormErrorProps['error']): string | null => {
  if (typeof error === 'string') {
    return error
  }
  if (Array.isArray(error) && error.length > 0) {
    const firstError = error[0]
    return typeof firstError === 'string' ? firstError : getErrorMessageRecursively(firstError)
  }
  if (typeof error === 'object' && error !== null) {
    const firstKey = Object.keys(error)[0]
    if (firstKey) {
      const firstError = (error as Record<string, any>)[firstKey]
      return getErrorMessageRecursively(firstError)
    }
  }
  return null
}
