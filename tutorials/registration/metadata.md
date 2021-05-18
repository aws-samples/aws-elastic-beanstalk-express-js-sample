---
uid: Tutorial.Registration.Metadata
title: Registration Metadata
---

During registration Unity relies on information you provide to properly register types, instances, and factories. This is a description of metadata you could provide to properly declare how the `Type` should be registered and  built:

## [Registered Type](xref:Unity.IContainerRegistration#Unity_IContainerRegistration_RegisteredType)

A `Type` that will be requested during resolution is called **Registered Type**. In the example below `SomeType` would be a registered type. 

```cs
container.RegisterType<SomeType>();
...
var value = container.Resolve<SomeType>();
```

Different container authors call this type by different names, [FromType](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ee650974(v%3dpandp.10)), [ServiceType](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.servicedescriptor.servicetype), etc. The key point to remember is that this is the `Type` container will be referencing in the internal registry and will be looking for when executing the resolve.

## [Name](xref:Unity.IContainerRegistration#Unity_IContainerRegistration_Name)

Each registration must be unique within the scope on a container it is registered with. A registration is identified by two pieces of information: **`Registered Type`** and **`Name`**. 
Adding the name to registration allows multiple 'instances' of the same type to be registered with the container.

For example, if you register the same service with no name multiple times, each subsequent registration will override the last because in each case you are registering the same type `IService` with the same name `null`:

```cs
container.RegisterType<IService, Service1>();
container.RegisterType<IService, Service2>();
container.RegisterType<IService, Service3>();

var enumeration = container.Resolve<IEnumerable<IService>>();
var count = enumeration.Count();
```

The value of variable `count` will be `1`.

Adding unique names to registrations makes each unique:

```cs
container.RegisterType<IService, Service1>("1");
container.RegisterType<IService, Service2>("2");
container.RegisterType<IService, Service3>("3");

var enumeration = container.Resolve<IEnumerable<IService>>();
var count = enumeration.Count();
```

In this example the value of variable `count` will be `3`.

## [Mapped To Type](xref:Unity.IContainerRegistration#Unity_IContainerRegistration_MappedToType)

Sometimes it is also called [ToType](https://docs.microsoft.com/en-us/previous-versions/msp-n-p/ee650974(v%3dpandp.10)), [ImplementationType](https://docs.microsoft.com/en-us/dotnet/api/microsoft.extensions.dependencyinjection.servicedescriptor.implementationtype), and etc. It describes the type Unity should use to create the instance. `Mapped To Type` must be descendant of, or it should implement the `Registered Type`. In other words, it must be assignable to a variable of `Registered Type`.

This registration member creates a mapping between service and implementation types. In the following example `IService` is mapped to `Service` and when Unity container is asked to resolve `IService` it will, in turn, create an instance of type `Service` and return it as interface `IService`.

```cs
container.RegisterType<IService, Service>();

var result = container.Resolve<IService>();

Assert(typeof(Service) == result.GetType())
```

For more information see [Type Mapping](xref:Tutorial.Mapping).

## [Lifetime Manager](xref:Unity.IContainerRegistration#Unity_IContainerRegistration_LifetimeManager)

This member holds a reference to a lifetime manager that Unity will be using to manage instance(s) of this type. For more information see [Lifetime Management](../lifetime/lifetime.md).
