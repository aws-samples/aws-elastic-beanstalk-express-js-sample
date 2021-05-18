---
uid: Tutorial.Lifetime.Container.Transient
title: Container Lifetime
---

# Container Transient Lifetime

This lifetime is similar to <xref:Tutorial.Lifetime.Transient> with exception how the container holds references to created objects.

On each call to the `Resolve<T>()` method a container will create a new objects. If the objects implements [IDisposable](xref:System.IDisposable), the container will hold a reference to the interface and will dispose the object when the container goes out of scope.

This lifetime is particularly useful in session based designs with child containers associated with the session.

## The Lifetime Manager

Per container transient lifetime is controlled by [ContainerControlledTransientManager](xref:Unity.Lifetime.ContainerControlledTransientManager) type. This lifetime manager creates transient objects and holds reference to disposable instance and disposes these when container goes out of scope.

## Registration

Per container transient lifetime is only supported by [Type](xref:Tutorial.Registration.Type) and [Factory](xref:Tutorial.Registration.Factory) registrations. [Instance](xref:Tutorial.Registration.Instance) registration does not support this lifetime.

### Example

To create a Type registration with per container transient lifetime:

```C#
container.RegisterType<IService, Service>(TypeLifetime.PerContainerTransient);
```

or you could register a factory:

```C#
container.RegisterFactory<IService>((c, t, n) => new Service(),
                                    FactoryLifetime.PerContainerTransient);
```

> [!NOTE]
> Please note that registrations use [TypeLifetime](xref:Unity.TypeLifetime#Unity_TypeLifetime_PerContainerTransient) and [FactoryLifetime](xref:Unity.FactoryLifetime#Unity_FactoryLifetime_PerContainerTransient) respectively.

## See Also

[!include [Managers List](managers.md)]
