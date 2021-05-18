---
uid: Tutorial.Annotation.Method
---

# Annotating types for Method invocation

Method invocation is an optional step you can add to the created object's initialization. Any accessible method could be invoked, provided Unity can satisfy all the parameters with appropriate values.

## Method Invocation

To enable method invocation during object initialization you could apply [InjectionMethod](xref:Unity.InjectionMethodAttribute) attribute to the method you want to be executed.

```cs
public class Service
{
    ...
    private void PreInitialize(...)
    {
        ...
    }

    [InjectionMethod]
    public void Initialize(...)
    {
        ...
    }

    public void PostInitialize(...)
    {
        ...
    }
}
```

In the example above, attribute [InjectionMethod](xref:Unity.InjectionMethodAttribute) is applied to method `Initialize(...)` and the method will be executed immediately after the object is created.

## Multiple Method Invocation

Unity does not place any restrictions on how many methods of the class will be invoked during the initialization. You could mark any and all methods with the attribute and Unity will execute them all:

```cs
public class Service
{
    ...

    [InjectionMethod]
    public void PreInitialize(...)
    {
        ...
    }

    [InjectionMethod]
    public void Initialize(...)
    {
        ...
    }

    [InjectionMethod]
    public void PostInitialize(...)
    {
        ...
    }
}
```

## Restrictions

### Static methods cannot be invoked

Unity does not support invocation of static methods. Static methods annotated with [InjectionMethod](xref:Unity.InjectionMethodAttribute) attribute will be ignored. If [Unity Diagnostic](xref:Tutorial.Extension.Diagnostic) is enabled, the container will throw an exception when it encounters such an annotation.

### Methods with `ref` or `out` parameters cannot be invoked

Methods containing `ref` or `out` parameters cannot be invoked during initialization. The container will throw an exception if encountered these.

```cs
public class Service
{
    [InjectionMethod]  // Error
    public void Method1(ref object refObject)
    {
        ...
    }
    ...

    [InjectionMethod]  // Error
    public void Method2(out object outObject)
    {
        ...
    }
}
```

In the example above neither `Method1(ref object refObject)` nor `Method2(out object outObject)` should be annotated for invocation. Doing so will create an error condition.

### Invoking `private` and `protected` methods is not allowed

Although it is technically possible to call `private` and `protected` methods of the class, Unity does not support this feature. This restriction is implemented to impose consistency with accessibility principles of `C#` language.

Unity will ignore attributes on non-accessible methods.

```cs
public class Service
{
    ...

    [InjectionMethod]  // Error
    protected void ProtectedMethod(...)
    {
        ...
    }
}
```

In the example above method `ProtectedMethod(...)` will not be called.

If [Unity Diagnostic](xref:Tutorial.Extension.Diagnostic) is enabled, the container will throw an exception when it encounters this condition.

For more information see  [Unity Diagnostic](xref:Tutorial.Extension.Diagnostic).