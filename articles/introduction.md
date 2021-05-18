---
uid: Article.Unity.Introduction
---

# Unity Container Introduction

## Overview

Unity Container is a full featured, general-purpose [IoC container](https://en.wikipedia.org/wiki/Inversion_of_control) for use in any type of .NET application. It is [Open Source](https://en.wikipedia.org/wiki/Open_source) and released under [Apache 2.0 license](https://github.com/unitycontainer/unity/blob/master/LICENSE).

Unity is extensible. Anyone can write an extensions that changes the behavior of the container, or adds new capabilities. For example, the interception feature provided by Unity, which you can use to add policies to objects, is implemented as a container extension.

## What Does Unity Do

Apart from decoupling types, components, services, and separating concerns, Unity crates and manages objects. Think of it as operator [new ...](https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/new-operator) on steroids.

* [The Types of Objects Unity Can Create](#the-types-of-objects-unity-can-create)
* [Registering Existing Types and Object Instances](#registering-types-and-object-instances)
* [Managing the Lifetime of Objects](#managing-the-lifetime-of-objects)
* [Specifying Values for Injection](#specifying-values-for-injection)
* [Populating collections](#populating-collections)
* [Support for deferred resolution](#support-for-deferred-resolution)

## The Types of Objects Unity Can Create

You can use the Unity container to generate instances of any object that has a public constructor (in other words, objects that you can create using the new operator). During object instantiation Unity can:

* Select appropriate constructor 
* Inject constructor with parameters
* Inject public properties with values
* Inject public fields with values
* Call any public method on the created object

### Registering Types and Object Instances

Unity can resolve any concrete, constructable reference type without registration. For example calling `container.Resolve<object>()` will produce an instance immediately. 

Registrations allow mapping between service types and implementation types. Create a blueprint of how instances instantiated, initialized, and managed. For generic types it creates internal mini factories that used to generate concrete types. Unity supports three ways of registering types:

#### Instance registration

Unity exposes a method named [RegisterInstance](xref:Unity.IUnityContainer#Unity_IUnityContainer_RegisterInstance_System_Type_System_String_System_Object_Unity_Lifetime_IInstanceLifetimeManager_) that you can use to register existing instances with the container. The instance could be registered as concrete type, a type of the instance you would get by calling `instance.GetType()`, or it could be registered as any of the interfaces the instance implements. Lifetime of registered instance could be either controlled by container it is registered with or externally, in which case Unity just keeps weak reference to the object.

#### Factory registration

Method [RegisterFactory](xref:Unity.IUnityContainer#Unity_IUnityContainer_RegisterFactory_System_Type_System_String_System_Func_Unity_IUnityContainer_System_Type_System_String_System_Object__Unity_Lifetime_IFactoryLifetimeManager_) provides a way to register a factory delegate Unity would call when required to provide the type.

#### Type registration

[RegisterType](xref:Unity.IUnityContainer#Unity_IUnityContainer_RegisterType_System_Type_System_Type_System_String_Unity_Lifetime_ITypeLifetimeManager_Unity_Injection_InjectionMember___) is a method where you can instruct Unity how to create and initialize objects from scratch. You can specify:

* Constructor to call 
* Parameters to pass to the constructor or how to resolve them
* Properties to initialize and how to do it
* Fields to inject and with what
* Methods to call on the created object and parameters to pass to these methods
* Specify how lifetime should be managed

## Managing the Lifetime of Objects

Unity allows you to choose the lifetime of the objects it creates. By default, Unity creates a new instance of a type each time you resolve that type. However, you can use different lifetime managers to specify a required lifetime for resolved instances. For example, you can specify that Unity should maintain only a single instance (a singleton). It will create a new instance only if there is no existing instance. If there is an existing instance, it will return a reference to this instead. There are also other lifetime managers you can use.

## Specifying Values for Injection

Unity allows configurations where dependencies are resolved from the container. But it also provides an easy way to configure injection of values at registration. In other words you could provide values for dependencies to be registered and used during subsequent resolutions. 

Unity also allows overriding of any dependency values during resolution. It could override any configured or resolved value during resolution of the type.

## Populating collections

Unity has built-in support for resolving arrays and enumerations of types. For example it would recognize following types as collections and resolve them using proper algorithm:

* `Resolve<T[]>()`
* `Resolve<IEnumerable<T>>()`
* `Resolve<List<T>>()`

## Support for deferred resolution

Unity container implements strategies to allow deferred resolution of types. It has two types of deferred resolvers:

* `Func<T>` - Creates factory method which instantiates type **T** on demand.
* `Lazy<T>` - Creates `Lazy<T>` object and passes it to created type.

