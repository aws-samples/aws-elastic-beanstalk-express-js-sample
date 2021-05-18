---
uid: Tutorial.Extension.Diagnostic
title: Diagnostic Extension
---

# Diagnostic

Creating and configuring Unity container is a complicated process. A lot of things could go wrong and finding where it was misconfigured could be rather involved. To simplify debugging and to help fix issues Unity offers **Diagnostic** extension.

## Performance considerations

The Unity container uses reflection for most of its operations. It gathers information about types, creates pipelines to create these types, and verifies everything all based on reflected data. Because of that it is rather resource extensive and relatively slow.

To optimize performance, Unity engine does not do any runtime validation and only performs absolute minimum checks, just enough to be able to run. As result a lot of irregular conditions might go unnoticed. To remedy this, the container exposes **Diagnostic** extension which does thorough examination of all registration data and throws exceptions on any irregularities.

## Unity Diagnostic Extension

**Diagnostic** extension, among other things, verifies the following conditions:

* Cyclical references (The famous Stack Overflow Exception)
* Validity of provided Injection Members
* Improper referencing to itself
* Invalid parameters in constructors and invoked methods

## Enabling Diagnostics

The extension could be enabled in few different ways:

### Add Extension

The most basic case is when extension is added via `AddExtension(...)` call. It works with either regular or generic methods.

```cs
var container = new UnityContainer()
                .AddExtension(new Diagnostic());
```

or

```cs
var container = new UnityContainer()
                .AddExtension<Diagnostic>();
```

The first method, one with `AddExtension(new Diagnostic())` is a bit faster.

### Using extension method

For convenience, Unity container exposes [EnableDiagnostic()](https://github.com/unitycontainer/container/blob/master/src/Extensions/Diagnostic.cs) extension method. This method is equal to adding extension to the container.

```cs
var container = new UnityContainer()
                    .EnableDiagnostic();
```

### Enabling extension only in Debug

The container provides conditional extension [EnableDebugDiagnostic()](https://github.com/unitycontainer/container/blob/master/src/Extensions/Diagnostic.cs). This method will only enable diagnostics in `DEBUG` mode. In this example

```cs
var container = new UnityContainer();
container.EnableDebugDiagnostic();
```

the extension is enabled only if calling method is compiled in Debug configuration.

> [!IMPORTANT]
> Extension methods will not work on [IUnityContainer](xref:Unity.IUnityContainer) interface. It is only available on the UnityContainer itself.
