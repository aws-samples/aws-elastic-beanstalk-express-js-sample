---
uid: Tutorial.Resolution.Override.Dependency
title: Dependency Override
---

# Dependency Override

[Dependency override](xref:Unity.Resolution.DependencyOverride) is a special kind of override. It does not target any members or parameters. Instead, it overrides a contract that the container would have resolved when requested. In other words, when the dependency is being resolved from the container, if the contract matches, it will provide that value instead.

## Injected Members and Dependency overrides

There are two types of dependency injection the Unity container supports:

* Value injection
* Value resolution

To understand how [Dependency Override](xref:Unity.Resolution.DependencyOverride) works you need to remember, it only overrides resolved values.

### Injected Values

Values are injected during [Type](xref:System.Type) registration. At that time you provide instructions on how to initialize the [Type](xref:System.Type) and its members. The members injected with values via Injection Members will not be affected by the [Dependency Override](xref:Unity.Resolution.DependencyOverride).

### Resolved Values

All the dependencies that are not injected with values, or injected with resolve redirection are potential targets for the override. Anything that asks the container to resolve a value can be [Dependency Overridden](xref:Unity.Resolution.DependencyOverride).

## Overriding dependencies

[Dependency Override](xref:Unity.Resolution.DependencyOverride) enables you to specify an override for the specified dependency type contract. It, enables you to pass in an object that will be returned as a dependency, instead of the one resolved from the container.
