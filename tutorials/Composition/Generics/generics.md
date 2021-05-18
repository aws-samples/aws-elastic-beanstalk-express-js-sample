---
uid: Tutorial.Generics
title: Generics
---

# Generic Types

You resolve generic types in much the same way as you resolve non-generic types. The primary difference is with unbound types. The specification of the type arguments depend on the definition of the mapped type or the type you are resolving:

* If the mapped type or the type you are resolving is a **bound** type, you can only resolve an instance of the type using the defined type arguments. For example, if the mapped type has type arguments of type string and DateTime, you must specify these in the call to the Resolve method.

* If the mapped type or the type you are resolving is an **unbound** type, you can resolve an instance of the type using any types for the type arguments. The target class must be able to process arguments of the type you specify. For example, if one of the type arguments you specify is the type Boolean, the class must be able to handle Boolean values for that argument and not attempt to parse the value into a DateTime instance.