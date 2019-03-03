
# AUTH

## Mutation

### SignUp

```graphql
mutation SignupMutation($email: String!, $password: String!) {
  signUp(email: $email, password: $password) {
    token
    user {
      id
      email
    }
  }
}
```

### LogIn

```graphql
mutation LoginMutation($email: String!, $password: String!) {
  logIn(email: $email, password: $password) {
    token
    user {
      id
      email
    }
  }
}
```

### Recovery

```graphql
mutation RecoveryMutation($email: String!) {
  recovery(email: $email) {
    isSend
  }
}
```
