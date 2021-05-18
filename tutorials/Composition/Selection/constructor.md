---
uid: Tutorial.Selection.Constructor
title: Automatic Constructor Selection
---

# Selecting Constructor

Proper selection of the constructor used for type instantiation is one of the most important aspects of the container operation. When creating an object, the container uses one of the following algorithms to select a constructor it will be using to initialize the object:

* [Constructor Injection using explicit registration](xref:Tutorial.Injection.Constructor). With this technique, you register the [Type](xref:System.Type) and apply an [Injection Constructor](xref:Unity.Injection.InjectionConstructor) that specifies the dependencies to the registration. For more information see <xref:Tutorial.Injection.Constructor>

* [Constructor Annotation](xref:Tutorial.Annotation.Constructor). With this technique, you apply attribute to a class constructor that is used for injection. For more information see <xref:Tutorial.Annotation.Constructor>

* **Automatic Constructor Selection**. This technique is used by the Unity container to select a constructor and to satisfy any constructor dependencies defined in parameters of the constructor if no [Annotation](xref:Tutorial.Annotation) or [Registration](xref:Tutorial.Registration) exists.

## Automatic Constructor Selection

Automatic constructor selection is performed if no other information is available on how to create a [Type](xref:System.Type). Unity uses dynamic, real time algorithm to discover and select a constructor.

The Unity container will try to execute the most complex constructor it can provide with appropriate dependencies. In other words, if the container can resolve and/or inject all parameters of the constructor, it will be selected.

### Creating Build Pipeline

Selection process takes place during the first resolution of a [Type](xref:System.Type) contract. Unity container employs lazy resolution strategy. It will defer pipeline creation until the contract ([RegistrationType and Name](xref:Tutorial.Registration.Metadata)) is requested.

The lazy approach allows registrations to proceed at random order and do not require dependencies to be registered before dependents. As long as all of these are available at the time of resolution Unity does not care in what order they were registered.

### Constructor Selection Steps

One of the first steps, when creating a pipeline, is a constructor selection. Constructors are selected in the following order:

* If present, use registered [Injection Constructor](xref:Unity.Injection.InjectionConstructor)
* If present, annotated with an attribute
* Automatically select constructor
  * Get all accessible constructors
  * Process constructors in ascending order from most complex to the default
    * Filter out [restricted](xref:Tutorial.Injection.Constructor#restrictions) constructors
    * Loop through parameters and check if
      * Is primitive
        * Is registered with the container
        * Has *default* value
      * Is resolvable type
      * Is registered with container
    * Select the first constructor the container can create

The Unity container will select the first successful match and use it as a selection.

> [!WARNING]
> When more than one constructor could be matched at the same time, the order and constructor selection can not be guaranteed.

During normal operation the container does not perform validation.

> [!NOTE]
> If [Diagnostic](xref:Tutorial.Extension.Diagnostic) extension is enabled, Unity will perform a selection validation and will throw an exception, reporting ambiguous constructors, if more than one constructor can be successfully selected with current configuration.

If no constructor could be selected, the container will throw an exception.

### Pipeline retention

Once the pipeline is created, it will be used to satisfy all subsequent requests for that contract. If you need to update or rebuild the pipeline, the contract has to be re-registered.