---
uid: Tutorial.Lifetime.Resolve
title: Per Resolve Lifetime
---

# Per Resolve Lifetime

This lifetime keeps a reference to an instance only for the duration of one resolution call. This type of lifetime is useful when you need to pass the same instance of the dependency to a different nodes of the resolution graph. Consider this scenario:

```cs

class a {}

class b
{
    b(a arg)
    {...}
}

class c
{
    c(a arg1, b arg2)
    {...}
}

```

When you resolve type `c`, it depends on type `b` and type `a`. Type `b`, in turn, also depends on type `a`, and both types, `c` and `b`, require `a` to be the same instance.

If type `a` is a singleton, the logic is easy. But if you require each instance of `c` to have a unique `a`, you could use per resolve lifetime. The instance of `a` will act as a singleton only during that one resolution. Next call to resolve the dependent type will create a new object.

In the case of recursion, the singleton behavior is still applies and prevents circular dependency.

## The Lifetime Manager

Per resolve lifetime is controlled by [PerResolveLifetimeManager](xref:Unity.Lifetime.PerResolveLifetimeManager) type. This lifetime manager effectively implements a singleton behavior for objects on a per-resolve basis.

## Registration

Per resolve lifetime is only supported by [Type](xref:Tutorial.Registration.Type) and [Factory](xref:Tutorial.Registration.Factory) registrations. [Instance](xref:Tutorial.Registration.Instance) registration does not support this lifetime.

### Example

To create a Type registration with per resolve lifetime:

```C#
container.RegisterType<IService, Service>(TypeLifetime.PerResolve);
```

or you could register a factory:

```C#
container.RegisterFactory<IService>((c, t, n) => new Service(),
                                    FactoryLifetime.PerResolve);
```

> [!NOTE]
> Please note that registrations use [TypeLifetime](xref:Unity.TypeLifetime#Unity_TypeLifetime_PerResolve) and [FactoryLifetime](xref:Unity.FactoryLifetime#Unity_FactoryLifetime_PerResolve) respectively.

## See Also

[!include [Managers List](managers.md)]
