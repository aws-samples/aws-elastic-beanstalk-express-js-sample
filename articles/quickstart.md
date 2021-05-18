---
uid: Article.Unity.Using
---

# Using Unity in Applications

This topic describes how to develop applications using Unity, and how to create and build instances of objects. It assumes that you familiar with dependency injection and separation of concerns concepts.

## The Container

Unity exposes very compact API to operate the container. The most operations related to registration, resolution, and lifetime management is exposed through one interface - **[IUnityContainer](xref:Unity.IUnityContainer)**.

To start using Unity you need to create an instance of the container and get reference to [IUnityContainer](xref:Unity.IUnityContainer) interface:

```cs
IUnityContainer container = new UnityContainer();
```

## Creating instances

Once container is created you could start using it immediately:

```cs
IUnityContainer container = new UnityContainer();
var value = container.Resolve<object>();

// Calling Resolve<object>() is the same as 
value = new object(); 
```

It will create any type with accessible constructor. Consider following example:

```cs
// Simple class Foo
public class Foo
{
    public Foo() { }

    public Foo(object obj) { }

    public Foo(string id, object obj) { }
}

// Create container
IUnityContainer container = new UnityContainer();

// Resolve Foo
var value = container.Resolve<Foo>();

// value created with constructor 'Foo(object obj)'
```

`Foo` is a simple class with three public constructors. When `Resolve<Foo>()` is called, Unity will evaluate available constructors and select one with longest list of parameters it can satisfy with dependencies. It will create all required dependencies and pass them to selected constructor during initialization.

In this particular case Unity will select second constructor with parameter `obj` of type [Object](xref:System.Object). Although constructor `Foo(string id, object obj)` is longer, it has parameter of type [String](xref:System.String) which is a primitive type. Unity can not create primitive types by itself. If you want to make these available for dependency injection you would need to register them with the container. For Unity to select third constructor `Foo(string id, object obj)` you need to register string instance with container:

```cs
// Register string instance
container.RegisterInstance("xyz");

// Resolve Foo
var value = container.Resolve<Foo>();

// value created with constructor 'Foo(string id, object obj)'
```

For more information on how Unity selects members see [Member Selection](xref:Tutorial.Resolution.Selection)

## Type Mapping

In service oriented architecture contracts are represented by interfaces and components implement these contracts to provide services. Consider these types:

```cs
// Public service contract
public interface IService 
{
    // Service API
}


// Component implementing the contract
public class Component : IService
{
    // Some logic here
}


// Service consumer
public class Foo
{
    public Foo(IService service)
    {
        // Some logic here
    }
}
```

In this example we have `IService` interface defining an API and class `Component` implementing that API. Type `Foo` is a consumer of the service and should be injected by container with an instance of the service during initialization.

If you just call `container.Resolve<IService>()` it will throw an exception complaining that it can not create an interface of type `IService`. You need to register a [Type Mapping](xref:Tutorial.Mapping) to instructs Unity how to create service of type `IService`:

```cs
// Register mapping between IService and Component
container.RegisterType<IService, Component>();

// Resolve Foo
var value = container.Resolve<Foo>();

// value created with constructor 'Foo(IService service)'
```

During the resolution, when Unity will try to satisfy dependencies, it will look for a registration for each dependency and will find this mapping. It will create `Component` and passes it to constructor of `Foo` as `IService`.

For more information see [Type Mapping](xref:Tutorial.Mapping)

## Lifetime

By default Unity creates a new instance every time type is requested. Instances it created are not tracked or managed by the container.

```cs
// Register mapping between IService and Component
container.RegisterType<IService, Component>();

// Resolve IService
var value1 = container.Resolve<IService>();
var value2 = container.Resolve<IService>();

// value1 and value2 are not the same
```

To enable lifetime management, type needs to be registered with one of the compatible [lifetime managers](xref:Unity.Lifetime). Depending on registration type Unity provides three helpers:

* [TypeLifetime](xref:Unity.TypeLifetime)
* [InstanceLifetime](xref:Unity.InstanceLifetime)
* [FactoryLifetime](xref:Unity.FactoryLifetime)

For example, to make `IService` a singleton for the entire application and create it only once you would register it like this:

```cs
// Register mapping between IService and Component
container.RegisterType<IService, Component>(TypeLifetime.Singleton);

// Resolve IService
var value1 = container.Resolve<IService>();
var value2 = container.Resolve<IService>();

// value1 and value2 are the same instance of Component
```

For more information see [Lifetime Management](xref:Tutorial.Lifetime)