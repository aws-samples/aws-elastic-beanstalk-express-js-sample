---
uid: Tutorial.Registration.Instance
title: Instance Registration
---

# Instance Registration

Registering instances is useful if you already have an instance of an object that you have previously created and want Unity to manage its lifetime, or if you want Unity to inject that object into other objects that it is resolving. 

From container's point of view instance registration is in every way similar to type registration, except that it does not need to create the instance on the first Resolve request. It simply gets the object from lifetime manager and returns it as requested. The LifetimeManager controls the lifetime of the object and disposes it when appropriate.

## Registration of an Existing Object Instances

The [RegisterInstance](xref:Unity.IUnityContainer#Unity_IUnityContainer_RegisterInstance_System_Type_System_String_System_Object_Unity_Lifetime_IInstanceLifetimeManager_) method registers an existing instance with the container. You specify the instance type and optional lifetime in the parameter list. The container will return the specified existing instance for the duration of the specified lifetime. Unity container offers several overloads to simplify registration syntax. The simplest instance registration does not require any additional parameters other than instance itself:

```cs
var instance = new Service();

container.RegisterInstance(instance);
```

Resolving type **Service** like this `container.Resolve<Service>()` will return an instance of the **Service** object we registered.

## Metadata

Instance registration, as any other registration type, supports adding a registration [Name](xref:Tutorial.Registration.Metadata#name). Doing so lets you register multiple instance of the same `Type` for later retrieval as a collection. Using overload you can write it like this:

```cs
container.RegisterInstance("Some Name", instance);
```

## Type mapping

Any instance can also be registered as any of the ancestral types or any of the interfaces it implements effectively creating a mapping between these types. 

```cs
var instance = new Service();

container.RegisterInstance<IService>(instance);
container.RegisterInstance<IService>("Some Name", instance);
or
container.RegisterInstance(typeof(IService), instance)
container.RegisterInstance(typeof(IService), "xyz", instance)
```

In this example Unity creates two registrations of type **IService**. When either is resolved it returns the instance of the **Service** object we registered with container. For more information see [Type Mapping](xref:Tutorial.Mapping)

## Lifetime

Due to the fact that container does not create these instances, the instance registration only supports limited number of compatible lifetimes:

### [Per Container](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_PerContainer)

By default Unity uses [Per Container](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_PerContainer) lifetime manager when no manager specified explicitly. So all these examples above will be registered with container scope. Unity will keep these instances referenced and alive until the container is alive. Although it is not necessary to provide container controlled lifetime manager you can still write it like this:

```cs
container.RegisterInstance("Some Name", instance, InstanceLifetime.PerContainer);
container.RegisterInstance<IService>("Some Name", instance, InstanceLifetime.PerContainer);
```

### [Singleton](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_Singleton)

Instances can be registered as global singletons by using [Singleton](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_Singleton) lifetime manager:

```cs
container.RegisterInstance("Some Name", instance, InstanceLifetime.Singleton);
container.RegisterInstance<IService>("Some Name", instance, InstanceLifetime.Singleton);
```

These instances will be kept alive until root container is disposed.

### [External](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_External)

If Unity is not supposed to control lifetime of the object the [External](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_External) lifetime manager is used:

```cs
container.RegisterInstance<IService>("Some Name", instance, InstanceLifetime.External);
```

[External](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_External) lifetime manager is also useful when same instance is registered via multiple interfaces. In this case only one registration should use [Per Container](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_PerContainer) or [Singleton](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_Singleton) manager and the rest should be registered with [External](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_External) lifetime manager. This way, when object is disposed, it is not disposed multiple times:

```cs
container.RegisterInstance(instance, InstanceLifetime.Singleton);

container.RegisterInstance<IService>(        instance, InstanceLifetime.External);
container.RegisterInstance<IService>("Name", instance, InstanceLifetime.External);
```
