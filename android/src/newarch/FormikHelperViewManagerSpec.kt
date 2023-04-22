package com.formikhelper

import android.view.View

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.FormikHelperViewManagerDelegate
import com.facebook.react.viewmanagers.FormikHelperViewManagerInterface
import com.facebook.soloader.SoLoader

abstract class FormikHelperViewManagerSpec<T : View> : SimpleViewManager<T>(), FormikHelperViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = FormikHelperViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }

  companion object {
    init {
      if (BuildConfig.CODEGEN_MODULE_REGISTRATION != null) {
        SoLoader.loadLibrary(BuildConfig.CODEGEN_MODULE_REGISTRATION)
      }
    }
  }
}
