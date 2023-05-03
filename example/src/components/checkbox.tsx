import React from 'react'
import { StyleSheet } from 'react-native'
import { CheckboxItemProps, Checkbox as MUICheckbox } from 'react-native-paper'

export interface Props extends Omit<CheckboxItemProps, 'theme' | 'status'> {
  value?: boolean
}

export const Checkbox: React.FC<Props> = ({ value = false, style, labelStyle, ...rest }) => {
  return (
    <MUICheckbox.Item
      {...rest}
      status={value ? 'checked' : 'unchecked'}
      mode="android"
      position="leading"
      style={[styles.checkbox, style]}
      labelStyle={[styles.checkboxLabel, labelStyle]}
    />
  )
}

const styles = StyleSheet.create({
  checkbox: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  checkboxLabel: { textAlign: 'left' },
})
