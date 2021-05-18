---
uid: Article.Unity.Design
---

# Design of Unity

Unity was designed to achieve the following goals:

* Promote the principles of modular design through aggressive decoupling.
* Maximize testability when designing applications.
* Provide a fast and lightweight dependency injection platform for creating new as well as managing existing objects.
* Expose a compact and intuitive API for developers to work with.
* Support a wide range of languages, and platforms.
* Allow attribute-driven injection for constructors, properties, fields, and methods.
* Provide extensibility through container extensions.
* Provide stability required in enterprise-level line of business (LOB) applications.

To allow maximum flexibility Unity container split into **core** and **extension** packages. Core packages implement basic [IoC](https://en.wikipedia.org/wiki/Inversion_of_control)/[DI](https://en.wikipedia.org/wiki/Dependency_injection) functionality and extensions provide specific behavior such as configuration, decoration, and etc.

## Unity Core

Unity core consists of two assemblies:

* `Unity.Abstractions`
* `Unity.Container`

`Unity.Abstractions` assembly contains all public declarations required to use the container in applications and relatively unchanged from version to version. It defines [IUnityContainer](xref:Unity.IUnityContainer) interface as well as types and interfaces used to register, configure and resolve types and instances.

`Unity.Container` assembly implements the IoC engine and exposes public members required to extend the container.

### Core Packages

For legacy support and general convenience core library is distributed in two different forms:

* as composite package [Unity](https://www.nuget.org/packages/Unity/)
* as independent packages [Unity.Abstractions](https://www.nuget.org/packages/Unity.Abstractions/) and [Unity.Container](https://www.nuget.org/packages/Unity.Container/)

#### Composite package [Unity](https://www.nuget.org/packages/Unity/)

This is a convenience package containing both `Unity.Abstractions` as well as `Unity.Container` assemblies. This package is distributed to support legacy applications.

#### Independent Packages [Unity.Abstractions](https://www.nuget.org/packages/Unity.Abstractions/) and [Unity.Container](https://www.nuget.org/packages/Unity.Container/)

To allow easier path to upgrade and maximum decoupling between declarative part and implementation, Unity split into two assemblies: [Unity.Abstractions](https://www.nuget.org/packages/Unity.Abstractions/) and [Unity.Container](https://www.nuget.org/packages/Unity.Container/)

When used in libraries it allows linking to Unity.Abstractions and referencing Unity.Container only in bootstrapping project.

## Unity Extensions

Unity project implements and distributes several extensions such as Unity.Configuration, Unity.Interception, [and etc.](https://www.nuget.org/packages?q=unitycontainer)

## More Information

For more information about using packages inside applications see [Application Design](xref:Article.Application.Design) concepts with Unity.
