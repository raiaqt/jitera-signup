# Authentication

### 1. Setup

```
VITE_APP_CLIENT_ID=''
VITE_APP_CLIENT_SECRET=''
```

### 2. Email Authentication
```javascript
// Import email login hook
 import { useLoginWithEmailMutation } from "@services/authentication";

// Call hook
const loginWithEmailMutation = useLoginWithEmailMutation()

// Define function trigger login mutation
const handleSubmit = async (values: LoginFormData) => {  
  try {
    await loginWithEmailMutation.mutateAsync(values)
    navigation.navigate('/')
  } catch (error: unknown) {
    console.log(error)
  }      
}

```


### 3. SMS Authentication
```javascript
// Import email login hook
 import { useVerifyPhoneNumberMutation } from "@services/authentication";

// Call hook
const verifyPhoneNumberMutation = useVerifyPhoneNumberMutation()

// Define function trigger verify mutation
const handleSubmit = async (values: LoginFormData) => {
  try {
    await verifyPhoneNumberMutation.mutateAsync(values)
    navigation.navigate('/')
  } catch (error: unknown) {
    console.log(error)
  }
}

```

### 4. Check authentication info

Use below hook to check authentication info

```javascript
import { useAuthenticationData } from '@services/authentication'

const authData = useAuthenticationData()
```

Or you can get anywhere

```javascript
import sessionStorage from '@utils/sessionStorage'

const authenticationInfo = sessionStorage.getAuthenticationInfo()
```