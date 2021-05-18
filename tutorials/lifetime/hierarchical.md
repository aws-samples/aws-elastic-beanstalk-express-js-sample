---
uid: Tutorial.Lifetime.Hierarchical
title: Hierarchical Lifetime
---

# Hierarchical Lifetime

The Unity container allows creating hierarchies of child containers. This lifetime creates local singleton for each level of the hierarchy. So, when you resolve a type and this container does not have an instance of that type, the container will create new instance. Next time the type is resolved the same instance will be returned.

If a child container is created and requested to resolve the type, the child container will create a new instance and store it for subsequent resolutions. Next time the child container requests to resolve the type, it will return the stored instance.

If you have multiple children, each will resolve its own instance.

## The Lifetime Manager

Hierarchical lifetime is controlled by [HierarchicalLifetimeManager](xref:Unity.Lifetime.HierarchicalLifetimeManager) type. It forces each child container to resolve its own instance of the object and does not share one with the parent or child containers.

## Registration

Hierarchical lifetime is only supported by [Type](xref:Tutorial.Registration.Type) and [Factory](xref:Tutorial.Registration.Factory) registrations. [Instance](xref:Tutorial.Registration.Instance) registration does not support this lifetime.

### Example

To create a Type registration with hierarchical lifetime:

```C#
container.RegisterType<IService, Service>(TypeLifetime.Hierarchical);
```

or you could register a factory:

```C#
container.RegisterFactory<IService>((c, t, n) => new Service(),
                                    FactoryLifetime.Hierarchical);
```

> [!NOTE]
> Please note that registrations use [TypeLifetime](xref:Unity.TypeLifetime#Unity_TypeLifetime_Hierarchical) and [FactoryLifetime](xref:Unity.FactoryLifetime#Unity_FactoryLifetime_Hierarchical) respectively.

## See Also

[!include [Managers List](managers.md)]
