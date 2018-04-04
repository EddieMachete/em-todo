# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Local build
1. *npm install*
2. *tsc --p tsconfig.em-todo-core.json*
3. *npm install -g ionic@latest*
4. *ionic cordova platform add ios*
5. *ionic cordova resources --strict-ssl=false* set NODE_TLS_REJECT_UNAUTHORIZED=0
6. *ionic cordova build ios*
7. Set plist variable `NSLocationWhenInUseUsageDescription` = `We need your location to provide suggestions close to you`

# Update local build
1. *ionic cordova platform update ios*