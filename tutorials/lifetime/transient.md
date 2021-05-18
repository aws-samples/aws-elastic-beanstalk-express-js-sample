---
uid: Tutorial.Lifetime.Transient
title: Transient Lifetime
---

# Transient Lifetime

Transient lifetime is a default lifetime of the Unity container. As the name implies it lasts very short period of time, actually, no time at all. In the Unity container terms, having transient lifetime is the same as having no lifetime manager at all.

For this lifetime manager Unity creates and returns a new instance of the requested type for each call to the **Resolve** method.

## The Lifetime Manager

The transient lifetime is controlled by [TransientLifetimeManager](xref:Unity.Lifetime.TransientLifetimeManager). This lifetime manager is used by default for all types registered using the **RegisterType** method where no specific manager has been provided.

## Registration

When registering a transient [Type](xref:System.Type) it is recommended to not pass an instance of [TransientLifetimeManager](xref:Unity.Lifetime.TransientLifetimeManager) to the registration, but allow Unity to create it explicitly.

### Example

```C#
RegisterType<Foo>();
RegisterType<IService, Service>();
```

In this example a [Type](xref:System.Type) `Foo` and a mapping from `IService` to `Service` both registered with transient lifetime.  So every call to `Resolve<Foo>()` or `Resolve<IService>()` will create a new object instance.

## See Also

[!include [Managers List](managers.md)]
