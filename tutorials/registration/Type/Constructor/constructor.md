---
uid: Tutorial.Injection.Constructor
title: Constructor Injection
---

# Constructor Injection

Constructor Injection is a process where Unity selects a constructor, resolves parameter dependencies, and executes the constructor by injecting it with resolved or injected dependencies.  

## Restrictions

Unity can be configured to execute any accessible constructor with the following exceptions:

* `static` constructors are not supported
* `private` and `protected` constructors are not accessible
* Constructors with `ref` and `out` parameters are not supported

## Selection Methods

Selecting a constructor is one of the first steps in creating a resolution pipeline. Unity supports the following selection methods:

### Automatic Selection

Automatic Selection is a default method of selecting constructors. It will be used if no constructor is injected or annotated.

By default Unity uses 'smart' algorithm to select constructor. It sorts all accessible constructors by number of parameters in ascending order and goes from most complex to the default, checking if it can satisfy its parameters. The container selects the first constructor it can create and executes it.

> [!WARNING]
> Unity will not check for ambiguities unless [Diagnostic](xref:Tutorial.Extension.Diagnostic) extension is installed.

> [!TIP]
> Legacy selection algorithm which selects the most complex constructor could be enabled by installing `Legacy` extension. It will replace and disable 'smart' selection.

### Constructor Annotation

Constructor annotated with [InjectionConstructor](xref:Unity.InjectionConstructorAttribute) attribute overrides automatic selection. For more information see <xref:Tutorial.Annotation.Constructor>

### Constructor injection

Constructor configuration registered for the [Type](xref:System.Type) has highest priority. It will override other selection methods and will always execute the configured constructor.

As opposed to methods, constructors do not have a name to distinguish one from the other. The only difference between constructors is number and [Type](xref:System.Type) of parameters they take. Because of that constructor selection is based solely on parameters and its types.

#### Invoking the Constructor

Invoked constructor and injection of its parameters is configured by registering the [Type](xref:System.Type) with the [InjectionConstructor](xref:Unity.Injection.InjectionConstructor). Creating the [InjectionConstructor](xref:Unity.Injection.InjectionConstructor) with proper injection members or values determines what constructor is selected and how parameters are initialized. Values and resolvers added to [InjectionConstructor](xref:Unity.Injection.InjectionConstructor) will be used to initialize parameters of the constructor of the [Type](xref:System.Type). The following aspects could be configured:

* Parameter [Type](xref:System.Type)
* Force resolution of parameter
* Specify the Contract/Registration Name to by used when resolving
* Provide a Resolver for the parameter
* Provide value
 
> [!TIP]
> As alternative, helper [Invoke.Constructor(...)](xref:Unity.Invoke#Unity_Invoke_Constructor) can be used to configure invoked constructor.

#### See Also

* [Implicit Constructor Registration](xref:Tutorial.Injection.Constructor.Implicit)
* [Constructor Annotation](xref:Tutorial.Injection.Constructor.Annotation)
* [Invoke default constructor](xref:Tutorial.Injection.Constructor.Default)
* [Select constructors by parameters count](xref:Tutorial.Injection.Constructor.Count)
* [Select constructors by parameter types](xref:Tutorial.Injection.Constructor.Types)
* [Select constructors based on injected values](xref:Tutorial.Injection.Constructor.Values)
