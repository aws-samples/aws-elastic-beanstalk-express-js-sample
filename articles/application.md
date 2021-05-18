---
uid: Article.Application.Design
---

# Application Design Concepts with Unity

Features such as inversion of control, dependency injection, interception, factory, and lifetime  provide several major advantages when building applications that consist of many individual classes and components. Designing applications that conform to these patterns can provide numerous benefits:

* Decoupling service providers from service consumers
* Runtime as well as design time configuration of services and dependencies
* Ability to substitute one component for another.
* Centralization and abstraction of crosscutting concerns (logging, authentication, caching, and etc).
* Advanced lifetime management of components and services.
* Simplified testability for individual components and sections of the application.
* Simplified overall design, with faster and less error-prone development.
* Improved reusability of components within other applications.

Unity provides a comprehensive dependency injection and interception platform, and is easy to incorporate into your applications. However, it does change the way that you design these applications. The following sections of this topic describe areas where dependency injection is useful:

* Pluggable Architectures
* Managing Crosscutting Concerns
* Service and Component Location
* Policy Injection through Interception

## Pluggable Architectures

By designing applications to use a pluggable architecture, developers and users can add and modify the functionality of an application without changing the core code or processes. ASP.NET is an example of a pluggable architecture, where you can add and remove providers for features such as authentication, caching, and session management. Unity also facilitates a pluggable architecture that allows you to substitute the container for one of your own design and add extensions through the container extensions architecture.

By using dependency injection mechanisms, such as Unity container, developers can map different components that implement a specific interface (such as a provider interface) or that inherit from a specific base class to the appropriate concrete implementations. Developers can then obtain a reference to the appropriate provider component at run time, without having to specify exactly which implementation of the component is required. The following sections of this topic, Managing Crosscutting Concerns and Service and Component Location, show how you can use dependency injection to create instances of a specific class based on a request for a more general class (such as an interface or base class definition).

In addition, the providers may require instances of other components. For example, a caching provider may need to use the services of a cryptography component or service. When components require the services of other components, you can use dependency injection to automatically instantiate and inject instances of these components into a component, based on either configuration settings in the container or on code within the application.

For more information about how you can use dependency injection in this way, see Using Injection Attributes.

## Managing Crosscutting Concerns

The features and tasks implemented in applications are often referred to as concerns. The tasks specific to the application are core concerns. The tasks that are common across many parts of the application, and even across different applications, are crosscutting concerns. Most large applications require services such as logging, caching, validation, and authorization, and these are crosscutting concerns.

The simplest way to centralize these features is to build separate components that implement each of the required features, and then use these components wherever the management of that concern is required—in one or more applications. By using dependency injection mechanisms, such as a Unity container, developers can register components that implement crosscutting concerns and then obtain a reference to the component at run time, without having to specify exactly which implementation of the component is required.

For example, if you have a component named FileLogger that performs logging tasks, your application can instantiate this component using the new operator, as shown in the following code.

```C#
FileLogger myLogger = new FileLogger();
```

If you then want to change the application to use the new component, FastFileLogger, you must change the application code. However, if you have an interface ILogger that all implementations of the logging component uses, you might instead write the code like the following.

```C#
ILogger myLogger = new FileLogger();
```

However, this does not solve the problem because you still must find everywhere in the code where you used new() to create an instance of the specific class. Instead, you can use a dependency injection mechanism to map the ILogger interface to a specific concrete instance of the logging component, or even to multiple implementations, so that the application can specify which one it requires. The following code uses Unity to register a mapping for both a default type of logging component and a named type with the ILogger interface. Alternatively, you can specify these mappings using the Unity configuration file.

```C#
// Create container and register types
IUnityContainer myContainer = new UnityContainer();
myContainer.RegisterType<ILogger, FileLogger>();       // default instance
myContainer.RegisterType<ILogger, FastFileLogger>("FastLogger");
```

The application can then obtain a reference to the default logging component using the following code.

```C#
ILogger myLogger = myContainer.Resolve<ILogger>();
```

In addition, the application can use a variable (perhaps set in configuration or at run time) to specify a different implementation of the logging component interface as required, as shown in the following code.

```C#
// Retrieve logger type name from configuration
String loggerName = ConfigurationManager.AppSettings["LoggerName"].ToString();
ILogger myLogger = myContainer.Resolve<ILogger>(loggerName);
```

For more information about registering types, type mappings, and resolving instances, see Resolving Objects.

## Service and Component Location

Frequently, applications require the use of services or components that are specific to the application; examples are business logic components, data access components, interface components, and process controllers. In some cases, these services may be instance-based, so that each section of the application or each task requires a separate individual instance of the service. However, it is also common for services to be singleton-based, so that every user of the service references the same single instance of the service.

A service location facility makes it easy for an application to obtain a reference to a service or component, without having to specify where to look for the specific service or whether it is a singleton-based or an instance-based service. By using dependency injection mechanisms, such as the Unity container, developers can register services in the appropriate way and then obtain a reference to the service at run time, without having to specify exactly which implementation of the service is required or what type of instance it actually is.

