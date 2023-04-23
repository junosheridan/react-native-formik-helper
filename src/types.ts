import type { FormikConfig, FormikValues } from 'formik'
import { FunctionComponent, ReactNode } from 'react'
import type { ViewStyle, StyleProp } from 'react-native'
import { ImageStyle } from 'react-native'
import { TouchableOpacityProps } from 'react-native'
import { TextStyle } from 'react-native'
import { ImageSourcePropType } from 'react-native'

export interface Styles {
  containerStyle?: StyleProp<ViewStyle>
  errorContainerStyle?: StyleProp<ViewStyle>
  errorMessageStyle?: StyleProp<TextStyle>
  errorIconStyle?: StyleProp<ImageStyle>
  submitButtonStyle?: StyleProp<ViewStyle>
  submitButtonTitleStyle?: StyleProp<ViewStyle>
}

export interface FormErrorProps extends Pick<Styles, 'errorContainerStyle' | 'errorMessageStyle' | 'errorIconStyle'> {
  isError?: boolean
  error?: Record<string, any> | Record<string, any>[] | string | null
  genericErrorMessage?: string
  errorIcon?: ImageSourcePropType
}

export interface SubmitButtonProps
  extends Pick<TouchableOpacityProps, 'disabled'>,
    Pick<Styles, 'submitButtonStyle' | 'submitButtonTitleStyle'> {
  isLoading?: boolean
  submitButtonTitle?: string
  onPress?: () => void
}

export interface Props<T extends FormikValues>
  extends FormikConfig<T>,
    FormErrorProps,
    SubmitButtonProps,
    Pick<Styles, 'containerStyle'> {
  useDefaultFormError?: boolean
  useDefaultSubmitButton?: boolean
  Fields?: ReactNode | ReactNode[]
  FormError?: FunctionComponent<FormErrorProps>
  SubmitButton?: FunctionComponent<SubmitButtonProps>
}

export type StateFieldRefs = Array<{ focus?: () => void }>
