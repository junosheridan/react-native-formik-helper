import React, { Ref, forwardRef, useCallback, useState } from 'react'
import {
  NativeSyntheticEvent,
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  TextInputFocusEventData,
  View,
  ViewStyle,
} from 'react-native'
import { TextInput as MUITextInput, TextInputProps, HelperText } from 'react-native-paper'

export interface Props extends Omit<TextInputProps, 'error'> {
  error?: string
  containerStyle?: StyleProp<ViewStyle>
}

export const TextInput = forwardRef(
  (
    {
      error,
      containerStyle,
      mode = 'outlined',
      underlineColorAndroid = 'transparent',
      onBlur: propOnBlur,
      onFocus: propOnFocus,
      ...rest
    }: Props,
    ref: Ref<RNTextInput>
  ) => {
    const [, setFocused] = useState(false)
    const [touched, setTouched] = useState(false)

    const onBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(false)
        propOnBlur?.(e)
      },
      [propOnBlur]
    )

    const onFocus = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        setFocused(true)
        setTouched(true)
        propOnFocus?.(e)
      },
      [propOnFocus]
    )

    return (
      <View style={[styles.container, containerStyle]}>
        <MUITextInput
          ref={ref}
          mode={mode}
          underlineColorAndroid={underlineColorAndroid}
          onFocus={onFocus}
          onBlur={onBlur}
          {...rest}
        />
        {!!error && touched && (
          <HelperText visible type="error">
            {error}
          </HelperText>
        )}
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
})
