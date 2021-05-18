---
uid: Tutorial.Collections
title: Collections
---


# Resolving collections of Objects of a Particular Type
Unity supports creating multiple registration of the same type by adding a name to the registration. It is useful if you want to register different services of the same type. For example, if you have multiple printers and you want them all to be available to consumers you would register them like this:
```cs
container.RegisterInstance<IPrinter>(printer); // default printer
container.RegisterInstance<IPrinter>(printer1,   "Office Printer");
container.RegisterInstance<IPrinter>(printer2,   "Printer at the deli on the street corner");
container.RegisterType<IPrinter, NeighborPrinter>("Office printer near me");
```
When you want to obtain a list of all the registered objects of a specific type, `IPrinter` in this case, you can use the array `T[]` or `IEnumerable<T>` of that type. The difference between array and enumerable resolution is that array only returns named (nondefault name) registrations where enumerable always returns all, named and unnamed registrations.

## Resolving array `T[]`
When resolving array of a type, Unity will return an array containing only types registered with nondefault (other than `null`) names. In example above call to `Resolve` will return array of only three elements:
```cs
IPrinter[] printers = container.Resolve<IPrinter[]>();
Assert(3 == printers.Length)
```
Instance **printer** will not be returned because it was registered with no name.

## Resolving `IEnumerable<T>`
`IEnumerable<T>` returns an enumerable containing all registrations of type T, including default (with name `null`) registrations. In example above it will return all four registrations:
```cs
IPrinter[] printers = container.Resolve<IEnumerable<IPrinter>>();
Assert(4 == printers.Count())
```

## Resolving `List<T>` of types
Unity does not have any special provisions to support `List<T>` but because `List` type's longest exposed constructor is
```cs
public List(IEnumerable<T> items)
``` 
Unity is able to resolve `List<T>`. Consider this example:
```cs
var printers = container.Resolve<List<IPrinter>>();
Assert(4 == printers.Count)
``` 
Unity creates type `List<IPrinter>` and during initialization selects longest constructor it can satisfy with dependencies (`List(IEnumerable<T> items)`). It crates the enumeration and passes it to List constructor. Resulting instance is a list of all registrations of that type.

