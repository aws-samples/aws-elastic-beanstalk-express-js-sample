---
uid: Specification.Unity
title: Unity Container Specification
---

# Unity Container Specification

## 1 Introduction

Unity is a full featured, general-purpose container for use in any type of Microsoft® .NET Framework-based application. It provides all of the features commonly found in dependency injection implementations.

In addition, Unity is extensible. You can write container extensions that change the behavior of the container, or add new capabilities. For example, the interception feature provided by Unity, which you can use to add policies to objects, is implemented as a container extension.

## 2 Terms and Definitions

### 2.1 Injection

### 2.2 Dependency

### 2.3 Contract

* Type
* Name

### 2.4 Metadata

### 2.5 Lifetime

## 3 Workflow

[!include [Workflow](workflow.md)]

[!code-csharp [Overrides](../src/Abstractions/src/Dependency/Injection/Abstracts/InjectionMember.cs#Overrides)]


[!code-csharp [Implementation](../src/Abstractions/src/Dependency/Injection/Abstracts/InjectionMember.cs#Implementation)]
