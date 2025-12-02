package com.treematch
 
import android.os.Build
import android.os.Bundle
import android.view.View
import androidx.core.view.ViewCompat
import androidx.core.view.WindowInsetsCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
 
class MainActivity : ReactActivity() {
 
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "TreeMatch"
 
  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
 
  /**
   * Handle window insets for better keyboard and navigation bar handling
   * Works for all Android versions
   */
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // Handle window insets for all Android versions
    val rootView = findViewById<View>(android.R.id.content) 
             if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
                ViewCompat.setOnApplyWindowInsetsListener(rootView) { view, insets ->
                    val imeInsets = insets.getInsets(WindowInsetsCompat.Type.ime())
                    val systemBarInsets = insets.getInsets(WindowInsetsCompat.Type.systemBars())

                    val bottomInset = maxOf(systemBarInsets.bottom, imeInsets.bottom)

                    view.setPadding(
                        systemBarInsets.left,
                        systemBarInsets.top,
                        systemBarInsets.right,
                        bottomInset
                    )

                    insets
                }
            }
  }
}