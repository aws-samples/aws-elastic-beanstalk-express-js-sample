---
uid: Tutorial.Mapping.Implementation
title: Service to Implementation Mapping
---

# Service to Implementation Mapping

Service to Implementation Mapping is done during the service registration.

## The Service Itself

The simplest type of registration is when the service is registered by its own type. For Type and Instance registration, you can do so by simply registering the type or the instance:

```cs
container.RegisterType<Foo>();
container.RegisterInstance(new Foo());
```

For example, a factory has to specify the type it is registered under:

```cs
container.RegisterFactory<Foo>((c, t, n) => new Foo());
```

## Mapping Contract to Implementation

When you map Registered type to Implementation type, you specify a service type first and then the implementation type:

```cs
container.RegisterType<IFoo, Foo>();
container.RegisterInstance<IFoo>(new Foo());
```

In this case of the factory registration, the container does not care how it is implemented by the factory, but rather how it is registered:

```cs
container.RegisterFactory<IFoo>((c, t, n) => new Foo());
```

## Building and Mapping to Implementation

Mapping allows redirection to the existing registrations and services, as well as building new instances of implementation types.

### Mapping to Existing Service

The Unity container supports a scenario where a mapping does not create a type itself but rather references existing services registered with the container. Consider the following:

```cs
public class Foo : IFoo1, IFoo2
{
    public Foo()
    {
    }

    public Foo(object _)
    {
    }
}

container.RegisterInstance<IFoo>(new Foo(), InstanceLifetime.Singleton);

container.RegisterType<IFoo1, Foo>();
```

The container has a registration for type `Foo`. When the interface `IFoo1` is mapped to `Foo` it instructs the container to resolve the default implementation for the type `Foo`. Because the mapping does not provide any instructions about how the type should be built, the default implementation or existing registration should be used.

So, when the container is resolving `IFoo1` it will first check if `Foo` is already registered and it will use the registration to satisfy the request.

If a mapping references a non existing service, the container will try to build the service from the implementation type.

### Building an Implementation Type

If the implementation type points to no existing registration or if an instance has to be created using certain rules, the container will create a new, independent pipeline and execute it. So if you register `IFoo2` it will look like this:

```cs
container.RegisterType<IFoo2, Foo>(Invoke.Constructor());
```

The Unity container will not redirect to `Foo`. Instead, it will create a new instance of `Foo` and call the default constructor.
