package com.formikhelper

import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager

abstract class FormikHelperViewManagerSpec<T : View> : SimpleViewManager<T>() {
  abstract fun setColor(view: T?, value: String?)
}
