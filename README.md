## THIS ISSUE ONLY OCCURS ON ANDROID (SETTING UP IOS IS NOT MANDATORY)

### Environment Setup

Follow the guide to setup your PC from [React-Native Environment Setup](https://reactnative.dev/docs/environment-setup)

OR:

- Install node using brew `brew install node` but it's preferred to manage node using nvm [nvm installation guide](https://tecadmin.net/install-nvm-macos-with-homebrew/)
- brew install watchman
- For mac system, install [XCode](https://apps.apple.com/ng/app/xcode/id497799835?mt=12)

### Required to run android
- Download Java Development Kit `brew tap homebrew/cask-versions` && `brew install --cask zulu11`
- Download and Install [Android Studio](https://developer.android.com/studio)
- Install Android SDK
  - To do that, open Android Studio, click on "More Actions" button and select "SDK Manager".
  - Select the "SDK Platforms" tab from within the SDK Manager, then check the box next to "Show Package Details" in the bottom right corner. Look for and expand the Android 12 (S) entry, then make sure the following items are checked:
    - Android SDK Platform 31
    - Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image or (for Apple M1 Silicon) Google APIs ARM 64 v8a System Image
- Create a new Virtual Device
  - Click `More Actions` on `Android Studio`
  - Select `Virtual Device Manager`
  - Select Any of the google arm packages and click next
  - Give the device a name or leave the default name and click Next
  - Select `Portrait` orientation and click finish
- Configure the ANDROID_HOME environment variable
  - Add the following lines to your ~/.zprofile or ~/.zshrc config file:
    - Open your terminal
    - run `vim ~/.zshrc` or `vim ~/.zprofile`
    - Press `i` on your keyboard and use your arrow keys to navigate to the last line of the editor
    - Add the following files to the last line of the opened editor
  ```
      export ANDROID_HOME=$HOME/Library/Android/sdk
      export PATH=$PATH:$ANDROID_HOME/emulator
      export PATH=$PATH:$ANDROID_HOME/platform-tools
  ```
    - Press `Esc` key key then type `:wq` to save and quit the editor
    - run `source ~/.zshrc` or `source ~/.zprofile` OR restart your terminal
### To run the project
- Clone the project
- Run `yarn && yarn run link && npx pod-install`

To run on android:
- Run `yarn run android`

To run on iOS
- Run `yarn run ios`

### Possible Error
- 144 duplicate symbols for architecture arm64 (This happens mostly on Apple Silicon chip machines)
#### Fix:
- Open `ios` directory and open `BufferProject.xcworkspace`
- Tap on the folder icon by the top left of XCode
- Select `Pods` from the left pane on XCode
- Under `Targets`, locate and select `react-native-udp`
  - Select `Build Phases` and expand `Compile Sources`
  - Delete `GCDASyncUdpSocket.m` from the list
- Under `Targets` again, locate and select `TcpSockets`
  - Select `Build Phases` and expand `Compile Sources`
  - Delete `GCDASyncUdpSocket.m` from the list
- Click the `Play` icon by the top left of Xcode


### Adding more packages
- Stop the `metro-bundler` i.e. the terminal that opened after you started the application
- Install the package with `yarn add package-name`
- Run `yarn run android`
- For `ios` you might need to run `npx pod-install` again before running `yarn run ios`. You can check if you need the pod install from the npm page of the module you're adding. If not sure, always run `npx pod-install` first before `yarn run ios`

### Files to note:
- App.js contains the function used for the encryption
- shim.js file is used to add to the global environment methods that are not supported by the mobile device. This includes (Buffer, BigInt, WebAssembly)

### My Opinion
I feel the difference in node environment used by chrome-debug mode plays a role to this error.
