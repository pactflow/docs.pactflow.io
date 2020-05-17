---
id: powershell-guide
title: PowerShell Migration guide
---

As at June 10th, 2020, we will only support TLS1.2+ connections for Web and API access to the Pactflow platform.

## Checking if your system is compatible

You can check if your API client will work by testing against a TLS1.2 test host such as https://tls-v1-2.badssl.com:1012. For Example:


```powershell
Invoke-RestMethod -uri https://tls-v1-2.badssl.com:1012/
```

An _unsuccessful_ connection will look as follows:

<img src="/docs/assets/powershell/powershell-failure.png" alt="Unsuccessful PowerShell connection"/>

A _successful_ connection will look as follows:

<img src="/docs/assets/powershell/powershell-success.png" alt="Successful PowerShell connection" />

## Updating your security settings

You can enable TLS1.2 as per below:

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
```

You can also enable future protocols (such as TLS1.3) by allowing the client to negotiate multiple protocols:

```powershell
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls13;
```

## .NET Best Practices

See https://docs.microsoft.com/en-us/dotnet/framework/network-programming/tls for best practices on TLS security.