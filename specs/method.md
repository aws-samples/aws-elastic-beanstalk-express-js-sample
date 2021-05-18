---
uid: Specification.Method
---

# Method Invocation

Method invocation is an optional step you can add to the created object's initialization. Any accessible method could be invoked, provided Unity can satisfy all the parameters with appropriate values.

## Supported Methods

Any accessible method of constructed type can be invoked during initialization.

Multiple methods can be configured for invokation.

### Generic methods

Only closed generic methods can be invoked during initialization.

## Restrictions

### Static methods cannot be invoked

Unity does not support invocation of static methods.

### Methods with `ref` or `out` parameters cannot be invoked

Invoking methods containing `ref` or `out` parameters is not supported.

### Invoking `private` and `protected` methods is not allowed

Although it is technically possible to call `private` and `protected` methods of the class, Unity does not support this feature. This restriction is implemented to impose consistency with accessibility principles of `C#` language.
