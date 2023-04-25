import { StyleSheet } from 'react-native'
import { Colors, Metrics } from './constants'

export default StyleSheet.create({
  errorText: {
    flex: 1,
    color: Colors.white,
  },
  errorIcon: {
    width: Metrics.iconHeight,
    height: Metrics.iconHeight,
    marginRight: Metrics.xs,
  },
  errorContainer: {
    marginTop: Metrics.small,
    padding: Metrics.xs,
    borderRadius: Metrics.tiny,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.error,
  },
  submitButton: {
    marginTop: Metrics.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Metrics.tiny,
    padding: Metrics.small,
    backgroundColor: Colors.success,
  },
  submitButtonTitle: {
    color: Colors.white,
  },
})