For example, if you have a singleton service class named CustomerData that you interact with to read and update information for any customer, your application obtains a reference to this service usually by calling a static GetInstance method of the service (which ensures that it is a singleton and that only one instance can exist), as shown in the following code.

```C#
CustomerData cData = CustomerData.GetInstance();
```

Instead, you can use the Unity container to set the CustomerData class type with a specific lifetime that ensures it behaves as a singleton so that every request for the service returns the same instance, as shown in the following code. Alternatively, you could specify these mappings using the Unity configuration file.

```C#
// Create container and register type as a singleton instance
IUnityContainer myContainer = new UnityContainer();
myContainer.RegisterType<CustomerData>(new ContainerControlledLifetimeManager());
```

The application can then obtain a reference to the single instance of the CustomerData service using the following code. If the instance does not yet exist, the container creates it.

```C#
CustomerData cData = myContainer.Resolve<CustomerData>();
```

In addition, perhaps a new CustomerFile component you decide to use in your application inherits the same base class named CustomerAccessBase as the CustomerData service, but it is not a singleton—instead, it requires that your application instantiate an instance for each customer. In this case, you can specify mapping names when you register one component as a singleton type and one component as an instance type (with the default transient lifetime), and then use the same application code to retrieve the required instance.

For example, the following code shows how you can register two named mappings for objects that inherit from the same base class, then—at run time—collect a string value from elsewhere in the application configuration that specifies which of the mappings to use. In this case, the value comes from the AppSettings section of the configuration file. If the value with the key CustomerService contains CustomerDataService, the code returns an instance of the CustomerData class. If it contains the value CustomerFileService, the code returns an instance of the CustomerFile class.

```C#
IUnityContainer myContainer = new UnityContainer();
// Register CustomerData type as a singleton instance
myContainer.RegisterType<CustomerAccessBase, CustomerData>("CustomerDataService", 
                        new ContainerControlledLifetimeManager());
// Register CustomerFile type with the default transient lifetime
myContainer.RegisterType<CustomerAccessBase, CustomerFile>("CustomerFileService");
...
String serviceName = ConfigurationManager.AppSettings["CustomerService"].ToString();
CustomerAccessBase cData 
  = (CustomerAccessBase)myContainer.Resolve<CustomerAccessBase>(serviceName);
```

For more information about registering types, type mappings, and resolving instances, see Resolving Objects. For more information about using lifetime managers to control the creation, lifetime, and disposal of objects, see Understanding Lifetime Managers.

## Policy Injection through Interception

Unity interception with its built-in policy injection module enables you to effectively capture calls to objects you resolve through the Unity DI container, and apply a policy that adds additional functionality to the target object. Typically, you will use this technique to change the behavior of existing objects, or to implement the management of crosscutting concerns through reusable handlers. You can specify how to match the target object using a wide range of matching rules, and construct a policy pipeline that contains one or more call handlers.

Calls to the intercepted methods or properties of the target object then pass through the call handlers in the order you add them to the pipeline, and return through them in the reverse order. Your call handlers can access the values in the call, change these values, and control execution of the call. For example, the call handlers might authorize users, validate parameter values, cache the return value, and shortcut execution so that the target method does not actually execute where this is appropriate.

You can configure Unity for policy injection by using a configuration file at design time, see Configuring Policy Injection Policies, or by using the API at run time, see Registering Policy Injection Components.

The following example uses the Unity API to demonstrate how you can configure Unity to perform interception on a target object, using a policy that contains a logging handler and a validation handler. Notice that the logging handler is added first, so that it will log calls even if validation fails and the validation handler shortcuts the pipeline instead of calling the method of the target object. You can use the streamlined policy definition API provided by the Unity interception container extension to configure the container at run time or you can specify the same behavior at design time by using a configuration file. For an example using the API, see Registering Policy Injection Components. For a design time example, see Configuration Files for Interception.

```C#
// Create a container and add the interception extension.
IUnityContainer myContainer = new UnityContainer();
myContainer.AddNewExtension<Interception>();

// Configure the container with a policy named MyPolicy
// that uses a TypeMatchingRule to match a custom class
// and adds a logging handler and a validation handler
// to the handler pipeline. You must specify at least one
// matching rule or the policy will not be applied.
myContainer.Configure<Interception>()
    .AddPolicy("MyPolicy")
         .AddMatchingRule<TypeMatchingRule>(
                  new InjectionConstructor("MyCustomType"))
         .AddCallHandler(typeof(MyLoggingCallHandler))
         .AddCallHandler(typeof(MyValidationCallHandler));

// Configure the container to intercept calls to the
// custom class using a TransparentProxyInterceptor.
myContainer.RegisterType<MyCustomType>("myType",
    new Interceptor<TransparentProxyInterceptor>(),
    new InterceptionBehavior<PolicyInjectionBehavior>());


// Resolve the custom type through the container when
// you are ready to use it. When you call a method or
// set a property on it, the call will pass through
// the logging handler and the validation handler.
MyCustomType myNewInstance = myContainer.Resolve<MyCustomType>("myType");
```

For more information about interception and policy injection, see Using Interception and Policy Injection.