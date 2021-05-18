---
uid: Tutorial.Resolution.Type
title: Resolution By Type
---

# Resolving an Object by Type

Unity provides a method named [Resolve](xref:Unity.IUnityContainer#Unity_IUnityContainer_Resolve_System_Type_System_String_Unity_Resolution_ResolverOverride___) that you can use to resolve an object by type, and optionally by providing a registration name. Registrations that do not specify a name are referred to as default registrations. This topic describes how to use the [Resolve](xref:Unity.IUnityContainer#Unity_IUnityContainer_Resolve_System_Type_System_String_Unity_Resolution_ResolverOverride___) method to resolve types and mappings registered as default registrations.

## The Resolve Method Overloads for Default Registrations

The following table describes the overloads of the Resolve method that return instances of objects based on the default registrations and mappings with the container. The API for the Unity container contains both generic and non-generic overloads of this method so that you can use it with languages that do not support the generics syntax.

| Method | Description |
|-----|-----|
| `Resolve<T>()` | Returns an instance of the type registered with the default name as the type T. |
| `Resolve(Type t)` | Returns an instance of the default type registered with the container as the type t. |
| `Resolve<T>(string name)` | Returns an instance of the type registered with the container as the type T and with the specified name. Names are case sensitive. |
| `Resolve(Type t, string name)` | Returns an instance of the type registered with the container as the type t and with the specified name. Names are case sensitive. |

## Using the Resolve Method with Default Registrations

The following examples show how you can use the Resolve method to create or obtain a reference to an object defined in the container configuration. Typically you will register a type mapping between an interface and a concrete type that implements it, or between a base class and a concrete type that inherits it. The examples use the run-time methods of the container to register the types it will resolve.

### Resolving Types Registered as Interfaces 

The following code registers a mapping for an interface named IService and specifies that the container should return an instance of the CustomerService class (which implements the IService interface). In this case, the type IService identifies the registration type. Code that requests an instance of the type IService receives an instance of the CustomerService class. The following example uses the generic overloads of the container methods.

```cs
IUnityContainer container = new UnityContainer();
container.RegisterType<IService, CustomerService>();

var instance = container.Resolve<IService>();
```

Alternatively, you can use the non-generic overloads of the methods. The following code achieves the same result.

```cs
IUnityContainer container = new UnityContainer();
container.RegisterType<IService, CustomerService>();

var instance = (IService)container.Resolve(typeof(IMyService));
```

### Resolving Types Registered as Base Classes

When you need to register a mapping for a base class or other object type (instead of an interface), you use the overloads of the RegisterType and Resolve methods that accept object type names. The following examples show the use of the overloads of the RegisterType and Resolve methods that accept object type names as the registration identifier.

The following code registers a mapping for an object named MyBaseService and specifies that the container should return an instance of the CustomerService class (which inherits from the MyBaseService class). In this case, the type MyBaseService identifies the registration. Code that requests an instance of the type MyBaseService receives an instance of the CustomerService class.

```cs
IUnityContainer myContainer = new UnityContainer();
myContainer.RegisterType<MyBaseService, CustomerService>();

MyBaseService myServiceInstance = myContainer.Resolve<MyBaseService>();
```

Alternatively, you can use the non-generic overloads of the methods. The following code achieves the same result.

```cs
IUnityContainer myContainer = new UnityContainer();
myContainer.RegisterType(typeof(MyBaseService), typeof(CustomerService));

MyBaseService myServiceInstance = (MyBaseService)myContainer.Resolve(typeof(MyBaseService));
```

## Using the Resolve Method with Named Registrations

If you need to create multiple registrations for the same type, you can specify a name to differentiate each registration. Then, to retrieve an object of the appropriate type, you specify the name and the registered type. Following examples demonstrate the technique:

```cs
IUnityContainer container = new UnityContainer();
container.RegisterType<IService, CustomerService>();
container.RegisterType<IService, CompanyService>("name");
container.RegisterType<IService, ExternalService>("other name");

var instance = container.Resolve<IService>("name");
```

Alternatively, you can use the non-generic overloads of the methods. The following code achieves the same result.

```cs
IUnityContainer container = new UnityContainer();
container.RegisterType<IService, EmailService>();
container.RegisterType<IService, LDAPService>("name");
container.RegisterType<IService, CustomerService>("other name");

var instance = (IService)container.Resolve(typeof(IMyService), "other name");
```

### Note

If the target class or object specifies any dependencies of its own, using constructor, property, or method call injection attributes, the instance returned will have these dependent objects injected automatically.

By default, the RegisterType method registers a type with a transient lifetime, which means that the container will not hold onto a reference to the objects it creates when you call the Resolve method. Each time you call one of these methods, the container generates a new instance of the specified or mapped type. However, you can use lifetime managers to control the creation, lifetime, and disposal of objects if required.