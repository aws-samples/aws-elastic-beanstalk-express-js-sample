---
uid: Tutorial.Resolution.Override
title: Resolution Override
---

# Overriding dependencies during resolution

The parameter and dependency overrides, ParameterOverride and DependencyOverride, are ResolverOverride implementations that provide support for overriding the registration information for resolving instances of types. When you call the Resolve method, these classes enable you to override values specified when the type was registered, such as by a RegisterType or RegisterInstance statement. In effect, RegisterType supplied values are overridden by Resolve supplied values.

Use ParameterOverride to override the specified constructor parameter or parameters. The override applies everywhere the parameter appears unless you use OnType to constrain the override to a specified type. Since the purpose of overrides is to affect the resolution of dependencies for all relevant created objects, not just the object requested in the call to Resolve, unconstrained overrides can produce errors if there are unconstrained ParameterOverride parameters that match parameters with the same name but different types on the selected constructors for objects created in a given resolve operation.

Use PropertyOverride to override the value of the specified property or properties. The override applies everywhere the property appears unless you use OnType to constrain the override to a specified type.

Use DependencyOverride to override the value injected whenever there is a dependency of the given type. DependencyOverride overrides all instances where the type matches. Both parameter overrides and dependency overrides support generic types and multiple overrides.

Overrides work with the constructor that is selected for the type, by attribute or configuration. If the constructor to be used is not identified with an attribute or explicit container configuration, then the default behavior is that the constructor with the most parameters will be used.
 
A parameter and property override never affects what element gets selected. They only control the value of the specified parameter or property. You do not change which constructor is called with an override, and you do not change which properties get set with an override.

* [Parameter Overrides](xref:Tutorial.Resolution.Override.Parameter)
* [Property Overrides](xref:Tutorial.Resolution.Override.Property)
* [Field Overrides](xref:Tutorial.Resolution.Override.Field)
* [Dependency Overrides](xref:Tutorial.Resolution.Override.Dependency)

![Resolver Override](/images/resolver-override.png)
