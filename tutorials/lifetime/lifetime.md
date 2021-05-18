---
uid: Tutorial.Lifetime
title: Lifetime Management
---

# Lifetime

The Unity container manages the lifetime of objects based on a [Lifetime Manager](xref:Unity.Lifetime) you specify when you register the type.

The default behavior for the container, if no lifetime is registered, to use a <xref:Tutorial.Lifetime.Transient>. It creates a new instance of the requested type each time `Resolve` method is called or when the dependency mechanism injects instances into other classes. The container does not store any references to the object.

Unity uses specific types that inherit from the `LifetimeManager` base class (collectively referred to as lifetime managers) to control how it stores references to object instances and how the container disposes of these instances.

When you register an existing object using the `RegisterInstance` method, the default behavior is for the container to take over management of the lifetime of the object you pass to this method using the <xref:Tutorial.Lifetime.Container>. This means that container maintains strong reference to the object and at the end of the container lifetime, the existing object is disposed.

## How registering lifetime works

When type is registered with a lifetime manager, the creation and life cycle of the created instances is controlled according to that lifetime.

When a container is requested to produce an instance of the type, it first checks if a lifetime manager is associated with it. If not, or if it is a transient manager, the container simply creates the instance and return it to the caller.

If registration contains a lifetime manager, the container tries to get the value from that manager. If the manager has nothing stored in it, the container created an instance. But before it returns the instance to the caller it adds it to the lifetime manager for later use.

Next time the type is requested, the container gets the value previously stored in the manager, if available, and returns it to the caller.

Each lifetime manager has its own criteria how to store and retrieve object instances. Some only store unique instances in a container, others store unique instances per thread or session. Each algorithm serves particular purpose.

## Built-In Lifetimes

The Unity container implements several lifetime managers that you can use directly in your code. The range covers most common use cases and scenarios. Unity includes the following lifetime implementations:

[!include [Managers List](managers.md)]
