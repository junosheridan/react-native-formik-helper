import React, { Ref, forwardRef, useCallback, useMemo } from 'react'
import { WrappedComponentType, TextInputFieldProps, InputRef } from './types'
import { useFormikContext } from 'formik'

export const withTextInputField = (WrappedComponent: WrappedComponentType) =>
  forwardRef(
    (
      { name, type, onChangeText: propOnChangeText, onBlur: propOnBlur, ...rest }: TextInputFieldProps,
      ref: Ref<InputRef>
    ) => {
      const { errors, values, setFieldValue, setFieldTouched, isSubmitting } =
        useFormikContext<Record<string, string>>()

      const defaultProps = useMemo((): Pick<
        TextInputFieldProps,
        'keyboardType' | 'secureTextEntry' | 'autoCorrect' | 'autoCapitalize'
      > => {
        if (type === 'email') {
          return {
            ...rest,
            autoCorrect: false,
            autoCapitalize: 'none',
            keyboardType: 'email-address',
          }
        }
        if (type === 'password') {
          return {
            ...rest,
            autoCorrect: false,
            autoCapitalize: 'none',
            secureTextEntry: true,
          }
        }
        if (type === 'digits') {
          return {
            ...rest,
            keyboardType: 'phone-pad',
          }
        }
        if (type === 'name') {
          return {
            ...rest,
            autoCorrect: false,
          }
        }
        return { ...rest }
      }, [type, rest])

      const onChangeText = useCallback(
        (text) => {
          setFieldValue(name, text)
          propOnChangeText?.(text)
        },
        [propOnChangeText, name, setFieldValue]
      )

      const onBlur = useCallback(
        (e) => {
          setFieldTouched(name, true, !isSubmitting)
          propOnBlur?.(e)
        },
        [propOnBlur, name, setFieldTouched, isSubmitting]
      )

      return (
        <WrappedComponent
          ref={ref}
          error={errors[name]}
          value={values[name]}
          onChangeText={onChangeText}
          onBlur={onBlur}
          {...defaultProps}
        />
      )
    }
  )
