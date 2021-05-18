---
uid: Tutorial.Resolution
title: Object Resolution
---

# Resolving Objects

There are types you can create immediately from the container and there are types that require registration. Generally any primitive type would require registration and all classes are available immediately.

You can use the Unity container to generate instances of any object that has a public constructor (in other words, objects that you can create using the new operator). When you call the Resolve method and specify the type that is not registered, the container simply generates and returns an instance of that type. However, the only time that this is realistically practical is when the object you are generating does not have ambiguities Unity could not resolve or contains dependency attributes that the container will use to inject dependent objects into the requested object.

The Unity container identifies type registrations and type mappings in the container using a type and, optionally, a name. The type is an interface or a class (usually an interface or base class) that the desired concrete object type implements or inherits. This identifies the mapping so that the container can retrieve the correct object type in response to a call to the `Resolve` method. Where there is more than one mapping for the same type, the optional name differentiates these mappings and allows code to specify which of the mappings for that type to use.

The provision of both generic and non-generic overloads of many of the Unity container methods ensures that Unity can be used in languages that do not support generics. You can use either approach (the generic or the non-generic overloads) in your code and mix them as required.

The following topics describe how you can resolve objects using the Resolve or BuildUp methods:

* [Resolving an Object by Type](xref:Tutorial.Resolution.Type)
* [Resolving collections of Objects of a Particular Type](xref:Tutorial.Collections)
* [Resolving Generic Types](xref:Tutorial.Generics)
* [Deferring the Resolution of Objects](xref:Tutorial.Deferred)
* [Overrides](xref:Tutorial.Resolution.Override)

For more information about how you can configure Unity with type registrations and mappings, see Registration.

For more information about how you can perform dependency injection on existing object instances, see Using BuildUp to Wire Up Objects Not Created by the Container.