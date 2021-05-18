---
uid: Tutorial.Deferred
title: Deferred Resolution
---


# Deferring the Resolution of Objects
Unity provides a technique to facilitate holding a reference to an object you need, but do not want to construct right away. You wish to defer resolution of the object. Instead of creating a factory for the type and injecting the factory into your class, then using it to create the type you want you can use the .NET standard type Func<T> (C#) or Func(Of T) (Visual Basic) with the Resolve method. This returns a delegate that, when invoked, calls into the container and returns an instance of the specified type (in this case, T).

You can even create a delegate in this way without creating a registration or mapping for the specified type in the container if you wish. Because the resolve action only takes place when you invoke the delegate, subsequent registrations added to the container are available when the target object is resolved. This means that you can manipulate the registrations and mappings in the container at any point before you resolve the target object (although you can obviously register the type before you create the delegate if you prefer).

For example, you can create a delegate for a component named MyClass, and then register a mapping for it and perform deferred resolution when required using the following code.
```cs
// Create a Unity container
IUnityContainer myContainer = new UnityContainer();

// Create a delegate for the IMyClass interface type
var resolver = myContainer.Resolve<Func<IMyClass>>();

// ... other code here...

// Register a mapping for the IMyClass interface to the MyClass type
myContainer.RegisterType<IMyClass, MyClass>();

// Resolve the mapped target object
IMyClass myClassInstance = resolver();
```
You can use this approach when you resolve the type using the Resolve method, or you can specify the delegate when you configure constructor, property setter, or method call injection. You can also use named (non-default) registrations by including the registration name in the call to the Resolve method and the RegisterType method, just as you would when using these methods for non-deferred resolution.

In addition, you can use this feature to perform deferred resolution of multiple named registrations, as an alternative to using the ResolveAll method. For example, if you have multiple named registrations for the IMyClass interface to suitable concrete types, you can obtain a collection of the resolved types. The following code illustrates this.
```cs
// Create a Unity container
IUnityContainer myContainer = new UnityContainer();

// Create an IEnumerable resolver for the IMyClass interface type
var resolver = myContainer.Resolve<Func<IEnumerable<IMyClass>>>();

// ... other code here...

// Register mappings for the IMyClass interface to appropriate concrete types
myContainer.RegisterType<IMyClass, FirstClass>("First");
myContainer.RegisterType<IMyClass, SecondClass>("Second");
myContainer.RegisterType<IMyClass, ThidClass>("Third");

// Resolve a collection of the mapped target objects
IEnumerable<IMyClass> myClassInstances = resolver();
```
You can also use the deferred resolver to resolve instance registrations. For example, the following code shows how you can resolve an IEnumerable collection of string values.
```cs
// Create a Unity container
IUnityContainer myContainer = new UnityContainer();

// Create an IEnumerable resolver for string instance registrations
var resolver = myContainer.Resolve<Func<IEnumerable<string>>>();

// ... other code here...

// Register mappings for the IMyClass interface to appropriate concrete types
myContainer.RegisterInstance("one", "FirstString");
myContainer.RegisterInstance("two", "SecondString");
myContainer.RegisterInstance("three", "ThirdString");

// Resolve a collection of the strings
IEnumerable<string> myStringInstances = resolver();
```

