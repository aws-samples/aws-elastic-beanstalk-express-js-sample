---
uid: Tutorial.Injection.Constructor.Default
title: Default Constructor
---

# Default Constructors

A _Default_ called a constructor with no parameters. It could be explicitly defined on a [Type](xref:System.Type) or if [Type](xref:System.Type) has no defined constructors, C# will implicitly create one for you.

## Invoking Default Constructor

To configure resolution of a [Type](xref:System.Type) with a default constructor you need to register that [Type](xref:System.Type) with [Injection Constructor Member](xref:Unity.Injection.InjectionConstructor) which takes no parameters. 

### Class `Service`

Consider the following [Type](xref:System.Type):

[!code-csharp [class Service](../../../../src/SpecificationTests/src/Constructor/Injection/Setup.cs#class_service)]

Class `Service` is a plain type with three accessible constructors. First constructor is a default constructor with no parameters, second and third constructors take one parameter each.

### Registering `Service`

If you try to resolve this class with no registration, Unity will select one of the constructors with parameter. You can not guarantee which one it will select because both have the same number of parameters and each could be satisfied with dependencies.

> [!TIP]
> If [Diagnostic](xref:Tutorial.Extension.Diagnostic) is enabled, it will throw an ambiguous constructor exception.

To prevent ambiguity, or if you need to execute default constructor, you can register this [Type](xref:System.Type) and instruct the container to invoke default constructor during resolution. In simplest form this registration will look like this:

[!code-csharp [Register Service](../../../../src/SpecificationTests/src/Constructor/Injection/Default.cs#inject_default_ctor_arrange)]

> [!NOTE]
> Of corse you could add other instructions like mapping, name, etc. to the registration but for simplicity it is omitted in this example.

### Resolving `Service`

Once you register the `Service` with the container, you can resolve it normally:

[!code-csharp [Resolve Service](../../../../src/SpecificationTests/src/Constructor/Injection/Default.cs#inject_default_ctor_act)]

At first resolution the container will create a pipeline which invokes a default constructor to create the `Service` and will be using it for all subsequent resolutions.

## Default Generic Constructor

Unity can register and create Generic types. It allows to register Closed and Open Generics and can resolve constructed types based on these.

### Class `Service<T>`

The principle for registering of default constructor is exactly the same as for plain types. Consider the following [Type](xref:System.Type):

[!code-csharp [class Service{T}](../../../../src/SpecificationTests/src/Constructor/Injection/Setup.cs#class_service_generic)]

Class `Service<T>` is an open generic type with two constructors. First constructor is a default constructor with no parameters and second takes one parameter.

### Registering `Service<T>`

Normally, Unity will create this [Type](xref:System.Type) by executing most complex constructor. To force Unity to use default constructor you need to register `Service<T>` and instruct the container to invoke it during resolution. You can register constructed generic based on `Service<T>` like this:

[!code-csharp [Register Service{object}](../../../../src/SpecificationTests/src/Constructor/Injection/Default.cs#inject_default_ctor_closed_generic_arrange)]

Or you can register Open Generic [Type](xref:System.Type):

[!code-csharp [Register Service{T arg}](../../../../src/SpecificationTests/src/Constructor/Injection/Default.cs#inject_default_ctor_open_generic_arrange)]

### Resolving `Service<T>`

If you resolve `Service<object>`:

[!code-csharp [Resolve Service](../../../../src/SpecificationTests/src/Constructor/Injection/Default.cs#inject_default_ctor_closed_generic_act)]

either registration will invoke the default constructor.

### See Also

* [Implicit Constructor Registration](xref:Tutorial.Injection.Constructor.Implicit)
* [Constructor Annotation](xref:Tutorial.Injection.Constructor.Annotation)
* [Select constructors by parameters count](xref:Tutorial.Injection.Constructor.Count)
* [Select constructors by parameter types](xref:Tutorial.Injection.Constructor.Types)
* [Select constructors based on injected values](xref:Tutorial.Injection.Constructor.Values)
