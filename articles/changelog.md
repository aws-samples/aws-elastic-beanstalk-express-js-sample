---
uid: Article.Change.Log
---

# Upgrading Unity Container (Changelog)

This document contains a list of breaking changes and noteworthy issues. At this time the list is not complete. If you discover an issue while upgrading that is not covered here please open an issue or, preferably, issue a pull request. You can clone the wiki to do that.

Some breaking changes are currently documented in the issue tracker only. Again, please report any such findings by commenting on the issue.

## Upgrading to Unity 5.9.x

Starting with version 5.9.0 Unity package will only contain Unity.Abstractions and Unity.Container packages.

All other packages will be available as individual NuGet packages

## Breaking change

Some extension methods have been moved out of the Unity nuget package and have been moved into their own individual packages.

For example, the following code will no longer work

```C#
Container = new UnityContainer();
Container.LoadConfiguration();
```

You will receive an error that the namespace **Microsoft.Practices.Unity.Configuration** no longer exists in your using statements.

## The Fix

To fix this and similar problems, add the required nuget packages separately.

For the example above, add nuget package **Unity.Configuration**

_This wiki created with help from [quintonn](https://github.com/quintonn)_

## Upgrading to Unity 5.8.x

Unity 5.8.0 adds support for nesting generic types when resolving collections (arrays and enumerables).

### Problem

Unity has build in support for ``IEnumerable<>``, ``Array`` ( ``type[]`` ), ``Func<>``, and ``Lazy<>``. Theoretically it should be able to recognize these types and properly resolve them individually and in combination. Unfortunately it did not do so. For example if you registered several interfaces like this:

```C#
RegisterType<IService, Service>("1");
RegisterType<IService, Service>("2");
RegisterType<IService, Service>("3");
RegisterType<IService, Service>();
```

resolving enumerable in combination with generic will resolve incorrectly:

```C#
Resolve<Lazy<IEnumenrable<type>>>  - resolve correctly
Resolve<IEnumenrable<Lazy<type>>>  - resolve empty
```

### The Fix

Release v5.8.0 fixes resolution of collections of generic and array types and Lazy collections of items. This will now work fine:

```C#
Resolve<Lazy<IEnumenrable<type>>>
Resolve<IEnumenrable<Lazy<type>>>

Resolve<Lazy<type[]>>
Resolve<Lazy<type>[]>

Resolve<IEnumerable<Lazy<Func<IService>>>>()
Resolve<IEnumerable<Func<Lazy<IService>>>>()

Resolve<Lazy<Func<IService>>[]>()
Resolve<Func<Lazy<IService>>[]>()
```

The logic behind resolving collections is to find type to enumerate and get all registrations for it no matter how deep in generics tree. Enumerated type could be:

- Non generic (Constructed Generic) type
- Explicitly registered type

So, in this example

```C#
RegisterType<IService, Service>("1");
RegisterType<IService, Service>("2");
RegisterType<IService, Service>("3");
RegisterType<IService, Service>();

Resolve<IEnumerable<Func<Lazy<IService>>>>();
```

Unity will recognize ``IService`` as registered type and enumerate four instances of ``Func<Lazy<IService>>``.

But if you look at this example:

```C#
RegisterType<IService, Service>("1");
RegisterType<IService, Service>("2");
RegisterType<IService, Service>("3");
RegisterType<IService, Service>();

RegisterType(typeof(IFoo<>), typeof(Foo<>));  <-- note this registraton

Resolve<IEnumerable<IFoo<IService>>>();
```

Returned result is different! Adding registration for IFoo changes enumerable type to IFoo. This resolution will only return one item.

### Breaking change

Sometimes you do want Unity to ignore a generic when it resolves collections similar to how it deals with ``Lazy`` and ``Func``. Suppose in example above you want Unity to resolve all four of IService instances wrapped in ``IFoo``.
To do so you would have to make ``IFoo<>`` a **Built-In** type of the container.

It could be simply done by creating either [IBuildPlanCreatorPolicy](https://github.com/unitycontainer/examples/blob/master/src/Extending%20Unity/BuildPlanCreator/FooBuildPlanCreatorPolicy.cs) or [IBuildPlanPolicy](https://github.com/unitycontainer/examples/blob/master/src/Extending%20Unity/BuildPlan/FooBuildPlanPolicy.cs) factories.
There are just a few steps you need to follow:

- Create factory for the generic (See example for [IBuildPlanCreatorPolicy](https://github.com/unitycontainer/examples/blob/master/src/Extending%20Unity/BuildPlanCreator/FooBuildPlanCreatorPolicy.cs) or [IBuildPlanPolicy](https://github.com/unitycontainer/examples/blob/master/src/Extending%20Unity/BuildPlan/FooBuildPlanPolicy.cs) )
- Create and extension to get access to Unity internal policies and register your factory (See example [IBuildPlanCreatorPolicy](https://github.com/unitycontainer/examples/blob/master/src/Extending%20Unity/BuildPlanCreator/FooUnityExtension.cs) or  [IBuildPlanPolicy](https://github.com/unitycontainer/examples/blob/master/src/Extending%20Unity/BuildPlan/FooUnityExtension.cs))
- Register your extension with ``UnityContainer``

For examples of how it should be done please follow [this link](https://github.com/unitycontainer/examples/tree/master/src/Extending%20Unity).

## Upgrading to Unity 5.2.1

This release fundamentally changes how types are registered with Unity. The rationale behind this change is [this issue](https://github.com/unitycontainer/container/issues/35).

### The problem

To explain the problem please look at this example. Prior to this release registering singleton ``ILogger`` service like this:

```C#
container.RegisterType<ILogger, MockLogger>(new ContainerControlledLifetimeManager(), new InjectionConstructor());
```

would create two registrations:

1. A mapping between ``ILogger`` to ``MockLogger``
2. A singleton registration for ``MockLogger`` with default constructor.

Calling ``container.Resolve<ILogger>()`` resolves singleton instance of **MockLogger** as expected, and resolving type **MockLogger** ``container.Resolve<MockLogger>()`` would resolve **the same** instance of **MockLogger**. Both **ContainerControlledLifetimeManager** and **InjectionConstructor** would be associated with **MockLogger** registration.

Suppose you want to resolve a new **MockLogger** whenever it is resolved directly like this  ``container.Resolve<MockLogger>()``. To do so you would create another registration just for the **MockLogger**:

```C#
container.RegisterType<MockLogger>(new TransientLifetimeManager());
```

So, now when you call ``container.Resolve<MockLogger>()`` it resolves new instance of the **MockLogger** class and uses constructor with longest list of parameters. All is well and as expected. But now if you try to resolve ``container.Resolve<ILogger>()`` it is no longer returns singleton instance of the **MockLogger**. Now it also returns new **MockLogger** created with constructor with longest list of parameters.
The subsequent registration overwritten all information associated with ``ILogger``.

### The solution

Release 5.2.1 fixes this behavior. Now all information passed to Unity during registration is stored with ``FromType`` instead of ``ToType``. So registering type like this:

```C#
container.RegisterType<ILogger, MockLogger>(new ContainerControlledLifetimeManager(), new InjectionConstructor());
```

creates just one registration ``ILogger`` and associates **LifetimeManager** and all provided **InjectionMemebers** with it. At this point  **MockLogger** is still unregistered.

So, think about it as a ``RegisteredType`` and ``MappedTo`` type. If you look at initial example:

```C#
container.RegisterType<ILogger, MockLogger>(new ContainerControlledLifetimeManager());
```

``ILogger`` - is a registered type and ContainerControlledLifetimeManager is associated with this type, as well as any ``InjectionMembers`` you provide during registration.

### Breaking changes

This release breaks a lot of registrations. Anything relaying on TypeTo being registered in mappings will fail. For example:

```C#
container.RegisterType<ILogger, MockLogger>(new ContainerControlledLifetimeManager());

Assert.AreSame( container.Resolve<ILogger>(), container.Resolve<MockLogger>()) <-- Will fail now
```

 This could be easily fixed by slightly modifying how types are registered. If you want TypeTo to be available independently you could register it like this:

```C#
container.RegisterType<MockLogger>(new ContainerControlledLifetimeManager());
container.RegisterType<ILogger, MockLogger>();

Assert.AreSame( container.Resolve<ILogger>(), container.Resolve<MockLogger>()) <-- Passes
```

This applies to anything you registering with the type: factories, injection members, interceptors, etc.

### Fixing

With some creative searching and sorting these breaking registrations could be identified statically, without running the code. The key is to look for registrations with same TypeTo type. If you see multiple registrations registering same type as implementation type and at least one of them has non transient lifetime it is a good indicator that it might fail after update:

```C#
container.RegisterType<ILogger, Logger>(new ContainerControlledLifetimeManager());
...
container.RegisterType<IOtherLogger, Logger>();
```

To fix just add individual registration for implementation type with proper lifetime manager like so:

```C#
container.RegisterType<Logger>(new ContainerControlledLifetimeManager());
...
container.RegisterType<ILogger, Logger>();
...
container.RegisterType<IOtherLogger, Logger>();
```

Make sure it is registered before other mappings.

## Upgrading to Unity.Abstractions 4.1.4

Lifetime managers now support the value `null`. `GetValue` must return `LifetimeManager.NoValue` to indicate that no value has been set. You must upgrade custom lifetime managers to not return `null` inappropriately. Mainly the `GetValue` method must be adjusted. The built-in lifetime managers have been upgraded. If you do not use custom lifetime managers you should not see any changes in behavior. (https://github.com/unitycontainer/abstractions/issues/102)

Design time validation for `LifetimeManager` was added. The marker interfaces `ITypeLifetimeManager`, `IInstanceLifetimeManager` and `IFactoryLifetimeManager` have been introduced. Various other parts of the framework now refer to these types instead of `LifetimeManager`. The marker interfaces are empty and `LifetimeManager` does not inherit from any of them. This can lead to compiler errors. In general these errors can be fixed through  changing the type of variables or through casting. (https://github.com/unitycontainer/abstractions/issues/90)

## Upgrading to Unity.Abstractions 4.0.0.350

The namespace `Unity.Attributes` was removed. These types are now in namespace `Unity`. One common type that is affected is `DependencyAttribute`. Suggested way to upgrade: Mass delete the old namespace reference using the Regex `using Unity.Attributes;\r\n` in Visual Studio. Then, use Resharper to fix missing imports in the entire solution in one action.

## Upgrading to Unity.Abstractions 4.0.0.0

A few breaking changes have been made. For more information see https://github.com/unitycontainer/abstractions/issues/97.

### Problem

Build error `The type or namespace name 'IBuilderContext' could not be found.`

### Solution

`IBuilderContext` has been replaced with: `Unity.Builder.BuilderContext`

### Problem

Build Error `'IBuildPlanCreatorPolicy' is obsolete: 'This interface has been replaced with Unity.Policy.ResolveDelegateFactory delegate'``

### Solution

See [this example](https://github.com/unitycontainer/examples/blob/master/src/Extending%20Unity/BuildPlanCreator/FooBuildPlanCreatorPolicy.cs) or [this example](https://github.com/unitycontainer/microsoft-logging/blob/master/src/LoggingExtension.cs) or [this example](https://github.com/unitycontainer/examples/blob/master/src/Extending%20Unity/BuildPlanCreator/FooBuildPlanCreatorPolicy.cs)

### Problem

Build Error in `BuilderStrategy` derived classes: `'MyCustomStrategy.PreBuildUp(BuilderContext)': no suitable method found to override`

### Solution

Adjust the signature of the `PreBuildUp` method to: `public override void PreBuildUp(ref BuilderContext context)`

### Problem

Build Error in `BuilderStrategy` derived classes: `'MyCustomStrategy.PostBuildUp(BuilderContext)': no suitable method found to override`

### Solution

Adjust the signature of the PostBuildUp method to:
public override void PreBuildUp(ref BuilderContext context)

### Problem

Build Error in Builder Strategy derived class:
`'BuilderContext' does not contain a definition for 'AddResolverOverrides' and no accessible extension method 'AddResolverOverrides' accepting a first argument of type 'BuilderContext' could be found`

### Solution

The behaviour can be mimicked by something like:

```cs
        public static void AddResolverOverrides(ref BuilderContext ctx, ResolverOverride theOverride)
        {
            var newOverrides = ctx.Overrides;
            newOverrides = newOverrides == null 
                ? new ResolverOverride[]{theOverride} 
                : newOverrides.Concat(new[] {theOverride}).ToArray();

            ctx.Overrides = newOverrides;
        }
```

### Problem

`'BuilderContext' does not contain a definition for 'ParentContext' and no accessible extension method 'ParentContext' accepting a first argument of type 'BuilderContext' could be found`

I used the `ParentContext` of `IBuilderContext` to determine if anything in the build hierarchy was of a certain type. More specifically I was checking to see if a specific decorator class was being applied as part of the build.

### Solution

There is an `IntPtr Parent` property on the `BuilderContext` struct. Can this be used to find the parent context?

### Problem

There is a build warning:
`'InjectionFactory' is obsolete: 'InjectionFactory has been deprecated and will be removed in next release. Please use IUnityContainer.RegisterFactory(...) method instead.'`

### Solution

The `InjectionFactory` class has been deprecated. Injection factories are now registered directly with the container.
For example:

**Old code:**
`Container.RegisterType<IEncryptionProvider>(new ContainerControlledLifetimeManager(), new InjectionFactory(c => MakeEncryptionProvider(c)));`

**New code:**
`Container.RegisterFactory<IEncryptionProvider>(c => MakeEncryptionProvider(c), new ContainerControlledLifetimeManager());`

### Be Aware
The public key token of the assembly has changed, so you may need to remove redundant assembly bindings from config files.

For example:
This binding will now be ineffective, and can be removed:

```xml
      <dependentAssembly>
        <assemblyIdentity name="Unity.Abstractions" publicKeyToken="6d32ff45e0ccc69f" culture="neutral" />
        <bindingRedirect oldVersion="0.0.0.0-3.3.0.0" newVersion="3.3.0.0" />
      </dependentAssembly>
```

Note:

- The old public key token value is `6d32ff45e0ccc69f`
- The new public key token is `489b6accfaf20ef0`

### Problem

Build Error in `BuilderStrategy` derived classes: `'MyCustomStrategy.PostBuildUp(BuilderContext)': no suitable method found to override`

### Solution

Adjust the signature of the `PostBuildUp` method to: `public override void PreBuildUp(ref BuilderContext context)`

### Problem

I'm using this code to register my interfaces:

    Containter.RegisterType<ICustomerRepository, CustomerRepository>(new ContainerControlledLifetimeManager(), InjectionConstructor);

But after the upgrade im getting the following error when resolving:

```bash
Exception thrown: 'System.InvalidCastException' in Unity.Abstractions.dll
Unable to cast object of type
```

### Solution

Ok I managed to find out what I was doing wrong.
I was reusing the same 'InjectionConstructor' for all my registrations.
After replacing them with a new instance for each my problem went away.
