package com.formikhelper

import android.graphics.Color
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = FormikHelperViewManager.NAME)
class FormikHelperViewManager :
  FormikHelperViewManagerSpec<FormikHelperView>() {
  override fun getName(): String {
    return NAME
  }

  public override fun createViewInstance(context: ThemedReactContext): FormikHelperView {
    return FormikHelperView(context)
  }

  @ReactProp(name = "color")
  override fun setColor(view: FormikHelperView?, color: String?) {
    view?.setBackgroundColor(Color.parseColor(color))
  }

  companion object {
    const val NAME = "FormikHelperView"
  }
}
