---
uid: Tutorial.Annotation.Field
title: Annotating types for Field injection
---

# Annotating types for Field injection

By default Unity does not inject any fields of the classes it creates.

To enable field injection you need to configure Unity during registration of annotate appropriate fields with dependency attributes. Unity supports two types of field injection:

* Required injection - Unity either satisfies this dependency or throws an exception
* Optional injection - Unity either satisfies this dependency or returns `null`

## Field injection

