---
uid: Tutorial.Annotation.Constructor
title: Annotating Type for Constructor Injection
---

# Selecting Constructor

To select constructors you create through the Unity container, you can use the following three techniques:

* [Automatic Constructor Injection](xref:Tutorial.Selection.Constructor). With this technique, you allow the Unity container to select a constructor and to satisfy any constructor dependencies defined in parameters of the constructor automatically. For more information see <xref:Tutorial.Selection.Constructor>.

* [Constructor Injection using explicit registration](xref:Tutorial.Injection.Constructor). With this technique, you register the [Type](xref:System.Type) and apply an [Injection Constructor Member](xref:Unity.Injection.InjectionConstructor) that specifies the dependencies to the registration. For more information see <xref:Tutorial.Injection.Constructor>

* **Annotated Constructor Injection**. With this technique, you apply [InjectionConstructor](xref:Unity.InjectionConstructorAttribute) attribute to one of the class constructors to designate it to be used to instantiate an instance.

## Annotated Constructor Injection

Constructor Injection with Attribute Annotation allows you to apply attributes to the class' constructor designating it for dependency injection. When creating the class, Unity will always (unless explicitly overwritten in Registration) use that constructor. You only need to use this technique when there is more than one constructor in the target type.

### Annotating a Constructor

When a target class contains more than one constructor and the automatic algorithm does not provide desired selection, you may use the [InjectionConstructor](xref:Unity.InjectionConstructorAttribute) attribute to specify the constructor you wish to use for injection.

Consider the following [Type](xref:System.Type):

[!code-csharp [class Service](../../src/SpecificationTests/src/Constructor/Attribute/Setup.cs#class_service)]

In this example type `Service` contains four public constructors. Three of these constructors have one parameter each. A [Type](xref:System.Type) like this creates an ambiguity that Unity could not resolve by itself.

> [!WARNING]
> During resolution, the container will pick the first constructor it could satisfy with dependencies and will use it. In the example above, it could be any of the three constructors with one parameter.

The container is not trying to validate all available contractors during normal execution.

> [!NOTE]
> If [Diagnostic](xref:Tutorial.Extension.Diagnostic) extension is enabled, Unity will throw an exception reporting ambiguous constructors.

Normally, Unity would select the third constructor with three parameters, but by annotating the second constructor with the attribute you force Unity to use it during resolution.

### Multiple Constructor Annotations

Annotating multiple constructors with injection parameters is not recommended. Unity is not guaranteed to process constructors in certain order. If multiple constructors are annotated, behavior might change from version to version.

> [!NOTE]
> If [Diagnostic](xref:Tutorial.Extension.Diagnostic) extension is enabled, Unity will throw an exception reporting ambiguous constructor annotations.