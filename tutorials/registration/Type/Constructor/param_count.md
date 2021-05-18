---
uid: Tutorial.Injection.Constructor.Count
title: Select Constructor By Number of Parameters
---

# Selecting Constructor

## By Number of Parameters

Selecting constructor by number of parameters is the simplest form of selection. You could use this selection method if the constructor you invoking has unique number of parameters.

### Type of Parameter as Contract Type

This method is useful when you are working on a [Type](xref:System.Type) that takes certain number of parameters but you don't care what these parameter types are.

#### Parameters

In a case like this you could use `Resolve.Parameter()` to specify that you want a parameter at this position to be resolved. For example, consider the following [Type](xref:System.Type):

[!code-csharp [class Service](../../../../src/SpecificationTests/src/Constructor/Injection/ByCount.cs#class_sample_type)]

It has several constructors with different number of parameters each. Normally, the container would try to run the most complex constructor, but if you want to invoke the one with just a single parameter you need to register it like this:

[!code-csharp [class Service](../../../../src/SpecificationTests/src/Constructor/Injection/ByCount.cs#inject_count_first_arrange)]

In this registration you configure the container to invoke a constructor that takes just one parameter. The parameter is resolved using a contract with a type of the parameter and no name.

Now if you resolve the type, the container will invoke that constructor and inject the parameter:

[!code-csharp [class Service](../../../../src/SpecificationTests/src/Constructor/Injection/ByCount.cs#inject_count_first_ctor_act)]

#### Generic Parameters

The same method as above, could be used to invoke constructors with generic parameters. Consider the following class:

[!code-csharp [class Service](../../../../src/SpecificationTests/src/Constructor/Injection/ByCount.cs#class_sample_type_generic)]

To configure the container to invoke the first constructor you would execute the same code with exception of how you pass in a type of the contract. Registration of an open generic requires a conventional method call:

[!code-csharp [class Service](../../../../src/SpecificationTests/src/Constructor/Injection/ByCount.cs#inject_count_first_arrange_generic)]

When resolved, the container will invoke the first constructor and inject it with created instance of `Object`:

[!code-csharp [class Service](../../../../src/SpecificationTests/src/Constructor/Injection/ByCount.cs#inject_count_first_ctor_act_generic)]

#### Parameter dependencies with Contract Name

When configuring constructors with the method described above you should be mindful of parameter annotations and contract names these annotations might provide.

When implicitly injecting a parameter, the container will recognize all metadata the parameter is annotated with and will properly inject it with correct contract. When you add an [InjectionMember](xref:Unity.Injection.ResolvedParameter) to configure the parameter you override all these annotations.

If you look at the second constructor of `SampleType<T>` you will notice that the first parameter is marked with [Dependency](xref:Unity.DependencyAttribute) attribute. Normally, when resolving that parameter, Unity will, if present, use Name of the Contract the attribute provides. But when you register it as in the following example, you will override that contract:

[!code-csharp [class Service](../../../../src/SpecificationTests/src/Constructor/Injection/ByCount.cs#inject_count_named_generic)]

When resolved, Unity will execute the constructor but instead of dependency with contract name `one` it will use contract with no name.

If you need to, you could override contract name explicitly as in the following example:

[!code-csharp [class Service](../../../../src/SpecificationTests/src/Constructor/Injection/ByCount.cs#inject_count_name_override_generic)]

If you'd like to preserve contracts from annotations, you need to use one of the following selection methods instead.

### See Also

* [Implicit Constructor Registration](xref:Tutorial.Injection.Constructor.Implicit)
* [Constructor Annotation](xref:Tutorial.Injection.Constructor.Annotation)
* [Invoke default constructor](xref:Tutorial.Injection.Constructor.Default)
* [Select constructors by parameter types](xref:Tutorial.Injection.Constructor.Types)
* [Select constructors based on injected values](xref:Tutorial.Injection.Constructor.Values)
