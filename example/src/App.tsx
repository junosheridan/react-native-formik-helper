import React, { useCallback, useRef } from 'react'
import * as yup from 'yup'
import { ScrollView, StyleSheet } from 'react-native'
import { Form, Metrics, SubmitButtonProps, withTextInputField } from 'react-native-formik-helper'

import { SubmitButton, TextInput, Props as TextInputProps } from './components'

const EmailField = withTextInputField<TextInputProps>(TextInput)
const PasswordField = withTextInputField<TextInputProps>(TextInput)

export default function App() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const renderSubmitButton = useCallback(
    ({ isLoading, disabled, onPress }: SubmitButtonProps) => (
      <SubmitButton loading={isLoading} disabled={disabled} onPress={onPress} style={styles.submitButton}>
        {'Submit Form'}
      </SubmitButton>
    ),
    []
  )

  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container} contentContainerStyle={styles.content}>
      <Form<{ email: string; password: string }>
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={yup.object().shape({
          email: yup.string().email().required(),
          password: yup.string().min(8).max(50).required(),
        })}
        onSubmit={() => {}}
        SubmitButton={renderSubmitButton}
      >
        <EmailField ref={emailRef} name="email" type="email" label="Email address" />
        <PasswordField ref={passwordRef} name="password" type="password" label="Password" />
      </Form>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: Metrics.xxl,
    paddingHorizontal: Metrics.small,
  },
  submitButton: {
    marginTop: Metrics.xxl,
  },
})
