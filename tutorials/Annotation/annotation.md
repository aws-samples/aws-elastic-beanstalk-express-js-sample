---
uid: Tutorial.Annotation
title: Attributed Injection Model
---

# Attributed Injection Model

One of the most useful and powerful techniques when using Unity is to take advantage of dependency injection for the parameters of class constructors and methods, and for the values of fields and properties. This approach allows you to resolve and populate the entire hierarchy of objects used in your application based on type registrations and mappings defined in the container, with the subsequent advantages this offers.

You can specify constructor, field, property, and method call injection information in configuration or by adding registrations to the container at run time. You can also apply attributes to members of your classes to indicate injection targets. When you resolve these classes through the container, Unity will generate instances of the dependent objects and wire up the injection targets with these instances.

## Using Injection Attributes

Normally, Unity performs selection of the constructor automatically by choosing the most complex constructor it can satisfy with dependencies and populating these parameters with resolved values when it constructs the object. In some cases, for various reasons, the constructor could not be selected successfully and container may throw an exception.

### Constructor Annotation

To disambiguate selection or to override automatic behavior you could specify which constructor Unity should use to construct the object by marking it with [InjectionConstructor](xref:Unity.InjectionConstructorAttribute) attribute.

### Member Annotation

Property, field, and method call injections do not occur automatically unless registered with appropriate injection members at run time. To enable automatic member injection for types you can add attributes to the members of your classes to force injection of dependent objects when the target class is resolved.

#### Required and Optional

Fields, Properties, and Parameters could be annotated with either [Dependency](xref:Unity.DependencyAttribute) or [OptionalDependency](xref:Unity.OptionalDependencyAttribute) attributes to indicate that these require values to be injected. For annotating methods you wish to be called during initialization you could use [InjectionMethod](xref:Unity.InjectionMethodAttribute)

For more information, see:

* [Annotating types for **Constructor** invocation](xref:Tutorial.Annotation.Constructor)
* [Annotating types for **Method** invocation](xref:Tutorial.Annotation.Method)
* [Annotating **Parameter** for injection](xref:Tutorial.Annotation.Parameter)
* [Annotating types for **Field** injection](xref:Tutorial.Annotation.Field)
* [Annotating types for **Property** injection](xref:Tutorial.Annotation.Property)
