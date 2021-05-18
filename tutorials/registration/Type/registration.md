---
uid: Tutorial.Registration.Type
title: Type Registration
---

# Type Registration

Type registration is where all the Unity magic is happening. It provides complete and flexible control of all aspects of type creation and management.

When a [Type](xref:System.Type) is registered Unity creates a contract (a registration) consisting of a **Type**, a **Name**, and instructions on how this contract should be fulfilled when requested.

## Minimum Registration Requirements

The only required part of the registration is a registered [Type](xref:System.Type) itself. Theoretically you could register a [Type](xref:System.Type) like this:

```cs
container.RegisterType<Service>();
```

This would tell the container to use all defaults when creating `Service`. Registrations like this do not make much sense. If creation process does not require any customization, all that time spent on registering such [Type](xref:System.Type) is wasted. It is measurably faster to resolve a plain [Type](xref:System.Type) from the container if it is not registered at all.

When a [Type](xref:System.Type) is annotated with injection attributes it does not require registration either. If you are satisfied with annotated selections, appropriate constructor and all other members are annotated, and you do not require lifetime management for created instances, the [Type](xref:System.Type) should not be registered.

You should only register types if at least one of the following is true:

* Contract/Registration requires a Name
* Require a mapping between service and implementation types
* Require lifetime policy other than transient
* Need to override injection annotated with attribute(s)
* Nondefault constructor should be selected
* Properties or fields should be injected
* Method(s) should be called during initialization

## Creating Registration Contracts

Simplest form of a contract is a registration without a Name ( the Name is `null` ). This type of registration is called `default` and in some cases is used as a prototype during resolution of Generic types (hence name `default`).

A contract could have a Name. The Name could be any arbitrary string of one or more characters. The simple named contract could be registered like this:

```cs
container.RegisterType<Service>("Contract Name");
```

> [!NOTE]
> It is not recommended to use empty strings as names.

## Creating Type Mapping

A mapping instructs Unity on how to satisfy the contract and what implementation [Type](xref:System.Type) should be used to create an object. For example is you want to associate an interface `IService` with implementation `Service` you would register it like this:

```cs
container.RegisterType<IService, Service>();
```

Or you could register multiple implementations for the same service:

```cs
container.RegisterType<IService, MailService>("Email");
container.RegisterType<IService, WebService>("WebMail");
container.RegisterType<IService, SecureService>("Encrypted");
```

For more information see <xref:Tutorial.Mapping>

## Lifetime Management

Unity provides wide variety of lifetime managers [compatible](xref:Unity.TypeLifetime) with type registrations. Each of these managers provide unique algorithm for instance management.

In example above services are created on each request. In most cases it is desireable to create services only once. To create singleton services appropriate lifetime managers must be added to the registration:

```cs
container.RegisterType<IService, MailService>("Email", TypeLifetime.Singleton);
container.RegisterType<IService, WebService>("WebMail", TypeLifetime.Singleton);
container.RegisterType<IService, SecureService>("Encrypted", TypeLifetime.Singleton);
```

For more information about lifetime management see <xref:Tutorial.Lifetime>

## Creation Pipeline

Unity instantiates an objects by creating a resolver pipeline and executing it with passed in injection values. Each pipeline consists of a several steps with each step performing part of the initialization.

How the pipeline is assembled and what values are injected is controlled by collection of [Injection Member](xref:Unity.Injection.InjectionMember) objects passed to registration method. The normal steps of the object creation process are:

## Injection Instructions

During the registration you could Configure the container to select certain constructor, initialize properties and fields, call methods, and inject values and instructions for dependencies. All this is done by passing appropriate [Injection Members](xref:Unity.Injection) to the registration. For more information see:

* [Constructor invocation and injection](xref:Tutorial.Injection.Constructor)
* [Fields injection](xref:Tutorial.Injection.Field)
* [Properties injection](xref:Tutorial.Injection.Property)
* [Method(s) invocation and injection](xref:Tutorial.Injection.Method)
