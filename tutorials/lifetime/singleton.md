---
uid: Tutorial.Lifetime.Singleton
title: Singleton Lifetime
---

# Singleton Lifetime

Singleton lifetime creates globally unique singleton. Any Unity container tree (parent and all the children) is guaranteed to have only one global singleton for the registered type.

## The Lifetime Manager

The singleton lifetime is controlled by [SingletonLifetimeManager](xref:Unity.Lifetime.SingletonLifetimeManager) type.

## Registration

Registering a type with singleton lifetime always places the registration at the root of the container tree and makes it globally available for all the children of that container. It does not matter if registration takes places at the root of child container the destination is always the root node.

Repeating the registration on any of the child nodes with singleton lifetime will always override the root registration.

Singleton lifetime is supported by all registration types.

### Example

To create a Type registration with singleton lifetime:

```C#
container.RegisterType<IService, Service>(TypeLifetime.Singleton);
```

to register a factory:

```C#
container.RegisterFactory<IService>((c, t, n) => new Service(),
                                    FactoryLifetime.Singleton);
```

or to register an instance:

```C#
var instance = new Service();

container.RegisterInstance<IService>(instance, InstanceLifetime.Singleton);
```

> [!NOTE]
> Please note that registrations use [TypeLifetime](xref:Unity.TypeLifetime#Unity_TypeLifetime_Singleton), [FactoryLifetime](xref:Unity.FactoryLifetime#Unity_FactoryLifetime_Singleton), and [InstanceLifetime](xref:Unity.InstanceLifetime#Unity_InstanceLifetime_Singleton) respectively.

## See Also

[!include [Managers List](managers.md)]
