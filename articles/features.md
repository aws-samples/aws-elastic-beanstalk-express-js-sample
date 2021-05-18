---
uid: Article.Unity.Features
---

# Features

## General Features

* No registration required for simple POCO types
* Registration/updates at any time (no builder required)
* Support registration metadata
* Support generic types
* Register existing objects
* Custom Type factories
* Register Type
* List all registrations
* Check existing registrations

## Setup

* Registration
  * Type mappings
    * Register as a `Type`
    * Support `Type` polymorphism
    * Register as an implemented interface
    * Multiple interfaces of the same `Type`
  * Register Type
    * Constructor selection
      * Constructor marked by attribute
      * 'Smart' constructor selection
        * Longest constructor Unity can satisfy with parameters (dynamic)
        * Legacy longest constructor (Extension)
      * Specific constructor (Injection Member)
        * By types of parameters
        * By injected members
        * By provided values
    * Initializing Properties
      * Marked with attribute
      * Injected during registration (Injection Member)
    * Initializing Fields
      * Marked with attribute
      * Injected during registration (Injection Member)
    * Calling Methods on the object
      * Marked with attribute
      * Injected during registration (Injection Member)
        * By types of parameters
        * By injected members
        * By provided values
* Registrations Collection
  * List registrations of the container
  * Support registration hierarchies
* Check if `Type` is registered
  * Fast and efficient algorithm

## Execution

### Initialization of existing objects (BuildUp)

* Perform initialization on already created objects
* Follow the same pattern as create (Resolve) object
* Compatible with Activator and Compiled pipelines
* Initialize Properties and Fields
* Call Methods and inject parameters

### Create Instances (Resolve)

* Inject constructor with parameters
* Initialize Properties and Fields
* Call Methods and injects parameters
* Support Activator pipelines
* Create optimized (compiled) pipelines
* Seamlessly resolve registered instances or creates new objects
* Built-in support for deferred resolution
  * `Func<T>`
  * `Lazy<T>`
* Built-in support for collections
  * `T[]`
  * `IEnumerable<T>`
* Automatic concrete types resolution
* Dependency injection
  * Required
  * Optional
  * Supports Default parameters
  * Injects with resolved parameters
  * Injects with registered values
  * Supports parameter overrides
* Open-generic types
  * constraints
  * variance
  * nested
  * recurring generic definitions

### Manages lifetime of objects

* Transient
* Singleton
* Per Container
* Per Container Transient
* Hierarchical
* External
* Per Thread
* Per Resolve
* Other (Extension)

### Create child (Scoped) containers

* Create disposable child containers (scopes)

## Extensibility

### Diagnostic

* Registration
* Injection Attribute
* Stack Overflow
* Cyclic reference

### Legacy

* Legacy constructor selection

### Functionality

* Configuration
* Interception
* Logging
* Web
* Etc.