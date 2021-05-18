---
uid: Tutorial.Container.Hierarchy
title: Container Hierarchy
---

# Container Hierarchies

Unity container provides a way to create child containers (other systems refer to it as resolution scopes) and allows building sophisticated scope trees of registrations. There are just a few simple rules to follow when dealing with container hierarchies:

* Types registered in predecessor containers are always available in descendant containers. This is a very simple concept, each registration is like a public virtual declaration in cs types. Every descendant inherits it and can use at will.

* Types registered in descendant containers override the same registration of predecessors. Following the same analogy with public virtual declarations, each override registration installs its own declaration and hides the one in predecessor containers.

## Using Container Hierarchies

Unity supports nested containers, allowing you to build container hierarchies. Nesting containers enables you to control the scope and lifetime of singleton objects, and register different mappings for specific types. This topic contains the following sections that describe how you can create container hierarchies and use them in your applications:

* Constructing and Disposing Unity Containers
* Controlling Object Scope and Lifetime
* Overriding registrations

### Constructing and Disposing Unity Containers

The following methods enable you to create a new default UnityContainer, create a child container that has a specified UnityContainer as its parent, and dispose an existing container.

| Method | Description |
|:-----| ----- |
|`new UnityContainer()`|Creates a root UnityContainer. Returns a reference to the new container.|
|`CreateChildContainer()`|Creates a new nested UnityContainer as a child of the current container. The current container first applies its own settings, and then it checks the parent for additional settings. Returns a reference to the new container.|
|`Dispose()`|Disposes this container instance and any child containers. Also disposes any registered object instances whose lifetimes are managed by the container.|

### Controlling Object Scope and Lifetime

When the container creates singleton objects, it manages the lifetime of these singletons. They remain in scope until you (or the garbage collector) dispose the container. At this point, it disposes the registered singleton instances it contains. In addition, if you dispose the parent container in a nested container hierarchy, it automatically disposes all child containers and the registered singletons they contain.

Therefore, if you require two separate sets of such objects that must have different lifetimes, you can use hierarchical containers to store and manage each set. Register instances that you want to be able to dispose separately in one or more child containers that you can dispose without disposing the parent container.

Note that due to possibility of child container disposal, resolution of singletons (registered with `Singleton` or `PerContainer` lifetime) will only be using registrations available in the container they were registered in and its ancestors, but not child containers, to satisfy their dependencies, even if the resolution is requested through a child container. It's Unity's way of making sure it is not storing an instance that references potentially disposed objects.

The following code demonstrates the use of a child container to manage the lifetime of specific singleton instances while maintaining the singleton instances in the parent container.

```cs

// Create parent container
IUnityContainer parentCtr = new UnityContainer();

// Register type in parent container
parentCtr.RegisterType<MyParentObject>(TypeLifetime.PerContainer);

// Create nested child container in parent container
IUnityContainer childCtr = parentCtr.CreateChildContainer();

// Register type in child container
childCtr.RegisterType<MyChildObject>(TypeLifetime.PerContainer);

// Create instance of type stored in parent container
MyParentObject parentObj = parentCtr.Resolve<MyParentObject>();

// Create instance of type stored in child container
MyChildObject childObj = childCtr.Resolve<MyChildObject>();

// ... can use both generated objects here ...

// Dispose child container
childCtr.Dispose();

// ... can use only object in parent container here ...

// Dispose parent container
parentCtr.Dispose();
```

### Overriding registrations

You can use nested containers when you have slightly different dependency injection requirements for specific objects but want to provide a fallback facility for objects that implement a specific interface or are of a specific type. For example, you may have a general requirement for objects that implement the IMyObject interface to map to the type MyStandardObject. However, in specific parts of the application code, you may want the IMyObject interface to map to the type MySpecialObject.

In this case, you can register the general mapping in the parent container and register the specific case in a child container. Then, when you want to obtain an instance of the object, you call the Resolve method on the appropriate container. If you call the method on the child container, it returns an object of type MySpecialObject. If you call the method on the parent container, it returns an object of type MyStandardObject.

However, the advantage with nested containers is that, if the child container cannot locate a mapping for the requested interface or type, it passes the request to its parent container and onward through the hierarchy until it reaches the root or base container. Therefore, for objects not mapped in the child container, the mapping in the parent container (or in an ancestor container where there are more than two levels in the hierarchy) defines the object type returned.

The following code shows how you can implement the preceding scenario.

```cs
// Create parent container
IUnityContainer parentCtr = new UnityContainer();

// Register two mappings for types in parent container
parentCtr.RegisterType<IMyObject, MyStandardObject>();
parentCtr.RegisterType<IMyOtherObject, MyOtherObject>();

// Create nested child container in parent container
IUnityContainer childCtr = parentCtr.CreateChildContainer();

// Register mapping for specific type in child container
childCtr.RegisterType<IMyObject, MySpecialObject>();

// Now retrieve instances of the mapped objects using the child container.
// Using the interface as the type for the returned objects means that it
// does not matter which container returns the actual object.

// This code returns an object of type MySpecialObject using the mapping
// registered in the child container:
IMyObject specialObject = childCtr.Resolve<IMyObject>();

// This code returns an object of type MyOtherObject using the mapping
// registered in the parent container because there is no mapping in 
// the child container for this type:
IMyOtherObject otherObject = childCtr.Resolve<IMyOtherObject>();

// Now retrieve instance of the standard object using the parent container.
// This code returns an object of type MyStandardObject using the mapping
// registered in the parent container:
IMyObject standardObject = parentCtr.Resolve<IMyObject>();

// Dispose parent container and child container
parentCtr.Dispose();
```