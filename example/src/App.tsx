import React from 'react'

import { ScrollView, StyleSheet, Text, TextInput } from 'react-native'
import { Form, Metrics } from 'react-native-formik-helper'

export default function App() {
  return (
    <ScrollView keyboardShouldPersistTaps="handled" style={styles.container} contentContainerStyle={styles.content}>
      <Form
        initialValues={{}}
        onSubmit={() => {}}
        submitButtonTitle="Confirm"
        Fields={
          <>
            <Text>Hello world</Text>
            <TextInput style={styles.field} />
            <Text>Hello world</Text>
            <TextInput style={styles.field} />
            <Text>Hello world</Text>
            <TextInput style={styles.field} />
          </>
        }
      />
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
    height: '100%',
  },
  field: {
    marginVertical: Metrics.xxs,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: Metrics.tiny,
    height: Metrics.iconHeight * 2,
    paddingHorizontal: Metrics.small,
  },
})
