import { Formik, FormikHelpers, FormikProps, FormikValues } from 'formik'
import React, {
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { FormProps, InputRef } from './types'
import { Keyboard } from 'react-native'
import { getInputFields } from './utils'
import { SafeAreaView } from 'react-native'
import { DefaultFormError, DefaultSubmitButton } from './components'

export function Form<T extends FormikValues>({
  useDefaultFormError = true,
  useDefaultSubmitButton = true,
  onSubmit: propOnSubmit,
  children,
  isLoading,
  error,
  isError,
  genericErrorMessage,
  containerStyle,
  errorContainerStyle,
  errorMessageStyle,
  errorIconStyle,
  submitButtonTitle,
  submitButtonStyle,
  submitButtonTitleStyle,
  FormError = DefaultFormError,
  SubmitButton = DefaultSubmitButton,
  renderHeader,
  renderFooter,
  ...rest
}: PropsWithChildren<FormProps<T>>) {
  const formikRef = useRef<FormikProps<T>>(null)
  const [fieldRefs, setFieldRefs] = useState<InputRef[]>([])

  const inputFields = useMemo(() => getInputFields(children), [children])

  const handleFieldFocus = useCallback(
    (index: number) => {
      const ref = fieldRefs[index]
      if (ref && ref.focus) {
        ref.focus()
      }
    },
    [fieldRefs]
  )

  const onSubmit = useCallback(
    (values: T, formikHelpers: FormikHelpers<T>) => {
      Keyboard.dismiss()
      propOnSubmit?.(values, formikHelpers)
    },
    [propOnSubmit]
  )

  const autoFocusFields = useMemo(
    () =>
      inputFields.map((field: ReactElement, index: number) => {
        let lastFocusIndex: number | null = null
        for (let idx = fieldRefs.length - 1; idx > -1; idx -= 1) {
          if (fieldRefs[idx]) {
            lastFocusIndex = idx
            break
          }
        }
        let nextFocusIndex: number | null = null
        for (let idx = index + 1; idx < fieldRefs.length; idx += 1) {
          if (fieldRefs[idx]) {
            nextFocusIndex = idx
            break
          }
        }
        const returnKeyType = index === lastFocusIndex ? 'done' : 'next'
        return cloneElement(field, {
          returnKeyType: field.props.returnKeyType || returnKeyType,
          onSubmitEditing: () => {
            if (nextFocusIndex) {
              handleFieldFocus(nextFocusIndex)
            }
            if (field.props.onSubmitEditing) {
              field.props.onSubmitEditing()
            }
          },
        })
      }),
    [inputFields, fieldRefs, handleFieldFocus]
  )

  useEffect(() => {
    const updatedFieldRefs = inputFields.map((field: { ref?: { current?: { focus?: () => void } | null } }) => {
      const { ref } = field
      if (ref && ref.current) {
        return ref.current
      }
      return null
    }) as InputRef[]
    setFieldRefs(updatedFieldRefs)
  }, [inputFields])

  return (
    <Formik<T> {...rest} innerRef={formikRef} onSubmit={onSubmit}>
      {({ isValid, handleSubmit, ...props }) => (
        <SafeAreaView style={containerStyle}>
          {typeof renderHeader === 'function' ? renderHeader({ isValid, handleSubmit, ...props }) : renderHeader}
          {autoFocusFields}
          {useDefaultFormError && (
            <FormError
              error={error}
              isError={isError}
              genericErrorMessage={genericErrorMessage}
              errorContainerStyle={errorContainerStyle}
              errorMessageStyle={errorMessageStyle}
              errorIconStyle={errorIconStyle}
            />
          )}
          {useDefaultSubmitButton && (
            <SubmitButton
              disabled={!isValid || isLoading}
              isLoading={isLoading}
              onPress={handleSubmit}
              submitButtonTitle={submitButtonTitle}
              submitButtonStyle={submitButtonStyle}
              submitButtonTitleStyle={submitButtonTitleStyle}
            />
          )}
          {typeof renderFooter === 'function' ? renderFooter({ isValid, handleSubmit, ...props }) : renderFooter}
        </SafeAreaView>
      )}
    </Formik>
  )
}
