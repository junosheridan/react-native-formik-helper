# react-native-formik-helper

Forms in React/React Native can be verbose, but [Formik](https://github.com/jaredpalmer/formik) simplifies the three most annoying aspects:
1. Getting values in and out of form state
2. Validation and error messages
3. Handling form submission

I was inspired by [React Native Formik](https://github.com/bamlab/react-native-formik) to create this repository, which makes forms even more abstract and functional component-friendly.

**Features**

- Automatically focus on the next input
- Convert your React Native input to `Formik Field` with no boilerplate

## Installation

```sh
yarn add formik react-native-formik
```
## Guides

## Usage

```js
import React, { useCallback, useRef } from 'react'
import * as yup from 'yup'
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native'
import { Form, Metrics, SubmitButtonProps, withBooleanField, withTextInputField } from 'react-native-formik-helper'

import { Checkbox, CheckboxProps, SubmitButton, TextInput, TextInputProps } from './components'

const EmailField = withTextInputField<TextInputProps>(TextInput)
const PasswordField = withTextInputField<TextInputProps>(TextInput)
const NameField = withTextInputField<TextInputProps>(TextInput)
const CheckboxField = withBooleanField<CheckboxProps>(Checkbox)

const Fields = {
  email: 'email',
  password: 'password',
  name: 'name',
  acceptedTos: 'acceptedTos',
}

type FormValues = { email: string; password: string; acceptedTos: boolean }

export default function App() {
  const nameRef = useRef(null)
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
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <Form<FormValues>
          validateOnMount
          initialValues={
            {
              [Fields.name]: '',
              [Fields.email]: '',
              [Fields.password]: '',
              [Fields.acceptedTos]: false,
            } as FormValues
          }
          validationSchema={yup.object().shape({
            [Fields.name]: yup.string().min(4).max(32).required(),
            [Fields.email]: yup.string().email().required(),
            [Fields.password]: yup.string().min(8).max(50).required(),
            [Fields.acceptedTos]: yup.boolean().oneOf([true]).required(),
          })}
          onSubmit={() => {}}
          SubmitButton={renderSubmitButton}
        >
          <NameField ref={nameRef} name={Fields.name} label="Full name" textContentType="name" />
          <EmailField ref={emailRef} name={Fields.email} type="email" label="Email address" />
          <PasswordField ref={passwordRef} name={Fields.password} type="password" label="Password" />
          <CheckboxField name={Fields.acceptedTos} label="I agree to terms and conditions" />
        </Form>
      </ScrollView>
    </KeyboardAvoidingView>
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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
