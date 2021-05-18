---
uid: Tutorial.Lifetime.External
title: External Lifetime
---

# External Lifetime

This lifetime allows you to register externally created objects with the container to enable them to participate in dependency injection process. Unity maintains only a weak reference to the instances it registers.

Since the container does not maintain a strong reference to the object, the garbage collector can dispose of the objects if no other code is keeping it alive.

## The Lifetime Manager

External lifetime is controlled by [ExternallyControlledLifetimeManager](xref:Unity.Lifetime.ExternallyControlledLifetimeManager) type and provides basic support for externally managed objects.

## Registration

External lifetime is only supported by [Instance](xref:Tutorial.Registration.Instance) registrations.

External lifetime is similar to <xref:Tutorial.Lifetime.Container>. It is held at the same container it is registered with and could be accessed and overridden in child container. Registrations with external lifetime override singletons with the same contract.

### Example

To create a registration with external lifetime:

```C#
var instance = new Service();
...
container.RegisterInstance<IService>(instance, InstanceLifetime.External);
```

## See Also

[!include [Managers List](managers.md)]
