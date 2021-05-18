---
uid: Tutorial.Lifetime.Thread
title: Per Thread Lifetime
---

# Per Thread Lifetime

Per thread lifetime means a new instance of the registered [Type](xref:System.Type) will be created once per each thread. In other words, if a `Resolve<T>()` method is called on a thread the first time, it will return a new object. Each subsequent call to `Resolve<T>()`, or when the dependency mechanism injects instances of the type into other classes on the same thread, the container will return the same object.

## The Lifetime Manager

Per thread lifetime is controlled by [PerThreadLifetimeManager](xref:Unity.Lifetime.PerThreadLifetimeManager) type. This lifetime manager effectively implements a singleton behavior for objects on a per-thread basis.

## Registration

Per thread lifetime is only supported by [Type](xref:Tutorial.Registration.Type) and [Factory](xref:Tutorial.Registration.Factory) registrations. [Instance](xref:Tutorial.Registration.Instance) registration does not support this lifetime.

### Example

To create a Type registration with per thread lifetime:

```C#
container.RegisterType<IService, Service>(TypeLifetime.PerThread);
```

or you could register a factory:

```C#
container.RegisterFactory<IService>((c, t, n) => new Service(),
                                    FactoryLifetime.PerThread);
```

> [!NOTE]
> Please note that registrations use [TypeLifetime](xref:Unity.TypeLifetime#Unity_TypeLifetime_PerThread) and [FactoryLifetime](xref:Unity.FactoryLifetime#Unity_FactoryLifetime_PerThread) respectively.

## See Also

[!include [Managers List](managers.md)]
