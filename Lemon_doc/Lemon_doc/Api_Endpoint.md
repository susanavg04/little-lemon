**Little Lemon App — API and Local Storage Documentation**

The application uses:

**SQLite** to store restaurant menu dishes locally.
**AsyncStorage** to persist user session and profile information.
**React Navigation** for screen navigation.
**React Context API** for authentication state management.

**Database Management — SQLite**

The application uses SQLite to store restaurant menu dishes locally.

SQLite was selected because:

1. It allows offline access.
2. It improves performance.
3. It avoids repeated API calls.
4. It provides structured relational storage.

**SQLite Responsibilities**

1. Create menu tables.
2. Insert menu dishes.
3. Query dishes.
4. Filter dishes by category.
5. Retrieve dish details.

**Database Management — AsyncStorage**

The application uses AsyncStorage as a local persistence mechanism to manage user accounts, profile information, authentication data, and profile images. Data is stored locally on the device using key-value pairs, allowing offline access and persistent storage between application sessions.

### AsyncStorage Responsibilities

1. Store user registration information.
2. Retrieve user data using the user's email address.
3. Validate login credentials.
4. Save and update profile information.
5. Delete user accounts and profile data.
6. Store profile images locally by saving their URI.
7. Retrieve user passwords for authentication processes.
8. Persist user session information across application restarts.
9. Support offline access without requiring a remote backend.

### User Data Storage

Each user is stored using a unique key generated from their email address:

```javascript
user_email@example.com
```

This structure allows quick retrieval and updates of individual user records.

### Main Functions

1. guardarUsuario()
Creates and stores a new user object in AsyncStorage.

2. cargarUsuario()
Retrieves a user's information using their email address and converts the stored JSON data back into a JavaScript object.

3. loginUsuario()
Authenticates users by validating the entered password against the stored password and returns the authentication result.

4. saveProfile()
Updates profile information by merging existing user data with new profile values using AsyncStorage's merge functionality. This prevents overwriting unchanged data.

5. deleteProfile()
Removes all stored information associated with a user account.

6. uploadImage()
Stores the URI of a user's profile image and associates it with the user's profile data.

7. obtenerPasswordLocal()
Retrieves the locally stored password for authentication and validation purposes.

### React Query Integration

The application integrates React Query to improve data management and caching.

1. useUsuario()
Fetches user information and caches it using a unique query key.

2. useLoginUsuario()
Handles user authentication through React Query mutations.

3. useSaveProfile()
Updates profile information and automatically refreshes cached user data after successful updates.

4. useDeleteProfile()
Deletes user data and removes associated cached queries.

5. useUploadImage()
Uploads and stores profile image information while automatically refreshing cached profile data.

### Advantages of Using AsyncStorage

1. Persistent local storage.
2. Offline functionality.
3. Fast access to user data.
4. Simple implementation.
5. No dependency on external servers.
6. Efficient profile management.
7. Seamless integration with React Query caching mechanisms.
