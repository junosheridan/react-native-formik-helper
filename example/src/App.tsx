import React, { useRef } from 'react'
import * as yup from 'yup'
import { ScrollView, StyleSheet } from 'react-native'
import { Form, Metrics, withTextInputField } from 'react-native-formik-helper'

import { TextInput } from './components'

const EmailField = withTextInputField(TextInput)
const PasswordField = withTextInputField(TextInput)

export default function App() {
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
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
        submitButtonTitle="Confirm"
      >
        <EmailField ref={emailRef} name="email" type="email" />
        <PasswordField ref={passwordRef} name="password" type="password" />
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
})
