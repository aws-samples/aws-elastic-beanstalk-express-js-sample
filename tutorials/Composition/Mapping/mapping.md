---
uid: Tutorial.Mapping
title: Type Mapping
---

# Type Mapping

In service oriented architecture, components expose services through well known contracts. In `C#` terms, the contracts are the abstract classes or interfaces that these components and services are exposing. Service type, in most of the cases, means the interfaces implementing the contract. And the components are called Implementation types.

Unity allows users to publish these components and make all of the contracts they implement available to clients. This publishing and "advertisement" is done by registering both types and interfaces (contracts) associated with the components.

## Registration Type

Registration type is the type of the "contract" that this service provides. It could be the [Type](xref:System.Type) of the service itself within any of the base types it implements.

## Service to Implementation Mapping

The mapping is done when service is registered. Any type of registration (Type, Factory, Instance) allows users to associate a service with different contracts.
