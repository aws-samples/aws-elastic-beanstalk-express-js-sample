---
uid: Tutorial.Lifetime.Container
title: Per Container Lifetime
---

# Per Container Lifetime

Per Container lifetime allows a registration of an existing or resolved object as a scoped singleton in the container it was created or registered. In other words this instance is unique within the container it was registered with. Child or parent containers could have their own instances registered for the same contract.

Unity returns the same instance each time the `Resolve` method is called or when the dependency mechanism injects the instance into other classes.

## The Lifetime Manager

 Per container lifetime is controlled by [ContainerControlledLifetimeManager](xref:Unity.Lifetime.ContainerControlledLifetimeManager) type. This lifetime manager effectively implements a singleton behavior for objects registered with a particular container.

## Registration

Per container lifetime is supported by all registration types

### Example

To create a Type registration with per container lifetime:

```C#
container.RegisterType<IService, Service>(TypeLifetime.PerContainer);
```

to register a factory:

```C#
container.RegisterFactory<IService>((c, t, n) => new Service(),
                                    FactoryLifetime.PerContainer);
```

or to register an instance:

```C#
var instance = new Service();

container.RegisterInstance<IService>(instance, InstanceLifetime.PerContainer);
```

> [!NOTE]
> Please note that registrations use [TypeLifetime](xref:Unity.TypeLifetime#Unity_TypeLifetime_PerContainer), [FactoryLifetime](xref:Unity.FactoryLifetime#Unity_FactoryLifetime_PerContainer), and [InstanceLifetime](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_PerContainer) respectively.

## See Also

[!include [Managers List](managers.md)]
